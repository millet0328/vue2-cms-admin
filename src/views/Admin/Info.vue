<template>
	<el-card class="box-card">
		<div slot="header">
			<span>账户资料</span>
		</div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="用户名">
				<el-input v-model="form.username" disabled></el-input>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input v-model="form.fullname"></el-input>
			</el-form-item>
			<el-form-item label="角色">
				<el-select v-model="form.role" placeholder="请选择">
					<el-option v-for="item in roleOptions" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="性别">
				<el-radio-group v-model="form.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机">
				<el-input v-model="form.tel"></el-input>
			</el-form-item>
			<el-form-item label="邮箱">
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item label="头像">
				<el-upload class="avatar-uploader" action="http://localhost:3000/upload/common/" :headers="headers" :data="{type:'avatar'}"
				 :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="form.avatar" :src="form.avatar" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button @click="updateInfo" size="medium" type="primary">修改资料</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>

	export default {
		data() {
			return {
				form: {
					id: '',
					username: '',
					fullname: '',
					sex: '男',
					tel: '',
					email: '',
					avatar: '',
				},
				roleOptions: [],
				dialogImageUrl: '',
				dialogVisible: false
			}
		},
		methods: {
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
			},
			handleAvatarSuccess(res, file) {
				this.form.avatar = res.data;
			},

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
