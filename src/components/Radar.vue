
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
      default: () => {},
      type: Object
    },
    cancertypeId: {
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
    }
  },
  mounted: function() {
    var that = this;
    var myChart = that.$echarts.init(this.$refs["myChart"]);
    that.myChart = myChart;
    // that.drawBar();
    that.init();
  },
  methods: {
    drawBar() {
      let self = this;
      //初始化数据
      let option = {
        title: {
          text: "各癌种筛查完成情况",
          left: 220,
          top: 18,
          textStyle: {
            color: "#fff",
            fontSize: 14,
            fontWeight: 800
          }
        },

        color: ["rgba(245, 166, 35, 1)", "rgba(19, 173, 255, 1)"],
        tooltip: {
          show: true,
          trigger: "item",
          formatter: function(params) {
            console.log(params)
            let obj = "";
            obj +=
              "筛查完成率<br>" +
              "肺癌：" +
              params.value[0] +
              "%<br>" +
              "乳腺癌：" +
              params.value[1] +
              "%<br>" +
              "结直肠癌：" +
              params.value[2] +
              "%<br>" +
              "肝癌：" +
              params.value[3] +
              "%<br>" +
              "胃癌：" +
              params.value[4] +
              "%<br>" +
              "食管癌：" +
              params.value[5] +
              "%";
            return obj
          }
        },
        legend: {
          show: false
        },
        grid: {
          top: 100
        },
        radar: {
          center: ["48%", "55%"],
          radius: "50%",
          startAngle: -60,
          splitNumber: 4,
          shape: "肺癌",
          name: {
            textStyle: {
              color: "#fff",
              fontSize: 14
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0,0,1,0,[
                  {
                    offset: 0,
                    color: "rgba(158, 50, 66, 0.8)"
                  },
                  {
                    offset: 1,
                    color: "rgba(63, 177, 186, 0.8)"
                  }
                ],
                false
              ),
              opacity: 0.1
            }
          },
          axisLabel: {
            show: false,
            fontSize: 18,
            color: "#fff",
            fontWeight: "normal"
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                [
                  {
                    offset: 0,
                    color: "rgba(158, 50, 66, 0.8)"
                  },
                  {
                    offset: 1,
                    color: "rgba(63, 177, 186, 0.8)"
                  }
                ],
                false
              ),
              opacity: 1
            }
          },
          splitLine: {
            lineStyle: {
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                [
                  {
                    offset: 0,
                    color: "rgba(158, 50, 66, 0.8)"
                  },
                  {
                    offset: 1,
                    color: "rgba(63, 177, 186, 0.8)"
                  }
                ],
                false
              ),
              opacity: 0.6
            }
          },
          indicator: self.dataList.indicator,
          triggerEvent:true
        },
        series: [
          {
            name: "筛查完成率",
            type: "radar",
            symbol: "circle",
            symbolSize: 1,
            itemStyle: {
              normal: {
                color: "rgba(19, 173, 255, 1)",
                borderColor: "rgba(19, 173, 255, 0.4)",
                borderWidth: 1
              }
            },
            areaStyle: {
              normal: {
                color: "rgba(19, 173, 255, 0.5)"
              }
            },
            lineStyle: {
              normal: {
                color: "rgba(19, 173, 255, 1)",
                width: 1,
                type: "solid"
              }
            },
            // data: self.dataList.series
            data: [{
              value:self.dataList.series[0],
                label:{
                  normal: {
                    show: true,
                    formatter:function(params) {
                        return `${params.value}%`;
                    },
                  }
                }
            }
            ]
          }
        ]
      };
      // 比率格式化
      //   option.tooltip.formatter = function(params) {
      //       console.log(params)
      //         // let arr = params[0].name+'<br>';
      //         params.filter(item => {
      //           arr += "<span style='display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;background:"+item.color+"'></span>"+item.seriesName + "：" + item.value * 100 + "%<br>";
      //         });
      //         return arr;
      //       };
      this.myChart.setOption(option);
      this.clickChart();
    },
    init() {
      const self = this;
      setTimeout(() => {
        window.onresize = function() {
          self.myChart = self.$echarts.init(self.$refs.myChart);
          self.myChart.resize();
        };
      }, 20);
    },
    // 下钻
     /**
       * 下钻：
         进入【项目进度】，指标=筛查完成率，维度一=癌种，维度二=null，筛选条件“癌种”选择首页上点击时展示的癌种
       */
        clickChart() {
            let myChart = this.$echarts.init(this.$refs["myChart"]);
            this.myChart = myChart;
            let that = this;
            this.myChart.off("click");
            this.myChart.on("click", function(params) {
              console.log(params)
              let _cancerTypeId = null;
              that.$axios_http({
                url:SERVER_NAME +"/statistical/queryDataCodeByValue",
                method: "post",
                data: {
                  name:params.name
                },
                vueObj: this
              }).then((res)=>{
                if(res.data.success){
                  _cancerTypeId = res.data.result;
                  that.$router.push({path:'/progress',query:{indexarr:2, wd1:15, cancerType: _cancerTypeId}})
                }
              })
            });
        },
  }
};
</script>
<style scoped>
.echarts {
  width: 604px;
  height: 278px;
}
</style>
