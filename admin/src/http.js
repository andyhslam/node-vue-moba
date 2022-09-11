import axios from "axios"
import Vue from "vue"
import router from "./router"

const http = axios.create({
	/**
	 * 域名和接口地址对应
	 * VUE_APP_API_URL表示开发环境使用的vue变量
	 * "/admin/api"表示使用当前域名下的/admin/api路径
	 */
	baseURL: process.env.VUE_APP_API_URL || "/admin/api",
	// 设置接口根地址
	// baseURL: "http://localhost:3000/admin/api",
})

// 给http请求加个请求拦截器
http.interceptors.request.use(
	(config) => {
		if (localStorage.token) {
			// 行业规范：加上标准格式，Bearer类型
			config.headers.Authorization = "Bearer " + localStorage.token
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 给http请求加个响应拦截器
http.interceptors.response.use(
	(res) => {
		// 正常请求的情况
		return res
	},
	(err) => {
		/**
		 * 发生错误的情况：1.非200状态码；2.大于等于400状态码
		 * err.name：错误对象的名字；err.response.data：错误对象的响应数据
		 */
		const errMsg = err.response.data?.message
		if (errMsg) {
			Vue.prototype.$message.error(errMsg)
			if (err.response.status === 401) {
				router.push("/login")
			}
		}
		return Promise.reject(err)
	}
)

export default http
