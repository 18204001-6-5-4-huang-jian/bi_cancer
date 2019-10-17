
<template>
  <div>
    <div ref="myChart" class="echarts"></div>
  </div>
</template>
<script>
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
      years:{
        default: null,
        type: String
      }
    },
    data () {
      return {
        myChart: {},
      }
    },
    watch: {
      dataList: {
        handler: function () {
          this.drawPie()
        }
      }
    },
    mounted: function () {
      let that = this;
      let myChart = that.$echarts.init(this.$refs['myChart']);
      that.myChart = myChart;
    //   that.drawPie();
      that.init();
    },
    methods: {
      drawPie () {
        // let legend = []
        // this.pieDataList && this.pieDataList.map((item) => {
        //   legend.push(item.name)
        // })
        let self= this
        var category = [];
        var dottedBase = +new Date();
        var lineData = [];
        var barData = [];
        var left = '';
        if(self.cancertype == '肺癌'){
             left = '790px';
        }else if(self.cancertype == '乳腺癌'){
             left = '780px';
        }else if(self.cancertype == '结直肠癌'){
              left = '770px';
        }else if(self.cancertype == '上消化道癌'){
              left = '760px'
        }else if(self.cancertype == '肝癌'){
              left = '790px'
        }
        for (var i = 0; i < 20; i++) {
            var date = new Date(dottedBase += 3600 * 24 * 1000);
            category.push([
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
            ].join('-'));
            var b = Math.random() * 200;
            var d = Math.random() * 200;
            barData.push(b)
            lineData.push(d + b);
        }

        let option = {
             title: {
                text: `各区域${self.cancertype}筛查完成情况`,
                left:left,
                top: 32,
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 22,
                    fontWeight: 800
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: '{a0}: {c0}%'
            },
            legend: {
                show: false
            },
            grid: {
                top: 90,
                bottom:75
            },
            xAxis: {
                data: self.dataList.xAxis,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    margin: 2,
                    textStyle: {
                        fontSize: 14,
                        color: '#ffffff'
                    }
                }

            },
            yAxis: {
                show: false,
                splitLine: {show: false},
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                }
            },
            series: [ {
                name: '筛查完成情况',
                type: 'bar',
                barWidth: 16,
                itemStyle: {
                    normal: {
                        color: '#62ffd0'
                    }
                },
                data: self.dataList.barData,
                label: {
                    normal: {
                        position: 'right',
                        show: true,
                        formatter:'{c}%'
                    }                    
                },
                markLine : {
                 data:[
                        [
                            {
                                name:'100%',
                                coord:[0, 100]
                            },{
                                coord:self.dataList.coord
                            }
                        ]
                    ]
                }
            }, {
                name: 'line',
                type: 'bar',
                barGap: '-100%',
                barWidth: 16,
                itemStyle: {
                    normal: {
                        color: '#2e536c'
                    }
                },
                z: -12,
                data: self.dataList.lineData
            }, {
                name: 'dotted',
                type: 'pictorialBar',
                symbol: 'rect',
                itemStyle: {
                    normal: {
                        color: '#202552'
                    }
                },
                barWidth: 16,
                symbolRepeat: true,
                symbolSize: [18, 8],
                symbolMargin: 8,
                z: -10,
                data: self.dataList.lineData
            },{
                name: 'dotted',
                type: 'pictorialBar',
                symbol: 'rect',
                itemStyle: {
                    normal: {
                        color: '#202552'
                    }
                },
                barWidth: 16,
                symbolRepeat: true,
                symbolSize: [18, 8],
                symbolMargin: 8,
                z: 2,
                data: self.dataList.lineData
            }]
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
         进入【项目进度】，指标=筛查完成率，维度一=区域（省），维度二=null，筛选条件“区域”选择地图上点击的省份，“癌种”选择地图上点击时展示的癌种；
       */
        clickChart() {
            let myChart = this.$echarts.init(this.$refs["myChart"]);
            this.myChart = myChart;
            let that = this;
            this.myChart.off("click");
            this.myChart.on("click", function(params) {
                // console.log(params)
                that.queryDataCodeByValue(params.name).then((val) =>{
                    that.$router.push({path:'/progress',query:{
                    indexarr:2,
                    wd1:2,
                    areaType:16,
                    areas:val,
                    cancerType:that.cancertypeId,
                    years:that.years
                    }
                  })
                })
                
                
            });
        },
        // 获取省份id
        async queryDataCodeByValue(params) {
            const { data: { success, result } } = await this.$axios_http({
            url: SERVER_NAME + "/statistical/queryDataCodeByValue",
            method: "post",
            data: {
              name:params
            },
            vueObj: this
          });
          if (success) {
              return result
          }
        }
    }
  }
</script>
<style scoped>
  .echarts {
    width: 100%;
    height: 416px;
  }
</style>
