import Vue from 'vue'
import Router from 'vue-router'
import Console from '@/components/console/console'//控制台
import Locus from '@/components/console/locus'//轨迹

import Devicemanage from '@/components/devicemanage'//设备管理

import Report from '@/components/reportform/report'//统计报表
// import Reportoverview from '@/components/reportform/alert/alertoverview'//告警总览

import Distributed from '@/components/distributed'//设备分布
import Hihi from '@/components/hihi'
import A from '@/components/aaa'

Vue.use(Router)

export default new Router({
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
    // 控制台
    {
      path: '/',
      name: 'Console',
      component: Console
    },
    // 轨迹
    {
      path: '/locus',
      name: 'Locus',
      component: Locus
    },
    // 设备管理
    {
      path: '/devicemanage',
      name: 'Devicemanage',
      component: Devicemanage
    },
    // 统计报表
    {
      path: '/report',
      name: 'Report',
      component: Report
    },
    // 设备分布
    {
      path: '/distributed',
      name: 'Distributed',
      component: Distributed
    },
  ]
})
