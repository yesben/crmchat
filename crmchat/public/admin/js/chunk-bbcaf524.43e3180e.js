(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bbcaf524"],{"6d86":function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"i-layout-page-header"},[i("div",{staticClass:"i-layout-page-header"},[i("span",{staticClass:"ivu-page-header-title"},[t._v(t._s(t.$route.meta.title))])])]),i("Card",{staticClass:"ivu-mt",attrs:{bordered:!1,"dis-hover":""}},[i("Table",{staticClass:"mt25",attrs:{columns:t.thead,data:t.tbody,loading:t.loading,"highlight-row":"","no-userFrom-text":"暂无数据","no-filtered-userFrom-text":"暂无筛选结果"},scopedSlots:t._u([{key:"image",fn:function(t){var e=t.row;return[i("div",{directives:[{name:"viewer",rawName:"v-viewer"}],staticClass:"image-wrap"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.image,expression:"row.image"}]})])]}},{key:"status",fn:function(e){var r=e.row;return[i("i-switch",{attrs:{value:r.status,"true-value":1,"false-value":0,size:"large"},on:{"on-change":function(e){return t.statusChange(r)}},model:{value:r.status,callback:function(e){t.$set(r,"status",e)},expression:"row.status"}},[i("span",{attrs:{slot:"open"},slot:"open"},[t._v("启用")]),i("span",{attrs:{slot:"close"},slot:"close"},[t._v("禁用")])])]}},{key:"action",fn:function(e){var r=e.row;return[i("a",{on:{click:function(e){return t.edit(r)}}},[t._v("编辑")])]}}])}),i("div",{staticClass:"acea-row row-right page"},[i("Page",{attrs:{total:t.total,current:t.page,"page-size":t.limit,"show-elevator":"","show-total":""},on:{"on-change":t.pageChange}})],1)],1),i("Modal",{attrs:{title:"编辑会员权益","footer-hide":"","z-index":555},model:{value:t.modal1,callback:function(e){t.modal1=e},expression:"modal1"}},[i("Form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":80}},[i("Input",{staticStyle:{display:"none"},model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}}),i("Input",{staticStyle:{display:"none"},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}}),i("Input",{staticStyle:{display:"none"},model:{value:t.form.right_type,callback:function(e){t.$set(t.form,"right_type",e)},expression:"form.right_type"}}),i("FormItem",{attrs:{label:"权益名称",prop:"title"}},[i("Input",{attrs:{placeholder:"请输入权益名称",disabled:""},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),i("FormItem",{attrs:{label:"展示名称",prop:"show_title"}},[i("Input",{attrs:{placeholder:"请输入展示名称"},model:{value:t.form.show_title,callback:function(e){t.$set(t.form,"show_title",e)},expression:"form.show_title"}})],1),i("FormItem",{attrs:{label:"权益图标",prop:"image"}},[i("div",{staticClass:"image-group",on:{click:t.callImage}},[t.form.image?i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.form.image,expression:"form.image"}]}):i("Icon",{attrs:{type:"ios-camera-outline",size:"26"}})],1),i("Input",{staticStyle:{display:"none"},model:{value:t.form.image,callback:function(e){t.$set(t.form,"image",e)},expression:"form.image"}})],1),i("FormItem",{attrs:{label:"权益简介",prop:"show_title"}},[i("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:10},placeholder:"请输入权益简介"},model:{value:t.form.explain,callback:function(e){t.$set(t.form,"explain",e)},expression:"form.explain"}})],1),i("FormItem",{directives:[{name:"show",rawName:"v-show",value:"coupon"!==t.form.right_type&&"vip_price"!==t.form.right_type,expression:"form.right_type !== 'coupon' && form.right_type !== 'vip_price'"}],attrs:{label:"offline"===t.form.right_type||"express"===t.form.right_type||"vip_price"===t.form.right_type?"折扣数(%)":"积分倍数",prop:"number"}},[i("InputNumber",{attrs:{min:1},model:{value:t.form.number,callback:function(e){t.$set(t.form,"number",e)},expression:"form.number"}})],1),i("FormItem",[i("Button",{attrs:{type:"primary"},on:{click:function(e){return t.formSubmit("form")}}},[t._v("提交")])],1)],1)],1),i("Modal",{attrs:{width:"950px",scrollable:"","footer-hide":"",closable:"",title:"选择权益图标","z-index":888},model:{value:t.modal2,callback:function(e){t.modal2=e},expression:"modal2"}},[i("uploadPictures",{directives:[{name:"show",rawName:"v-show",value:t.modal2,expression:"modal2"}],attrs:{isChoice:"单选",gridBtn:t.gridBtn,gridPic:t.gridPic},on:{getPic:t.getPic}})],1)],1)},a=[],o=(i("8e6e"),i("ac6a"),i("456d"),i("7f7f"),i("bd86")),s=i("2f62"),l=i("c24f"),n=i("b0e7");function m(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,r)}return i}function c(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?m(Object(i),!0).forEach((function(e){Object(o["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):m(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var u={components:{uploadPictures:n["a"]},data:function(){return{thead:[{title:"权益名称",key:"title"},{title:"展示名称",key:"show_title"},{title:"权益图标",slot:"image"},{title:"权益简介",key:"explain"},{title:"权益状态",slot:"status"},{title:"操作",slot:"action"}],tbody:[],loading:!1,total:0,page:1,limit:30,modal1:!1,form:{id:"",right_type:"",title:"",show_title:"",image:"",explain:"",number:1,status:1},rules:{title:[{required:!0,message:"请输入权益名称",trigger:"blur"}],show_title:[{required:!0,message:"请输入展示名称",trigger:"blur"}],image:[{required:!0,message:"请上传权益图标"}],explain:[{required:!0,message:"请输入权益简介",trigger:"blur"}],number:[{required:!0,type:"integer",message:"请输入正整数"}]},modal2:!1,gridPic:{xl:6,lg:8,md:12,sm:12,xs:12},gridBtn:{xl:4,lg:8,md:8,sm:8,xs:8}}},computed:c({},Object(s["e"])("media",["isMobile"])),created:function(){this.getRightList()},methods:{getRightList:function(){var t=this;this.loading=!0,Object(l["t"])().then((function(e){var i=e.data,r=i.count,a=i.list;t.loading=!1,t.total=r,t.tbody=a})).catch((function(e){t.loading=!1,t.$Message.error(e)}))},statusChange:function(t){this.form.id=t.id,this.form.right_type=t.right_type,this.form.title=t.title,this.form.show_title=t.show_title,this.form.image=t.image,this.form.explain=t.explain,this.form.number=t.number,this.form.status=t.status,this.rightSave()},edit:function(t){this.modal1=!0,this.form.id=t.id,this.form.status=t.status,this.form.right_type=t.right_type,this.form.title=t.title,this.form.show_title=t.show_title,this.form.image=t.image,this.form.explain=t.explain,this.form.number=t.number},pageChange:function(t){this.page=t,this.getRightList()},rightSave:function(){var t=this;Object(l["u"])(this.form).then((function(e){t.modal1=!1,t.getRightList(),t.$Message.success(e.msg)})).catch((function(e){t.$Message.error(e.msg)}))},formSubmit:function(t){var e=this;this.$refs[t].validate((function(t){t&&e.rightSave()}))},callImage:function(){this.modal2=!0},getPic:function(t){this.form.image=t.att_dir,this.modal2=!1}}},f=u,p=(i("c95c"),i("2877")),d=Object(p["a"])(f,r,a,!1,null,"32eb0011",null);e["default"]=d.exports},"90db":function(t,e,i){},c95c:function(t,e,i){"use strict";i("90db")}}]);