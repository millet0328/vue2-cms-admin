<template>
	<div>
		<el-card class="box-card">
			<div slot="header"><span>发布文章</span></div>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item label="标题" prop="title">
					<el-input v-model.trim="form.title"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input type="textarea" v-model.trim="form.description"></el-input>
				</el-form-item>
				<el-row>
					<el-col :span="6">
						<el-form-item label="分类" prop="cate_1st">
							<el-select v-model="form.cate_1st" placeholder="请选择一级分类">
								<el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="cate_2nd">
							<el-select v-model="form.cate_2nd" placeholder="请选择二级分类">
								<el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="主图" prop="main_photo">
					<single-upload :src.sync="form.main_photo" upload-action="/upload/common/" remove-action="/upload/delete" :headers="headers"
					 :data="{ type: 'common' }"></single-upload>
				</el-form-item>
				<el-form-item label="内容" prop="content">
					<div id="editor"></div>
				</el-form-item>
				<el-form-item>
					<el-button @click="submitForm('form')" size="medium" type="primary">保存修改</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import { Category, Article } from '@/api/index';
	import wangEditor from 'wangeditor';
	import SingleUpload from '@/components/SingleUpload.vue';

	export default {
		components: {
			SingleUpload,
		},
		data() {
			return {
				form: {
					title: '',
					description: '',
					cate_1st: '',
					cate_2nd: '',
					main_photo: '',
					content: '',
				},
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`,
				},
				// 一级分类选项
				options_1st: [],
				// 二级分类选项
				options_2nd: [],
				editor: null,
				rules: {
					title: [
						{ type: 'string', required: true, message: '请输入文章标题', trigger: 'blur' },
						{ min: 3, max: 40, message: '文章标题长度在 3 到 40 个字符', trigger: 'blur' },
					],
					description: [{ type: 'string', required: true, message: '请输入文章描述', trigger: 'blur' }],
					cate_1st: [{ type: 'number', required: true, message: '请选择一级分类', trigger: 'change' }],
					cate_2nd: [{ type: 'number', required: true, message: '请选择二级分类', trigger: 'change' }],
					main_photo: [{ type: 'string', required: true, message: '请上传文章主图', trigger: 'change' }],
					content: [{ type: 'string', required: true, message: '请填写文章内容', trigger: 'blur' }],
				},
			};
		},
		// 侦听器，AJAX，异步操作
		watch: {
			'form.cate_1st': function(newVal, oldVal) {
				// 请求二级分类
				this.handleLoadSubcate(newVal);
			},
		},
		async created() {
			// 请求一级分类
			let options = await this.loadOptions(0);
			this.options_1st = options;
			// 默认选中第一项
			this.form.cate_1st = options[0].id;
		},
		methods: {
			// 请求下一级分类
			async loadOptions(id) {
				let { status, data } = await Category.subcate({ id });
				if (status) {
					return data;
				}
			},
			async handleLoadSubcate(val) {
				// 请求二级分类
				let options = await this.loadOptions(val);
				this.options_2nd = options;
				// 默认选中第一项
				this.form.cate_2nd = options[0].id;
			},
			// 发布文章
			submitForm(formName) {
				this.$refs.form.validate(async valid => {
					if (valid) {
						let { status, msg } = await Article.release({ ...this.form });
						if (status) {
							this.$message.success(msg);
						}
					}
				});
			},
		},
		mounted() {
			const editor = new wangEditor(`#editor`);
			// 图片上传api
			editor.config.uploadImgServer = '/upload/editor/';
			editor.config.uploadFileName = 'file';
			// 配置 onchange 回调函数，将数据同步到 vue 中
			editor.config.onchange = newHtml => {
				this.form.content = newHtml;
			};
			// 创建编辑器
			editor.create();
			this.editor = editor;
		},
	};
</script>

<style></style>
