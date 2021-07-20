<template>
	<el-card class="box-card">
		<div slot="header"><span>账户资料</span></div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="用户名">
				<el-input v-model.trim="form.username" disabled></el-input>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input v-model.trim="form.fullname"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-radio-group v-model="form.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机">
				<el-input v-model.trim="form.tel"></el-input>
			</el-form-item>
			<el-form-item label="邮箱">
				<el-input v-model.trim="form.email"></el-input>
			</el-form-item>
			<el-form-item label="头像">
				<single-upload :src.sync="form.avatar" default-image="http://localhost:3001/images/avatar/default.jpg"
					upload-action="/upload/common/" remove-action="/upload/remove/" :headers="headers"
					:data="{ type: 'avatar' }"></single-upload>
			</el-form-item>
			<el-form-item>
				<el-button @click="handleSave" size="medium" type="primary">修改资料</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { Role } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';

	export default {
		components: {
			SingleUpload
		},
		data() {
			return {
				form: {
					id: '',
					username: '',
					fullname: '',
					sex: '男',
					tel: '',
					email: '',
					avatar: ''
				},
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				rules: {
					username: [
						{ type: 'string', required: true, message: '请输入账号！', trigger: 'blur' },
						{ min: 3, max: 20, message: '账户名长度在 3 到 20 个字符', trigger: 'blur' }
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
						}
					],
					email: [{ type: 'email', required: true, message: '请输入邮箱地址', trigger: 'blur' }],
					avatar: [{ type: 'string', required: true, message: '请上传头像图片', trigger: 'change' }]
				}
			};
		},
		created() {
			document.title = "账户设置"
			// vuex中的state通过计算属性得到，默认getter,而双向数据绑定既有getter也有setter,两者冲突
			this.form = { ...this.$store.state.user.profile };
		},
		methods: {
			// 修改账户资料,同时修改store中的state
			async handleSave() {
				// 分发action,处理响应之后，弹窗
				let { status, msg } = await this.$store.dispatch('user/updateProfile', { ...this.form });
				if (status) {
					this.$message.success(msg);
				} else {
					this.$message.success(msg);
				}
			}
		}
	};
</script>

<style></style>
