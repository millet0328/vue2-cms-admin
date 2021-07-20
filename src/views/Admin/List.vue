<template>
	<el-card class="box-card">
		<div slot="header">
			<span>管理员列表</span>
		</div>
		<el-table :data="tableData">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column prop="username" label="用户名">
			</el-table-column>
			<el-table-column prop="fullname" label="姓名">
			</el-table-column>
			<el-table-column prop="sex" label="性别">
			</el-table-column>
			<el-table-column prop="tel" label="手机">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="180">
			</el-table-column>
			<el-table-column label="头像">
				<template slot-scope="scope">
					<el-avatar shape="square" :src="scope.row.avatar"></el-avatar>
				</template>
			</el-table-column>
			<el-table-column label="角色">
				<template slot-scope="scope">
					<el-tag>{{ scope.row.role_name }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-link :href="`#/admin/edit/${scope.row.id}`" class="am-margin-right-sm" type="primary">
						<el-button size="mini" icon="el-icon-edit" type="primary" plain>编辑</el-button>
					</el-link>
					<el-button @click="handleRemove" size="mini" type="danger" icon="el-icon-delete" plain>删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Admin } from '@/api/index';

	export default {
		data() {
			return {
				tableData: [],
			}
		},
		created() {
			document.title = "管理员列表";
			this.loadList();
		},
		methods: {
			async loadList() {
				let { status, data } = await Admin.list();
				if (status) {
					this.tableData = data;
				}
			},
			handleRemove() {
				this.$confirm('此操作将永久删除该管理员, 是否继续?', {
						type: 'warning'
					})
					.then(() => {
						// 删除
					});
			}
		}
	}
</script>

<style>
</style>
