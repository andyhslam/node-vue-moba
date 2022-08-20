import Vue from "vue"
import VueRouter from "vue-router"
import Main from "../views/Main.vue"
import CategoryEdit from "../views/CategoryEdit.vue"
import CategoryList from "../views/CategoryList.vue"
import ItemEdit from "../views/ItemEdit.vue"
import ItemList from "../views/ItemList.vue"
import HeroEdit from "../views/HeroEdit.vue"
import HeroList from "../views/HeroList.vue"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "main",
		component: Main,
		children: [
			{
				path: "/categories/create",
				component: CategoryEdit,
			},
			{
				path: "/categories/edit/:editId",
				component: CategoryEdit,
				props: true, // 表示把url参数editId注入到CategoryEdit页面
			},
			{
				path: "/categories/list",
				component: CategoryList,
			},
			{
				path: "/items/create",
				component: ItemEdit,
			},
			{
				path: "/items/edit/:editId",
				component: ItemEdit,
				props: true, // 表示把url参数editId注入到ItemEdit页面
			},
			{
				path: "/items/list",
				component: ItemList,
			},
			{
				path: "/heroes/create",
				component: HeroEdit,
			},
			{
				path: "/heroes/edit/:editId",
				component: HeroEdit,
				props: true, // 表示把url参数editId注入到HeroEdit页面
			},
			{
				path: "/heroes/list",
				component: HeroList,
			},
		],
	},
]

const router = new VueRouter({
	routes,
})

export default router
