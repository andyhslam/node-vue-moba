const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: { type: String },
})

// 导出model(Mongoose的model相当于MongoDB的集合)；Category表示数据表名称或者集合名称
module.exports = mongoose.model("Category", schema)
