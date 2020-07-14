<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>分类列表</span>
			</div>
			<!-- 树形组件 -->
			<el-tree ref="tree" node-key="id" :default-expanded-keys="[0]" :load="loadNode" lazy :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button type="text" icon="el-icon-edit" :disabled="node.level==1" size="mini" @click.stop="() => openEditModal(node,data)">
							编辑
						</el-button>
						<el-button type="text" icon="el-icon-plus" size="mini" @click.stop="() => openInsertModal(node,data)">
							添加
						</el-button>
						<el-button type="text" icon="el-icon-delete" size="mini" @click.stop="() => remove(node, data)">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow = false">取 消</el-button>
				<el-button type="primary" @click="append">添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click="edit">保 存</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					parent_id: '',
				},
				editForm: {
					id: '',
					name: '',
					parent_id: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
			};
		},
		methods: {
			async loadNode(node, resolve) {
				if (node.level == 0) {
					return resolve([{ id: 0, name: "全部分类" }])
				}
				if (node.level > 0) {
					let id = node.data.id;
				}
			},
			openEditModal(node, data) {
				// 转存节点data
				this.node = node;
				this.editForm = { ...data };
				this.editModalShow = true;
			},
			openInsertModal(node, data) {
				// 转存节点data
				this.node = node;
				this.insertForm.parent_id = data.id;
				this.insertModalShow = true;
			},
		}
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
