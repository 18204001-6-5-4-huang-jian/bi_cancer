export default {
    methods: {
        drawChinaMap() {
            let self = this
            //初始化数据
            let option = {
                title: {
                    show:false
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(data){
                        if( !isNaN(data.value) ){
                            return data.name+"："+data.value;
                        }
                    }
                },
                dataRange: {
                    show: true,
                    min: self.mapMinData,
                    max: self.mapMaxData,
                    right: '10',
                    bottom: '40',
                    text: ['（筛查数）高', '（筛查数）低'],
                    // calculable: true,
                    showLabel: true,
                    type: 'continuous',
                    itemWidth: 12,
                    itemHeight: 80,
                    inRange: {
                        color: ['#FAF9F1','#50e3d6']
                    },
                    textStyle: {
                        color: '#fff'
                    },
                },
                toolbox: {
                    show: false,
                },
                roamController: {
                    show: true,
                    mapTypeControl: {
                        'china': true
                    }
                },
                series: {
                    name: '数量',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    itemStyle: {
                        normal: { 
                            label: { show: false },
                            areaColor:'#2c2c4c',        //地图本身的颜色
                            borderColor:'#a0a0b1',     //省份的边框颜色
                            borderWidth:1,                     //省份的边框宽度
                            opacity:0.8, 
                        },
                        emphasis: { 
                            label: { show: false },
                         },
                    },
                    data: self.mapDataNew.series
                }
            }
            this.myChart.setOption(option);
            this.clickChart();
        },
        init() {
            const self = this;
            setTimeout(() => {
                window.onresize = function () {
                    self.myChart = self.$echarts.init(self.$refs.myChart);
                    self.myChart.resize();
                }
            }, 20)
        },
        // 下钻
        /**
       * 下钻：
         进入【项目进度】，指标=筛查完成数，维度一=区域（省），维度二=null，筛选条件“区域”选择地图上点击的省份，“癌种”选择地图上点击时展示的癌种；
       */
        clickChart() {
            let myChart = this.$echarts.init(this.$refs["myChart"]);
            this.myChart = myChart;
            let that = this;
            this.myChart.off("click");
            this.myChart.on("click", function(params) {
                // console.log(params)
                if(params.data){
                    that.$router.push({
                        path:'/progress',
                        query:{
                           indexarr:2,wd1:2,areaType:16,areas:params.data.proviceId,cancerType:that.cancertypeId,years:that.years
                        }
                    })
                }
            });
        },
        
    }
}