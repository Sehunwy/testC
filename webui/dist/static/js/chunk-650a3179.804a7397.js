(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-650a3179"],{"01a2":function(t,e,n){"use strict";var a,i,o,s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"backTopButton",style:{right:t.right+"px",bottom:t.bottom+"px"}},[n("transition",{attrs:{name:"van-fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showBackTop,expression:"showBackTop"}],on:{touchstart:function(e){return e.stopPropagation(),t.backTop(e)}}},[n("span",{staticClass:"icon iconfont icon-huidaodingbu"})])])],1)},r=[],c=(n("c5f6"),n("c665")),l=n("dc0a"),u=n("aa9a"),h=n("d328"),f=n("11d9"),d=n("9ab4"),p=n("2b0e"),g=n("60a3"),m=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(h["a"])(this,Object(f["a"])(e).apply(this,arguments)),t.container=null,t.showBackTop=!1,t.totalScrollTime=300,t.step=0,t.stepScrollTime=10,t.currentTimer=null,t}return Object(u["a"])(e,[{key:"mounted",value:function(){this.$nextTick(function(){this.container=document.getElementById(this.containerId)})}},{key:"onContainerChange",value:function(t,e){this.addScrollEventListener()}},{key:"addScrollEventListener",value:function(){this.container&&this.container.addEventListener("scroll",this.onScrollChange)}},{key:"activated",value:function(){this.onScrollChange()}},{key:"onScrollChange",value:function(){if(this.container){var t=this.container.scrollTop;this.showBackTop=t>=this.distance}}},{key:"backTop",value:function(){this.targetElement?this.targetElement.scrollIntoView():this.container.scrollTop=0}},{key:"startScroll",value:function(){var t=this;this.container.scrollTop-=this.step,this.container.scrollTop<=0||(this.currentTimer=setInterval(function(){t.container.scrollTop-=t.step,t.container.scrollTop<=0&&clearInterval(t.currentTimer)},this.stepScrollTime))}},{key:"destroyed",value:function(){this.container&&this.container.removeEventListener("scroll",this.onScrollChange)}}]),Object(l["a"])(e,t),e}(p["default"]);d["a"]([Object(g["d"])({default:40}),d["b"]("design:type","function"===typeof(a="undefined"!==typeof Number&&Number)?a:Object)],m.prototype,"right",void 0),d["a"]([Object(g["d"])({default:70}),d["b"]("design:type","function"===typeof(i="undefined"!==typeof Number&&Number)?i:Object)],m.prototype,"bottom",void 0),d["a"]([Object(g["d"])({default:300}),d["b"]("design:type","function"===typeof(o="undefined"!==typeof Number&&Number)?o:Object)],m.prototype,"distance",void 0),d["a"]([Object(g["d"])({default:""}),d["b"]("design:type",String)],m.prototype,"containerId",void 0),d["a"]([Object(g["d"])({default:null}),d["b"]("design:type",Object)],m.prototype,"targetElement",void 0),d["a"]([Object(g["f"])("container"),d["b"]("design:type",Function),d["b"]("design:paramtypes",[Object,Object]),d["b"]("design:returntype",void 0)],m.prototype,"onContainerChange",null),m=d["a"]([g["a"]],m);var v=m,y=v,C=y,b=(n("e608"),n("2877")),w=Object(b["a"])(C,s,r,!1,null,"06b594a0",null);w.options.__file="crmBackTop.vue";e["a"]=w.exports},"0bfb":function(t,e,n){"use strict";var a=n("cb7c");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"11e9":function(t,e,n){var a=n("52a7"),i=n("4630"),o=n("6821"),s=n("6a99"),r=n("69a8"),c=n("c69a"),l=Object.getOwnPropertyDescriptor;e.f=n("9e1e")?l:function(t,e){if(t=o(t),e=s(e,!0),c)try{return l(t,e)}catch(t){}if(r(t,e))return i(!a.f.call(t,e),t[e])}},"23b6":function(t,e,n){"use strict";var a=n("f518"),i=n.n(a);i.a},"23f6":function(t,e,n){},2471:function(t,e){var n=window.BMapLib=n||{};(function(){var t=6370996.81,e=n.GeoUtils=function(){};function a(t,e,n){return null!=e&&(t=Math.max(t,e)),null!=n&&(t=Math.min(t,n)),t}function i(t,e,n){while(t>n)t-=n-e;while(t<e)t+=n-e;return t}e.isPointInRect=function(t,e){if(!(t instanceof BMap.Point)||!(e instanceof BMap.Bounds))return!1;var n=e.getSouthWest(),a=e.getNorthEast();return t.lng>=n.lng&&t.lng<=a.lng&&t.lat>=n.lat&&t.lat<=a.lat},e.isPointInCircle=function(t,n){if(!(t instanceof BMap.Point)||!(n instanceof BMap.Circle))return!1;var a=n.getCenter(),i=n.getRadius(),o=e.getDistance(t,a);return o<=i},e.isPointOnPolyline=function(t,e){if(!(t instanceof BMap.Point)||!(e instanceof BMap.Polyline))return!1;var n=e.getBounds();if(!this.isPointInRect(t,n))return!1;for(var a=e.getPath(),i=0;i<a.length-1;i++){var o=a[i],s=a[i+1];if(t.lng>=Math.min(o.lng,s.lng)&&t.lng<=Math.max(o.lng,s.lng)&&t.lat>=Math.min(o.lat,s.lat)&&t.lat<=Math.max(o.lat,s.lat)){var r=(o.lng-t.lng)*(s.lat-t.lat)-(s.lng-t.lng)*(o.lat-t.lat);if(r<2e-10&&r>-2e-10)return!0}}return!1},e.isPointInPolygon=function(t,e){if(!(t instanceof BMap.Point)||!(e instanceof BMap.Polygon))return!1;var n=e.getBounds();if(!this.isPointInRect(t,n))return!1;var a,i,o=e.getPath(),s=o.length,r=!0,c=0,l=2e-10,u=t;a=o[0];for(var h=1;h<=s;++h){if(u.equals(a))return r;if(i=o[h%s],u.lat<Math.min(a.lat,i.lat)||u.lat>Math.max(a.lat,i.lat))a=i;else{if(u.lat>Math.min(a.lat,i.lat)&&u.lat<Math.max(a.lat,i.lat)){if(u.lng<=Math.max(a.lng,i.lng)){if(a.lat==i.lat&&u.lng>=Math.min(a.lng,i.lng))return r;if(a.lng==i.lng){if(a.lng==u.lng)return r;++c}else{var f=(u.lat-a.lat)*(i.lng-a.lng)/(i.lat-a.lat)+a.lng;if(Math.abs(u.lng-f)<l)return r;u.lng<f&&++c}}}else if(u.lat==i.lat&&u.lng<=i.lng){var d=o[(h+1)%s];u.lat>=Math.min(a.lat,d.lat)&&u.lat<=Math.max(a.lat,d.lat)?++c:c+=2}a=i}}return c%2!=0},e.degreeToRad=function(t){return Math.PI*t/180},e.radToDegree=function(t){return 180*t/Math.PI},e.getDistance=function(n,o){return n instanceof BMap.Point&&o instanceof BMap.Point?(n.lng=i(n.lng,-180,180),n.lat=a(n.lat,-74,74),o.lng=i(o.lng,-180,180),o.lat=a(o.lat,-74,74),s=e.degreeToRad(n.lng),c=e.degreeToRad(n.lat),r=e.degreeToRad(o.lng),l=e.degreeToRad(o.lat),t*Math.acos(Math.sin(c)*Math.sin(l)+Math.cos(c)*Math.cos(l)*Math.cos(r-s))):0;var s,r,c,l},e.getPolylineDistance=function(t){if(t instanceof BMap.Polyline||t instanceof Array){var n;if(n=t instanceof BMap.Polyline?t.getPath():t,n.length<2)return 0;for(var a=0,i=0;i<n.length-1;i++){var o=n[i],s=n[i+1],r=e.getDistance(o,s);a+=r}return a}return 0},e.getPolygonArea=function(e){if(!(e instanceof BMap.Polygon)&&!(e instanceof Array))return 0;var n;if(n=e instanceof BMap.Polygon?e.getPath():e,n.length<3)return 0;for(var a,i,o=0,s=0,r=0,c=0,l=0,u=0,h=0,f=0,d=0,p=0,g=0,m=0,v=0,y=0,C=0,b=0,w=0,S=0,k=0,x=0,M=0,D=0,T=0,L=0,P=0,_=0,N=0,B=0,O=0,I=0,E=0,A=0,j=0,F=0,R=t,q=n.length,H=0;H<q;H++)0==H?(s=n[q-1].lng*Math.PI/180,r=n[q-1].lat*Math.PI/180,c=n[0].lng*Math.PI/180,l=n[0].lat*Math.PI/180,u=n[1].lng*Math.PI/180,h=n[1].lat*Math.PI/180):H==q-1?(s=n[q-2].lng*Math.PI/180,r=n[q-2].lat*Math.PI/180,c=n[q-1].lng*Math.PI/180,l=n[q-1].lat*Math.PI/180,u=n[0].lng*Math.PI/180,h=n[0].lat*Math.PI/180):(s=n[H-1].lng*Math.PI/180,r=n[H-1].lat*Math.PI/180,c=n[H].lng*Math.PI/180,l=n[H].lat*Math.PI/180,u=n[H+1].lng*Math.PI/180,h=n[H+1].lat*Math.PI/180),f=Math.cos(l)*Math.cos(c),d=Math.cos(l)*Math.sin(c),p=Math.sin(l),g=Math.cos(r)*Math.cos(s),m=Math.cos(r)*Math.sin(s),v=Math.sin(r),y=Math.cos(h)*Math.cos(u),C=Math.cos(h)*Math.sin(u),b=Math.sin(h),w=(f*f+d*d+p*p)/(f*g+d*m+p*v),S=(f*f+d*d+p*p)/(f*y+d*C+p*b),k=w*g-f,x=w*m-d,M=w*v-p,D=S*y-f,T=S*C-d,L=S*b-p,O=(D*k+T*x+L*M)/(Math.sqrt(D*D+T*T+L*L)*Math.sqrt(k*k+x*x+M*M)),O=Math.acos(O),P=T*M-L*x,_=0-(D*M-L*k),N=D*x-T*k,B=0!=f?P/f:0!=d?_/d:N/p,B>0?(I+=O,j++):(E+=O,A++);return a=I+(2*Math.PI*A-E),i=2*Math.PI*j-I+E,F=I>E?a-(q-2)*Math.PI<1?a:i:i-(q-2)*Math.PI<1?i:a,o=(F-(q-2)*Math.PI)*R*R,o}})()},3124:function(t,e,n){},"3b2b":function(t,e,n){var a=n("7726"),i=n("5dbc"),o=n("86cc").f,s=n("9093").f,r=n("aae3"),c=n("0bfb"),l=a.RegExp,u=l,h=l.prototype,f=/a/g,d=/a/g,p=new l(f)!==f;if(n("9e1e")&&(!p||n("79e5")(function(){return d[n("2b4c")("match")]=!1,l(f)!=f||l(d)==d||"/a/i"!=l(f,"i")}))){l=function(t,e){var n=this instanceof l,a=r(t),o=void 0===e;return!n&&a&&t.constructor===l&&o?t:i(p?new u(a&&!o?t.source:t,e):u((a=t instanceof l)?t.source:t,a&&o?c.call(t):e),n?this:h,l)};for(var g=function(t){t in l||o(l,t,{configurable:!0,get:function(){return u[t]},set:function(e){u[t]=e}})},m=s(u),v=0;m.length>v;)g(m[v++]);h.constructor=l,l.prototype=h,n("2aba")(a,"RegExp",l)}n("7a56")("RegExp")},"46c4":function(t,e,n){"use strict";var a=n("b970"),i=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"bottom";Object(a["b"])({message:t,duration:e,position:n})},o=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=a["a"].alert({title:t,message:e,overlay:n,closeOnClickOverlay:!0});return i},s=function(t,e){var n=a["a"].confirm({title:t,message:e});return n},r={toastMessage:i,dialogAlert:o,dialogConfirm:s};e["a"]=r},"4f5c":function(t,e,n){"use strict";var a=n("23f6"),i=n.n(a);i.a},"52a7":function(t,e){e.f={}.propertyIsEnumerable},"5b69":function(t,e,n){"use strict";n("2471");e["a"]={init:function(){var t="cxe5IvbUduawnAEdG2B8ChKLcSk94lqQ",e="https://api.map.baidu.com/api?v=3.0&ak="+t+"&callback=onBMapCallback";return new Promise(function(t,n){if("undefined"!==typeof BMap)return console.log("百度地图脚本已初始化..."),t(BMap),!0;window.onBMapCallback=function(){console.log("百度地图脚本初始化成功..."),t(BMap)};var a=document.createElement("script");a.onerror=function(){n("百度地图脚本加载失败!")},a.setAttribute("type","text/javascript"),a.setAttribute("src",e),document.body.appendChild(a)})},getGeolocation:function(){var t=this,e=new Promise(function(e,n){t.init().then(function(a){var i=new a.Geolocation;i.enableSDKLocation(),i.getCurrentPosition(function(a){var o=i.getStatus();if(o===BMAP_STATUS_SUCCESS)e(a);else{var s=t.getGeolocationStatusMessage(o);n(s)}},{enableHighAccuracy:!0,timeout:5e3})}).catch(function(t){n(JSON.stringify(t))})});return e},getGeolocationStatusMessage:function(t){var e="";return e=t===BMAP_STATUS_SUCCESS?"定位成功!":t===BMAP_STATUS_UNKNOWN_LOCATION?"位置结果未知!":t===BMAP_STATUS_PERMISSION_DENIED?"没有获取位置权限!":t===BMAP_STATUS_TIMEOUT?"请求超时,请重试!":"未知错误"+t,e},getDistance:function(t,e){return BMapLib.GeoUtils.getDistance(t,e)},generateAddressDesc:function(t){var e="";return t?(t.city&&(e+=t.city),t.district&&(e+=t.district),t.street&&(e+=t.street),t.street_number&&(e+=t.street_number),e):e}}},"5dbc":function(t,e,n){var a=n("d3f4"),i=n("8b97").set;t.exports=function(t,e,n){var o,s=e.constructor;return s!==n&&"function"==typeof s&&(o=s.prototype)!==n.prototype&&a(o)&&i&&i(t,o),t}},"67fa":function(t,e,n){"use strict";var a=n("c816"),i=n.n(a);i.a},"8b45":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"fixedHeader"},[n("van-nav-bar",{staticClass:"headBar",on:{"click-right":t.goCreateCustomer}},[n("span",{staticClass:"headBarTitle",attrs:{slot:"title"},slot:"title"},[t._v("客户")]),n("span",{staticClass:"icon iconfont icon-xinzeng2 headBarIcon",attrs:{slot:"right"},slot:"right"})]),n("customerDropDown",{attrs:{enableFilterDropdown:!1},on:{onSelectSortOption:t.sortOptionChanged,onSearch:t.openSearchCustomerPopup}})],1),n("div",{ref:"contentContainer",staticClass:"content contentBottom",attrs:{id:"contentContainer"}},[n("div",{staticClass:"van-hairline--bottom",attrs:{id:"totalCountContainer"}},[n("span",[t._v("共有"+t._s(t.customerCount)+"家客户")])]),n("van-pull-refresh",{on:{refresh:t.reloadCustomerDatas},model:{value:t.isLoadingRefresh,callback:function(e){t.isLoadingRefresh=e},expression:"isLoadingRefresh"}},[n("van-list",{staticClass:"crmVanList",attrs:{finished:t.finished,"immediate-check":!1,"finished-text":"没有更多了"},on:{load:t.loadNextCustomerDatas},model:{value:t.isLoadingNext,callback:function(e){t.isLoadingNext=e},expression:"isLoadingNext"}},t._l(t.customerList,function(e,a){return n("div",{key:a,staticClass:"itemContainer",on:{click:function(n){t.goCustomerDetails(e.Id)}}},[n("van-row",{attrs:{type:"flex",align:"center"}},[n("van-col",{staticStyle:{color:"red","align-self":"flex-start"},attrs:{span:"1"}},[n("span",{staticStyle:{color:"#3fcc8e","font-size":"12px"}},[t._v("◤")])]),n("van-col",{attrs:{span:"17"}},[n("div",{staticStyle:{padding:"5px 0px"}},[n("div",{staticClass:"subNameText van-ellipsis"},[t._v(t._s(e.Name))]),n("div",{staticClass:"subAddressText flexRowLayout",staticStyle:{"justify-content":"flex-start"}},[n("span",{staticClass:"icon iconfont icon-location",staticStyle:{"font-size":"12px"}}),n("div",{staticClass:"van-ellipsis",staticStyle:{"margin-left":"2px"}},[t._v(t._s(e.Address))])]),n("div",{staticClass:"subListText flexRowLayout"},[n("div",[n("span",{staticStyle:{color:"#3fcc8e"}},[t._v(t._s(t._f("formatVisitDays")(e.LastVisitTime)))])]),n("div",[n("span",[t._v(t._s(t._f("formatCustomerLevel")(e.Level)))])]),n("div",[n("span",[t._v(t._s(t._f("formatDateTime")(e.CreateTime)))])])])])]),n("van-col",{attrs:{span:"6"}},[n("div",{staticClass:"flexColumnLayout",staticStyle:{height:"100%","justify-content":"space-around","align-items":"flex-end","padding-right":"10px"}},[n("div",{staticStyle:{height:"16px"}},[n("van-tag",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{round:"",color:"#3fcc8e"}},[t._v("拜访中")])],1),n("div",{staticClass:"flexRowLayout",staticStyle:{height:"24px","line-height":"24px"}},[n("van-tag",{directives:[{name:"show",rawName:"v-show",value:t.showDistanceLabel,expression:"showDistanceLabel"}],attrs:{plain:"",color:"#f2826a"}},[t._v(t._s(t._f("formatDistance")(e.Distance)))]),n("span",{staticClass:"icon iconfont icon-gengduo",staticStyle:{color:"#d7d7d7","font-size":"16pt"}})],1),n("div",{staticStyle:{height:"16px"}})])])],1)],1)}))],1),n("crmBackTop",{attrs:{containerId:"contentContainer"}})],1),n("van-popup",{staticStyle:{height:"100%",width:"100%","margin-top":"0px"},attrs:{overlay:!1,"close-on-click-overlay":!1,position:"right"},model:{value:t.showSearchCustomer,callback:function(e){t.showSearchCustomer=e},expression:"showSearchCustomer"}},[n("searchCustomer",{on:{onCancelSearch:t.cancelSearchCustomer,searchComplete:t.onSearchComplete}})],1)],1)},i=[],o=n("c665"),s=n("dc0a"),r=n("aa9a"),c=n("d328"),l=n("11d9"),u=n("9ab4"),h=n("2b0e"),f=n("60a3"),d=n("2b67"),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mainContainer"},[n("div",{staticClass:"barContainer"},[n("div",{staticClass:"barItem rightBorder",class:{activeColor:t.showSortDropdown},on:{click:t.openSortDropdown}},[n("span",{directives:[{name:"show",rawName:"v-show",value:t.defaultSort.Asc,expression:"defaultSort.Asc"}],staticClass:"icon iconfont icon-paixu-shengxu"}),n("span",{directives:[{name:"show",rawName:"v-show",value:!t.defaultSort.Asc,expression:"!defaultSort.Asc"}],staticClass:"icon iconfont icon-paixu-jiangxu"}),n("span",{staticClass:"barContainerText"},[t._v(t._s(t.defaultSort.SimpleName))]),n("span",{staticClass:"icon iconfont icon-xiangxia",class:{rotate180:t.showSortDropdown}})]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.enableFilterDropdown,expression:"enableFilterDropdown"}],staticClass:"barItem rightBorder",class:{activeColor:t.showFilterDropdown},on:{click:t.openFilterDropdown}},[n("span",{staticClass:"icon iconfont icon-guolv"}),n("span",{staticClass:"barContainerText"},[t._v("筛选")]),n("span",{staticClass:"icon iconfont icon-xiangxia",class:{rotate180:t.showFilterDropdown}})]),n("div",{staticClass:"barItem",on:{click:t.onSearch}},[n("span",{staticClass:"icon iconfont icon-small-chaxun"}),n("span",{staticClass:"barContainerText"},[t._v("查找")])])]),n("transition",{attrs:{name:"dropdown"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showSortDropdown,expression:"showSortDropdown"}],staticClass:"dropdownContainer"},[n("ul",t._l(t.sortOptions,function(e,a){return n("li",{key:a,staticClass:"sortItem",class:{bottomBorder:a<t.sortOptions.length-1,activeColor:e.Cd===t.defaultSort.Cd},on:{click:function(n){t.sortOptionClick(e)}}},[n("span",{directives:[{name:"show",rawName:"v-show",value:e.Asc,expression:"item.Asc"}],staticClass:"icon iconfont icon-paixu-shengxu"}),n("span",{directives:[{name:"show",rawName:"v-show",value:!e.Asc,expression:"!item.Asc"}],staticClass:"icon iconfont icon-paixu-jiangxu"}),n("span",{staticClass:"text"},[t._v(t._s(e.Name))]),n("span",{directives:[{name:"show",rawName:"v-show",value:e.Cd===t.defaultSort.Cd,expression:"item.Cd===defaultSort.Cd"}],staticClass:"icon iconfont icon-wancheng",staticStyle:{float:"right"}})])}))])]),n("transition",{attrs:{name:"dropdown"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showFilterDropdown,expression:"showFilterDropdown"}],staticClass:"dropdownContainer filterDropdownContainer"},[n("van-row",[n("van-col",{staticClass:"filterTypeContainer",attrs:{span:"10"}},[n("ul",t._l(t.filterTypes,function(e,a){return n("li",{key:a,staticClass:"filterTypeItem",class:{selectFilterTypeItem:e.Cd===t.defaultFilterType.Cd},on:{click:function(n){t.filterTypeItemClick(e)}}},[n("span",{staticClass:"text"},[t._v(t._s(e.Name))]),n("span",{staticClass:"icon iconfont icon-xiangxia rotateMinus90",staticStyle:{float:"right"}})])}))]),n("van-col",{attrs:{span:"14"}})],1)],1)]),n("transition",{attrs:{name:"backCover"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showBackCover,expression:"showBackCover"}],staticClass:"dropdownBackCover",on:{click:t.closeDropdown}})])],1)},g=[],m=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(c["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.showSortDropdown=!1,t.showFilterDropdown=!1,t.showBackCover=!1,t.soryByVisitTime={Name:"按拜访时间排序",SimpleName:"拜访时间",Cd:"sortByVisitTime",Asc:!0},t.soryByCreateTime={Name:"按创建时间排序",SimpleName:"创建时间",Cd:"sortByCreateTime",Asc:!1},t.soryByName={Name:"按名称排序",SimpleName:"名称",Cd:"sortByName",Asc:!0},t.soryByDistance={Name:"按距离排序",SimpleName:"距离",Cd:"sortByDistance",Asc:!0},t.soryByLevel={Name:"按级别排序",SimpleName:"级别",Cd:"sortByLevel",Asc:!1},t.sortOptions=[t.soryByVisitTime,t.soryByCreateTime,t.soryByName,t.soryByDistance,t.soryByLevel],t.defaultSort=t.soryByVisitTime,t.filterAll={Name:"全部",Cd:"All"},t.filterByLevel={Name:"客户等级",Cd:"CustomerLevel"},t.filterByManageCompany={Name:"管理公司",Cd:"ManagementCompany"},t.filterByDevProgress={Name:"开发进度",Cd:"DevProgress"},t.filterByOrganization={Name:"组织结构",Cd:"Organization"},t.filterTypes=[t.filterAll,t.filterByLevel,t.filterByManageCompany,t.filterByDevProgress,t.filterByOrganization],t.defaultFilterType=t.filterAll,t}return Object(r["a"])(e,[{key:"mounted",value:function(){this.onSelectSortOption()}},{key:"openSortDropdown",value:function(){this.showFilterDropdown&&(this.showFilterDropdown=!1),this.showSortDropdown=!this.showSortDropdown,this.showBackCover=this.showSortDropdown}},{key:"openFilterDropdown",value:function(){this.showSortDropdown&&(this.showSortDropdown=!1),this.showFilterDropdown=!this.showFilterDropdown,this.showBackCover=this.showFilterDropdown}},{key:"closeDropdown",value:function(){this.showFilterDropdown=!1,this.showSortDropdown=!1,this.showBackCover=!1}},{key:"sortOptionClick",value:function(t){this.defaultSort===t&&(t.Asc=!t.Asc),this.defaultSort=t,this.closeDropdown(),this.onSelectSortOption()}},{key:"onSelectSortOption",value:function(){return this.defaultSort}},{key:"onSearch",value:function(){}},{key:"filterTypeItemClick",value:function(t){this.defaultFilterType=t,this.defaultFilterType===this.filterAll&&this.closeDropdown()}}]),Object(s["a"])(e,t),e}(h["default"]);u["a"]([Object(f["d"])({default:!0}),u["b"]("design:type",Boolean)],m.prototype,"enableFilterDropdown",void 0),u["a"]([Object(f["b"])("onSelectSortOption"),u["b"]("design:type",Function),u["b"]("design:paramtypes",[]),u["b"]("design:returntype",void 0)],m.prototype,"onSelectSortOption",null),u["a"]([Object(f["b"])("onSearch"),u["b"]("design:type",Function),u["b"]("design:paramtypes",[]),u["b"]("design:returntype",void 0)],m.prototype,"onSearch",null),m=u["a"]([f["a"]],m);var v=m,y=v,C=y,b=(n("23b6"),n("2877")),w=Object(b["a"])(C,p,g,!1,null,"54f02262",null);w.options.__file="customerDropDown.vue";var S=w.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"fixedHeader"},[n("van-nav-bar",{staticClass:"headBar",on:{"click-left":t.onClickBack}},[n("span",{staticClass:"icon iconfont icon-fanhui headBarIcon",attrs:{slot:"left"},slot:"left"}),n("span",{staticClass:"headBarTitle",attrs:{slot:"title"},slot:"title"},[t._v("查找客户")])]),n("van-search",{staticClass:"vansearchClass",attrs:{placeholder:"请输入搜索关键词","show-action":"",autofocus:""},on:{search:t.onQueryCustomerDatas},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}},[n("div",{attrs:{slot:"action"},on:{click:t.onQueryCustomerDatas},slot:"action"},[t._v("查找")])])],1),n("div",{staticClass:"content",attrs:{id:"contentContainer"}},[n("div",{staticClass:"searchResultContainer"},[t._m(0),n("van-list",{staticClass:"van-hairline--top",staticStyle:{"min-height":"30px"},attrs:{finished:t.finished,"finished-text":"没有更多了","immediate-check":!1},on:{load:t.loadNextCustomerDatas},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[n("van-cell-group",{attrs:{border:!1}},t._l(t.customerList,function(e,a){return n("van-cell",{key:a,attrs:{clickable:"","is-link":"",title:e.Name},on:{click:function(n){t.onClickResult(e)}}})}))],1)],1),n("div",{staticClass:"historyContainer"},[t._m(1),n("div",{staticClass:"van-hairline--top",staticStyle:{"min-height":"30px"}},t._l(t.searchHistoryList,function(e,a){return n("div",{key:a,staticStyle:{display:"inline-block",margin:"10px 2px 0px 8px"},on:{click:function(n){t.onClickResult(e)}}},[n("van-tag",{staticStyle:{"min-width":"60px","text-align":"center"},attrs:{round:"",size:"medium"}},[t._v(t._s(e.Name))])],1)})),n("div",{staticStyle:{padding:"10px 0px","text-align":"center",color:"#6E6E6E"}},[n("span",{staticClass:"icon iconfont icon-delete",staticStyle:{"font-size":"14px"},on:{click:t.clearSearchHistoryList}},[t._v("清空搜索历史")])])])])])},x=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{padding:"4px 0px 2px 8px","font-size":"10pt",color:"#3fcc8e"}},[n("span",[t._v("搜索结果")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"van-hairline--bottom",staticStyle:{padding:"10px 0px 2px 8px","font-size":"10pt",color:"#3fcc8e"}},[n("span",[t._v("搜索历史")])])}],M=n("0063"),D=n.n(M),T=function(t,e){t&&("string"!==typeof e&&(e=JSON.stringify(e)),window.localStorage.setItem(t,e))},L=function(t){if(t)return window.localStorage.getItem(t)},P=function(t){t&&window.localStorage.removeItem(t)},_={setStorage:T,getStorage:L,removeStorage:P},N=_,B=n("46c4"),O=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(c["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.keyword="",t.customerCount=0,t.customerList=[],t.searchHistoryList=[],t.localStorageKey="customerSearchHistory",t.isLoading=!1,t.finished=!1,t.currentPage=1,t.pageSize=25,t}return Object(r["a"])(e,[{key:"mounted",value:function(){this.getSearchHistoryList()}},{key:"onClickBack",value:function(){}},{key:"onClickResult",value:function(t){t&&(this.searchComplete(t),this.setSearchHistoryList(t))}},{key:"searchComplete",value:function(t){return t}},{key:"setSearchHistoryList",value:function(t){if(t){var e=D.a.from(this.searchHistoryList).where(function(e){return e.Id===t.Id}).firstOrDefault();if(e){var n=this.searchHistoryList.indexOf(e);n>-1&&this.searchHistoryList.splice(n,1)}this.searchHistoryList.splice(0,0,t),N.setStorage(this.localStorageKey,this.searchHistoryList)}}},{key:"getSearchHistoryList",value:function(){var t=N.getStorage(this.localStorageKey);if(t){var e=JSON.parse(t);this.searchHistoryList=e}else this.searchHistoryList=[]}},{key:"clearSearchHistoryList",value:function(){N.removeStorage(this.localStorageKey),this.getSearchHistoryList()}},{key:"onQueryCustomerDatas",value:function(){this.isLoading=!1,this.finished=!1,this.currentPage=1,this.customerList=[],this.keyword&&this.keyword.trim()?(this.keyword=this.keyword.trim(),this.queryCustomerList()):this.finished=!0}},{key:"getTotalPage",value:function(){return Math.ceil(this.customerCount/this.pageSize)}},{key:"loadNextCustomerDatas",value:function(){console.log("----------------------------");var t=this.getTotalPage();this.currentPage=this.currentPage+1,isNaN(t)||this.currentPage>t?this.finished=!0:this.queryCustomerList()}},{key:"queryCustomerList",value:function(){var t=this,e=d["a"].instance.getEntCd(),n=d["a"].instance.getPersonId();if(this.keyword){this.isLoading=!0;var a=(this.currentPage-1)*this.pageSize;this.$Api.invoke({moduleName:"crm.basic.customerService",className:"CustomerService",method:"getHasPermissionCustomers",args:{entCd:e,personId:n,keyword:this.keyword,locationPoint:null,sortType:"sortByName",asc:!0,skip:a,limit:this.pageSize}}).then(function(e){e.data&&e.data.isSuccess?t.queryCustomersSuccess(e):t.queryCustomersFailed(e)}).catch(function(e){t.queryCustomersException(e)}).finally(function(){t.isLoading=!1})}}},{key:"queryCustomersSuccess",value:function(t){console.log("当前页："+this.currentPage),this.customerCount=t.data.data[0];var e=this.getTotalPage();isNaN(e)&&(this.finished=!0),this.currentPage>=e?this.finished=!0:this.finished=!1,t.data.data[1]&&(1===this.currentPage?this.customerList=t.data.data[1]:this.customerList=this.customerList.concat(t.data.data[1]))}},{key:"queryCustomersFailed",value:function(t){B["a"].toastMessage("查询客户失败!"+t.data.error)}},{key:"queryCustomersException",value:function(t){this.customerCount=0,this.customerList=[],this.finished=!0,B["a"].toastMessage("查询客户异常!"+t)}}]),Object(s["a"])(e,t),e}(h["default"]);u["a"]([Object(f["b"])("onCancelSearch"),u["b"]("design:type",Function),u["b"]("design:paramtypes",[]),u["b"]("design:returntype",void 0)],O.prototype,"onClickBack",null),u["a"]([Object(f["b"])("searchComplete"),u["b"]("design:type",Function),u["b"]("design:paramtypes",[Object]),u["b"]("design:returntype",void 0)],O.prototype,"searchComplete",null),O=u["a"]([f["a"]],O);var I=O,E=I,A=E,j=(n("4f5c"),Object(b["a"])(A,k,x,!1,null,"12699d33",null));j.options.__file="searchCustomer.vue";var F=j.exports,R=n("01a2"),q=n("9290"),H=n("5b69"),V=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(c["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.showSearchCustomer=!1,t.sortByDistance="sortByDistance",t.currentSortOption={Cd:"sortByVisitTime",Asc:!0},t.showDistanceLabel=!1,t.currentLocation=null,t.customerCount=0,t.customerList=[],t.isLoadingRefresh=!1,t.isLoadingNext=!1,t.finished=!1,t.currentPage=1,t.pageSize=20,t}return Object(r["a"])(e,[{key:"mounted",value:function(){console.log("当前是客户界面.....")}},{key:"goCreateCustomer",value:function(){this.$router.push("/customerLocation")}},{key:"goCustomerDetails",value:function(t){this.$router.push({path:"/customerDetails",query:{id:t}})}},{key:"sortOptionChanged",value:function(t){t&&(this.currentSortOption=t,this.scrollToTop(),this.reloadCustomerDatas())}},{key:"scrollToTop",value:function(){this.$refs.contentContainer.scrollTop=0}},{key:"openSearchCustomerPopup",value:function(){this.showSearchCustomer=!0}},{key:"cancelSearchCustomer",value:function(){this.showSearchCustomer=!1}},{key:"onSearchComplete",value:function(t){this.goCustomerDetails(t.Id),this.cancelSearchCustomer()}},{key:"reloadCustomerDatas",value:function(){var t=this;this.isLoadingRefresh=!1,this.isLoadingNext=!1,this.currentPage=1,this.currentSortOption.Cd===this.sortByDistance?this.getGeoLocationThenQuery():this.queryCustomerList(function(){t.isLoadingRefresh=!0},function(){t.isLoadingRefresh=!1})}},{key:"getGeoLocationThenQuery",value:function(){var t=this;H["a"].getGeolocation().then(function(e){console.log(e),t.currentLocation={Longitude:e.point.lng,Latitude:e.point.lat},t.queryCustomerList(function(){t.isLoadingRefresh=!0},function(){t.isLoadingRefresh=!1})}).catch(function(e){t.isLoadingRefresh=!1,B["a"].toastMessage("定位失败,请重试!"+e)})}},{key:"getTotalPage",value:function(){return Math.ceil(this.customerCount/this.pageSize)}},{key:"loadNextCustomerDatas",value:function(){var t=this;console.log("----------------------------");var e=this.getTotalPage();this.currentPage=this.currentPage+1,this.currentPage>e?this.finished=!0:this.queryCustomerList(function(){t.isLoadingNext=!0},function(){t.isLoadingNext=!1})}},{key:"queryCustomerList",value:function(t,e){var n=this,a=d["a"].instance.getEntCd(),i=d["a"].instance.getPersonId();t();var o=(this.currentPage-1)*this.pageSize;this.$Api.invoke({moduleName:"crm.basic.customerService",className:"CustomerService",method:"getHasPermissionCustomers",args:{entCd:a,personId:i,keyword:"",locationPoint:this.currentLocation,sortType:this.currentSortOption.Cd,asc:this.currentSortOption.Asc,skip:o,limit:this.pageSize}}).then(function(t){t.data&&t.data.isSuccess?n.queryCustomersSuccess(t):n.queryCustomersFailed(t)}).catch(function(t){n.queryCustomersException(t)}).finally(function(){e()})}},{key:"queryCustomersSuccess",value:function(t){console.log("当前页："+this.currentPage),this.customerCount=t.data.data[0];var e=this.getTotalPage();console.log("总页："+e),isNaN(e)&&(this.finished=!0),this.currentPage>=e?this.finished=!0:this.finished=!1,t.data.data[1]&&(1===this.currentPage?this.customerList=t.data.data[1]:this.customerList=this.customerList.concat(t.data.data[1])),this.showDistanceLabel=this.currentSortOption.Cd===this.sortByDistance}},{key:"queryCustomersFailed",value:function(t){B["a"].toastMessage("查询失败!"+t.data.error),console.log(t)}},{key:"queryCustomersException",value:function(t){this.customerCount=0,this.customerList=[],this.finished=!0,B["a"].toastMessage("查询异常!"+t),console.log(t)}}]),Object(s["a"])(e,t),e}(h["default"]);V=u["a"]([Object(f["a"])({components:{customerDropDown:S,searchCustomer:F,crmBackTop:R["a"]},filters:{formatDateTime:function(t){return q["a"].formatDateTime(t,"yyyy-MM-dd")},formatVisitDays:function(t){return q["a"].formatVisitDays(t)},formatCustomerLevel:function(t){return q["a"].formatCustomerLevel(t)},formatDistance:function(t){return q["a"].formatDistance(t)}}})],V);var z=V,$=z,U=$,G=(n("67fa"),Object(b["a"])(U,a,i,!1,null,"7d3a8d14",null));G.options.__file="customer.vue";e["default"]=G.exports},"8b97":function(t,e,n){var a=n("d3f4"),i=n("cb7c"),o=function(t,e){if(i(t),!a(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,a){try{a=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),a(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return o(t,n),e?t.__proto__=n:a(t,n),t}}({},!1):void 0),check:o}},9093:function(t,e,n){var a=n("ce10"),i=n("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return a(t,i)}},9290:function(t,e,n){"use strict";n("3b2b"),n("a481");var a=function(t,e){if(!t)return"";"string"===typeof t&&(t=new Date(t)),/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var a in n){var o=n[a]+"";new RegExp("(".concat(a,")")).test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?o:i(o)))}return e};function i(t){return("00"+t).substr(t.length)}var o=function(t){if(!t)return"暂无拜访信息";"string"===typeof t&&(t=new Date(t));var e=new Date,n=Math.abs(e.getTime()-t.getTime()),a=Math.floor(n/864e5);return a>99&&(a=99),0===a?"今日已拜访":1===a?"昨日已拜访":a+"天未拜访"},s=function(t){return t?"拜访中":"已完成"},r=function(t,e){if(!t)return"--";if(!e)return a(t,"hh:mm:ss");t=new Date(t),e=new Date(e);var n=Math.abs(t.getTime()-e.getTime()),i=Math.floor(n/36e5),o=Math.floor(n%36e5/6e4);return i+"小时"+o+"分钟"},c=function(t,e){if(!t||!e)return"--";t=new Date(t),e=new Date(e);var n=Math.abs(t.getTime()-e.getTime()),a=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);return a+"小时"+i+"分钟"},l=function(t){if(!t)return"--";t=new Date(t);var e=new Date;if(p(t,e))return"今天";var n=new Date(e.setDate(e.getDate()-1));return p(t,n)?"昨天":a(t,"yyyy-MM-dd")},u=function(t){return t&&"--"!==t?"今天"===t?"#ED340D":"昨天"===t?"#F68A1E":"#b2b2b2":"#b2b2b2"},h=function(t){return t?1==t?"一般":2==t?"高":"未知":"未知"},f=function(t){return t?1==t?"新建":2==t?"处理中":3==t?"已结束":"未知":"未知"},d=function(t){return t?1==t?"#3fcc8e":2==t?"#47EA1B":"#b2b2b2":"#b2b2b2"},p=function(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()},g=function(t){if(""===t||null===t||void 0===t||-1===t)return"--m";if("number"!==typeof t&&(t=parseFloat(t)),t<1e3)return t.toFixed(0)+" m";var e=(t/1e3).toFixed(1);return e+" km"},m=function(t){return t||"--"},v=function(t){return t?"在职":"离职"},y={formatDateTime:a,formatVisitDays:o,formatDistance:g,formatCustomerLevel:m,formatIncumbent:v,formatVisitState:s,formatVisitTime:r,formatVisitDuration:c,formatVisitDate:l,dateEquals:p,formatVisitDateColor:u,formatItemLevel:h,formatItemState:f,formatItemStateColor:d};e["a"]=y},aa77:function(t,e,n){var a=n("5ca1"),i=n("be13"),o=n("79e5"),s=n("fdef"),r="["+s+"]",c="​",l=RegExp("^"+r+r+"*"),u=RegExp(r+r+"*$"),h=function(t,e,n){var i={},r=o(function(){return!!s[t]()||c[t]()!=c}),l=i[t]=r?e(f):s[t];n&&(i[n]=l),a(a.P+a.F*r,"String",i)},f=h.trim=function(t,e){return t=String(i(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(u,"")),t};t.exports=h},aae3:function(t,e,n){var a=n("d3f4"),i=n("2d95"),o=n("2b4c")("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==i(t))}},c5f6:function(t,e,n){"use strict";var a=n("7726"),i=n("69a8"),o=n("2d95"),s=n("5dbc"),r=n("6a99"),c=n("79e5"),l=n("9093").f,u=n("11e9").f,h=n("86cc").f,f=n("aa77").trim,d="Number",p=a[d],g=p,m=p.prototype,v=o(n("2aeb")(m))==d,y="trim"in String.prototype,C=function(t){var e=r(t,!1);if("string"==typeof e&&e.length>2){e=y?e.trim():f(e,3);var n,a,i,o=e.charCodeAt(0);if(43===o||45===o){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:a=2,i=49;break;case 79:case 111:a=8,i=55;break;default:return+e}for(var s,c=e.slice(2),l=0,u=c.length;l<u;l++)if(s=c.charCodeAt(l),s<48||s>i)return NaN;return parseInt(c,a)}}return+e};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof p&&(v?c(function(){m.valueOf.call(n)}):o(n)!=d)?s(new g(C(e)),n,p):C(e)};for(var b,w=n("9e1e")?l(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;w.length>S;S++)i(g,b=w[S])&&!i(p,b)&&h(p,b,u(g,b));p.prototype=m,m.constructor=p,n("2aba")(a,d,p)}},c816:function(t,e,n){},e608:function(t,e,n){"use strict";var a=n("3124"),i=n.n(a);i.a},f518:function(t,e,n){},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);