<template>
  <el-card class="box-card">
    <div slot="header">
      <span>文章列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="40">
      </el-table-column>
      <el-table-column prop="cate_1st_name" label="一级分类">
      </el-table-column>
      <el-table-column prop="cate_2nd_name" label="二级分类">
      </el-table-column>
      <el-table-column label="主图" width="100">
        <template slot-scope="scope">
          <el-image style="width: 80px;" :src="scope.row.main_photo" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="250">
      </el-table-column>
      <el-table-column label="标签" width="240">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.tags" :key="item.id" type="success" class="am-margin-right-sm">
            {{ item.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="发布日期" width="90">
      </el-table-column>
      <el-table-column prop="update_time" label="更新日期" width="90">
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-link :href="`#/article/edit/${scope.row.id}`" class="am-margin-right-sm" type="primary">
            <el-button icon="el-icon-edit" type="primary" plain>编辑</el-button>
          </el-link>
          <el-button @click="openTagDialog(scope.row)" icon="el-icon-collection-tag" type="success" plain size="small">
            标记
          </el-button>
          <el-button @click="handleRemoveArticle(scope.row.id,scope.$index)" icon="el-icon-delete" type="danger" plain>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 标记文章dialog -->
    <el-dialog title="标记文章" :visible.sync="tag_dialog_visible" @close="handleDialogClose('search_form')">
      <!-- 标签选择 -->
      <div class="tag-tip am-margin-bottom-lg">
        <div class="left">您可以添加多个标签：</div>
        <div class="right">
          <el-form ref="search_form" :model="search_form" :rules="rules" class="am-margin-right-sm">
            <el-form-item prop="reply" class="am-margin-bottom-0">
              <el-input v-model="search_form.keyword" placeholder="找不到标签?请在此处搜索">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
          <el-button type="success" icon="el-icon-circle-plus-outline" plain>创建标签</el-button>
        </div>
      </div>
      <div class="tag-input">
        <el-tag v-for="(tag,index) in selected_tags" @close="handleCloseTag(index)" :key="tag.id" closable
                type="success" effect="dark">
          {{ tag.name }}
        </el-tag>
      </div>
      <div class="tag-list am-margin-top-lg">
        <el-tag v-for="tag in tags_list" @click="handleSelectTag(tag)" :key="tag.id" type="success">
          {{ tag.name }}
        </el-tag>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="tag_dialog_visible = false" plain>取 消</el-button>
        <el-button type="success" @click="handleTagArticle">保 存</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { Article, Tag } from '@/api/';

export default {
  name: "List",
  data() {
    return {
      tableData: [],
      tags_list: [],
      selected_tags: [],
      // 当前操作的文章数据
      current_article: {},
      search_form: {
        keyword: '',
      },
      rules: {
        keyword: [{ required: true, message: '请输入搜索的关键词', trigger: 'blur' }],
      },
      tag_dialog_visible: false,
    }
  },
  created() {
    document.title = "文章列表"
    // 获取文章列表
    this.loadList();
    // 获取标签列表
    this.loadTags();
  },
  methods: {
    // 加载文章列表
    async loadList() {
      let { status, data, total } = await Article.list({ pageindex: 1, pagesize: 30 });
      if (status) {
        this.tableData = data;
      }
    },
    // 加载标签列表
    async loadTags() {
      let { status, data, total } = await Tag.list();
      if (status) {
        this.tags_list = data;
      }
    },
    // 删除文章
    handleRemoveArticle(id, index) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', { type: 'warning' })
          .then(async () => {
            let { status, msg } = await Article.remove({ id });
            if (status) {
              this.tableData.splice(index, 1);
              this.$message.success(msg);
            }
          });
    },
    // 打开标记Dialog
    openTagDialog(article) {
      // 缓存当前操作的文章数据
      this.current_article = article;
      // 还原以前标记的tag标签
      this.selected_tags = [...article.tags];

      this.tag_dialog_visible = true;
    },
    // 标记文章
    async handleTagArticle() {
      // 获取文章id
      let { id } = this.current_article;
      // 计算标签数组
      let tags = this.selected_tags.map((tag) => tag.id);
      // 发送数据
      let { status, msg } = await Article.tag({ id, tags });
      if (status) {
        // 更新DOM
        this.current_article.tags = [...this.selected_tags];
        // 关闭dialog
        this.tag_dialog_visible = false;
        // 信息提示
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 选择标签
    handleSelectTag(tag) {
      // 查找此元素是否在selected_tags中存在
      let isExist = this.selected_tags.findIndex((item) => item.id === tag.id) >= 0;
      // 已经选择的标签，不可重复选择
      if (isExist) {
        return;
      }
      this.selected_tags.push({ ...tag });
    },
    // 删除标签
    handleCloseTag(i) {
      this.selected_tags.splice(i, 1);
    },
    // 关闭dialog弹窗
    handleDialogClose(form) {
      this.$refs[form].resetFields();
    },
  }
}
</script>

<style lang="less">
.tag-tip {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .right {
    display: flex;
    align-items: center;
  }
}

.tag-input {
  padding: 10px;
  padding-bottom: 0;
  min-height: 34px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.box-card {
  .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.tag-list {
  .el-tag {
    cursor: pointer;
  }
}
</style>
