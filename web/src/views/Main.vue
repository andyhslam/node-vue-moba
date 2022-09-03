<template>
	<!-- 主页面框架 -->
	<div class="main">
		<div class="topbar bg-black px-3 py-2 d-flex ai-center">
			<img :src="require('@/assets/logo.png')" height="30" />
			<div class="px-2 flex-1">
				<div class="text-white">王者荣耀</div>
				<div class="text-grey-1 fs-xxs">团队成就更多</div>
			</div>
			<button type="button" class="btn bg-primary">立即下载</button>
		</div>
		<div class="bg-primary pt-3 pb-2">
			<div class="nav nav-inverse jc-around pb-1">
				<div class="nav-item active">
					<router-link class="nav-link" tag="div" to="/"
						>首页</router-link
					>
				</div>
				<div class="nav-item">
					<router-link class="nav-link" tag="div" to="/"
						>攻略中心</router-link
					>
				</div>
				<div class="nav-item">
					<router-link class="nav-link" tag="div" to="/"
						>赛事中心</router-link
					>
				</div>
			</div>
		</div>
		<!-- 子路由容器存放具体页面 -->
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "MainView",
	components: {},
}
</script>

<style></style>
