<template>
  <div :class="{'has-logo':showLogo}">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText"
        :unique-opened="true" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/common/variables.scss'

  export default {
    components: {
      SidebarItem,
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      routes() {
        var index = this.$router.options.routes,
          obj = sessionStorage.getItem('nav'),
          nav = JSON.parse(obj),
          nav_all = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        if (nav) {
          for (var i in nav_all) {
            if (!(nav.indexOf(nav_all[i]) > -1)) {
              index.splice(nav_all[i], 1);
            }
          }
        }
        // index[4].children.splice(3,1);
        return index
      },
      activeMenu() {
        const route = this.$route
        const {
          meta,
          path
        } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      showLogo() {
        return false
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style scoped>
  /deep/.el-icon-arrow-down:before {
    color: #ffffff;
  }

  /deep/.el-menu-item,
  /deep/.el-submenu__title {
    height: 40px;
    line-height: 40px;
    background-color: hsla(0, 0%, 100%, .15) !important;
    border-radius: 5px;
    margin: 0 8px 10px;
    padding: 0 5px 0 0;
  }

  /deep/.nest-menu .el-menu-item {
    border-radius: 0;
    margin-bottom: 0;
  }

  /deep/.is-opened .el-submenu__title {
    border-radius: 5px 5px 0 0;
  }

  /deep/#app .sidebar-container .el-submenu__title:hover {
    background-color: hsla(0, 0%, 100%, .15)
  }

  /deep/.el-submenu .el-menu {
    margin: -10px 0 10px;
  }

  /deep/#app .sidebar-container .el-submenu>.nest-menu .el-menu-item {
    min-width: 190px !important;
    background-color: hsla(0, 0%, 100%, .15) !important;
  }

  /deep/.el-menu>.nest-menu:nth-last-of-type(1) .el-menu-item {
    border-radius: 0 0 5px 5px;
  }

  /deep/.mdi{
    display: inline-block;
    text-align: center;
    width: 38px;
    font-size: 20px;
    color: rgb(191, 203, 217);
  }

</style>
