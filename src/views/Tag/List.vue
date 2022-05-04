<template>
  <el-card class="box-card">
    <div class="header" slot="header">
      <span>标签列表</span>
      <el-button @click="insert_dialog_visible = true" plain type="primary"
                 icon="el-icon-circle-plus-outline">
        添加标签
      </el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="#">
      </el-table-column>
      <el-table-column prop="name" label="标签名称">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="openEditDialog(scope.row)" icon="el-icon-edit" type="primary" plain>编辑</el-button>
          <el-button @click="handleRemove(scope.row.id,scope.$index)" icon="el-icon-delete"
                     type="danger" plain>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加标签 -->
    <el-dialog title="添加标签" :visible.sync="insert_dialog_visible" @close="handleDialogClose('insert_form')">
      <el-form ref="insert_form" :rules="rules" :model="insert_form" label-width="80px">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="insert_form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="insert_dialog_visible = false">取 消</el-button>
        <el-button @click="handleInsert" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑标签 -->
    <el-dialog title="编辑标签" :visible.sync="edit_dialog_visible" @close="handleDialogClose('edit_form')">
      <el-form ref="edit_form" :rules="rules" :model="edit_form" label-width="80px">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="edit_form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="edit_dialog_visible = false">取 消</el-button>
        <el-button @click="handleEdit" type="primary">保 存</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { Tag } from '@/api/';

export default {
  data() {
    return {
      tableData: [],
      insert_dialog_visible: false,
      edit_dialog_visible: false,
      insert_form: { name: '' },
      edit_form: { id: '', name: '' },
      //当前操作行row的数据
      currentData: '',
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: 'blur' }]
      },
    }
  },
  created() {
    document.title = "标签列表";
    this.loadList();
  },
  methods: {
    // 加载列表
    async loadList() {
      let { status, data } = await Tag.list()
      if (status) {
        this.tableData = data;
      }
    },
    handleInsert() {
      this.$refs.insert_form.validate(async (valid) => {
        if (valid) {
          let { status, msg, data } = await Tag.insert({ ...this.insert_form });
          if (status) {
            this.tableData.push({ ...data, ...this.insert_form });
            this.insert_dialog_visible = false;
            this.$message.success(msg);
          }
        }
      });
    },
    openEditDialog(tag) {
      this.edit_form = { ...tag };
      this.edit_dialog_visible = true;
      //缓存当前row行的数据
      this.currentData = tag;
    },
    handleEdit() {
      this.$refs.edit_form.validate(async (valid) => {
        if (valid) {
          let { status, msg } = await Tag.edit(this.edit_form.id, { ...this.edit_form });
          if (status) {
            this.$message.success(msg);
            this.edit_dialog_visible = false;
            // 更新DOM
            Object.assign(this.currentData, this.edit_form);
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    async handleRemove(id, index) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', { type: 'warning' })
          .then(async () => {
            // 删除角色
            let { status, msg } = await Tag.remove(id);
            if (status) {
              this.tableData.splice(index, 1);
              this.$message.success(msg);
            }
          })
          .catch(() => {
            this.$message.info('取消成功')
          });
    },
    handleDialogClose(form) {
      this.$refs[form].resetFields();
    },
  }
}
</script>

<style lang="less" scoped>
.box-card {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
