/**
* created by leicj on 2018/12/21.
*/
import axios from 'axios'
import router from '@/router'
export default {
  install (Vue) {
    Vue.prototype.$axios_http = $axios_http
  }
}
var clientStatus = 1 //刷新整个页面时，可能会调用多个http请求，用此标记只弹一次

//封装axios http请求，用于全局请求token失效时，重置token 或 跳转至登录页面
export const $axios_http = function (obj) {
  // 获取vue对象
  let _vueObj=null;
  if(obj.vueObj){
    _vueObj=obj.vueObj;
  }else{
    _vueObj=this;
  }
  return new Promise((resolve,reject) =>{
    axios({
      method:obj.method?obj.method:'POST',
      url:obj.url?obj.url:'/',
      data:obj.data?obj.data:"",
      withCredentials:true,
      responseType:obj.responseType?obj.responseType:'json'
    }).then((res) => {
      if(!res.data.success){
        // 统一错误提示语
        _vueObj.$message({
          type:'error',
          message:res.data.message
        });
      }
      resolve(res)
    }).catch((err) => {
      // token失效
      if(err.response.data.Code == 'VALIDATE_TOKEN_FAIL' || err.response.status == '401'){
        if(clientStatus == 1){
          _vueObj.$confirm('对不起，您的登录状态已过期，请重新登陆', '提示', {
            confirmButtonText: '确定',
            showCancelButton:false,
            type: 'warning'
          }).then(() => {
            window.location.href=BIGPLATFORM_URL
            clientStatus = 1
          });
          clientStatus = 2;
        }
      }
      resolve(res)
    }).catch((err) => {
      reject(err);
    })
  })
}
