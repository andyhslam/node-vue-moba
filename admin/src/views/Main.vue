<template>
	<el-container style="height: 100vh">
		<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
			<el-menu
				router
				:default-openeds="['3']"
				unique-opened
				:default-active="$route.path"
			>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-message"></i>内容管理
					</template>
					<el-menu-item-group>
						<template slot="title">物品</template>
						<el-menu-item index="/items/create">
							新建物品
						</el-menu-item>
						<el-menu-item index="/items/list">
							物品列表
						</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<template slot="title">英雄</template>
						<el-menu-item index="/heroes/create">
							新建英雄
						</el-menu-item>
						<el-menu-item index="/heroes/list">
							英雄列表
						</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<template slot="title">文章</template>
						<el-menu-item index="/articles/create">
							新建文章
						</el-menu-item>
						<el-menu-item index="/articles/list">
							文章列表
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-message"></i>运营管理
					</template>
					<el-menu-item-group>
						<template slot="title">广告位</template>
						<el-menu-item index="/adverts/create">
							新建广告位
						</el-menu-item>
						<el-menu-item index="/adverts/list">
							广告位列表
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-message"></i>系统设置
					</template>
					<el-menu-item-group>
						<template slot="title">分类</template>
						<el-menu-item index="/categories/create">
							新建分类
						</el-menu-item>
						<el-menu-item index="/categories/list">
							分类列表
						</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group>
						<template slot="title">管理员</template>
						<el-menu-item index="/admin_users/create">
							新建管理员
						</el-menu-item>
						<el-menu-item index="/admin_users/list">
							管理员列表
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-aside>

		<el-container>
			<el-header style="text-align: right">
				<span style="margin-right: 15px">{{ username }}</span>
				<el-button
					type="text"
					icon="el-icon-switch-button"
					@click="logout"
					>退出</el-button
				>
			</el-header>

			<el-main>
				<!-- 路由容器(显示子路由的地方)，默认以路由的组件来区分，但是现在两个(新建和编辑)页面共用一个组件，所以区分不开； -->
				<!-- :key="$route.path"表示以路由的路径来区分，因此跳转路由时，数据会重载。 -->
				<router-view :key="$route.path"></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	name: "MainView",
	data() {
		return {
			username: localStorage.username,
		}
	},
	methods: {
		logout() {
			this.$confirm("是否确定退出", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					// 清空所有storage，包括token
					localStorage.clear()
					this.$router.push("/login")
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消退出",
					})
				})
		},
	},
}
</script>

<style>
.el-header {
	background-color: #b3c0d1;
	color: #333;
	line-height: 60px;
}

.el-aside {
	color: #333;
}
</style>
