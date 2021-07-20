<template>
	<el-card class="box-card">
		<div slot="header"><span>编辑用户</span></div>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="nickname">
				<el-input v-model="form.nickname"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="form.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机" prop="tel">
				<el-input v-model="form.tel"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="handleEdit('form')" size="medium" type="primary">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { User } from '@/api/';

	export default {
		props: ['id'],
		data() {
			return {
				form: {
					username: '',
					nickname: '',
					sex: '男',
					tel: '',
				},
				rules: {
					username: [
						{ type: 'string', required: true, message: '请输入账号！', trigger: 'blur' },
						{ min: 3, max: 20, message: '账户名长度在 3 到 20 个字符', trigger: 'blur' },
					],
					nickname: [{ type: 'string', required: true, message: '请输入姓名！', trigger: 'blur' }],
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
				},
			};
		},
		// 监听路由地址改变
		watch: {
			'$route'(to, from) {
				// 加载id对应的个人资料
				this.loadProfile(this.id);
			}
		},
		created() {
			// 获取个人资料
			this.loadProfile(this.id);
			document.title = "编辑用户";
		},
		methods: {
			async loadProfile(id) {
				let { status, data } = await User.profile({ id });
				if (status) {
					this.form = data;
				}
			},
			handleEdit(formName) {
				// 表单验证
				this.$refs[formName].validate(async valid => {
					if (valid) {
						let { status, msg } = await User.edit({ id: this.id, ...this.form });
						if (status) {
							this.$message.success(msg);
							setTimeout(() => {
								this.$router.replace('/user/list');
							}, 500);
						} else {
							this.$message.error(msg);
						}
					}
				});
			},
		},
	};
</script>

<style></style>
