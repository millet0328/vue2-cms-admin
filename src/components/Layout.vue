<template>
	<el-container>
		<el-header>
			<NavBar></NavBar>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<SideBar></SideBar>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import NavBar from '@/components/NavBar.vue';
	import SideBar from '@/components/SideBar.vue';
	export default {
		components: {
			NavBar,
			SideBar,
		}
	}
</script>

<style scoped>
	.el-header {
		background-color: #31404e;
		color: white;
	}

	.el-aside {
		overflow: hidden;
		background-color: #545c64;
		min-height: calc(100vh - 60px);
	}
</style>
