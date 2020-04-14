<template>
	<div class="bg">
		<el-card shadow="always" class="form-box">
			<div slot="header">
				<span>注册</span>
			</div>
			<el-form ref="form" :model="form" label-width="60px">
				<el-form-item label="账户">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input type="password" v-model="form.password"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="form.fullname"></el-input>
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
				<el-form-item prop="isAgree">
					<el-checkbox v-model="form.isAgree" label="同意本站用户协议"></el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button size="medium" @click="submitForm" type="primary">注 册</el-button>
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
			return {
				form: {
					username: '',
					fullname: '',
					sex: '男',
					tel: '',
					email: '',
					isAgree: [],
				},
			}
		},
		methods: {
			submitForm() {
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						// 校验通过，发送ajax
						let { status, msg } = await Admin.register({ ...this.form });
						if (status) {
							// 注册成功
							this.$message.success(msg);
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
		background: url(../assets/img/login/login-bg.jpg);
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
