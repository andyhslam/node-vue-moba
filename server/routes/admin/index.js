module.exports = (app) => {
	const express = require("express")
	const router = express.Router()
	const Category = require("../../models/Category.js")
	router.post("/categories", async (req, res) => {
		// 创建数据：数据来源是客户端提交过来的数据
		const model = await Category.create(req.body)
		res.send(model) // 发送给客户端
	})
	app.use("/admin/api", router)
}
