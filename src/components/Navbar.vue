<template>
	<div class="nav-bar">
		<div class="left">
			<img class="logo am-margin-right-sm" src="../assets/img/common/logo.png">
			<i class="el-icon-s-fold"></i>
		</div>
		<el-menu mode="horizontal" router :default-active="activeIndex" background-color="#31404e" text-color="#fff" active-text-color="#ffd04b">
			<el-submenu index="1">
				<template slot="title">
					<el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
					<span class="username am-margin-left-sm">赵薇</span>
				</template>

				<el-menu-item index="/admin/info">账户设置</el-menu-item>
				<el-menu-item>收到的评论</el-menu-item>
				<el-menu-item>退出登录</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
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

			.logo {
				height: 50px;
			}
		}

	}
</style>
