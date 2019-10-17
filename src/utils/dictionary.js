/**
 * Created by leicj on 2018/12/26.
 */
const DICTIONARY = {
  /**
   * 项目进度搜索
   */
  // 指标--项目进度
  progressTargetsFX: [{
    id: 1,
    name: '风险评估'
  }],
  progressTargetsSC: [{
      id: 2,
      name: '癌症筛查'
    },
    {
      id: 3,
      name: '筛查参与率'
    }
  ],

  // 维度--项目进度
  progressDimension: [{
      id: 1,
      name: '年度'
    },
    {
      id: 2,
      name: '区域'
    },
    // {
    //   id: 15,
    //   name: '癌种',
    //   disabled: false
    // }
  ],

  /**
   * 项目绩效搜索
   */

  // 指标--项目绩效
  resultTargets: [{
      id: 5,
      name: '高危'
    },
    {
      id: 6,
      name: '阳性结节'
    },
    {
      id: 7,
      name: '疑似肺癌'
    },
    {
      id: 8,
      name: '早诊',
      disabled: true
    },
    {
      id: 9,
      name: '治疗',
      disabled: true
    }
  ],
  // 肺癌
  resultTargetsFei: [{
      id: 101,
      name: '高危',
      dataCode:'高危',
      cancerType: '肺癌',
    },
    // {
    //   id: 102,
    //   name: '阴性率'
    // },
    {
      id: 103,
      name: '阳性结节',
      dataCode:'阳性结节',
      cancerType: '肺癌',
    },
    {
      id: 104,
      name: '疑似肺癌',
      dataCode:'疑似肺癌',
      cancerType: '',
    }
  ],
  // 乳腺
  resultTargetsBreast: [{
      id: 201,
      name: '高危',
      cancerType: '乳腺癌',
    },
    // {
    //   id: 202,
    //   name: '阴性率'
    // },
    {
      id: 203,
      name: 'BIRADS 3级',
      cancerType: '乳腺癌',
    },
    {
      id: 204,
      name: 'BIRADS 4-5级',
      cancerType: '乳腺癌',
    }
  ],
  // 肠癌
  resultTargetsChang: [{
      id: 301,
      name: '高危',
      cancerType: '结直肠癌',
    },
    //  {
    //   id: 302,
    //   name: '阴性率'
    // },
    {
      id: 303,
      name: '癌前病变',
      cancerType: '结直肠癌',
    },
    {
      id: 304,
      name: '确诊患癌',
      cancerType: '结直肠癌',
    }
  ],
  // 食管癌
  resultTargetsSG: [{
      id: 601,
      name: '高危',
      cancerType: '食管癌',
    },
    //  {
    //   id: 602,
    //   name: '阴性率'
    // },
    {
      id: 603,
      name: '癌前病变',
      cancerType: '食管癌',
    },
    {
      id: 604,
      name: '确诊患癌',
      cancerType: '食管癌',
    }
  ],
  // 胃癌
  resultTargetsWei: [{
      id: 501,
      name: '高危',
      cancerType: '胃癌',
    },
    // {
    //   id: 502,
    //   name: '阴性率'
    // },
    {
      id: 503,
      name: '癌前病变',
      cancerType: '胃癌',
    },
    {
      id: 504,
      name: '确诊患癌',
      cancerType: '胃癌',
    }
  ],
  // 肝
  resultTargetsGan: [{
      id: 401,
      name: '高危',
      cancerType: '肝癌',
    },
    // {
    //   id: 402,
    //   name: '阴性率'
    // },
    {
      id: 403,
      name: 'AFP阳性',
      cancerType: '肝癌',
    },
    {
      id: 404,
      name: '肝占位性病变',
      cancerType: '肝癌',
    },
    {
      id: 405,
      name: '疑似肝癌',
      cancerType: '',
    }
  ],



  // 维度--项目绩效
  resultDimension: [{
      id: 1,
      name: '年度'
    },
    {
      id: 2,
      name: '区域'
    },
    {
      id: 3,
      name: '年龄'
    },
    {
      id: 4,
      name: '性别'
    },
    {
      id: 5,
      name: '评估结果'
    }
  ],

  /**
   * 危险因素搜索
   */
  // 肺癌
  riskTargetsFei: [{
      id: 0,
      name: '阴性',
      dataCode:'阴性'
    },
    {
      id: 1,
      name: '阳性结节',
      dataCode:'阳性结节'
    },
    {
      id: 2,
      name: '疑似肺癌',
      dataCode:'疑似肺癌'
    }
  ],
  // 乳腺
  riskTargetsBreast: [{
      id: 0,
      name: '阴性',
      dataCode:'阴性'
    },
    {
      id: 1,
      name: '疑似阳性',
      dataCode:'疑似阳性'
    },
    {
      id: 2,
      name: '阳性',
      dataCode:'阳性'
    }
  ],
  // 肠癌
  riskTargetsChang: [{
      id: 0,
      name: '阴性',
      dataCode:'阴性'
    },
    {
      id: 1,
      name: '癌前病变',
      dataCode:'癌前病变'
    },
    {
      id: 2,
      name: '癌',
      dataCode:'癌'
    }
  ],
  // 食管癌
  riskTargetsSG: [{
      id: 0,
      name: '阴性',
      dataCode:'阴性'
    }, {
      id: 1,
      name: '癌前病变',
      dataCode:'癌前病变'
    },
    {
      id: 2,
      name: '癌',
      dataCode:'癌'
    }
  ],
  // 胃癌
  riskTargetsWei: [{
      id: 0,
      name: '阴性',
      dataCode:'阴性'
    },
    {
      id: 1,
      name: '癌前病变',
      dataCode:'癌前病变'
    },
    {
      id: 2,
      name: '癌',
      dataCode:'癌'
    }
  ],
  // 肝
  riskTargetsGan: [{
      id: 0,
      name: '阴性',
      dataCode:'阴性'
    },
    {
      id: 1,
      name: 'AFP阳性',
      dataCode:'AFP阳性'
    },
    {
      id: 2,
      name: '肝占位性病变',
      dataCode:'肝占位性病变'
    },
    {
      id: 3,
      name: '疑似肝癌',
      dataCode:'疑似肝癌'
    }
  ],
  // 维度-桑基图
  dimension: [{
      id: 1,
      name: '年度'
    },
    {
      id: 2,
      name: '区域'
    },
    {
      id: 3,
      name: '年龄'
    },
    {
      id: 4,
      name: '性别'
    },
    {
      id: 5,
      name: '评估结果'
    },
    {
      id: 6,
      name: '教育程度'
    },
    {
      id: 7,
      name: '婚姻状态'
    },
    {
      id: 8,
      name: '吸烟情况'
    },
    // {
    //   id: 9,
    //   name: '新鲜蔬菜食用情况'
    // },
    // {
    //   id: 10,
    //   name: '空气污染情况'
    // },
    {
      id: 11,
      name: '二手烟暴露情况'
    },
    {
      id: 12,
      name: '运动情况'
    },
    {
      id: 13,
      name: '慢性呼吸道疾病'
    },
    // {
    //   id: 14,
    //   name: '肺癌家族史'
    // },
    // {
    //   id: 19,
    //   name: '平时饮食喜好习惯冷热度'
    // },
    // {
    //   id: 20,
    //   name: '畜肉平均摄入量'
    // },
    // {
    //   id: 21,
    //   name: '水果平均摄入量'
    // },
    // {
    //   id: 22,
    //   name: '粗粮平均摄入量'
    // },
    // {
    //   id: 23,
    //   name: '是否经常食用腌晒食品'
    // },
    {
      id: 24,
      name: '是否经常饮酒'
    },
    {
      id: 25,
      name: 'BMI'
    }, {
      id: 26,
      name: '是否有糖尿病'
    },
    {
      id: 27,
      name: '是否HBsAg阳性'
    },
    {
      id: 28,
      name: '是否FOBT阳性'
    },
    {
      id: 29,
      name: '是否有上消化道系统疾病'
    },
    {
      id: 30,
      name: '是否有肝胆系统疾病'
    }, {
      id: 31,
      name: '是否有下消化道系统疾病'
    },
    // {
    //   id: 32,
    //   name: '是否有食管癌肿瘤家族史'
    // },
    // {
    //   id: 33,
    //   name: '是否有胃癌肿瘤家族史'
    // },
    // {
    //   id: 34,
    //   name: '是否有肝癌肿瘤家族史'
    // },
    // {
    //   id: 35,
    //   name: '是否有肠癌肿瘤家族史'
    // },
    // {
    //   id: 36,
    //   name: '是否有亲属曾患乳腺癌'
    // }
    {
      id:56,
      name:'恶性肿瘤家族史'
    }
  ],

  // 筛查结果
  scResult: [{
      id: 1,
      name: '阳性结节'
    },
    {
      id: 2,
      name: '疑似肺癌'
    },
    {
      id: 3,
      name: '阴性'
    },
    {
      id: 4,
      name: '其他'
    }
  ],

  // 维度--项目进度
  tabNames: [{
      id: 1,
      name: '数量'
    },
    {
      id: 2,
      name: '比率'
    }
  ],

  // 观察人群
  gcPeoples: [{
      id: 0,
      name: '评估人群'
    },
    {
      id: 1,
      name: '肺癌筛查人群'
    },
    {
      id: 2,
      name: '乳腺癌筛查人群'
    },
    {
      id: 3,
      name: '肠癌筛查人群'
    },
    {
      id: 4,
      name: '肝癌筛查人群'
    },
    {
      id: 5,
      name: '胃癌筛查人群'
    },
    {
      id: 6,
      name: '食管癌筛查人群'
    }
  ],

  // 年度
  years: [{
      id: 1,
      name: '2013',
      dataCode:'2013'
    },
    {
      id: 2,
      name: '2014',
      dataCode:'2014'
    },
    {
      id: 3,
      name: '2015',
      dataCode:'2015'
    },
    {
      id: 4,
      name: '2016',
      dataCode:'2016'
    },
    {
      id: 5,
      name: '2017',
      dataCode:'2017',
      disabled:true
    },
    {
      id: 6,
      name: '2018',
      dataCode:'2018',
      disabled:true
    },
    {
      id: 7,
      name: '2019',
      dataCode:'2019'
    }
  ],

  // 区域
  areas: [{
      id: 1,
      name: '东北部'
    },
    {
      id: 2,
      name: '东部'
    },
    {
      id: 3,
      name: '中部'
    },
    {
      id: 4,
      name: '西部'
    }
  ],

  // 癌种
  cancerTypes: [{
      id: 1,
      name: '肺癌'
    },
    {
      id: 2,
      name: '乳腺癌',
      disabled: false
    },
    {
      id: 3,
      name: '结直肠癌',
      disabled: false
    },
    {
      id: 4,
      name: '肝癌',
      disabled: false
    },
    {
      id: 5,
      name: '胃癌',
      disabled: false
    },
    {
      id: 6,
      name: '食管癌',
      disabled: false
    }
  ],

  // 性别
  sex: [
    {
      id: 1,
      name: '男',
      dataCode:'男'
    },
    {
      id: 2,
      name: '女',
      dataCode:'女'
    },{
      id:3,
      name:'其他性别',
      dataCode:'其他性别'
    }
  ],

  // 评估结果
  evaluationResults: [{
      id: 1,
      name: '高危',
      dataCode:'高危'
    },
    {
      id: 0,
      name: '非高危',
      dataCode:'非高危'
    }
  ],

  // 数据来源
  dataResource: [{
      id: 1,
      name: '城癌项目'
    },
    {
      id: 2,
      name: '淮河项目',
      disabled: true
    },
    {
      id: 3,
      name: '其他癌症筛查项目',
      disabled: true
    },
    {
      id: 4,
      name: '肺癌RCT项目',
      disabled: true
    }
  ],

  // 角色范围
  dataLevel: [{
      id: 1,
      name: '自己'
    },
    {
      id: 2,
      name: '本部门'
    },
    {
      id: 3,
      name: '本部门及以下一级'
    },
    {
      id: 4,
      name: '本部门及以下全部'
    },
  ],

}

export default DICTIONARY
