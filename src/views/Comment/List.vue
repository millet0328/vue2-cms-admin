<template>
  <el-card class="box-card">
    <div slot="header">
      <span>评论列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="40">
      </el-table-column>
      <el-table-column prop="article_title" label="文章标题">
        <template slot-scope="scope">
          <el-link :href="`/blog/article-detail.html?id=${scope.row.article_id}`" target="_blank">{{ scope.row.article_title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="user_nickname" label="用户" width="100">
        <template slot-scope="scope">
          <el-link href="#" target="_blank">{{ scope.row.user_nickname }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="留言内容">
      </el-table-column>
      <el-table-column prop="create_time" label="留言日期" width="150">
      </el-table-column>
      <el-table-column prop="reply" label="回复内容">
      </el-table-column>
      <el-table-column prop="reply_time" label="回复日期" width="150">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="openReplyDialog(scope.row)" icon="el-icon-edit" type="primary" plain>回复</el-button>
          <el-button icon="el-icon-delete" type="danger" plain>隐藏</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 回复评论 -->
    <el-dialog title="回复评论" :visible.sync="reply_dialog_visible" @close="handleDialogClose('reply_form')">
      <!-- 评论内容 -->
      <el-descriptions border direction="vertical" :column="2" class="am-margin-bottom-xl">
        <el-descriptions-item label="评论用户">
          <el-link href="/#/" type="primary">{{ reply_form.user_nickname }}</el-link>
        </el-descriptions-item>
        <el-descriptions-item label="评论文章">
          <el-link :href="`/blog/article-detail.html?id=${reply_form.article_id}`" target="_blank" type="primary">{{ reply_form.article_title }}</el-link>
        </el-descriptions-item>
        <el-descriptions-item label="评论内容">
          {{ reply_form.content }}
        </el-descriptions-item>
      </el-descriptions>
      <!-- 表单 -->
      <el-form ref="reply_form" :model="reply_form" :rules="rules">
        <el-form-item prop="reply">
          <el-input v-model="reply_form.reply" :rows="4" type="textarea" placeholder="请在此输入回复的内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reply_dialog_visible = false">取 消</el-button>
        <el-button type="primary" @click="handleReply">回 复</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { Comment } from '@/api/'

export default {
  name: "List",
  data() {
    return {
      tableData: [],
      reply_form: {
        id: '',
        reply: '',
      },
      reply_dialog_visible: false,
      rules: {
        reply: [{ required: true, message: '请输入回复内容！', trigger: 'blur' }]
      },
      current_row: '',
    }
  },
  created() {
    document.title = "评论列表";
    this.loadList();
  },
  methods: {
    // 加载评论列表
    async loadList() {
      let { status, data } = await Comment.list()
      if (status) {
        this.tableData = data;
      }
    },
    // 打开回复dialog
    openReplyDialog(row) {
      this.reply_dialog_visible = true;
      // 缓存当前操作行
      this.reply_form = { ...row };
      this.current_row = row;
    },
    // 回复评论
    handleReply() {
      this.$refs.reply_form.validate(async (valid) => {
        if (valid) {
          let { status, msg } = await Comment.reply(this.reply_form)
          if (status) {
            // 更新DOM
            Object.assign(this.current_row, this.reply_form);
            // 关闭Dialog
            this.reply_dialog_visible = false;
            // 信息提示
            this.$message.success(msg);
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    // 关闭dialog弹窗
    handleDialogClose(form) {
      this.$refs[form].resetFields();
    },
  }
}
</script>

<style scoped>

</style>