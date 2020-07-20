<template>
  <div :class="classObj" class="app-wrapper">
    <div class="cg-head">
      <span>xxxx系统</span>

      <div class="user-box">
        <div>
          <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
              <div class="avatar-wrapper">
                <!--<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
                <i class="mdi mdi-account-circle user-avatar"></i>
                管理员
                <i class="el-icon-caret-bottom" ></i>
              </div>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link to="/">
                  <el-dropdown-item>
                    修改密码
                  </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided @click.native="logout">
                  <span style="display:block;">登出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

    </div>
    <div class="app-wrapper cg-page">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
        </div>
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
import {Navbar, Sidebar, AppMain} from './components';
import ResizeMixin from './mixin/ResizeHandler';
import {mapGetters} from 'vuex';

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return true;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      };
    },
    ...mapGetters(['name'])
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", {
        withoutAnimation: false
      });
    },
    async logout() {
      // await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "~@/styles/common/mixin.scss";
  @import "~@/styles/common/variables.scss";

  .mdi{
    font-size: 24px;
    color: white;
    line-height: 60px;
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .cg-head {
    position: relative;
    height: 60px;
    font-size: 24px;
    font-weight: bold;
    line-height: 60px;
    color: #ffffff;
    background: #304156;

    span {
      margin-left: 30px;
    }
  }

  .app-wrapper.cg-page {
    height: calc(100vh - 60px);
  }

  #app .sidebar-container {
    top: 60px;
    height: calc(100vh - 60px);
  }

  #app .main-container {
    min-height: calc(100vh - 60px);
    height: calc(100vh - 60px);
    // overflow-y: auto;
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 60px;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .right-menu {
    float: right;
    height: 60px;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin: 0 60px 0 0;

      .avatar-wrapper {
        position: relative;
        line-height: 60px;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;

        .user-avatar {
          /*margin-top: 10px;*/
          /*border-radius: 10px;*/
          margin-right: 10px;
          margin-top: 4px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 27px;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }

  .user-box {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;

    > div {
      margin-left: 30px;
    }
  }
</style>
