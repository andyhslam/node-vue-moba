// 写前端路由，给手机端用的接口路由
module.exports = (app) => {
	const router = require("express").Router()
	// 因为已经把模型都加到mongoose里面，所以可以直接从mongoose里面取出来
	const mongoose = require("mongoose")
	const Category = mongoose.model("Category")
	const Article = mongoose.model("Article")
	const Hero = mongoose.model("Hero")
	const { newsRawData: newsTitles, heroRawData } = require("./data.js")
	/**
	 * 通过访问某个页面，录入某些数据，方便我们重复录入。
	 * /news/init：非正式使用，测试用；通过js的方式录入数据，而不是在后台一个个添加。
	 * /news/init：导入新闻数据的路由；初始化新闻的路由，录入新闻
	 */
	router.get("/news/init", async (req, res) => {
		// 只找新闻分类下面的子分类
		const parent = await Category.findOne({ name: "新闻分类" })
		// lean()方法表示取出纯粹的js对象或者数组，不带任何mongoose里面的模型对象，比较干净的数据对象。
		const cats = await Category.find().where({ parent }).lean()
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

	/**
	 * 新闻列表接口，用于前端调用
	 * 以分类为主体，关联新闻，去把新闻调出来
	 */
	router.get("/news/list", async (req, res) => {
		// const parent = await Category.findOne({
		// 	name: "新闻分类", // 调出顶级分类
		// })
		// 	.populate({
		// 		path: "children", // 调出子分类
		// 		populate: {
		// 			path: "newsList", // 每个子分类再去关联新闻
		// 		},
		// 	})
		// 	.lean() // lean()表示带上关联，展示出来

		const parent = await Category.findOne({
			name: "新闻分类",
		})
		/**
		 * mongodb的聚合查询(aggregate)：可以在一次查询里面，同时执行多次查询，最终得到预期结果
		 * 通过一条查询语句去关联查出来的数据，比分成多条语句来查询的效率高得多。
		 * 把多个查询合并到一次查询，速度快，效率高。
		 * 聚合查询的参数称为聚合管道，在此可以定义多种操作：
		 * 第一步：通过操作符$match来过滤数据；
		 * 第二步：关联查询
		 * 第三步：修改newsList，每个newsList里面，只要5个元素
		 */
		const cats = await Category.aggregate([
			{ $match: { parent: parent._id } },
			// $lookup类似于关系型数据库里面的join
			{
				$lookup: {
					from: "articles", // 表示关联哪个集合(数据表)
					localField: "_id",
					foreignField: "categories",
					as: "newsList", // 起名
				},
			},
			{
				$addFields: {
					newsList: { $slice: ["$newsList", 5] },
				},
			},
		])
		const subCats = cats.map((v) => v._id)
		cats.unshift({
			name: "热门",
			newsList: await Article.find()
				.where({
					categories: { $in: subCats }, // 不限制分类，调取总数居
				})
				.populate("categories") // 热门要关联到分类再查出来
				.limit(5)
				.lean(),
		})

		cats.map((cat) => {
			cat.newsList.map((news) => {
				news.categoryName =
					cat.name === "热门" ? news.categories[0].name : cat.name
				return news
			})
			return cat
		})
		res.send(cats) // 顶级分类关联children和children里面的newsList
	})

	// 导入英雄数据的路由，测试接口
	router.get("/heroes/init", async (req, res) => {
		await Hero.deleteMany({})
		for (let cat of heroRawData) {
			if (cat.name === "热门") {
				// 如果是热门分类，就直接跳过本次循环，进入下一轮循环，不要录入英雄
				// continue表示直接进入下一轮循环，不要执行后续代码
				// 没有continue的话，就表示继续执行本次循环以及后续代码
				continue
			}
			// 通过名称找到当前分类在数据库中对应的数据
			const category = await Category.findOne({
				name: cat.name,
			})
			cat.heroes.forEach((hero) => {
				hero.categories = [category]
			})
			// 录入英雄
			await Hero.insertMany(cat.heroes)
		}
		res.send(await Hero.find())
	})

	// 英雄列表接口
	router.get("/heroes/list", async (req, res) => {
		const parent = await Category.findOne({
			name: "英雄分类",
		})
		const cats = await Category.aggregate([
			{ $match: { parent: parent._id } },
			// $lookup类似于关系型数据库里面的join
			{
				$lookup: {
					from: "heroes", // 表示关联哪个集合(数据表)
					localField: "_id", // 本地字段
					foreignField: "categories", // 外键字段
					as: "heroList", // 起名
				},
			},
		])
		const subCats = cats.map((v) => v._id)
		// 热门分类需要手动去查询
		cats.unshift({
			name: "热门",
			heroList: await Hero.find()
				.where({
					categories: { $in: subCats }, // 不限制分类，调取总数居
				})
				.limit(10)
				.lean(),
		})
		res.send(cats) // 顶级分类关联children和children里面的heroList
	})

	// 文章详情
	router.get("/articles/:id", async (req, res) => {
		const data = await Article.findById(req.params.id).lean()
		// 找出相关分类
		data.related = await Article.find()
			.where({
				categories: { $in: data.categories },
			})
			.limit(2)
		res.send(data)
	})

	// 英雄详情
	router.get("/heroes/:id", async (req, res) => {
		// populate()：关联查出多个字段的完整信息
		const data = await Hero.findById(req.params.id)
			.populate("categories items1 items2 partners.hero")
			.lean()
		res.send(data)
	})

	// 每次运行该接口，先清空原有数据，再插入新数据
	app.use("/web/api", router)
}
