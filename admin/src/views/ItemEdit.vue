<template>
	<div class="item-edit">
		<h1>{{ editId ? "编辑" : "新建" }}物品</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="名称">
				<el-input v-model="itemModel.name"></el-input>
			</el-form-item>
			<el-form-item label="图标">
				<el-upload
					class="avatar-uploader"
					:action="$http.defaults.baseURL + '/upload'"
					:show-file-list="false"
					:on-success="afterUpload"
				>
					<img
						v-if="itemModel.icon"
						:src="itemModel.icon"
						class="avatar"
					/>
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: "ItemEdit",
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
			itemModel: {},
		}
	},
	beforeRouteEnter: (to, from, next) => {
		next((vm) => {
			if (!from.props) {
				vm.itemModel = {}
			}
		})
	},
	created() {
		this.editId && this.fetch()
	},
	methods: {
		afterUpload(res) {
			// 在vue里面，因为itemModel原本没有icon属性，如果要新加属性，就要使用$set方法
			this.$set(this.itemModel, "icon", res.url)
		},
		async fetch() {
			const res = await this.$http.get(`rest/items/${this.editId}`)
			this.itemModel = res.data
		},
		async save() {
			if (this.editId) {
				await this.$http.put(
					`rest/items/${this.editId}`,
					this.itemModel
				)
			} else {
				await this.$http.post("rest/items", this.itemModel)
			}
			this.$router.push("/items/list")
			this.$message({
				type: "success",
				message: "保存成功",
			})
		},
	},
}
</script>

<style></style>
