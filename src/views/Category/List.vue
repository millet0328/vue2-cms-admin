<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>分类列表</span>
			</div>
			<!-- 树形组件 -->
			<el-tree ref="tree" node-key="id" :load="loadNode" :default-expanded-keys="[0]" lazy :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button @click.stop="openEditModal(node, data)" type="text" icon="el-icon-edit" size="mini">
							编辑
						</el-button>
						<el-button @click.stop="openInsertModal(node, data)" type="text" icon="el-icon-circle-plus-outline"
							size="mini">
							添加
						</el-button>
						<el-button @click.stop="openRemoveModal(node, data)" type="text" icon="el-icon-delete"
							size="mini">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加模态框 -->
		<el-dialog title="添加分类" :visible.sync="insertVisible" width="40%">
			<el-form :model="insertForm" :rules="rules" ref="insertForm" label-width="80px">
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="insertForm.name"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="insertVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleInsert('insertForm')">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 编辑模态框 -->
		<el-dialog title="编辑分类" :visible.sync="editVisible" width="40%">
			<el-form :model="editForm" :rules="rules" ref="editForm" label-width="80px">
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleEdit('editForm')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { Category } from "@/api/index";

	export default {
		data() {
			return {
				defaultProps: {
					label: "name",
				},
				insertForm: {
					name: "",
					parent_id: "",
				},
				editForm: {
					id: "",
					name: "",
					parent_id: "",
				},
				rules: {
					name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
				},
				node: {}, //节点对象
				insertVisible: false,
				editVisible: false,
			};
		},
		created() {
			document.title = "分类列表";
		},
		methods: {
			async loadNode(node, resolve) {
				// 根节点
				if (node.level == 0) {
					return resolve([{ name: "全部分类", id: 0 }]);
				}
				// 子节点
				let { id } = node.data;
				let { status, data } = await Category.subcate({ id });
				if (status) {
					resolve(data);
				}
			},
			openEditModal(node, data) {
				// 转存节点对象
				this.node = node;
				this.editForm = { ...data };
				this.editVisible = true;
			},
			handleEdit(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Category.edit({ ...this.editForm });
						if (status) {
							this.$message.success(msg);
							this.editVisible = false;
							// 更新节点
							this.node.data = this.editForm;
						} else {
							this.$message.error(msg);
						}
					}
				});
			},
			openInsertModal(node, data) {
				// 转存父级分类id
				this.insertForm.parent_id = data.id;
				// 转存父类节点parentNode
				this.node = node;
				this.insertVisible = true;
			},
			handleInsert(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, msg, data } = await Category.insert({ ...this.insertForm });
						if (status) {
							// 关闭弹窗
							this.insertVisible = false;
							// 添加节点
							this.$refs.tree.append({ ...this.insertForm, ...data }, this.node);
						}
					}
				});
			},
			openRemoveModal(node, data) {
				this.$confirm("确定要删除此分类吗？", { type: "warning" })
					.then(async () => {
						let { status, msg } = await Category.remove({ id: data.id });
						if (status) {
							this.$refs.tree.remove(data);
							this.$message.success(msg);
						} else {
							this.$message.error(msg);
						}
					})
					.catch(() => {
						this.$message.info("取消成功！");
					});
			},
		},
	};
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
