
<template>
  <div>
    <div ref="myChart" class="echarts"></div>
  </div>
</template>
<script>
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
      legendData: [], //图例数据
      seriesData: [] //series数据
    };
  },
  watch: {
    dataList: {
      handler: function() {
        this.drawPie();
      }
    }
  },
  mounted: function() {
    let that = this;
    let myChart = that.$echarts.init(this.$refs["myChart"]);
    that.myChart = myChart;
    that.drawPie();
    that.init();
  },
  methods: {
    drawPie() {
      this.myChart.clear(); //清空图表
      this.seriesData = [];
      this.legendData = []; //图例数据
      //维度一为X轴维度二为柱状图柱子
      let objSecondList = [];
      if (this.dimension2) {
        this.legendData = this.arrayMerge(this.dataList, this.dimension2);
        objSecondList = this.objectMerge(this.dataList, this.dimension1);
        objSecondList.filter((item, index) => {
          item.data.filter(itemA => {
            itemA.value = itemA.SUMDATA
            itemA.name = itemA[this.dimension2];
          })
          item.value = this.sum(this.arrayMerge(item.data, this.indexarr));
          item.name = item[this.dimension1];
          item.children = item.data;
        });
        let seriesItem = {
          // name: "数量",
          type: "sunburst",
          data: objSecondList,
          radius: ['30%', "80%"],
          label: {
            normal: {
              position: "inner"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        };
        this.seriesData.push(seriesItem);
      } else {
        this.legendData = this.arrayMerge(this.dataList, this.dimension1);
        this.dataList.filter(item => {
          item.value = item.SUMDATA;
          item.name = item[this.dimension1];
        });
        let seriesItem = {
          // name: "数量",
          type: "sunburst",
          data: this.dataList,
          selectedMode: "single",
          radius: [0, "55%"],

          label: {
            normal: {
              position: "inner"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        };
        this.seriesData.push(seriesItem);
      }
      //初始化数据
      let option = {
        color: [
          "#dd6b66",
          "#759aa0",
          "#e69d87",
          "#8dc1a9",
          "#ea7e53",
          "#eedd78",
          "#73a373",
          "#73b9bc",
          "#7289ab",
          "#91ca8c",
          "#f49f42",
          "#2f4554",
          "#61a0a8",
          "#9fda8f",
          "#7fae90",
          "#e98f6f",
          "#ca8622",
          "#cfb2a9",
          "#797b7f",
          "#d53a35",
          "#995451"
        ],
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
          trigger: "item"
          // formatter: "{b}: {c}"
        },
        legend: {
          icon: "rect",
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          y: "bottom",
          data: this.arrayMerge(this.dataList, "name")
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
        series: this.seriesData
      };
      // 比率格式化
      if (this.dataType === "2") {
        option.tooltip.formatter = function(params) {
          let arr = "";
          arr +=
            "<span style='display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;background:" +
            params.color +
            "'></span>" +
            params.name +
            "：" +
            (params.value * 100).toFixed(2)+
            "%";
          return arr;
        };
      }
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
