(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10ab4b32"],{"0c6b":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"i-layout-page-header"},[a("div",{staticClass:"i-layout-page-header"},[a("span",{staticClass:"ivu-page-header-title"},[t._v(t._s(t.$route.meta.title))])])]),a("Card",{staticClass:"ivu-mt",attrs:{bordered:!1,"dis-hover":""}},[a("Row",{attrs:{type:"flex"}},[a("Col",t._b({},"Col",t.grid,!1),[a("Button",{staticClass:"mr20",attrs:{type:"primary"},on:{click:t.goIndex}},[t._v("配置分类")]),a("Button",{attrs:{type:"primary",icon:"md-add"},on:{click:t.configureAdd}},[t._v("添加配置")])],1)],1),a("Divider",{attrs:{dashed:""}}),a("Table",{ref:"table",attrs:{columns:t.columns1,data:t.classList,loading:t.loading,"no-userFrom-text":"暂无数据","no-filtered-userFrom-text":"暂无筛选结果"},scopedSlots:t._u([{key:"values",fn:function(e){var n=e.row;e.index;return["text"===n.type||"textarea"===n.type||"radio"===n.type||"checkbox"===n.type?a("span",[t._v(t._s(n.value))]):t._e(),"upload"===n.type&&3===n.upload_type?a("div",{staticClass:"valBox acea-row"},[n.value instanceof Array?a("div",t._l(n.value,(function(e,n){return a("div",{key:n,staticClass:"valPicbox acea-row row-column-around"},[a("div",{staticClass:"valPicbox_pic"},[a("Icon",{attrs:{type:"md-document"}})],1),a("span",{staticClass:"valPicbox_sp"},[t._v(t._s(e.filename))])])})),0):t._e()]):t._e(),"upload"===n.type&&3!==n.upload_type?a("div",{staticClass:"valBox acea-row"},[n.value instanceof Array?a("div",t._l(n.value,(function(e,n){return a("div",{key:n,staticClass:"valPicbox acea-row row-column-around"},[a("div",{staticClass:"valPicbox_pic"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.filepath,expression:"item.filepath"}]})]),a("span",{staticClass:"valPicbox_sp"},[t._v(t._s(e.filename))])])})),0):t._e()]):t._e()]}},{key:"statuss",fn:function(e){var n=e.row;e.index;return[a("i-switch",{attrs:{value:n.status,"true-value":1,"false-value":0,size:"large"},on:{"on-change":function(e){return t.onchangeIsShow(n)}},model:{value:n.status,callback:function(e){t.$set(n,"status",e)},expression:"row.status"}},[a("span",{attrs:{slot:"open"},slot:"open"},[t._v("显示")]),a("span",{attrs:{slot:"close"},slot:"close"},[t._v("隐藏")])])]}},{key:"action",fn:function(e){var n=e.row,r=e.index;return[a("a",{on:{click:function(e){return t.edit(n)}}},[t._v("编辑")]),a("Divider",{attrs:{type:"vertical"}}),a("a",{on:{click:function(e){return t.del(n,"删除分类",r)}}},[t._v("删除")])]}}])})],1),a("Modal",{attrs:{scrollable:"","footer-hide":"",closable:"",title:"添加配置字段","mask-closable":!1,"z-index":1,width:"700"},model:{value:t.modals2,callback:function(e){t.modals2=e},expression:"modals2"}},[a("Tabs",{staticClass:"tabsName",on:{"on-click":t.onhangeTab},model:{value:t.typeFrom.type,callback:function(e){t.$set(t.typeFrom,"type",e)},expression:"typeFrom.type"}},[a("TabPane",{attrs:{label:"文本框 ",name:"0"}}),a("TabPane",{attrs:{label:"多行文本框",name:"1"}}),a("TabPane",{attrs:{label:"单选框",name:"2"}}),a("TabPane",{attrs:{label:"文件上传",name:"3"}}),a("TabPane",{attrs:{label:"多选框",name:"4"}}),a("TabPane",{attrs:{label:"下拉框",name:"5"}})],1),0!=t.rules.length?a("form-create",{ref:"fc",staticClass:"formBox",attrs:{rule:t.rules,handleIcon:"false"},on:{"on-submit":t.onSubmit}}):t._e()],1),a("edit-from",{ref:"edits",attrs:{FromData:t.FromData},on:{submitFail:t.submitFail}})],1)},r=[],s=(a("6a61"),a("dc45")),o=a("8593"),i=a("b0a6"),c=a.n(i),u=a("31b4"),l=a("6b6c"),d={name:"list",components:{formCreate:c.a.$form(),editFrom:u["a"]},data:function(){return{modals2:!1,grid:{xl:7,lg:7,md:12,sm:24,xs:24},loading:!1,formValidate:{tab_id:0,page:1,limit:20},total:0,columns1:[{title:"ID",key:"id",width:80},{title:"配置名称",key:"info",minWidth:130},{title:"字段变量",key:"menu_name",minWidth:140},{title:"字段类型",key:"type",minWidth:90},{title:"值",slot:"values",minWidth:230},{title:"是否显示",slot:"statuss",minWidth:90},{title:"操作",slot:"action",fixed:"right",minWidth:120}],FromData:null,FromRequestData:{},modalTitleSs:"",classList:[],num:0,typeFrom:{type:0,tab_id:this.$route.params.id},rules:[]}},watch:{$route:{handler:function(t,e){this.getList()},deep:!0}},mounted:function(){this.getList()},methods:{onhangeTab:function(t){this.typeFrom.type=t,this.classAdd()},classAdd:function(){var t=this;Object(o["e"])(this.typeFrom).then(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(a){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!1!==a.data.status){e.next=2;break}return e.abrupt("return",t.$authLapse(a.data));case 2:n=a.data||{},t.FromRequestData={action:n.action,method:n.method},t.rules=n.rules,t.modals2=!0;case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.$Message.error(e.msg)}))},edit:function(t){var e=this;Object(o["f"])(t.id).then(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!1!==a.data.status){t.next=2;break}return t.abrupt("return",e.$authLapse(a.data));case 2:n=a.data||{},e.FromRequestData={action:n.action,method:n.method},e.rules=n.rules,e.$refs.edits.modals=!0,e.modals2=!0;case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.$Message.error(t.msg)}))},onSubmit:function(t){var e=this;Object(l["a"])({url:this.FromRequestData.action,method:this.FromRequestData.method,data:t}).then((function(t){e.$Message.success(t.msg),setTimeout((function(){e.modals2=!1}),1e3),setTimeout((function(){e.getList()}),1500)})).catch((function(t){e.$Message.error(t.msg)}))},submitFail:function(){this.getList()},goIndex:function(){this.$router.push({path:"/admin/system/config/system_config_tab/index"})},configureAdd:function(){this.classAdd()},getList:function(){var t=this;this.loading=!0,this.formValidate.tab_id=this.$route.params.id,Object(o["g"])(this.formValidate).then(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(a){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=a.data,t.classList=n.list,t.total=n.count,t.loading=!1;case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){t.loading=!1,t.$Message.error(e.msg)}))},pageChange:function(t){this.formValidate.page=t,this.getList()},del:function(t,e,a){var n=this,r={title:e,num:a,url:"/setting/config/".concat(t.id),method:"DELETE",ids:""};this.$modalSure(r).then((function(t){n.$Message.success(t.msg),n.classList.splice(a,1)})).catch((function(t){n.$Message.error(t.msg)}))},onchangeIsShow:function(t){var e=this;Object(o["d"])(t.id,t.status).then(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$Message.success(a.msg);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.$Message.error(t.msg)}))}}},m=d,f=(a("1217"),a("5d22")),p=Object(f["a"])(m,n,r,!1,null,"0abca6a2",null);e["default"]=p.exports},1217:function(t,e,a){"use strict";a("2751")},2751:function(t,e,a){},"31b4":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.FromData?a("div",[a("Modal",{attrs:{scrollable:"","footer-hide":"",closable:"",title:t.FromData.title,"z-index":1,width:"700"},on:{"on-cancel":t.cancel},model:{value:t.modals,callback:function(e){t.modals=e},expression:"modals"}},[["/marketing/coupon/save.html"===t.FromData.action?a("div",{staticClass:"radio acea-row row-middle"},[a("div",{staticClass:"name ivu-form-item-content"},[t._v("优惠券类型")]),a("Radio-group",{on:{"on-change":t.couponsType},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},[a("Radio",{attrs:{label:0}},[t._v("通用券")]),a("Radio",{attrs:{label:1}},[t._v("品类券")]),a("Radio",{attrs:{label:2}},[t._v("商品券")])],1)],1):t._e()],a("form-create",{ref:"fc",staticClass:"formBox",attrs:{option:t.config,rule:Array.from(t.FromData.rules),handleIcon:"false"},on:{"on-submit":t.onSubmit}})],2)],1):t._e()},r=[],s=(a("ac67"),a("1bc7"),a("32ea"),a("357a")),o=a("b0a6"),i=a.n(o),c=a("6b6c"),u=a("7736");function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function d(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var m={name:"edit",components:{formCreate:i.a.$form()},computed:d({},Object(u["e"])("userLevel",["taskId","levelId"])),props:{FromData:{type:Object,default:null}},data:function(){return{modals:!1,type:0,config:{global:{upload:{props:{onSuccess:function(t,e){200===t.status?e.url=t.data.src:this.Message.error(t.msg)}}}}}}},methods:{couponsType:function(){this.$parent.addType(this.type)},onSubmit:function(t){var e=this,a={};a=t,Object(c["a"])({url:this.FromData.action,method:this.FromData.method,data:a}).then((function(t){e.$parent.getList(),e.$Message.success(t.msg),e.modals=!1,setTimeout((function(){e.$emit("submitFail")}),1e3)})).catch((function(t){e.$Message.error(t.msg)}))},cancel:function(){this.type=0}}},f=m,p=(a("a116"),a("5d22")),h=Object(p["a"])(f,n,r,!1,null,"6b606342",null);e["a"]=h.exports},4575:function(t,e,a){},8593:function(t,e,a){"use strict";a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return o})),a.d(e,"v",(function(){return i})),a.d(e,"g",(function(){return c})),a.d(e,"e",(function(){return u})),a.d(e,"f",(function(){return l})),a.d(e,"d",(function(){return d})),a.d(e,"r",(function(){return m})),a.d(e,"j",(function(){return f})),a.d(e,"q",(function(){return p})),a.d(e,"t",(function(){return h})),a.d(e,"w",(function(){return g})),a.d(e,"h",(function(){return b})),a.d(e,"u",(function(){return v})),a.d(e,"i",(function(){return y})),a.d(e,"s",(function(){return _}));var n=a("6b6c");function r(t){return Object(n["a"])({url:"setting/config_class",method:"get",params:t})}function s(t){return Object(n["a"])({url:"setting/config_class/create",method:"get"})}function o(t){return Object(n["a"])({url:"setting/config_class/".concat(t,"/edit"),method:"get"})}function i(t){return Object(n["a"])({url:"setting/config_class/set_status/".concat(t.id,"/").concat(t.status),method:"PUT"})}function c(t){return Object(n["a"])({url:"setting/config",method:"get",params:t})}function u(t){return Object(n["a"])({url:"setting/config/create",method:"get",params:t})}function l(t){return Object(n["a"])({url:"/setting/config/".concat(t,"/edit"),method:"get"})}function d(t,e){return Object(n["a"])({url:"setting/config/set_status/".concat(t,"/").concat(e),method:"PUT"})}function m(t){return Object(n["a"])({url:"setting/group",method:"get",params:t})}function f(t){return Object(n["a"])({url:t.url,method:t.method,data:t.datas})}function p(t){return Object(n["a"])({url:"setting/group/".concat(t),method:"get"})}function h(t){return Object(n["a"])({url:"system/log/search_admin",method:"GET"})}function g(t){return Object(n["a"])({url:"system/log",method:"GET",params:t})}function b(){return Object(n["a"])({url:"setting/get_kf_adv",method:"get"})}function v(t){return Object(n["a"])({url:"setting/set_kf_adv",method:"post",data:t})}function y(){return Object(n["a"])({url:"setting/get_user_agreement",method:"get"})}function _(t){return Object(n["a"])({url:"setting/set_user_agreement",method:"post",data:t})}},a116:function(t,e,a){"use strict";a("4575")}}]);