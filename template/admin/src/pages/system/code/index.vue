<template>
  <div class="getCode_container">
    <div class="i-layout-page-header">
      <div class="i-layout-page-header">
        <span class="ivu-page-header-title">{{ $route.meta.title }}</span>
      </div>
    </div>
    <div class="content">
      <br>
      <p class="font-w">
        <a style="font-size: 20px" :href="linkUrl" target="_blank">
          点击这里，开始体验
        </a>
      </p>
      <br>

      <p class="font-w">1.crm文件引入说明</p>
      <p class="text-i">1.html引入方式， 在html文件中直接引入js文件 </p>
      <div class="code-content-wrap">
        <textarea id="NormalCodeTextarea" class="code" rows="2">
          <script src="{{srcUrl}}"></script>
        </textarea>
      </div>
      <div class="other-wrap">
        <a @click="getCopy('NormalCodeTextarea')" class="btn btn-blue btn-large" href="javascript:void(0);"><span>复制代码</span></a>
      </div>
      <p class="text-i">2.vue引入方式, 在main.js加入以下代码 </p>
      <div class="code-content-wrap">
        <textarea id="NormalCodeTextarea1" class="code textarea" rows="8">
        (function() {
          var hm = document.createElement("script");
          hm.src = "{{srcUrl}}";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })()
        </textarea>
      </div>
      <div class="other-wrap">
        <a @click="getCopy('NormalCodeTextarea1')" class="btn btn-blue btn-large" href="javascript:void(0);"><span>复制代码</span></a>
      </div>

      <p class="font-w">2. 使用说明</p>
      <p class="text-i">1. 引入js文件后，实例化对象(initCustomerServer)，并传入所需参数，完整示例如下</p>
      <div class="code-content-wrap">
        <textarea id="NormalCodeTextarea2" class="code textarea" rows="30">
              let option = {
                  openUrl: 'http://192.168.31.192:8080',
                  domId: 'customerServerTip',
                  token: '{{token.token}}'
                  sendUserData: {
                    uid: 10,
                    nickName: '张越',
                    phone: '13038593836'
                  },
                  productInfo: {
                    store_name: '蒙奇 D 路飞',
                    stock: '库存',
                    sales: '122', // 销量 
                    ficti: '10', // 赠送
                    price: '100',
                    image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4495e731345f73cb023b1d70197d50e7f451dbc91a88e-UU7MfN_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629276024&t=9d1c5b297dc857ddd2d18c9580dde427'
                  }
                }


                let canCustomerServer = new initCustomerServer(option);
                canCustomerServer.init();
        </textarea>
      </div>
      <br>
      <p class="text-i">2. 参数说明</p>
      <Table :columns="columns1" :data="data1"></Table>
      <br>
      <p class="font-w">3. token获取</p>
      <br>

      <textarea id="NormalCodeTextarea3" class="code textarea" rows="5">
         {{token.token}}
      </textarea>
      <div class="other-wrap">
        <a @click="getCopy('NormalCodeTextarea3')" class="btn btn-blue btn-large" href="javascript:void(0);"><span>复制代码</span></a>
        &nbsp;
        <div @click="resetToken()" class="btn btn-blue btn-large" href="javascript:void(0);"><span>重置token</span></div>

      </div>
      <p style="padding-top:20px;">小贴士：</p>
      <p>1.此代码不会影响您网站页面的显示，请您放心使用。</p>
      <p>2.如果您有技术上的疑问，可咨询您的网站管理员、托管公司、CRMEB。</p>
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
    },
    linkUrl() {
      return `${location.origin}/chat/index?uid=10&nickName=%E5%BC%A0%E8%B6%8A&phone=13038593836&key=1626851220262&type=getImgOrText&time=1626851220262&token=${this.token.token}&deviceType=Mobile&now=0.9937210994959702`;
    }
  },
  data() {
    return {
      canfrime: false,
      srcUrl: `${location.origin}/customerServer.js`,
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
          isRequired: 'false',
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
          message: '交互凭证, 可在页面下方获取'
        },
        {
          name: 'sendUserData',
          type: 'Object',
          isRequired: 'false',
          example: '',
          message: '用户信息，若不填写，则默认用户为游客'
        },
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
          name: 'time',
          type: 'String',
          isRequired: 'true',
          example: 'new Date().getTime()',
          message: '传入时间的时间戳'
        },
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
          name: 'stock',
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
      token: ''
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

            let option = {
              openUrl: location.origin,
              domId: 'customerServerTip',
              insertDomNode: '.getCode_container',
              token: this.token.token,
              sendUserData: {
                uid: 10,
                nickName: '张越',
                phone: '13038593836',
                key: new Date().getTime(),
                type: 'getImgOrText',
                time: new Date().getTime(),
              },
              productInfo: {
                store_name: '蒙奇 D 路飞',
                stock: '库存',
                sales: '122', // 销量 
                ficti: '10', // 赠送
                price: '100',
                image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4495e731345f73cb023b1d70197d50e7f451dbc91a88e-UU7MfN_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629276024&t=9d1c5b297dc857ddd2d18c9580dde427'
              }
            }

            let canCustomerServer = new initCustomerServer(option);
            canCustomerServer.init();
          }
        }
      })
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

<style scoped>
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

#NormalCodeTextarea {
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
</style>
