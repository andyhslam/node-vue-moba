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
		<m-list-card
			icon="cc-menu-circle"
			title="新闻资讯"
			:categories="newsCategory"
		>
			<!-- 通过作用域插槽，父组件不必循环，也能取到子组件里面循环体的某个变量 -->
			<template #items="{ category }">
				<router-link
					tag="div"
					:to="`/articles/${news._id}`"
					class="py-2 fs-lg d-flex"
					v-for="(news, index) in category.newsList"
					:key="index"
				>
					<span class="text-info">[{{ news.categoryName }}]</span>
					<span class="px-2">|</span>
					<span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
						news.title
					}}</span>
					<span class="text-grey-1 fs-sm">{{
						news.createdAt | newsDate
					}}</span>
				</router-link>
			</template>
		</m-list-card>
		<m-list-card
			icon="superhero"
			title="英雄列表"
			:categories="heroCategory"
		>
			<!-- 通过作用域插槽，父组件不必循环，也能取到子组件里面循环体的某个变量 -->
			<template #items="{ category }">
				<div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
					<router-link
						tag="div"
						:to="`/heroes/${hero._id}`"
						class="p-2 text-center"
						style="width: 20%"
						v-for="(hero, index) in category.heroList"
						:key="index"
					>
						<img :src="hero.avatar" class="w-100" />
						<div>{{ hero.name }}</div>
					</router-link>
				</div>
			</template>
		</m-list-card>
		<m-card icon="cc-menu-circle" title="精彩视频"></m-card>
		<m-card icon="cc-menu-circle" title="图文攻略"></m-card>
	</div>
</template>

<script>
import dayjs from "dayjs"

export default {
	name: "HomeView",
	components: {},
	filters: {
		newsDate(val) {
			return dayjs(val).format("MM/DD")
		},
	},
	data() {
		return {
			swiperOption: {
				pagination: {
					el: ".home-pagination",
				},
			},
			newsCategory: [],
			heroCategory: [],
		}
	},
	created() {
		this.fetchNewsCategory()
		this.fetchHeroCategory()
	},
	methods: {
		async fetchNewsCategory() {
			const res = await this.$http.get("/news/list")
			this.newsCategory = res.data
		},
		async fetchHeroCategory() {
			const res = await this.$http.get("/heroes/list")
			this.heroCategory = res.data
		},
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
