(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f0e61c5"],{"0bfb":function(t,e,i){"use strict";var a=i("cb7c");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"11e9":function(t,e,i){var a=i("52a7"),n=i("4630"),s=i("6821"),o=i("6a99"),r=i("69a8"),c=i("c69a"),l=Object.getOwnPropertyDescriptor;e.f=i("9e1e")?l:function(t,e){if(t=s(t),e=o(e,!0),c)try{return l(t,e)}catch(t){}if(r(t,e))return n(!a.f.call(t,e),t[e])}},"3b2b":function(t,e,i){var a=i("7726"),n=i("5dbc"),s=i("86cc").f,o=i("9093").f,r=i("aae3"),c=i("0bfb"),l=a.RegExp,u=l,f=l.prototype,m=/a/g,d=/a/g,v=new l(m)!==m;if(i("9e1e")&&(!v||i("79e5")(function(){return d[i("2b4c")("match")]=!1,l(m)!=m||l(d)==d||"/a/i"!=l(m,"i")}))){l=function(t,e){var i=this instanceof l,a=r(t),s=void 0===e;return!i&&a&&t.constructor===l&&s?t:n(v?new u(a&&!s?t.source:t,e):u((a=t instanceof l)?t.source:t,a&&s?c.call(t):e),i?this:f,l)};for(var h=function(t){t in l||s(l,t,{configurable:!0,get:function(){return u[t]},set:function(e){u[t]=e}})},I=o(u),b=0;I.length>b;)h(I[b++]);f.constructor=l,l.prototype=f,i("2aba")(a,"RegExp",l)}i("7a56")("RegExp")},"3cda":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"alignCenter width100"},[i("van-loading",{staticStyle:{display:"inline-block"}})],1)},n=[],s=i("c665"),o=i("dc0a"),r=i("d328"),c=i("11d9"),l=i("9ab4"),u=i("2b0e"),f=i("60a3"),m=function(t){function e(){return Object(s["a"])(this,e),Object(r["a"])(this,Object(c["a"])(e).apply(this,arguments))}return Object(o["a"])(e,t),e}(u["default"]);m=l["a"]([f["a"]],m);var d=m,v=d,h=v,I=(i("6e19"),i("2877")),b=Object(I["a"])(h,a,n,!1,null,"04a46e72",null);b.options.__file="crmLoading.vue";e["a"]=b.exports},"46c4":function(t,e,i){"use strict";var a=i("b970"),n=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"bottom";Object(a["b"])({message:t,duration:e,position:i})},s=function(t,e){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=a["a"].alert({title:t,message:e,overlay:i,closeOnClickOverlay:!0});return n},o=function(t,e){var i=a["a"].confirm({title:t,message:e});return i},r={toastMessage:n,dialogAlert:s,dialogConfirm:o};e["a"]=r},"52a7":function(t,e){e.f={}.propertyIsEnumerable},"5dbc":function(t,e,i){var a=i("d3f4"),n=i("8b97").set;t.exports=function(t,e,i){var s,o=e.constructor;return o!==i&&"function"==typeof o&&(s=o.prototype)!==i.prototype&&a(s)&&n&&n(t,s),t}},"6e19":function(t,e,i){"use strict";var a=i("82b3"),n=i.n(a);n.a},"82b3":function(t,e,i){},"8b97":function(t,e,i){var a=i("d3f4"),n=i("cb7c"),s=function(t,e){if(n(t),!a(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,a){try{a=i("9b43")(Function.call,i("11e9").f(Object.prototype,"__proto__").set,2),a(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,i){return s(t,i),e?t.__proto__=i:a(t,i),t}}({},!1):void 0),check:s}},9093:function(t,e,i){var a=i("ce10"),n=i("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return a(t,n)}},9290:function(t,e,i){"use strict";i("3b2b"),i("a481");var a=function(t,e){if(!t)return"";"string"===typeof t&&(t=new Date(t)),/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var i={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var a in i){var s=i[a]+"";new RegExp("(".concat(a,")")).test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?s:n(s)))}return e};function n(t){return("00"+t).substr(t.length)}var s=function(t){if(!t)return"暂无拜访信息";"string"===typeof t&&(t=new Date(t));var e=new Date,i=Math.abs(e.getTime()-t.getTime()),a=Math.floor(i/864e5);return a>99&&(a=99),0===a?"今日已拜访":1===a?"昨日已拜访":a+"天未拜访"},o=function(t){return t?"拜访中":"已完成"},r=function(t,e){if(!t)return"--";if(!e)return a(t,"hh:mm:ss");t=new Date(t),e=new Date(e);var i=Math.abs(t.getTime()-e.getTime()),n=Math.floor(i/36e5),s=Math.floor(i%36e5/6e4);return n+"小时"+s+"分钟"},c=function(t,e){if(!t||!e)return"--";t=new Date(t),e=new Date(e);var i=Math.abs(t.getTime()-e.getTime()),a=Math.floor(i/36e5),n=Math.floor(i%36e5/6e4);return a+"小时"+n+"分钟"},l=function(t){if(!t)return"--";t=new Date(t);var e=new Date;if(v(t,e))return"今天";var i=new Date(e.setDate(e.getDate()-1));return v(t,i)?"昨天":a(t,"yyyy-MM-dd")},u=function(t){return t&&"--"!==t?"今天"===t?"#ED340D":"昨天"===t?"#F68A1E":"#b2b2b2":"#b2b2b2"},f=function(t){return t?1==t?"一般":2==t?"高":"未知":"未知"},m=function(t){return t?1==t?"新建":2==t?"处理中":3==t?"已结束":"未知":"未知"},d=function(t){return t?1==t?"#3fcc8e":2==t?"#47EA1B":"#b2b2b2":"#b2b2b2"},v=function(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()},h=function(t){if(""===t||null===t||void 0===t||-1===t)return"--m";if("number"!==typeof t&&(t=parseFloat(t)),t<1e3)return t.toFixed(0)+" m";var e=(t/1e3).toFixed(1);return e+" km"},I=function(t){return t||"--"},b=function(t){return t?"在职":"离职"},g={formatDateTime:a,formatVisitDays:s,formatDistance:h,formatCustomerLevel:I,formatIncumbent:b,formatVisitState:o,formatVisitTime:r,formatVisitDuration:c,formatVisitDate:l,dateEquals:v,formatVisitDateColor:u,formatItemLevel:f,formatItemState:m,formatItemStateColor:d};e["a"]=g},"95c5":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("van-nav-bar",{staticClass:"headBar fixedHeader",on:{"click-left":t.goBack}},[i("span",{staticClass:"icon iconfont icon-fanhui headBarIcon",attrs:{slot:"left"},slot:"left"}),i("span",{staticClass:"headBarTitle",attrs:{slot:"title"},slot:"title"},[t._v("事项详情")])]),i("div",{staticClass:"content contentTop contentBottom",attrs:{id:"contentContainer"}},[i("crmLoading",{directives:[{name:"show",rawName:"v-show",value:t.isBusy,expression:"isBusy"}],staticStyle:{padding:"5px 0px"}}),i("div",{staticClass:"van-hairline--bottom",attrs:{id:"topInfo"}},[i("div",[i("van-tag",{attrs:{round:"",size:"medium",color:t._f("formatItemStateColor")(t.itemDetails.State)}},[t._v(t._s(t._f("formatItemState")(t.itemDetails.State)))])],1),i("div",[t._v(t._s(t._f("formatDateTime")(t.itemDetails.CreateTime)))]),i("div",{on:{click:t.confirmFinishItem}},[i("span",{staticClass:"iconfont icon-jieshu finishIcon",class:t.itemDetails.State===t.itemFinishState?"disableTabbarItem":"blackIcon"})])]),i("div",{attrs:{id:"itemInfoContainer"}},[i("div",{staticClass:"flexRowLayout itemInfoRow"},[i("div",{staticClass:"itemInfoTitle"},[t._v("客户：")]),i("div",{staticClass:"itemInfoContent"},[t._v(t._s(t.itemDetails.CustomerName))])]),i("div",{staticClass:"flexRowLayout itemInfoRow"},[i("div",{staticClass:"itemInfoTitle"},[t._v("事项：")]),i("div",{staticClass:"itemInfoContent"},[t._v(t._s(t.itemDetails.Name))])]),i("div",{staticClass:"flexRowLayout itemInfoRow"},[i("div",{staticClass:"itemInfoTitle"},[t._v("概述：")]),i("div",{staticClass:"itemInfoContent"},[t._v(t._s(t.itemDetails.Description))])]),i("div",{staticClass:"flexRowLayout itemInfoRow"},[i("div",{staticClass:"itemInfoTitle"},[t._v("分析：")]),i("div",{staticClass:"itemInfoContent"},[t._v(t._s(t.itemDetails.Analyze))])]),i("div",{staticClass:"flexRowLayout itemInfoRow"},[i("div",{staticClass:"itemInfoTitle"},[t._v("下一计划：")]),i("div",{staticClass:"itemInfoContent"},[i("span",[t._v(t._s(t.itemDetails.NextPlan))])])]),i("div",{staticClass:"flexRowLayout itemInfoRow"},[i("div",{staticClass:"itemInfoTitle"},[t._v("备注：")]),i("div",{staticClass:"itemInfoContent"},[t._v(t._s(t.itemDetails.Remark))])]),i("div",{staticClass:"flexRowLayout itemInfoRow"},[i("div",{staticClass:"itemInfoTitle"},[t._v("创建：")]),i("div",{staticClass:"itemInfoContent",staticStyle:{color:"#3fcc8e"}},[t._v(t._s(t.itemDetails.CreaterName))]),i("span",{staticClass:"icon iconfont icon-dianhua dialPhoneIcon",on:{click:function(e){e.stopPropagation(),t.dialPhoneNumber(t.itemDetails.CreaterPhone)}}})])]),t._l(t.itemDetails.ItemFlows,function(e,a){return i("div",{key:a,staticClass:"itemFlowContainer"},[i("van-row",{staticClass:"itemFlowDate"},[t._v(t._s(t._f("formatDateTime")(e.CreateTime)))]),i("div",{staticStyle:{"background-color":"white"}},[i("div",{staticClass:"van-hairline--bottom flexRowLayout itemFlowHeader"},[i("div",{staticClass:"executorsContainer van-ellipsis"},[t._v("执行人:"+t._s(t._f("formatExecutors")(e.Executors)))]),i("div",{on:{click:function(i){t.confirmDeleteItemFlow(e)}}},[i("span",{staticClass:"iconfont icon-delete deleteIcon",class:e.CreaterId!=t.currentPersonId||t.itemDetails.State==t.itemFinishState?"disableTabbarItem":"blackIcon"})])]),i("div",{staticClass:"itemFlowContent"},[i("div",{staticClass:"flexRowLayout detail"},[i("div",{staticClass:"detailTitle"},[t._v("描述：")]),i("div",{staticClass:"detailContent"},[t._v(t._s(e.Content))])]),i("div",{staticClass:"flexRowLayout detail"},[i("div",{staticClass:"detailTitle"},[t._v("分析：")]),i("div",{staticClass:"detailContent"},[t._v(t._s(e.Analyze))])]),i("div",{staticClass:"flexRowLayout detail"},[i("div",{staticClass:"detailTitle"},[t._v("下一计划：")]),i("div",{staticClass:"detailContent"},[t._v(t._s(e.NextPlan))])])]),i("div",{staticClass:"van-hairline--top flexRowLayout itemFlowHeader"},[i("div",{staticClass:"executorsContainer"},[t._v("创建:"+t._s(e.CreaterName))]),i("div",[i("span",{staticClass:"iconfont icon-changyonghuifu deleteIcon",on:{click:t.replyItemFlow}})])])])],1)})],2),i("van-tabbar",{attrs:{zIndex:101}},[i("van-tabbar-item",{class:t.itemDetails.State==t.itemFinishState?"disableTabbarItem":"bottomTabbarItem",on:{click:t.goCreateItemFlow}},[i("span",{staticClass:"icon iconfont icon-xinzeng2",attrs:{slot:"icon"},slot:"icon"}),i("span",[t._v("新增流程")])])],1)],1)},n=[],s=i("c665"),o=i("dc0a"),r=i("aa9a"),c=i("d328"),l=i("11d9"),u=i("9ab4"),f=i("2b0e"),m=i("60a3"),d=i("0063"),v=i.n(d),h=i("2b67"),I=i("9290"),b=i("3cda"),g=i("46c4"),p=function(t){function e(){var t;return Object(s["a"])(this,e),t=Object(c["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.itemDetails={},t.isBusy=!1,t.isBusyFinishItem=!1,t.isBusyDeleteItemFlow=!1,t.currentItemId="",t.currentPersonId="",t.itemFinishState=3,t}return Object(r["a"])(e,[{key:"created",value:function(){this.currentItemId=this.$route.query.id,this.currentPersonId=h["a"].instance.getPersonId(),this.getItemDetails()}},{key:"getItemDetails",value:function(){var t=this;this.isBusy=!0,this.$Api.invoke({moduleName:"crm.item.itemService",className:"ItemService",method:"getItemById",args:{id:this.currentItemId}}).then(function(e){e.data&&e.data.isSuccess?t.itemDetails=e.data.data:g["a"].toastMessage("查询事项详情失败!"+e.data.error)}).catch(function(t){g["a"].toastMessage("查询事项详情异常!"+t)}).finally(function(){t.isBusy=!1})}},{key:"confirmFinishItem",value:function(){var t=this;this.itemDetails&&this.itemDetails.Id&&(this.itemDetails.State!==this.itemFinishState?g["a"].dialogConfirm("温馨提示","请确认要结束此事项?").then(function(){t.finishItem()}).catch(function(){}):g["a"].toastMessage("事项已结束"))}},{key:"finishItem",value:function(){var t=this;this.isBusyFinishItem=!0,this.$Api.invoke({moduleName:"crm.item.itemService",className:"ItemService",method:"finishItem",args:{personId:this.currentPersonId,itemId:this.currentItemId}}).then(function(e){e.data&&e.data.isSuccess?(t.notifyRefreshItemIndicator(),t.getItemDetails()):g["a"].toastMessage("结束事项失败!"+e.data.error)}).catch(function(t){g["a"].toastMessage("结束事项异常!"+t)}).finally(function(){t.isBusyFinishItem=!1})}},{key:"notifyRefreshItemIndicator",value:function(){this.itemDetails&&this.itemDetails.CreaterId&&this.currentPersonId&&(this.itemDetails.CreaterId===this.currentPersonId?this.$store.commit("changeRefreshSelfItemIndicator"):this.$store.commit("changeRefreshSubItemIndicator"))}},{key:"confirmDeleteItemFlow",value:function(t){var e=this;t&&t.Id&&(this.itemDetails.State!==this.itemFinishState?t.CreaterId===this.currentPersonId?g["a"].dialogConfirm("温馨提示","请确认要删除此事项流程?").then(function(){e.deleteItemFlow(t)}).catch(function(){}):g["a"].toastMessage("您没有删除此流程权限"):g["a"].toastMessage("事项已结束,不能删除此事项流程"))}},{key:"deleteItemFlow",value:function(t){var e=this;this.isBusyDeleteItemFlow=!0,this.$Api.invoke({moduleName:"crm.item.itemService",className:"ItemService",method:"deleteItemFlow",args:{personId:this.currentPersonId,itemFlowId:t.Id}}).then(function(t){t.data&&t.data.isSuccess?e.getItemDetails():g["a"].toastMessage("删除事项流程失败!"+t.data.error)}).catch(function(t){g["a"].toastMessage("删除事项流程异常!"+t)}).finally(function(){e.isBusyDeleteItemFlow=!1})}},{key:"replyItemFlow",value:function(){g["a"].toastMessage("功能正在开发中!")}},{key:"goCreateItemFlow",value:function(){this.itemDetails.State!==this.itemFinishState?this.itemDetails&&this.itemDetails.Id&&this.$router.push({path:"/createItemFlow",query:{item:this.itemDetails}}):g["a"].toastMessage("事项已结束")}},{key:"goBack",value:function(){this.$router.back()}},{key:"dialPhoneNumber",value:function(t){t?window.location.href="tel:"+t:g["a"].toastMessage("此用户未配置电话信息,请联系管理员!",2e3)}}]),Object(o["a"])(e,t),e}(f["default"]);p=u["a"]([Object(m["a"])({components:{crmLoading:b["a"]},filters:{formatDateTime:function(t){return I["a"].formatDateTime(t,"yyyy-MM-dd hh:mm:ss")},formatItemState:function(t){return I["a"].formatItemState(t)},formatItemStateColor:function(t){return I["a"].formatItemStateColor(t)},formatExecutors:function(t){return t&&0!==t.length?v.a.from(t).select(function(t){return t.Name}).toJoinedString(";"):""}}})],p);var C=p,y=C,w=y,D=(i("cbcb"),i("2877")),_=Object(D["a"])(w,a,n,!1,null,"5c79e2fc",null);_.options.__file="itemDetails.vue";e["default"]=_.exports},aae3:function(t,e,i){var a=i("d3f4"),n=i("2d95"),s=i("2b4c")("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[s])?!!e:"RegExp"==n(t))}},b803:function(t,e,i){},cbcb:function(t,e,i){"use strict";var a=i("b803"),n=i.n(a);n.a}}]);