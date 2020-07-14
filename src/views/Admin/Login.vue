<template>
	<div class="bg">
		<el-card shadow="always" class="box-card form-box">
			<div slot="header">
				<span>登录</span>
			</div>
			<el-form ref="form" :rules="rules" :model="form" label-width="60px">
				<el-form-item label="账户" prop="username">
					<el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入账户名!"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="form.password" prefix-icon="el-icon-key" placeholder="请输入密码!"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="medium" type="primary" @click="loginHandle">登录</el-button>
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
	export default {
		data() {
			return {
				form: {
					username: "",
					password: "",
				},
				rules: {
					username: [
						{ required: true, message: '请输入用户名！', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码！', trigger: 'blur' },
						{ type: 'string', pattern: /^[0-9]{3,}$/, message: '密码至少3位数字', trigger: 'blur' },
					]
				}
			}
		},
	}
</script>

<style lang="less" scoped>
	.bg {
		width: 100vw;
		height: 100vh;
		background: url(../../assets/img/login/bg.jpg);
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
