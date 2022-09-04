const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: { type: String },
	/**
	 * 一般把图片上传到服务器地址，在这里只是用字符串类型保存图片地址；
	 * 后期只要显示图片地址，因为前端html展示只需要图片地址。
	 */
	icon: { type: String },
})

/**
 * 导出model(Mongoose的模型相当于MongoDB的集合)；
 * Item表示模型名称；schema表示表结构；items表示集合名称或者数据表名称。
 */
module.exports = mongoose.model("Item", schema, "items")
