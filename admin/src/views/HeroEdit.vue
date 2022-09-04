<template>
	<div class="hero-edit">
		<h1>{{ editId ? "编辑" : "新建" }}英雄</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			<el-tabs type="border-card" value="basic">
				<el-tab-pane label="基础信息" name="basic">
					<el-form-item label="名称">
						<el-input v-model="heroModel.name"></el-input>
					</el-form-item>
					<el-form-item label="称号">
						<el-input v-model="heroModel.title"></el-input>
					</el-form-item>
					<el-form-item label="头像">
						<el-upload
							class="avatar-uploader"
							:headers="getAuthHeaders()"
							:action="uploadUrl"
							:show-file-list="false"
							:on-success="(res) => (heroModel.avatar = res.url)"
						>
							<img
								v-if="heroModel.avatar"
								:src="heroModel.avatar"
								class="avatar"
							/>
							<i
								v-else
								class="el-icon-plus avatar-uploader-icon"
							></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="背景图">
						<el-upload
							class="avatar-uploader"
							:headers="getAuthHeaders()"
							:action="uploadUrl"
							:show-file-list="false"
							:on-success="
								(res) => $set(heroModel, 'banner', res.url)
							"
						>
							<img
								v-if="heroModel.banner"
								:src="heroModel.banner"
								class="avatar"
							/>
							<i
								v-else
								class="el-icon-plus avatar-uploader-icon"
							></i>
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
				</el-tab-pane>
				<el-tab-pane label="技能" name="skills">
					<el-button size="small" @click="heroModel.skills.push({})">
						<i class="el-icon-plus"></i> 添加技能
					</el-button>
					<el-row type="flex" style="flex-wrap: wrap">
						<!-- 在中等屏幕md，宽度设置为12，即一行展示两个框 -->
						<el-col
							:md="12"
							v-for="(item, index) in heroModel.skills"
							:key="index"
						>
							<el-form-item label="名称">
								<el-input v-model="item.name"></el-input>
							</el-form-item>
							<el-form-item label="图标">
								<el-upload
									class="avatar-uploader"
									:headers="getAuthHeaders()"
									:action="uploadUrl"
									:show-file-list="false"
									:on-success="
										(res) => $set(item, 'icon', res.url)
									"
								>
									<img
										v-if="item.icon"
										:src="item.icon"
										class="avatar"
									/>
									<i
										v-else
										class="el-icon-plus avatar-uploader-icon"
									></i>
								</el-upload>
							</el-form-item>
							<el-form-item label="冷却值">
								<el-input v-model="item.delay"></el-input>
							</el-form-item>
							<el-form-item label="消耗">
								<el-input v-model="item.cost"></el-input>
							</el-form-item>
							<el-form-item label="描述">
								<el-input
									type="textarea"
									v-model="item.description"
								></el-input>
							</el-form-item>
							<el-form-item label="小提示">
								<el-input
									type="textarea"
									v-model="item.tips"
								></el-input>
							</el-form-item>
							<el-form-item>
								<el-button
									size="small"
									type="danger"
									@click="heroModel.skills.splice(index, 1)"
									>删除</el-button
								>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="最佳搭档" name="partners">
					<el-button
						size="small"
						@click="heroModel.partners.push({})"
					>
						<i class="el-icon-plus"></i> 添加英雄
					</el-button>
					<el-row type="flex" style="flex-wrap: wrap">
						<!-- 在中等屏幕md，宽度设置为12，即一行展示两个框 -->
						<el-col
							:md="12"
							v-for="(item, index) in heroModel.partners"
							:key="index"
						>
							<el-form-item label="英雄">
								<el-select
									filterable
									clearable
									v-model="item.hero"
								>
									<el-option
										v-for="hero in heroes"
										:key="hero._id"
										:value="hero._id"
										:label="hero.name"
									></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="描述">
								<el-input
									type="textarea"
									v-model="item.description"
								></el-input>
							</el-form-item>
							<el-form-item>
								<el-button
									size="small"
									type="danger"
									@click="heroModel.partners.splice(index, 1)"
									>删除</el-button
								>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
			<el-form-item style="margin-top: 1rem">
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
				banner: "",
				scores: {},
				skills: [],
				partners: [],
			},
			categories: [],
			items: [],
			heroes: [],
		}
	},
	/**
	 * 已在Main.vue组件内用<router-view :key="$route.path"></router-view>来解决
	 */
	// beforeRouteEnter: (to, from, next) => {
	// 	next((vm) => {
	// 		if (!from.props) {
	// 			vm.heroModel = {
	// 				name: "",
	// 				avatar: "",
	//        banner: "",
	// 				scores: {},
	// 				skills: [],
	// 				partners: [],
	// 			}
	// 		}
	// 	})
	// },
	created() {
		this.fetchCategories()
		this.fetchItems()
		this.fetchHeroes()
		this.editId && this.fetch()
	},
	methods: {
		async fetch() {
			const res = await this.$http.get(`rest/heroes/${this.editId}`)
			this.heroModel = Object.assign({}, this.heroModel, res.data)
		},
		async fetchCategories() {
			const res = await this.$http.get(`rest/categories`)
			this.categories = res.data
		},
		async fetchItems() {
			const res = await this.$http.get("/rest/items")
			this.items = res.data
		},
		async fetchHeroes() {
			const res = await this.$http.get(`/rest/heroes`)
			this.heroes = res.data
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

<style></style>
