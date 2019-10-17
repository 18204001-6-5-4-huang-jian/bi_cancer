import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import ELEMENT from 'element-ui';
import CommonComponent from '@/components/widget'
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import http from '@/plugin/http'
import Axios from "axios"
import 'babel-polyfill'
Vue.prototype.$axios = Axios
Vue.use(CommonComponent).use(ELEMENT).use(http)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

import filters from './filters/filter'; // 全局vue filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 面包屑
let routeList = []
router.beforeEach((to, from, next) => {
  // 刷新页面，获取当前面包屑
  if(localStorage.getItem('breadcrumb')){
    routeList=JSON.parse(localStorage.getItem('breadcrumb'));
  }
  //如果存在路由列表，则把之后的路由都删掉
  if(routeList.length>0){
    routeList.filter((item,i)=>{
      if(to.matched[0].meta.breadNumber==1 && to.meta.breadNumber!=3){
        routeList.splice(0,routeList.length);
      }
      if(item.name==to.name){
        //针对breadNumber==3的情况
        routeList.splice(i,routeList.length-i);
      }
    })
  }
  //追加路由
  if(to.matched.length>1 && to.meta.breadNumber!=3){
    let obj={
      name:null,
      query:{}
    }
    obj.name=to.matched[0].name
    obj.query=to.matched[0].query
    routeList.push(obj)
  }
  let obj={
    name:null,
    path:null,
    query:{}
  }
  obj.name=to.name
  obj.path=to.path
  obj.query=to.query
  routeList.push(obj)
  
  localStorage.setItem('breadcrumb',JSON.stringify(routeList))
  to.meta.routeList = routeList
  next()
})