import Vue from "vue"
import VueRouter from "vue-router"
import Main from "../views/Main.vue"
import HomeView from "../views/HomeView.vue"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "main",
		component: Main,
		children: [{ path: "/", name: "home", component: HomeView }],
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