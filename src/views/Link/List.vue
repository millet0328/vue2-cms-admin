<template>
  <el-card class="box-card">
    <div class="header" slot="header">
      <span>友情链接</span>
      <el-button @click="insert_dialog_visible = true" plain size="mini" type="primary"
                 icon="el-icon-circle-plus-outline">
        添加链接
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="40">
      </el-table-column>
      <el-table-column prop="title" label="链接标题">
      </el-table-column>
      <el-table-column prop="url" label="网站地址" width="300">
        <template slot-scope="scope">
          <el-link href="#" target="_blank">{{ scope.row.url }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="link_order" label="排序数字">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag :type=" scope.row.usable===1 ? 'success':'info' ">
            {{ scope.row.usable === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="添加日期">
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button @click="openEditDialog(scope.row)" icon="el-icon-edit" type="primary" plain>编辑</el-button>
          <el-button @click="handleSwitch(scope.row)" icon="el-icon-switch-button"
                     :type=" scope.row.usable===1 ? 'info':'success' " plain>
            {{ scope.row.usable === 1 ? '禁用' : '启用' }}
          </el-button>
          <el-button @click="handleRemove(scope.row.id,scope.$index)" size="mini" icon="el-icon-delete" type="danger"
                     plain>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加链接Dialog -->
    <el-dialog title="添加友情链接" :visible.sync="insert_dialog_visible" @close="handleDialogClose('insert_form')">
      <el-form ref="insert_form" :model="insert_form" :rules="rules" label-width="80px">
        <el-form-item label="链接标题" prop="title">
          <el-input v-model="insert_form.title"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="url">
          <el-input v-model="insert_form.url"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" prop="link_order">
          <el-input v-model="insert_form.link_order"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
				<el-button @click="insert_dialog_visible = false">取 消</el-button>
				<el-button type="primary" @click="handleInsert">添 加</el-button>
			</span>
    </el-dialog>
    <!-- 编辑链接Dialog -->
    <el-dialog title="编辑友情链接" :visible.sync="edit_dialog_visible" @close="handleDialogClose('edit_form')">
      <el-form ref="edit_form" :model="edit_form" :rules="rules" label-width="80px">
        <el-form-item label="链接标题" prop="title">
          <el-input v-model="edit_form.title"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="url">
          <el-input v-model="edit_form.url"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" prop="link_order">
          <el-input v-model="edit_form.link_order"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
				<el-button @click="edit_dialog_visible = false">取 消</el-button>
				<el-button type="primary" @click="handleEdit">保 存</el-button>
			</span>
    </el-dialog>
  </el-card>
</template>

<script>
import { Link } from '@/api/'
import { Slide } from '../Slide/List'

export default {
  name: "List",
  data() {
    return {
      tableData: [],
      insert_dialog_visible: false,
      insert_form: {
        title: '',
        url: 'http://',
        link_order: '',
      },
      edit_dialog_visible: false,
      current_link: '',
      edit_form: {
        id: '',
        title: '',
        url: '',
        link_order: '',
      },
      rules: {
        title: [{ required: true, message: '请填写标题文字', trigger: 'blur' }],
        url: [{ type: "url", required: true, message: '请填写完整的链接地址', trigger: 'blur' }],
        link_order: [
          { required: true, message: '请填写显示顺序！', trigger: 'blur' },
          { pattern: /^\d+$/, message: '顺序必须是数字组成！', trigger: 'blur' }
        ],
      },
    }
  },
  created() {
    document.title = "友情链接列表";
    this.loadList();
  },
  methods: {
    // 加载友情链接列表
    async loadList() {
      let { status, msg, data } = await Link.list();
      if (status) {
        this.tableData = data;
      }
    },
    // 添加友情链接
    handleInsert() {
      this.$refs.insert_form.validate(async (valid) => {
        if (valid) {
          let { status, msg, data } = await Link.insert(this.insert_form);
          if (status) {
            // 更新DOM
            this.tableData.push({ ...this.insert_form, ...data });
            this.tableData.sort((itemA, itemB) => itemA.link_order - itemB.link_order);
            // 关闭弹窗
            this.insert_dialog_visible = false;
            // 消息提示
            this.$message.success(msg);
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    // 打开编辑dialog
    openEditDialog(link) {
      this.current_link = link;
      this.edit_form = { ...link };
      this.edit_dialog_visible = true;
    },
    // 编辑友情链接
    handleEdit() {
      this.$refs.edit_form.validate(async (valid) => {
        if (valid) {
          let { status, msg, data } = await Link.edit(this.edit_form.id, this.edit_form);
          if (status) {
            // 更新DOM
            Object.assign(this.current_link, this.edit_form);
            // 关闭弹窗
            this.edit_dialog_visible = false;
            // 消息提示
            this.$message.success(msg);
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    // 删除友情链接
    async handleRemove(id, index) {
      this.$confirm('此操作将永久删除该友情链接, 是否继续?', { type: 'warning' })
          .then(async () => {
            // 删除友情链接
            let { status, msg } = await Link.remove(id);
            if (status) {
              this.tableData.splice(index, 1);
              this.$message.success(msg);
            }
          })
          .catch(() => {
            this.$message.info('取消成功')
          });
    },
    // 启用/禁用友情链接
    handleSwitch(link) {
      let { id, usable } = link;
      this.$confirm(`此操作将${usable === 1 ? '禁用' : '启用'}该轮播图，是否继续？`, { type: 'warning' })
          .then(async () => {
            // 切换状态
            let { status, msg } = await Link.toggle({ id, usable: -usable });
            if (status) {
              // 操作DOM
              Object.assign(link, { usable: -usable });
              this.$message.success(msg);
            }
          })
          .catch(() => {
            this.$message.info('取消成功')
          });
    },
    // 关闭dialog弹窗
    handleDialogClose(form) {
      this.$refs[form].resetFields();
    },
  },
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