<template>
  <el-menu router :collapse="isCollapse" class="side-bar" :default-openeds="['11']" background-color="#545c64"
           text-color="#fff" active-text-color="#ffd04b">
    <template v-for="(item,index) in menu">
      <el-menu-item v-if="item.path" :index="item.path">
        <i :class="`el-icon-${item.icon_name}`"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>

      <el-submenu v-else :index="index + '1'">
        <template slot="title">
          <i :class="`el-icon-${item.icon_name}`"></i>
          <span slot="title">{{ item.name }}</span>
        </template>
        <el-menu-item v-for="element in item.children" :key="element.id" :index="element.path">
          <i :class="`el-icon-${element.icon_name}`"></i>
          {{ element.name }}
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import { Role } from "@/api/";

export default {
  data() {
    return {
      menu: [],
    }
  },
  created() {
    this.loadSideMenu();
  },
  computed: {
    ...mapState("Menu", ['isCollapse'])
  },
  methods: {
    async loadSideMenu() {
      // 提取角色id
      let id = sessionStorage.role;
      let { status, data } = await Role.menu({ id, type: 'tree' });
      if (status) {
        this.menu = data;
      }
      // TODO 注册动态路由
    }
  }
}
</script>

<style scoped lang="less">
.side-bar:not(.el-menu--collapse) {
  width: 200px;
}
</style>
