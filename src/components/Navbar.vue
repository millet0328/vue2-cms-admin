<template>
  <div class="nav-bar">
    <div class="left">
      <img class="logo am-margin-right-lg" src="../assets/img/common/logo.png"/>
      <el-button @click="toggle" class="icon-toggle" type="text" :icon="toggleIcon"></el-button>
    </div>
    <el-menu mode="horizontal" router background-color="#31404e" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item>
        <el-link target="_blank" href="/blog/">预览网站</el-link>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <el-avatar size="small" :src="profile.avatar"></el-avatar>
          <span class="username am-margin-left-sm">{{ profile.fullname }}</span>
        </template>
        <el-menu-item index="/admin/info">账户设置</el-menu-item>
        <el-menu-item>消息通知</el-menu-item>
        <el-menu-item @click="handleLogout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: "NavBar",
  computed: {
    ...mapState('Account', ['profile']),
    ...mapGetters('Menu', ['toggleIcon']),
  },
  created() {
    // 获取当前账户id
    let id = sessionStorage.id;
    this.loadProfile({ id });
  },
  methods: {
    ...mapMutations('Menu', ['toggle']),
    ...mapActions('Account', ['loadProfile']),
    handleLogout() {
      // 清空缓存中数据
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('token');
      // 重定向页面
      this.$router.replace('/login');
    }
  }
};
</script>

<style lang="less" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;

    .icon-toggle {
      font-size: 18px;
      color: white;
    }

    .logo {
      height: 50px;
    }
  }
}
</style>
