<template>
	<el-container>
		<el-header>
			<Navbar></Navbar>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<LeftMenu></LeftMenu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import LeftMenu from '@/components/LeftMenu.vue';
	import Navbar from '@/components/Navbar.vue';
	export default {
		components: {
			LeftMenu,
			Navbar
		}
	}
</script>

<style lang="less">
	.el-header {
		background-color: black;
		color: white;
	}

	.el-aside {
		min-height: calc(100vh - 60px);
	}

	.el-main {
		background-color: white;
		color: #333;
	}
</style>
