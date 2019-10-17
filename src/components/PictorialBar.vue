
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
      this.xAxisData = []; //x轴数据
      this.legendData = []; //图例数据
      //维度一为X轴维度二为柱状图柱子
      let objNameList = [];
      let $xAxisData = [];
      let labelSetting = {
        normal: {
          show: true,
          position: "right",
          textStyle: {
            fontSize: 12
          }
        }
      };
      //label格式化
      if (this.dataType === "2") {
        labelSetting.normal.formatter = function(params) {
            return (params.value * 100).toFixed(2) + ' %';
          };
      }
      let pathSymbols =
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAACdCAYAAAA5Wx9JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMzE0NzgwQTExNjQxMUU5ODY3NUJEN0U3QjEzREY1NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMzE0NzgwQjExNjQxMUU5ODY3NUJEN0U3QjEzREY1NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUzMTQ3ODA4MTE2NDExRTk4Njc1QkQ3RTdCMTNERjU2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUzMTQ3ODA5MTE2NDExRTk4Njc1QkQ3RTdCMTNERjU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+m/dKGwAABlNJREFUeNrsnXtsFEUcx6fVan0VH6FtNCbFVOpbY4L4on8QC/XVqhDUEBP+0QSCwaCxNvqHMWqsRg2+MGoMRlDAWKT45iGpj6hEBYkixqTYiC1awTNgqVr0+8vMmaNcudvbud252e83+abJdW9m97O7M7/Zm/ltWVXdJFViGgOPgw+Hf8/wUBw7k+rpDrT9oY7DLYMvgq+HG+E6+NhRtt0ML4UXw72uHpCrwKvh+fBN8Il5fuds4wfgT+EH4VWuHVi5Y/tzPNwB/wi3BYA9UhfCXQb8ZALPrpkG9J1wpaUyJ8Jr4WdM80TgZh86TNt7dJHqmA2vgCuSDlwArzZXdbHVCq8p4kl1HrjU3RlxG9to6ixPIvDH4KYY6m0ydScK+Cx4Xowne57Zh0QAHws/7UBn/ZQZtXoP/H74SAeAHwW3+w68Hr7ZodhfmpYTfAZ+mysDEKNKs0/eAr9WuadrfAXeoAp/NlJMnaX0417vgF+u3FWLr1e4qzrNR+A1DgOvIXACtzLCdFXVPgIfdBj4Hh+B9zsMvJ/ACTy0+hwG3ucj8G6HgX/iI/A1jnacf8Hv+QhcDuxNB4GvM/vmHXDRyw4C74yysqiBy9SzTQ7B/gF+0WfgojaHgN8OD/sOXDqojx2ALVFTV9SVxjVNYnrMA6Gf4GlxVBwXcIE9NaYwUZ6bTIEHkgRc9LXSE+2jbEP/MXVuieug457MKVFLM/xnBHX9Bsv6mrfiPGAXpivLCPQSeGcR65BQ9DylJ+irpAMXbVR68rxtILuVXoJysekoFYHvPwiRBVRXKL1AKoz2wo8rPf3hnoiarJIDntY78LnwlfASlf+vMcOmeZKpdLVKL8oacO3gXF3F9i/8tnGlueonKL1kMG25irdl+MMi9wNeAx/ZPHSqiB8yJalJ8VqFXuFV8AVKT/VN+xDPWUkfscvE87/CG+BU0ELKAqy1l9VfNyo9A/Yy5cASvJj1N7wefg1enurpTtkCLp3WHPhupVcKUwdKrvyH4QUAPxgGuAxGXodPItO8tAOeDugfFdJpXqf0M2PCzl8yR3HdmHGNNwQFPtdc2YeRYWBJ3/YqoLflC1w6xSfILbQeAvSrcwGXtBeS5KWMvKzoFUCvHw24xNHL2YxYlYTSywC9PBvwW+CTyci6zlc6s9F+YaFc1ZIcppZ8iqLtcD3Cxb3lGSEgYRdPElpPy2xSWsik6GpONynSWcpz5CoyKarkWctxcoU3EHYkklQhDQJ8LFlEploBXk0OkamGV3gMwCvIITJV8DfNiEXgBE7glEXZmggk046zZbuUH1YnlBiTL+A7snwuychaXQEuS6fXZ/l8ZwlehLtGOZYZbFLYhlMETuAEThE4gVMETuAUgRM4gRMBgRM4ReAEThE4gVMETuAEThE4gVMETuAUgRM4gVME7gFwG+mkhxPAygonAW4jXehAAoBb4STAt1oo6PsEALfCSYB/BfeGKETy93UlALjkwQ3zgqX+VE/35+lO85EQBb0A/5EA4HKMz4X4fkdmlCIFfVlAIZJ45d4EBRn3mWMOKmG7MBO43Cry1pGNAWHLd35JEHDJOdsUELq8XGQqmpOhkXG49MKS1e3ZHAVIbu/F8DnwNwkMpbeYY8/18g7p2xYIU8D+P8IZuYpNzsJseKXSLzeS972fCh9h4H5gYH+b8PGLrM67Cp4FT4bHw6cbfsLmfeEE0AcEI6MtG3zX2DWdmeVkS4Kd72Lan0WAuohDe8eH9hSBEzhF4AROETiBEzgREDiBUwRO4BSBEzhF4ARO4BSBEzhF4AROETiBEzhF4AROETiBUwRO4AROETiBUwRO4BSBEziBUwRO4HloKILyhhzf50iB74igvO2O73OkwG0uyf4Z3p3lc0ki0Guxnq2lDLzTYlkrDvK/NyzWs7SUgW9TOrNCWO2DnzzI/xeabcJqreW7JZYopd0CjCU5bnVpul6ycFLbfQgLJf3Q3BDf36x0DpdculXp7DuFaj68wZc4XG75OfBgwO9tUjrN0548tpVtphTQhEmGo7uUzt7j1cBHoJ+h8ku5JxCehyfCfQFDOjlBM1V+ubhkm1ZlMq5FobKquklxDLguhVvM31PgmgwAq00H+VnIOo6BZ8DNSmcSqlM6ldQ+08ytgh/N8+4ZVame7kDb/yfAAGslMOK/hhPJAAAAAElFTkSuQmCC";

      this.xAxisData = this.arrayMerge(this.dataList, this.dimension1);
      $xAxisData = Array.from(new Set(this.xAxisData));
      let objYearList = this.objectMerge(this.dataList, this.dimension1);
      if (this.dimension2) {
        this.legendData = this.arrayMerge(this.dataList, this.dimension2);
        objNameList = this.objectMerge(this.dataList, this.dimension2);
        objNameList.filter((item, index) => {
          let seriesItem = {
            name: Array.from(new Set(this.legendData))[index],
            type: "pictorialBar",
            barGap: "10%",
            label: labelSetting,
            symbolRepeat: true,
            symbol: pathSymbols,
            symbolSize: ["60%", "80%"],
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
          type: "pictorialBar",
          barGap: "10%",
          label: labelSetting,
          symbolRepeat: true,
          symbol: pathSymbols,
          symbolSize: ["15", "25"],
          data: this.arrayMerge(this.dataList, this.indexarr)
        };
        this.seriesData.push(seriesItem);
      }

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
        legend: {
          icon: "rect",
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          y: "bottom",
          data: Array.from(new Set(this.legendData.join(",").split(",")))
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          textStyle: {
            align: "left"
          }
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
        dataZoom: [
          {
            type: "inside",
            yAxisIndex: [0],
            start: 0,
            end: 100
          }
        ],
        grid: {
          containLabel: true,
          left: 20
        },
        yAxis: {
          data: Array.from(new Set(this.xAxisData)),
          inverse: true,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            margin: 30,
            textStyle: {
              fontSize: 12
            }
          },
          axisPointer: {
            label: {
              show: true,
              margin: 30
            }
          }
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
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: { show: false }
        },
        series: this.seriesData
      };
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
