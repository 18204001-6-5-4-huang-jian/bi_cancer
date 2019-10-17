
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
      xAxisData: [], //x轴数据
      legendData: [], //图例数据
      seriesData: [] //series数据
    };
  },
  watch: {
    dataList: function(val) {
      this.drawBar();
    },
    dimension1: function(val) {}
  },
  mounted: function() {
    var that = this;
    var myChart = that.$echarts.init(this.$refs["myChart"]);
    that.myChart = myChart;
    that.drawBar();
    that.init();
  },
  methods: {
    drawBar() {
      this.myChart.clear(); //清空图表
      this.seriesData = [];
      this.xAxisData = []; //x轴数据
      this.legendData = []; //图例数据
      //维度一为X轴维度二为柱状图柱子
      let objNameList = [];
      let $xAxisData = [];
      this.xAxisData = this.arrayMerge(this.dataList, this.dimension1);
      $xAxisData = Array.from(new Set(this.xAxisData));
      let objYearList = this.objectMerge(this.dataList, this.dimension1);
      if (this.dimension2) {
        this.legendData = this.arrayMerge(this.dataList, this.dimension2);
        objNameList = this.objectMerge(this.dataList, this.dimension2);
        objNameList.filter((item, index) => {
          let seriesItem1, seriesItem2;
          if (index === 0) {
            seriesItem1 = {
              name: item[this.dimension2],
              type: "bar",
              stack: "bar",
              data: this.arrayMergeAuto(
                item.data,
                this.indexarr,
                $xAxisData,
                this.dimension1
              ),
              barWidth: 20
            };
          } else {
            seriesItem2 = {
              name: item[this.dimension2],
              type: "bar",
              stack: "bar",
              data: this.reverseMinus(
                this.arrayMergeAuto(
                  item.data,
                  this.indexarr,
                  $xAxisData,
                  this.dimension1
                )
              ),
              barWidth: 20
            };
          }
          this.seriesData.push(seriesItem1);
          this.seriesData.push(seriesItem2);
        });
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
        legend: {
          icon: "rect",
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          y: "bottom",
          data: Array.from(new Set(this.legendData.join(",").split(",")))
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          // left: '1%',
          // right: '3%',
          // top: '3%',
          bottom: "18%"
          // show:true,
          // containLabel: true
        },
        xAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#eee"]
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#eee" //左边线的颜色
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#333" //坐标值得具体的颜色
            }
          }
        },
        yAxis: {
          type: "category",
          data: Array.from(new Set(this.xAxisData)),
          splitLine: { show: false },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          nameTextStyle: {
            width: 10
          },
          axisLabel: {
            interval: 0
          }
        },
        series: this.seriesData
      };
      // 比率格式化
      if (this.dataType === "2") {
        if (this.dimension2) {
          option.tooltip.formatter = function(params) {
            let arr = params[0].name + "<br>";
            params.filter(item => {
              arr +=
                "<span style='display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;background:" +
                item.color +
                "'></span>" +
                item.seriesName +
                "：" +
                (item.value * 100).toFixed(2) +
                "%<br>";
            });
            return arr;
          };
        } 
        option.xAxis.axisLabel.formatter = function(params) {
          return params * 100 + "%";
        };
      }
      this.myChart.setOption(option);
      let that = this;
      // X轴为年度，才能下钻
      this.myChart.on("click", function(params) {
        that.$emit("selectedBar", params);
      });
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
  width: 940px;
  height: 500px;
}
</style>
