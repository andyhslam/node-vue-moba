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

// 导出model(Mongoose的model相当于MongoDB的集合)；Category表示数据表名称或者集合名称
module.exports = mongoose.model("Category", schema)
