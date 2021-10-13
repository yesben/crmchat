<template>
  <div class="content">
    <p class="font-w">使用简介</p>
    <p class="text-i">网页内快速接入客服，让网页拥有客服窗口，请把一下代码复制到网页最底部。</p>
    <Divider />
    <p class="typetitle">第一种，普通网页</p>

    <div class="fenlei">
      <div class="code-content-wrap">
        <textarea id="NormalCodeTextarea1" class="code" rows="20">
<script>
  (function() {
  _s = document.createElement('script');
  _s.src="{{siteUrl}}/customerServer.js"
  _s.onload = function(){
  var option = {
        "authInit":true,
        openUrl: '{{siteUrl}}/',
        token: '4109fbb2d7bc3d5559348278816a20bc',
        kefuid:'',//默认为空自动对接客服，可填写指定客服ID
        isShowTip: true, // 初始化成功后，界面右下角会自动创建 “联系客服按钮”， 如无需默认展示，则填写false即可,默认为true
        mobileIcon: '', //  手机端悬浮客服图片
        pcIcon: '', // pc端悬浮客服图片
        windowStyle:'center',//默认空 右下角小弹窗， center 普通中间弹窗样式
        domId: 'customerServerTip',//展示在页面右下角联系客服的dom的id，可根据id获取到dom后自行修改样式, 默认为customerServerTip
        insertDomNode: '.getCode_container', // SPA应用必填，html文件单独引入选填，表示插入客服弹窗的 dom节点，一般为当前界面的根节点，默认为body
        "version":"v4"
      };
      var canCustomerServer = new initCustomerServer(option);
      canCustomerServer.init();
  }
  document.head.appendChild(_s)
  })();
</script>
            </textarea>
        <div class="other-wrap">
          <a class="btn btn-blue btn-large mr10" @click="jiazai" href="javascript:void(0);">点击体验</a>
          <a @click="getCopy('NormalCodeTextarea1')" class="btn btn-blue btn-large" href="javascript:void(0);"><span>复制代码</span></a>
        </div>
      </div>

    </div>
    <p class="typetitle">第二种，Vue页面引入</p>
    <div class="fenlei">
      <p class="font-w">第一步：如果您的项目是基于webpack或其他工具构建的，并且您不想通过操作html文件来引入js，则推荐您在入口文件中如（main.js）中写下以下代码</p>
      <div class="code-content-wrap">
        <textarea id="NormalCodeTextarea2" class="code" rows="6">
(function() {
    var hm = document.createElement("script");
    hm.src = "{{siteUrl}}/customerServer.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})()
                </textarea>
        <div class="other-wrap">
          <a @click="getCopy('NormalCodeTextarea2')" class="btn btn-blue btn-large" href="javascript:void(0);"><span>复制代码</span></a>
        </div>
      </div>

      <p class="font-w">第二步：在所需使用crmChat服务的文件中，实例化 initCustomerServer 对象, 调用对象的 init 方法，开始加载crmChat服务</p>
      <div class="code-content-wrap">
        <textarea id="NormalCodeTextarea3" class="code textarea" rows="8">
this.canCustomerServer = new initCustomerServer({
    openUrl: "{{siteUrl}}", // 打开客服聊天框的地址，即：部署后台管理系统的地址
    token: {{tokeninfo.token_md5}},
});
//实例化加载客服组建
this.canCustomerServer.init();
//弹出聊天框
//this.canCustomerServer.getCustomeServer()
        </textarea>
        <div class="other-wrap">
          <a class="btn btn-blue btn-large mr10" @click="jiazai" href="javascript:void(0);">加载客服窗口</a>
          <a class="btn btn-blue btn-large mr10" @click="tanchuang" href="javascript:void(0);">弹开聊天框</a>
          <a @click="getCopy('NormalCodeTextarea3')" class="btn btn-blue btn-large" href="javascript:void(0);"><span>复制代码</span></a>
        </div>
      </div>

    </div>

    <div class="fenlei">
      <p class="font-w">小贴士</p>
      <p class="text-i">如果点击体验，提示客服不在线，请进入客服点击进入客服登录一个账号再试。</p>
      <p class="text-i">如需更换token，请在设置中重新获取。</p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { adminAppCustomer, appReset } from '@/api/kefu';
import initCustomerServer from '@/libs/customerServer';
export default {
  name: 'wangye',
  props: {
    tokeninfo: {},
    siteUrl: '',
    //    cgetCopy: {}
  },
  mounted() {

  },
  methods: {
    //加载客服
    jiazai() {
      let option = {

        openUrl: this.siteUrl,
        deviceType: '', //pc, Mobile
        // domId: 'customerServerTip',
        insertDomNode: '.getCode_container',
        token: this.tokeninfo.token_md5,
        isShowTip: true, // true 展示 false 不展示
        windowStyle: 'center', // center 仅仅pc端有效，在页面中间弹出
        // sendUserData: {
        // uid: '',
        //   nickName: '',
        //   phone: '',
        //   type: '',
        //   sex: '1',
        //   avatar: ''
        // },
        // productInfo: {
        //   store_name: '蒙奇 D 路飞',
        //   stock: '库存',
        //   sales: '122', // 销量
        //   ficti: '10', // 赠送
        //   price: '100',
        //   image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4495e731345f73cb023b1d70197d50e7f451dbc91a88e-UU7MfN_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629276024&t=9d1c5b297dc857ddd2d18c9580dde427'
        // }
      };


      this.canCustomerServer = new initCustomerServer(option);
      this.canCustomerServer.init();
    },
    //弹窗体验
    tanchuang() {
      this.canCustomerServer.getCustomeServer(); // 点击调取客服弹框
    },
    getCopy(id) {
      //      this.cgetCopy(id);
      this.$emit('cgetCopy', id);
    },
  }
}
</script>
<style lang="less" scoped>
.a {
  display: none;
  display: block;
  border-radius: 8px;
  overflow: hidden;
}
</style>

