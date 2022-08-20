<template>
	<div class="item-list">
		<h1>物品列表</h1>
		<el-table :data="items">
			<el-table-column prop="_id" label="ID"></el-table-column>
			<el-table-column prop="name" label="物品名称" />
			<el-table-column fixed="right" label="操作" width="180">
				<template slot-scope="{ row }">
					<el-button
						type="text"
						size="small"
						@click="$router.push(`/items/edit/${row._id}`)"
						>编辑</el-button
					>
					<el-button type="text" size="small" @click="removeItem(row)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: "ItemList",
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
			const res = await this.$http.get("rest/items")
			this.items = res.data
		},
		removeItem(row) {
			this.$confirm(`是否确定要删除物品 "${row.name}"`, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					await this.$http.delete(`rest/items/${row._id}`)
					this.$message({
						type: "success",
						message: "删除成功!",
					})
					this.fetch()
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					})
				})
		},
	},
}
</script>
