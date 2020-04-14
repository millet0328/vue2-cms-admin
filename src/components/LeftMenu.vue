<template>
	<el-menu router class="left-menu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span slot="title">文章管理</span>
			</template>
			<el-menu-item index="/article/release">发布文章</el-menu-item>
			<el-menu-item index="/article/list">文章列表</el-menu-item>
		</el-submenu>
		<el-menu-item index="/category/list">
			<i class="el-icon-data-analysis"></i>
			<span slot="title">分类管理</span>
		</el-menu-item>
		<el-submenu index="3">
			<template slot="title">
				<i class="el-icon-user"></i>
				<span slot="title">用户管理</span>
			</template>
			<el-menu-item index="/user/list">用户列表</el-menu-item>
		</el-submenu>
		<el-submenu index="4">
			<template slot="title">
				<i class="el-icon-set-up"></i>
				<span slot="title">管理员管理</span>
			</template>
			<el-menu-item index="/admin/list">管理员列表</el-menu-item>
		</el-submenu>
		<el-submenu index="5">
			<template slot="title">
				<i class="el-icon-connection"></i>
				<span slot="title">权限管理</span>
			</template>
			<el-menu-item index="/auth/role">权限角色</el-menu-item>
		</el-submenu>
		<el-menu-item index="/admin/info">
			<i class="el-icon-setting"></i>
			<span slot="title">账户设置</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
</script>

<style lang="less">
	.left-menu {
		border-right: 0;
		height: 100%;
	}
</style>
