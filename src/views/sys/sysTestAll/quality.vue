<template>
  <div class="page-box">
    <div class="tit">基本信息</div>
    <div class="ess-box">
      <div>
        <div>站点名称：</div>
        <div class="inp-box">
          <el-input v-model="input1"></el-input>
        </div>
      </div>
      <div>
        <div>站点编码：</div>
        <div class="inp-box">
          <el-input v-model="input1"></el-input>
        </div>
      </div>
      <div>
        <div>所在区域：</div>
        <div class="inp-box">
          <el-input v-model="input1"></el-input>
        </div>
      </div>
      <div>
        <div>控制级别：</div>
        <div class="inp-box">
          <el-input v-model="input1"></el-input>
        </div>
      </div>
      <div>
        <div>IP&nbsp;&nbsp;&nbsp;&nbsp;地址：</div>
        <div class="inp-box">
          <el-input v-model="input1"></el-input>
        </div>
      </div>
      <div>
        <div>经&nbsp;&nbsp;纬&nbsp;&nbsp;度：</div>
        <div class="inp-box">
          <el-input v-model="input1"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SysQuality',
    data() {
      return {}
    },
    watch: {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .page-box {
    padding: 20px 20px 0;

    .tit {
      height: 30px;
      line-height: 32px;
    }
  }

  .ess-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    line-height: 32px;

    >div {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-top: 20px;
      width: 50%;
      height: 32px;

      >div:nth-of-type(1){
        width: 100px;
      }

      >div:nth-of-type(2){
        width: calc(94% - 100px);
      }
    }

    >div:nth-of-type(2n) {
      justify-content: flex-end;
    }
  }

  /deep/.ess-box .el-input__inner {
    height: 32px;
  }

  .inp-box {

  }
</style>
