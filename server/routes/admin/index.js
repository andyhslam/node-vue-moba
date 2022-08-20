module.exports = (app) => {
	const express = require("express")
	const router = express.Router({
		mergeParams: true, // 表示合并url参数，要不然require时获取不到url参数
	})

	/**
	 * 通用CRUD接口：增加(Create)、检索(Retrieve)、更新(Update)和删除(Delete)
	 * 在每个路由里面，查找对应的模型，对应关系是从url去找
	 */
	// 新建分类的接口
	router.post("/", async (req, res) => {
		// 创建数据：数据来源是客户端提交过来的数据
		const model = await req.Model.create(req.body)
		res.send(model) // 发送给客户端
	})
	// 提交编辑分类的接口
	router.put("/:editId", async (req, res) => {
		// 通过editId去查找，找到后再更新
		const model = await req.Model.findByIdAndUpdate(
			req.params.editId,
			req.body
		)
		res.send(model)
	})
	// 删除分类的接口
	router.delete("/:editId", async (req, res) => {
		// 通过editId去查找，找到后再删除
		await req.Model.findByIdAndDelete(req.params.editId, req.body)
		res.send({
			success: true,
		})
	})
	// 分类列表的接口
	router.get("/", async (req, res) => {
		/**
		 * populate("parent")表示关联取出parent字段指向的完整信息(对象)
		 */
		const queryOptions = {}
		// 此处的modelName是获取Category实例上的属性
		if (req.Model.modelName === "Category") {
			// 满足通用性和扩展性
			queryOptions.populate = "parent"
		}
		const items = await req.Model.find().setOptions(queryOptions).limit(10)
		res.send(items) // 返回给客户端
	})
	// 获取编辑分类的接口
	router.get("/:editId", async (req, res) => {
		const model = await req.Model.findById(req.params.editId)
		res.send(model) // 返回给客户端
	})

	/**
	 * 把父级的url参数合并到router路由里面，让子级都能访问，即可以让子路由继承父路由的参数。
	 * 先用该中间件处理，然后请求地址，再调用next方法去处理下一个。
	 * 中间件：拦截路由，类似于拦截器
	 */
	app.use(
		"/admin/api/rest/:resource",
		async (req, res, next) => {
			// 获取模型名称：url动态参数是resource，classify转换类名(例如把categories转换成req.Model)
			const modelName = require("inflection").classify(
				req.params.resource
			)
			// 获取模型的类，挂载到请求对象，后续请求就可以使用上一个请求函数的req.Model
			req.Model = require(`../../models/${modelName}`)
			next()
		},
		router
	)
}
