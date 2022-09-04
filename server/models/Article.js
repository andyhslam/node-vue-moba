const mongoose = require("mongoose")

const schema = new mongoose.Schema(
	{
		title: { type: String },
		body: { type: String },
		categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
	},
	// 在录入数据时，自动带上两个字段：createdAt和updatedAt。
	{ timestamps: true }
)

/**
 * 导出model(Mongoose的模型相当于MongoDB的集合)；
 * Article表示模型名称；schema表示表结构；articles表示集合名称或者数据表名称。
 */
module.exports = mongoose.model("Article", schema, "articles")
