<template>
	<div class="page-hero" v-if="model">
		<div class="topbar bg-black px-3 py-2 d-flex ai-center text-white">
			<img :src="require('@/assets/logo.png')" height="30" />
			<div class="flex-1">
				<span class="ml-3">王者荣耀</span>
				<span class="ml-3">攻略站</span>
			</div>
			<router-link to="/" tag="div">更多英雄 &gt;</router-link>
		</div>
		<div></div>
	</div>
</template>

<script>
export default {
	name: "HeroView",
	props: {
		// 唯一标识某个详情的id
		id: {
			required: true,
		},
	},
	data() {
		return {
			model: null,
		}
	},
	created() {
		this.fetch()
	},
	methods: {
		async fetch() {
			const res = await this.$http.get(`/heroes/${this.id}`)
			this.model = res.data
		},
	},
}
</script>

<style lang="scss"></style>
