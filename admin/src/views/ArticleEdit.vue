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
				<vue-editor
					useCustomImageHandler
					@image-added="handleImageAdded"
					v-model="articleModel.body"
				></vue-editor>
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
	/**
	 * 已在Main.vue组件内用<router-view :key="$route.path"></router-view>来解决
	 */
	// beforeRouteEnter: (to, from, next) => {
	// 	next((vm) => {
	// 		if (!from.props) {
	// 			vm.articleModel = {}
	// 		}
	// 	})
	// },
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
		async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
			/**
			 * 两种方式：1.提交表单数据(上传文件)；2.提交json数据
			 * 在这里由于要上传文件，所以必须得提交表单数据
			 */
			const formData = new FormData()
			formData.append("file", file)
			const res = await this.$http.post("upload", formData)
			Editor.insertEmbed(cursorLocation, "image", res.data.url)
			resetUploader()
		},
	},
}
</script>
