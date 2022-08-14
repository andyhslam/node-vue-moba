<template>
	<div class="category-list">
		<h1>分类列表</h1>
		<el-table :data="items">
			<el-table-column prop="_id" label="ID"></el-table-column>
			<el-table-column prop="name" label="分类名称" />
		</el-table>
	</div>
</template>

<script>
export default {
	name: "CategoryList",
	data() {
		return {
			items: [],
		}
	},
	created() {
		this.fetch()
	},
	methods: {
		async fetch() {
			// 返回promise，把异步的回调函数的写法换成类似同步的写法
			const res = await this.$http.get("categories")
			this.items = res.data
		},
	},
}
</script>
