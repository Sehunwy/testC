(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1587ae41"],{"46c4":function(t,e,i){"use strict";var a=i("b970"),o=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"bottom";Object(a["b"])({message:t,duration:e,position:i})},s=function(t,e){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=a["a"].alert({title:t,message:e,overlay:i,closeOnClickOverlay:!0});return o},n=function(t,e){var i=a["a"].confirm({title:t,message:e});return i},c={toastMessage:o,dialogAlert:s,dialogConfirm:n};e["a"]=c},"77fa":function(t,e,i){"use strict";var a=i("a848"),o=i.n(a);o.a},a848:function(t,e,i){},dc32:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("van-nav-bar",{staticClass:"headBar fixedHeader",on:{"click-left":t.goBack}},[i("span",{staticClass:"icon iconfont icon-fanhui headBarIcon",attrs:{slot:"left"},slot:"left"}),i("span",{staticClass:"headBarTitle",attrs:{slot:"title"},slot:"title"},[t._v("拜访完成")])]),i("div",{staticClass:"content contentTop",attrs:{id:"contentContainer"}},[i("div",{staticClass:"mainInfoContainer"},[i("div",{staticClass:"contentTitle van-ellipsis"},[i("span",[t._v(t._s(t.customerName))])]),t._m(0)]),i("div",{staticClass:"bodyContainer"},[i("div",{staticClass:"moreOperationContainer"},[i("div",{staticClass:"tips van-hairline--bottom"},[t._v("下面还有更多操作呢！")]),i("div",{staticClass:"otherOperationContaner"},[i("div",{on:{click:t.goCustomerDetails}},[i("div",{staticClass:"icon iconfont icon-client operationButton"}),i("div",{staticClass:"operationTitle"},[t._v("客户详情")])]),i("div",{on:{click:t.goCreateItem}},[i("div",{staticClass:"icon iconfont icon-todo operationButton"}),i("div",{staticClass:"operationTitle"},[t._v("创建事项")])]),i("div",{on:{click:t.goShare}},[i("div",{staticClass:"icon iconfont icon-icon_fabu operationButton"}),i("div",{staticClass:"operationTitle"},[t._v("分享")])])])])])])],1)},o=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"iconPosition"},[i("div",{staticClass:"icon iconfont icon-yiwancheng yiwancheng"})])}],s=(i("a481"),i("c665")),n=i("dc0a"),c=i("aa9a"),r=i("d328"),l=i("11d9"),u=i("9ab4"),d=i("2b0e"),v=i("60a3"),m=i("46c4"),f=function(t){function e(){var t;return Object(s["a"])(this,e),t=Object(r["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.visitId="",t.customerId="",t.customerName="",t}return Object(c["a"])(e,[{key:"created",value:function(){this.visitId=this.$route.query.visitId,this.customerId=this.$route.query.customerId,this.customerName=this.$route.query.customerName}},{key:"goCustomerDetails",value:function(){this.$router.replace({path:"/customerDetails",query:{id:this.customerId}})}},{key:"goCreateItem",value:function(){this.customerId&&this.customerName&&this.$router.replace({path:"/createItem",query:{customerId:this.customerId,customerName:this.customerName}})}},{key:"goShare",value:function(){m["a"].toastMessage("功能正在开发中!",2e3)}},{key:"goBack",value:function(){this.$router.back()}}]),Object(n["a"])(e,t),e}(d["default"]);f=u["a"]([v["a"]],f);var h=f,C=h,p=C,g=(i("77fa"),i("2877")),b=Object(g["a"])(p,a,o,!1,null,"d6123cfe",null);b.options.__file="visitCompleted.vue";e["default"]=b.exports}}]);