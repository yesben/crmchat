(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a5c4b54"],{3346:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("ul",t._l(t.list,(function(e,s){return a("li",{key:s,staticClass:"list-item ",attrs:{"data-type":"0"}},[a("div",{staticClass:"list-box",on:{"!touchstart":function(e){return t.touchStart(e)},"!touchend":function(e){return t.touchEnd(e)},click:t.skip}},[a("div",{staticClass:"list-content"},[t._t("default",null,{row:e})],2)]),a("div",{staticClass:"delete",attrs:{"data-index":s},on:{click:t.deleteItem}},[t._v("删除")])])})),0)])},n=[],i={props:{list:{type:Array,required:!1,default:function(){return[]}}},data:function(){return{startX:0,endX:0}},methods:{skip:function(){},touchStart:function(t){this.startX=t.touches[0].clientX},touchEnd:function(t){var e=t.currentTarget.parentElement;this.endX=t.changedTouches[0].clientX,0==e.dataset.type&&this.startX-this.endX>30&&(this.restSlide(),e.dataset.type=1),1==e.dataset.type&&this.startX-this.endX<-30&&(this.restSlide(),e.dataset.type=0),this.startX=0,this.endX=0},checkSlide:function(){for(var t=document.querySelectorAll(".list-item"),e=0;e<t.length;e++)if(1==t[e].dataset.type)return!0;return!1},restSlide:function(){for(var t=document.querySelectorAll(".list-item"),e=0;e<t.length;e++)t[e].dataset.type=0},deleteItem:function(t){var e=t.currentTarget.dataset.index;this.restSlide(),this.list.splice(e,1)}}},c=i,r=(a("3da9"),a("2877")),l=Object(r["a"])(c,s,n,!1,null,"5dea7562",null);e["a"]=l.exports},"3da9":function(t,e,a){"use strict";var s=a("97ab"),n=a.n(s);n.a},4795:function(t,e,a){t.exports=a.p+"img/head.cfd4b538.gif"},6950:function(t,e,a){"use strict";var s=a("b52a"),n=a.n(s);n.a},"97ab":function(t,e,a){},b52a:function(t,e,a){},d6bc:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"addTag_container"},[t._m(0),a("div",{staticClass:"tag_title"},[t._v("\n    标签名称\n  ")]),t._m(1),a("div",{staticClass:"tag_title"},[t._v("\n    标签成员\n  ")]),t._m(2),a("div",{staticClass:"addTag_container_user"},t._l(t.orderByList,(function(e,s){return a("div",{key:s,staticClass:"addTag_container_user_view"},[a("div",{staticClass:"addTag_container_user_view_orderby"},[t._v(t._s(e.byIndex))]),a("tag-content",{attrs:{list:e.classFly},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"user_message"},[a("div",{staticClass:"user_message_area"},[a("img",{attrs:{src:e.row.image,alt:""}})]),a("div",{staticClass:"user_message_niceName"},[t._v("\n              "+t._s(e.row.nickName)+"\n            ")])])]}}],null,!0)})],1)})),0)])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"addTag_container_header"},[a("div",{staticClass:"header_cancel"},[t._v("取消")]),a("div",{staticClass:"header_title"},[t._v("新建标签")]),a("div",{staticClass:"header_finish"},[t._v("完成")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tag_name_content"},[a("div",{staticClass:"input_box"},[a("input",{attrs:{type:"text"}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tag_name_content add_user"},[a("div",{staticClass:"iconfont"},[t._v("icon")]),a("div",{staticClass:"tag_name_content_message"},[t._v("添加成员")])])}],i=a("3346"),c={components:{tagContent:i["a"]},data:function(){return{orderByList:[{byIndex:"A",classFly:[{image:a("4795"),nickName:"剃头小公举"}]},{byIndex:"B",classFly:[{image:a("4795"),nickName:"剃头小公举"}]}]}}},r=c,l=(a("6950"),a("2877")),d=Object(l["a"])(r,s,n,!1,null,"cb539a7c",null);e["default"]=d.exports}}]);