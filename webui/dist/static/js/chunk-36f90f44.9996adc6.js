(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36f90f44"],{3001:function(e,t,n){"use strict";n.r(t);var a,o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("van-nav-bar",{staticClass:"headBar fixedHeader",on:{"click-left":e.goBack,"click-right":e.createItemFlow}},[n("span",{staticClass:"icon iconfont icon-fanhui headBarIcon",attrs:{slot:"left"},slot:"left"}),n("span",{staticClass:"headBarTitle",attrs:{slot:"title"},slot:"title"},[e._v("新增流程")]),n("span",{staticClass:"icon iconfont icon-queding headBarIcon",attrs:{slot:"right"},slot:"right"})]),n("div",{staticClass:"content contentTop",attrs:{id:"contentContainer"}},[n("crmLoading",{directives:[{name:"show",rawName:"v-show",value:e.isBusy,expression:"isBusy"}]}),n("van-field",{attrs:{label:"描述",placeholder:"请输入描述内容","input-align":"right",type:"textarea",rows:"2",autosize:"",required:""},model:{value:e.newItemFlow.Content,callback:function(t){e.$set(e.newItemFlow,"Content",t)},expression:"newItemFlow.Content"}}),n("van-field",{attrs:{label:"分析",placeholder:"请输入分析内容","input-align":"right",type:"textarea",rows:"2",autosize:""},model:{value:e.newItemFlow.Analyze,callback:function(t){e.$set(e.newItemFlow,"Analyze",t)},expression:"newItemFlow.Analyze"}}),n("van-field",{attrs:{label:"下一计划",placeholder:"请输入下一步计划","input-align":"right",type:"textarea",rows:"2",autosize:""},model:{value:e.newItemFlow.NextPlan,callback:function(t){e.$set(e.newItemFlow,"NextPlan",t)},expression:"newItemFlow.NextPlan"}}),n("van-field",{attrs:{label:"执行人",placeholder:"请选择执行人","input-align":"right",type:"textarea",rows:"1",autosize:"",readonly:"","is-link":""},on:{click:function(t){e.openSelectPersonPopup()}},model:{value:e.displayExecutors,callback:function(t){e.displayExecutors=t},expression:"displayExecutors"}})],1),n("van-popup",{staticStyle:{height:"100%",width:"100%"},attrs:{overlay:!1,"close-on-click-overlay":!1,position:"right"},model:{value:e.showSelectPersonPopup,callback:function(t){e.showSelectPersonPopup=t},expression:"showSelectPersonPopup"}},[n("selectPerson",{attrs:{title:"选择执行人",maxCount:5},on:{goBack:e.closeSelectPersonPopup,complete:e.selectPersonComplete}})],1)],1)},s=[],r=n("c665"),i=n("dc0a"),c=n("aa9a"),l=n("d328"),u=n("11d9"),d=n("9ab4"),f=n("2b0e"),p=n("60a3"),h=n("0063"),m=n.n(h),v=n("2b67"),y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"fixedHeader"},[n("van-nav-bar",{staticClass:"headBar",on:{"click-left":e.goBack,"click-right":e.confirmComplete}},[n("span",{staticClass:"icon iconfont icon-fanhui headBarIcon",attrs:{slot:"left"},slot:"left"}),n("span",{staticClass:"headBarTitle",attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.title))]),n("span",{staticClass:"icon iconfont icon-queding headBarIcon",attrs:{slot:"right"},slot:"right"})])],1),n("div",{staticClass:"content contentTop",attrs:{id:"contentContainer"}},[n("van-checkbox-group",{attrs:{max:e.maxCount},model:{value:e.selectedPersons,callback:function(t){e.selectedPersons=t},expression:"selectedPersons"}},[n("mt-index-list",{attrs:{id:"personIndexList"}},[n("crmLoading",{directives:[{name:"show",rawName:"v-show",value:e.isBusy,expression:"isBusy"}],staticStyle:{padding:"5px 0px"}}),e._l(e.personListGroupByLetter,function(t,a){return n("mt-index-section",{key:a,attrs:{index:t.Letter}},[n("van-cell-group",e._l(t.PersonList,function(t,a){return n("van-cell",{key:a,attrs:{title:t.Name,label:t.IsSalesPerson?t.SalesArea:t.DirectDept,center:!0,clickable:""},on:{click:function(n){e.toggleCheckPerson(t)}}},[n("van-checkbox",{ref:"checkboxes",refInFor:!0,attrs:{name:t,"checked-color":"#3fcc8e"}})],1)}))],1)})],2)],1)],1)])},I=[],g=(n("c5f6"),n("ac6a"),n("7f7f"),n("76a0")),b=(n("8635"),n("f1a6"),n("ee8e")),w=n("3cda"),k=n("46c4");f["default"].component(g["IndexList"].name,g["IndexList"]),f["default"].component(g["IndexSection"].name,g["IndexSection"]);var P=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(l["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.selectedPersons=[],e.isBusy=!1,e.personList=[],e.personListGroupByLetter=[],e}return Object(c["a"])(t,[{key:"created",value:function(){this.getPersonList()}},{key:"getPersonList",value:function(){var e=this;this.isBusy=!0;var t=v["a"].instance.getEntCd();this.$Api.invoke({moduleName:"crm.basic.personService",className:"PersonService",method:"getIncumbentList",args:{entCd:t,incumbent:!0,keyword:""}}).then(function(t){t.data&&t.data.isSuccess?e.queryPersonSuccess(t):e.queryPersonFailed(t)}).catch(function(t){e.queryPersonException(t)}).finally(function(){e.isBusy=!1})}},{key:"queryPersonSuccess",value:function(e){var t=this;this.personList=[],e.data.data&&0!==e.data.data.length?(e.data.data.forEach(function(e){e.Letter=b["a"].instance.initialTreatment(e.Name),t.personList.push(e)}),this.personListGroupByLetter=m.a.from(this.personList).groupBy(function(e){return e.Letter},function(e){return e},function(e,t){return{Letter:e,PersonList:t.toArray()}}).orderBy(function(e){return e.Letter}).toArray()):this.personListGroupByLetter=[]}},{key:"queryPersonFailed",value:function(e){k["a"].toastMessage("查询人员列表出错!"+e.data.error),console.log(e)}},{key:"queryPersonException",value:function(e){k["a"].toastMessage("查询人员列表异常!"+e),console.log(e)}},{key:"toggleCheckPerson",value:function(e){if(e&&this.$refs.checkboxes){var t=m.a.from(this.$refs.checkboxes).where(function(t){return t.name.Id===e.Id}).firstOrDefault();t&&t.toggle()}}},{key:"goBack",value:function(){}},{key:"confirmComplete",value:function(){this.selectedPersons&&0!==this.selectedPersons.length?this.complete():k["a"].dialogAlert("提示","还未选择人员!")}},{key:"complete",value:function(){return this.selectedPersons}}]),Object(i["a"])(t,e),t}(f["default"]);d["a"]([Object(p["d"])({default:"选择人员"}),d["b"]("design:type",String)],P.prototype,"title",void 0),d["a"]([Object(p["d"])({default:0}),d["b"]("design:type","function"===typeof(a="undefined"!==typeof Number&&Number)?a:Object)],P.prototype,"maxCount",void 0),d["a"]([Object(p["b"])("goBack"),d["b"]("design:type",Function),d["b"]("design:paramtypes",[]),d["b"]("design:returntype",void 0)],P.prototype,"goBack",null),d["a"]([Object(p["b"])("complete"),d["b"]("design:type",Function),d["b"]("design:paramtypes",[]),d["b"]("design:returntype",void 0)],P.prototype,"complete",null),P=d["a"]([Object(p["a"])({components:{crmLoading:w["a"]}})],P);var x=P,S=x,C=S,N=(n("e819"),n("d447"),n("2877")),F=Object(N["a"])(C,y,I,!1,null,"6f61c45c",null);F.options.__file="selectPerson.vue";var L=F.exports,B=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(l["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.currentItem=null,e.currentPersonId="",e.isBusy=!1,e.showSelectPersonPopup=!1,e.displayExecutors="",e.newItemFlow={ItemId:"",Content:"",Analyze:"",NextPlan:"",Executors:[]},e}return Object(c["a"])(t,[{key:"created",value:function(){this.currentItem=this.$route.query.item,this.currentPersonId=v["a"].instance.getPersonId(),this.newItemFlow.ItemId=this.currentItem.Id}},{key:"createItemFlow",value:function(){var e=this;this.checkInput()&&(this.isBusy=!0,this.$Api.invoke({moduleName:"crm.item.itemService",className:"ItemService",method:"createItemFlow",args:{personId:this.currentPersonId,itemId:this.currentItem.Id,itemFlow:this.newItemFlow}}).then(function(t){t.data&&t.data.isSuccess?(e.notifyRefreshItemIndicator(),e.goBack()):(k["a"].toastMessage("新增事项流程失败!"+t.data.error),console.log(t))}).catch(function(e){k["a"].toastMessage("新增事项流程异常!"+e),console.log(e)}).finally(function(){e.isBusy=!1}))}},{key:"notifyRefreshItemIndicator",value:function(){this.currentItem&&this.currentItem.CreaterId&&this.currentPersonId&&(this.currentItem.CreaterId===this.currentPersonId?this.$store.commit("changeRefreshSelfItemIndicator"):this.$store.commit("changeRefreshSubItemIndicator"))}},{key:"checkInput",value:function(){return this.currentItem&&this.currentItem.Id?!!this.newItemFlow.Content||(k["a"].toastMessage("请输入流程描述!"),!1):(k["a"].toastMessage("页面参数异常!"),!1)}},{key:"openSelectPersonPopup",value:function(){this.showSelectPersonPopup=!0}},{key:"closeSelectPersonPopup",value:function(){this.showSelectPersonPopup=!1}},{key:"selectPersonComplete",value:function(e){if(!e||0===e.length)return this.newItemFlow.Executors=[],void(this.displayExecutors="");var t=m.a.from(e).select(function(e){return{Id:e.Id,Name:e.Name}}).toArray();this.newItemFlow.Executors=t,console.log(this.newItemFlow.Executors),this.displayExecutors=m.a.from(e).select(function(e){return e.Name}).toJoinedString(";"),this.closeSelectPersonPopup()}},{key:"goBack",value:function(){this.$router.back()}}]),Object(i["a"])(t,e),t}(f["default"]);B=d["a"]([Object(p["a"])({components:{crmLoading:w["a"],selectPerson:L}})],B);var E=B,O=E,_=O,j=(n("eaba"),Object(N["a"])(_,o,s,!1,null,"2201456a",null));j.options.__file="createItemFlow.vue";t["default"]=j.exports},"3cda":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"alignCenter width100"},[n("van-loading",{staticStyle:{display:"inline-block"}})],1)},o=[],s=n("c665"),r=n("dc0a"),i=n("d328"),c=n("11d9"),l=n("9ab4"),u=n("2b0e"),d=n("60a3"),f=function(e){function t(){return Object(s["a"])(this,t),Object(i["a"])(this,Object(c["a"])(t).apply(this,arguments))}return Object(r["a"])(t,e),t}(u["default"]);f=l["a"]([d["a"]],f);var p=f,h=p,m=h,v=(n("6e19"),n("2877")),y=Object(v["a"])(m,a,o,!1,null,"04a46e72",null);y.options.__file="crmLoading.vue";t["a"]=y.exports},4402:function(e,t,n){},"6e19":function(e,t,n){"use strict";var a=n("82b3"),o=n.n(a);o.a},"82b3":function(e,t,n){},aa77:function(e,t,n){var a=n("5ca1"),o=n("be13"),s=n("79e5"),r=n("fdef"),i="["+r+"]",c="​",l=RegExp("^"+i+i+"*"),u=RegExp(i+i+"*$"),d=function(e,t,n){var o={},i=s(function(){return!!r[e]()||c[e]()!=c}),l=o[e]=i?t(f):r[e];n&&(o[n]=l),a(a.P+a.F*i,"String",o)},f=d.trim=function(e,t){return e=String(o(e)),1&t&&(e=e.replace(l,"")),2&t&&(e=e.replace(u,"")),e};e.exports=d},aea5:function(e,t,n){},c5f6:function(e,t,n){"use strict";var a=n("7726"),o=n("69a8"),s=n("2d95"),r=n("5dbc"),i=n("6a99"),c=n("79e5"),l=n("9093").f,u=n("11e9").f,d=n("86cc").f,f=n("aa77").trim,p="Number",h=a[p],m=h,v=h.prototype,y=s(n("2aeb")(v))==p,I="trim"in String.prototype,g=function(e){var t=i(e,!1);if("string"==typeof t&&t.length>2){t=I?t.trim():f(t,3);var n,a,o,s=t.charCodeAt(0);if(43===s||45===s){if(n=t.charCodeAt(2),88===n||120===n)return NaN}else if(48===s){switch(t.charCodeAt(1)){case 66:case 98:a=2,o=49;break;case 79:case 111:a=8,o=55;break;default:return+t}for(var r,c=t.slice(2),l=0,u=c.length;l<u;l++)if(r=c.charCodeAt(l),r<48||r>o)return NaN;return parseInt(c,a)}}return+t};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof h&&(y?c(function(){v.valueOf.call(n)}):s(n)!=p)?r(new m(g(t)),n,h):g(t)};for(var b,w=n("9e1e")?l(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;w.length>k;k++)o(m,b=w[k])&&!o(h,b)&&d(h,b,u(m,b));h.prototype=v,v.constructor=h,n("2aba")(a,p,h)}},d447:function(e,t,n){"use strict";var a=n("e7b1"),o=n.n(a);o.a},e7b1:function(e,t,n){},e819:function(e,t,n){"use strict";var a=n("4402"),o=n.n(a);o.a},eaba:function(e,t,n){"use strict";var a=n("aea5"),o=n.n(a);o.a},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);