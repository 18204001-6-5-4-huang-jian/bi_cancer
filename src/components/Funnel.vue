<template>
  <div>
    <div ref="myChart" class="echarts"></div>
  </div>
</template>
<script>
import mixin from '@/mixins/mixins'
  export default {
    props: {
      dataList: {
        default: () => {},
        type: Object
      },
      cancertype: {
        default: null,
        type: String
      },
      cancertypeId: {
        default: null,
        type: String
      },
    },
    mixins: [ mixin ],
    data () {
      return {
        myChart: {},
        xAxisData:[],    //x轴数据
        legendData:[],   //图例数据
        seriesData:[],   //series数据  
      }
    },
    watch: {
      dataList: function(val) {
        this.drawBar()
      }
    },
    mounted: function () {
      var that = this;
      var myChart = that.$echarts.init(this.$refs['myChart']);
      that.myChart = myChart;
      // that.drawBar();
      that.init();
    },
    methods: {
      drawBar () {
        let self = this
        //初始化数据
        let option = {
            title: {
                text: `${self.cancertype}项目各流程转化情况`,
                x:'center',
                top: 38,
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 800
                }
            },
            tooltip: {
                trigger: 'item',
                // formatter: "{a} <br/>{b} : {c}%"
            },
            legend: {
                show: false,
            },
            toolbox: {
              show: true,
              right:20,
              feature: {
                dataView: { show: false, readOnly: false },
                magicType: { show: false, type: ["line", "bar"] },
                restore: { show: false },
                saveAsImage: { show: true }
              }
            },
            calculable: true,
            color: ['#29bced','#c8d808','#55e9a7','#51ace8', '#0465ed', '#2730d3'],
            series: [
                {
                    name:'项目流转情况',
                    type:'funnel',
                    left: '33%',
                    top: 100,
                    bottom: 45,
                    width: '32%',
                    // height: {totalHeight} - y - y2,
                    min: self.dataList.series[4].value,
                    max: self.dataList.series[0].value,
                    minSize: '0%',
                    maxSize: '100%',
                    // sort: 'descending',
                    label: {
                        normal: {
                            show: true,
                            color:'#fff',
                            formatter: '{b}: {c}'
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 10,
                            lineStyle: {
                                color: '#fff',
                                width: 1,
                                type: 'solid'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 0,
                        }
                    },
                    data: self.dataList.series
                }
            ]
        };
        this.myChart.setOption(option);
        this.clickChart();
      },
      init(){
             const self = this;
             setTimeout(() => {
                window.onresize = function() {
                    self.myChart = self.$echarts.init(self.$refs.myChart);
                    self.myChart.resize();
                }
             },20)
           },
      // 下钻
      /**
       * 下钻：
          层1：进入【项目进度】，指标=评估完成数，维度一=年度，维度二=null，筛选条件无；
          层2：进入【项目绩效】，癌种选择首页点击时展示的癌种，指标选择“高危数”，维度一=年度，维度二=null，筛选条件无；
          层3：进入【项目进度】，指标=筛查顺应数，维度一=癌种，维度二=null，筛选条件“癌种”选择首页点击时展示的癌种；
          层4：进入【项目绩效】，癌种选择首页点击时展示的癌种，指标选择“阳性1数”，维度一=年度，维度二=null，筛选条件“评估结果”选择高危；
          层5：固定值；
          层6：暂无；
       */
        clickChart() {
            let myChart = this.$echarts.init(this.$refs["myChart"]);
            this.myChart = myChart;
            let that = this;
            this.myChart.off("click");
            this.myChart.on("click", function(params) {
                console.log(params)
                // 判断不能写评估这些。需要跟后台确认
                if(params.name==='评估'){
                  that.$router.push({path:'/progress',query:{indexarr:1}})
                } else if(params.name==='高危') {
                  that.$router.push({path:'/result',query:{
                    cancerType:that.cancertypeId,
                    indexarr:`${that.cancertypeId}01`,
                    wd1:1}})
                } else if(params.name==='筛查') {
                  that.$router.push({path:'/progress',query:{indexarr:3,wd1:15,cancerType:that.cancertypeId}})
                } else if(params.name==='阳性') {
                  that.$router.push({path:'/result',query:{
                    cancerType:that.cancertypeId,
                    indexarr:`${that.cancertypeId}03`,
                    wd1:1}})
                }
                
            });
        },
      }
  }
</script>
<style scoped>
  .echarts {
    width: 604px;
    height: 278px;
  }
</style>
