module.exports = (app) => {
	const express = require("express")
	const router = express.Router()
	const Category = require("../../models/Category.js")
	// 新建分类的接口
	router.post("/categories", async (req, res) => {
		// 创建数据：数据来源是客户端提交过来的数据
		const model = await Category.create(req.body)
		res.send(model) // 发送给客户端
	})
	// 提交编辑分类的接口
	router.put("/categories/:editId", async (req, res) => {
		// 通过editId去查找，找到后再更新
		const model = await Category.findByIdAndUpdate(
			req.params.editId,
			req.body
		)
		res.send(model)
	})
	// 删除分类的接口
	router.delete("/categories/:editId", async (req, res) => {
		// 通过editId去查找，找到后再删除
		await Category.findByIdAndDelete(req.params.editId, req.body)
		res.send({
			success: true,
		})
	})
	// 分类列表的接口
	router.get("/categories", async (req, res) => {
		// populate表示关联取出parent字段指向的完整信息(对象)
		const items = await Category.find().populate("parent").limit(10)
		res.send(items) // 返回给客户端
	})
	// 获取编辑分类的接口
	router.get("/categories/:editId", async (req, res) => {
		const model = await Category.findById(req.params.editId)
		res.send(model) // 返回给客户端
	})
	app.use("/admin/api", router)
}
