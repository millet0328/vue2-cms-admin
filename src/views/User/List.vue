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
			<el-table-column prop="usable" label="状态">
				<template slot-scope="scope">
					<el-tag :type=" scope.row.usable===1 ? 'success':'info' ">
						{{ scope.row.usable === 1 ? '启用' : '禁用' }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button @click="handleSwitch(scope.row)" icon="el-icon-switch-button"
						:type=" scope.row.usable===1 ? 'info':'success' " plain>
						{{ scope.row.usable === 1 ? '禁用' : '启用' }}
					</el-button>
					<el-button @click="handleRemove(scope.row.id,scope.$index)" icon="el-icon-delete" type="danger"
						plain>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { User } from '@/api/';
	import { Slide } from '../Slide/List'

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
			// 加载用户列表
			async loadList() {
				let { status, data } = await User.list();
				if (status) {
					this.tableData = data;
				}
			},
			// 删除用户
			handleRemove(id, index) {
				this.$confirm('确定要删除此账户吗？', { type: 'warning' })
					.then(async () => {
						// 发送ajax
						let { status } = await User.remove({ id });
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
			// 启用/禁用用户
			handleSwitch(user) {
				let { id, usable } = user;
				this.$confirm(`此操作将${usable === 1 ? '禁用' : '启用'}该用户，是否继续？`, { type: 'warning' })
					.then(async () => {
						// 切换状态
						usable = usable === 1 ? 0 : 1;
						let { status, msg } = await User.toggle({ id, usable });
						if (status) {
							// 操作DOM
							Object.assign(user, { usable });
							this.$message.success(msg);
						}
					})
					.catch(() => {
						this.$message.info('取消成功')
					});
			},
		}
	}
</script>

<style>
</style>
