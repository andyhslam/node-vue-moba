<template>
	<div class="category-edit">
		<h1>{{ editId ? "编辑" : "新建" }}广告位</h1>
		<el-form label-width="70px" @submit.native.prevent="save">
			<el-form-item label="名称">
				<el-input v-model="advertModel.name"></el-input>
			</el-form-item>
			<el-form-item label="广告">
				<el-button size="small" @click="advertModel.items.push({})">
					<i class="el-icon-plus"></i> 添加广告
				</el-button>
				<el-row type="flex" style="flex-wrap: wrap">
					<!-- 在中等屏幕md，宽度设置为12，即一行展示两个框 -->
					<el-col
						:md="24"
						v-for="(item, index) in advertModel.items"
						:key="index"
					>
						<el-form-item label="跳转链接" style="margin-top: 1rem">
							<el-input v-model="item.url"></el-input>
						</el-form-item>
						<el-form-item label="图片" style="margin-top: 1rem">
							<el-upload
								class="avatar-uploader"
								:action="$http.defaults.baseURL + '/upload'"
								:show-file-list="false"
								:on-success="
									(res) => $set(item, 'image', res.url)
								"
							>
								<img
									v-if="item.image"
									:src="item.image"
									class="avatar"
								/>
								<i
									v-else
									class="el-icon-plus avatar-uploader-icon"
								></i>
							</el-upload>
						</el-form-item>
						<el-form-item>
							<el-button
								size="small"
								type="danger"
								@click="advertModel.items.splice(index, 1)"
								>删除</el-button
							>
						</el-form-item>
					</el-col>
				</el-row>
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
			advertModel: {
				name: "",
				items: [],
			},
		}
	},
	beforeRouteEnter: (to, from, next) => {
		next((vm) => {
			if (!from.props) {
				vm.advertModel = {
					name: "",
					items: [],
				}
			}
		})
	},
	created() {
		this.editId && this.fetch()
	},
	methods: {
		async fetch() {
			const res = await this.$http.get(`rest/adverts/${this.editId}`)
			this.advertModel = Object.assign({}, this.advertModel, res.data)
		},
		async save() {
			if (this.editId) {
				await this.$http.put(
					`rest/adverts/${this.editId}`,
					this.advertModel
				)
			} else {
				await this.$http.post("rest/adverts", this.advertModel)
			}
			this.$router.push("/adverts/list")
			this.$message({
				type: "success",
				message: "保存成功",
			})
		},
	},
}
</script>
