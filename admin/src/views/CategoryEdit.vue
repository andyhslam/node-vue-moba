<template>
	<div class="category-edit">
		<h1>{{ editId ? "编辑" : "新建" }}分类</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="名称">
				<el-input v-model="categoryModel.name"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: "CategoryEdit",
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
			categoryModel: {},
		}
	},
	beforeRouteEnter: (to, from, next) => {
		next((vm) => {
			if (!from.props) {
				vm.categoryModel = {}
			}
		})
	},
	created() {
		this.editId && this.fetch()
	},
	methods: {
		async fetch() {
			const res = await this.$http.get(`categories/${this.editId}`)
			this.categoryModel = res.data
		},
		async save() {
			if (this.editId) {
				await this.$http.put(
					`categories/${this.editId}`,
					this.categoryModel
				)
			} else {
				await this.$http.post("categories", this.categoryModel)
			}
			this.$router.push("/categories/list")
			this.$message({
				type: "success",
				message: "保存成功",
			})
		},
	},
}
</script>
