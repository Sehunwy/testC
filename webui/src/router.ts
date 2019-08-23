import Vue from "vue";
import Router from "vue-router";
import Layout from './views/main/main.vue';

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/basic/basic"),
      meta: { index: 0 },
      children:[
        {
          path: 'customer',
          name: 'customer',
          component: () => import("@/views/basic/customer/customer")
        },
        {
          path: 'relPersonCustomer',
          name: 'relPersonCustomer',
          component: () => import("@/views/basic/customer/relPersonCustomer")
        },
        {
          path: 'enterpriseBasicInfo',
          name: 'enterpriseBasicInfo',
          component: () => import("@/views/basic/enterprise/enterpriseBasicInfo")
        },
        {
          path: 'enterpriseList',
          name: 'enterpriseList',
          component: () => import("@/views/basic/enterprise/enterpriseList")
        },
        {
          path: 'organization',
          name: 'organization',
          component: () => import("@/views/basic/organization/organization")
        },
        {
          path: 'salesArea',
          name: 'salesArea',
          component: () => import("@/views/basic/salesArea/salesArea")
        },
        {
          path: 'person',
          name: 'person',
          component: () => import("@/views/basic/person/person")
        },
        {
          path: 'area',
          name: 'area',
          component: () => import("@/views/basic/area/area")
        },
        {
          path: 'dictionary',
          name: 'dictionary',
          component: () => import("@/views/basic/dictionary/dictionary")
        },
        {
          path: 'dictionaryTemplate',
          name: 'dictionaryTemplate',
          component: () => import("@/views/basic/dictionary/dictionaryTemplate")
        },
        {
          path: 'appAccountList',
          name: 'appAccountList',
          component: () => import("@/views/permission/appAccount/appAccountList")
        },
      ]
    },
    {
      path: "/business",
      name: "business",
      component: () => import("@/views/business/business"),
      meta: { index: 1 },
      children:[
        {
          path: 'attendanceList',
          name: 'attendanceList',
          component: () => import("@/views/business/attendance/attendanceList")
        },
        {
          path: 'visitList',
          name: 'visitList',
          component: () => import("@/views/business/visit/visitList")
        },
        {
          path: 'itemList',
          name: 'itemList',
          component: () => import("@/views/business/item/itemList")
        },
        {
          path: 'dailyReportList',
          name: 'dailyReportList',
          component: () => import("@/views/business/dailyReport/dailyReportList")
        },
      ]
    },
       

    {
      path: '/basicData',
      component: Layout,
      redirect: '/basicData/enterpriseBasicInformation',
      name: 'basicData',
      meta: { title: '基础数据'},
      children: [
        {
          path: 'enterpriseBasicInformation',
          component: () => import('@/views/basicData/index'),
          redirect: '/basicData/enterpriseBasicInformation/basicInformation',
          name: 'enterpriseBasicInformation',
          meta: { title: '企业基本信息' },
          children: [
            {
              path: 'basicInformation',
              component: () => import('@/views/basicData/enterpriseBasicInformation/basicInformation'),
              name: 'basicInformation',
              meta: { title: '企业基本资料' },
            },
            {
              path: 'organizationalStructure',
              component: () => import('@/views/basicData/enterpriseBasicInformation/organizationalStructure'),
              name: 'organizationalStructure',
              meta: { title: '组织架构' },
            },
           
          ],
        },
      ],
    },
    {
      path: '/businessData',
      component: Layout,
      redirect: '/businessData/attendanceManagement',
      name: 'businessData',
      meta: { title: '业务数据'},
      children: [
        {
          path: 'attendanceManagement',
          component: () => import('@/views/businessData/index'),
          redirect: '/businessData/attendanceManagement/punchList',
          name: 'attendanceManagement',
          meta: { title: '考勤管理' },
          children: [
            {
              path: 'punchList',
              component: () => import('@/views/businessData/attendanceManagement/punchList'),
              name: 'punchList',
              meta: { title: '打卡列表' },
            },
            {
              path: 'organizationalStructure',
              component: () => import('@/views/basicData/enterpriseBasicInformation/organizationalStructure'),
              name: 'organizationalStructure',
              meta: { title: '组织架构' },
            },
           
          ],
        },
      ],
    },
    {
      path: '/permission',
      component: Layout,
      redirect: '/permission/adminAccount',
      name: 'permission',
      meta: { title: '权限管理'},
      children: [
        {
          path: 'adminAccount',
          component: () => import('@/views/permission/adminAccount/adminAccount'),
          name: 'adminAccount',
          meta: { title: '管理员账户管理' },
        },
        {
          path: 'menuList',
          component: () => import('@/views/permission/menuList/menuList'),
          name: 'menuList',
          meta: { title: '菜单列表' },
        },
        {
          path: 'adminRole',
          component: () => import('@/views/permission/adminRole/adminRole'),
          name: 'adminRole',
          meta: { title: '管理员角色' },
        },
        {
          path: 'adminRolePermission',
          component: () => import('@/views/permission/adminRolePermission/adminRolePermission'),
          name: 'adminRolePermission',
          meta: { title: '管理员角色权限' },
        },
      ],
    },


    {
      path: '/main',
      component: Layout,
      redirect: '/main/basicInformation',
      name: 'main',
      meta: { title: 'main' },
      children: [
        {
          path: 'basicInformation',
          component: () => import( '@/views/basicData/enterpriseBasicInformation/basicInformation'),
          name: 'basicInformation',
          meta: { title: 'basicInformation' },
          },
      ],
    },

    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/login"),
      meta: { index: 2 }
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main/main"),
      meta: { index: 3,title:"main" }
    },
    {
      path: "/about",
      name: "about",
      component: () =>import("@/views/about/about")
    }
  ]
});
