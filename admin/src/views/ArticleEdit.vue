<template>
	<div class="article-edit">
		<h1>{{ editId ? "编辑" : "新建" }}文章</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="所属分类">
				<el-select v-model="articleModel.categories" multiple>
					<el-option
						v-for="item in categories"
						:key="item._id"
						:label="item.name"
						:value="item._id"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="标题">
				<el-input v-model="articleModel.title"></el-input>
			</el-form-item>
			<el-form-item label="详情">
				<vue-editor v-model="articleModel.body"></vue-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { VueEditor } from "vue2-editor"

export default {
	name: "ArticleEdit",
	components: {
		VueEditor,
	},
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
			articleModel: {},
			categories: [],
		}
	},
	beforeRouteEnter: (to, from, next) => {
		next((vm) => {
			if (!from.props) {
				vm.articleModel = {}
			}
		})
	},
	created() {
		this.fetchCategories()
		this.editId && this.fetch()
	},
	methods: {
		async fetchCategories() {
			const res = await this.$http.get(`rest/categories`)
			this.categories = res.data
		},
		async fetch() {
			const res = await this.$http.get(`rest/articles/${this.editId}`)
			this.articleModel = res.data
		},
		async save() {
			if (this.editId) {
				await this.$http.put(
					`rest/articles/${this.editId}`,
					this.articleModel
				)
			} else {
				await this.$http.post("rest/articles", this.articleModel)
			}
			this.$router.push("/articles/list")
			this.$message({
				type: "success",
				message: "保存成功",
			})
		},
	},
}
</script>
