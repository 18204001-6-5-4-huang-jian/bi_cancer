<!--
1、请求传参说明：
screenWhereVos（筛选对象）、 dimensionarr（维度）、 dataType（查询类型 1-数量 2-比率）、 indexarr（指标）、   	
type（查询类型 1-结果 2-维度 3-危险因素）、 baseType（基数类型 1-评估人群   2-筛查人群）

2、route.query 携带参数说明：
indexarr（指标）、wd1（维度一）、cancerType(癌种)、areas(省份)、areaType（大区类型）

3、生成图表，默认页隐藏，显示多个图表页
-->
<template>
    <div class="flexBox">
        <cancer-search>
          <el-menu
            :default-active="activeIndex"
            :default-openeds="defaultOpenIndex"
            class="el-menu-vertical"
            @open="handleOpen"
            @select='selectMeun'>
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">风险评估</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>癌症筛查</span>
              </template>
              <el-menu-item-group ref="cancerTypes">
                <el-menu-item index="2-1" name="肺癌">肺癌</el-menu-item>
                <el-menu-item index="2-2" name="乳腺癌">乳腺癌</el-menu-item>
                <el-menu-item index="2-3" name="结直肠癌">结直肠癌</el-menu-item>
                <el-menu-item index="2-4" name="肝癌">肝癌</el-menu-item>
                <el-menu-item index="2-5" name="胃癌">胃癌</el-menu-item>
                <el-menu-item index="2-6" name="食管癌">食管癌</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">随访</span>
            </el-menu-item>
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
                          <el-radio-group v-model="formData.indexarr" :disabled="searchItemDisadled">
                              <el-radio 
                              v-for="item in progressTargets" 
                              :label="item.id" 
                              :key="item.id"
                              :name="item.name"
                              ref="indexarr"
                              :disabled="item.disabled"
                              >{{item.name}}</el-radio>
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
                                    v-for="item in progressDimension" 
                                    :label="item.id"
                                    :key="item.id"
                                    :name="item.name"
                                    ref="wd1">{{item.name}}</el-radio>
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
                                  v-for="item in progressDimension" 
                                  :label="item.id"
                                  :key="item.id"
                                  :name="item.name"
                                  ref="wd2">{{item.name}}</el-radio>
                              </el-radio-group>
                              <i class="el-icon-error clean" v-if="formData.wd2 != null" @click="cleanWd2()"></i>
                            </el-form-item>
                            </div>
                          </div>
                        </el-row>
                      </div>
                  </div>
                  <div class="searchBox">
                    <el-button type="primary" @click="changeForm" :disabled="searchItemDisadled">生成图表</el-button>
                  </div>
              </el-form>
          <!-- 默认页 -->
          <div v-if="activeIndex=='1' && defalultCharts">
            <h2>概览</h2>
            <common-default 
            :indexarr="formData.indexarr"
            :activeIndex="activeIndex"
            :contentTitle1="'问卷'"
            :contentTitle2="'评估完成情况'"
            :topTitle1="'总参与评估人数'"
            :topTitle2="'评估任务完成率'"
            :type="2">
            </common-default>
          </div>
            <div v-if="defalultCharts">
            <h2 v-if="activeIndex!='1'">概览</h2>
            <common-default-one 
            :indexarr="formData.indexarr"
            :activeIndex="activeIndex"
            :contentTitle1="contentTitle1"
            :contentTitle2="'筛查完成情况'"
            :topTitle1="`${contentTitle1}筛查总例数`"
            :topTitle2="'筛查任务完成率'"
            :type="2">
            </common-default-one>
            </div>
          </cancer-widget>
          <!-- 查询结果页 -->
          <cancer-widget v-if="!defalultCharts" style="margin:0px;">
              <el-button type="primary" class="fr back-btn" v-if="searchItemDisadled" @click="back">返回</el-button>
              <el-tabs v-model="activeName" type="card" :before-leave="changeTabs" @tab-click="handleClick()">
                  <el-tab-pane label="堆叠柱状图" name="0" :disabled="searchItemDisadled">
                      <el-radio-group v-model="formData.dataType" class="tabCard" :disabled="searchItemDisadled" @change="changeForm">
                          <el-radio-button label="1">数量</el-radio-button>
                          <el-radio-button label="2" v-if="activeIndex!='1'">比率</el-radio-button>
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
                          <el-radio-button label="2" v-if="activeIndex!='1'">比率</el-radio-button>
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
                          <el-radio-button label="2" v-if="activeIndex!='1'">比率</el-radio-button>
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
                          <el-radio-button label="2" :disabled="formData.wd2!=null && formData.wd2!=''"  v-if="activeIndex!='1'">比率</el-radio-button>
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
                          <el-radio-button label="2"  v-if="activeIndex!='1'">比率</el-radio-button>
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
                          <el-radio-button label="2"  v-if="activeIndex!='1'">比率</el-radio-button>
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
                          <el-radio-button label="2"  v-if="activeIndex!='1'">比率</el-radio-button>
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
                          <el-radio-button label="2"  v-if="activeIndex!='1'">比率</el-radio-button>
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
import CommonDefault from "@/components/CommonDefault";
import CommonDefaultOne from "@/components/CommonDefault1";
import common from "@/mixins/common";
import mixin from "@/mixins/mixins";
export default {
  name: "progress-statistics",
  mixins: [common,mixin],
  data() {
    return {
      activeName: "0",
      progressTargets: DICTIONARY.progressTargetsFX, //指标
      progressDimension: DICTIONARY.progressDimension, //维度
      years: DICTIONARY.years, //年度
      areas: DICTIONARY.areas, //大区
      province: [], //省份
      cancerTypes: DICTIONARY.cancerTypes, //癌种
      // 搜索条件
      formData: {
        indexarr: 1,
        wd1: 1,
        wd2: null,
        years: [],
        areas: [],
        cancerTypes: [],
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
      // 20190617添加
      activeIndex: '1',  //左侧导航默认选中
      defaultOpenIndex:['2'],
      searchItemDisadled: false,
      searchShow: false,
      btnText:'展开筛选',
      isshowtext:false,
      checkAllYears:false,
      checkAllAreas:false,
      defalultCharts:true,   //默认展示页
      contentTitle1:'所有癌种',
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
    CommonDefault,
    CommonDefaultOne
  },
  created() {
    // 初始化默认值
    this.initData();
    this.queryAllDataCode();
    // 首页跳转进来加载多图，隐藏默认地图
    if(this.$route.query.indexarr) {
      this.changeForm()
    }
  },
  mounted() {
        this.$nextTick(()=>{
            this.getChartName()
        })
  },
  methods: {
    //返回
    back() {
      this.searchItemDisadled = false;
      this.changeSearchOption(false);
      this.getData(false);
    },
    changeTabs(activeName,oldActiveName){
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
    },
    // tab切换
    handleClick() {
      if((this.formData.wd1 == 1 || this.formData.wd2 == 1) && this.formData.years.length == 0){
            return false;
      } 
      if((this.formData.wd1 == 2 || this.formData.wd2 == 2) && this.formData.areas.length == 0){
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
      // 正负条形图
      if(this.formData.wd2 === 2 && this.formData.areas.length === 2){
        this.tabStatus.barDisabled = false;
      }else if(this.formData.wd2 === 1 && this.formData.years.length === 2){
        this.tabStatus.barDisabled = false;
      }else if(this.formData.wd2 === 15 && this.formData.cancerTypes.length === 2){
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
      if(this.formData.indexarr === 1 && (this.formData.wd1===15 || this.formData.wd2===15)){
        this.$message({
          message:'癌种没有评估完成率',
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
      // console.log($data)
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
    
    // 表单数据改变
    changeForm() {
      // 20190618新增begin:1、默认页隐藏，展示多图页面；2、若筛选条件没有值，则不能搜索
      // 年度
      if((this.formData.wd1 == 1 || this.formData.wd2 == 1) && this.formData.years.length==0){
          this.$message({
            message: "请至少选择一个年度筛选条件！",
            type: "warning"
          });
        return;
      }
      // 区域
      if((this.formData.wd1 == 2 || this.formData.wd2 == 2) && this.formData.areas.length==0){
          this.$message({
            message: "请至少选择一个区域筛选条件！",
            type: "warning"
          });
        return;
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

    // 查询条件组装 --不下钻情况下
    baseData() {
      let $formData = {
        type: 2, //查询类型 1-结果 2-进度 3-危险因素
        indexarr: this.formData.indexarr.toString(), //指标
        dimensionarr: null, //维度
        screenWhereVos: [], //筛选对象
        dataType: this.formData.dataType.toString() //查询类型 1-数量 2-比率
      };

      if(this.formData.wd1 == 2 && !this.formData.wd2){
        $formData.dimensionarr = this.formData.areaType.toString();
      } else if(this.formData.wd1 == 2 && this.formData.wd2){
        $formData.dimensionarr = this.formData.areaType + "," + this.formData.wd2;
      } else if(this.formData.wd1 !=2 && !this.formData.wd2){
        $formData.dimensionarr = this.formData.wd1.toString();
      } else if(this.formData.wd2 == 2){
        $formData.dimensionarr = this.formData.wd1 + "," + this.formData.areaType;
      } else{
        $formData.dimensionarr = this.formData.wd1 + "," + this.formData.wd2;
      }

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

      if(this.activeIndex.indexOf('-')>-1) {
        let activeIndexArr = this.activeIndex.split('-');
        $formData.screenWhereVos.push({
          name: '15',
          value: activeIndexArr[1]
        })
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
        type: 2, //查询类型 1-结果 2-进度 3-危险因素
        indexarr: this.formData.indexarr.toString(), //指标
        dimensionarr: null, //维度
        screenWhereVos: [], //筛选对象
        dataType: this.formData.dataType.toString() //查询类型 1-数量 2-比率
      };
      if (this.formData.wd2 === 2) {
        $formData.dimensionarr = "17," + this.formData.areaType;
      } else if(this.formData.wd2 && this.formData.wd2!==2){
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
        if (this.formData.areas.length > 0) {
          $formData.screenWhereVos.push({
            name: this.formData.areaType.toString(),
            value: this.formData.areas.join(",")
          });
        }
        if (this.formData.cancerTypes.length > 0) {
          $formData.screenWhereVos.push({
            name: '15',
            value: this.formData.cancerTypes.join(",")
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

    //查询条件赋值，方便封装方法调用 ----flag  是否下钻月份
    changeSearchOption(flag) {
      // 维度
      if (flag) {
        this.dimension1 = "MONTH";
      } else {
        if (this.formData.wd1 === 1) {
          this.dimension1 = "YEAR";
        } else if (this.formData.wd1 === 15) {
          this.dimension1 = "CANCERTYPE";
        } else if (this.formData.wd1 === 2 && this.formData.areaType == '2') {
          this.dimension1 = "AREA";
        } else if (this.formData.wd1 === 2 && this.formData.areaType == '16') {
          this.dimension1 = "ROVINCE";
        } else {
          this.dimension1 = null;
        }
      }

      if (this.formData.wd2 === 1) {
        this.dimension2 = "YEAR";
      } else if (this.formData.wd2 === 15) {
        this.dimension2 = "CANCERTYPE";
      } else if (this.formData.wd2 === 2 && this.formData.areaType == '2') {
        this.dimension2 = "AREA";
      } else if (this.formData.wd2 === 2 && this.formData.areaType == '16') {
        this.dimension2 = "ROVINCE";
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
      let _indexarr = null;
      this.searchItemDisadled=false;
      if(this.activeIndex == '1') {
        this.progressTargets = DICTIONARY.progressTargetsFX
        _indexarr = 1
      }else{
        this.progressTargets = DICTIONARY.progressTargetsSC
        _indexarr = 2
      }
       // 重置搜索框的值
      this.formData={
        wd1: 1,
        wd2: null,
        indexarr: _indexarr,
        years: [],
        areas: [],
        cancerTypes: [],
        areaType: "16", //查询区域 2-大区 16-省
        dataType: "1" //查询类型 1-数量 2-比率
      },
      this.checkAllYears = false
      this.checkAllAreas = false

      // 图表名称取值
      if(this.activeIndex.indexOf('-')>-1) {
        this.$refs.cancerTypes.$children.filter( item=> {
          if(item.active) {
              this.contentTitle1 = item.$attrs.name
            }
          })
      }else{
        this.contentTitle1='所有癌种'
      }
    },
    openSearch(){
      this.searchShow = !this.searchShow;
      if(this.searchShow) {
        this.btnText='收起筛选'
      }else{
        this.btnText='展开筛选'
      }
    },
    // 初始化数据
    initData() {
      //左侧选中
      if(this.$route.query.cancerType){
        this.activeIndex = `2-${this.$route.query.cancerType}`
      } else {
        this.activeIndex = '1'
      }
      
      //指标
      if(this.activeIndex == '1') {
        this.progressTargets = DICTIONARY.progressTargetsFX
        this.formData.indexarr = 1
      }else{
        this.progressTargets = DICTIONARY.progressTargetsSC
        this.formData.indexarr = 2
      }

      // 维度
       this.formData.wd1 = Number(this.$route.query.wd1) || 1;

      //地区
      let proviceArray = [];
      if(this.$route.query.areas) {
        proviceArray.push(this.$route.query.areas)
      }
      this.formData.areas = proviceArray;

      // 年度
      if(this.$route.query.years == '全部'){
         this.formData.years = ['2013','2014','2015','2016','2019'];
      }else{
         this.formData.years = this.$route.query.years.split(',');
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
  text-align:center;
}
.searchBox .el-button{
  border-radius:0;
}
.searchBox .el-icon-arrow-down,.searchBox .el-icon-arrow-up{
  float: right;
}
.province-container{
  width: 100%;
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
