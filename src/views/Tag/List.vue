<template>
	<el-card class="box-card">
		<div class="header" slot="header">
			<span>标签列表</span>
			<el-button plain size="mini" type="primary" icon="el-icon-circle-plus-outline">
				添加标签
			</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column prop="name" label="标签名称">
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-button size="mini" icon="el-icon-edit" type="primary" plain>编辑</el-button>
					<el-button size="mini" icon="el-icon-delete" type="danger" plain>删除</el-button>
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
					"name": "二次元",
				}],
			}
		},
		methods: {

		}
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
