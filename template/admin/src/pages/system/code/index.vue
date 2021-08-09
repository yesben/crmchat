<template>
  <div class="getCode_container">
  <div class="content">
    <Tabs value="name1">
      <TabPane label="A链接" name="name1">
        <alink :tokeninfo="token" :siteUrl="siteUrl" :cgetCopy='getCopy'></alink>
      </TabPane>
      <TabPane label="网页内嵌" name="name2">
        <wangye :tokeninfo="token" :siteUrl="siteUrl" :cgetCopy='getCopy'></wangye>
      </TabPane>
      <TabPane label="定制开发" name="name3">
        <kaifa :tokeninfo="token" :siteUrl="siteUrl" :cgetCopy='getCopy'></kaifa>
      </TabPane>
      <TabPane label="设置说明" name="name4">
        <setting :tokeninfo="token" :siteUrl="siteUrl" :cgetCopy='getCopy' :cresetToken="resetToken"></setting>
      </TabPane>
    </Tabs>
  </div>
    <Modal v-model="canfrime" title="提示" @on-ok="confirme" @on-cancel="cancel">
      <div class="ivu-modal-confirm">
        <img src="@/assets/images/warring.png" alt="">
        <div>
          token重置后，数据将全部更新，历史数据将会失效，请问是否确定？
        </div>
      </div>
    </Modal>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import { adminAppCustomer, appReset } from '@/api/kefu';
import initCustomerServer from '@/libs/customerServer';
import alink from './components/alink';
import wangye from './components/wangye';
import kaifa from './components/kaifa';
import setting from './components/setting';


export default {
    name: 'setting_user',
    components: {
        alink,
        wangye,
        kaifa,
        setting
    },
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
    },
    linkUrl() {
      return `${location.origin}/chat/index?token=${this.token.token_md5}&noCanClose=1`;
    }
  },
  data() {
    return {
      token: '',
      canfrime: false,
      srcUrl: `${location.origin}/customerServer.js`,
      siteUrl: `${location.origin}`,
      cloneTip: false,
      columns1: [
        {
          title: '参数',
          key: 'name'
        },
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '是否必选',
          key: 'isRequired'
        },
        {
          title: '示例值',
          key: 'example'
        },
        {
          title: '参数说明',
          key: 'message'
        }
      ],

      data1: [
        {
          name: 'openUrl',
          type: 'String',
          isRequired: 'true',
          example: 'http://192.168.31.192:8080',
          message: '部署后台服务的服务器域名，若不填写，则自动获取放置customerServer.js的服务器域名'
        },
        {
          name: 'domId',
          type: 'String',
          isRequired: 'false',
          example: 'customerServerTip',
          message: '展示在页面右下角联系客服的dom的id，可根据id获取到dom后自行修改样式, 默认为customerServerTip'
        },
        {
          name: 'token',
          type: 'String',
          isRequired: 'true',
          example: '',
          message: '交互凭证, 可在该页面下方获取'
        },
        {
          name: 'insertDomNode',
          type: 'String',
          isRequired: 'false',
          example: 'body',
          message: '被插入的dom类名，SPA应用必传，默认插入至body中'
        },
        {
          name: 'type',
          type: 'String',
          isRequired: 'false',
          example: 'pc',
          message: '指定引入crmChat服务的端，若不传，customerServer.js 将自行判断当前所在环境'
        },
        {
          name: 'isShowTip',
          type: 'String',
          isRequired: 'false',
          example: 'true | fasle',
          message: '默认为true，若传入false，则crmChat服务预设的联系客服按钮被隐藏'
        }
      ],
      data2: [
        {
          name: 'uid',
          type: 'String',
          isRequired: 'fasle',
          example: '10',
          message: '用户的id'
        },
        {
          name: 'nickName',
          type: 'String',
          isRequired: 'fasle',
          example: '张三',
          message: '用户昵称'
        },
        {
          name: 'phone',
          type: 'String',
          isRequired: 'fasle',
          example: '138****2765',
          message: '用户联系方式'
        },
        {
          name: 'sex',
          type: 'String',
          isRequired: 'true',
          example: '1',
          message: '用户性别，0 未知 1男 2女'
        },
        {
          name: 'avatar',
          type: 'String',
          isRequired: 'true',
          example: '1',
          message: '用户头像url'
        },
        {
          name: 'openid',
          type: 'String',
          isRequired: 'true',
          example: '1',
          message: '用户的第三方id'
        }
      ],
      data3: [
        {
          name: 'productInfo',
          type: 'Object',
          isRequired: 'true',
          example: '{}',
          message: '商品详情的对象容器'
        },
        {
          name: 'store_name',
          type: 'String',
          isRequired: 'true',
          example: '碎花裙',
          message: '商品名称'
        },

        {
          name: 'sales',
          type: 'Number | String',
          isRequired: 'true',
          example: '100',
          message: '销量'
        },
        {
          name: 'price',
          type: 'Number | String',
          isRequired: 'true',
          example: '10',
          message: '商品价格'
        },
        {
          name: 'image',
          type: 'String',
          isRequired: 'true',
          example: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4495e731345f73cb023b1d70197d50e7f451dbc91a88e-UU7MfN_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629276024&t=9d1c5b297dc857ddd2d18c9580dde427',
          message: '商品图片链接'
        }
      ],
      canCustomerServer: ''
    }
  },

  mounted() {
    this.getAdminAppCustomer();
  },
  methods: {
    // 获取token
    getAdminAppCustomer() {
      adminAppCustomer().then(res => {
        if(res.status == 200) {
          if(res.data.list.length) {
            this.token = res.data.list[0];


            // js 引入
            // (function() {
            //   var hm = document.createElement("script");
            //   hm.src = "../../../libs/customerServer/customerServer.js";
            //   var s = document.getElementsByTagName("script")[0];
            //   s.parentNode.insertBefore(hm, s);
            // })();
            // (function() {
            //   var hm = document.createElement("script");
            //   hm.src = "http://192.168.31.192:8081/customerServer.js";
            //   var s = document.getElementsByTagName("script")[0];
            //   s.parentNode.insertBefore(hm, s);
            // })();
            var option = {

              openUrl: location.origin,
              type: 'pc', // Mobile
              // domId: 'customerServerTip',
              insertDomNode: '.getCode_container',
              token: this.token.token_md5,
              isShowTip: true, // true 展示 false 不展示
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
            }



            this.canCustomerServer = new initCustomerServer(option);
            this.canCustomerServer.init();


          }
        }
      })
    },
    // 点击测试
    text() {
      console.log(1);
      this.canCustomerServer.getCustomeServer(); // 点击调取客服弹框
    },
    // 重置token
    resetToken() {
      this.canfrime = true;
    },
    // 确定重置token
    confirme() {
      appReset(this.token.id).then(res => {
        if(res.status == 200) {
          this.$set(this.token, 'token', res.data.token);
        }
      })
    },
    cancel() { },
    getCopy(id) {
      let content = this.copyToClipboard(document.getElementById(id))
      if(content) this.cloneTip = true
    },
    copyToClipboard(elem) {
      // create hidden text element, if it doesn't already exist
      var targetId = "_hiddenCopyText_";
      var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
      var origSelectionStart, origSelectionEnd;
      if(isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
      } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if(!target) {
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
      } catch(e) {
        succeed = false;
      }
      // restore original focus
      if(currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
      }

      if(isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
      } else {
        // clear temporary content
        target.textContent = "";
      }

      this.$Message.success('已成功复制到粘贴板');

      return succeed;
    }
  }
}
</script>

<style>
  .content {
    width: 100%;
    color: #323437;
    background: #ffffff;
    margin-top: 18px;
    font-size: 13px;
    padding: 10px;
  }
  .table_width {
    padding: 40px;
  }

  .ivu-modal-confirm {
    display: flex;
    align-items: center;
  }
  .ivu-modal-confirm img {
    width: 40px;
    height: 40px;
    margin-right: 30px;
  }

  .font-w {
    font-weight: 800;
    margin: 10px 0;
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
    margin: 4px 0;
    text-align:right;
  }

  .textarea {
    border: none;
    /* height: 40px; */
    width: 100%;
    outline: 0;
    resize: none;
    background-color: #f8f8f8;
    font-family: Arial;
    color: #323437;
    line-height: 24px;
    text-align: left;
  }

  .code {
    border: none;
    /* height: 40px; */
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
  .fenlei{
    margin: 10px 0;
    border: 1px solid #eee;
    padding: 30px;
    padding-bottom: 10px;
    border-radius: 6px;
  }
  .typetitle{
    padding: 4px 7px;
    font-size: 18px;
  }
</style>
