// 写前端路由，给手机端用的接口路由
module.exports = (app) => {
	const router = require("express").Router()
	// 因为已经把模型都加到mongoose里面，所以可以直接从mongoose里面取出来
	const mongoose = require("mongoose")
	const Category = mongoose.model("Category")
	const Article = mongoose.model("Article")
	/**
	 * 通过访问某个页面，录入某些数据，方便我们重复录入。
	 * /news/init：非正式使用，测试用；通过js的方式录入数据，而不是在后台一个个添加。
	 * /news/init：初始化新闻的路由，录入新闻
	 */
	router.get("/news/init", async (req, res) => {
		// 只找新闻分类下面的子分类
		const parent = await Category.findOne({ name: "新闻分类" })
		// lean()方法表示取出纯粹的js对象或者数组，不带任何mongoose里面的模型对象，比较干净的数据对象。
		const cats = await Category.find().where({ parent }).lean()
		const newsTitles = [
			"姜子牙英雄品质升级共创-台词票选活动开启",
			"峡谷夏日特别行动之狄某有话说| 8月峡谷数据总结来了~",
			"蔡小姬探班手记|橘右京·枫霜尽皮肤海报设计故事",
			"周年回城创意分享，一起来看看设计师们的奇思妙想吧！",
			"2022周年庆回城新鲜出炉，速来围观！",
			"9月2日体验服停机更新公告",
			"9月1日体验服停机更新公告",
			"9月1日全服不停机更新公告",
			"9月1日英雄平衡性调整丨赵云、扁鹊、刘邦增强",
			"8月31日挂车行为专项违规处罚公告",
			"【秋月挑战】活动开启公告及FAQ",
			"鸿运抽奖，抽六次送一次活动开启公告",
			"收集枫叶送全新荣耀播报！裴擒虎-天狼狩猎者返场！",
			'【微信用户专属】微信小程序"游戏礼品站"购买橘右京新皮肤抽奖活动',
			"《行剑 枫霜尽》活动开启公告",
			"上最右为KPL战队助威",
			"K甲总决赛回顾：EMC让三追四夺冠，子衿荣膺总决赛MVP",
			"重庆狼队.小胖宫本武藏三连决胜再获周最佳，夏季常规赛完美收官",
			"风物长宜放眼量，夏季赛常规赛收官周决战紫禁之巅",
			"K甲第九周回顾：MTG零封收官，常规赛落下帷幕",
		]
		const newsList = newsTitles.map((title) => {
			// 数组里面随机取一个元素
			const randomCats = cats.slice().sort((a, b) => Math.random() - 0.5)
			return {
				title,
				categories: randomCats.slice(0, 2),
			}
		})
		// 清空数据库的Article集合原有的数据，以任意条件去删除
		await Article.deleteMany({})
		// 往数据库的Article集合插入newsList
		await Article.insertMany(newsList)
		res.send(newsList)
	})
	// 每次运行该接口，先清空原有数据，再插入新数据
	app.use("/web/api", router)
}
