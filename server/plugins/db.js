module.exports = (app) => {
	const mongoose = require("mongoose")
	mongoose.connect("mongodb://127.0.0.1:27017/node-vue-moba", {
		useNewUrlParser: true,
	})

	// 把models文件夹里面的所有js文件全部引用一遍(没有对它们做任何操作，只是把它们引用一遍)
	require("require-all")(__dirname + "/../models")
}

/**
 * 在数据库用到的各种关联，如果A模型引用B模型，但是又没有使用过B模型，可能会报错。
 * 所以一般情况下，在数据库模块里面，会首先把所有模型引用一遍。
 * require-all插件的用途：把某个文件夹的所有文件引用进来，使用一遍。
 */
