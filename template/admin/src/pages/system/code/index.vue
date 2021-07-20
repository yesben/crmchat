<template>
  <div>
    <div class="i-layout-page-header">
      <div class="i-layout-page-header">
        <span class="ivu-page-header-title">{{ $route.meta.title }}</span>
      </div>
    </div>
    <div class="content">
      <p class="font-w">1. 新版统计代码获取 （不想手工添加代码？立刻一键安装）</p>
      <p>此代码同时适用于PC端、移动端的页面，以异步加载形式进行加载，数据更准确、加载速度更快。请将此代码复制并粘贴到您要跟踪的每个网页中。</p>
      <div class="code-content-wrap">
<textarea id="NormalCodeTextarea" class="code">
<script>
  var _hmt = _hmt || [];
  (function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?4630a77947abc101ccd8b2887d899f35";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
  })();
</script>
</textarea>
      </div>
      <div class="other-wrap">
        <a @click="getCopy()" class="btn btn-blue btn-large" href="javascript:void(0);"><span>复制代码</span></a>
        <span v-if="cloneTip" class="setting-highlight">已复制到剪贴板！</span>
      </div>
      <p class="font-w">2. 代码安装说明 安装实例 建站工具中的安装方法</p>
      <p class="text-i">1. 请将代码添加到网站全部页面的标签前。</p>
      <p class="text-i">2. 建议在header.htm类似的页头模板页面中安装，以达到一处安装，全站皆有的效果。</p>
      <p class="text-i">3. 如需在JS文件中调用统计分析代码，请直接去掉以下代码首尾的，后，放入JS文件中即可。</p>
      <p class="font-w">3. 代码检测</p>
      <p class="text-i">代码安装完成后，您可以在“代码安装检查”页面自动检测或手动检测代码安装情况。</p>


      <p style="padding-top:20px;">小贴士：</p>
      <p>1.此代码不会影响您网站页面的显示，请您放心使用。</p>
      <p>2.如果您有技术上的疑问，可咨询您的网站管理员、托管公司，或者百度推广顾问。</p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'setting_user',
  computed: {
    ...mapState('media', [
      'isMobile'
    ]),
    ...mapState('userLevel', [
      'categoryId'
    ]),
    labelWidth() {
      return this.isMobile ? undefined : 75
    },
    labelPosition() {
      return this.isMobile ? 'top' : 'left'
    }
  },
  data() {
    return {
      cloneTip: false,
    }
  },
  mounted() {

  },
  methods: {
    getCopy(){
      let content = this.copyToClipboard(document.getElementById('NormalCodeTextarea'))
      if(content) this.cloneTip = true
    },
    copyToClipboard(elem) {
      // create hidden text element, if it doesn't already exist
      var targetId = "_hiddenCopyText_";
      var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
      var origSelectionStart, origSelectionEnd;
      if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
      } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
          var target = document.createElement("textarea");
          target.style.position = "absolute";
          target.style.left = "-9999px";
          target.style.top = "0";
          target.id = targetId;
          document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
      }
      // select the content
      var currentFocus = document.activeElement;
      target.focus();
      target.setSelectionRange(0, target.value.length);

      // copy the selection
      var succeed;
      try {
        succeed = document.execCommand("copy");
      } catch (e) {
        succeed = false;
      }
      // restore original focus
      if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
      }

      if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
      } else {
        // clear temporary content
        target.textContent = "";
      }
      return succeed;
    }
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  color: #323437;
  background: #FFFFFF;
  margin-top: 18px;
  font-size: 13px;
  padding: 10px;
}

.font-w {
  font-weight: 800;
}

.text-i {
  text-indent: 2em;
}

.content > p {
  margin-bottom: 6px;
}

.code-content-wrap {
  clear: both;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  padding: 12px 17px;
  background-color: #f8f8f8;
}

.other-wrap {
  margin: 14px 0;
}

#NormalCodeTextarea {
  border: none;
  height: 140px;
  width: 100%;
  outline: 0;
  resize: none;
  background-color: #f8f8f8;
  font-family: Arial;
  color: #323437;
  line-height: 24px;
  text-align: left;
}

.btn {
  display: inline-block;
  zoom: 1;
  padding: 6px 16px;
  border: 1px solid #d9dbdc;
  border-radius: 2px;
  line-height: 1;
  color: #323437;
  cursor: pointer;
  outline: 0;
}

.btn.btn-blue {
  color: #fff;
  background-color: #4f97e7;
  border-color: #3085e3;
}

.setting-highlight {
  color: #f15755;
  margin-left: 5px;
  line-height: 30px;
}
</style>
