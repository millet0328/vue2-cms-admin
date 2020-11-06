<template>
	<el-upload class="uploader" action="/upload/common/" :headers="header" :data="{type:type}" :show-file-list="false"
	 :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload">
		<div v-if="url" class="preview">
			<img :src="url" class="avatar">
			<i @click.stop="handleRemove" class="el-icon-delete remove"></i>
		</div>
		<i v-else class="el-icon-plus plus"></i>
	</el-upload>
</template>

<script>
	import { Upload } from '@/api/index';

	export default {
		props: ['url', 'type'],
		data() {
			return {
				header: {
					Authorization: `Bearer ${sessionStorage.token}`,
				},
			}
		},
		methods: {
			async handleRemove() {
				// 判断是否默认头像
				let isDefault = this.url.indexOf('default') >= 0;

				if (isDefault) {
					this.$emit('update:url', '');
					return false;
				}
				let { status } = await Upload.remove({ src: this.url });
				if (status) {
					this.$message.success("删除成功！");
					this.$emit('update:url', '');
				}
			},
			handleAvatarSuccess({ status, msg, src }, file, fileList) {
				if (status) {
					this.$message.success(msg);
					this.$emit('update:url', src);
				}
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
			},
			handleAvatarError(err, file, fileList) {
				if (err) {
					let res = JSON.parse(err.message);
					this.$message.error(res.msg);
				}
			},
		}
	}
</script>

<style lang="less">
	.uploader .el-upload {
		width: 178px;
		height: 178px;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;

		&:hover {
			border-color: #409EFF;

			.remove {
				opacity: 1;
			}
		}

		.remove,
		.plus {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			line-height: 178px;
			text-align: center;
			font-size: 28px;
			color: #8c939d;
			z-index: 10;
			transition: all 0.5s;
		}

		.remove {
			color: white;
			background-color: rgba(0, 0, 0, 0.7);
			opacity: 0;
		}

		.preview {

			.avatar {
				width: 178px;
				height: 178px;
				display: block;
			}
		}
	}
</style>
