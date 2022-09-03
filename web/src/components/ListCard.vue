<template>
	<m-card :icon="icon" :title="title">
		<div class="nav jc-between">
			<div
				class="nav-item"
				:class="{ active: active === index }"
				v-for="(category, index) in categories"
				:key="index"
			>
				<div class="nav-link" @click="$refs.list.swiper.slideTo(index)">
					{{ category.name }}
				</div>
			</div>
		</div>
		<div class="pt-3">
			<swiper
				ref="list"
				@slide-change="() => (active = $refs.list.swiper.realIndex)"
			>
				<swiper-slide
					v-for="(category, index) in categories"
					:key="index"
				>
					<slot name="items" :category="category"></slot>
				</swiper-slide>
			</swiper>
		</div>
	</m-card>
</template>

<script>
export default {
	name: "ListCard",
	props: {
		categories: {
			type: Array,
			required: true,
		},
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
	data() {
		return {
			active: 0,
		}
	},
}
</script>

<style lang="scss"></style>
