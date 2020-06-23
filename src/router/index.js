import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */


const routes = [
  // 登录页
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 报错页
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '监管看板', icon: 'mdi-view-dashboard' }
    }]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/sysUser',
    name: 'System',
    meta: { title: '系统设置', icon: 'mdi-cog' },
    children: [
      {
        path: 'sysUser',
        name: 'SysUser',
        component: () => import('@/views/sys/sysUser/index'),
        meta: { title: '用户管理', icon: 'mdi-account' }
      },
      {
        path: 'sysTest',
        name: 'SysTest',
        component: () => import('@/views/sys/sysTest/index'),
        meta: { title: '测点管理', icon: 'mdi-wrench' }
      },
      {
        path: 'sysQuality',
        name: 'SysQuality',
        component: () => import('@/views/sys/sysTestAll/quality'),
        meta: { title: '空气站点管理', icon: 'mdi-google-assistant' }
      },
    ]
  },
]

const router = new VueRouter({
  routes
})
Vue.use(VueRouter)

export default router
