<template>
  <div>
    <div ref="myChart" class="echarts"></div>
  </div>
</template>

<script>
import "echarts/map/js/china.js";
import mixin from "@/mixins/mixins";
export default {
  props: {
    dataList: {
      default: [],
      type: Array
    },
    barTitle: {
      default: null,
      type: String
    },
    indexarr: {
      default: null,
      type: String
    },
    dataType: {
      default: null,
      type: String
    },
    dimension1: {
      default: null,
      type: String
    },
    dimension2: {
      default: null,
      type: String
    }
  },
  mixins: [mixin],
  data() {
    return {
      myChart: {},
      seriesData: [] //series数据
    };
  },
  watch: {
    dataList: function(val) {
      this.drawChinaMap();
    },
    dimension1: function(val) {}
  },
  mounted() {
    let that = this;
    let myChart = that.$echarts.init(this.$refs["myChart"]);
    that.myChart = myChart;
    that.drawChinaMap();
    that.init();
  },
  methods: {
    drawChinaMap() {
      let $that = this
      this.myChart.clear(); //清空图表
      this.seriesData = []
      //维度一为X轴维度二为柱状图柱子
      this.dataList.filter(item => {
        item.value = item.SUMDATA;
        item.name = item[this.dimension1];
        if(item.name && item.name.endsWith('省')){
          item.name = item.name.replace("省", "")
        }
        if(item.name && item.name.endsWith('市')){
          item.name = item.name.replace("市", "")
        }
      });
      let seriesItem = {
        name: "数量",
        type: "map",
        mapType: "china",
        roam: false,
        itemStyle: {
          normal: { label: { show: true } },
          emphasis: { label: { show: true } }
        },
        data: this.dataList
      };
      this.seriesData.push(seriesItem);
      //初始化数据
      let option = {
        title: {
          text: this.barTitle,
          left: "center",
          textStyle: {
            fontSize: 16,
            fontWeight: "normal",
            color: "#333333"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(data) {
            if (!isNaN(data.value)) {
              if ($that.dataType === "2") {
                return data.name + "：" + (data.value*100).toFixed(2)+'%';
              }else{
                return data.name + "：" + data.value;
              }
            }
          }
        },
        // legend: {
        //     orient: 'vertical',
        //     x:'left',
        //     data:['iphoneX']
        // },
        dataRange: {
          min: 0,
          max: 2500,
          x: "left",
          y: "bottom",
          text: ["（筛查数）高", "（筛查数）低"],
          calculable: true
        },
        toolbox: {
          show: true,
          right: 20,
          feature: {
            dataView: { show: false, readOnly: false },
            magicType: { show: false, type: ["line", "bar"] },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        },
        roamController: {
          show: true,
          x: "right",
          mapTypeControl: {
            china: true
          }
        },
        series: this.seriesData
      };
      this.myChart.setOption(option);
    },
    init() {
      const self = this;
      setTimeout(() => {
        window.onresize = function() {
          self.myChart = self.$echarts.init(self.$refs.myChart);
          self.myChart.resize();
        };
      }, 20);
    }
  }
};
</script>

<style scoped>
.echarts {
  background: #fff;
  margin-top: 0px;
  width: 940px;
  height: 500px;
}
</style>

