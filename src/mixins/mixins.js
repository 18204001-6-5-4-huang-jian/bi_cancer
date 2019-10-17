/**
 * created by leicj on 2018/12/21.
 * 定义混合对象
 */
import {
  Message
} from 'element-ui'
import URL from "@/plugin/serviceAPI.config.js";
let mixin = {
  methods: {
    /**
     * 获取权限
     */
    dialogAuth(dialogObj, name) {
      if (window.localStorage.getItem(name) == name) {
        dialogObj[name] = true
      } else {
        Message.error('抱歉，您没有该权限！')
      }
    },

    // 页面权限
    checkPageAuth(obj, pageName, btnData) {
      if (window.localStorage.getItem(pageName) == pageName) {
        obj[pageName] = true;
        if (obj[pageName] == true) {
          for (var i in btnData) {
            if (window.localStorage.getItem(i) == i) {
              btnData[i] = true;
            }
          }
        }
      } else {
        this.$failMsg(this, "对不起，您没有此页面的权限，请联系管理员.")
        window.history.go(-1)
        setTimeout(function () {
          this.$router.go(0)
        }, 200)

      }
    },

    /**
     * 通用，对象数组(JSON) 根据某个共同字段 分组
     * @param array 对象数组
     * @param key 键值
     * @returns Array
     */
    objectMerge(array, key) {
      let map = {},
        dest = [];
      for (let i = 0; i < array.length; i++) {
        let ai = array[i];
        if (!map[ai[key]]) {
          let obj = {}
          obj[key] = ai[key];
          obj.data = [ai]
          dest.push(obj);
          map[ai[key]] = ai;
        } else {
          for (let j = 0; j < dest.length; j++) {
            let dj = dest[j];
            if (dj[key] == ai[key]) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest
    },

    /**
     * 通用，筛选对象list中的value组成新数组
     * @param objList 对象list
     * @param key 键值
     * @returns Array
     */
    arrayMerge(objList, key) {
      let $array = [];
      objList.filter((item) => {
        $array.push(item[key])
      })
      return $array
    },

    /**
     * 表格转百分比通用，筛选对象list中的value组成新数组
     * @param objList 对象list
     * @param key 键值
     * @returns Array
     */
    arrayMergeFloat(objList, key) {
      let $array = [];
      objList.filter((item) => {
        $array.push((item[key] * 100).toFixed(2) + '%')
      })
      return $array
    },

    /**
     * 通用，自动补齐数组
     * @param objList 对象list
     * @param key 键值
     * @param xAxisData  X轴数据
     * @returns Array
     */
    arrayMergeAuto(objList, key, xAxisData, dimension1) {
      let $array = new Array(xAxisData.length);
      $array.fill(0);
      objList.filter((item) => {
        $array[xAxisData.indexOf(item[dimension1])] = item[key]
      })
      return $array
    },

    /**
     * 表格转百分比通用，自动补齐数组
     * @param objList 对象list
     * @param key 键值
     * @param xAxisData  X轴数据
     * @returns Array
     */
    arrayMergeAutoFloat(objList, key, xAxisData, dimension1) {
      let $array = new Array(xAxisData.length);
      $array.fill('0%');
      objList.filter((item) => {
        $array[xAxisData.indexOf(item[dimension1])] = (item[key] * 100).toFixed(2) + '%'
      })
      return $array
    },

    /**
     * 通用，数组求和
     * @param arr 数组
     * @returns Number
     */
    sum(arr) {
      return arr.reduce(function (prev, curr, idx, arr) {
        return prev + curr;
      })
    },

    /**
     * 通用，将数组中的元素转成负数
     * @param arr 数组
     * @returns Array
     */
    reverseMinus(arr) {
      let $array = [];
      arr.filter((item) => {
        $array.push(-item)
      })
      return $array
    },

    /**
     * 通用，数据字典地区
     * @param str
     * @returns number
     */
    dictAreaId(str) {
      if (str === '东北部') {
        return 1;
      } else if (str === '东部') {
        return 2;
      } else if (str === '中部') {
        return 3;
      } else if (str === '西部') {
        return 4;
      }
    },
    
    /**
     * 通用，全选
     * @params val:全选按钮是否选中；dict:多选数据字典；formObj:多选选中的值
     */
    handleCheckAll(val, dict, formObj) {
      let _option = dict.map(x => {
        return x.dataCode
      })
      this.formData[formObj] = val ? _option : [];
      this.tabDisabled();
    },
    handleCheckAllSecond(val, dict, formObj){
      let _option = dict.map(x => {
        return x.id
      })
      this.formData[formObj] = val ? _option : [];
      this.tabDisabled();
    },
    /**
     * 通用，取消全选
     * @params value:多选选中的值；dict:多选数据字典；checkAllValue:多选按钮
     */
    handleCheckedChange(value,dict,checkAllValue) {
      let _checkedCount = value.length;
      this[checkAllValue] = _checkedCount === dict.length;
      this.tabDisabled();
    },
  }
}

export default mixin
