import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/main",
      name: "main",
      component: () => import("@/MobileApp/main/main"),
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: "visit",
          name: "visit",
          component: () => import("@/MobileApp/main/visit/visit"),
          meta: {
            keepAlive: true
          }
        },
        {
          path: "item",
          name: "item",
          component: () => import("@/MobileApp/main/item/item"),
          meta: {
            keepAlive: true
          }
        },
        {
          path: "customer",
          name: "customer",
          component: () => import("@/MobileApp/main/customer/customer"),
          meta: {
            keepAlive: true
          }
        },
        {
          path: "message",
          name: "message",
          component: () => import("@/MobileApp/main/message/message"),
          meta: {
            keepAlive: true
          }
        },
        {
          path: "workbench",
          name: "workbench",
          component: () => import("@/MobileApp/main/workbench/workbench"),
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    {
      path: "/",
      name: "welcome",
      component: () => import("@/MobileApp/welcome/welcome"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("@/MobileApp/signin/signin"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/MobileApp/signup/signup"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/visitLocation",
      name: "visitLocation",
      component: () => import("@/MobileApp/main/visit/visitLocation"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/createVisit",
      name: "createVisit",
      component: () => import("@/MobileApp/main/visit/createVisit"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/createVisitAdditional",
      name: "createVisitAdditional",
      component: () => import("@/MobileApp/main/visit/createVisitAdditional"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/visitCompleted",
      name: "visitCompleted",
      component: () => import("@/MobileApp/main/visit/visitCompleted"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/visitDetails",
      name: "visitDetails",
      component: () => import("@/MobileApp/main/visit/visitDetails"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/visitSelectCustomer",
      name: "visitSelectCustomer",
      component: () => import("@/MobileApp/main/visit/visitSelectCustomer"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/createCustomer/:location",
      name: "createCustomer",
      component: () => import("@/MobileApp/main/customer/createCustomer"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/customerDetails",
      name: "customerDetails",
      component: () => import("@/MobileApp/main/customer/customerDetails"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/customerLocation",
      name: "customerLocation",
      component: () => import("@/MobileApp/main/customer/customerLocation"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/personDetails",
      name: "personDetails",
      component: () => import("@/MobileApp/main/person/personDetails"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/report",
      name: "report",
      component: () => import("@/MobileApp/main/report/report"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/dailyList",
      name: "dailyList",
      component: () => import("@/MobileApp/main/daily/dailyList"),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/createDaily",
      name: "createDaily",
      component: () => import("@/MobileApp/main/daily/createDaily"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/dailyDetails",
      name: "dailyDetails",
      component: () => import("@/MobileApp/main/daily/dailyDetails"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/createItem",
      name: "createItem",
      component: () => import("@/MobileApp/main/item/createItem"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/itemDetails",
      name: "itemDetails",
      component: () => import("@/MobileApp/main/item/itemDetails"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/changePassword",
      name: "changePassword",
      component: () => import("@/MobileApp/main/workbench/changePassword"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/createContact",
      name: "createContact",
      component: () => import("@/MobileApp/main/customer/createContact"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/createItemFlow",
      name: "createItemFlow",
      component: () => import("@/MobileApp/main/item/createItemFlow"),
      meta: {
        keepAlive: false
      }
    }
  ]
});
