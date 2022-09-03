<template>
	<div class="home">
		<swiper :options="swiperOption">
			<swiper-slide>
				<img
					class="w-100"
					:src="require('@/assets/images/top_banner1.jpeg')"
				/>
			</swiper-slide>
			<swiper-slide>
				<img
					class="w-100"
					:src="require('@/assets/images/top_banner2.jpeg')"
				/>
			</swiper-slide>
			<swiper-slide>
				<img
					class="w-100"
					:src="require('@/assets/images/top_banner3.jpeg')"
				/>
			</swiper-slide>
			<div
				class="swiper-pagination home-pagination text-right px-3 pb-1"
				slot="pagination"
			></div>
		</swiper>
		<!-- end of swiper -->
		<div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
			<div class="d-flex flex-wrap">
				<div class="nav-item mb-3" v-for="n in 10" :key="n">
					<i class="sprite sprite-news"></i>
					<div class="py-2">爆料站</div>
				</div>
			</div>
			<div class="bg-light py-2 fs-sm d-flex jc-center ai-center">
				<i class="sprite sprite-arrow mr-1"></i>
				<span>收起</span>
			</div>
		</div>
		<!-- end of nav icons -->
		<m-card icon="cc-menu-circle" title="新闻资讯">
			<div class="nav jc-between">
				<div class="nav-item active">
					<div class="nav-link">热门</div>
				</div>
				<div class="nav-item">
					<div class="nav-link">新闻</div>
				</div>
				<div class="nav-item">
					<div class="nav-link">热门</div>
				</div>
				<div class="nav-item">
					<div class="nav-link">新闻</div>
				</div>
				<div class="nav-item">
					<div class="nav-link">热门</div>
				</div>
			</div>
			<div class="pt-3">
				<swiper>
					<swiper-slide v-for="m in 5" :key="m">
						<div class="py-2" v-for="n in 5" :key="n">
							<span>[新闻]</span>
							<span>|</span>
							<span>姜子牙英雄品质升级共创-台词票选活动开启</span>
							<span>06/02</span>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</m-card>
		<m-card icon="cc-menu-circle" title="英雄列表"></m-card>
		<m-card icon="cc-menu-circle" title="精彩视频"></m-card>
		<m-card icon="cc-menu-circle" title="图文攻略"></m-card>
	</div>
</template>

<script>
export default {
	name: "HomeView",
	components: {},
	data() {
		return {
			swiperOption: {
				pagination: {
					el: ".home-pagination",
				},
			},
		}
	},
}
</script>
<style lang="scss">
@import "@/assets/scss/_variables.scss";

.home-pagination {
	.swiper-pagination-bullet {
		opacity: 1;
		border-radius: 0.1538rem;
		background-color: map-get($colors, "white");
		&.swiper-pagination-bullet-active {
			background-color: map-get($colors, "info");
		}
	}
}

.nav-icons {
	border-top: 1px solid $border-color;
	border-bottom: 1px solid $border-color;
	.nav-item {
		width: 25%;
		border-right: 1px solid $border-color;
		&:nth-child(4n) {
			border-right: none;
		}
	}
}
</style>
