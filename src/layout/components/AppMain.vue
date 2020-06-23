<template>
  <div style="height: calc(100vh - 100px);margin-top: 40px;">
    <!-- 注意需要给 el-scrollbar 设置高度，判断是否滚动是看它的height判断的 -->
    <el-scrollbar ref="elscrollbar" style="height: 100%;overflow-y:auto;" id="elscrollbar">
      <section class="app-main" id="app-main">
        <div>
          <transition mode="out-in" name="slide-fade">
            <router-view v-if="isRouterAlive" :key="key" />
          </transition>
        </div>
      </section>
      <el-backtop :bottom="50" :right="20" target="#elscrollbar .el-scrollbar__wrap"></el-backtop>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  computed: {
    key() {
      return this.$route.path;
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style scoped>
.app-main {
  margin-top: 0px;
}
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}
.el-scrollbar /deep/ .el-scrollbar__bar.is-horizontal {
  display: none;
}
</style>
