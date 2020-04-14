<template>
	<div class="nav-bar">
		<div class="left">
			<div class="name">CMS管理系统</div>
			<el-button class="icon-toggle" type="text" icon="el-icon-s-fold"></el-button>
		</div>
		<div class="right">
			<el-dropdown>
				<span class="el-dropdown-link">
					<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
					<span class="nickname">黄小米</span>
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu size="medium" slot="dropdown">
					<el-dropdown-item>账户信息</el-dropdown-item>
					<el-dropdown-item>当前任务</el-dropdown-item>
					<el-dropdown-item divided>退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
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
