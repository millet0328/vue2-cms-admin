<template>
	<div>
		<el-row>
			<el-col :span="12">
				<el-card class="box-card">
					<div class="header" slot="header">
						<span>管理员角色</span>
						<el-button plain size="mini" type="primary" icon="el-icon-circle-plus-outline">添加角色</el-button>
					</div>
					<el-table :data="tableData" style="width: 100%">
						<el-table-column prop="id" label="#">
						</el-table-column>
						<el-table-column prop="name" label="分类">
							<template slot-scope="scope">
								<el-tag>{{scope.row.name}}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="180">
							<template slot-scope="scope">
								<el-button size="mini" icon="el-icon-edit" type="primary" plain>编辑</el-button>
								<el-button size="mini" type="danger" icon="el-icon-delete" plain>删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [
				{ "id": 1, "name": "超级管理员" }],
		}
	},
}
</script>

<style lang="less" scoped>
.box-card {
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
