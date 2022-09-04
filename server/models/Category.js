const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: { type: String },
	/**
	 * ObjectId表示它是数据库里面的ObjectId
	 * ref表示关联哪个模型，此处关联的是它本身(Category模型)
	 * 在数据库的关联模型(此处指向分类模型)查找时，如果当前的ObjectId等于parent，就能找到当前分类的父级分类
	 */
	parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
})

// 虚拟模型
schema.virtual("children", {
	localField: "_id",
	foreignField: "parent",
	justOne: false,
	ref: "Category",
})

// 每个分类关联文章
schema.virtual("newsList", {
	localField: "_id",
	foreignField: "categories",
	justOne: false,
	ref: "Article",
})

/**
 * 导出model(Mongoose的模型相当于MongoDB的集合)；
 * Category表示模型名称；schema表示表结构；categories表示集合名称或者数据表名称。
 */
module.exports = mongoose.model("Category", schema, "categories")
