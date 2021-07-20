<template>
	<div class="bg">
		<el-card shadow="always" class="box-card form-box">
			<div slot="header">
				<span>登录</span>
			</div>
			<el-form ref="form" :rules="rules" :model="form" label-width="60px">
				<el-form-item label="账户" prop="username">
					<el-input v-model.trim="form.username" prefix-icon="el-icon-user" placeholder="请输入账户名!"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" type="password" prefix-icon="el-icon-key" placeholder="请输入密码!">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="medium" type="primary" @click="submitForm('form')">登录</el-button>
				</el-form-item>
			</el-form>
			<div class="link-box">
				<router-link to="/register">注册账户</router-link>
				<router-link to="/">忘记密码？</router-link>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { Admin } from '@/api/index';

	export default {
		data() {
			return {
				form: {
					username: "admin",
					password: "123",
				},
				rules: {
					username: [
						{ required: true, message: '请输入账号！', trigger: 'blur' },
						{ min: 3, max: 20, message: '账户名长度在 3 到 20 个字符', trigger: 'blur' }
					],
					password: [
						{ type: "string", required: true, message: '请输入密码！', trigger: 'blur' },
						{ type: "string", pattern: /^\d{3,20}$/, message: '请输入在 3 到 20 个数字', trigger: 'blur' },
					]
				}
			}
		},
		created() {
			document.title = "登录";
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						// 校验通过，发送ajax
						let { status, msg, data } = await Admin.login({ ...this.form });
						if (status) {
							// 登陆成功
							this.$message.success(msg);
							// 存取token，uid，role
							sessionStorage.token = data.token;
							sessionStorage.id = data.id;
							sessionStorage.role = data.role;
							// 跳转页面
							let { redirect } = this.$route.query;
							if (redirect) {
								this.$router.replace(redirect);
							} else {
								this.$router.replace('/article/list');
							}
						} else {
							// 登录失败
							this.$message.error(msg);
						}
					}
				})
			}
		}
	}
</script>

<!-- scoped：CSS只在本页面的作用域内生效，超出作用域失效 -->
<style lang="less" scoped>
	.bg {
		width: 100vw;
		height: 100vh;
		background: url(../assets/img/login/bg.jpg);
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
