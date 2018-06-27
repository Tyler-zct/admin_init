import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/documentation/index'),
  //     name: 'documentation',
  //     meta: { title: 'documentation', icon: 'documentation', noCache: true }
  //   }]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/guide/index'),
  //     name: 'guide',
  //     meta: { title: 'guide', icon: 'guide', noCache: true }
  //   }]
  // }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/systemmanage',
    component: Layout,
    redirect: '/systemmanage/RoleManage',
    meta: {
      title: 'authorityManage',
      icon: 'password'
    },
    children: [
      { path: 'rolemanage', component: () => import('@/views/systemmanage/RoleManage'), name: '角色管理', meta: { title: 'role' }},
      { path: 'adminmanage', component: () => import('@/views/systemmanage/AdminManage'), name: '管理员管理', meta: { title: 'adminManage' }},
      { path: 'roledetails', component: () => import('@/views/systemmanage/roleDetails'), name: '角色详情', hidden: true, meta: { title: 'roleDetails' }},
      { path: 'roleadd', component: () => import('@/views/systemmanage/roleAdd'), name: '新增角色', hidden: true, meta: { title: 'roleAdd' }},
      { path: 'admindetails', component: () => import('@/views/systemmanage/adminDetails'), name: '管理员详情', hidden: true, meta: { title: 'adminDetails' }}
    ]
  },

  {
    path: '/usermanage',
    component: Layout,
    children: [{
      path: 'usermanage',
      component: () => import('@/views/usermanage/UserManage'),
      name: '用户管理',
      meta: { title: 'userData', icon: 'peoples' }
    }]
  },

  {
    path: '/billmanage',
    component: Layout,
    redirect: 'noredirect',
    name: '账单',
    meta: {
      title: 'bill',
      icon: 'shoppingCard'
    },
    children: [
      { path: 'index', component: () => import('@/views/billmanage/index'), name: '账单管理', meta: { title: 'bill', icon: 'shoppingCard' }},
      { path: 'billdetails', component: () => import('@/views/billmanage/billDetails'), name: '账单详情', hidden: true, meta: { title: 'billDetails' }}
    ]
  },

  {
    path: '/contentmanage',
    component: Layout,
    redirect: 'noredirect',
    name: '内容管理',
    meta: {
      title: 'content',
      icon: 'message'
    },
    children: [
      { path: 'articlemanage', component: () => import('@/views/contentmanage/ArticleManage'), name: '文章管理', meta: { title: 'articleList' }},
      { path: 'editarticle', component: () => import('@/views/contentmanage/EditArticle'), name: '编辑文章', hidden: true, meta: { title: 'tinymce' }},
      { path: 'addarticle', component: () => import('@/views/contentmanage/AddArticle'), name: '新增文章', hidden: true, meta: { title: 'addArticle' }},
      // { path: 'fruittypes', component: () => import('@/views/contentmanage/FruitTypes'), name: 'fruit-types', meta: { title: 'fruitTypes' }},
      { path: 'purchasemanage', component: () => import('@/views/contentmanage/PurchaseManage'), name: '采购管理', meta: { title: 'purchaseManage' }},
      { path: 'purchasedetails', component: () => import('@/views/contentmanage/purchaseDetails'), name: '采购详情', hidden: true, meta: { title: 'purchaseDetails' }},
      { path: 'supplymanage', component: () => import('@/views/contentmanage/SupplyManage'), name: '供应管理', meta: { title: 'supplyManage' }},
      { path: 'supplydetails', component: () => import('@/views/contentmanage/supplyDetails'), name: '供应详情', hidden: true, meta: { title: 'supplyDetails' }},
      { path: 'fruitinfo', component: () => import('@/views/contentmanage/FruitInfo'), name: '水果信息管理', meta: { title: 'fruitInfo' }}
    ]
  },

  {
    path: '/systemparame',
    component: Layout,
    redirect: 'noredirect',
    name: '系统参数',
    meta: {
      title: 'systemParame',
      icon: 'international'
    },
    children: [
      { path: 'index', component: () => import('@/views/systemparame/index'), name: 'Banner', meta: { title: 'appBanner', icon: 'international' }},
      { path: 'editbanner', component: () => import('@/views/systemparame/editBanner'), name: '编辑Banner', hidden: true, meta: { title: 'editBanner' }}
    ]
  },

  // { path: '*', redirect: '/404', hidden: true }
]
