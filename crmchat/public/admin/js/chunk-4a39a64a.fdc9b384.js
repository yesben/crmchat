(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a39a64a"],{5233:function(t,e,n){"use strict";var a=n("b418"),s=n.n(a);s.a},b418:function(t,e,n){},f2e4:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"i-layout-page-header"},[n("div",{staticClass:"i-layout-page-header"},[n("span",{staticClass:"ivu-page-header-title"},[t._v(t._s(t.$route.meta.title))])])]),n("div",{staticClass:"content"},[n("p",{staticClass:"font-w"},[t._v("1. 新版统计代码获取 （不想手工添加代码？立刻一键安装）")]),n("p",[t._v("此代码同时适用于PC端、移动端的页面，以异步加载形式进行加载，数据更准确、加载速度更快。请将此代码复制并粘贴到您要跟踪的每个网页中。")]),t._m(0),n("div",{staticClass:"other-wrap"},[n("a",{staticClass:"btn btn-blue btn-large",attrs:{href:"javascript:void(0);"},on:{click:function(e){return t.getCopy()}}},[n("span",[t._v("复制代码")])]),t.cloneTip?n("span",{staticClass:"setting-highlight"},[t._v("已复制到剪贴板！")]):t._e()]),n("p",{staticClass:"font-w"},[t._v("2. 代码安装说明 安装实例 建站工具中的安装方法")]),n("p",{staticClass:"text-i"},[t._v("1. 请将代码添加到网站全部页面的标签前。")]),n("p",{staticClass:"text-i"},[t._v("2. 建议在header.htm类似的页头模板页面中安装，以达到一处安装，全站皆有的效果。")]),n("p",{staticClass:"text-i"},[t._v("3. 如需在JS文件中调用统计分析代码，请直接去掉以下代码首尾的，后，放入JS文件中即可。")]),n("p",{staticClass:"font-w"},[t._v("3. 代码检测")]),n("p",{staticClass:"text-i"},[t._v("代码安装完成后，您可以在“代码安装检查”页面自动检测或手动检测代码安装情况。")]),n("p",{staticStyle:{"padding-top":"20px"}},[t._v("小贴士：")]),n("p",[t._v("1.此代码不会影响您网站页面的显示，请您放心使用。")]),n("p",[t._v("2.如果您有技术上的疑问，可咨询您的网站管理员、托管公司，或者百度推广顾问。")])])])},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"code-content-wrap"},[n("textarea",{staticClass:"code",attrs:{id:"NormalCodeTextarea"}},[t._v('<script>\n  var _hmt = _hmt || [];\n  (function() {\n  var hm = document.createElement("script");\n  hm.src = "https://hm.baidu.com/hm.js?4630a77947abc101ccd8b2887d899f35";\n  var s = document.getElementsByTagName("script")[0];\n  s.parentNode.insertBefore(hm, s);\n  })();\n<\/script>\n')])])}],c=(n("8e6e"),n("ac6a"),n("456d"),n("ade3")),i=n("2f62");function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){Object(c["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var l={name:"setting_user",computed:r(r(r({},Object(i["e"])("media",["isMobile"])),Object(i["e"])("userLevel",["categoryId"])),{},{labelWidth:function(){return this.isMobile?void 0:75},labelPosition:function(){return this.isMobile?"top":"left"}}),data:function(){return{cloneTip:!1}},mounted:function(){},methods:{getCopy:function(){var t=this.copyToClipboard(document.getElementById("NormalCodeTextarea"));t&&(this.cloneTip=!0)},copyToClipboard:function(t){var e,n,a="_hiddenCopyText_",s="INPUT"===t.tagName||"TEXTAREA"===t.tagName;if(s)c=t,e=t.selectionStart,n=t.selectionEnd;else{if(c=document.getElementById(a),!c){var c=document.createElement("textarea");c.style.position="absolute",c.style.left="-9999px",c.style.top="0",c.id=a,document.body.appendChild(c)}c.textContent=t.textContent}var i,o=document.activeElement;c.focus(),c.setSelectionRange(0,c.value.length);try{i=document.execCommand("copy")}catch(r){i=!1}return o&&"function"===typeof o.focus&&o.focus(),s?t.setSelectionRange(e,n):c.textContent="",i}}},p=l,u=(n("5233"),n("2877")),d=Object(u["a"])(p,a,s,!1,null,"215a92ca",null);e["default"]=d.exports}}]);