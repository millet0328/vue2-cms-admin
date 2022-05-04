<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>管理员角色</span>
            <el-button @click="insert_dialog_visible = true" icon="el-icon-circle-plus-outline" plain
                       type="primary">添加角色
            </el-button>
          </div>
          <el-table :data="tableData">
            <el-table-column label="#" prop="id">
            </el-table-column>
            <el-table-column label="分类" prop="name">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.name }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button :disabled="scope.row.id === 1" @click="openEditDialog(scope.row,scope.$index)"
                           icon="el-icon-edit" plain type="primary">
                </el-button>
                <el-button :disabled="scope.row.id === 1" @click="handleRemoveRole(scope.row.id,scope.$index)"
                           icon="el-icon-delete" plain type="danger">
                </el-button>
                <el-button @click="openSettingDrawer(scope.row.id)" type="primary" plain icon="el-icon-setting">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="insert_dialog_visible" @close="handleDialogClose('insertForm')">
      <el-form ref="insertForm" :rules="rules" :model="insert_form" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="insert_form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="insert_dialog_visible = false">取 消</el-button>
        <el-button @click="handleInsertRole" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="edit_dialog_visible" @close="handleDialogClose('editForm')">
      <el-form ref="editForm" :rules="rules" :model="edit_form" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="edit_form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="edit_dialog_visible = false">取 消</el-button>
        <el-button @click="handleEditRole" type="primary">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 设置菜单 -->
    <el-drawer title="设置角色菜单" @open="handleSetCheckedMenu" @close="check_strictly = true"
               :visible.sync="setting_visible" size="25%" direction="rtl">
      <div class="am-padding-horizontal-xl setting-card">
        <el-tree :data="treeMenu" ref="tree" :check-strictly="check_strictly" show-checkbox highlight-current
                 default-expand-all node-key="id" :props="defaultProps">
        </el-tree>
        <div class="footer">
          <!-- :disabled="current_role_id===1"-->
          <el-button @click="handleSetRoleMenu" type="primary">保存</el-button>
          <el-button @click="setting_visible = false">取消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { Role, Menu } from '@/api/';

export default {
  name: "Role",
  data() {
    return {
      tableData: [],
      insert_dialog_visible: false,
      edit_dialog_visible: false,
      setting_visible: false,
      insert_form: { name: '', },
      edit_form: { id: '', name: '', },
      //当前操作行row的索引
      current_index: '',
      //当前操作行row的角色id
      current_role_id: '',
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: 'blur' }]
      },
      treeMenu: [],
      // 是否严格的遵循父子不互相关联
      check_strictly: true,
      defaultProps: { label: 'name' },
    }
  },
  created() {
    document.title = "管理员角色";
    // 角色列表
    this.loadRoleList();
    //  菜单tree结构
    this.loadMenuList();
  },
  methods: {
    // 加载角色列表
    async loadRoleList() {
      let { status, data } = await Role.list()
      if (status) {
        this.tableData = data;
      }
    },
    // 打开弹窗
    openEditDialog(role, index) {
      this.edit_form = { ...role };
      this.edit_dialog_visible = true;
      //缓存当前row行索引
      this.current_index = index;
    },
    // 编辑角色
    handleEditRole() {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          let { status, msg } = await Role.edit(this.edit_form.id, { ...this.edit_form });
          if (status) {
            // 更新DOM
            this.$set(this.tableData, this.current_index, { ...this.edit_form });
            this.$message.success('修改成功！');
            this.edit_dialog_visible = false;
          } else {
            this.$message.error('修改失败！');
          }
        }
      });
    },
    // 删除角色
    async handleRemoveRole(id, index) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', { type: 'warning' })
          .then(async () => {
            // 删除角色
            let { status, data } = await Role.remove(id);
            if (status) {
              this.tableData.splice(index, 1);
              this.$message.success('删除成功！');
            }
          })
          .catch(() => {
            this.$message.info('取消成功')
          });
    },
    // 添加角色
    handleInsertRole() {
      this.$refs.insert_form.validate(async (valid) => {
        if (valid) {
          let { status, msg, data } = await Role.insert({ ...this.insert_form });
          if (status) {
            this.tableData.push({ ...data, ...this.insert_form });
            this.insert_dialog_visible = false;
          }
        }
      });
    },
    // 关闭弹窗
    handleDialogClose(form) {
      this.$refs[form].resetFields();
    },
    // 加载所有菜单
    async loadMenuList() {
      let { status, data } = await Menu.loadAll({ type: 'tree' })
      if (status) {
        this.treeMenu = data;
      }
    },
    // 开启抽屉
    async openSettingDrawer(id) {
      // 开启drawer
      this.setting_visible = true;
      // 缓存当前角色role的id
      this.current_role_id = id;
    },
    // 设置选中的菜单
    async handleSetCheckedMenu() {
      // 根据角色加载对应菜单
      let { status, data } = await Role.menu({ id: this.current_role_id, type: 'flat' });
      if (status) {
        // 转化为选中的菜单id
        let checked_keys = data.map((menu) => menu.id);
        // 设置选中的菜单
        this.$refs.tree.setCheckedKeys(checked_keys);
        // 还原选中状态之后，设置父子节点互相关联
        this.check_strictly = false;
      }
    },
    // 保存菜单设置
    async handleSetRoleMenu() {
      // 获取当前选中的node节点（包含半选中父级节点）
      let checked_nodes = this.$refs.tree.getCheckedNodes(false, true);
      // 转化为id数组
      let checked_keys = checked_nodes.map((menu) => menu.id);
      // 发送菜单配置
      let { status, msg } = await Role.setMenu({ id: this.current_role_id, menus: checked_keys });
      if (status) {
        this.$message.success(msg);
        // 关闭drawer
        this.setting_visible = false;
      } else {
        this.$message.error(msg);
      }
    },
  }
}
</script>

<style lang="less">
.box-card {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.setting-card {
  .footer {
    position: absolute;
    bottom: 20px;
    left: 32px;
  }
}
</style>
