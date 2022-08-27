module.exports = (options) => {
	const jwt = require("jsonwebtoken")
	const assert = require("http-assert")
	const AdminUser = require("../models/AdminUser")
	return async (req, res, next) => {
		// 标准请求头(前端用大写，后端用小写)
		const token = String(req.headers.authorization || "")
			.split(" ")
			.pop()
		assert(token, 401, "提供jwt token，请先登录")
		/**
		 * 解密验证：
		 * 通过用户ID生成的token，最终也可以通过这个token解释出来对应的用户ID
		 * 之前用什么数据加密的，最终解释出来的就是那个数据
		 * 在中间件里面访问不到路由的app，所以要用req.app，等同于路由的app
		 */
		const { id } = jwt.verify(token, req.app.get("secret"))
		assert(id, 401, "无效的jwt token，请先登录")
		// req.user表示客户端请求时的用户对象(只包含用户名，不包含密码)
		req.user = await AdminUser.findById(id)
		// 401状态码表示用户身份有问题，验证不通过
		assert(req.user, 401, "验证不通过，请先登录")
		await next()
	}
}
