<template>
	<div class="card bg-white p-3 mt-3">
		<div class="card-header d-flex ai-center pb-3">
			<i class="iconfont" :class="`icon-${icon}`"></i>
			<div class="fs-xl flex-1 px-2">{{ title }}</div>
			<i class="iconfont icon-gengduo"></i>
		</div>
		<div class="card-body pt-3">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "MiniatureCard",
	props: {
		icon: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
			default: "",
		},
	},
}
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";

.card {
	border-bottom: 0.0769rem solid $border-color;
	.card-header {
		border-bottom: 0.0769rem solid $border-color;
	}
}
</style>
