import Vue from "vue"
import VueRouter from "vue-router"
import Main from "../views/Main.vue"
import Home from "../views/Home.vue"
import Article from "../views/Article.vue"
import Hero from "../views/Hero.vue"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		component: Main,
		children: [
			{ path: "/", name: "home", component: Home },
			{
				path: "/articles/:id",
				name: "article",
				component: Article,
				props: true, // 表示该路由组件(页面组件)接收参数，在path里面传递的参数都映射为组件参数。
			},
		],
	},
	{
		path: "/heroes/:id",
		name: "hero",
		component: Hero,
		props: true,
	},
	{
		path: "/about",
		name: "about",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	},
]

const router = new VueRouter({
	routes,
})

export default router
