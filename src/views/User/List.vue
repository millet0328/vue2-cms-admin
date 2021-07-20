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
					<el-button size="mini" @click="removeHandle(scope.row.id,scope.$index)" icon="el-icon-delete"
						type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { User } from '@/api/';

	export default {
		data() {
			return {
				tableData: [],
			}
		},
		created() {
			document.title = "用户列表";
			this.loadList();
		},
		methods: {
			async loadList() {
				let { status, data } = await User.list();
				if (status) {
					this.tableData = data;
				}
			},
			removeHandle(id, index) {
				this.$confirm('确定要删除此账户吗？', { type: 'warning' })
					.then(async () => {
						// 发送ajax
						let { status } = await User.remove({id});
						if (status) {
							// 删除界面上的数据
							this.tableData.splice(index, 1);
							this.$message.success('删除成功！');
						}
					})
					.catch(() => {
						this.$message.info('取消成功！');
					});
			},
		}
	}
</script>

<style>
</style>
