/**
 * Created by leicj on 2018/12/24.
 */
import { COMMON } from '../mutation-types'
import { $axios_http } from '@/plugin/http'

const BASE_URL = '/base/system'
const COMMON_API = {
  // 录入人
  GET_USER_DATA: {
    url: BASE_URL + '/find/adduser',
    method: 'post'
  },
  // 癌种，机构类型，检查项目
  GET_CANCER_DATA: {
    url: BASE_URL + '/baseDataType/getBaseDataList',
    method: 'post'
  }
}
export default {
  namespaced: true,
  state () {
    return {
      addUserList: [], //录入人
      cancerList: [],
      menuList: [],   //左侧菜单
      deptNameChange:null,   //登录机构
    }
  },
  mutations: {
    [COMMON.ADD_USER_LIST] (state, content) {
      state.addUserList = [...content]
    },
    [COMMON.CANCER_LIST] (state, content) {
      state.cancerList = [...content]
    },
    [COMMON.MENU_LIST](state,content){
      state.menuList = [...content]
    },
    [COMMON.DEPT_NAME_CHANGE](state,content){
      state.deptNameChange = [...content]
    },
    
  },
  actions: {
    async [COMMON.ADD_USER_LIST] ({state, commit}) {
      if (!state.addUserList.length) {
        const {data: {status, result}} = await $axios_http({
          ...COMMON_API.GET_USER_DATA
        })
        status === 'SUCCESS' && commit(COMMON.ADD_USER_LIST, result)
      }
    },
    async [COMMON.CANCER_LIST] ({state, commit}, code) {
      if (!state.cancerList.length) {
        const {data: {status, result}} = await $axios_http({
          ...COMMON_API.GET_CANCER_DATA,
          code
        })
        status === 'SUCCESS' && commit(COMMON.CANCER_LIST, result)
      }
    }
  }
}
