<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>菜单权限</span>
      </div>
      <el-alert title="Tips" type="warning" description="设置后台管理系统的左侧菜单，目前至多支持两层菜单，三层以上菜单将不会显示。" show-icon
                :closable="false">
      </el-alert>
      <!-- 树形组件 -->
      <el-tree :data="treeMenu" ref="tree" :default-expanded-keys="defaultExpandedKeys" node-key="id"
               :props="defaultProps" class="am-margin-top-lg">
        <div class="node-box" slot-scope="{ node, data }">
          <div class="node-name">
            {{ node.label }}
          </div>
          <div class="node-action">
            <el-popover placement="left" class="am-margin-right-sm" trigger="hover">
              <i v-if="data.icon_name" class="am-text-xxl" :class="`el-icon-${data.icon_name}`"></i>
              <div v-else class="am-text-xxl">无</div>
              <el-button slot="reference" type="text" :icon="data.icon_name?`el-icon-${data.icon_name}`:''"
                         :disabled="data.id===1"
                         @click.stop="openIconModal(node,data)">图标
              </el-button>
            </el-popover>
            <el-button type="text" icon="el-icon-edit-outline" :disabled="data.id==1"
                       @click.stop="openEditModal(node,data)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-circle-plus-outline" @click.stop="openInsertModal(node,data)">
              添加
            </el-button>
            <el-button type="text" icon="el-icon-delete" :disabled="data.id==1"
                       @click.stop="openRemoveModal(node,data)">删除
            </el-button>
            <div class="node-order am-margin-left-sm">
              显示序号：
              <el-tag size="mini">{{ data.menu_order }}</el-tag>
            </div>
          </div>
        </div>
      </el-tree>
      <!-- 编辑Modal -->
      <el-dialog title="编辑节点" :visible.sync="edit_modal_visible" @closed="handleClosedDialog('edit_form')">
        <el-form ref="edit_form" :model="edit_form" :rules="rules" label-width="80px" :label-position="'left'">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="edit_form.name"></el-input>
          </el-form-item>
          <el-form-item label="组件名称">
            <el-input v-model="edit_form.component" placeholder="指定此菜单对应的组件名称"></el-input>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input v-model="edit_form.path" placeholder="指定此菜单的链接地址，选填"></el-input>
          </el-form-item>
          <el-form-item label="显示顺序" prop="menu_order">
            <el-input v-model="edit_form.menu_order" placeholder="显示顺序按照数字从小到大，如2001"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="edit_modal_visible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditMenu">保 存</el-button>
        </div>
      </el-dialog>
      <!-- 选择图标Modal -->
      <el-dialog title="选择图标" width="72%" :visible.sync="icon_modal_visible">
        <!-- 图标列表 -->
        <ul class="icon-list">
          <li v-for="item in icons" :key="item.id" :class="{checked:item.checked}" @click="handleCheckIcon(item)">
						<span>
							<i :class="`el-icon-${item.name}`"></i>
							<span class="icon-name">el-icon-{{ item.name }}</span>
						</span>
          </li>
        </ul>
        <!-- 分页器 -->
        <el-pagination background layout="->,prev, pager, next" :page-size="pageSize" :total="total_icon"
                       @current-change="handlePageChange"></el-pagination>
        <div slot="footer" class="dialog-footer">
          <el-button @click="icon_modal_visible = false">取 消</el-button>
          <el-button type="primary" @click="handleUpdateIcon">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加Modal -->
      <el-dialog title="添加节点" :visible.sync="insert_modal_visible" @closed="handleClosedDialog('insert_form')">
        <el-form ref="insert_form" :model="insert_form" :rules="rules" label-width="80px" :label-position="'left'">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="insert_form.name"></el-input>
          </el-form-item>
          <el-form-item label="组件名称">
            <el-input v-model="insert_form.component" placeholder="指定此菜单对应的组件名称"></el-input>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input v-model="insert_form.path" placeholder="指定此菜单的链接地址，选填"></el-input>
          </el-form-item>
          <el-form-item label="显示顺序" prop="menu_order">
            <el-input v-model="insert_form.menu_order" placeholder="显示顺序按照数字从小到大，如2001"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insert_modal_visible = false">取 消</el-button>
          <el-button type="primary" @click="handleInsertMenu">添 加</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { Menu, Icon } from "@/api/";

export default {
  name: "Menu",
  data() {
    return {
      treeMenu: [],
      defaultProps: { label: 'name' },
      // 选择图标
      icon_modal_visible: false,
      icons: [],
      pageSize: 30,
      total_icon: 0,
      checked_icon: { icon_id: '', icon: '' },
      // 当前操作节点
      current_node: '',
      //默认展开
      defaultExpandedKeys: [1],
      // 编辑Modal
      edit_modal_visible: false,
      edit_form: {
        id: '',
        name: '',
        pId: '',
        component: '',
        path: '',
        menu_order: '',
        icon: '',
        icon_id: '',
      },
      // 添加Modal
      insert_modal_visible: false,
      insert_form: {
        name: "",
        pId: '',
        component: "",
        path: '',
        menu_order: '',
        icon: '',
        icon_id: '',
      },
      rules: {
        name: [{ required: true, type: 'string', message: '请输入菜单名称！', trigger: 'blur' }],
        menu_order: [
          { required: true, type: 'string', message: '请填写显示顺序！', trigger: 'blur' },
          { pattern: /^\d+$/, message: '顺序必须是数字组成！', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    document.title = "菜单权限";
    this.loadIcons(1);
    this.loadMenu();
  },
  methods: {
    // 加载所有菜单
    async loadMenu() {
      let { status, data } = await Menu.loadAll({ type: 'tree' });
      if (status) {
        this.treeMenu = data;
      }
    },
    // 加载element图标
    async loadIcons(pageIndex) {
      let { status, data, total } = await Icon.list({ pageSize: this.pageSize, pageIndex });
      if (status) {
        // 添加选择状态--布尔值
        data.forEach((item) => {
          item.checked = false
        });
        this.icons = data;
        this.total_icon = total;
      }
    },
    // 分页器改变页码数
    handlePageChange(pageIndex) {
      this.loadIcons(pageIndex);
    },
    // 打开图标选择Modal
    openIconModal(node, data) {
      this.icon_modal_visible = true;
      // 转存node
      this.current_node = node;
    },
    // 选中图标
    handleCheckIcon(data) {
      this.icons.forEach((item) => {
        // 切换选中状态
        item.checked = item === data ? !data.checked : false;
      });
      // 存储/取消选中的iconName
      this.checked_icon.icon_id = data.checked ? data.id : '';
      this.checked_icon.icon_name = data.checked ? data.name : '';
    },
    // 更新图标
    async handleUpdateIcon() {
      let { id } = this.current_node.data;
      let { status, msg } = await Menu.setIcon(id, { ...this.checked_icon });
      if (status) {
        // 信息提示
        this.$message.success(msg);
        // 关闭Modal
        this.icon_modal_visible = false;
        // 修改图标
        this.current_node.data.icon_name = this.checked_icon.icon_name;
      }
    },
    // 删除节点
    openRemoveModal(node, data) {
      this.$confirm('此操作将永久删除该菜单, 是否继续?', { type: 'warning', })
          .then(async () => {
            this.setDefaultExpandedKeys()
            let { status, msg } = await Menu.remove(data.id);
            if (status) {
              // 原型方法remove
              node.remove();
              this.$message.success(msg);
            } else {
              this.$message.error(msg);
            }
          })
          .catch(() => {
            this.$message.info('已取消删除');
          });
    },
    // 打开添加Modal获取pId
    openInsertModal(node, data) {
      this.insert_form.pId = data.id;
      this.insert_modal_visible = true;
      // 转存data
      this.current_node = node;
    },
    // 确认添加节点
    async handleInsertMenu() {
      this.$refs.insert_form.validate(async (valid) => {
        if (valid) {
          //缓存默认展开节点
          this.setDefaultExpandedKeys();
          let { status, msg, data } = await Menu.insert({ ...this.insert_form });
          if (status) {
            // 树形结构添加子节点
            this.$refs.tree.append({ ...this.insert_form, ...data }, this.current_node);
            // 信息提示
            this.$message.success(msg);
            // 关闭Modal
            this.insert_modal_visible = false;
          } else {
            this.$message.error(msg);
          }
        }
      })
    },
    // 打开编辑Modal
    openEditModal(node, data) {
      this.edit_modal_visible = true;
      //转存节点data数据
      this.edit_form = { ...data };
      // 转存node节点
      this.current_node = node;
    },
    // 编辑节点
    async handleEditMenu() {
      let { id } = this.current_node.data;
      this.$refs.edit_form.validate(async (valid) => {
        if (valid) {
          let { status, msg } = await Menu.update(id, { ...this.edit_form });
          if (status) {
            // 更新节点
            this.current_node.data = { ...this.edit_form }
            // 信息提示
            this.$message.success(msg);
            // 关闭Modal
            this.edit_modal_visible = false;
          } else {
            this.$message.error(msg);
          }
        }
      })
    },
    // 关闭dialog动画结束之后，清除之前的验证提示
    handleClosedDialog(formName) {
      this.$refs[formName].resetFields();
    },
    //设置默认展开节点
    setDefaultExpandedKeys() {
      // 获取树形组件实例
      let allNodes = this.$refs.tree.store._getAllNodes();
      let defaultExpandedNodes = [];
      allNodes.forEach(node => {
        node.expanded && defaultExpandedNodes.push(node.data.id);
      });
      this.defaultExpandedKeys = defaultExpandedNodes;
    },
  }
}
</script>

<style lang="less" scoped>
.node-box {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  .node-order {
    width: 100px;
    display: inline-block;
    font-size: 12px;
  }
}

ul.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border: solid 1px #eaeefb;
  border-radius: 4px;
}

.icon-list li {
  float: left;
  width: 10%;
  text-align: center;
  height: 100px;
  line-height: 100px;
  color: #666;
  font-size: 10px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-right: -1px;
  margin-bottom: -1px;

  &::after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
  }

  span {
    display: inline-block;
    line-height: normal;
    vertical-align: middle;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", SimSun, sans-serif;
    color: #99a9bf;
    transition: color 0.15s linear;
  }

  i {
    display: block;
    font-size: 26px;
    margin-bottom: 15px;
    color: #606266;
    transition: color 0.15s linear;
  }

  .icon-name {
    display: inline-block;
    padding: 0 3px;
    height: 1em;
  }

  &.checked,
  &.checked:hover {
    background-color: rgb(92, 182, 255);

    span,
    i {
      color: white;
    }
  }

  &:hover {

    span,
    i {
      color: rgb(92, 182, 255);
    }
  }
}
</style>
