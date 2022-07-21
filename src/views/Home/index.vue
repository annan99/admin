<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <img src="../../assets/logo.png" alt="" />
      <span>原神后台管理系统</span>
      <el-button @click="layout">退出</el-button>
    </el-header>

    <!-- 侧边栏 -->
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="aside-button" @click="asideButton">|||</div>
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          router
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template #title>
              <i :class="icons[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + item1.path"
              v-for="item1 in item.children"
              :key="item1.id"
            >
              <i class="el-icon-menu"></i>
              {{ item1.authName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenuList } from "@/api/aside";
export default {
  created() {
    this.getMenuList();
  },

  data() {
    return {
      // 是否折叠菜单栏
      isCollapse: false,
      menuList: [],
      icons: {
        125: "iconfont icon-user1",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
    };
  },
  methods: {
    // 折叠菜单栏
    asideButton() {
      this.isCollapse = !this.isCollapse;
    },
    async getMenuList() {
      try {
        const res = await getMenuList();
        // console.log(res);
        this.menuList = res.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    async layout() {
      await this.$store.dispatch("user/remove");
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
};
</script>

<style scoped lang="less">
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu {
  border-right: none;
}
.el-header {
  padding: 0 20px;
  img {
    width: 61px;
    height: 60px;
    border-radius: 50%;
  }
  span {
    color: #fff;
    font-size: 22px;
    margin: 0 0 0 10px;
  }
  .el-button {
    margin-top: 10px;
    float: right;
    width: 70px;
    height: 40px;
    font-size: 14px;
  }
}
.aside-button {
  width: 100%;
  height: 40px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  letter-spacing: 5px;
  background-color: #ff69b4;
}
.el-menu-item {
  color: red;
}
.iconfont {
  margin-right: 10px;
}
</style>
