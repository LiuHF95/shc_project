import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Devicemanage from '@/components/devicemanage'
import Usermanage from '@/components/usermanage'
import Console from '@/components/console/console'
import Locus from '@/components/console/locus'
import Report from '@/components/report'
import Safearea from '@/components/safearea'
import Distributed from '@/components/distributed'
import Hihi from '@/components/hihi'
import A from '@/components/aaa'

Vue.use(Router)

export default new Router({
  // mode:"history",
  // base:"/rstl/",
  routes: [
    {
      path: '/a',
      name: 'A',
      component: A
    },
    {
      path: '/hihi',
      name: 'Hihi',
      component: Hihi
    },
    // 首页
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    // 设备管理
    {
      path: '/devicemanage',
      name: 'Devicemanage',
      component: Devicemanage
    },
    // 用户管理
    {
      path: '/usermanage',
      name: 'Usermanage',
      component: Usermanage
    },
    // 控制台
    {
      path: '/console',
      name: 'Console',
      component: Console
    },
    // 轨迹
    {
      path: '/locus',
      name: 'Locus',
      component: Locus
    },
    // 统计报表
    {
      path: '/report',
      name: 'Report',
      component: Report
    },
    // 安全区域
    {
      path: '/safearea',
      name: 'Safearea',
      component: Safearea
    },
    // 设备分布
    {
      path: '/distributed',
      name: 'Distributed',
      component: Distributed
    },
  ]
})
