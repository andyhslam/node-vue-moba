import Vue from "vue"
import App from "./App.vue"
Vue.config.productionTip = false

import "./assets/iconfont/iconfont.css"
import "./assets/scss/style.scss"
import router from "./router"
import axios from "axios"

import VueAwesomeSwiper from "vue-awesome-swiper"
import "swiper/dist/css/swiper.css"
Vue.use(VueAwesomeSwiper)

import Card from "@/components/Card.vue"
Vue.component("m-card", Card)
import ListCard from "@/components/ListCard.vue"
Vue.component("m-list-card", ListCard)

Vue.prototype.$http = axios.create({
	/**
	 * 域名和接口地址对应
	 * VUE_APP_API_URL表示开发环境使用的vue变量
	 * "/web/api"表示使用当前域名下的/web/api路径
	 */
	baseURL: process.env.VUE_APP_API_URL || "/web/api",
	// 设置接口根地址
	// baseURL: "http://localhost:3000/web/api",
})

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app")
