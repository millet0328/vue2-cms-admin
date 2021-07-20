<template>
	<el-card class="box-card">
		<div class="header" slot="header">
			<span>标签列表</span>
			<el-button @click="insertDialogVisible = true" plain size="mini" type="primary"
				icon="el-icon-circle-plus-outline">
				添加标签
			</el-button>
		</div>
		<el-table :data="tableData">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column prop="name" label="标签名称">
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-button @click="openEditDialog(scope.row)" size="mini" icon="el-icon-edit" type="primary" plain>编辑</el-button>
					<el-button @click="handleRemove(scope.row.id,scope.$index)" size="mini" icon="el-icon-delete"
						type="danger" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加标签 -->
		<el-dialog title="添加标签" :visible.sync="insertDialogVisible" @close="handleDialogClose('insertForm')">
			<el-form ref="insertForm" :rules="rules" :model="insertForm" label-width="80px">
				<el-form-item label="标签名称" prop="name">
					<el-input v-model="insertForm.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="insertDialogVisible = false">取 消</el-button>
				<el-button @click="handleInsert" type="primary">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 编辑标签 -->
		<el-dialog title="编辑标签" :visible.sync="editDialogVisible" @close="handleDialogClose('editForm')">
			<el-form ref="editForm" :rules="rules" :model="editForm" label-width="80px">
				<el-form-item label="标签名称" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button @click="handleEdit" type="primary">保 存</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
	import { Tag } from '@/api/';
	export default {
		data() {
			return {
				tableData: [],
				insertDialogVisible: false,
				editDialogVisible: false,
				insertForm: {
					name: '',
				},
				editForm: {
					id: '',
					name: '',
				},
				rules: {
					name: [{ required: true, message: "请输入角色名称", trigger: 'blur' }]
				},
			}
		},
		created() {
			this.loadList();
			document.title = "标签列表";
		},
		methods: {
			// 加载列表
			async loadList() {
				let { status, data } = await Tag.list()
				if (status) {
					this.tableData = data;
				}
			},
			handleInsert() {
				this.$refs.insertForm.validate(async (valid) => {
					if (valid) {
						let { status, msg, data } = await Tag.insert({ ...this.insertForm });
						if (status) {
							this.tableData.push({ ...data, ...this.insertForm });
							this.insertDialogVisible = false;
						}
					}
				});
			},
			openEditDialog(role) {
				this.editForm = { ...role };
				this.editDialogVisible = true;
			},
			handleEdit() {
				this.$refs.editForm.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Tag.edit(this.editForm.id, { ...this.editForm });
						if (status) {
							this.$message.success('修改成功！');
							this.editDialogVisible = false;
							// 更新DOM
							this.loadList();
						} else {
							this.$message.error('修改失败！');
						}
					}
				});
			},
			async handleRemove(id, index) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', {
						type: 'warning'
					})
					.then(async () => {
						// 删除角色
						let { status, data } = await Tag.remove(id);
						if (status) {
							this.tableData.splice(index, 1);
							this.$message.success('删除成功！');
						}
					})
					.catch(() => {
						this.$message.info('取消成功')
					});
			},
			handleDialogClose(form) {
				this.$refs[form].resetFields();
			},
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
