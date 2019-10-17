<template>
    <div class="container">
        <div class="top">
            <div class="right clearfix">
                <div class="top_">
                    <!-- <statistics-funnel :dataList="funnelDataNew" :cancertypeId="cancertypeId" :cancertype="cancertype"></statistics-funnel> -->
                    <div class="years">
                       <span class="left-arrow" @click="changeYears('left')"></span>
                      {{years}}<span v-if="years != '全部'">年</span>
                       <span class="right-arrow" @click="changeYears('right')"></span>
                    </div>
                    <div class="title">问卷调查人数合计</div>
                    <div class="second-title">
                        <span class="num">{{questionnaireNum | thousandfilter}}</span>
                        <span class="span">人</span>
                    </div>
                </div>
                <!-- <div class="bottom"> -->
                    <!-- <statistics-radar :dataList="radarDataNew" :cancertypeId="cancertypeId"></statistics-radar> -->
                <!-- </div> -->
                <div class="divs">
                   <div class="divs-item" :class="{'active':this.type == 'fa'}" @click="changeData('fa')">
                       <div class="title">肺癌筛查</div>
                       <div class="second-title">
                        <span class="num">{{lung | thousandfilter}}</span>
                        <span class="span">例</span>
                    </div>
                   </div>
                   <div class="divs-item" :class="{'active':this.type == 'rxa'}" @click="changeData('rxa')">
                       <div class="title">乳腺癌筛查</div>
                       <div class="second-title">
                        <span class="num">{{mammary | thousandfilter}}</span>
                        <span class="span">例</span>
                    </div>
                   </div>
                   <div class="divs-item" :class="{'active':this.type == 'ca'}" @click="changeData('ca')">
                       <div class="title">肠癌筛查</div>
                       <div class="second-title">
                        <span class="num">{{colorectal | thousandfilter}}</span>
                        <span class="span">例</span>
                    </div>
                   </div>
                   <div class="divs-item" :class="{'active':this.type == 'sxhda'}" @click="changeData('sxhda')">
                       <div class="title">上消化道癌筛查</div>
                       <div class="second-title">
                        <span class="num">{{gastric | thousandfilter}}</span>
                        <span class="span">例</span>
                    </div>
                   </div>
                   <div class="divs-item" :class="{'active':this.type == 'ga'}" @click="changeData('ga')">
                       <div class="title">肝癌筛查</div>
                       <div class="second-title">
                        <span class="num">{{liver | thousandfilter}}</span>
                        <span class="span">例</span>
                    </div>
                   </div>
                </div>
            </div>
                <div class="left clearfix">
                <p class="title font-20">{{cancertype}}</p>
                <div class="fl">
                    <ul>
                        <li class="clearfix">
                            <div class="fl ico">
                                <img :src="require('@/assets/img/ico1.png')" alt="" srcset="" width="25px">
                            </div>
                            <div class="fl">
                                <p class="tit">总参与人数（人）</p>
                                <p class="num">
                                    {{ animatedNumber1 | thousandfilter }}
                                </p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <div class="fl ico">
                                <img :src="require('@/assets/img/ico2.png')" alt="" srcset="" width="25px">
                            </div>
                            <div class="fl">
                                <p class="tit">覆盖省市（省）</p>
                                <p class="num">
                                    {{ animatedNumber2 | thousandfilter }}
                                </p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <div class="fl ico">
                                <img :src="require('@/assets/img/ico3.png')" alt="" srcset="" width="25px">
                            </div>
                            <div class="fl">
                                <p class="tit">涉及医院（家）</p>
                                <p class="num">
                                    {{ animatedNumber3 | thousandfilter }}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fl">
                    <div ref="myChart" class="echarts map-chart"></div>
                </div>
            </div> 
        </div>
        <div class="pictorial">
            <div class="pic-line">
                <img :src="require('@/assets/img/line.png')" alt="">
            </div>
            <div class="line-bottom"></div>
            <pictorial-bar-symbol :dataList="barDataNew" :cancertypeId="cancertypeId" :cancertype="cancertype" :years="years"></pictorial-bar-symbol>
        </div>
    </div>
</template>
<script>
import statisticsRadar from '@/components/Radar'
import statisticsFunnel from '@/components/Funnel'
import PictorialBarSymbol from '@/components/PictorialBarSymbol'
import 'echarts/map/js/china.js'
import mapSevice from '@/views/home/map-service'
import URL from "@/plugin/serviceAPI.config.js";
export default {
    name: 'progress-statistics',
    mixins: [ mapSevice ],
    data() {
        return {
            cancertype:'肺癌',
            cancertypeId:null,
            total:0,
            provice:0,
            hospital:0,
            tweenedNumber1: 0,
            tweenedNumber2: 0,
            tweenedNumber3: 0,
            timer:null,   //计时器
            mapData:{},
            barData:{},
            radarData:{},
            funnelData:{},
            mapDataNew:null,
            barDataNew:null,
            radarDataNew:null,
            funnelDataNew:null,
            mapMinData:null,   //地图最小值
            mapMaxData:null,  //地图最大值
            questionnaireNum:0,
            lung:0,
            mammary:0,
            colorectal:0,
            gastric:0,
            liver:0,
            type:'fa',
            years:'2019' //2013年、2014年、2015年、2016年、2019年、全部
        }
    },
    components: {
      statisticsRadar,
      statisticsFunnel,
      PictorialBarSymbol
    },
    created() {
        this.getData('map');
        this.getData('bar');
        // this.getData('funnel');
        // this.getData('radar');
         this.getData('cy');
    },
    mounted() {
        this.refreshChart();
        this.stop();
        let myChart = this.$echarts.init(this.$refs['myChart']);
        this.myChart = myChart;
        this.init();
    },
    computed: {
        animatedNumber1: function() {
            return this.tweenedNumber1.toFixed(0);
        },
        animatedNumber2: function() {
            return this.tweenedNumber2.toFixed(0);
        },
        animatedNumber3: function() {
            return this.tweenedNumber3.toFixed(0);
        }
    },
    watch: {
        total: function(newValue) {
            TweenLite.to(this.$data, 0.5, { tweenedNumber1: newValue });
        },
        provice: function(newValue) {
            TweenLite.to(this.$data, 0.5, { tweenedNumber2: newValue });
        },
        hospital: function(newValue) {
            TweenLite.to(this.$data, 0.5, { tweenedNumber3: newValue });
        },
        mapDataNew: function (val) {
            this.drawChinaMap();
        }
    },
    beforeDestroy() {
        clearInterval(this.timer)
        this.timer = null
    },
    filters:{
      thousandfilter:function(value){
          if (!value) return '';
            var intPart = Number(value).toFixed(0); // 获取整数部分
            var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
            return intPartFormat;
        }
    },
    methods: {
        refreshChart() {
            // let i=0;
            // this.timer=setInterval(() => {
            //     if(i<this.mapData.rows.length-1){
            //         i++;
            //     }else{
            //         i=0;
            //     }
            //     this.mapDataNew = this.mapData.rows[i]
            //     let arr = []
            //     this.mapDataNew.series.filter(item =>{
            //         arr.push(item.value)
            //     })
            //     this.mapMinData = Math.min(...arr)
            //     this.mapMaxData = Math.max(...arr)
            //     this.cancertype = this.mapData.rows[i].cancertype
            //     this.cancertypeId = this.mapData.rows[i].cancertypeId
            //     this.total = this.mapData.rows[i].total
            //     this.provice = this.mapData.rows[i].provice
            //     this.hospital = this.mapData.rows[i].hospital
            //     this.barDataNew = this.barData.rows[i]
            //     this.funnelDataNew = this.funnelData.rows[i]
            // }, 3000)
        },

        stop(){
            let self = this
            document.onkeydown=function(event){
              var e = event || window.event || arguments.callee.caller.arguments[0];
              if(e && e.keyCode==32){
                    clearInterval(self.timer)
                    self.timer = null
              }
              if(e && e.keyCode==13){
                  if(!self.timer){
                      self.refreshChart()
                  }
              }
             } 
        },
        // 获取首页数据接口
        async getData(type) {
            const { data: { success, result } } = await this.$axios_http({
                url:`${URL.queryHomeDataByType}?type=${type}`,
                method: "post",
                data: {},
                vueObj: this
            });
            if (success) {
                if(type === 'map'){
                    this.mapData = result;
                    this.mapDataNew=result.rows[0]
                    this.cancertype = result.rows[0].cancertype
                    this.cancertypeId = result.rows[0].cancertypeId
                    this.total = result.rows[0].total
                    this.provice = result.rows[0].provice
                    this.hospital = result.rows[0].hospital
                    // map图例的最大值、最小值
                    let arr = []
                    result.rows[0].series.filter(item =>{
                        arr.push(item.value)
                    })
                    this.mapMinData = Math.min(...arr)
                    this.mapMaxData = Math.max(...arr)
                    this.drawChinaMap();
                }else if(type === 'bar'){
                    this.barData = result;
                    this.barDataNew = result.rows[0]
                }else if(type === 'funnel'){
                    this.funnelData = result;
                    this.funnelDataNew = result.rows[0]
                }else if(type === 'radar'){
                    this.radarData = result;
                    this.radarDataNew = result.rows[0]
                }else if(type == 'cy'){
                    this.questionnaireNum = result.total;
                    this.lung = result.lung;
                    this.mammary = result.mammary;
                    this.colorectal = result.colorectal;
                    this.gastric = result.gastric;
                    this.liver = result.liver
                }               
            }
        },
        changeData(params){
            this.type = params;
            if(params == 'fa'){
                this.mapDataNew=this.mapData.rows[0]
                this.cancertype = this.mapData.rows[0].cancertype
                this.cancertypeId = this.mapData.rows[0].cancertypeId
                this.total = this.mapData.rows[0].total
                this.provice = this.mapData.rows[0].provice
                this.hospital = this.mapData.rows[0].hospital
                // map图例的最大值、最小值
                let arr = []
                this.mapData.rows[0].series.filter(item =>{
                    arr.push(item.value)
                })
                this.mapMinData = Math.min(...arr)
                this.mapMaxData = Math.max(...arr)
                this.drawChinaMap();
                this.barDataNew = this.barData.rows[0]
            }else if(params == 'rxa'){
                this.mapDataNew=this.mapData.rows[1]
                this.cancertype = this.mapData.rows[1].cancertype
                this.cancertypeId = this.mapData.rows[1].cancertypeId
                this.total = this.mapData.rows[1].total
                this.provice = this.mapData.rows[1].provice
                this.hospital = this.mapData.rows[1].hospital
                // map图例的最大值、最小值
                let arr = []
                this.mapData.rows[1].series.filter(item =>{
                    arr.push(item.value)
                })
                this.mapMinData = Math.min(...arr)
                this.mapMaxData = Math.max(...arr)
                this.drawChinaMap();
                this.barDataNew = this.barData.rows[1]
            }else if(params == 'ca'){
                this.mapDataNew=this.mapData.rows[2]
                this.cancertype = this.mapData.rows[2].cancertype
                this.cancertypeId = this.mapData.rows[2].cancertypeId
                this.total = this.mapData.rows[2].total
                this.provice = this.mapData.rows[2].provice
                this.hospital = this.mapData.rows[2].hospital
                // map图例的最大值、最小值
                let arr = []
                this.mapData.rows[2].series.filter(item =>{
                    arr.push(item.value)
                })
                this.mapMinData = Math.min(...arr)
                this.mapMaxData = Math.max(...arr)
                this.drawChinaMap();
                this.barDataNew = this.barData.rows[2]
            }else if(params == 'sxhda'){
                // 胃癌或者食管癌
                this.mapDataNew=this.mapData.rows[4]
                this.cancertype = this.mapData.rows[4].cancertype
                this.cancertypeId = this.mapData.rows[4].cancertypeId
                this.total = this.mapData.rows[4].total
                this.provice = this.mapData.rows[4].provice
                this.hospital = this.mapData.rows[4].hospital
                // map图例的最大值、最小值
                let arr = []
                this.mapData.rows[4].series.filter(item =>{
                    arr.push(item.value)
                })
                this.mapMinData = Math.min(...arr)
                this.mapMaxData = Math.max(...arr)
                this.drawChinaMap();
                this.barDataNew = this.barData.rows[4]
            }else if(params == 'ga'){
                this.mapDataNew=this.mapData.rows[3]
                this.cancertype = this.mapData.rows[3].cancertype
                this.cancertypeId = this.mapData.rows[3].cancertypeId
                this.total = this.mapData.rows[3].total
                this.provice = this.mapData.rows[3].provice
                this.hospital = this.mapData.rows[3].hospital
                // map图例的最大值、最小值
                let arr = []
                this.mapData.rows[3].series.filter(item =>{
                    arr.push(item.value)
                })
                this.mapMinData = Math.min(...arr)
                this.mapMaxData = Math.max(...arr)
                this.drawChinaMap();
                this.barDataNew = this.barData.rows[3]
            }
        },
        changeYears(params){
           if(this.years == '2013' && params == 'left'){
                this.years = '全部';
           }else if(this.years == '2013' && params == 'right'){
                this.years = '2014';
           }else if(this.years == '2014' && params == 'left'){
                this.years = '2013';
           }else if(this.years == '2014' && params == 'right'){
                this.years = '2015';
           }else if(this.years == '2015' && params == 'left'){
                this.years = '2014';
           }else if(this.years == '2015' && params == 'right'){
                this.years = '2016';
           }else if(this.years == '2016' && params == 'left'){
                this.years = '2015';
           }else if(this.years == '2016' && params == 'right'){
                this.years = '2019';
           }else if(this.years == '2019' && params == 'left'){
                this.years = '2016';
           }else if(this.years == '2019' && params == 'right'){
                this.years = '全部';
           }else if(this.years == '全部' && params == 'left'){
                this.years = '2019';
           }else if(this.years == '全部' && params == 'right'){
                this.years = '2013';
           }
        }
    },
}
</script>

<style scoped>
.container{
    width: 1771px;
    margin:0 auto;
    padding:90px 0 0;
}
.top{
    display: flex;
    flex-direction: row;
}
.left{
    width: 920px;
    height: 546px;
    margin-left:40px;
    background: url('../../assets/img/t.png') 0 0 no-repeat;
    background-size:900px 546px;
}
.title{
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: left;
    line-height: 14px;
    font-weight: bold;
    text-align: center
}
.font-20{
    font-family: MicrosoftYaHei-Bold;
    font-size: 22px;
    margin-top: 70px;
}
.map-chart{
    width: 500px;
    height: 460px;
    margin-top: -10px;
}
.left ul {
    width: 182px;
    height: 290px;
    margin-left: 108px;
    margin-top: 70px;
    display: flex;
    flex-direction: column;
}
.left ul li{
    width: 192px;
    height: 67px;
    margin:14px 0;
    padding:15px 0 15px 20px;
    box-sizing: border-box;
    color: #fff;
    background: url('../../assets/img/tips.png') 0 0 no-repeat;
}
.left li .tit{
    /* font-size: 14px; */
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: left;
    line-height: 1;
}
.left li .num{
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #FFE53D;
    letter-spacing: 0;
    text-align: left;
    line-height: 1;
    /* margin-top: 8px; */
    margin-top: 4px;
}
.ico{
    margin-right: 16px;
    width: 25px;
    height: 25px;
    margin-top: 6px;
}
.right{
    width: 850px;
    overflow: hidden;
    box-sizing: border-box;
}
.right .top_,.right .bottom{
    width: 824px;
    height: 278px;
}
.right .top_{
    overflow: hidden;
    background: url('../../assets/img/newbg.png') 0 0 no-repeat;
    background-size: 100% 100%;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
.right .top_ .title{
    display:block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-top: 35px;
    font-family: MicrosoftYaHei-Bold;
    font-size: 22px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
}
.right .top_ .second-title{
     width:100%;
     height: 30px;
     line-height: 30px;
     margin-top: 20px;
     text-align: center;
}
.right .top_ .second-title .num{
    height: 30px;
    line-height: 30px;
    margin-top: 30px;
    font-family: MicrosoftYaHei-Bold;
    font-size: 54px;
    color: #FFE53D;
    letter-spacing: 0;
    text-align: center;
}
.right .top_ .second-title .span{
    font-size: 21px;
    color: #FFFFFF;
}
.right .top_ .years{
    width: 220px;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    margin-top: 40px;
    background: url('../../assets/img/years-icon.png') 0 0 no-repeat;
    background-size: 100% 100%;
    text-align: center;
    font-family: MicrosoftYaHei-Bold;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
}
.right .top_ .years .left-arrow{
   display:block;
   width: 20px;
   height: 100%;
   background: transparent;
   float: left;
   cursor: pointer;
}
.right .top_ .years .right-arrow{
   display:block;
   width: 20px;
   height: 100%;
   background: transparent;
   float: right;
   cursor: pointer;
}
.right .bottom{
    background: url('../../assets/img/rb.png') 0 0 no-repeat;
    background-size: 100% 100%;
    margin-top: 9px;
    /* margin-left: 10px; */
}
.right .divs{
    margin-top: 60px;
    display: flex;
    justify-content:space-around;
    align-items: center;
}
.right .divs .divs-item{
    width: 180px;
    height: 150px;
    margin: 0 6px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    background: url('../../assets/img/small.png') 0 0 no-repeat;
    background-size: 100% 100%;
}
.right .divs .divs-item.active{
    width: 180px;
    height: 150px;
    margin: 0 6px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    background: url('../../assets/img/smallActive.png') 0 0 no-repeat;
    background-size: 100% 100%;
}
.right .divs .divs-item .title{
    margin-top:45px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 14px;
}
.right .divs .divs-item .second-title{
     width:100%;
     height: 30px;
     line-height: 30px;
     margin-top: 20px;
     text-align: center;
}
.right .divs .divs-item  .second-title .num{
    height: 30px;
    line-height: 30px;
    margin-top: 30px;
    font-family: MicrosoftYaHei-Bold;
    font-size: 24px;
    color: #FFE53D;
    letter-spacing: 0;
    text-align: center;
}
.right .divs .divs-item  .second-title .span{
    font-size: 14px;
    color: #FFFFFF;
}
.font-14{
    font-size: 14px;
    margin-top: 70px;
    text-align: center;
}
.pictorial{
    background: url('../../assets/img/b.png') 0 0 no-repeat;
    background-size:100% 100%; 
    position: relative;
    margin-top:20px;
}
.pic-line{
    position: absolute;
    left:65px;
    top: 108px;
}
.line-bottom{
    width: 1627px;
    height:1px;
    opacity: 0.2;
    background: #D8D8D8;
    position: absolute;
    bottom: 50px;
    left: 68px;
}
</style>