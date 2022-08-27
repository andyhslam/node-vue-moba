<template>
	<div class="category-edit">
		<h1>{{ editId ? "编辑" : "新建" }}管理员</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="用户名">
				<el-input v-model="adminUserModel.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input
					type="text"
					v-model="adminUserModel.password"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: "AdminUserEdit",
	props: {
		/**
		 * 和使用this.$route.params.editId效果一样
		 * 这样写的好处：让页面和路由尽可能地解耦
		 */
		editId: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			adminUserModel: {},
		}
	},
	beforeRouteEnter: (to, from, next) => {
		next((vm) => {
			if (!from.props) {
				vm.adminUserModel = {}
			}
		})
	},
	created() {
		this.editId && this.fetch()
	},
	methods: {
		async fetch() {
			const res = await this.$http.get(`rest/admin_users/${this.editId}`)
			this.adminUserModel = res.data
		},
		async save() {
			if (this.editId) {
				await this.$http.put(
					`rest/admin_users/${this.editId}`,
					this.adminUserModel
				)
			} else {
				await this.$http.post("rest/admin_users", this.adminUserModel)
			}
			this.$router.push("/admin_users/list")
			this.$message({
				type: "success",
				message: "保存成功",
			})
		},
	},
}
</script>
