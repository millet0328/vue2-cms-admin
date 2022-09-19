<template>
  <div>
    <el-menu class="side-bar" :default-openeds="['0']" router background-color="#545c64" text-color="#fff"
             active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span slot="title">文章管理</span>
        </template>
        <el-menu-item index="/article/release">
          <i class="el-icon-document-add"></i>
          发布文章
        </el-menu-item>
        <el-menu-item index="/article/list">
          <i class="el-icon-notebook-2"></i>
          文章列表
        </el-menu-item>
        <el-menu-item index="/tag/list">
          <i class="el-icon-price-tag"></i>
          标签管理
        </el-menu-item>
        <el-menu-item index="/comment/list">
          <i class="el-icon-chat-line-square"></i>
          评论管理
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/category/list">
        <i class="el-icon-data-analysis"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-data-board"></i>
          <span slot="title">公告管理</span>
        </template>
        <el-menu-item index="/notice/release">
          <i class="el-icon-date"></i>
          发布公告
        </el-menu-item>
        <el-menu-item index="/notice/list">
          <i class="el-icon-data-analysis"></i>
          公告列表
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/user/list">
        <i class="el-icon-user"></i>
        用户列表
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-connection"></i>
          <span slot="title">推广管理</span>
        </template>
        <el-menu-item index="/slide/list">
          <i class="el-icon-picture-outline"></i>
          轮播图管理
        </el-menu-item>
        <el-menu-item index="/link/list">
          <i class="el-icon-link"></i>
          友情链接
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item index="/admin/list">
          <i class="el-icon-medal"></i>
          管理员管理
        </el-menu-item>
        <el-menu-item index="/auth/role">
          <i class="el-icon-open"></i>
          权限角色
        </el-menu-item>
        <el-menu-item index="#">
          <i class="el-icon-set-up"></i>
          菜单管理
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/admin/info">
        <i class="el-icon-postcard"></i>
        <span slot="title">账户设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="less">
.side-bar {
  color: white;
  border-right: 0;
}
</style>
