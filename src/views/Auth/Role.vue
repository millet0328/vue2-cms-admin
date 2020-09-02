<template>
	<div>
		<el-row>
			<el-col :span="12">
				<el-card class="box-card">
					<div class="header" slot="header">
						<span>管理员角色</span>
						<el-button plain size="mini" type="primary" @click="openInsertModal" icon="el-icon-circle-plus-outline">添加角色
						</el-button>
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
								<el-button size="mini" @click="openEditModal(scope.row)" :disabled="scope.row.id == 1" icon="el-icon-edit" type="primary"
								 plain>编辑</el-button>
								<el-button size="mini" @click="removeRole(scope.row.id,scope.$index)" :disabled="scope.row.id == 1" type="danger"
								 icon="el-icon-delete" plain>删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { Role } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],
			}
		},
		created() {
			this.loadList();
		},
		methods: {
			// 加载列表
			async loadList() {
				let { status, data } = await Role.list()
				if (status) {
					this.tableData = data;
				}
			},
			openEditModal(data) {
				this.$prompt('请输入角色名称', {
						inputValue: data.name,
						inputPattern: /\S/,
						inputErrorMessage: '角色名称不能为空！'
					})
					.then(async ({ value }) => {
						let { status } = await Role.edit(data.id, value);
						if (status) {
							data.name = value;
							this.$message.success('修改成功！');
						}
					})
					.catch(() => {
						this.$message.info('取消编辑')
					});
			},
			async removeRole(id, index) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', {
						type: 'warning'
					})
					.then(async () => {
						// 删除角色
						let { status, data } = await Role.remove(id);
						if (status) {
							this.tableData.splice(index, 1);
							this.$message.success('删除成功！');
						}
					})
					.catch(() => {
						this.$message.info('取消成功')
					});
			},
			openInsertModal() {
				this.$prompt('请输入角色名称', {
						inputPattern: /\S/,
						inputErrorMessage: '角色名称不能为空！'
					})
					.then(async ({ value }) => {
						let { status, data } = await Role.insert({ name: value });
						if (status) {
							this.tableData.push({ name: value, ...data });
							this.$message.success('添加成功！');
						}
					})
					.catch(() => {
						this.$message.info('取消成功')
					});
			},
		}
	}
</script>

<style lang="less">
	.box-card {
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
