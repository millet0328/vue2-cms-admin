<template>
	<div class="nav-bar">
		<div class="left">
			<div class="name">CMS管理系统</div>
			<el-button @click="handleToggle" class="icon-toggle" type="text" icon="el-icon-s-fold"></el-button>
		</div>
		<el-menu mode="horizontal" :default-active="activeIndex" background-color="#31404e" text-color="#fff"
		 active-text-color="#ffd04b">
			<el-menu-item index="1">站点设置</el-menu-item>
			<el-menu-item index="2">预览网站</el-menu-item>
			<el-submenu index="3">
				<template slot="title">
					<el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
					<span class="username am-margin-left-sm">赵薇</span>
				</template>
				<el-menu-item index="/admin/info">账户设置</el-menu-item>
				<el-menu-item>消息通知</el-menu-item>
				<el-menu-item>退出登录</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		computed: {
			...mapState("user", ['profile'])
		},
		created() {
			// 分发action
			this.$store.dispatch('user/loadProfile', sessionStorage.uid);
		},
		methods: {
			handleToggle() {
				this.$store.commit('menu/toggleMenu');
			},
			handleCommand(command) {
				if (command == "logout") {
					// 清空sessionStorage
					sessionStorage.removeItem('token');
					sessionStorage.removeItem('role');
					sessionStorage.removeItem('uid');
					// 跳转页面
					this.$router.replace('/');
				}
			}
		},
	}
</script>

<style lang="less">
	.nav-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			display: flex;
			align-items: center;

			.icon-toggle {
				font-size: 18px;
				margin-left: 20px;
				color: white;
			}
		}
	}
</style>
