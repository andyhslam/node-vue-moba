const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: { type: String },
	/**
	 * 一般把图片上传到服务器地址，在这里只是用字符串类型保存图片地址；
	 * 后期只要显示图片地址，因为前端html展示只需要图片地址。
	 */
	avatar: { type: String },
	title: { type: String },
	/**
	 * 关联的模型是Category，只要关联的都是用ObjectId
	 * 数组表示一个英雄关联多个分类
	 */
	categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
	/**
	 * 定义数据模型：
	 * 定义一个复合类型的字段，在传统的关系型数据库(比如mysql)没办法这样子直接定义
	 * 在mongodb数据库，可以定义字符串、数组、对象，甚至定义json数据类型更方便
	 */
	scores: {
		difficult: { type: Number },
		skills: { type: Number },
		attack: { type: Number },
		survive: { type: Number },
	},
	skills: [
		{
			icon: { type: String },
			name: { type: String },
			description: { type: String },
			tips: { type: String },
		},
	],
	/**
	 * ref：指向Item模型，即关联的模型是Item
	 * items1表示顺风出装，items2表示逆风出装
	 */
	items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
	items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
	usageTips: { type: String },
	battleTips: { type: String },
	teamTips: { type: String },
	partners: [
		{
			hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
			description: { type: String },
		},
	],
})

// 导出model(Mongoose的model相当于MongoDB的集合)；Hero表示数据表名称或者集合名称
module.exports = mongoose.model("Hero", schema)
