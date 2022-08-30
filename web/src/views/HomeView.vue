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
<style lang="scss" scoped>
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
</style>
