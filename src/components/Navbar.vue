<template>
	<div class="nav-bar">
		<div class="left">
			<div class="name">CMS管理系统</div>
			<el-button @click="handleToggle" class="icon-toggle" type="text" icon="el-icon-s-fold"></el-button>
		</div>
		<div class="right">
			<el-dropdown @command="handleCommand">
				<span class="el-dropdown-link">
					<el-avatar :src="profile.avatar"></el-avatar>
					<span class="nickname">{{profile.fullname}}</span>
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu size="medium" slot="dropdown">
					<el-dropdown-item>账户信息</el-dropdown-item>
					<el-dropdown-item>当前任务</el-dropdown-item>
					<el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
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
		padding: 8px 0;

		.left {
			display: flex;
			align-items: center;

			.icon-toggle {
				font-size: 18px;
				margin-left: 20px;
				color: white;
			}
		}

		.right .el-dropdown-link {
			display: flex;
			align-items: center;

			.nickname {
				color: white;
				margin: 0 8px;
			}
		}
	}
</style>
