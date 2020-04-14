<template>
	<div>
		<el-row>
			<el-col :span="12">
				<el-card class="box-card">
					<div class="header" slot="header">
						<span>管理员角色</span>
						<el-button plain size="mini" type="primary" @click="AddModalVisible = true" icon="el-icon-circle-plus-outline">添加角色
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
								<el-button size="mini" @click="removeRole(scope.row.id)" :disabled="scope.row.id == 1" type="danger" icon="el-icon-delete"
								 plain>删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
		<!-- 添加Modal -->
		<el-dialog title="添加角色" :visible.sync="AddModalVisible">
			<el-form label-width="80px" :label-position="'left'">
				<el-form-item label="名称">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="AddModalVisible = false">取 消</el-button>
				<el-button type="primary" @click="addRoleHandle">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 编辑Modal -->
		<el-dialog title="编辑角色" :visible.sync="EditModalVisible">
			<el-form label-width="80px" :label-position="'left'">
				<el-form-item label="名称">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="EditModalVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateRoleHandle">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					"id": 1,
					"name": "超级管理员",
				}, {
					"id": 2,
					"name": "管理员",
				}, {
					"id": 3,
					"name": "编辑",
				}],
				AddModalVisible: false,
				addForm: {
					name: "",
				},
				EditModalVisible: false,
				editForm: {
					id: "",
					name: "",
				},
			}
		},
		methods: {
			openEditModal(data) {
				this.editForm = { ...data };
				this.EditModalVisible = true;
			},
			async removeRole(id) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', {
						type: 'warning'
					})
					.then(() => {
						// 删除角色
					});
			},
			updateRoleHandle() {},
			addRoleHandle() {},
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
