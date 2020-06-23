<template>
  <div>
    <div class="airEqRankBar">
      <div class="Eqrank_0" @click="handleMarkerStatus(0)" :class="{'invisibleStatus': !tagList[0].show}">
        <div class="rangeVal"><span class="minVal">{{ yzLevel.LEVEL1.MIX }}</span><span class="maxVal">{{ yzLevel.LEVEL1.MAX }}</span></div>
        <div class="viewBar"></div>
        <div class="rankText">优</div>
      </div>
      <div class="Eqrank_1" @click="handleMarkerStatus(1)" :class="{'invisibleStatus': !tagList[1].show}">
        <div class="rangeVal"><span class="maxVal">{{ yzLevel.LEVEL2.MAX }}</span></div>
        <div class="viewBar"></div>
        <div class="rankText">良</div>
      </div>
      <div class="Eqrank_2" @click="handleMarkerStatus(2)" :class="{'invisibleStatus': !tagList[2].show}">
        <div class="rangeVal"><span class="maxVal">{{ yzLevel.LEVEL3.MAX }}</span></div>
        <div class="viewBar"></div>
        <div class="rankText">轻度</div>
      </div>
      <div class="Eqrank_3" @click="handleMarkerStatus(3)" :class="{'invisibleStatus': !tagList[3].show}">
        <div class="rangeVal"><span class="maxVal">{{ yzLevel.LEVEL4.MAX }}</span></div>
        <div class="viewBar"></div>
        <div class="rankText">中度</div>
      </div>
      <div class="Eqrank_4" @click="handleMarkerStatus(4)" :class="{'invisibleStatus': !tagList[4].show}">
        <div class="rangeVal"><span class="maxVal">{{ yzLevel.LEVEL5.MAX }}</span></div>
        <div class="viewBar"></div>
        <div class="rankText">重度</div>
      </div>
      <div class="Eqrank_5" @click="handleMarkerStatus(5)" :class="{'invisibleStatus': !tagList[5].show}">
        <div class="rangeVal"><span class="maxVal">{{ yzLevel.LEVEL6.MAX }}</span></div>
        <div class="viewBar"></div>
        <div class="rankText">严重</div>
      </div>
    </div>
    <div class="lwztBar" @click="handleMarkerStatus(6)">
      <div class="lwzt_0 invisibleStatus" :class="{'invisibleStatus': !tagList[6].show}">
        <div class="rangeVal"></div>
        <div class="viewBar"></div>
        <div class="lwztText">掉线</div>
      </div>
    </div>
    <div class="noDataBar" @click="handleMarkerStatus(7)">
      <div class="noData_0" :class="{'invisibleStatus': !tagList[7].show}">
        <div class="rangeVal"></div>
        <div class="viewBar"></div>
        <div class="noDataText">无数据</div>
      </div>
    </div>
    <div class="factorsScrollBar" v-if="yzList.length > 0">
      <div class="factor_0">
        <div class="switchUp" @click="handleSwitchUp" :class="{'default': defaultToplength == yzList.length-1}"></div>
        <div class="viewBar">
          <ul :style="{top: -(defaultToplength * scrollItemHeight) + 'px'}">
            <li v-for="item in yzList" :key="item.value">{{item.label}}</li>
          </ul>
        </div>
        <div class="switchDown" @click="handleSwitchDown" :class="{'default': defaultToplength == 0}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatLevelValue } from '@/utils/rankFun';
export default {
  data() {
    return {
      yzsel: '',
      defaultToplength: 0,
      scrollItemHeight: 30,
      tagList: [{
        tag: 'v1',
        show: true
      }, {
        tag: 'v2',
        show: true
      }, {
        tag: 'v3',
        show: true
      }, {
        tag: 'v4',
        show: true
      }, {
        tag: 'v5',
        show: true
      }, {
        tag: 'v6',
        show: true
      }, {
        tag: 'v7',
        show: true
      }, {
        tag: 'v8',
        show: true
      }]
    };
  },
  computed: {
    yzLevel() {
      return formatLevelValue(this.yzsel);
    },
    showMarkTag(){
      const tagShowList = [];
      this.tagList.forEach(item => {
        if(item.show){
          tagShowList.push(item.tag);
        }
      })
      return tagShowList;
    }
  },
  props: {
    yz: {
      type: String,
      default: 'AQI'
    },
    yzList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  created() {
    this.yzsel = this.yz;
    this.initScrollTop();
  },
  methods: {
    initScrollTop() {
      this.yzList.some((item, index) => {
        if (item.label == this.yz) {
          this.defaultToplength = index;
          return true;
        }
      });
    },
    handleSwitchUp() {
      if (this.defaultToplength == this.yzList.length - 1 ) {
        return ;
      }
      this.defaultToplength++;
      this.yzsel = this.yzList[this.defaultToplength].label;
      this.$emit('yzChange', this.yzList[this.defaultToplength], this.showMarkTag);
    },
    handleSwitchDown() {
      if (this.defaultToplength == 0) {
        return;
      }
      this.defaultToplength--;
      this.yzsel = this.yzList[this.defaultToplength].label;
      this.$emit('yzChange', this.yzList[this.defaultToplength], this.showMarkTag);
    },
    handleMarkerStatus(v){
      this.tagList[v].show = !this.tagList[v].show;
      this.$emit('filterMarker', this.showMarkTag);
    }
  }
}
</script>

<style scoped>
.airEqRankBar,.lwztBar,.noDataBar,.factorsScrollBar{
    z-index: 889;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
    position: fixed;
    left: 3%;
    pointer-events: none;
    //border:1px solid red;
    user-select:none;
    font-size: 13px;
}
.airEqRankBar{
    bottom: 10px;
    height: 70px;
    width: 360px;
    color: #fff;
    left: calc(100% - 500px);
    pointer-events: auto;
}
.lwztBar,.noDataBar{
    bottom: 10px;
    height: 70px;
    width: 60px;
    color: #fff;
    left: calc(100% - 120px);
    pointer-events:auto;
}
.factorsScrollBar{
    bottom: 10px;
    height: 70px;
    width: 60px;
    color: #fff;
    left: calc(100% - 48px);
    pointer-events:auto;
}
.lwztBar>div,.airEqRankBar>div,.noDataBar>div{
  cursor:pointer;
}
.airEqRankBar .Eqrank_0,.airEqRankBar .Eqrank_1,.airEqRankBar .Eqrank_2,.airEqRankBar .Eqrank_3,.airEqRankBar .Eqrank_4,.airEqRankBar .Eqrank_5,.lwztBar .lwzt_0,.noDataBar .noData_0{
  flex:1;
  height:100%;
}
.airEqRankBar .rangeVal,.lwztBar .rangeVal,.noDataBar .rangeVal{
  height: 20px;
    position: relative;
}
.airEqRankBar .rangeVal .minVal{
    display: inline-block;
    transform: translateX(-50%);
    position: absolute;
    left: 0px;
}
.airEqRankBar .rangeVal .maxVal{
    display: inline-block;
    position: absolute;
    right: 0px;
    transform: translateX(50%);
}
.airEqRankBar .viewBar,.lwztBar .viewBar,.noDataBar .viewBar{
  width: 100%;
    height: 8px;
}
.lwztBar .lwzt_0 .viewBar,.noDataBar .noData_0 .viewBar{
  border-radius:4px;
  background-color: #b7b7b7;
}
.airEqRankBar .Eqrank_0 .viewBar{
  border-radius: 4px 0% 0% 4px/4px 0% 0% 4px;
  background-color: #b6ff50;
}
.airEqRankBar .Eqrank_1 .viewBar{
  background-color: #ffed45;
}
.airEqRankBar .Eqrank_2 .viewBar{
  background-color: #f15a24;
}
.airEqRankBar .Eqrank_3 .viewBar{
  background-color: #ed1b24;
}
.airEqRankBar .Eqrank_4 .viewBar{
  background-color: #8b088a;
}
.airEqRankBar .Eqrank_5 .viewBar{
  border-radius: 0% 4px 4px 0%/0% 4px 4px 0%;
  background-color: #8b042f;
}
.airEqRankBar .rankText,.lwztBar .lwztText,.noDataBar .noDataText {
  line-height: 30px;
    text-align: center;
    height: 30px;
    user-select:none;
}
.lwztBar .invisibleStatus .lwztText,.airEqRankBar .invisibleStatus .rankText,.noDataBar .invisibleStatus .noDataText{
  color:gray;
}

.factorsScrollBar .switchUp,.factorsScrollBar .switchDown{
  color:#fff;
  height:12px;
  position: relative;
}
.factorsScrollBar .switchUp.default,.factorsScrollBar .switchDown.default,.factorsScrollBar .switchUp.locked,.factorsScrollBar .switchDown.locked{
  color:gray;
}
.factorsScrollBar .switchUp::after,.factorsScrollBar .switchDown::after{
  content:'';
  width:0px;
  border-left:8px solid transparent;
  border-right:8px solid transparent;
  height:0px;
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
    cursor:pointer;
}
.factorsScrollBar .switchUp.default::after,.factorsScrollBar .switchDown.default::after,.factorsScrollBar .switchUp.locked::after,.factorsScrollBar .switchDown.locked::after{
  cursor:default;
}
.factorsScrollBar .switchUp::after{
  border-bottom:12px solid currentColor;
  border-top-width:0px;
}
.factorsScrollBar .switchDown::after{
  border-top:12px solid currentColor;
  border-bottom-width:0px;
}
.factorsScrollBar .viewBar{
  height: 30px;
    overflow: hidden;
    position:relative;
}
.factorsScrollBar .viewBar ul{
  list-style: none;
    padding-left: 0px;
    margin-bottom: 0px;
    position: relative;
    transition:top 0.375s ease;
    top:0px;
}
.factorsScrollBar .viewBar ul li{
  height: 30px;
    line-height: 30px;
    text-align: center;
}
</style>
