<!--
1、请求传参说明：
screenWhereVos（筛选对象）、 dimensionarr（维度）、 dataType（查询类型 1-数量 2-比率）、 indexarr（指标）、   	
type（查询类型 1-结果 2-维度 3-危险因素）、 baseType（基数类型 1-评估人群   2-筛查人群）

2、route.query 携带参数说明：
indexarr（指标）、wd1（维度一）、cancerType(癌种)、areas(省份)、areaType（大区类型）
-->
<template>
    <div class="flexBox">
      <cancer-search>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical"
            @open="handleOpen"
            @select='selectMeun'>
            <el-menu-item-group ref="cancerTypes">
              <el-menu-item index="2-1" name="肺癌">肺癌</el-menu-item>
              <el-menu-item index="2-2" name="乳腺癌">乳腺癌</el-menu-item>
              <el-menu-item index="2-3" name="结直肠癌">结直肠癌</el-menu-item>
              <el-menu-item index="2-4" name="肝癌">肝癌</el-menu-item>
              <el-menu-item index="2-5" name="胃癌">胃癌</el-menu-item>
              <el-menu-item index="2-6" name="食管癌">食管癌</el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </cancer-search>
        <div style="width:1010px">
          <!-- 搜索区 -->
          <cancer-widget style="margin:0px">
            <div class="searchBox" style="width:100%;text-align:left">
              <el-button type="primary" style="width:100%;text-align:left" plain @click="openSearch">{{btnText}}&nbsp;<i :class="searchShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i></el-button>
            </div>
            <br>
              <el-form ref="form" :model="formData" v-show="searchShow" class="searchForm" style="border:1px solid #cccccc;">
                <el-row>
                  <div class="zb">
                      <p class="title">指标</p>
                      <div class="list">
                          <el-radio-group v-model="formData.indexarr" :disabled="searchItemDisadled" @change='changeIndexArr(formData.indexarr)'>
                              <el-radio 
                              v-for="item in resultTargets" 
                              :label="item.id" 
                              :key="item.id"
                              :name="item.name"
                              ref="indexarr"
                              :disabled="item.disabled || (formData.wd1===5 && item.id===5) || (formData.evaluationResults && item.id===5) || (formData.wd2===5 && item.id===5)">
                              {{item.name}}</el-radio>
                          </el-radio-group>
                      </div>
                  </div>
                </el-row>
                  <div class="wb">
                      <p class="title">筛选条件</p>
                      <div class="list">
                        <el-row>
                          <div class="search-box">
                            <div class="search-label">年度：</div>
                            <div class="search-content">
                              <el-checkbox v-model="checkAllYears" :disabled="searchItemDisadled" @change="handleCheckAll(checkAllYears,years,'years')">全选</el-checkbox>
                              <el-form-item label="">
                                <el-checkbox-group v-model="formData.years" :disabled="searchItemDisadled" @change="handleCheckedChange(formData.years,years,'checkAllYears')">
                                    <el-checkbox
                                    v-for="item in years"
                                    :key="item.id"
                                    :label="item.name"
                                    :disabled="item.disabled">{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                              </el-form-item>
                            </div>
                          </div>
                        </el-row>
                        <el-row>
                          <div class="search-box">
                            <div class="search-label">区域：</div>
                            <div class="search-content">
                              <el-checkbox v-model="checkAllAreas" :disabled="searchItemDisadled" @change="handleCheckAll(checkAllAreas,province,'areas')">全选</el-checkbox>
                              <el-form-item label="">
                                <el-checkbox-group v-model="formData.areas" :disabled="searchItemDisadled" @change="handleCheckedChange(formData.areas,province,'checkAllAreas')">
                                    <el-checkbox
                                    v-for="item in province"
                                    :key="item.dataCode"
                                    :label="item.dataCode">{{item.param}}</el-checkbox>
                                </el-checkbox-group>
                              </el-form-item>
                            </div>
                          </div>
                        </el-row>
                        <el-row>
                          <div class="search-box">
                            <div class="search-label">年龄：</div>
                            <div class="search-content">
                              <el-checkbox v-model="checkAllAge" :disabled="searchItemDisadled" @change="handleCheckAll(checkAllAge,age,'age')">全选</el-checkbox>
                              <el-form-item label="">
                                <el-checkbox-group v-model="formData.age" :disabled="searchItemDisadled" @change="handleCheckedChange(formData.age,age,'checkAllAge')">
                                    <el-checkbox
                                    v-for="item in age"
                                    :key="item.dataCode"
                                    :label="item.dataCode">{{item.param}}</el-checkbox>
                                </el-checkbox-group>
                              </el-form-item>
                            </div>
                          </div>
                        </el-row>
                        <el-row>
                          <div class="search-box">
                            <div class="search-label">性别：</div>
                            <div class="search-content">
                              <el-checkbox v-model="checkAllSex" :disabled="searchItemDisadled" @change="handleCheckAllSecond(checkAllSex,sex,'sex')">全选</el-checkbox>
                              <el-form-item label="">
                                <el-checkbox-group v-model="formData.sex" :disabled="searchItemDisadled" @change="handleCheckedChange(formData.sex,sex,'checkAllSex')">
                                    <el-checkbox
                                      v-for="item in sex"
                                      :key="item.id"
                                      :label="item.id"
                                      >{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                              </el-form-item>
                            </div>
                          </div>
                        </el-row>
                          <el-row v-if="formData.indexarr!=101 && formData.indexarr!=201 && formData.indexarr!=301 && formData.indexarr!=401 && formData.indexarr!=501 && formData.indexarr!=601">
                            <div class="search-box">
                              <div class="search-label">评估结果：</div>
                              <div class="search-content">
                                <el-checkbox v-model="checkAllResults" :disabled="searchItemDisadled" @change="handleCheckAllSecond(checkAllResults,evaluationResults,'evaluationResults')">全选</el-checkbox>
                                <el-form-item label="">
                                  <el-checkbox-group v-model="formData.evaluationResults" :disabled="searchItemDisadled" @change="handleCheckedChange(formData.evaluationResults,evaluationResults,'checkAllResults')">
                                      <el-checkbox
                                      v-for="item in evaluationResults"
                                      :key="item.id"
                                      :label="item.id">{{item.name}}</el-checkbox>
                                  </el-checkbox-group>
                                </el-form-item>
                              </div>
                            </div>
                          </el-row>
                      </div>
                  </div>
                    <div class="wb">
                      <p class="title">展示方式</p>
                      <div class="list">
                        <el-row>
                          <div class="search-box">
                            <div class="search-label"><p class="subTitle">1</p></div>
                            <div class="search-content">
                              <el-form-item label="">
                                <el-radio-group v-model="formData.wd1" :disabled="searchItemDisadled" @change="changeWd">
                                    <el-radio
                                    v-for="item in resultDimension" 
                                    :label="item.id"
                                    :key="item.id"
                                    :name="item.name"
                                    ref="wd1"
                                    :disabled="item.disabled || ((formData.indexarr===101 || formData.indexarr===201 || formData.indexarr===301 || formData.indexarr===401 || formData.indexarr===501 || formData.indexarr===601) && item.id===5)">
                                    {{item.name}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            </div>
                          </div>
                        </el-row>
                        <el-row>
                          <div class="search-box">
                            <div class="search-label"><p class="subTitle">2</p></div>
                            <div class="search-content">
                              <el-form-item label="">
                                <el-radio-group v-model="formData.wd2" :disabled="searchItemDisadled" @change="changeWd">
                                    <el-radio
                                    v-for="item in resultDimension" 
                                    :label="item.id"
                                    :key="item.id"
                                    :name="item.name"
                                    ref="wd2"
                                    :disabled="item.disabled || ((formData.indexarr===101 || formData.indexarr===201 || formData.indexarr===301 || formData.indexarr===401 || formData.indexarr===501 || formData.indexarr===601) && item.id===5)">
                                    {{item.name}}</el-radio>
                                </el-radio-group>
                                 <i class="el-icon-error clean" v-if="formData.wd2 != null" @click="cleanWd2()"></i>
                            </el-form-item>
                            </div>
                          </div>
                        </el-row>
                        <!-- <p class="subTitle">一</p>
                          <el-form-item label="">
                              <el-select v-model="formData.wd1" placeholder="请选择" :disabled="searchItemDisadled" @change="changeWd">
                                  <el-option
                                  v-for="item in resultDimension" 
                                  :label="item.name"
                                  :value="item.id"
                                  :key="item.id"
                                  ref="wd1"
                                  :disabled="item.disabled || ((formData.indexarr===101 || formData.indexarr===201 || formData.indexarr===301 || formData.indexarr===401 || formData.indexarr===501 || formData.indexarr===601) && item.id===5)">
                                  </el-option>
                              </el-select>
                          </el-form-item> -->

                          <!-- <p class="subTitle">二</p>
                          <el-form-item label="">
                              <el-select v-model="formData.wd2" clearable placeholder="请选择" :disabled="searchItemDisadled" @change="changeWd">
                                  <el-option
                                  v-for="item in resultDimension" 
                                  :label="item.name"
                                  :value="item.id"
                                  :key="item.id"
                                  ref="wd2"
                                  :disabled="item.disabled || ((formData.indexarr===101 || formData.indexarr===201 || formData.indexarr===301 || formData.indexarr===401 || formData.indexarr===501 || formData.indexarr===601) && item.id===5)">
                                  </el-option>
                              </el-select>
                          </el-form-item> -->
                      </div>
                  </div>
                  <div class="searchBox">
                    <el-button type="primary" @click="changeForm" :disabled="searchItemDisadled">生成图表</el-button>
                  </div>
              </el-form>
          <!-- 默认页 -->
            <div v-for="(item,index) in resultTargets" :key="index" v-if="defalultCharts">
              <h2 v-if="index==0">概览</h2>
              <common-default-result 
              :indexarr="formData.indexarr"
              :activeIndex="activeIndex"
              :contentTitle1="''"
              :contentTitle2="`${item.cancerType}${item.name}情况`"
              :topTitle1="`${item.cancerType}${item.name}总人数`"
              :topTitle2="`${item.cancerType}${item.name}率`"
              :type="2"
              :rightData="rightDataArray[index]"
              :mapChartData="mapDataArray[index]">
              </common-default-result>
            </div>
             </cancer-widget>
          <!-- 查询结果页 -->
          <cancer-widget v-if="!defalultCharts" style="margin:0px;">
            <el-button type="primary" class="fr back-btn" v-if="searchItemDisadled" @click="back">返回</el-button>
              <el-tabs v-model="activeName" type="card" :before-leave="changeTabs" @tab-click="handleClick">
                  <el-tab-pane label="堆叠柱状图" name="0" :disabled="searchItemDisadled">
                      <el-radio-group v-model="formData.dataType" class="tabCard" :disabled="searchItemDisadled" @change="changeForm">
                          <el-radio-button label="1">数量</el-radio-button>
                          <el-radio-button label="2">比率</el-radio-button>
                      </el-radio-group>
                      <statistics-stack-bar 
                      :dataList="dataList" 
                      :barTitle="barTitle" 
                      :indexarr='indexarr'
                      :dataType="formData.dataType"
                      :searchItemDisadled='searchItemDisadled'
                      :dimension1="dimension1"
                      :dimension2="dimension2"
                      :areas="formData.areas"
                      :years="formData.years"
                      @selectedBar="selectedBar">
                      </statistics-stack-bar> 
                  </el-tab-pane>
                  <el-tab-pane label="平铺柱状图" name="1" :disabled="searchItemDisadled">
                      <el-radio-group v-model="formData.dataType" class="tabCard" :disabled="searchItemDisadled" @change="changeForm">
                          <el-radio-button label="1">数量</el-radio-button>
                          <el-radio-button label="2">比率</el-radio-button>
                      </el-radio-group> 
                      <statistics-bar 
                      :dataList="dataList" 
                      :barTitle="barTitle" 
                      :indexarr='indexarr'
                      :dataType="formData.dataType"
                      :searchItemDisadled='searchItemDisadled'
                      :dimension1="dimension1"
                      :dimension2="dimension2"
                      :areas="formData.areas"
                      :years="formData.years"
                      @selectedBar="selectedBar">
                      </statistics-bar> 
                  </el-tab-pane>
                  <el-tab-pane label="象形柱图" name="4" :disabled="searchItemDisadled || tabStatus.pictorialDisabled">
                      <el-radio-group v-model="formData.dataType" class="tabCard" @change="changeForm">
                          <el-radio-button label="1">数量</el-radio-button>
                          <el-radio-button label="2">比率</el-radio-button>
                      </el-radio-group>
                      <pictorial-bar 
                      :dataList="dataList" 
                      :barTitle="barTitle" 
                      :indexarr='indexarr'
                      :dataType="formData.dataType"
                      :dimension1="dimension1"
                      :dimension2="dimension2">
                      </pictorial-bar>
                  </el-tab-pane>
                  <el-tab-pane label="饼图" name="3" :disabled="searchItemDisadled">
                      <el-radio-group v-model="formData.dataType" class="tabCard" @change="changeForm">
                          <el-radio-button label="1">数量</el-radio-button>
                          <el-radio-button label="2" :disabled="formData.wd2!=null && formData.wd2!=''">比率</el-radio-button>
                      </el-radio-group>
                      <statistics-sunburst
                      :dataList="dataList" 
                      :barTitle="barTitle" 
                      :indexarr='indexarr'
                      :dataType="formData.dataType"
                      :dimension1="dimension1"
                      :dimension2="dimension2">
                      </statistics-sunburst> 
                  </el-tab-pane>
                  <el-tab-pane label="地图" name="5"  :disabled="tabStatus.mapDisabled || searchItemDisadled">
                      <el-radio-group v-model="formData.dataType" class="tabCard" @change="changeForm">
                          <el-radio-button label="1">数量</el-radio-button>
                          <el-radio-button label="2">比率</el-radio-button>
                      </el-radio-group>
                      <statistics-map
                      v-if="!tabStatus.mapDisabled"
                      :dataList="dataList" 
                      :barTitle="barTitle" 
                      :indexarr='indexarr'
                      :dataType="formData.dataType"
                      :dimension1="dimension1"
                      :dimension2="dimension2">
                      </statistics-map>
                  </el-tab-pane>
                  <el-tab-pane label="折线图" name="6" :disabled="searchItemDisadled">
                      <el-radio-group v-model="formData.dataType" class="tabCard" @change="changeForm">
                          <el-radio-button label="1">数量</el-radio-button>
                          <el-radio-button label="2">比率</el-radio-button>
                      </el-radio-group>
                      <statistics-line
                      :dataList="dataList" 
                      :barTitle="barTitle" 
                      :indexarr='indexarr'
                      :dataType="formData.dataType"
                      :dimension1="dimension1"
                      :dimension2="dimension2">
                      </statistics-line>
                  </el-tab-pane>
                  <el-tab-pane label="表格" name="7" :disabled="searchItemDisadled">
                      <el-radio-group v-model="formData.dataType" class="tabCard" @change="changeForm">
                          <el-radio-button label="1">数量</el-radio-button>
                          <el-radio-button label="2">比率</el-radio-button>
                      </el-radio-group>
                      <statistics-table
                      :dataList="dataList" 
                      :barTitle="barTitle" 
                      :indexarr='indexarr'
                      :dataType="formData.dataType"
                      :dimension1="dimension1"
                      :dimension2="dimension2">
                      </statistics-table>
                  </el-tab-pane>
                  <el-tab-pane label="正负条形图" name="2" :disabled="tabStatus.barDisabled || searchItemDisadled">
                      <el-radio-group v-model="formData.dataType" class="tabCard" :disabled="searchItemDisadled" @change="changeForm">
                          <el-radio-button label="1">数量</el-radio-button>
                          <el-radio-button label="2">比率</el-radio-button>
                      </el-radio-group>
                      <statistics-bar-minus
                      v-if="!tabStatus.barDisabled"
                      :dataList="dataList" 
                      :barTitle="barTitle" 
                      :indexarr='indexarr'
                      :dataType="formData.dataType"
                      :dimension1="dimension1"
                      :dimension2="dimension2">
                      </statistics-bar-minus>
                  </el-tab-pane>
              </el-tabs>
              <div v-if="formData.areaType=='2' && isshowtext" class="province-container">
                <p class="p">东北部：包括黑龙江，辽宁，内蒙通辽；</p>
                <p>东部：包括北京，河北，山东，江苏，浙江，广东；</p>
                <p class="p">中部：包括山西，河南，湖南，安徽；</p>
                <p>西部：包括内蒙呼和浩特，甘肃，重庆，新疆，广西，云南；</p>
              </div>
          </cancer-widget>
        </div>
    </div>
</template>

<script>
import URL from "@/plugin/serviceAPI.config.js";
import DICTIONARY from "@/utils/dictionary";
import StatisticsBar from "@/components/Bar";
import StatisticsStackBar from "@/components/Stackbar"
import StatisticsSunburst from "@/components/Sunburst";
import PictorialBar from "@/components/PictorialBar";
import StatisticsMap from "@/components/Map";
import StatisticsLine from "@/components/Line";
import StatisticsBarMinus from "@/components/BarMinus";
import StatisticsTable from "@/components/Table";
import CommonDefaultResult from "@/components/CommonDefaultResult";
import common from "@/mixins/common";
import mixin from "@/mixins/mixins";
export default {
  name: "result-statistics",
  mixins: [common,mixin],
  data() {
    return {
      activeName: "0",
      resultTargets: DICTIONARY.resultTargetsFei, //指标
      resultDimension: DICTIONARY.resultDimension, //维度
      years: DICTIONARY.years, //年度
      areas: DICTIONARY.areas, //大区
      province: [], //省份
      cancerTypes: DICTIONARY.cancerTypes, //癌种
      sex: DICTIONARY.sex, //性别
      evaluationResults: DICTIONARY.evaluationResults, //评估结果
      // 搜索条件
      formData: {
        indexarr: 101,
        wd1: 1,
        wd2: null,
        years: [],
        areas: [],
        age: [],
        sex: [],
        evaluationResults: [],
        cancerTypes: 1,
        areaType: "16", //查询区域 2-大区 16-省
        dataType: "1" //查询类型 1-数量 2-比率
      },
      barTitle: "",
      dimension1: null, //维度一
      dimension2: null, //维度二
      indexarr: null, //指标
      dataList: [],
      tabStatus: {
        pictorialDisabled: true,  //象形柱图
        pieDisabled: true,  //饼图
        barDisabled: true, //正负条形图
        mapDisabled: true //地图
      },
      isshowtext:false,
      // 20190618添加
      activeIndex: '2-1',  //左侧导航默认选中
      searchItemDisadled: false,
      searchShow: false,
      btnText:'展开筛选',
      isshowtext:false,
      checkAllYears:false,
      checkAllAreas:false,
      defalultCharts:true,   //默认展示页
      age:[],  //年龄数据字典
      checkAllAge:false,  
      checkAllSex:false,
      checkAllResults:false,  //评估结果全选
      rightDataArray:[],
      mapDataArray:[],
    };
  },
  components: {
    StatisticsBar,
    StatisticsStackBar,
    StatisticsSunburst,
    PictorialBar,
    StatisticsMap,
    StatisticsLine,
    StatisticsBarMinus,
    StatisticsTable,
    CommonDefaultResult
  },
  created() {
    this.queryAllDataCode();
  },
  mounted() {
     this.$nextTick(()=>{
         this.getChartName()
         let p1 = this.getChartData('101',0)
         let p2 = this.getChartData('103',1)
         let p3 = this.getChartData('104',2)
         let k1 = this.getMapData('101',0)
         let k2 = this.getMapData('103',1)
         let k3 = this.getMapData('104',2)
         let arr = [],arr1=[];
         Promise.all([p1,p2,p3]).then(res=>{
           res.map(item=>{
             arr.push(item.data.result)
           })
           this.rightDataArray = arr
         })
         Promise.all([k1,k2,k3]).then(res=>{
           res.map(item=>{
             arr1.push(item.data.result)
           })
           this.mapDataArray = arr1
         })
    })
  },
  computed:{
      
  },
  methods: {
   getChartData(params,index){
      return new Promise((resolve, reject)=>{
        this.$axios_http({
           url:SERVER_NAME +"/statistical/queryStatisticalResult",
           method: "post",
           data:{
             indexarr:params
           },
           vueObj:this
        }).then((res)=>{
          resolve(res)
        })
      })
             
    },
    getMapData(params,index){
      return new Promise((resolve, reject)=>{
        this.$axios_http({
           url:SERVER_NAME+'/statistical/data',
           method: "post",
           data:{
            dataType: "1",
            dimensionarr: "16",
            indexarr: params,
            screenWhereVos: [],
            type: 1
           },
           vueObj:this
        }).then((res)=>{
          resolve(res)
        })
      })
    },
    back() {
      this.searchItemDisadled = false;
      this.changeSearchOption(false);
      this.getData(false);
    },
    changeTabs(activeName,oldActiveName){
      //console.log(activeName,oldActiveName)
       if(this.formData.wd1 === this.formData.wd2){
        this.$message({
          message:'展示方式不能相同',
          type:'warning'
        })
        return false;
      }
       // 年度
      if((this.formData.wd1 == 1 || this.formData.wd2 == 1) && this.formData.years.length==0){
          this.$message({
            message: "请至少选择一个年度筛选条件！",
            type: "warning"
          });
        return false;
      }
      // 区域
      if((this.formData.wd1 == 2 || this.formData.wd2 == 2) && this.formData.areas.length==0){
          this.$message({
            message: "请至少选择一个区域筛选条件！",
            type: "warning"
          });
        return false;
      }
       // 年龄
       if((this.formData.wd1 == 3 || this.formData.wd2 == 3) && this.formData.age.length==0){
          this.$message({
            message: "请至少选择一个年龄筛选条件！",
            type: "warning"
          });
        return false;
      }
      // 性别
       if((this.formData.wd1 == 4 || this.formData.wd2 == 4) && this.formData.sex.length==0){
          this.$message({
            message: "请至少选择一个性别筛选条件！",
            type: "warning"
          });
        return false;
      }
      // 评估结果
       if((this.formData.wd1 == 5 || this.formData.wd2 == 5) && this.formData.evaluationResults.length==0){
          this.$message({
            message: "请至少选择一个评估结果筛选条件！",
            type: "warning"
          });
        return false;
      }
    },
    // tab切换
    handleClick() {
      if((this.formData.wd1 == 1 || this.formData.wd2 == 1) && this.formData.years.length == 0){
            return false;
      } 
      if((this.formData.wd1 == 2 || this.formData.wd2 == 2) && this.formData.areas.length == 0){
            return false;
      }
      if((this.formData.wd1 == 3 || this.formData.wd2 == 3) && this.formData.age.length == 0){
            return false;
      } 
      if((this.formData.wd1 == 4 || this.formData.wd2 == 4) && this.formData.sex.length == 0){
            return false;
      }
      if((this.formData.wd1 == 5 || this.formData.wd2 == 5) && this.formData.evaluationResults.length == 0){
            return false;
      } 
      if(this.formData.wd1 == this.formData.wd2){
            this.$message({
            message: "展示方式不能相同",
            type: "warning"
          });
          return;
      }else{
            this.formData.dataType = "1"; //恢复至数量
            this.changeSearchOption(false);
            this.getData(false);
            this.getChartName()
      }
    },
    // tab切换禁止点击
    tabDisabled() {
      // console.log(this.formData.wd2)
      // 正负条形图
      if(this.formData.wd2 === 2 && this.formData.areas.length === 2){
        this.tabStatus.barDisabled = false;
      }else if(this.formData.wd2 === 1 && this.formData.years.length === 2){
        this.tabStatus.barDisabled = false;
      }else if(this.formData.wd2 === 3 && this.formData.age.length === 2){
        this.tabStatus.barDisabled = false;
      }else if(this.formData.wd2 === 4 && (this.formData.sex.length === 2)){
        this.tabStatus.barDisabled = false;
      }else if(this.formData.wd2 === 5 && this.formData.evaluationResults.length === 2){
        this.tabStatus.barDisabled = false;
      }else{
        this.tabStatus.barDisabled = true;
      }

      // 地图
      if (
        this.formData.wd1 === 2 &&
        !this.formData.wd2
      ) {
        this.tabStatus.mapDisabled = false;
      } else {
        this.tabStatus.mapDisabled = true;
      }

      // 饼图
      if (!this.formData.wd2) {
        this.tabStatus.pieDisabled = false;
      } else {
        this.tabStatus.pieDisabled = true;
      }

       // 象形柱图
      if (this.formData.wd2===2 && this.formData.areaType==='16' && (this.formData.areas.length>5 || this.formData.wd2===2 && this.formData.areas.length===0)) {
        this.tabStatus.pictorialDisabled = true;
      } else {
        this.tabStatus.pictorialDisabled = false;
      }
    },

    //获取被点击柱子上的参数
    async selectedBar(params) {
      if(this.formData.wd1 === this.formData.wd2){
        this.$message({
          message:'展示方式不能相同',
          type:'warning'
        })
        return false;
      }
       // 年度
      if((this.formData.wd1 == 1 || this.formData.wd2 == 1) && this.formData.years.length==0){
          this.$message({
            message: "请至少选择一个年度筛选条件！",
            type: "warning"
          });
        return false;
      }
      // 区域
      if((this.formData.wd1 == 2 || this.formData.wd2 == 2) && this.formData.areas.length==0){
          this.$message({
            message: "请至少选择一个区域筛选条件！",
            type: "warning"
          });
        return false;
      }
       // 年龄
       if((this.formData.wd1 == 3 || this.formData.wd2 == 3) && this.formData.age.length==0){
          this.$message({
            message: "请至少选择一个年龄筛选条件！",
            type: "warning"
          });
        return false;
      }
      // 性别
       if((this.formData.wd1 == 4 || this.formData.wd2 == 4) && this.formData.sex.length==0){
          this.$message({
            message: "请至少选择一个性别筛选条件！",
            type: "warning"
          });
        return false;
      }
      // 评估结果
       if((this.formData.wd1 == 5 || this.formData.wd2 == 5) && this.formData.evaluationResults.length==0){
          this.$message({
            message: "请至少选择一个评估结果筛选条件！",
            type: "warning"
          });
        return false;
      }
      if (!this.searchItemDisadled) {
        if (this.dimension2) {
          const { data: { success, result } } = await this.$axios_http({
            url:
              SERVER_NAME +
              "/statistical/queryDataCodeByValue",
            method: "post",
            data: {
              name:params.seriesName
            },
            vueObj: this
          });
          if (success) {
            this.changeSearchOption(true);
            this.getData(true, params, result);
            this.searchItemDisadled = true;
          }
        } else {
          this.changeSearchOption(true);
          this.getData(true, params);
          this.searchItemDisadled = true;
        }
      }
    },

    //查询数据---flag:true-下钻   false--不下钻   ---params,下钻参数
    async getData(flag, params, $result) {
      if(!this.formData.indexarr){
        this.$message({
          message:'请选择查询指标',
          type:'warning'
        })
        return;
      }
      if((this.formData.indexarr==101 || this.formData.indexarr==201 || this.formData.indexarr==301 || this.formData.indexarr==401 || this.formData.indexarr==501 || this.formData.indexarr==601) && (this.formData.wd1 == 5 || this.formData.wd2 == 5)){
        this.$message({
          message:'指标为高危，维度不能为评估结果',
          type:'warning'
        })
        return;
      }
      let $data = null;
      if (flag) {
        $data = this.baseDataDown(params, $result);
      } else {
        $data = this.baseData();
      }
      const { data: { success, result } } = await this.$axios_http({
        url: URL.dataStatistic,
        method: "post",
        data: $data,
        vueObj: this
      });
      if (success) {
        this.dataList = result.rows;
      }
    },

    //维度
    changeWd(){
       this.tabDisabled();
       if(this.formData.wd1 === this.formData.wd2){
        this.$message({
          message:'展示方式不能相同',
          type:'warning'
        })
      }
       // 限制地图
       // 当且仅当“展示方式一”=“区域”，“展示方式二”为空时，地图可用。其余情况下，地图置灰；
      if(this.formData.wd1 == 2 && this.formData.wd2 == null){
         this.tabStatus.mapDisabled = false;
      }else{
         this.tabStatus.mapDisabled = true;
      }
    },

     // 切换区域
    changeFormType() {
      this.formData.areas=[]
    },

    // 切换指标
    changeIndexArr(val){
      if(val===101 || val===201 || val===301 || val===401 || val===501 || val===601){
        this.formData.evaluationResults = [];
      }
    },

    // 表单数据改变
    changeForm() {
       // 20190618新增begin:1、默认页隐藏，展示多图页面；2、若筛选条件没有值，则不能搜索
       // 年度
      if((this.formData.wd1 == 1 || this.formData.wd2 == 1) && this.formData.years.length==0){
          this.$message({
            message: "请至少选择一个年度筛选条件！",
            type: "warning"
          });
        return false;
      }
      // 区域
      if((this.formData.wd1 == 2 || this.formData.wd2 == 2) && this.formData.areas.length==0){
          this.$message({
            message: "请至少选择一个区域筛选条件！",
            type: "warning"
          });
        return false;
      }
      // 年龄
       if((this.formData.wd1 == 3 || this.formData.wd2 == 3) && this.formData.age.length==0){
          this.$message({
            message: "请至少选择一个年龄筛选条件！",
            type: "warning"
          });
        return false;
      }
      // 性别
       if((this.formData.wd1 == 4 || this.formData.wd2 == 4) && this.formData.sex.length==0){
          this.$message({
            message: "请至少选择一个性别筛选条件！",
            type: "warning"
          });
        return false;
      }
      // 评估结果
       if((this.formData.wd1 == 5 || this.formData.wd2 == 5) && this.formData.evaluationResults.length==0){
          this.$message({
            message: "请至少选择一个评估结果筛选条件！",
            type: "warning"
          });
        return false;
      }
      // this.defalultCharts = false;
      // this.searchShow = false;
      // this.btnText='展开筛选';
      // 20190618新增end
      this.tabDisabled();
      this.changeSearchOption(false);
      if(this.formData.wd1 === this.formData.wd2){
        this.$message({
          message:'展示方式不能相同',
          type:'warning'
        })
        return;
      }
      //饼图只能有一个维度
      if(this.activeName == "3"){
        if(this.formData.wd2 && this.formData.dataType === '2'){
          this.$message({
            message: "饼图比率只能有一个展示方式",
            type: "warning"
          });
          return;
        }else{
          this.getData(false);
        }
      }
      //象形柱图最多5个省
      if(this.activeName == "4"){
        if(this.formData.wd2===2 && this.formData.areaType==='16' && (this.formData.areas.length===0 || this.formData.areas.length>5)){
          this.$message({
            message: "象形柱图最多5个省",
            type: "warning"
          });
          return;
        }else{
          this.getData(false);
        }
      }
      // 两个展示方式不能相同
     if(this.formData.wd1 != this.formData.wd2){
       this.getData(false);
      }
      setTimeout(() =>{
        this.getChartName();
        if(this.formData.wd1 == 2 || this.formData.wd2 == 2){
            this.isshowtext = true;
         }else{
           this.isshowtext = false;
         }
        this.defalultCharts = false;
        this.searchShow = false;
        this.btnText='展开筛选';
      },0)
    },

    // 查询条件组装
    baseData() {
      if(!this.formData.indexarr){
        this.$message({
          message:'请选择查询指标',
          type:'warning'
        })
        return;
      }
      let $formData = {
        type: 1, //查询类型 1-结果 2-进度 3-危险因素
        indexarr: this.formData.indexarr.toString(), //指标
        dimensionarr: null, //维度
        screenWhereVos: [], //筛选对象
        dataType: this.formData.dataType.toString() //查询类型 1-数量 2-比率
      };

      if (!this.formData.wd2) {
        if (this.formData.wd1 == 2) {
          $formData.dimensionarr = this.formData.areaType.toString();
        } else if (this.formData.wd1 != 2) {
          $formData.dimensionarr = this.formData.wd1.toString();
        }
      } else {
        if (this.formData.wd2 == 2) {
          $formData.dimensionarr =
            this.formData.wd1 + "," + this.formData.areaType;
        } else if (this.formData.wd1 == 2) {
          $formData.dimensionarr =
            this.formData.areaType + "," + this.formData.wd2;
        } else {
          $formData.dimensionarr = this.formData.wd1 + "," + this.formData.wd2;
        }
      }

      $formData.screenWhereVos = []; //重置
      if (this.formData.years.length > 0) {
        $formData.screenWhereVos.push({
          name: "1",
          value: this.formData.years.join(",")
        });
      }
      if (this.formData.areas.length > 0) {
        $formData.screenWhereVos.push({
          name: this.formData.areaType.toString(),
          value: this.formData.areas.join(",")
        });
      }

      if (this.formData.sex.length > 0) {
        $formData.screenWhereVos.push({
          name: "4",
          value: this.formData.sex.join(",")
        });
      }


      if (this.formData.evaluationResults.length>0) {
        $formData.screenWhereVos.push({
          name: "5",
          value: this.formData.evaluationResults.join(",")
        });
      }

      if (this.formData.age.length>0) {
        $formData.screenWhereVos.push({
          name: "3",
          value: this.formData.age.join(",")
        });
      }
      return $formData;
    },

    /**
     * 下钻的情况，查询条件组装
     * @param array 对象数组
     * @param key 键值
     * @returns Array
     */
    baseDataDown(params, result) {
      let $formData = {
        type: 1, //查询类型 1-结果 2-进度 3-危险因素
        indexarr: this.formData.indexarr.toString(), //指标
        dimensionarr: null, //维度
        screenWhereVos: [], //筛选对象
        dataType: this.formData.dataType.toString() //查询类型 1-数量 2-比率
      };
      if (this.formData.wd2 == 2) {
        $formData.dimensionarr = "17," + this.formData.areaType;
      } else if (this.formData.wd2 && this.formData.wd2!==2){
        $formData.dimensionarr = "17," + this.formData.wd2.toString();
      } else {
        $formData.dimensionarr = "17";
      }

      $formData.screenWhereVos = [];
      if (this.formData.wd1 === 1) {
        $formData.screenWhereVos.push({
          name: "1",
          value: params.name
        });
        if(this.formData.areas.length > 0){
           $formData.screenWhereVos.push({
             name: this.formData.areaType.toString(),
             value: this.formData.areas.join(",")
           });
        }
        let value = '';
        if(this.activeIndex == '2-1'){
            value = '1'
        }else if(this.activeIndex == '2-2'){
            value = '2'
        }
        else if(this.activeIndex == '2-3'){
           value = '3'
        }
        else if(this.activeIndex == '2-4'){
           value = '4'
        }
        else if(this.activeIndex == '2-5'){
           value = '5'
        }
        else if(this.activeIndex == '2-6'){
           value = '6'
        }
        $formData.screenWhereVos.push({
          name: '15',
          value: value
        });
        if (this.formData.sex.length > 0) {
           $formData.screenWhereVos.push({
          name: "4",
          value: this.formData.sex.join(",")
          });
        }
        if (this.formData.evaluationResults.length > 0) {
         $formData.screenWhereVos.push({
          name: "5",
          value: this.formData.evaluationResults.toString()
        });
        }
        if (this.formData.age.length>0) {
          $formData.screenWhereVos.push({
            name: "3",
            value: this.formData.age.join(",")
          });
        }
      }
      if (this.formData.wd2) {
        if (this.formData.wd2 === 2) {
          $formData.screenWhereVos.push({
            name: this.formData.areaType.toString(),
            value: result
          });
        } else {
          $formData.screenWhereVos.push({
            name: this.formData.wd2.toString(),
            value: result
          });
        }
      }
      for(let k = 0;k<$formData.screenWhereVos.length;k++){
         if(!$formData.screenWhereVos[k].value){
           $formData.screenWhereVos.splice(k,1);
         }
       }
      return $formData;
    },

    //查询条件赋值，方便封装方法调用
    changeSearchOption(flag) {
      // 维度
      if (flag) {
        this.dimension1 = "MONTH";
      } else {
        if (this.formData.wd1 === 1) {
          this.dimension1 = "YEAR";
        } else if (this.formData.wd1 === 2 && this.formData.areaType == '2') {
          this.dimension1 = "AREA";
        } else if (this.formData.wd1 === 2 && this.formData.areaType == '16') {
          this.dimension1 = "ROVINCE";
        } else if (this.formData.wd1 === 3) {
          this.dimension1 = "AGE_GROUP";
        } else if (this.formData.wd1 === 4) {
          this.dimension1 = "SEX";
        } else if (this.formData.wd1 === 5) {
          this.dimension1 = "ASSESSRESULT";
        } else {
          this.dimension1 = null;
        }
      }

      if (this.formData.wd2 === 1) {
        this.dimension2 = "YEAR";
      } else if (this.formData.wd2 === 2 && this.formData.areaType == '2') {
        this.dimension2 = "AREA";
      } else if (this.formData.wd2 === 2 && this.formData.areaType == '16') {
        this.dimension2 = "ROVINCE";
      } else if (this.formData.wd2 === 3) {
        this.dimension2 = "AGE_GROUP";
      } else if (this.formData.wd2 === 4) {
        this.dimension2 = "SEX";
      } else if (this.formData.wd2 === 5) {
        this.dimension2 = "ASSESSRESULT";
      } else {
        this.dimension2 = null;
      }
      // 指标
      this.indexarr = "SUMDATA";
    },
    // 20190617新增
    // 左侧菜单
    selectMeun(index){
      this.searchShow = false;
      this.btnText='展开筛选'
      this.defalultCharts = true;
      this.activeIndex = index;
      this.searchItemDisadled=false;
      // 切换搜索区域指标
      let _indexarr = null;
      if(this.activeIndex == '2-1') {
        this.resultTargets = DICTIONARY.resultTargetsFei;
         let p1 = this.getChartData('101',0)
         let p2 = this.getChartData('103',1)
         let p3 = this.getChartData('104',2)
         let k1 = this.getMapData('101',0)
         let k2 = this.getMapData('103',1)
         let k3 = this.getMapData('104',2)
         let arr = [],arr1 = [];
         Promise.all([p1,p2,p3]).then(res=>{
           res.map(item=>{
             arr.push(item.data.result)
           })
           this.rightDataArray = arr
         })
         Promise.all([k1,k2,k3]).then(res=>{
           res.map(item=>{
             arr1.push(item.data.result)
           })
           this.mapDataArray = arr1
         })
        _indexarr = 101;
      } else if(this.activeIndex == '2-2'){
        this.resultTargets = DICTIONARY.resultTargetsBreast;        
        let p1 = this.getChartData('201',0)
        let p2 = this.getChartData('203',1)
        let p3 = this.getChartData('204',2)
        let k1 = this.getMapData('201',0)
        let k2 = this.getMapData('203',1)
        let k3 = this.getMapData('204',2)
        let arr = [],arr1 = [];
         Promise.all([p1,p2,p3]).then(res=>{
           res.map(item=>{
             arr.push(item.data.result)
           })
           this.rightDataArray = arr
         })
         Promise.all([k1,k2,k3]).then(res=>{
           res.map(item=>{
             arr1.push(item.data.result)
           })
           this.mapDataArray = arr1
         })
        _indexarr = 201;
      } else if(this.activeIndex == '2-4'){
        this.resultTargets = DICTIONARY.resultTargetsGan;
        let p1 = this.getChartData('401',0)
        let p2 = this.getChartData('403',1)
        let p3 = this.getChartData('404',2)
        let p4 = this.getChartData('405',3)
        let k1 = this.getMapData('401',0)
        let k2 = this.getMapData('403',1)
        let k3 = this.getMapData('404',2)
        let k4 = this.getMapData('405',3)
        let arr = [],arr1 = [];
         Promise.all([p1,p2,p3,p4]).then(res=>{
           res.map(item=>{
             arr.push(item.data.result)
           })
           this.rightDataArray = arr
         })
         Promise.all([k1,k2,k3,k4]).then(res=>{
           res.map(item=>{
             arr1.push(item.data.result)
           })
           this.mapDataArray = arr1
         })
        _indexarr = 401;
      } else if(this.activeIndex == '2-3'){
        this.resultTargets = DICTIONARY.resultTargetsChang;
        let p1 = this.getChartData('301',0)
        let p2 = this.getChartData('303',1)
        let p3 = this.getChartData('304',2)
        let k1 = this.getMapData('301',0)
        let k2 = this.getMapData('303',1)
        let k3 = this.getMapData('304',2)
        let arr = [],arr1 = [];
         Promise.all([p1,p2,p3]).then(res=>{
           res.map(item=>{
             arr.push(item.data.result)
           })
           this.rightDataArray = arr
         })
         Promise.all([k1,k2,k3]).then(res=>{
           res.map(item=>{
             arr1.push(item.data.result)
           })
           this.mapDataArray = arr1
         })
        _indexarr = 301;
      } else if(this.activeIndex == '2-5'){
        this.resultTargets = DICTIONARY.resultTargetsWei;
        let p1 = this.getChartData('501',0)
        let p2 = this.getChartData('503',1)
        let p3 = this.getChartData('504',2)
        let k1 = this.getMapData('501',0)
        let k2 = this.getMapData('503',1)
        let k3 = this.getMapData('504',2)
        let arr = [],arr1 = [];
         Promise.all([p1,p2,p3]).then(res=>{
           res.map(item=>{
             arr.push(item.data.result)
           })
           this.rightDataArray = arr
         })
         Promise.all([k1,k2,k3]).then(res=>{
           res.map(item=>{
             arr1.push(item.data.result)
           })
           this.mapDataArray = arr1
         })
        _indexarr = 501;
      } else if(this.activeIndex == '2-6'){
        this.resultTargets = DICTIONARY.resultTargetsSG;
        let p1 = this.getChartData('601',0)
        let p2 = this.getChartData('603',1)
        let p3 = this.getChartData('604',2)
        let k1 = this.getMapData('601',0)
        let k2 = this.getMapData('603',1)
        let k3 = this.getMapData('604',2)
        let arr = [],arr1 = [];
         Promise.all([p1,p2,p3]).then(res=>{
           res.map(item=>{
             arr.push(item.data.result)
           })
           this.rightDataArray = arr
         })
         Promise.all([k1,k2,k3]).then(res=>{
           res.map(item=>{
             arr1.push(item.data.result)
           })
           this.mapDataArray = arr1
         })
        _indexarr = 601;
      }
      // 重置搜索框的值
      this.formData={
        wd1: 1,
        wd2: null,
        indexarr: _indexarr,
        years: [],
        areas: [],
        age: [],
        sex: [],
        evaluationResults: [],
        areaType: "16", //查询区域 2-大区 16-省
        dataType: "1" //查询类型 1-数量 2-比率
      },
      this.checkAllYears = false
      this.checkAllAreas = false
      this.checkAllAge = false
      this.checkAllSex = false
      this.checkAllResults = false
    },
    openSearch(){
      this.searchShow = !this.searchShow;
      if(this.searchShow) {
        this.btnText='收起筛选'
      }else{
        this.btnText='展开筛选'
      }
    },
    cleanWd2(){
      this.formData.wd2 = null;
      this.tabDisabled();
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
.back-btn {
  position: relative;
  z-index: 2;
  border-radius: 0;
  padding: 8px 20px;
}
.searchBox{
  text-align: center;
}
.searchBox .el-button{
  border-radius:0;
}
.searchBox .el-icon-arrow-down,.searchBox .el-icon-arrow-up{
  float: right;
}
.province-container p{
  display: block;
  float: left;
  width: 50%;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.province-container .p{
  text-indent: 100px;
}
.el-icon-error.clean{
  cursor: pointer;
}
</style>