
<template>
  <div>
    <div class="content">
      <p class="title">城癌早诊早治项目<span>2013-2019年</span>五年来（暂不含2017、2018年），全国的{{contentTitle1}}<span>{{contentTitle2}}</span>如下图所示：</p>
      <div class="con">
        <div ref="mapChart" class="map-chart"></div>
        <div class="details">
          <div class="top">
            <div>
              <p style="margin-top:15px;line-height:1;">{{topTitle1}}</p>
              <p style="margin:18px 0;height:52px;"><span>{{total | thousandfilter}}</span>人</p>
            </div>
            <p class="border"></p>
            <!-- <p class="border">{{topTitle2}}<i>&nbsp;</i>{{percent}}%</p> -->
          </div>
          <div class="bottom">
            <p>TOP 5排名</p>
            <ul class="lis">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
            <div ref="barChart" class="bar-chart fr"></div>
          </div>
        </div>
      </div>
      <div>
        <p
          class="see-table"
          :class="isActive ? 'is-avtive' :''"
          @mouseover="isActiveFun"
          @mouseout="clearActiveFun"
          @click="tableDialog=true">
          <i class="el-icon-document"></i>查看表格<i class="el-icon-arrow-right fr"></i>
        </p>
      </div>
      <!-- 表格 -->
      <pop-table 
      :tableData="tableData"
      :tableDialog="tableDialog"
      @closeDialog="closeDialog"
      :th1="'省份'"
      :th2="'评估完成数（人）'"
      ></pop-table>
    </div>
  </div>

</template>
<script>
import PopTable from "@/components/PopTable";
import URL from "@/plugin/serviceAPI.config.js";
export default {
  props: {
    activeIndex: {
      default: null,
      type: String
    },
    indexarr: {
      default: null,
      type: String
    },
    type: {
      default: null,
      type: String
    },
    contentTitle1: {
      default: null,
      type: String
    },
    contentTitle2: {
      default: null,
      type: String
    },
    topTitle1: {
      default: null,
      type: String
    },
    topTitle2: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      isActive: false,
      tableDialog: false,
      mapDataNew: null,
      mapData: null,
      mapMinData: null,
      mapMaxData: null,
      tableData:[],
      total: 0,
      percent:0,
      yAxisData: [],
      barSeriesData: [],
      mapChart: {},
      barChart: {}
    };
  },
  filters: {
    thousandfilter: function(value) {
      if (!value) return "";
      var intPart = Number(value).toFixed(0); // 获取整数部分
      var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
      return intPartFormat;
    }
  },
  watch: {
    activeIndex: function(val) {
      this.getMapData();
      this.init("mapChart");
    }
  },
  mounted() {
    let mapChart = this.$echarts.init(this.$refs["mapChart"]);
    this.mapChart = mapChart;
    this.getMapData();
    this.init("mapChart");
    let barChart = this.$echarts.init(this.$refs["barChart"]);
    this.barChart = barChart;
      if(this.activeIndex == 1){
          //获取风险评估的问卷调查完成情况右侧数据
              this.$axios_http({
                url:SERVER_NAME +"/statistical/queryAssessData",
                method: "post",
                data:{

                },
                vueObj: this
              }).then((res)=>{
                if(res.data.success){
                  this.total = res.data.result.dataList[0].assessNum;
                  this.percent = (res.data.result.dataList[0].assessRate*100).toFixed(2);
                  this.barSeriesData = (res.data.result.topList.barSeriesData).reverse();
                  this.yAxisData = (res.data.result.topList.yAxisData).reverse();
                  this.drawBar();
                  this.init("barChart");
                }
              })
      }
  },
  components: {
    PopTable
  },
  methods: {
    closeDialog(val) {
      this.tableDialog = val
    },
    // 加载地图数据
    async getMapData() {
      // map图例的最大值、最小值
      // let $screenWhereVos = [];
      // if(this.activeIndex.indexOf('-')>-1) {
      //   let activeIndexArr = this.activeIndex.split('-');
      //   $screenWhereVos.push({name: '15', value: activeIndexArr[1]})
      // }
      const { data: { success, result } } = await this.$axios_http({
          url:SERVER_NAME+'/statistical/data',
          method: "post",
          data: {
            dataType: "1",
            dimensionarr: "16",
            indexarr: "1",
            screenWhereVos: [],
            type: 2,
          },
          vueObj: this
      });
      if (success) {
        this.mapDataNew = result;
        result.rows.filter((item) => {
          item.name = item.ROVINCE;
          item.value = item.SUMDATA;
        })
        this.mapData=result.rows;
        this.tableData = result.rows;
        // map图例的最大值、最小值
        let arr = []
        result.rows.filter(item =>{
            arr.push(item.SUMDATA)
        })
        this.mapMinData = Math.min(...arr)
        this.mapMaxData = Math.max(...arr)
        this.drawChinaMap();             
      }
    },
    isActiveFun() {
      this.isActive = true;
    },
    clearActiveFun() {
      this.isActive = false;
    },
    // 绘制地图
    drawChinaMap() {
      let self = this;
      //初始化数据
      let option = {
        title: {
          show: false
        },
        tooltip: {
          trigger: "item",
          formatter: function(data) {
            if (!isNaN(data.value)) {
              return data.name + "：" + data.value;
            }
          }
        },
        dataRange: {
          show: false,
          min: self.mapMinData,
          max: self.mapMaxData,
          right: "10",
          bottom: "40",
          text: ["（筛查数）高", "（筛查数）低"],
          // calculable: true,
          showLabel: true,
          type: "continuous",
          itemWidth: 12,
          itemHeight: 80,
          inRange: {
            color: ["#e6ecf3", "#4f95ff"]
          },
          textStyle: {
            color: "#fff"
          }
        },
        toolbox: {
          show: false
        },
        roamController: {
          show: true,
          mapTypeControl: {
            china: true
          }
        },
        series: {
          name: "数量",
          type: "map",
          mapType: "china",
          roam: false,
          top: 20,
          right: 40,
          left: 25,
          bottom: 30,
          itemStyle: {
            normal: {
              label: { show: false },
              areaColor: "#f4f4f4", //地图本身的颜色
              borderColor: "#c7c7c9", //省份的边框颜色
              borderWidth: 1 //省份的边框宽度
            },
            emphasis: {
              label: { show: false }
            }
          },
          data: self.mapData
        }
      };
      this.mapChart.setOption(option);
    },
    init(name) {
      const self = this;
      setTimeout(() => {
        window.onresize = function() {
          self[name] = self.$echarts.init(self.$refs[name]);
          self[name].resize();
        };
      }, 20);
    },
    // 绘制柱状图
    drawBar() {
      let self = this;
      //初始化数据
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          }
        },
        grid: {
          left: "3%",
          right: 0,
          bottom: 0,
          top: 20,
          containLabel: true
        },
        xAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: self.yAxisData,
          splitLine: { show: false },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              fontSize: 16,
              color: "#282D32" //坐标值得具体的颜色
            }
          }
        },
        series: [
          {
            type: "bar",
            data: self.barSeriesData,
            barWidth: 26,
            barCategoryGap: "50%",
            smooth: true,
            cursor: "default",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 1, color: "#338BF7" },
                  { offset: 0, color: "#9CC6FB" }
                ])
              }
            }
          }
        ]
      };
      this.barChart.setOption(option);
    }
  }
};
</script>
<style scoped>
h2 {
  font-size: 16px;
  color: #333333;
  margin-bottom: 16px;
}
.content {
  border: 1px solid #ececec;
}
.title {
  text-align: center;
  font-size: 18px;
  margin-top: 22px;
  margin-bottom: 58px;
  line-height: 1;
}
.title span {
  font-weight: bold;
}
.see-table {
  text-align: center;
  font-size: 16px;
  color: #282d32;
  background: #f7fafc;
  border-top: 1px solid #ececec;
  height: 56px;
  line-height: 56px;
  cursor: pointer;
}
.el-icon-document {
  margin-right: 8px;
}
.el-icon-arrow-right {
  margin-right: 30px;
  line-height: 56px;
  font-size: 18px;
  font-weight: bold;
}
.see-table.is-avtive {
  color: #338bf7;
}
.con {
  display: flex;
  flex-direction: row;
}
.con .details {
  width: 318px;
}
.details .top {
  background: #f7fafc;
  border: 1px solid #338bf7;
  border-radius: 10px;
  width: 100%;
  height: 166px;
  font-size: 16px;
  color: #282d32;
  text-align: center;
}
.details .top span {
  font-size: 40px;
  color: #338bf7;
  font-weight: bold;
}
.details .top i {
  display: inline-block;
  width: 20px;
}
.details .top .border {
  height: 40px;
  border-top: 1px solid #338bf7;
  line-height: 40px;
}
.details .bottom {
  background: #f7fafc;
  border: 1px solid #338bf7;
  border-radius: 10px;
  width: 100%;
  height: 264px;
  margin-top: 26px;
  margin-bottom: 35px;
  position: relative;
}
.details .bottom .lis {
  width: 24px;
  position: absolute;
  left: 15px;
  padding-top: 27px;
}
.details .bottom .lis li {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #338bf7;
  line-height: 24px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  margin-bottom: 14px;
}
.details .bottom p {
  font-size: 16px;
  color: #338bf7;
  font-weight: bold;
  margin-left: 15px;
  margin-top: 20px;
}
.map-chart {
  width: 605px;
  height: 450px;
}
.bar-chart {
  width: 275px;
  height: 210px;
}
.table {
  margin: 0 auto;
  max-height: 500px;
  width: 474px;
  overflow-y: auto;
  position: relative;
}
table {
  border: 1px solid #ebeef5;
  border-collapse: collapse;
  width: 470px;
}
td {
  border: 1px solid #ebeef5;
  padding: 0 10px;
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  width: 235px;
  color: #282D32;
  text-align: center;
}
.fix-table {
  background: #338BF7;
  width: 470px;
  position: absolute;
  top: 0px;
  left: 0;
  box-shadow: 0 0px 2px #f0f0f0;
}
.fix-table td{
   color: #fff;
}
.table-wrap {
  position: relative;
  width: 98%;
  margin: 0 auto;
  max-height: 500px;
}
.fix-table-tr {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.fix-table-tr td {
  background: #fff;
}
</style>
