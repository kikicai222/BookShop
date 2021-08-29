<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div class="home-header">
        <img src="../../assets/img/book.png" alt="" />
        <span>书籍交易后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleBtn">|||</div>
        <el-menu background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
           <el-menu-item :index="'/' + subItem.path + ''" v-for="subItem in item.children" 
                         :key="subItem.id"
                         @click="saveNavState('/' + subItem.path)">
             <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </template>
           </el-menu-item>

          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 主体部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menulist: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao',
      },
      isCollapse: false,
      activePath: ''
    }
  },
  methods: {
    logout() {
      //退出原理：清空token
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //获取所有菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      //console.log(res);
    },
    toggleBtn() {
    this.isCollapse = !this.isCollapse
    },
    //保存来链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373f41;
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header span {
  margin-left: 15px;
}
.el-aside {
  background-color: #333744;
  color: #333;
  // text-align: center;
  // line-height: 200px;
}
.el-menu {
  border: none;
}
.el-main {
  background-color: #eaedf1;
  color: #333;
}
.home-header img {
  height: 60px;
  width: 60ox;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>