(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b64714e"],{"0bfb":function(t,e,n){"use strict";var a=n("cb7c");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"11e9":function(t,e,n){var a=n("52a7"),o=n("4630"),r=n("6821"),i=n("6a99"),s=n("69a8"),c=n("c69a"),u=Object.getOwnPropertyDescriptor;e.f=n("9e1e")?u:function(t,e){if(t=r(t),e=i(e,!0),c)try{return u(t,e)}catch(t){}if(s(t,e))return o(!a.f.call(t,e),t[e])}},2471:function(t,e){var n=window.BMapLib=n||{};(function(){var t=6370996.81,e=n.GeoUtils=function(){};function a(t,e,n){return null!=e&&(t=Math.max(t,e)),null!=n&&(t=Math.min(t,n)),t}function o(t,e,n){while(t>n)t-=n-e;while(t<e)t+=n-e;return t}e.isPointInRect=function(t,e){if(!(t instanceof BMap.Point)||!(e instanceof BMap.Bounds))return!1;var n=e.getSouthWest(),a=e.getNorthEast();return t.lng>=n.lng&&t.lng<=a.lng&&t.lat>=n.lat&&t.lat<=a.lat},e.isPointInCircle=function(t,n){if(!(t instanceof BMap.Point)||!(n instanceof BMap.Circle))return!1;var a=n.getCenter(),o=n.getRadius(),r=e.getDistance(t,a);return r<=o},e.isPointOnPolyline=function(t,e){if(!(t instanceof BMap.Point)||!(e instanceof BMap.Polyline))return!1;var n=e.getBounds();if(!this.isPointInRect(t,n))return!1;for(var a=e.getPath(),o=0;o<a.length-1;o++){var r=a[o],i=a[o+1];if(t.lng>=Math.min(r.lng,i.lng)&&t.lng<=Math.max(r.lng,i.lng)&&t.lat>=Math.min(r.lat,i.lat)&&t.lat<=Math.max(r.lat,i.lat)){var s=(r.lng-t.lng)*(i.lat-t.lat)-(i.lng-t.lng)*(r.lat-t.lat);if(s<2e-10&&s>-2e-10)return!0}}return!1},e.isPointInPolygon=function(t,e){if(!(t instanceof BMap.Point)||!(e instanceof BMap.Polygon))return!1;var n=e.getBounds();if(!this.isPointInRect(t,n))return!1;var a,o,r=e.getPath(),i=r.length,s=!0,c=0,u=2e-10,l=t;a=r[0];for(var f=1;f<=i;++f){if(l.equals(a))return s;if(o=r[f%i],l.lat<Math.min(a.lat,o.lat)||l.lat>Math.max(a.lat,o.lat))a=o;else{if(l.lat>Math.min(a.lat,o.lat)&&l.lat<Math.max(a.lat,o.lat)){if(l.lng<=Math.max(a.lng,o.lng)){if(a.lat==o.lat&&l.lng>=Math.min(a.lng,o.lng))return s;if(a.lng==o.lng){if(a.lng==l.lng)return s;++c}else{var g=(l.lat-a.lat)*(o.lng-a.lng)/(o.lat-a.lat)+a.lng;if(Math.abs(l.lng-g)<u)return s;l.lng<g&&++c}}}else if(l.lat==o.lat&&l.lng<=o.lng){var h=r[(f+1)%i];l.lat>=Math.min(a.lat,h.lat)&&l.lat<=Math.max(a.lat,h.lat)?++c:c+=2}a=o}}return c%2!=0},e.degreeToRad=function(t){return Math.PI*t/180},e.radToDegree=function(t){return 180*t/Math.PI},e.getDistance=function(n,r){return n instanceof BMap.Point&&r instanceof BMap.Point?(n.lng=o(n.lng,-180,180),n.lat=a(n.lat,-74,74),r.lng=o(r.lng,-180,180),r.lat=a(r.lat,-74,74),i=e.degreeToRad(n.lng),c=e.degreeToRad(n.lat),s=e.degreeToRad(r.lng),u=e.degreeToRad(r.lat),t*Math.acos(Math.sin(c)*Math.sin(u)+Math.cos(c)*Math.cos(u)*Math.cos(s-i))):0;var i,s,c,u},e.getPolylineDistance=function(t){if(t instanceof BMap.Polyline||t instanceof Array){var n;if(n=t instanceof BMap.Polyline?t.getPath():t,n.length<2)return 0;for(var a=0,o=0;o<n.length-1;o++){var r=n[o],i=n[o+1],s=e.getDistance(r,i);a+=s}return a}return 0},e.getPolygonArea=function(e){if(!(e instanceof BMap.Polygon)&&!(e instanceof Array))return 0;var n;if(n=e instanceof BMap.Polygon?e.getPath():e,n.length<3)return 0;for(var a,o,r=0,i=0,s=0,c=0,u=0,l=0,f=0,g=0,h=0,d=0,m=0,p=0,v=0,y=0,M=0,b=0,P=0,C=0,D=0,S=0,w=0,B=0,k=0,I=0,x=0,T=0,_=0,L=0,O=0,A=0,E=0,N=0,R=0,j=0,q=t,F=n.length,U=0;U<F;U++)0==U?(i=n[F-1].lng*Math.PI/180,s=n[F-1].lat*Math.PI/180,c=n[0].lng*Math.PI/180,u=n[0].lat*Math.PI/180,l=n[1].lng*Math.PI/180,f=n[1].lat*Math.PI/180):U==F-1?(i=n[F-2].lng*Math.PI/180,s=n[F-2].lat*Math.PI/180,c=n[F-1].lng*Math.PI/180,u=n[F-1].lat*Math.PI/180,l=n[0].lng*Math.PI/180,f=n[0].lat*Math.PI/180):(i=n[U-1].lng*Math.PI/180,s=n[U-1].lat*Math.PI/180,c=n[U].lng*Math.PI/180,u=n[U].lat*Math.PI/180,l=n[U+1].lng*Math.PI/180,f=n[U+1].lat*Math.PI/180),g=Math.cos(u)*Math.cos(c),h=Math.cos(u)*Math.sin(c),d=Math.sin(u),m=Math.cos(s)*Math.cos(i),p=Math.cos(s)*Math.sin(i),v=Math.sin(s),y=Math.cos(f)*Math.cos(l),M=Math.cos(f)*Math.sin(l),b=Math.sin(f),P=(g*g+h*h+d*d)/(g*m+h*p+d*v),C=(g*g+h*h+d*d)/(g*y+h*M+d*b),D=P*m-g,S=P*p-h,w=P*v-d,B=C*y-g,k=C*M-h,I=C*b-d,O=(B*D+k*S+I*w)/(Math.sqrt(B*B+k*k+I*I)*Math.sqrt(D*D+S*S+w*w)),O=Math.acos(O),x=k*w-I*S,T=0-(B*w-I*D),_=B*S-k*D,L=0!=g?x/g:0!=h?T/h:_/d,L>0?(A+=O,R++):(E+=O,N++);return a=A+(2*Math.PI*N-E),o=2*Math.PI*R-A+E,j=A>E?a-(F-2)*Math.PI<1?a:o:o-(F-2)*Math.PI<1?o:a,r=(j-(F-2)*Math.PI)*q*q,r}})()},"3b2b":function(t,e,n){var a=n("7726"),o=n("5dbc"),r=n("86cc").f,i=n("9093").f,s=n("aae3"),c=n("0bfb"),u=a.RegExp,l=u,f=u.prototype,g=/a/g,h=/a/g,d=new u(g)!==g;if(n("9e1e")&&(!d||n("79e5")(function(){return h[n("2b4c")("match")]=!1,u(g)!=g||u(h)==h||"/a/i"!=u(g,"i")}))){u=function(t,e){var n=this instanceof u,a=s(t),r=void 0===e;return!n&&a&&t.constructor===u&&r?t:o(d?new l(a&&!r?t.source:t,e):l((a=t instanceof u)?t.source:t,a&&r?c.call(t):e),n?this:f,u)};for(var m=function(t){t in u||r(u,t,{configurable:!0,get:function(){return l[t]},set:function(e){l[t]=e}})},p=i(l),v=0;p.length>v;)m(p[v++]);f.constructor=u,u.prototype=f,n("2aba")(a,"RegExp",u)}n("7a56")("RegExp")},"46c4":function(t,e,n){"use strict";var a=n("b970"),o=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"bottom";Object(a["b"])({message:t,duration:e,position:n})},r=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=a["a"].alert({title:t,message:e,overlay:n,closeOnClickOverlay:!0});return o},i=function(t,e){var n=a["a"].confirm({title:t,message:e});return n},s={toastMessage:o,dialogAlert:r,dialogConfirm:i};e["a"]=s},"52a7":function(t,e){e.f={}.propertyIsEnumerable},"5b69":function(t,e,n){"use strict";n("2471");e["a"]={init:function(){var t="cxe5IvbUduawnAEdG2B8ChKLcSk94lqQ",e="https://api.map.baidu.com/api?v=3.0&ak="+t+"&callback=onBMapCallback";return new Promise(function(t,n){if("undefined"!==typeof BMap)return console.log("百度地图脚本已初始化..."),t(BMap),!0;window.onBMapCallback=function(){console.log("百度地图脚本初始化成功..."),t(BMap)};var a=document.createElement("script");a.onerror=function(){n("百度地图脚本加载失败!")},a.setAttribute("type","text/javascript"),a.setAttribute("src",e),document.body.appendChild(a)})},getGeolocation:function(){var t=this,e=new Promise(function(e,n){t.init().then(function(a){var o=new a.Geolocation;o.enableSDKLocation(),o.getCurrentPosition(function(a){var r=o.getStatus();if(r===BMAP_STATUS_SUCCESS)e(a);else{var i=t.getGeolocationStatusMessage(r);n(i)}},{enableHighAccuracy:!0,timeout:5e3})}).catch(function(t){n(JSON.stringify(t))})});return e},getGeolocationStatusMessage:function(t){var e="";return e=t===BMAP_STATUS_SUCCESS?"定位成功!":t===BMAP_STATUS_UNKNOWN_LOCATION?"位置结果未知!":t===BMAP_STATUS_PERMISSION_DENIED?"没有获取位置权限!":t===BMAP_STATUS_TIMEOUT?"请求超时,请重试!":"未知错误"+t,e},getDistance:function(t,e){return BMapLib.GeoUtils.getDistance(t,e)},generateAddressDesc:function(t){var e="";return t?(t.city&&(e+=t.city),t.district&&(e+=t.district),t.street&&(e+=t.street),t.street_number&&(e+=t.street_number),e):e}}},"5dbc":function(t,e,n){var a=n("d3f4"),o=n("8b97").set;t.exports=function(t,e,n){var r,i=e.constructor;return i!==n&&"function"==typeof i&&(r=i.prototype)!==n.prototype&&a(r)&&o&&o(t,r),t}},"6df7":function(t,e,n){"use strict";var a=n("7cdf"),o=n.n(a);o.a},"7cdf":function(t,e,n){},"8b97":function(t,e,n){var a=n("d3f4"),o=n("cb7c"),r=function(t,e){if(o(t),!a(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,a){try{a=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),a(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return r(t,n),e?t.__proto__=n:a(t,n),t}}({},!1):void 0),check:r}},9093:function(t,e,n){var a=n("ce10"),o=n("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return a(t,o)}},9290:function(t,e,n){"use strict";n("3b2b"),n("a481");var a=function(t,e){if(!t)return"";"string"===typeof t&&(t=new Date(t)),/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var a in n){var r=n[a]+"";new RegExp("(".concat(a,")")).test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?r:o(r)))}return e};function o(t){return("00"+t).substr(t.length)}var r=function(t){if(!t)return"暂无拜访信息";"string"===typeof t&&(t=new Date(t));var e=new Date,n=Math.abs(e.getTime()-t.getTime()),a=Math.floor(n/864e5);return a>99&&(a=99),0===a?"今日已拜访":1===a?"昨日已拜访":a+"天未拜访"},i=function(t){return t?"拜访中":"已完成"},s=function(t,e){if(!t)return"--";if(!e)return a(t,"hh:mm:ss");t=new Date(t),e=new Date(e);var n=Math.abs(t.getTime()-e.getTime()),o=Math.floor(n/36e5),r=Math.floor(n%36e5/6e4);return o+"小时"+r+"分钟"},c=function(t,e){if(!t||!e)return"--";t=new Date(t),e=new Date(e);var n=Math.abs(t.getTime()-e.getTime()),a=Math.floor(n/36e5),o=Math.floor(n%36e5/6e4);return a+"小时"+o+"分钟"},u=function(t){if(!t)return"--";t=new Date(t);var e=new Date;if(d(t,e))return"今天";var n=new Date(e.setDate(e.getDate()-1));return d(t,n)?"昨天":a(t,"yyyy-MM-dd")},l=function(t){return t&&"--"!==t?"今天"===t?"#ED340D":"昨天"===t?"#F68A1E":"#b2b2b2":"#b2b2b2"},f=function(t){return t?1==t?"一般":2==t?"高":"未知":"未知"},g=function(t){return t?1==t?"新建":2==t?"处理中":3==t?"已结束":"未知":"未知"},h=function(t){return t?1==t?"#3fcc8e":2==t?"#47EA1B":"#b2b2b2":"#b2b2b2"},d=function(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()},m=function(t){if(""===t||null===t||void 0===t||-1===t)return"--m";if("number"!==typeof t&&(t=parseFloat(t)),t<1e3)return t.toFixed(0)+" m";var e=(t/1e3).toFixed(1);return e+" km"},p=function(t){return t||"--"},v=function(t){return t?"在职":"离职"},y={formatDateTime:a,formatVisitDays:r,formatDistance:m,formatCustomerLevel:p,formatIncumbent:v,formatVisitState:i,formatVisitTime:s,formatVisitDuration:c,formatVisitDate:u,dateEquals:d,formatVisitDateColor:l,formatItemLevel:f,formatItemState:g,formatItemStateColor:h};e["a"]=y},aae3:function(t,e,n){var a=n("d3f4"),o=n("2d95"),r=n("2b4c")("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[r])?!!e:"RegExp"==o(t))}},b177:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"fixedHeader"},[n("van-nav-bar",{staticClass:"headBar",on:{"click-left":t.goBack,"click-right":t.confirmComplete}},[n("span",{staticClass:"icon iconfont icon-fanhui headBarIcon",attrs:{slot:"left"},slot:"left"}),n("span",{staticClass:"headBarTitle",attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.title))]),n("span",{staticClass:"icon iconfont icon-queding headBarIcon",attrs:{slot:"right"},slot:"right"})]),n("van-search",{staticClass:"vansearchClass",attrs:{placeholder:"请输入搜索关键词","show-action":"",autofocus:""},on:{search:t.onQueryCustomerDatas},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}},[n("div",{attrs:{slot:"action"},on:{click:t.onQueryCustomerDatas},slot:"action"},[t._v("查找")])])],1),n("div",{staticClass:"content",attrs:{id:"contentContainer"}},[n("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了","immediate-check":!1},on:{load:t.loadNextCustomerDatas},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[n("van-radio-group",{model:{value:t.currentCustomer,callback:function(e){t.currentCustomer=e},expression:"currentCustomer"}},t._l(t.customerList,function(e,a){return n("div",{key:a,staticClass:"customerItemContainer van-hairline--bottom",on:{click:function(n){t.currentCustomer=e}}},[n("van-row",{attrs:{type:"flex",align:"center"}},[n("van-col",{attrs:{span:"18"}},[n("div",{staticClass:"subNameText van-ellipsis"},[t._v(t._s(e.Name))]),n("div",{staticClass:"subAddressText flexRowLayout",staticStyle:{"justify-content":"flex-start"}},[n("span",{staticClass:"icon iconfont icon-location",staticStyle:{"font-size":"12px"}}),n("div",{staticClass:"van-ellipsis",staticStyle:{"margin-left":"2px"}},[t._v(t._s(e.LocationDesc))])])]),n("van-col",{attrs:{span:"6"}},[n("div",{staticClass:"flexRowLayout",staticStyle:{"justify-content":"flex-end","align-items":"center"}},[n("van-tag",{directives:[{name:"show",rawName:"v-show",value:t.currentSortType===t.sortByDistance,expression:"currentSortType===sortByDistance"}],staticStyle:{"margin-right":"10px"},attrs:{color:"#44bb00"}},[t._v(t._s(t._f("formatDistance")(e.Distance)))]),n("van-radio",{attrs:{name:e,"checked-color":"#3fcc8e"}})],1)])],1)],1)}))],1)],1)])},o=[],r=n("c665"),i=n("dc0a"),s=n("aa9a"),c=n("d328"),u=n("11d9"),l=n("9ab4"),f=n("2b0e"),g=n("60a3"),h=n("2b67"),d=n("9290"),m=n("5b69"),p=n("46c4"),v=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(c["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.currentCustomer=null,t.keyword="",t.customerList=[],t.customerCount=0,t.isLoading=!1,t.finished=!1,t.currentPage=1,t.pageSize=25,t.sortByName="sortByName",t.sortByDistance="sortByDistance",t.currentSortType="sortByName",t.currentAsc=!0,t.currentLocation=null,t}return Object(s["a"])(e,[{key:"onShowComponent",value:function(t,e){console.log(t),t?this.onQueryCustomerDatas():this.currentCustomer=null}},{key:"mounted",value:function(){var t=this;this.isLoading=!0,m["a"].getGeolocation().then(function(e){t.isLoading=!1,t.currentLocation={Longitude:e.point.lng,Latitude:e.point.lat},t.currentSortType=t.sortByDistance,t.onQueryCustomerDatas()}).catch(function(e){t.isLoading=!1,p["a"].toastMessage(e),t.currentSortType=t.sortByName,t.onQueryCustomerDatas()})}},{key:"onQueryCustomerDatas",value:function(){this.isLoading=!1,this.finished=!1,this.currentPage=1,this.customerList=[],this.keyword=this.keyword.trim(),this.queryCustomerList()}},{key:"getTotalPage",value:function(){return Math.ceil(this.customerCount/this.pageSize)}},{key:"loadNextCustomerDatas",value:function(){console.log("----------------------------");var t=this.getTotalPage();this.currentPage=this.currentPage+1,isNaN(t)||this.currentPage>t?this.finished=!0:this.queryCustomerList()}},{key:"queryCustomerList",value:function(){var t=this,e=h["a"].instance.getEntCd(),n=h["a"].instance.getPersonId();this.isLoading=!0;var a=(this.currentPage-1)*this.pageSize;this.$Api.invoke({moduleName:"crm.basic.customerService",className:"CustomerService",method:"getHasPermissionCustomers",args:{entCd:e,personId:n,keyword:this.keyword,locationPoint:this.currentLocation,sortType:this.currentSortType,asc:this.currentAsc,skip:a,limit:this.pageSize}}).then(function(e){e.data&&e.data.isSuccess?t.queryCustomersSuccess(e):t.queryCustomersFailed(e)}).catch(function(e){t.queryCustomersException(e)}).finally(function(){t.isLoading=!1})}},{key:"queryCustomersSuccess",value:function(t){console.log("当前页："+this.currentPage),this.customerCount=t.data.data[0];var e=this.getTotalPage();isNaN(e)&&(this.finished=!0),this.currentPage>=e?this.finished=!0:this.finished=!1,t.data.data[1]&&(1===this.currentPage?this.customerList=t.data.data[1]:this.customerList=this.customerList.concat(t.data.data[1]))}},{key:"queryCustomersFailed",value:function(t){p["a"].toastMessage("查询客户失败!"+t.data.error)}},{key:"queryCustomersException",value:function(t){this.customerCount=0,this.customerList=[],this.finished=!0,p["a"].toastMessage("查询客户异常!"+t)}},{key:"goBack",value:function(){}},{key:"confirmComplete",value:function(){this.currentCustomer?this.complete():p["a"].dialogAlert("提示","还未选择客户!")}},{key:"complete",value:function(){return this.currentCustomer}}]),Object(i["a"])(e,t),e}(f["default"]);l["a"]([Object(g["d"])({default:"选择客户"}),l["b"]("design:type",String)],v.prototype,"title",void 0),l["a"]([Object(g["d"])({default:!1}),l["b"]("design:type",Boolean)],v.prototype,"showComponent",void 0),l["a"]([Object(g["f"])("showComponent"),l["b"]("design:type",Function),l["b"]("design:paramtypes",[Boolean,Boolean]),l["b"]("design:returntype",void 0)],v.prototype,"onShowComponent",null),l["a"]([Object(g["b"])("goBack"),l["b"]("design:type",Function),l["b"]("design:paramtypes",[]),l["b"]("design:returntype",void 0)],v.prototype,"goBack",null),l["a"]([Object(g["b"])("complete"),l["b"]("design:type",Function),l["b"]("design:paramtypes",[]),l["b"]("design:returntype",void 0)],v.prototype,"complete",null),v=l["a"]([Object(g["a"])({filters:{formatDistance:function(t){return d["a"].formatDistance(t)}}})],v);var y=v,M=y,b=M,P=(n("6df7"),n("2877")),C=Object(P["a"])(b,a,o,!1,null,"258f8d9c",null);C.options.__file="selectCustomer.vue";e["a"]=C.exports}}]);