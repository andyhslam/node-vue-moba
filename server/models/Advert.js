const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: { type: String },
	items: [
		{
			image: { type: String },
			url: { type: String },
		},
	],
})

/**
 * 后端建立数据模型，只需要一个集合；对应到SQL数据库，只需要一张表。
 * 导出model(Mongoose的模型相当于MongoDB的集合)；
 * Advert表示模型名称；schema表示表结构；adverts表示集合名称或者数据表名称。
 */
module.exports = mongoose.model("Advert", schema, "adverts")
