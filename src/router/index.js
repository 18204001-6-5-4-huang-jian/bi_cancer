// import Vue from 'vue'
import VueRouter from 'vue-router'
let errorPage = () => import('@/views/errorPage/404')
let home = () => import('@/views/home/Index')
let progress = () => import('@/views/progress/Index')
let result = () => import('@/views/result/Index')
let risk = () => import('@/views/risk/Index')
let useList = () =>import('@/views/users/Index')
let addUser = () =>import('@/views/users/addUser')

// Vue.use(Router)

export default new VueRouter({
  routes: [{
    path: '/',
    redirect:'/index',
    meta: {
      requireAuth: '',
      breadNumber: 1
    }
  },{
      path: '/index',
      component: home,
      name: '指挥舱',
      meta: {
        requireAuth: '',
        breadNumber: 1
      }
    },
    {
      path: '/progress',
      component: progress,
      name: '项目进度',
      meta: {
        requireAuth: '',
        breadNumber: 1
      }
    },
    {
      path: '/result',
      component: result,
      name: '项目绩效',
      meta: {
        requireAuth: '',
        breadNumber: 1
      }
    },
    {
      path: '/risk',
      component: risk,
      name: '流行特征分布',
      meta: {
        requireAuth: '',
        breadNumber: 1
      }
    },
    {
      path: '/user/index',
      component: useList,
      name: '用户管理',
      meta: {
        requireAuth: '',
        breadNumber: 1
      }
    },
    {
      path: '/user/adduser',
      component: addUser,
      name: '用户详情',
      meta: {
        requireAuth: '',
        breadNumber: 3
      }
    },
    {
      path: '/404',
      component: errorPage
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
