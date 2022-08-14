module.exports = (app) => {
	const express = require("express")
	const router = express.Router()
	const Category = require("../../models/Category.js")
	// 新建分类接口
	router.post("/categories", async (req, res) => {
		// 创建数据：数据来源是客户端提交过来的数据
		const model = await Category.create(req.body)
		res.send(model) // 发送给客户端
	})
	// 分类列表接口
	router.get("/categories", async (req, res) => {
		const items = await Category.find().limit(10)
		res.send(items) // 返回给客户端
	})
	app.use("/admin/api", router)
}
