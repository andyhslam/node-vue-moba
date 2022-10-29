<template>
	<div class="login-container">
		<el-card header="请先登录" class="login-card">
			<el-form @submit.native.prevent="login">
				<el-form-item label="用户名">
					<el-input v-model="loginModel.username"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input
						type="password"
						v-model="loginModel.password"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" native-type="submit">
						登录
					</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
	name: "LoginView",
	data() {
		return {
			loginModel: {},
		}
	},
	methods: {
		async login() {
			const res = await this.$http.post("login", this.loginModel)
			localStorage.token = res.data.token
			localStorage.username = JSON.parse(res.config.data).username
			// localStorage.clear() 清空所有storage，包括token
			this.$router.push("/")
			this.$message.success("登录成功")
		},
	},
}
</script>

<style>
.login-card {
	width: 25rem;
	margin: 5rem auto;
}
</style>
