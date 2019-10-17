
<template>
  <div>
    <div ref="myChart" class="echarts"></div>
  </div>
</template>
<script>
  export default {
    props: ['dataList'],
    data () {
      return {
        myChart: {},
      }
    },
    watch: {
      dataList: {
        deep: true,
        handler: function () {
          this.drawBar()
        }
      }
    },
    mounted: function () {
      var that = this;
      var myChart = that.$echarts.init(this.$refs['myChart']);
      that.myChart = myChart;
      that.drawBar();
      that.init();
    },
    methods: {
      drawBar () {
        //初始化数据
        let option = {
          title : {
            text: '各筛查点各年度评估完成率'
          },
          legend: {
            data:['湖北省','北京市']
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
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            // formatter: "{a}: {c}%"
          },
          grid: {
            // left: '1%',
            // right: '3%',
            // top: '3%',
            bottom: '6%',
            // show:true,
            // containLabel: true
          },
          xAxis: {
            type: 'category',
            data : ['湖北省','北京市','山东省','天津市'],
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#eee']
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                  color: '#eee',//左边线的颜色
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
               textStyle: {
                   color: '#333',//坐标值得具体的颜色
               }
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {show: false},
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
              interval: 0,
              formatter: function(value) {
                if (value.length > 3) {
                  return value.substring(0, 3) + "...";
                } else {
                  return value;
                }
              }
            }
          },
          series: [
            {
              name: '2013',
              type: 'bar',
              stack: '年份',
              data: [2.0, 4.9, 7.0, 23.2],
              barWidth: 20,
              // barGap: 30,
              smooth: true,
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      {offset: 1, color: '#47ECE5'},
                      {offset: 0, color: '#13DDD4'}

                    ]
                  )
                }
              },
              emphasis:{
                color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                   [
                    {offset: 0, color: '#13DDD4'},
                    {offset: 1, color: '#47ECE5'}
                   ]
               )
              }
            },
            {
              name: '2014',
              type: 'bar',
              stack: '年份',
              data: [32.6, 20.0, 6.4, 3.3],
              barWidth: 20,
              // barGap: 30,
              smooth: true,
              itemStyle: {
                normal: {
                  // color: new this.$echarts.graphic.LinearGradient(
                  //   0, 0, 1, 0,
                  //   [
                  //     {offset: 1, color: '#47ECE5'},
                  //     {offset: 0, color: '#13DDD4'}

                  //   ]
                  // )
                }
              },
              emphasis:{
                color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                   [
                    {offset: 0, color: '#13DDD4'},
                    {offset: 1, color: '#47ECE5'}
                   ]
               )
              }
            },
            {
              name: '2015',
              type: 'bar',
              stack: '年份',
              data: [32.6, 20.0, 6.4, 3.3],
              barWidth: 20,
              // barGap: 30,
              smooth: true,
              itemStyle: {
                normal: {
                  // color: new this.$echarts.graphic.LinearGradient(
                  //   0, 0, 1, 0,
                  //   [
                  //     {offset: 1, color: '#47ECE5'},
                  //     {offset: 0, color: '#13DDD4'}

                  //   ]
                  // )
                }
              },
              emphasis:{
                color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                   [
                    {offset: 0, color: '#13DDD4'},
                    {offset: 1, color: '#47ECE5'}
                   ]
               )
              }
            },
            {
              name: '2016',
              type: 'bar',
              stack: '年份',
              data: [32.6, 20.0, 6.4, 3.3],
              barWidth: 20,
              // barGap: 30,
              smooth: true,
              itemStyle: {
                normal: {
                  // color: new this.$echarts.graphic.LinearGradient(
                  //   0, 0, 1, 0,
                  //   [
                  //     {offset: 1, color: '#47ECE5'},
                  //     {offset: 0, color: '#13DDD4'}

                  //   ]
                  // )
                }
              },
              emphasis:{
                color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                   [
                    {offset: 0, color: '#13DDD4'},
                    {offset: 1, color: '#47ECE5'}
                   ]
               )
              }
            }
          ]
        };
        this.myChart.setOption(option);
         this.myChart.on('click', function (params) {
            console.log(params);
        });
      },
      init(){
             const self = this;
             setTimeout(() => {
                window.onresize = function() {
                    self.myChart = self.$echarts.init(self.$refs.myChart);
                    self.myChart.resize();
                }
             },20)
           }
      }
  }
</script>
<style scoped>
  .echarts {
    background: #fff;
    width: 100%;
    height: 500px;
  }
</style>
