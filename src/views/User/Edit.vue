<template>
	<el-card class="box-card">
		<div slot="header">
			<span>编辑用户</span>
		</div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="用户名">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="昵称">
				<el-input v-model="form.nickname"></el-input>
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
			<el-form-item>
				<el-button @click="handleEdit" size="medium" type="primary">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { User } from '@/api/index';

	export default {
		data() {
			return {
				id: '',
				form: {
					username: '',
					nickname: '',
					sex: '男',
					tel: '',
				},
			}
		},
		// 监听路由地址改变
		beforeRouteUpdate(to, from, next) {
			let { id } = to.params;
			this.id = id;
			this.loadProfile(id);
			next();
		},
		created() {
			// 获取参数
			let { id } = this.$route.params;
			// 缓存id
			this.id = id;
			// 获取个人资料
			this.loadProfile(id);
		},
		methods: {
			async loadProfile(id) {
				let { status, data } = await User.profile({ id });
				if (status) {
					this.form = data;
				}
			},
			async handleEdit() {
				// 表单验证
				let { status, msg } = await User.edit(this.id, { ...this.form });
				if (status) {
					this.$message.success(msg);
					setTimeout(() => {
						this.$router.replace('/user/list');
					}, 500);
				} else {
					this.$message.error(msg);
				}
			}
		}
	}
</script>

<style>

</style>
