import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"
import Main from "../views/Main.vue"
import CategoryEdit from "../views/CategoryEdit.vue"
import CategoryList from "../views/CategoryList.vue"
import ItemEdit from "../views/ItemEdit.vue"
import ItemList from "../views/ItemList.vue"
import HeroEdit from "../views/HeroEdit.vue"
import HeroList from "../views/HeroList.vue"
import ArticleEdit from "../views/ArticleEdit.vue"
import ArticleList from "../views/ArticleList.vue"
import AdvertEdit from "../views/AdvertEdit.vue"
import AdvertList from "../views/AdvertList.vue"
import AdminUserEdit from "../views/AdminUserEdit.vue"
import AdminUserList from "../views/AdminUserList.vue"

Vue.use(VueRouter)

const routes = [
	{
		path: "/login",
		name: "login",
		component: Login,
		meta: { isPublic: true },
	},
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
			{
				path: "/articles/create",
				component: ArticleEdit,
			},
			{
				path: "/articles/edit/:editId",
				component: ArticleEdit,
				props: true, // 表示把url参数editId注入到ArticleEdit页面
			},
			{
				path: "/articles/list",
				component: ArticleList,
			},
			{
				path: "/adverts/create",
				component: AdvertEdit,
			},
			{
				path: "/adverts/edit/:editId",
				component: AdvertEdit,
				props: true, // 表示把url参数editId注入到AdvertEdit页面
			},
			{
				path: "/adverts/list",
				component: AdvertList,
			},
			{
				path: "/admin_users/create",
				component: AdminUserEdit,
			},
			{
				path: "/admin_users/edit/:editId",
				component: AdminUserEdit,
				props: true, // 表示把url参数editId注入到AdminUserEdit页面
			},
			{
				path: "/admin_users/list",
				component: AdminUserList,
			},
		],
	},
]

const router = new VueRouter({
	routes,
})

// 进入路由之前要做什么
router.beforeEach((to, from, next) => {
	if (!to.meta.isPublic && !localStorage.token) {
		next("/login")
	}
	next()
})

export default router
