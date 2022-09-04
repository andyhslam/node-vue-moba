<template>
	<div class="page-article" v-if="model">
		<div class="d-flex py-3 px-2 border-bottom">
			<i class="iconfont icon-fenxiang text-blue"></i>
			<strong class="flex-1 text-blue pl-2">{{ model.title }}</strong>
			<div class="text-grey fs-xs">2019</div>
		</div>
		<div v-html="model.body" class="body px-3 fs-lg"></div>
		<div class="p-3 border-top">
			<div class="d-flex ai-center">
				<i class="iconfont icon-danju-tianchong"></i>
				<strong class="text-blue fs-lg ml-1">相关资讯</strong>
			</div>
			<div class="pt-2">
				<router-link
					class="py-1"
					tag="div"
					:to="`/articles/${item._id}`"
					v-for="item in model.related"
					:key="item._id"
				>
					{{ item.title }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ArticleView",
	props: {
		id: {
			required: true,
		},
	},
	data() {
		return {
			model: null,
		}
	},
	watch: {
		id: "fetch",
	},
	created() {
		// 页面组件一创建，就执行fetch方法
		this.fetch()
	},
	methods: {
		async fetch() {
			const res = await this.$http.get(`/articles/${this.id}`)
			this.model = res.data
		},
	},
}
</script>

<style lang="scss">
.page-article {
	.body {
		img {
			max-width: 100%;
			height: auto;
		}
		iframe {
			width: 100%;
			height: auto;
		}
	}
}
</style>
