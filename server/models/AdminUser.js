const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	username: { type: String },
	password: {
		type: String,
		select: false, // 编辑页面不显示密码
		set(val) {
			/**
			 * bcrypt散列加密：
			 * bcrypt的散列不可逆，保证安全性；针对同一个val值来散列，每次都会生成不一样的散列值。
			 * hashSync是一个同步方法，用来生成密码的一个散列值；
			 * hashSync方法的第一个参数是加密值，第二个参数是加密指数(散列指数)，指数越高越安全，但是越耗时，一般设置为10到12
			 */
			return require("bcrypt").hashSync(val, 10)
		},
	},
})

/**
 * 后端建立数据模型，只需要一个集合；对应到SQL数据库，只需要一张表。
 * 导出model(Mongoose的model相当于MongoDB的集合)；AdminUser表示数据表名称、集合名称或者模型名称
 */
module.exports = mongoose.model("AdminUser", schema)
