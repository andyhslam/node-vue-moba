module.exports = (options) => {
	return async (req, res, next) => {
		// 获取模型名称：url动态参数是resource，classify转换类名(例如把categories转换成Category)
		const modelName = require("inflection").classify(req.params.resource)
		// 获取模型的类，挂载到请求对象，后续请求就可以使用上一个请求函数的req.Model
		req.Model = require(`../models/${modelName}`)
		next()
	}
}
