<template>
	<el-card class="box-card">
		<div slot="header">
			<span>文章列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#" width="40">
			</el-table-column>
			<el-table-column prop="cate_1st_name" label="一级分类">
			</el-table-column>
			<el-table-column prop="cate_2nd_name" label="二级分类">
			</el-table-column>
			<el-table-column label="主图" width="100">
				<template slot-scope="scope">
					<el-image style="width: 80px;" :src="scope.row.main_photo" fit="cover"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="400">
			</el-table-column>
			<el-table-column prop="create_time" label="发布日期" width="180">
			</el-table-column>
			<el-table-column prop="update_time" label="更新日期" width="180">
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-link :href="`#/article/edit/${scope.row.id}`" class="am-margin-right-sm" type="primary">
						<el-button size="mini" icon="el-icon-edit" type="primary" plain>编辑</el-button>
					</el-link>
					<el-button @click="handleRemove" size="mini" icon="el-icon-delete" type="danger" plain>删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Article } from '@/api/index';

	export default {
		data() {
			return {
				tableData: [],
			}
		},
		created() {
			document.title = "文章列表"
			// 获取列表数据
			this.loadList();
		},
		methods: {
			async loadList() {
				let { status, data, total } = await Article.list({ pageindex: 1, pagesize: 30 });
				if (status) {
					this.tableData = data;
				}
			},
			handleRemove() {
				this.$confirm('此操作将永久删除该文章, 是否继续?', {
						type: 'warning'
					})
					.then(() => {
						// 删除
					});
			}
		}
	}
</script>

<style>
</style>
