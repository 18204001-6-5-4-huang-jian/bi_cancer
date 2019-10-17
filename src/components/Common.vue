
<template>
  <div>
    <div class="content">
      <p class="title">城癌早诊早治项目<span>2013-2019年</span>六年来，{{title}}，<span>性别&年龄</span>的分布情况如下图所示：</p>
      <div class="con">
        <div ref="barChart" class="bar-chart"></div>
        <div class="details">
          <div class="top">
            <div>
              <p style="margin-top:15px;line-height:1;">总参与评估人数</p>
              <p style="margin:18px 0;height:52px;"><span>{{total | thousandfilter}}</span>人</p>
            </div>
             <!-- <p class="border">{{topTitle2}}<i>&nbsp;</i>{{percent}}</p> -->
             <p class="border"></p>
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
      :th1="''"
      :th2="'男'"
      :th21="'女'"
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
    topTitle2: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      isActive: false,
      tableDialog: false,
      tableData:[],
      total:0,
      percent: "",
      barChart: {},
      manArray:[],
      womanArray:[],
      title:'参与评估人群中'
    };
  },
  filters: {
    thousandfilter: function(value) {
      if (!value) return "";
      var intPart = Number(value).toFixed(0); // 获取整数部分
      var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
      return intPartFormat;
    }
  },
  watch: {
    activeIndex: function(val) {
      let value = '';
      let params = '';
      if(val == '1'){
         value = 0;
         params = '0'
         this.title = '参与评估人群中'
      }else if(val == '2-1'){
         value = 1;
         params = '1'
         this.title = '参与评估且做肺癌筛查的人群中'
      }else if(val == '2-2'){
         value = 2;
         params = '2'
         this.title = '参与评估且做乳腺癌筛查的人群中'
      }else if(val == '2-3'){
         value = 3;
         params = '3'
         this.title = '参与评估且做结直肠癌筛查的人群中'
      }else if(val == '2-4'){
         value = 4;
         params = '4'
         this.title = '参与评估且做肝癌筛查的人群中'
      }else if(val == '2-5'){
         value = 5;
         params = '5'
         this.title = '参与评估且做胃癌筛查的人群中'
      }else if(val == '2-6'){
         value = 6;
         params = '6'
         this.title = '参与评估且做食管癌筛查的人群中'
      }
      this.getData(value);
      if(this.barChart){
         this.barChart.dispose();
         this.manArray = [];
         this.womanArray = [];
      }
      let barChart = this.$echarts.init(this.$refs["barChart"]);
      this.barChart = barChart;
      this.getMapData(params);
      this.init("barChart");
    }
  },
  mounted() {
    let value = '';
    if(this.activeIndex == '1'){
        value = 0;
    }else if(this.activeIndex == '2-1'){
        value = 1;
    }else if(this.activeIndex == '2-2'){
        value = 2;
    }else if(this.activeIndex == '2-3'){
        value = 3;
    }else if(this.activeIndex == '2-4'){
        value = 4;
    }else if(this.activeIndex == '2-5'){
        value = 5;
    }else if(this.activeIndex == '2-6'){
        value = 6;
    }
    this.getData(value);
    let barChart = this.$echarts.init(this.$refs["barChart"]);
    this.barChart = barChart;
    this.getMapData('0');
    this.init("barChart");
    // console.log(this.$options.filters.thousandfilter)
  },
  components: {
    PopTable
  },
  methods: {
    getData(params){
       this.$axios_http({
          url:SERVER_NAME + '/statistical/queryRiskFactorsAssessData',
          method: "post",
          data: {
            cancerType:params
          },
          vueObj: this
      }).then((res) => {
          if(res.data.success){
               this.total = res.data.result.dataList[0].num;
          }
      })
    },
    closeDialog(val) {
      this.tableDialog = val
    },
    // 加载地图数据
    async getMapData(params) {
      const { data: { success, result } } = await this.$axios_http({
            url:SERVER_NAME + '/statistical/riskFactors',
            method: "post",
            data: {
              cancerType: params,
              dataType: "1",
              dimensionarr: "3,4",
              indexarr: "12",
              screenWhereVos:[
                {name: "4", value: "1,2"}
              ],
              type:3
            },
            vueObj: this
      })
      if(success){
        for(let i = 0 ;i<result.rows.length;i++){
           if(result.rows[i].SEX == '男'){
             this.manArray.push(result.rows[i].SUMDATA)
           }else if(result.rows[i].SEX == '女'){
             this.womanArray.push(-(result.rows[i].SUMDATA))
           }
        }
        result.rows[0].woman = result.rows[1].SUMDATA
        result.rows[2].woman = result.rows[3].SUMDATA
        result.rows[4].woman = result.rows[5].SUMDATA
        result.rows[6].woman = result.rows[7].SUMDATA
        result.rows[8].woman = result.rows[9].SUMDATA
        result.rows[10].woman = result.rows[11].SUMDATA
        result.rows[12].woman = result.rows[13].SUMDATA
        result.rows[14].woman = result.rows[15].SUMDATA
        let array = [];
        for(let k = 0;k <result.rows.length;k++){
           if(result.rows[k].SEX == '男'){
              result.rows[k].name = result.rows[k].AGE_GROUP;
              result.rows[k].value = result.rows[k].SUMDATA;
              array.push(result.rows[k])
           }
        }
        this.tableData = array;
        this.drawBar();
      }
    },
    isActiveFun() {
      this.isActive = true;
    },
    clearActiveFun() {
      this.isActive = false;
    },
    // 绘制地图
    drawBar() {
    //初始化数据
    let self = this;
    let option = {
    title:{
       text:'流行分布情况，不同性别，不同年龄',
       x:'center',
       y:'top',
       textStyle:{
         fontSize:16
       }
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        //formatter:''
        formatter:function(params, ticket, callback){
          let name = params[0].name;
          let manName = params[0].seriesName;
          let manValue = params[0].value;
          let womanName = params[1].seriesName;
          let womanValue = params[1].value;
          return name + '<br/>' + params[0].marker + manName + '：' + self.$options.filters.thousandfilter(manValue) + '<br/>' + params[1].marker + womanName + '：' + self.$options.filters.thousandfilter(Math.abs(womanValue));
        }
    },
    legend: {
        show:false,
    },
    color:['#2EC4C6','#5AB1EF'],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            axisLabel : { 
              formatter: function (value){
                if(value == 0){
                  return Math.abs(value)
                }else{
                  return self.$options.filters.thousandfilter(Math.abs(value))
                }
              }
            },
            type : 'value',
            // inverse: true,//反向坐标轴
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisTick : {
              show: false
            },
            data : ['40-44','45-49','50-54','55-59','60-64','64-69','70-74','其他年龄']
        }
    ],
    series : [
          {
                name:'男',
                type:'bar',
                stack: '总量',
                label: {
                    normal: {
                        // show: true,
                        show: false,
                        formatter:function(val){
                          return self.$options.filters.thousandfilter(val.value)
                        }
                    }
                },
                barWidth:30,
                data:self.manArray
            },
            {
                name:'女',
                type:'bar',
                stack: '总量',
                label: {
                    normal: {
                        // show: true,
                        show: false,
                        formatter:function(val){
                          return self.$options.filters.thousandfilter(Math.abs(val.value))
                        }
                    }
                },
                barWidth:30,
                data:self.womanArray
            }
        ]
      };
      this.barChart.setOption(option);
    },
    init(name) {
      const self = this;
      setTimeout(() => {
        window.onresize = function() {
          self[name] = self.$echarts.init(self.$refs[name]);
          self[name].resize();
        };
      }, 20);
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
.bar-chart {
  width: 605px;
  height: 450px;
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
.span1{
  color:red;
}
</style>
