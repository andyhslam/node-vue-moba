const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: { type: String },
	/**
	 * 一般把图片上传到服务器地址，在这里只是用字符串类型保存图片地址；
	 * 后期只要显示图片地址，因为前端html展示只需要图片地址。
	 */
	avatar: { type: String },
})

// 导出model(Mongoose的model相当于MongoDB的集合)；Hero表示数据表名称或者集合名称
module.exports = mongoose.model("Hero", schema)
