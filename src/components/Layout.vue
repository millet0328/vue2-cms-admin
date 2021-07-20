<template>
	<el-container>
		<el-header>
			<nav-bar></nav-bar>
		</el-header>
		<el-container>
			<el-aside width="auto">
				<side-bar></side-bar>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import SideBar from '@/components/SideBar.vue';
	import NavBar from '@/components/NavBar.vue';
	export default {
		components: {
      SideBar,
			NavBar
		}
	}
</script>

<style lang="less" scoped="scoped">
	.el-header {
		background-color: #31404e;
		color: white;
		padding: 0px;
	}

	.el-aside {
		background-color: #545c64;
		min-height: calc(100vh - 60px);
	}

	.el-main {
		background-color: white;
		color: #333;
	}
</style>
