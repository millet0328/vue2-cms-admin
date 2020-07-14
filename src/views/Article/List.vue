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
			<el-table-column prop="fullname" label="主图" width="120">
				<template slot-scope="scope">
					<el-image style="width: 60px;" :src="scope.row.main_photo"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="400">
			</el-table-column>
			<el-table-column prop="create_time" label="发布日期">
			</el-table-column>
			<el-table-column prop="update_time" label="更新日期">
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-link :href="`#/article/edit/${scope.row.id}`" class="am-margin-right-sm" type="primary">
						<el-button size="mini" icon="el-icon-edit" type="primary" plain>编辑</el-button>
					</el-link>
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
					"cate_1st_name": "娱乐",
					"cate_2nd_name": "IT新闻",
					"title": "我是标题我是标题我是标题我是标题",
					"main_photo":"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
					"create_time": '2020-07-01',
					"update_time":"2020-07-01",
				}],
			}
		},
	}
</script>

<style>
</style>
