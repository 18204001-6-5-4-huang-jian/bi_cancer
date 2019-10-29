<template>
    <div>
      <div class="content">
           <p class="title">城癌早诊早治项目<span>2013-2019年</span>五年来（暂不含2017、2018年），{{title}}，<span>吸烟、饮酒、教育、BMI、家族史、运动</span>的情况如下图所示：</p>
           <div class="chart-container">
              <div class="chart-title">吸烟情况</div>
               <div ref="myChart1" id="myChart1"></div>
               <div>
                 <p
                class="see-table"
                :class="isActive1 ? 'is-avtive' :''"
                @mouseover="isActiveFun('isActive1')"
                @mouseout="clearActiveFun('isActive1')"
                @click="showtableDialog('isActive1')">
                <i class="el-icon-document"></i>查看表格<i class="el-icon-arrow-right fr"></i>
              </p>
               </div>
           </div>
            <div class="chart-container">
               <div class="chart-title">饮酒情况</div>
                <div ref="myChart2" id="myChart2"></div>
                 <div>
                 <p
                class="see-table"
                :class="isActive2 ? 'is-avtive' :''"
                @mouseover="isActiveFun('isActive2')"
                @mouseout="clearActiveFun('isActive2')"
                @click="showtableDialog('isActive2')">
                <i class="el-icon-document"></i>查看表格<i class="el-icon-arrow-right fr"></i>
              </p>
               </div>
           </div>
           <div class="chart-container">
              <div class="chart-title">教育情况</div>
                 <div ref="myChart3" id="myChart3"></div>
                  <div>
                 <p
                class="see-table"
                :class="isActive3 ? 'is-avtive' :''"
                @mouseover="isActiveFun('isActive3')"
                @mouseout="clearActiveFun('isActive3')"
                @click="showtableDialog('isActive3')">
                <i class="el-icon-document"></i>查看表格<i class="el-icon-arrow-right fr"></i>
              </p>
               </div>
           </div>
            <div class="chart-container">
               <div class="chart-title">BMI情况</div>
                 <div ref="myChart4" id="myChart4"></div>
                  <div>
                 <p
                class="see-table"
                :class="isActive4 ? 'is-avtive' :''"
                @mouseover="isActiveFun('isActive4')"
                @mouseout="clearActiveFun('isActive4')"
                @click="showtableDialog('isActive4')">
                <i class="el-icon-document"></i>查看表格<i class="el-icon-arrow-right fr"></i>
              </p>
               </div>
           </div>
           <div class="chart-container">
              <div class="chart-title">恶性肿瘤家族史</div>
                  <div ref="myChart5" id="myChart5"></div>
                   <div>
                 <p
                class="see-table"
                :class="isActive5 ? 'is-avtive' :''"
                @mouseover="isActiveFun('isActive5')"
                @mouseout="clearActiveFun('isActive5')"
                @click="showtableDialog('isActive5')">
                <i class="el-icon-document"></i>查看表格<i class="el-icon-arrow-right fr"></i>
              </p>
               </div>
           </div>
            <div class="chart-container">
               <div class="chart-title">经常参加体育锻炼</div>
                   <div ref="myChart6" id="myChart6"></div>
                    <div>
                 <p
                class="see-table"
                :class="isActive6 ? 'is-avtive' :''"
                @mouseover="isActiveFun('isActive6')"
                @mouseout="clearActiveFun('isActive6')"
                @click="showtableDialog('isActive6')">
                <i class="el-icon-document"></i>查看表格<i class="el-icon-arrow-right fr"></i>
              </p>
               </div>
           </div>
              <!-- 表格 -->
              <pop-table 
              :tableData="tableData"
              :tableDialog="tableDialog"
              :params="params"
              @closeDialog="closeDialog"
              :th1="''"
              :th2="th2"
              ></pop-table>
      </div>
    </div>
</template>
<script>
import PopTable from "@/components/PopTable";
export default {
    data(){
        return{
            isActive1:false,
            isActive2:false,
            isActive3:false,
            isActive4:false,
            isActive5:false,
            isActive6:false,
            chart1Data:[],
            chart2Data:[],
            chart3Data:[],
            chart4Data:[],
            chart5Data:[],
            chart6Data:[],
            tableData:[],
            tableData1:[],
            tableData2:[],
            tableData3:[],
            tableData4:[],
            tableData5:[],
            tableData6:[],
            tableDialog:false,
            params:'',
            th2:'',
            title:'参与评估人群中'
        }
    },
    props: {
      activeIndex: {
        default: null,
        type: String
      },
      indexarr: {
        default: null,
        type: String
      }
  },
  components: {
    PopTable
  },
  watch:{
    activeIndex:function(val){
        if(val == '1'){
          this.getData('0');
          this.title = '参与评估人群中'
        }else if(val == '2-1'){
         this.getData('1');
         this.title = '参与评估且做肺癌筛查的人群中'
        }else if(val == '2-2'){
         this.getData('2');
         this.title = '参与评估且做乳腺癌筛查的人群中'
        }else if(val == '2-3'){
          this.getData('3');
          this.title = '参与评估且做结直肠癌筛查的人群中'
        }else if(val == '2-4'){
          this.getData('4');
          this.title = '参与评估且做肝癌筛查的人群中'
        }else if(val == '2-5'){
          this.getData('5');
          this.title = '参与评估且做胃癌筛查的人群中'
        }else if(val == '2-6'){
         this.getData('6');
         this.title = '参与评估且做食管癌筛查的人群中'
        }
    }
  },
  mounted(){
       this.getData('0');
  },
  methods:{
    getData(params){
          this.$axios_http({
                url:SERVER_NAME + '/statistical/riskFactors',
                method: "post",
                data: {
                  cancerType:params,
                  dataType: "1",
                  dimensionarr: "8",
                  indexarr: "12",
                  screenWhereVos:[],
                  type:3
                },
                vueObj: this
            }).then((res) => {
                if(res.data.success){
                    for(let k=0;k<res.data.result.rows.length;k++){
                      res.data.result.rows[k].name = res.data.result.rows[k].SMOKINGSITUATION;
                      res.data.result.rows[k].value = res.data.result.rows[k].SUMDATA
                    }
                    this.chart1Data = res.data.result.rows;
                    this.tableData1 = res.data.result.rows;
                    this.initChart('myChart1',this.chart1Data)
                }
            })
            this.$axios_http({
                url:SERVER_NAME + '/statistical/riskFactors',
                method: "post",
                data: {
                  cancerType:params,
                  dataType: "1",
                  dimensionarr: "24",
                  indexarr: "12",
                  screenWhereVos:[],
                  type:3
                },
                vueObj: this
            }).then((res) => {
                if(res.data.success){
                    for(let k=0;k<res.data.result.rows.length;k++){
                      res.data.result.rows[k].name = res.data.result.rows[k].ALCOHOL;
                      res.data.result.rows[k].value = res.data.result.rows[k].SUMDATA
                    }
                    this.chart2Data = res.data.result.rows;
                    this.tableData2 = res.data.result.rows;
                    this.initChart('myChart2',this.chart2Data)
                }
            })
             this.$axios_http({
                url:SERVER_NAME + '/statistical/riskFactors',
                method: "post",
                data: {
                  cancerType:params,
                  dataType: "1",
                  dimensionarr: "6",
                  indexarr: "12",
                  screenWhereVos:[],
                  type:3
                },
                vueObj: this
            }).then((res) => {
                if(res.data.success){
                    for(let k=0;k<res.data.result.rows.length;k++){
                      res.data.result.rows[k].name = res.data.result.rows[k].EDUCATIONLEVEL;
                      res.data.result.rows[k].value = res.data.result.rows[k].SUMDATA
                    }
                    this.chart3Data = res.data.result.rows;
                    this.tableData3 = res.data.result.rows;
                    this.initChart('myChart3',this.chart3Data)
                }
            })
            this.$axios_http({
                url:SERVER_NAME + '/statistical/riskFactors',
                method: "post",
                data: {
                  cancerType:params,
                  dataType: "1",
                  dimensionarr: "25",
                  indexarr: "12",
                  screenWhereVos:[],
                  type:3
                },
                vueObj: this
            }).then((res) => {
                if(res.data.success){
                    for(let k=0;k<res.data.result.rows.length;k++){
                      res.data.result.rows[k].name = res.data.result.rows[k].BMI;
                      res.data.result.rows[k].value = res.data.result.rows[k].SUMDATA
                    }
                    this.chart4Data = res.data.result.rows;
                    this.tableData4 = res.data.result.rows;
                    this.initChart('myChart4',this.chart4Data)
                }
            })
             this.$axios_http({
                url:SERVER_NAME + '/statistical/riskFactors',
                method: "post",
                data: {
                  cancerType:params,
                  dataType: "1",
                  dimensionarr: "56",
                  indexarr: "12",
                  screenWhereVos:[],
                  type:3
                },
                vueObj: this
            }).then((res) => {
                if(res.data.success){
                    for(let k=0;k<res.data.result.rows.length;k++){
                      res.data.result.rows[k].name = res.data.result.rows[k].CANCERFAMILY;
                      res.data.result.rows[k].value = res.data.result.rows[k].SUMDATA
                    }
                    this.chart5Data = res.data.result.rows;
                    this.tableData5 = res.data.result.rows;
                    this.initChart('myChart5',this.chart5Data)
                }
            })
            this.$axios_http({
                url:SERVER_NAME + '/statistical/riskFactors',
                method: "post",
                data: {
                  cancerType:params,
                  dataType: "1",
                  dimensionarr: "12",
                  indexarr: "12",
                  screenWhereVos:[],
                  type:3
                },
                vueObj: this
            }).then((res) => {
                if(res.data.success){
                    for(let k=0;k<res.data.result.rows.length;k++){
                      res.data.result.rows[k].name = res.data.result.rows[k].MOTIONCONDITION;
                      res.data.result.rows[k].value = res.data.result.rows[k].SUMDATA
                    }
                    this.chart6Data = res.data.result.rows;
                    this.tableData6 = res.data.result.rows;
                    this.initChart('myChart6',this.chart6Data)
                }
            })
    },
    isActiveFun(params) {
      this[params] = true;
    },
    clearActiveFun(params) {
      this[params] = false;
    },
    closeDialog(val) {
      this.tableDialog = val
    },
    showtableDialog(params){
       this.tableDialog = true;
       if(params == 'isActive1'){
          this.tableData = this.tableData1;
          this.th2 = '吸烟情况';
       }else if(params == 'isActive2'){
         this.tableData = this.tableData2;
         this.th2 = '饮酒情况';
       }else if(params == 'isActive3'){
         this.tableData = this.tableData3;
         this.th2 = '教育情况';
       }else if(params == 'isActive4'){
         this.tableData = this.tableData4;
         this.th2 = 'BMI情况';
       }else if(params == 'isActive5'){
         this.tableData = this.tableData5;
         this.th2 = '恶性肿瘤家族史';
       }else if(params == 'isActive6'){
         this.tableData = this.tableData6;
         this.th2 = '经常参加体育锻炼';
       }
    },
    initChart(params,data){
        let self = this;
        let myChart = self.$echarts.init(document.getElementById(params));
        myChart.setOption({
            title: { 
              text: '' 
            },
            tooltip: {
               trigger: 'item',
              //  formatter: "{a} <br/>{b}：{c} ({d}%)"
              formatter: "{b}：{c} ({d}%)"
            },
            xAxis: {
                show:false,
            },
            yAxis: {
                show:false,
            },
            color:['#A887EB','#5AB1EF','#5E77FF'],
            series: [
              {
                name: '',
                type: 'pie',
                data:data
              }
            ]
        });
         setTimeout(() => {
          window.onresize = function() {
            myChart.resize();
          };
      }, 20);
     }
  }
}
</script>
<style scoped>
.content {
  border: 1px solid #ececec;
}
.title {
  text-align: center;
  font-size: 18px;
  margin-top: 22px;
  margin-bottom: 58px;
  line-height: 1.5;
  text-align: left;
  padding: 0 10px;
}
.title span {
  font-weight: bold;
}
.chart-container{
  width: 48%;
  height: 400px;
  float: left;
  /* border:1px solid red; */
  margin: 10px 1%;
}
#myChart1,#myChart2,#myChart3,#myChart4,#myChart5,#myChart6{
  width: 100%;
  height: 300px;
}
.chart-title{
  font-family: MicrosoftYaHei-Bold;
  font-size: 16px;
  color: #338BF7;
  font-weight:bold;
  letter-spacing: 0;
  text-align: center;
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
</style>

