<template>
	<el-card class="box-card">
		<div slot="header">
			<span>用户列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column prop="username" label="用户名">
			</el-table-column>
			<el-table-column prop="nickname" label="昵称">
			</el-table-column>
			<el-table-column prop="sex" label="性别">
			</el-table-column>
			<el-table-column prop="tel" label="手机" width="180">
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-link :href="`#/user/edit/${scope.row.id}`" class="am-margin-right-sm" type="primary">
						<el-button size="mini" icon="el-icon-edit" type="primary" plain>编辑</el-button>
					</el-link>
					<el-button size="mini" icon="el-icon-delete" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>

	export default {
		data() {
			return {
				tableData: [{
					"id": 1,
					"username": "admin",
					"nickname": "papi酱",
					"sex": "女",
					"tel": '15863008280',
				}],
			}
		},
	}
</script>

<style>
</style>
