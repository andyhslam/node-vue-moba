const mongoose = require("mongoose")

const schema = new mongoose.Schema(
	{
		title: { type: String },
		body: { type: String },
		categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
	},
	// 在录入数据时，自动带上两个字段：createAdd和updateAdd，
	{ timestamps: true }
)

// 导出model(Mongoose的model相当于MongoDB的集合)；Article表示数据表名称或者集合名称
module.exports = mongoose.model("Article", schema)
