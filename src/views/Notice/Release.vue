<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span>发布公告</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="置顶" prop="is_sticky">
          <el-radio v-model="form.is_sticky" :label="1">是</el-radio>
          <el-radio v-model="form.is_sticky" :label="0">否</el-radio>
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
          <el-button @click="handleRelease" type="primary">发布公告</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Notice } from '@/api/';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

export default {
  name: "Release",
  components: {
    Editor,
    Toolbar,
  },
  data() {
    return {
      form: {
        title: '',
        is_sticky: 1,
        content: '',
      },
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
          { type: "string", required: true, message: '请输入公告标题', trigger: 'blur' },
          { min: 2, max: 40, message: '公告标题长度在 2 到 40 个字符', trigger: 'blur' }
        ],
        is_sticky: [
          { type: "number", required: true, message: '请选择是否置顶', trigger: 'change' },
        ],
        content: [
          { type: "string", required: true, message: '请填写公告内容', trigger: 'blur' },
        ]
      }
    }
  },
  created() {
    document.title = "发布公告";
  },
  methods: {
    // 富文本编译器的初始化
    handleEditorCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    // 发布公告
    handleRelease() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let { status, msg } = await Notice.release(this.form);
          if (status) {
            this.$message.success(msg);
            // 跳转页面
            this.$router.replace('/notice/list');
          } else {
            this.$message.error(msg);
          }
        }
      });
    }
  }
}
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