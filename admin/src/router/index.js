import Vue from "vue"
import VueRouter from "vue-router"
import Main from "../views/Main.vue"
import CategoryEdit from "../views/CategoryEdit.vue"
import CategoryList from "../views/CategoryList.vue"

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
		],
	},
]

const router = new VueRouter({
	routes,
})

export default router
