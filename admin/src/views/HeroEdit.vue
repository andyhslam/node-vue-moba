<template>
	<div class="item-edit">
		<h1>{{ editId ? "编辑" : "新建" }}英雄</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-form-item label="名称">
				<el-input v-model="heroModel.name"></el-input>
			</el-form-item>
			<el-form-item label="称号">
				<el-input v-model="heroModel.title"></el-input>
			</el-form-item>
			<el-form-item label="头像">
				<el-upload
					class="avatar-uploader"
					:action="$http.defaults.baseURL + '/upload'"
					:show-file-list="false"
					:on-success="afterUpload"
				>
					<img
						v-if="heroModel.avatar"
						:src="heroModel.avatar"
						class="avatar"
					/>
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="类型">
				<el-select v-model="heroModel.categories" multiple>
					<el-option
						v-for="item of categories"
						:key="item._id"
						:label="item.name"
						:value="item._id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="难度">
				<el-rate
					:max="9"
					show-score
					v-model="heroModel.scores.difficult"
					style="margin-top: 0.6rem"
				></el-rate>
			</el-form-item>
			<el-form-item label="技能">
				<el-rate
					:max="9"
					show-score
					v-model="heroModel.scores.skills"
					style="margin-top: 0.6rem"
				></el-rate>
			</el-form-item>
			<el-form-item label="攻击">
				<el-rate
					:max="9"
					show-score
					v-model="heroModel.scores.attack"
					style="margin-top: 0.6rem"
				></el-rate>
			</el-form-item>
			<el-form-item label="生存">
				<el-rate
					:max="9"
					show-score
					v-model="heroModel.scores.survive"
					style="margin-top: 0.6rem"
				></el-rate>
			</el-form-item>
			<el-form-item label="顺风出装">
				<el-select v-model="heroModel.items1" multiple>
					<el-option
						v-for="item of items"
						:key="item._id"
						:label="item.name"
						:value="item._id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="逆风出装">
				<el-select v-model="heroModel.items2" multiple>
					<el-option
						v-for="item of items"
						:key="item._id"
						:label="item.name"
						:value="item._id"
					></el-option>
				</el-select>
			</el-form-item>
			<!-- 管理后台的每个编辑字段都是一个el-form-item -->
			<el-form-item label="使用技巧">
				<el-input
					v-model="heroModel.usageTips"
					type="textarea"
				></el-input>
			</el-form-item>
			<el-form-item label="对抗技巧">
				<el-input
					v-model="heroModel.battleTips"
					type="textarea"
				></el-input>
			</el-form-item>
			<el-form-item label="团战思路">
				<el-input
					v-model="heroModel.teamTips"
					type="textarea"
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
	name: "HeroEdit",
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
			heroModel: {
				name: "",
				avatar: "",
				scores: {
					difficult: 0,
				},
			},
			categories: [],
			items: [],
		}
	},
	beforeRouteEnter: (to, from, next) => {
		next((vm) => {
			if (!from.props) {
				vm.heroModel = {
					name: "",
					avatar: "",
					scores: {
						difficult: 0,
					},
				}
			}
		})
	},
	created() {
		this.fetchCategories()
		this.fetchItems()
		this.editId && this.fetch()
	},
	methods: {
		afterUpload(res) {
			this.heroModel.avatar = res.url
		},
		async fetch() {
			const res = await this.$http.get(`rest/heroes/${this.editId}`)
			this.heroModel = Object.assign({}, this.heroModel, res.data)
		},
		async fetchCategories() {
			const res = await this.$http.get(`rest/categories`)
			this.categories = res.data
		},
		async fetchItems() {
			const res = await this.$http.get(`rest/items`)
			this.items = res.data
		},
		async save() {
			if (this.editId) {
				await this.$http.put(
					`rest/heroes/${this.editId}`,
					this.heroModel
				)
			} else {
				await this.$http.post("rest/heroes", this.heroModel)
			}
			this.$router.push("/heroes/list")
			this.$message({
				type: "success",
				message: "保存成功",
			})
		},
	},
}
</script>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
