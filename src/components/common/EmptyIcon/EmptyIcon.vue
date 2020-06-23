<template>
  <img :src="nodataImg" alt class="data-pic" :class="size" />
</template>

<script>
export default {
  data() {
    return {
      nodataImg: require('@/assets/images/nodata.png') // 表格无数据展示图片
    };
  },
  props: {
    size: {
      type: String,
      default: ''
    }
  },
  components: {}
};
</script>

<style scoped>
.small {
  height: 70px;
  width: 70px;
}
.medium {
  height: 192px;
  width: 192px;
}
</style>
