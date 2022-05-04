<template>
  <el-card class="box-card">
    <div class="header" slot="header">
      <span>轮播图管理</span>
      <el-button @click="insert_dialog_visible = true" plain type="primary"
                 icon="el-icon-circle-plus-outline">
        添加轮播
      </el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="#" width="40">
      </el-table-column>
      <el-table-column prop="title" label="链接标题">
      </el-table-column>
      <el-table-column prop="picture" label="轮播图片" width="200">
        <template slot-scope="scope">
          <el-image style="width: 150px;" :src="scope.row.picture" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="跳转地址" width="300">
        <template slot-scope="scope">
          <el-link :href="scope.row.url" target="_blank">
            <span class="am-text-xs">{{ scope.row.url }}</span>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="target" label="跳转方式">
      </el-table-column>
      <el-table-column prop="slide_order" label="排序数字">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag :type=" scope.row.usable===1 ? 'success':'info' ">
            {{ scope.row.usable === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="添加日期" width="90">
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button @click="openEditDialog(scope.row)" icon="el-icon-edit" type="primary" plain>
            编辑
          </el-button>
          <el-button @click="handleSwitch(scope.row)" icon="el-icon-switch-button"
                     :type=" scope.row.usable===1 ? 'info':'success' " plain>
            {{ scope.row.usable === 1 ? '禁用' : '启用' }}
          </el-button>
          <el-button @click="handleRemove(scope.row.id,scope.$index)" icon="el-icon-delete" type="danger"
                     plain>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加轮播图 -->
    <el-dialog title="添加轮播图" :visible.sync="insert_dialog_visible" @close="handleDialogClose('insert_form')">
      <el-form ref="insert_form" :model="insert_form" :rules="rules" label-width="80px">
        <el-form-item label="轮播图片" prop="picture">
          <single-upload v-model="insert_form.picture" upload-action="/upload/common/"
                         remove-action="/upload/remove/" :data="{ type: 'common' }"></single-upload>
        </el-form-item>
        <el-form-item label="标题文字" prop="title">
          <el-input v-model="insert_form.title" placeholder="文字将作为标题，显示在图片上"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="url">
          <el-input v-model="insert_form.url" placeholder="请输入完整的链接地址"></el-input>
        </el-form-item>
        <el-form-item label="跳转方式" prop="target">
          <el-radio v-model="insert_form.target" label="_blank">新窗口跳转</el-radio>
          <el-radio v-model="insert_form.target" label="_self">本窗口跳转</el-radio>
        </el-form-item>
        <el-form-item label="显示排序" prop="slide_order">
          <el-input v-model="insert_form.slide_order" placeholder="请输入数字，数字越小，排序越靠前"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insert_dialog_visible = false">取 消</el-button>
        <el-button type="primary" @click="handleInsert">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 编辑轮播图 -->
    <el-dialog title="编辑轮播图" :visible.sync="edit_dialog_visible" @close="handleDialogClose('edit_form')">
      <el-form ref="edit_form" :model="edit_form" :rules="rules" label-width="80px">
        <el-form-item label="轮播图片" prop="picture">
          <single-upload v-model="edit_form.picture" upload-action="/upload/common/"
                         remove-action="/upload/remove/" :data="{ type: 'common' }"></single-upload>
        </el-form-item>
        <el-form-item label="标题文字" prop="title">
          <el-input v-model="edit_form.title" placeholder="文字将作为标题，显示在图片上"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="url">
          <el-input v-model="edit_form.url" placeholder="请输入完整的链接地址"></el-input>
        </el-form-item>
        <el-form-item label="跳转方式" prop="target">
          <el-radio v-model="edit_form.target" label="_blank">新窗口跳转</el-radio>
          <el-radio v-model="edit_form.target" label="_self">本窗口跳转</el-radio>
        </el-form-item>
        <el-form-item label="显示顺序" prop="slide_order">
          <el-input v-model="edit_form.slide_order" placeholder="请输入数字，数字越小，排序越靠前"></el-input>
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
import SingleUpload from '@/components/SingleUpload.vue';
import { Slide } from '@/api/';

export default {
  name: "List",
  components: {
    SingleUpload,
  },
  data() {
    return {
      tableData: [],
      insert_dialog_visible: false,
      insert_form: {
        picture: '',
        title: '',
        url: 'http://',
        target: '_blank',
        slide_order: '',
      },
      edit_dialog_visible: false,
      current_slide: '',
      edit_form: {
        id: '',
        picture: '',
        title: '',
        url: '',
        target: '_blank',
        slide_order: '',
      },
      rules: {
        picture: [{ required: true, message: '请上传一张轮播图片', trigger: 'change' }],
        title: [{ message: '请填写标题文字', trigger: 'blur' }],
        url: [{ type: "url", required: true, message: '请填写完整的链接地址', trigger: 'blur' }],
        target: [
          { required: true, message: '请选择一种跳转方式', trigger: 'blur' },
          { type: 'enum', enum: ['_blank', '_self'], message: '请选择合格跳转方式', trigger: 'blur' },
        ],
        slide_order: [
          { required: true, message: '请填写显示顺序！', trigger: 'blur' },
          { pattern: /^\d+$/, message: '顺序必须是数字组成！', trigger: 'blur' }
        ],
      },
    }
  },
  created() {
    document.title = "轮播图管理";
    this.loadList();
  },
  methods: {
    // 加载轮播图列表
    async loadList() {
      let { status, msg, data } = await Slide.list();
      if (status) {
        this.tableData = data;
      }
    },
    // 插入新轮播图
    handleInsert() {
      this.$refs.insert_form.validate(async (valid) => {
        if (valid) {
          let { status, msg, data } = await Slide.insert(this.insert_form);
          if (status) {
            // 更新DOM
            this.tableData.push({ ...this.insert_form, ...data });
            this.tableData.sort((itemA, itemB) => itemA.slide_order - itemB.slide_order);
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
    openEditDialog(slide) {
      this.current_slide = slide;
      this.edit_form = { ...slide };
      this.edit_dialog_visible = true;
    },
    // 编辑轮播图
    handleEdit() {
      this.$refs.edit_form.validate(async (valid) => {
        if (valid) {
          let { status, msg, data } = await Slide.edit(this.edit_form);
          if (status) {
            // 更新DOM
            Object.assign(this.current_slide, this.edit_form);
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
    // 删除轮播图
    async handleRemove(id, index) {
      this.$confirm('此操作将永久删除该轮播图, 是否继续?', { type: 'warning' })
          .then(async () => {
            // 删除幻灯片
            let { status, msg } = await Slide.remove({ id });
            if (status) {
              this.tableData.splice(index, 1);
              this.$message.success(msg);
            }
          })
          .catch(() => {
            this.$message.info('取消成功')
          });
    },
    // 启用/禁用轮播图
    handleSwitch(slide) {
      let { id, usable } = slide;
      this.$confirm(`此操作将${usable === 1 ? '禁用' : '启用'}该轮播图，是否继续？`, { type: 'warning' })
          .then(async () => {
            // 切换状态
            let { status, msg } = await Slide.toggle({ id, usable: -usable });
            if (status) {
              // 操作DOM
              Object.assign(slide, { usable: -usable });
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