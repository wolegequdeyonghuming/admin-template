<template>
  <div id="lineChart" :style="{width: width, height: height}"></div>
</template>

<script>
// 引入基本模板
const echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: {
    width: String,
    height: String,
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    title: String
  },
  mounted() {
    console.log(document.getElementById('lineChart'));
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('lineChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: this.title },
        tooltip: {},
        xAxis: {
          data: this.data
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    }
  }
}
</script>

<style>
</style>
