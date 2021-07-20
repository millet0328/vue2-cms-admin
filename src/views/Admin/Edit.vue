<template>
	<el-card class="box-card">
		<div slot="header"><span>编辑管理员</span></div>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-form-item label="用户名" prop="username">
				<el-input v-model.trim="form.username"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="fullname">
				<el-input v-model.trim="form.fullname"></el-input>
			</el-form-item>
			<el-form-item label="角色">
				<el-select v-model="form.role" placeholder="请选择">
					<el-option v-for="item in roleOptions" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
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
				<single-upload :src.sync="form.avatar" default-image="http://localhost:3001/images/avatar/default.jpg"
					upload-action="/upload/common/" remove-action="/upload/remove/" :headers="headers"
					:data="{ type: 'avatar' }">
				</single-upload>
			</el-form-item>
			<el-form-item>
				<el-button @click="submitForm('form')" size="medium" type="primary">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { Admin, Role } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';

	export default {
		props: ['id'],
		components: {
			SingleUpload,
		},
		data() {
			return {
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`,
				},
				form: {
					username: '',
					fullname: '',
					role: '',
					sex: '男',
					tel: '',
					email: '',
					avatar: '',
				},
				roleOptions: [],
				rules: {
					username: [
						{ type: 'string', required: true, message: '请输入账号！', trigger: 'blur' },
						{ min: 3, max: 20, message: '账户名长度在 3 到 20 个字符', trigger: 'blur' },
					],
					fullname: [{ type: 'string', required: true, message: '请输入姓名！', trigger: 'blur' }],
					sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
					tel: [
						{ type: 'string', required: true, message: '请输入手机号码', trigger: 'blur' },
						{
							type: 'string',
							pattern: /^[1][3|4|5|6|7|8|9][0-9]{9}$/,
							message: '请输入正确的手机号码',
							trigger: 'blur'
						},
					],
					email: [{ type: 'email', required: true, message: '请输入邮箱地址', trigger: 'blur' }],
					avatar: [{ type: 'string', required: true, message: '请上传头像图片', trigger: 'change' }],
				},
			};
		},
		created() {
			document.title = "编辑管理员";
			// 获取账户信息
			this.loadInfo();
		},
		methods: {
			async loadInfo() {
				let { status, data } = await Admin.info({ id: this.id });
				if (status) {
					// 加载角色列表
					this.roleOptions = await this.loadRole();
					this.form = data;
				}
			},
			// 加载角色列表
			async loadRole() {
				let { status, data } = await Role.list();
				if (status) {
					return data;
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate(async valid => {
					if (valid) {
						let { status, msg } = await Admin.edit({ id: this.id, ...this.form });
						if (status) {
							this.$router.replace('/admin/list/');
							this.$message.success(msg);
						}
					}
				});
			},
		},
	};
</script>

<style></style>
