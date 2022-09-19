<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>发布文章</span>
			</div>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="标题">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input type="textarea" v-model="form.description"></el-input>
				</el-form-item>
				<el-form-item label="分类">
					<el-col :span="6">
						<el-select v-model="form.cate_1st" placeholder="请选择文章一级分类">
							<el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="6">
						<el-select v-model="form.cate_2nd" placeholder="请选择文章二级分类">
							<el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="主图">
					<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
						:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="内容">
					<div id="editor"></div>
				</el-form-item>
				<el-form-item>
					<el-button size="medium" type="primary">发布文章</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			editor: null,
			form: {
				title: '',
				cate_1st: '',
				cate_2nd: '',
				description: '',
				content: '',
				main_photo: '',
			},
			options_1st: [
				{ id: 1, name: '科技' },
				{ id: 2, name: '娱乐' }
			],
			options_2nd: [
				{ id: 1, name: '科技' },
				{ id: 2, name: '娱乐' }
			],
			imageUrl: ''
		}
	},
	methods: {
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		}
	}
}
</script>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}

.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
