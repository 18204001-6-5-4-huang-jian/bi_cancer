/**
 * Created by leicj on 2018/12/24.
 */
const FILTER_DATA = {
  // 数组转字符串
  deptNameChangeFilter(value) {
    if (value) {
      return value.join('')
    } else {
      return ''
    }
  },

  // 数字转中文数字
  numChangeFilter(value) {
    let arr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十']
    if (value) {
      return arr[value]
    } else {
      return ''
    }
  },

  // 癌种
  cancerType(value) {
    if (value=='1') {
      return '肺癌'
    } else if(value=='2') {
      return '乳腺癌'
    } else if(value=='3') {
      return '结直肠癌'
    } else if(value=='4') {
      return '肝癌'
    } else if(value=='5') {
      return '胃癌'
    } else if(value=='6') {
      return '食管癌'
    }
  }
}

export default FILTER_DATA
