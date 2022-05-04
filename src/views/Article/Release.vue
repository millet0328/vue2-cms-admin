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
                <el-option v-for="item in options_1st" :key="item.id" :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="cate_2nd">
              <el-select v-model="form.cate_2nd" placeholder="请选择二级分类">
                <el-option v-for="item in options_2nd" :key="item.id" :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="主图" prop="main_photo">
          <single-upload v-model="form.main_photo" upload-action="/upload/common/"
                         remove-action="/upload/remove/" :data="{ type: 'common' }"></single-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- 富文本编辑器 -->
          <div class="editor-box">
            <Toolbar :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" class="tool-bar"/>
            <Editor v-model="form.content" :defaultConfig="editorConfig" :mode="mode"
                    @onCreated="handleEditorCreated" class="editor"/>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleRelease" size="medium" type="primary">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Category, Article } from '@/api/';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import SingleUpload from '@/components/SingleUpload.vue';

export default {
  name: "Release",
  components: {
    SingleUpload,
    Editor,
    Toolbar,
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
      // 一级分类选项
      options_1st: [],
      // 二级分类选项
      options_2nd: [],
      editor: null,
      toolbarConfig: {},
      mode: 'simple',
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            server: '/upload/editor/',
            // form-data fieldName ，默认值 'wangeditor-uploaded-image'
            fieldName: 'file',
            // 自定义增加 http header
            headers: {
              Authorization: `Bearer ${sessionStorage.token}`,
            },
          }
        }
      },
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
    'form.cate_1st': async function (newVal, oldVal) {
      // 获取二级分类
      this.options_2nd = await this.loadOptions(newVal);
      // 默认选中第一项
      if (this.options_2nd.length) {
        this.form.cate_2nd = this.options_2nd[0].id;
      } else {
        this.form.cate_2nd = '';
      }
    },
  },
  async created() {
    document.title = "发布文章";
    // 请求一级分类
    this.options_1st = await this.loadOptions(0);
    // 默认选中第一项
    this.form.cate_1st = this.options_1st[0].id;
  },
  methods: {
    // 请求下一级分类
    async loadOptions(id) {
      let { status, data } = await Category.subcate({ id });
      if (status) {
        return data;
      }
    },
    // 富文本编译器的初始化
    handleEditorCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    // 发布文章
    handleRelease() {
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

};
</script>

<style lang="less">
.editor-box {
  border: 1px solid #ccc;
  border-radius: 4px;

  .tool-bar {
    border-bottom: 1px solid #ccc;
  }

  .editor {
    height: 600px;
  }
}
</style>
