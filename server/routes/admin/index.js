module.exports = (app) => {
	const express = require("express")
	const jwt = require("jsonwebtoken")
	const AdminUser = require("../../models/AdminUser")
	const router = express.Router({
		mergeParams: true, // 表示合并url参数，要不然require时获取不到url参数
	})

	/**
	 * 通用CRUD接口：增加(Create)、检索(Retrieve)、更新(Update)和删除(Delete)
	 * 在每个路由里面，查找对应的模型，对应关系是从url去找
	 */
	// 创建资源的接口
	router.post("/", async (req, res) => {
		// 创建数据：数据来源是客户端提交过来的数据
		const model = await req.Model.create(req.body)
		res.send(model) // 发送给客户端
	})
	// 更新资源的接口
	router.put("/:editId", async (req, res) => {
		// 通过动态参数editId去查找，找到后再更新
		const model = await req.Model.findByIdAndUpdate(
			req.params.editId,
			req.body
		)
		res.send(model)
	})
	// 删除资源的接口
	router.delete("/:editId", async (req, res) => {
		// 通过动态参数editId去查找，找到后再删除
		await req.Model.findByIdAndDelete(req.params.editId, req.body)
		res.send({
			success: true,
		})
	})
	// 资源列表的接口
	router.get(
		"/",
		async (req, res, next) => {
			// 标准请求头(前端用大写，后端用小写)
			const token = String(req.headers.authorization || "")
				.split(" ")
				.pop()
			/**
			 * 解密验证：
			 * 通过用户ID生成的token，最终也可以通过这个token解释出来对应的用户ID
			 * 之前用什么数据加密的，最终解释出来的就是那个数据
			 */
			const { id } = jwt.verify(token, app.get("secret"))
			// req.user表示客户端请求时的用户对象(只包含用户名，不包含密码)
			req.user = await AdminUser.findById(id)
			await next()
		},
		async (req, res) => {
			/**
			 * populate("parent")表示关联取出parent字段指向的完整信息(对象)
			 */
			const queryOptions = {}
			// 此处的modelName是获取Category实例上的属性
			if (req.Model.modelName === "Category") {
				// 满足通用性和扩展性
				queryOptions.populate = "parent"
			}
			const items = await req.Model.find()
				.setOptions(queryOptions)
				.limit(10)
			res.send(items) // 返回给客户端
		}
	)
	// 资源详情的接口
	router.get("/:editId", async (req, res) => {
		const model = await req.Model.findById(req.params.editId)
		res.send(model) // 返回给客户端
	})

	/**
	 * 中间件：拦截路由，类似于拦截器
	 * 先用该中间件处理，然后请求地址，再调用next方法去处理下一个。
	 * mergeParams字段的含义：
	 * 把父级的url参数合并到router路由里面，让子级都能访问，即可以让子路由继承父路由的参数。
	 */
	app.use(
		"/admin/api/rest/:resource",
		async (req, res, next) => {
			// 获取模型名称：url动态参数是resource，classify转换类名(例如把categories转换成Category)
			const modelName = require("inflection").classify(
				req.params.resource
			)
			// 获取模型的类，挂载到请求对象，后续请求就可以使用上一个请求函数的req.Model
			req.Model = require(`../../models/${modelName}`)
			next()
		},
		router
	)

	const multer = require("multer")
	const upload = multer({ dest: __dirname + "/../../uploads" }) // 用来处理上传数据的中间件
	app.post("/admin/api/upload", upload.single("file"), async (req, res) => {
		/**
		 * 接口可以接收单个的上传文件(字段名为file)
		 * express本身没有req.file，是因为用了upload中间件，把上传文件数据挂载到req对象
		 */
		const file = req.file
		file.url = `http://localhost:3000/uploads/${file.filename}`
		res.send(file)
	})

	app.post("/admin/api/login", async (req, res) => {
		const { username, password } = req.body
		// 实现用户登录的步骤：
		// 1.根据用户名去数据库找用户
		/**
		 * 数据库的键名和上面的变量名都是username
		 * select('+password')表示查询数据库时，取出password字段，因为默认是不取的，用加号表示要取它。
		 */
		const user = await AdminUser.findOne({ username }).select("+password")
		if (!user) {
			/**
			 * 设置状态码再发送
			 * 422状态码表示客户端提交的数据有问题，rest风格规范也建议，用此状态码来验证错误。
			 */
			return res.status(422).send({
				message: "用户不存在",
			})
		}
		// 2.校验密码
		// 比较明文和密文是否匹配，compareSync第一个参数是明文，第二个参数是密文
		const isValid = require("bcrypt").compareSync(password, user.password)
		if (!isValid) {
			return res.status(422).send({
				message: "密码错误",
			})
		}
		// 3.返回token
		/**
		 * 客户端可以解开token篡改信息，再生成一样的token给服务端，但是此时密钥会改变，服务端就会检测出来
		 * 此处的app.get和定义路由的app.get名字冲突，所以通过参数名来确定是定义路由还是获取配置，如果只有一个参数，就表示获取配置。
		 */
		const token = jwt.sign({ id: user._id }, app.get("secret")) // 签名生成一个token
		res.send({ token })
	})
}
