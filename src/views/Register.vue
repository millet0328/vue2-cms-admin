<template>
	<div class="bg">
		<el-card shadow="always" class="form-box">
			<div slot="header">
				<span>注册</span>
			</div>
			<el-form ref="form" :model="form" :rules="rules" status-icon label-width="80px">
				<el-form-item label="账户" prop="username">
					<el-input v-model.trim="form.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" type="password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="recheck">
					<el-input v-model="form.recheck" type="password">
					</el-input>
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
				<el-form-item prop="isAgree">
					<el-checkbox v-model="isAgree" label="同意本站用户协议"></el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button size="medium" :disabled="!isAgree" @click="submitForm('form')" type="primary">注 册
					</el-button>
				</el-form-item>
			</el-form>
			<div class="link-box">
				<router-link to="/login">登录账户</router-link>
				<router-link to="/">忘记密码？</router-link>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { Admin } from '@/api/index';

	export default {
		data() {
			let validatePassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			}
			return {
				isAgree: false,
				form: {
					username: '',
					password: '',
					recheck: '',
					fullname: '',
					sex: '男',
					tel: '',
					email: '',
				},
				rules: {
					username: [
						{ type: "string", required: true, message: '请输入账号！', trigger: 'blur' },
						{ min: 3, max: 20, message: '账户名长度在 3 到 20 个字符', trigger: 'blur' }
					],
					password: [
						{ type: "string", required: true, message: '请输入密码！', trigger: 'blur' },
						{ type: "string", pattern: /^\d{3,20}$/, message: '请输入在 3 到 20 个数字', trigger: 'blur' },
					],
					recheck: [
						{ type: "string", required: true, message: '请输入密码！', trigger: 'blur' },
						{ type: "string", validator: validatePassword, trigger: 'blur' },
					],
					fullname: [
						{ type: "string", required: true, message: '请输入姓名！', trigger: 'blur' }
					],
					sex: [
						{ required: true, message: '请选择性别', trigger: 'change' }
					],
					tel: [
						{ type: "string", required: true, message: '请输入手机号码', trigger: 'blur' },
						{ type: "string", pattern: /^[1][3|4|5|6|7|8|9][0-9]{9}$/, message: '请输入正确的手机号码',
							trigger: 'blur' }
					]
				}
			}
		},
		created() {
			document.title = "注册";
		},
		methods: {
			submitForm(formName) {
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						// 校验通过，发送ajax
						let { status, msg } = await Admin.register({ ...this.form });
						if (status) {
							// 注册成功
							this.$message.success(msg);
							// 存取token，uid，role
							sessionStorage.token = data.token;
							sessionStorage.id = data.id;
							sessionStorage.role = data.role;
							// 跳转页面
							this.$router.replace('/article/list');
						} else {
							// 注册失败
							this.$message.error(msg);
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.bg {
		width: 100vw;
		height: 100vh;
		background: url(../assets/img/register/bg.jpg);
		background-size: cover;
		position: relative;

		.form-box {
			position: absolute;
			right: 100px;
			top: 50%;
			transform: translateY(-50%);
			background-color: white;
			border-radius: 4px;
			font-size: 14px;
			width: 360px;

			.link-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>
