(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13664435"],{"40db":function(t,e,s){"use strict";s("487a")},"46bb":function(t,e,s){"use strict";s("9628")},"487a":function(t,e,s){},"4d9e":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pc_customerServer"},[1==t.upperData.noCanClose?a("div",{staticClass:"fixed"}):t._e(),a("div",{staticClass:"pc_customerServer_container max-width_con",class:{"max-width_advertisement":1==t.upperData.noCanClose||"center"==t.upperData.windowStyle}},[a("div",{staticClass:"pc_customerServer_container_header"},[a("div",{staticClass:"pc_customerServer_container_header_title"},[a("img",{attrs:{src:t.chatServerData.to_user_avatar,alt:""}}),a("span",[t._v(t._s(t.chatServerData.to_user_nickname))])]),"1"!=t.upperData.noCanClose?a("div",{staticClass:"pc_customerServer_container_header_handle",on:{click:t.closeIframe}},[a("span",{staticClass:"iconfont"},[t._v("")])]):t._e()]),a("div",{staticClass:"layout_content"},[a("div",{staticClass:"layout_customerServer_content"},[a("div",{staticClass:"pc_customerServer_container_content"},[t.isShowProductModel?a("div",{staticClass:"productMessage_container"},[a("div",{staticClass:"productMessage_container_image"},[a("img",{attrs:{src:t.productMessage.image,alt:""}})]),a("div",{staticClass:"productMessage_container_content"},[a("div",{staticClass:"productMessage_container_content_title"},[t._v(t._s(t.productMessage.store_name))]),a("div",{staticClass:"productMessage_container_content_priceOrHandle"},[a("div",[t._v("￥"+t._s(t.productMessage.price))]),a("div",{on:{click:t.sendProduct}},[t._v("发送客服")])])])]):t._e(),a("happy-scroll",{attrs:{size:"1",resize:"","hide-horizontal":"","scroll-top":t.scrollTop},on:{"vertical-start":t.scrollHandler}},[a("div",{staticClass:"scroll_content",class:{pt140:t.isShowProductModel||2==t.inputConType},attrs:{id:"chat_scroll"}},[a("Spin",{directives:[{name:"show",rawName:"v-show",value:t.isLoad,expression:"isLoad"}]},[a("Icon",{staticClass:"demo-spin-icon-load",attrs:{type:"ios-loading",size:"18"}}),a("div",[t._v("Loading")])],1),a("div",{staticClass:"chart_list"},t._l(t.records,(function(e,s){return a("div",{key:s,staticClass:"chart_list_item"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"item.show"}],staticClass:"chart_list_item_time"},[t._v(t._s(e.time))]),a("div",{staticClass:"chart_list_item_content",class:{"right-box":e.user_id==t.chatServerData.user_id}},[a("div",{staticClass:"chart_list_item_avatar"},[a("img",{attrs:{src:e.avatar,alt:""}})]),e.msn_type<=2?a("div",{staticClass:"chart_list_item_text"},[a("span",{domProps:{innerHTML:t._s(t.replace_em(e.msn))}})]):t._e(),3==e.msn_type?a("div",{staticClass:"chart_list_item_img"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.msn,expression:"item.msn"}]})]):t._e(),5==e.msn_type?a("div",{staticClass:"chart_list_item_imgOrText"},[a("div",{staticClass:"order-wrapper"},[a("div",{staticClass:"img-box"},[a("img",{attrs:{src:e.other.image,alt:""}})]),a("div",{staticClass:"order-info"},[a("div",{staticClass:"price-box"},[a("div",{staticClass:"num"},[t._v("¥ "+t._s(e.other.price))])]),a("div",{staticClass:"name"},[t._v(t._s(e.other.store_name))])])])]):t._e()])])})),0)],1)])],1),a("div",{staticClass:"pc_customerServer_container_footer"},[a("div",{staticClass:"pc_customerServer_container_footer_header"},[2==t.inputConType?a("div",{staticClass:"pc_customerServer_container_footer_emoji"},t._l(t.emojiList,(function(e,s){return a("div",{key:s,staticClass:"emoji-item"},[a("i",{staticClass:"em",class:e,on:{click:function(s){return s.stopPropagation(),t.select(e)}}})])})),0):t._e(),a("div",{staticClass:"pc_customerServer_container_footer_header_handle"},[a("div",{on:{click:function(e){t.inputConType=2,t.goPageBottom()}}},[a("img",{attrs:{src:s("fbb1"),alt:""}})]),a("div",[a("img",{attrs:{src:s("df8a"),alt:""}}),a("input",{staticClass:"type_file",attrs:{type:"file",accept:".jp2,.jpe,.jpeg,.jpg,.png,.svf,.tif,.tiff"},on:{change:t.uploadFile}})])])]),a("div",{staticClass:"pc_customerServer_container_footer_input",on:{click:function(e){t.inputConType=1}}},[a("div",{directives:[{name:"paste",rawName:"v-paste",value:t.handleParse,expression:"handleParse"}],ref:"inputDiv",staticClass:"pc_customerServer_container_footer_input-textarea",class:{readyEmojiHeight:2==t.inputConType},attrs:{contenteditable:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.sendText.apply(null,arguments)}}})]),a("div",{staticClass:"pc_customerServer_container_footer_handle"},[a("div",{staticClass:"pc_customerServer_container_footer_handle_send",on:{click:t.sendText}},[a("span",[t._v("发送")])])]),"1"!=t.upperData.noCanClose&&"center"!=t.upperData.windowStyle?a("div",{staticClass:"pc_customerServer_container_footer_copyright",on:{click:t.tolink}},[a("span",[t._v("CRMChat开源客服系统")])]):t._e()])]),"1"==t.upperData.noCanClose||"center"==t.upperData.windowStyle?a("div",{staticClass:"pc_customerServer_container_advertisement"},[a("div",{staticClass:"advertisement"},[a("div",{domProps:{innerHTML:t._s(t.advertisement)}}),a("div",{staticClass:"copyright",on:{click:t.tolink}},[a("span",[t._v("CRMChat开源客服系统")])])])]):t._e()])])])},i=[],r=(s("a481"),s("6db4")),c=s("7624"),o=s("c58a"),n={components:{HappyScroll:r["HappyScroll"]},mixins:[o["a"]],data:function(){return{happyScroll:!1,isLoad:!1,scrollTop:0,emojiList:c["a"],inputConType:1}},computed:{records:function(){var t=this;return this.chatServerData.serviceList.map((function(e,s){return e.time=t.$moment(1e3*e.add_time).format("MMMDo H:mm"),s?e.add_time-t.chatServerData.serviceList[s-1].add_time>=300?e.show=!0:e.show=!1:e.show=!0,e}))}},methods:{getScrollTop:function(){console.log(123)},getScrollEnd:function(){console.log(321)},scrollHandler:function(t){var e=this;console.log("滑动到顶部了"),this.isLoad=!0,setTimeout((function(){e.isLoad=!1}),2e3)},replace_em:function(t){return t=t.replace(/\[em-([a-z_]*)\]/g,"<span class='em em-$1'/></span>"),t}}},l=n,d=(s("46bb"),s("40db"),s("2877")),p=Object(d["a"])(l,a,i,!1,null,"36fa49ac",null);e["default"]=p.exports},9628:function(t,e,s){},df8a:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACuklEQVRYR+2ZP2gTURzHv793NqIQUHRwEMG4OArJOwjuosRFShahalVaVNDJycE4ODkpWKGKrRRcYrEQAiIOXaRwLweOXWxAHRwUBwc14d5PrrTl9Xr/khJyQ27N+33vk+/v5ft+d6FSqXQOwCwzH0WGLiL6BmCKSqXS16zBbfrkQ1KxWOQMGbcDZRug67qUBVjTtBFgPx0ZOdiPa2bNyMGhOLh54gDoENG0UurDbkGi6vtqsXniENFaq9U6MQIEkDqoM9/iQbUzqFur1USj0fC2BgZzQw77LLZt+5Dnea8BnMkcoJRSaq3fADhmupp6Dw6yxVLKKa31EwB7g/cZKmC5XN7X6XSeAbhsgP0CcHDoLZZSFph5kZlPGRP0JyIa11p/7hmwWq1a7Xb7gl+olFokor4ncdu2z3uetwDggOHcfC6Xu7mysvKn55PEtu3jWusFZj7tCxLRS6XU9V4h/QhpNpsPtNb3fJkNuH9CiNtKqdlN2J4ApZSTzPyYmfPbfl09QoZFCIAvlmWNO47T6nncKhaLh/3HUQDrbQ270joZESHvLcu66DjOz6B2ooNSyrPMPMfMR4ziVSHEJWaeZuZrxsaObXdIhLAQ4mGlUrlfq9V02BePBMzlcvu73e4jZr4VaOfTsbGxu/4GZmaSUj5PgtyIkBkAVwIRMuG6bjMuVyMBAawCOGm4852IJpVS70zBJMi4CFFKrSWFfhygWfvWf/Xguu6PMMENyBfMfNVsNxEtaa1fmWELYD6fz99YXl7+mwTnfx4LSES/ieiOUmouSSwMMlCzI0KSNGMBieijEGLCcZx2GiF/TQxkaISk0Y10sFAo7KnX61uzWBqxCMjICEmjmRgzaUSCa3wnbdtez8xKpbIUFSFptAcCmObGadeMANM6FbVu5ODAHNyt8CDqs/8SPet/Q/wHlnT3YJqY1i4AAAAASUVORK5CYII="},fbb1:function(t,e){t.exports="data:image/png;base64,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"}}]);