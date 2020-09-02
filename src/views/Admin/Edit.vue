<template>
	<el-card class="box-card">
		<div slot="header">
			<span>编辑管理员</span>
		</div>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-form-item label="用户名" prop="username">
				<el-input v-model.trim="form.username"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="fullname">
				<el-input v-model.trim="form.fullname"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="form.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机" prop="tel">
				<el-input v-model.trim="form.tel"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model.trim="form.email"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
				<single-upload :src.sync="form.avatar" default-avatar="../images/avatar/default.jpg" upload-action="http://localhost:3001/upload/common/"
				 remove-action="http://localhost:3001/upload/delete" :headers="headers" :data="params"></single-upload>
			</el-form-item>
			<el-form-item>
				<el-button @click="submitForm('form')" size="medium" type="primary">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { Admin } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';

	export default {
		props: ['id'],
		components: {
			SingleUpload
		},
		data() {
			return {
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				params: {
					type: 'avatar',
				},
				form: {
					username: '',
					fullname: '',
					sex: '男',
					tel: '',
					email: '',
					avatar: '',
				},
				rules: {
					username: [
						{ type: "string", required: true, message: '请输入账号！', trigger: 'blur' },
						{ min: 3, max: 20, message: '账户名长度在 3 到 20 个字符', trigger: 'blur' }
					],
					fullname: [
						{ type: "string", required: true, message: '请输入姓名！', trigger: 'blur' }
					],
					sex: [
						{ required: true, message: '请选择性别', trigger: 'change' }
					],
					tel: [
						{ type: "string", required: true, message: '请输入手机号码', trigger: 'blur' },
						{ type: "string", pattern: /^[1][3|4|5|6|7|8|9][0-9]{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
					],
					email: [
						{ type: "email", required: true, message: '请输入邮箱地址', trigger: 'blur' },
					],
					avatar:[
						{ type: "string", required: true, message: '请上传头像图片', trigger: 'change' },
					]
				}
			}
		},
		created() {
			this.loadInfo();
		},
		methods: {
			async loadInfo() {
				let { status, data } = await Admin.info({ id: this.id });
				if (status) {
					this.form = data;
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Admin.edit({ id: this.id, ...this.form });
						if (status) {
							this.$message.success(msg);
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
