<template>
	<el-container>
		<el-header>
			<nav-bar></nav-bar>
		</el-header>
		<el-container>
			<el-aside style="min-width: 200px;width: auto;">
				<left-menu></left-menu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import LeftMenu from '@/components/LeftMenu.vue';
	import NavBar from '@/components/NavBar.vue';
	export default {
		components: {
			LeftMenu,
			NavBar
		}
	}
</script>

<style lang="less">
	.el-header {
		background-color: black;
		color: white;
	}

	.el-aside {
		width: auto;
		min-height: calc(100vh - 60px);
	}

	.el-main {
		background-color: white;
		color: #333;
	}
</style>
