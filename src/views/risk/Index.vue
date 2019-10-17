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
              <cancer-widget style="margin:0px;">
              <div class="searchBox" style="width:100%;text-align:left">
               <el-button type="primary" style="width:100%;text-align:left" plain @click="openSearch">{{btnText}}&nbsp;<i :class="searchShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i></el-button>
               </div>
              <br>
                <el-form ref="form" v-show="searchShow" :model="formData" class="searchForm" style="margin-top:60px;border:1px solid #cccccc;">
                <div class="zb">
                   <p class="title">指标：</p>
                    <div class="list">
                        <el-radio-group v-model="formData.zb" :disabled="searchItemDisadled">
                            <el-radio label="12">流行特征占比</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="wb">
                   <p class="title">筛选条件：</p>
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
                                <el-checkbox v-model="checkAllSexs" :disabled="searchItemDisadled" @change="handleCheckAllSecond(checkAllSexs,sex,'sex')">全选</el-checkbox>
                                 <el-form-item label="">
                                  <el-checkbox-group v-model="formData.sex" :disabled="searchItemDisadled" @change="handleCheckedChange(formData.sex,sex,'checkAllSexs')">
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
                          <el-row v-if="scdisabled">
                          <div class="search-box">
                            <div class="search-label">评估结果：</div>
                            <div class="search-content">
                               <el-checkbox v-model="checkAllEstimateResult" :disabled="searchItemDisadled" @change="handleCheckAllSecond(checkAllEstimateResult,evaluationResults,'evaluationResults')">全选</el-checkbox>
                                <el-form-item label="">
                                  <el-checkbox-group v-model="formData.evaluationResults" :disabled="searchItemDisadled" @change="handleCheckedChange(formData.evaluationResults,evaluationResults,'checkAllEstimateResult')">
                                    <el-checkbox
                                      v-for="item in evaluationResults"
                                      :key="item.id"
                                      :label="item.id"
                                      >{{item.name}}</el-checkbox>
                                  </el-checkbox-group>
                              </el-form-item>
                            </div>
                          </div>
                        </el-row>
                        <el-row v-if="scdisabled">
                           <div class="search-box">
                           <div class="search-label">筛查结果：</div>
                            <div class="search-content">
                                <el-checkbox v-model="checkAllCheckResult" :disabled="searchItemDisadled" @change="handleCheckAllSecond(checkAllCheckResult,scResult,'scResult')">全选</el-checkbox>
                                <el-form-item label="">
                                  <el-checkbox-group v-model="formData.scResult" :disabled="searchItemDisadled" @change="handleCheckedChange(formData.scResult,scResult,'checkAllCheckResult')">
                                    <el-checkbox
                                      v-for="item in scResult"
                                      :key="item.id"
                                      :label="item.id"
                                      >{{item.name}}</el-checkbox>
                                  </el-checkbox-group>
                              </el-form-item>
                            </div>
                           </div>
                        </el-row>
                      </div>
                </div>
                  <div class="wb">
                    <p class="title">
                      展示方式
                    </p>
                     <div class="list" v-for="(x,index) in formData.wd" :key="index">
                         <div class="search-box">
                            <div class="search-label">
                               <p class="subTitle">{{Number(index+1) | numChangeFilter}}
                                </p>
                            </div>
                            <div class="search-content">
                               <el-form-item label="">
                                 <el-select v-model="x.wd1" :clearable="index!=0" placeholder="请选择"  @change="changeWd" :disabled="searchItemDisadled">
                                    <el-option
                                    v-for="item in dimension" 
                                    :label="item.name"
                                    :value="item.id"
                                    :key="item.id"
                                    :ref="index==0?'wd1':''"
                                    :disabled="item.disabled || (item.id==5 && activeIndex == '1')">
                                    </el-option>
                                 </el-select>
                                <i class="el-icon-circle-plus" @click="add()" v-if="activeName=='5' && formData.wd.length<5" title="增加展示方式"></i>
                                <i class="el-icon-remove" @click="del(index)" v-if="index!=0 && index!=1" title="删除展示方式"></i>
                            </el-form-item>
                            </div>
                          </div>
                     </div>
                </div>
                       <div class="zb">
                            <p class="title">数据来源</p>
                            <div class="list">
                                <el-radio-group v-model="formData.dataResource" class="risk-group" :disabled="searchItemDisadled">
                                    <el-radio 
                                    v-for="item in dataResource" 
                                    :label="item.id" 
                                    :key="item.id"
                                    :disabled="item.disabled">{{item.name}}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                <div class="searchBox">
                  <el-button type="primary" :disabled="searchItemDisadled" @click="changeForm">生成图表</el-button>
                </div>
               </el-form>
               <!-- 默认页 -->
                 <div  v-if="defalultCharts">
                   <h2>概览</h2>
                  <common-default 
                  :activeIndex="activeIndex"
                  :contentTitle2="'性别&年龄'"
                  :topTitle2="'评估任务完成率'"
                  :type="2">
                  </common-default>
                  </div>
                 <div v-if="defalultCharts">
                 <common-bars
                  :activeIndex="activeIndex">
                 </common-bars>
                 </div>
               </cancer-widget>
              <!-- 查询结果页 -->
              <cancer-widget v-if="!defalultCharts" style="margin:0px;">
                <el-tabs v-model="activeName" type="card" :before-leave="changeTabs" @tab-click="handleClick">
                    <el-tab-pane label="堆叠柱状图" name="0" :disabled="formData.wd.length>2">
                        <el-radio-group v-model="formData.dataType" class="tabCard" @change="changeForm">
                            <el-radio-button label="1">数量</el-radio-button>
                            <el-radio-button label="2">比率</el-radio-button>
                        </el-radio-group>
                        <statistics-stack-bar 
                        :dataList="dataList" 
                        :barTitle="barTitle" 
                        :indexarr='indexarr'
                        :dataType="formData.dataType"
                        :dimension1="dimension1"
                        :dimension2="dimension2"
                        @selectedBar="selectedBar">
                        </statistics-stack-bar> 
                    </el-tab-pane>
                      <el-tab-pane label="平铺柱状图" name="1" :disabled="formData.wd.length>2">
                        <el-radio-group v-model="formData.dataType" class="tabCard" @change="changeForm">
                            <el-radio-button label="1">数量</el-radio-button>
                            <el-radio-button label="2">比率</el-radio-button>
                        </el-radio-group> 
                        <statistics-bar 
                        :dataList="dataList" 
                        :barTitle="barTitle" 
                        :indexarr='indexarr'
                        :dataType="formData.dataType"
                        :dimension1="dimension1"
                        :dimension2="dimension2"
                        @selectedBar="selectedBar">
                        </statistics-bar> 
                    </el-tab-pane>
                    <el-tab-pane label="象形柱图" name="4" :disabled="formData.wd.length>2 || tabStatus.pictorialDisabled">
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
                    <el-tab-pane label="饼图" name="3" :disabled="tabStatus.pieDisabled || formData.wd.length>2">
                        <el-radio-group v-model="formData.dataType" class="tabCard" @change="changeForm">
                            <el-radio-button label="1">数量</el-radio-button>
                            <el-radio-button label="2" :disabled="btnBL">比率</el-radio-button>
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
                    <el-tab-pane label="桑基图" name="5" :disabled="tabStatus.sankeyDisabled">
                      <el-radio-group v-model="formData.dataType" class="tabCard" @change="changeForm">
                            <el-radio-button label="1">数量</el-radio-button>
                            <el-radio-button label="2">比率</el-radio-button>
                        </el-radio-group>
                        <sankey-diagram 
                        :sankeyData='sankeyData' 
                        :dataType="formData.dataType"
                        v-if="!tabStatus.sankeyDisabled">
                        </sankey-diagram>
                    </el-tab-pane>
                    <el-tab-pane label="地图" name="6"  :disabled="tabStatus.mapDisabled || formData.wd.length>2">
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
                    <el-tab-pane label="折线图" name="7" :disabled="formData.wd.length>2">
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
                    <el-tab-pane label="表格" name="8" :disabled="formData.wd.length>2">
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
                      <el-tab-pane label="正负条形图" name="2" :disabled="tabStatus.barDisabled || formData.wd.length>2">
                        <el-radio-group v-model="formData.dataType" class="tabCard" @change="changeForm">
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
import sankeyDiagram from "@/components/sankeyDiagram";
import { numChangeFilter } from "@/filters/filter";
import common from "@/mixins/common";
import mixin from "@/mixins/mixins";
import CommonDefault from "@/components/Common";
import CommonBars from "@/components/CommonBars";
export default {
  name: "risk-statistics",
  mixins: [common,mixin],
  data() {
    return {
      activeName: "0",
      minSlider: 40,
      maxSlider: 80,
      sankeyData: {}, //桑基图数据
      scdisabled:false,
      lookPeoples:DICTIONARY.lookPeoples,    //观察人群
      dimension: DICTIONARY.dimension,
      resultTargets: DICTIONARY.resultTargets, //指标
      progressDimension: DICTIONARY.progressDimension, //维度
      years: DICTIONARY.years, //年度
      areas: DICTIONARY.areas, //大区
      province: [], //省份
      cancerTypes: DICTIONARY.cancerTypes, //癌种
      sex: DICTIONARY.sex, //性别
      age:[],//年龄
      evaluationResults: DICTIONARY.evaluationResults, //评估结果
      scResult: DICTIONARY.resultTargetsFei, //筛查结果
      gcPeoples: DICTIONARY.gcPeoples,
      dataResource: DICTIONARY.dataResource,
      // 搜索条件
      formData: {
        zb: "12",
        indexarr: 0,
        gc: 0,   //观察人群
        wd: [{ wd1: 1 }, { wd1: null }],
        wd1: 1,
        wd2: null,
        wd3: null,
        years: [],
        areas: [],
        age: [],
        minSliderAge: null,
        maxSliderAge: null,
        sex:[],
        evaluationResults:[],
        scResult: [],
        dataResource: 1,
        cancerTypes: 1,
        areaType: "16", //查询区域 2-大区 16-省
        dataType: "1" //查询类型 1-数量 2-比率
      },
      barTitle: "",
      dimension1: null, //维度一
      dimension2: null, //维度二
      indexarr: null, //指标
      dataList: [],
      btnBL:false,
      tabStatus: {
        pictorialDisabled: true, //象形柱图
        pieDisabled: true, //饼图
        barDisabled: true, //正负条形图
        mapDisabled: true, //地图
        sankeyDisabled: true //桑基图
      },
      isshowtext:false,
      // add
      activeIndex: '1',  //左侧导航默认选中
      defaultOpenIndex:['2'],
      searchItemDisadled:false,
      searchShow: false,
      btnText:'展开筛选',
      checkAllYears:false,
      checkAllAreas:false,
      checkAllAge:false,
      checkAllSexs:false,
      checkAllEstimateResult:false,
      checkAllCheckResult:false,
      defalultCharts:true,   //默认展示页
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
    sankeyDiagram,
    CommonDefault,
    CommonBars
  },
  created() {
    this.queryAllDataCode();
    this.tabDisabled();
    this.changeSearchOption();
    if (this.activeName == "5") {
      this.getDataSankey();
    } else {
      this.getData();
    }
  },
  mounted() {
    this.$nextTick(()=>{
         this.getRiskChartName()
    })
  },
  methods: {
    // 筛查切换
    changeScResult(val) {
      this.formData.scResult = [];
      this.formData.evaluationResults = [];
      this.checkAllEstimateResult = false;
      this.checkAllCheckResult = false;//筛查结果在全选之后的切换  清除全选
      if(this.activeIndex === '2-1') {
        this.scResult = DICTIONARY.riskTargetsFei;
        this.scdisabled = true;
      } else if(this.activeIndex === '2-2'){
        this.scResult = DICTIONARY.riskTargetsBreast;
        this.scdisabled = true;
      } else if(this.activeIndex === '2-4'){
        this.scResult = DICTIONARY.riskTargetsGan;
        this.scdisabled = true;
      } else if(this.activeIndex === '2-3'){
        this.scResult = DICTIONARY.riskTargetsChang;
        this.scdisabled = true;
      } else if(this.activeIndex === '2-5'){
        this.scResult = DICTIONARY.riskTargetsWei;
        this.scdisabled = true;
      } else if(this.activeIndex === '2-6'){
        this.scResult = DICTIONARY.riskTargetsSG;
        this.scdisabled = true;
      } else if(this.activeIndex === '1') {
        this.scdisabled = false;
      }
    },
    add() {
      this.formData.wd.push({ wd1: null });
    },

    del(index) {
      this.formData.wd.splice(index, 1);
    },
    changeTabs(){
      let arr = [];
      let arrFK = [];
      this.formData.wd.filter(item => {
        arr.push(item.wd1);
        if(item.wd1){
          arrFK.push(item.wd1)
        }
      });
      let arrNew = Array.from(new Set(arr));
      if (arrNew.length < arr.length) {
        this.$message({
          message: "展示方式不能相同",
          type: "warning"
        });
        return false;
      }
      for(let k = 0;k<this.formData.wd.length;k++){
        if(this.formData.wd[k].wd1 == 1 && this.formData.years.length==0){
          this.$message({
            message: "请至少选择一个年度筛选条件！",
            type: "warning"
          });
        return false;
        }
        if(this.formData.wd[k].wd1 == 2 && this.formData.areas.length==0){
          this.$message({
            message: "请至少选择一个区域筛选条件！",
            type: "warning"
          });
        return false;
        }
         if(this.formData.wd[k].wd1 == 3 && this.formData.age.length==0){
          this.$message({
            message: "请至少选择一个年龄筛选条件！",
            type: "warning"
          });
        return false;
        }
         if(this.formData.wd[k].wd1 == 4 && this.formData.sex.length==0){
          this.$message({
            message: "请至少选择一个性别筛选条件！",
            type: "warning"
          });
        return false;
        }
         if(this.formData.wd[k].wd1 == 5 && this.formData.evaluationResults.length==0){
          this.$message({
            message: "请至少选择一个评估结果筛选条件！",
            type: "warning"
          });
        return false;
        }
      }
    },
    //tab切换
    handleClick() {
        for(let k = 0;k<this.formData.wd.length;k++){
        if(this.formData.wd[k].wd1 == 1 && this.formData.years.length==0){
          return false;
        }
        if(this.formData.wd[k].wd1 == 2 && this.formData.areas.length==0){
           return false;
        }
        if(this.formData.wd[k].wd1 == 3 && this.formData.age.length==0){
           return false;
        }
        if(this.formData.wd[k].wd1 == 4 && this.formData.sex.length==0){
           return false;
        }
        if(this.formData.wd[k].wd1 == 5 && this.formData.evaluationResults.length==0){
           return false;
        }
      }
      let arr = [];
      let arrFK = [];
      this.formData.wd.filter(item => {
        arr.push(item.wd1);
        if(item.wd1){
          arrFK.push(item.wd1)
        }
      });
      let arrNew = Array.from(new Set(arr));
      if (arrNew.length < arr.length) {
        this.$message({
          message: "展示方式不能相同",
          type: "warning"
        });
        return;
      }else{
          this.formData.dataType = "1"; //恢复至数量
          this.changeSearchOption();
          if (this.activeName == "5") {
            this.getDataSankey();
          } else {
            this.getData();
          }
          this.getRiskChartName();
          this.changeWd();
      }
    },
    // tab切换禁止点击
    tabDisabled() {
      // 正负条形图
      if(this.formData.wd[1].wd1 === 2 && this.formData.areas.length === 2){
        this.tabStatus.barDisabled = false;
      }else if(this.formData.wd[1].wd1 === 1 && this.formData.years.length === 2){
        this.tabStatus.barDisabled = false;
      }else if(this.formData.wd[1].wd1 === 3 && this.formData.age.length === 2){
        this.tabStatus.barDisabled = false;
      }else if(this.formData.wd[1].wd1 === 4 && (this.formData.sex.length == 2)){
        this.tabStatus.barDisabled = false;
      }else if(this.formData.wd[1].wd1 === 5 && this.formData.evaluationResults.length === 2){
        this.tabStatus.barDisabled = false;
      }else{
        this.tabStatus.barDisabled = true;
      }

      // 地图
      if (
        this.formData.wd[0].wd1 === 2 &&
        !this.formData.wd[1].wd1 
      ) {
        this.tabStatus.mapDisabled = false;
      } else {
        this.tabStatus.mapDisabled = true;
      }

      //桑基图
      if (this.formData.wd[1].wd1) {
        this.tabStatus.sankeyDisabled = false;
      } else {
        this.tabStatus.sankeyDisabled = true;
      }

      // 饼图
      let arr = [];
      this.formData.wd.filter(item => {
        if (item.wd1) {
          arr.push(item.wd1);
        }
      });
      if (arr.length > 2) {
        this.tabStatus.pieDisabled = true;
      } else {
        this.tabStatus.pieDisabled = false;
      }

      // 象形柱图
      if (
        this.formData.wd[1].wd1 === 2 &&
        this.formData.areaType === "16" &&
        (this.formData.areas.length > 5 ||
          (this.formData.wd[1].wd1 === 2 && this.formData.areas.length === 0))
      ) {
        this.tabStatus.pictorialDisabled = true;
      } else {
        this.tabStatus.pictorialDisabled = false;
      }
    },

    //获取被点击柱子上的参数
    selectedBar(params) {
      this.formData.areas = [];
      this.formData.years = [];
      this.formData.areas.push(params.value);
      this.formData.years.push(params.name);
      this.formData.wd[0].wd1 = 17;
      this.changeSearchOption();
      this.getData();
    },

    //查询数据
    async getData() {
      let arr = [];
      this.formData.wd.filter(item => {
        arr.push(item.wd1);
      });
      if(this.activeIndex === 1 && arr.includes(5)){
        this.$message({
          message: "观察人群为评估人群时，展示方式不能选评估结果",
          type: "warning"
        });
        return;
      }
      const { data: { success, result } } = await this.$axios_http({
        url: URL.riskFactors,
        method: "post",
        data: this.baseData(),
        vueObj: this
      });
      if (success) {
        this.dataList = result.rows;
      }
    },

    //查询桑基图数据
    async getDataSankey() {
      let arr = [];
      this.formData.wd.filter(item => {
        arr.push(item.wd1);
      });
      if(this.activeIndex === 1 && arr.includes(5)){
        this.$message({
          message: "观察人群为评估人群时，展示方式不能选评估结果",
          type: "warning"
        });
        return;
      }
      const { data: { success, result } } = await this.$axios_http({
        url: URL.riskFactorsSankey,
        method: "post",
        data: this.baseData(),
        vueObj: this
      });
      if (success) {
        this.sankeyData = result;
      }
    },

    //维度
    changeWd() {
      this.tabDisabled();
      // 两个展示方式不能相同
      let arr = [];
      let arrFK = [];
      this.formData.wd.filter(item => {
        arr.push(item.wd1);
        if(item.wd1){
          arrFK.push(item.wd1)
        }
      });
      let arrNew = Array.from(new Set(arr));
      if (arrNew.length < arr.length) {
        this.$message({
          message: "展示方式不能相同",
          type: "warning"
        });
      }
      if(arrFK.length>1 && this.activeName==='3'){
        this.btnBL = true;
      }else{
        this.btnBL = false;
      }
      // 限制地图
       // 当且仅当“展示方式一”=“区域”，“展示方式二”为空时，地图可用。其余情况下，地图置灰；
      let wdArray = [];
      for(let k = 0;k<this.formData.wd.length;k++){
        if(this.formData.wd[k].wd1 == 2){
          wdArray.push(this.formData.wd[k].wd1)
        }
      }
      if(wdArray.length == 1 && this.formData.wd[0].wd1 == 2){
         this.tabStatus.mapDisabled = false;
      }else{
         this.tabStatus.mapDisabled = true;
      }
    },

    // 切换区域
    changeFormType() {
      this.formData.areas = [];
    },

    // 表单数据改变
    changeForm() {
      for(let k = 0;k<this.formData.wd.length;k++){
        if(this.formData.wd[k].wd1 == 1 && this.formData.years.length==0){
          this.$message({
            message: "请至少选择一个年度筛选条件！",
            type: "warning"
          });
        return false;
        }
        if(this.formData.wd[k].wd1 == 2 && this.formData.areas.length==0){
          this.$message({
            message: "请至少选择一个区域筛选条件！",
            type: "warning"
          });
        return false;
        }
         if(this.formData.wd[k].wd1 == 3 && this.formData.age.length==0){
          this.$message({
            message: "请至少选择一个年龄筛选条件！",
            type: "warning"
          });
        return false;
        }
         if(this.formData.wd[k].wd1 == 4 && this.formData.sex.length==0){
          this.$message({
            message: "请至少选择一个性别筛选条件！",
            type: "warning"
          });
        return false;
        }
         if(this.formData.wd[k].wd1 == 5 && this.formData.evaluationResults.length==0){
          this.$message({
            message: "请至少选择一个评估结果筛选条件！",
            type: "warning"
          });
        return false;
        }
      }
      // this.defalultCharts = false;
      // this.searchShow = false;
      // this.btnText='展开筛选';
      this.tabDisabled();
      this.changeSearchOption();
        let array = [];
        this.formData.wd.filter(item => {
          if (item.wd1) {
            array.push(item.wd1);
          }
        });
        let arrNew = Array.from(new Set(array));
        if (arrNew.length < array.length) {
          this.$message({
            message: "展示方式不能相同",
            type: "warning"
          });
          return;
        }
      // 两个展示方式不能相同
      if (this.activeName == "5") {
          this.getDataSankey();
      } else if (this.activeName == "3") {
        let arr = [];
        this.formData.wd.filter(item => {
          if (item.wd1) {
            arr.push(item.wd1);
          }
        });
        if (arr.length > 2 || (arr.length==2 && this.formData.dataType === '2')) {
          this.$message({
            message: "饼图比率只能有一个展示方式",
            type: "warning"
          });
          return;
        } else {
          this.getData();
        }
      } else if (this.activeName == "4") {
        //象形柱图最多5个省
        if (
          this.formData.wd[1].wd1 === 2 &&
          this.formData.areaType === "16" &&
          (this.formData.areas.length === 0 || this.formData.areas.length > 5)
        ) {
          this.$message({
            message: "象形柱图最多5个省",
            type: "warning"
          });
          return;
        } else {
          this.getData();
        }
      } else {
        // 两个展示方式不能相同
        if (this.formData.wd[0].wd1 === this.formData.wd[1].wd1) {
          this.$message({
            message: "展示方式不能相同",
            type: "warning"
          });
          return;
        } 
        else {
          this.getData();
        }
      }
      setTimeout(() => {
        this.getRiskChartName();
        let array = [];
        for(let k = 0;k<this.formData.wd.length;k++){
          if(this.formData.wd[k].wd1 == 2){
              array.push('2');
          }
        }
        if(array.length > 0){
            this.isshowtext = true;
         }else{
           this.isshowtext = false;
         }
          this.defalultCharts = false;
          this.searchShow = false;
          this.btnText='展开筛选';
      }, 0);
    },

    // 查询条件组装
    baseData() {
       let cancerType = null;
       switch(this.activeIndex){
              case '1':
                  cancerType = '0';
                  break
              case '2-1':
                  cancerType = '1';
                  break
              case '2-2':
                  cancerType = '2';
                  break
              case '2-3':
                  cancerType = '3';
                  break
              case '2-4':
                  cancerType = '4';
                  break
              case '2-5':
                  cancerType = '5';
                  break
              case '2-6':
                  cancerType = '6';
        }
      let $formData = {
        type: 3, //查询类型 1-结果 2-进度 3-危险因素
        indexarr: this.formData.zb, //指标
        cancerType:cancerType,
        dimensionarr: null, //维度
        screenWhereVos: [], //筛选对象
        dataType: this.formData.dataType.toString() //查询类型 1-数量 2-比率
      };

      // dimensionarr维度
      if (this.formData.wd.length <= 2) {
        if (!this.formData.wd[1].wd1) {
          if (this.formData.wd[0].wd1 == 2) {
            $formData.dimensionarr = this.formData.areaType.toString();
          } else if (this.formData.wd[0].wd1 != 2) {
            $formData.dimensionarr = this.formData.wd[0].wd1.toString();
          }
        } else {
          if (this.formData.wd[1].wd1 == 2) {
            $formData.dimensionarr =
              this.formData.wd[0].wd1 + "," + this.formData.areaType;
          } else if (this.formData.wd[0].wd1 == 2) {
            $formData.dimensionarr =
              this.formData.areaType + "," + this.formData.wd[1].wd1;
          } else {
            $formData.dimensionarr =
              this.formData.wd[0].wd1 + "," + this.formData.wd[1].wd1;
          }
        }
      } else {
        // 桑基图
        let dimensionarr = [];
        this.formData.wd.filter(item => {
          if (item.wd1 && item.wd1 != 2) {
            dimensionarr.push(item.wd1);
          } else if (item.wd1 && item.wd1 == 2) {
            dimensionarr.push(this.formData.areaType);
          }
        });
        $formData.dimensionarr = dimensionarr.join(",");
      }

      // 筛选条件
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

      if (this.formData.sex.length>0) {
        $formData.screenWhereVos.push({
          name: "4",
          value: this.formData.sex.join(",")
        });
      }
      if (this.activeIndex != 1 && this.formData.evaluationResults.length > 0) {
        $formData.screenWhereVos.push({
          name: '5',
          value: this.formData.evaluationResults.toString()
        });
      }

      if (this.formData.age.length > 0) {
         $formData.screenWhereVos.push({
          name: "3",
          value: this.formData.age.join(",")
        });
      }

      if (this.formData.scResult.length>0) {
        $formData.screenWhereVos.push({
          name: '18',
          value: this.formData.scResult.join(",")
        });
      }
      return $formData;
    },

    //查询条件赋值，方便封装方法调用
    changeSearchOption() {
      // 维度
      if (this.formData.wd[0].wd1 === 1) {
        this.dimension1 = "YEAR";
      } else if (
        this.formData.wd[0].wd1 === 2 &&
        this.formData.areaType == "2"
      ) {
        this.dimension1 = "AREA";
      } else if (
        this.formData.wd[0].wd1 === 2 &&
        this.formData.areaType == "16"
      ) {
        this.dimension1 = "ROVINCE";
      } else if (this.formData.wd[0].wd1 === 17) {
        this.dimension1 = "MONTH";
      } else if (this.formData.wd[0].wd1 === 3) {
        this.dimension1 = "AGE_GROUP";
      } else if (this.formData.wd[0].wd1 === 4) {
        this.dimension1 = "SEX";
      } else if (this.formData.wd[0].wd1 === 5) {
        this.dimension1 = "ASSESSRESULT";
      } else if (this.formData.wd[0].wd1 === 6) {
        this.dimension1 = "EDUCATIONLEVEL";
      } else if (this.formData.wd[0].wd1 === 7) {
        this.dimension1 = "MARITALSTATUS";
      } else if (this.formData.wd[0].wd1 === 8) {
        this.dimension1 = "SMOKINGSITUATION";
      } else if (this.formData.wd[0].wd1 === 9) {
        this.dimension1 = "VEGETABLECONSUMPTION";
      } else if (this.formData.wd[0].wd1 === 10) {
        this.dimension1 = "AIRPOLLUTION";
      } else if (this.formData.wd[0].wd1 === 11) {
        this.dimension1 = "SECONDHANDSMOKEEXPOSURE";
      } else if (this.formData.wd[0].wd1 === 12) {
        this.dimension1 = "MOTIONCONDITION";
      } else if (this.formData.wd[0].wd1 === 13) {
        this.dimension1 = "RESPIRATORYTRACTSTATUS";
      } else if (this.formData.wd[0].wd1 === 14) {
        this.dimension1 = "LUNGCANCERHISTORYSTATUS";
      } else if (this.formData.wd[0].wd1 === 19) {
        this.dimension1 = "TEMPHABIT";
      } else if (this.formData.wd[0].wd1 === 20) {
        this.dimension1 = "MEATINTAKE";
      } else if (this.formData.wd[0].wd1 === 21) {
        this.dimension1 = "FRUITINTAKE";
      } else if (this.formData.wd[0].wd1 === 22) {
        this.dimension1 = "FIBERINTAKE";
      } else if (this.formData.wd[0].wd1 === 23) {
        this.dimension1 = "PICKLEINTAKE";
      } else if (this.formData.wd[0].wd1 === 24) {
        this.dimension1 = "ALCOHOL";
      } else if (this.formData.wd[0].wd1 === 25) {
        this.dimension1 = "BMI";
      } else if (this.formData.wd[0].wd1 === 26) {
        this.dimension1 = "DIABETES";
      } else if (this.formData.wd[0].wd1 === 27) {
        this.dimension1 = "HBSAG";
      } else if (this.formData.wd[0].wd1 === 28) {
        this.dimension1 = "FOBT";
      } else if (this.formData.wd[0].wd1 === 29) {
        this.dimension1 = "UPPERHISTORY";
      } else if (this.formData.wd[0].wd1 === 30) {
        this.dimension1 = "LIVERHISTORY";
      } else if (this.formData.wd[0].wd1 === 31) {
        this.dimension1 = "LOWERHISTORY";
      } else if (this.formData.wd[0].wd1 === 32) {
        this.dimension1 = "ESOCANCERFAMILY";
      } else if (this.formData.wd[0].wd1 === 32) {
        this.dimension1 = "LIVERCANCERFAMILY";
      } else if (this.formData.wd[0].wd1 === 33) {
        this.dimension1 = "GASCANCERFAMILY";
      } else if (this.formData.wd[0].wd1 === 34) {
        this.dimension1 = "LIVERCANCERFAMILY";
      } else if (this.formData.wd[0].wd1 === 35) {
        this.dimension1 = "COLUMCANCERFAMILY";
      } else if (this.formData.wd[0].wd1 === 36) {
        this.dimension1 = "BREASTCANCERFAMILY";
      }else if(this.formData.wd[0].wd1 === 56){
         this.dimension1 = "CANCERFAMILY";
      }else {
         this.dimension1 = null;
      }

      if (this.formData.wd[1].wd1 === 1) {
        this.dimension2 = "YEAR";
      } else if (
        this.formData.wd[1].wd1 === 2 &&
        this.formData.areaType == "2"
      ) {
        this.dimension2 = "AREA";
      } else if (
        this.formData.wd[1].wd1 === 2 &&
        this.formData.areaType == "16"
      ) {
        this.dimension2 = "ROVINCE";
      } else if (this.formData.wd[1].wd1 === 3) {
        this.dimension2 = "AGE_GROUP";
      } else if (this.formData.wd[1].wd1 === 4) {
        this.dimension2 = "SEX";
      } else if (this.formData.wd[1].wd1 === 5) {
        this.dimension2 = "ASSESSRESULT";
      } else if (this.formData.wd[1].wd1 === 6) {
        this.dimension2 = "EDUCATIONLEVEL";
      } else if (this.formData.wd[1].wd1 === 7) {
        this.dimension2 = "MARITALSTATUS";
      } else if (this.formData.wd[1].wd1 === 8) {
        this.dimension2 = "SMOKINGSITUATION";
      } else if (this.formData.wd[1].wd1 === 9) {
        this.dimension2 = "VEGETABLECONSUMPTION";
      } else if (this.formData.wd[1].wd1 === 10) {
        this.dimension2 = "AIRPOLLUTION";
      } else if (this.formData.wd[1].wd1 === 11) {
        this.dimension2 = "SECONDHANDSMOKEEXPOSURE";
      } else if (this.formData.wd[1].wd1 === 12) {
        this.dimension2 = "MOTIONCONDITION";
      } else if (this.formData.wd[1].wd1 === 13) {
        this.dimension2 = "RESPIRATORYTRACTSTATUS";
      } else if (this.formData.wd[1].wd1 === 14) {
        this.dimension2 = "LUNGCANCERHISTORYSTATUS";
      } else if (this.formData.wd[1].wd1 === 19) {
        this.dimension2 = "TEMPHABIT";
      } else if (this.formData.wd[1].wd1 === 20) {
        this.dimension2 = "MEATINTAKE";
      } else if (this.formData.wd[1].wd1 === 21) {
        this.dimension2 = "FRUITINTAKE";
      } else if (this.formData.wd[1].wd1 === 22) {
        this.dimension2 = "FIBERINTAKE";
      } else if (this.formData.wd[1].wd1 === 23) {
        this.dimension2 = "PICKLEINTAKE";
      } else if (this.formData.wd[1].wd1 === 24) {
        this.dimension2 = "ALCOHOL";
      } else if (this.formData.wd[1].wd1 === 25) {
        this.dimension2 = "BMI";
      } else if (this.formData.wd[1].wd1 === 26) {
        this.dimension2 = "DIABETES";
      } else if (this.formData.wd[1].wd1 === 27) {
        this.dimension2 = "HBSAG";
      } else if (this.formData.wd[1].wd1 === 28) {
        this.dimension2 = "FOBT";
      } else if (this.formData.wd[1].wd1 === 29) {
        this.dimension2 = "UPPERHISTORY";
      } else if (this.formData.wd[1].wd1 === 30) {
        this.dimension2 = "LIVERHISTORY";
      } else if (this.formData.wd[1].wd1 === 31) {
        this.dimension2 = "LOWERHISTORY";
      } else if (this.formData.wd[1].wd1 === 32) {
        this.dimension2 = "ESOCANCERFAMILY";
      } else if (this.formData.wd[1].wd1 === 32) {
        this.dimension2 = "LIVERCANCERFAMILY";
      } else if (this.formData.wd[1].wd1 === 33) {
        this.dimension2 = "GASCANCERFAMILY";
      } else if (this.formData.wd[1].wd1 === 34) {
        this.dimension2 = "LIVERCANCERFAMILY";
      } else if (this.formData.wd[1].wd1 === 35) {
        this.dimension2 = "COLUMCANCERFAMILY";
      } else if (this.formData.wd[1].wd1 === 36) {
        this.dimension2 = "BREASTCANCERFAMILY";
      }else if(this.formData.wd[1].wd1 === 56){
         this.dimension2 = "CANCERFAMILY";
      } else {
        this.dimension2 = null;
      }
      // 指标
      this.indexarr = "SUMDATA";
    },
    // 左侧菜单
    selectMeun(index){
       this.searchShow = false;
       this.btnText='展开筛选'
       this.defalultCharts = true;
       this.activeIndex = index;
       this.searchItemDisadled=false;
       this.changeScResult(this.activeIndex);
    },
    openSearch(){
      this.searchShow = !this.searchShow;
      if(this.searchShow) {
        this.btnText='收起筛选'
      }else{
        this.btnText='展开筛选'
      }
    },
  }
};
</script>

<style scoped>
h2 {
  font-size: 16px;
  color: #333333;
  margin-bottom: 16px;
}
.title .el-icon-circle-plus {
  /* color: #fff; */
  margin-right: 20px;
  margin-top: 2px;
  font-size: 18px;
}
.el-icon-remove {
  /* color: #fff; */
  margin-right: 20px;
  margin-top: 0px;
  font-size: 18px;
}
.searchBox {
  text-align: center;
}
.searchBox .el-button {
  border-radius: 0;
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
</style>