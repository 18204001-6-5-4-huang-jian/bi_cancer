
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
      default: () => [],
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
    dimension1: {
      default: null,
      type: String
    },
    dimension2: {
      default: null,
      type: String
    },
    dataType: {
      default: null,
      type: String
    },
    searchItemDisadled: {
      default: null,
      type: Boolean
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
    dimension1: function(val) {
      this.clickChart(val);
    }
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
      let $that = this;
      this.myChart.clear(); //清空图表
      this.seriesData = [];
      this.xAxisData = []; //x轴数据
      this.legendData = []; //图例数据
      //维度一为X轴维度二为柱状图柱子
      let objNameList = [];
      let $xAxisData = [];
      let $barWidth = null;
      if (this.dimension2 != "ROVINCE" && this.dimension1 != "ROVINCE") {
        $barWidth = 20;
      }
      this.xAxisData = this.arrayMerge(this.dataList, this.dimension1);
      $xAxisData = Array.from(new Set(this.xAxisData));
      let objYearList = this.objectMerge(this.dataList, this.dimension1);
      if (this.dimension2) {
        this.legendData = this.arrayMerge(this.dataList, this.dimension2);
        objNameList = this.objectMerge(this.dataList, this.dimension2);
        objNameList.filter((item, index) => {
          let seriesItem = {
            name: item[this.dimension2],
            type: "bar",
            stack:'stack',
            barWidth: $barWidth,
            label: {
                normal: {
                    // show: true,
                    // position: 'inside',
                    // color: '#fff'
                }
            },
            data: this.arrayMergeAuto(
              item.data,
              this.indexarr,
              $xAxisData,
              this.dimension1
            )
          };
          this.seriesData.push(seriesItem);
        });
      } else {
        let seriesItem = {
          // name: this.dataList[0][this.dimension1],
          type: "bar",
          stack:'stack',
          barWidth: $barWidth,
          label: {
                normal: {
                    // show: true,
                    // position: 'inside',
                    // color: '#fff'
                }
            },
          data: this.arrayMerge(this.dataList, this.indexarr)
        };
        this.seriesData.push(seriesItem);
      }
      //初始化数据
      let option = {
        color: [
          "#338BF7",
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
            // magicType: { show: true, type: ["stack", "tiled"] },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: "axis",
          // formatter: "{b} : {c}%",
          axisPointer: {
            type: "shadow"
          },
          textStyle: {
            align: "left"
          }
        },
        grid: {
          // left: '3%',
          right: "3%",
          // top: '3%',
          bottom: "18%"
          // show:true,
          // containLabel: true
        },
        dataZoom: [
          // {
          //     show: true,
          //     start: 0,
          //     end: 100,
          //     bottom:0
          // },
          {
            type: "inside",
            start: 0,
            end: 100
          }
        ],
        xAxis: {
          type: "category",
          data: Array.from(new Set(this.xAxisData)),
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
            interval: 0,
            formatter: function(value) {
              if ($that.dimension1 === "ROVINCE") {
                return value.split("").join("\n");
              } else {
                return value;
              }
            },
            textStyle: {
              color: "#333" //坐标值得具体的颜色
            }
          }
        },
        yAxis: {
          type: "value",
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
        } else {
          option.tooltip.formatter = function(params) {
            let arr = "";
            params.filter(item => {
              arr +=
                item.name +
                "<br><span style='display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;background:" +
                item.color +
                "'></span>" +
                (item.value * 100).toFixed(2) +
                "%";
            });
            return arr;
          };
        }

        option.yAxis.axisLabel.formatter = function(params) {
          return (params * 100).toFixed(2) + "%";
        };
      }
      this.myChart.setOption(option);
      this.clickChart(this.dimension1);
    },

    // 下钻---// X轴为年度，才能下钻
    clickChart(dimension1) {
      let myChart = this.$echarts.init(this.$refs["myChart"]);
      this.myChart = myChart;
      let that = this;
      this.myChart.off("click");
      this.myChart.on("click", function(params) {
        if (
          dimension1 === "YEAR" &&
          (that.$route.path == "/progress" || that.$route.path == "/result")
        ) {
          that.$emit("selectedBar", params);
        } else {
          return;
        }
      });
    },

    // echart resize
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
  height: 530px;
}
</style>
