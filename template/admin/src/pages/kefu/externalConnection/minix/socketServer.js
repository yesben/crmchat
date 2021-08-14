import { mobileScoket } from '@/libs/socket';
import { userRecord, serviceUpload, serviceAdv } from '@/api/kefu';
import { setLoc, getLoc } from '@/libs/util'
import Cookies from "js-cookie";

var mp3 = require('@/assets/video/notice.wav');
export default {
  data() {
    return {
      mp3: new Audio(mp3),
      inputConType: 1,
      userMessage: '',
      chatServerData: {
        avatar: '',
        nickname: '',
        site_name: '',
        user_id: '',
        to_user_avatar: '',
        to_user_id: '',
        to_user_nickname: '',
        uid: '',
        serviceList: [] // 聊天记录
      },
      upperStrataData: {},
      upperData: {}, // 外部链接携带进来的参数
      unreadMessages: '',
      userKey: '',
      productMessage: {},
      isShowProductModel: false, // 是否显示携带商品
      copyFile: '', // 粘贴在输入框中的file文件
      unReadMesage: 0, // 未读消息数
      advertisement: '' // 广告
    }
  },
  // 指令粘贴指令定义
  directives: {
    paste: {
      bind(el, binding, vnode) {
        el.addEventListener("paste", function(event) {
          //这里直接监听元素的粘贴事件
          binding.value(event);
        });
      },
    },
  },
  created() {

    // 获取url参数
    this.upperData = this.$route.query;
    // 更新token
    if(this.upperData.token != getLoc('mobile_token')) {
      setLoc('mobile_token', this.upperData.token);
    }
    // 将url参数存入缓存
    Object.keys(this.upperData).forEach(item => {
      if(this.upperData[item]) {
        setLoc(item, this.upperData[item]);
      }
    });
    this.getUserRecord(); // 查看当前是否有客服在线, 建立socket连接
    // 获取从父页面传递过来的数据
    window.addEventListener("message", e => {
      // 获取图文数据
      if(e.data.type == 'getImgOrText') {
        this.userKey = e.data.key;
        if(e.data.productInfo) {
          this.productMessage = e.data.productInfo;
        }
      }

      if(e.data.type == 'openCustomeServer') {
        this.bus.pageWs.then((ws) => {
          ws.send({ type: 'to_chat', data: { id: this.chatServerData.to_user_id } });

          if(this.unReadMesage) {
            this.getUserRecord()
          }

        })
      }

      if(e.data.type == 'closeCustomeServer') {
        this.bus.pageWs.then((ws) => {
          ws.send({ type: 'to_chat', data: { id: 0 } });
        })
      }


    });


    this.getServiceAdv();
  },
  watch: {
    productMessage: {
      handler(val, oldVal) {
        if(JSON.stringify(val) != JSON.stringify(oldVal)) {
          this.isShowProductModel = true;
          this.goPageBottom(); // 滑动到页面底部
        }
      },
      deep: true
    }
  },
  methods: {
    // 获取客服广告
    getServiceAdv() {
      serviceAdv().then(res => {
        if(res.status == 200) {
          this.advertisement = res.data.content;
        }
      })
    },

    // 查看当前是否有客服在线, 若不在线，跳转到反馈界面
    getUserRecord() {
      let postData = {
        uid: this.upperData.uid || getLoc('uid') || 0,
        limit: 20,
        nickname: this.upperData.nickName,
        phone: this.upperData.phone,
        sex: this.upperData.sex,
        avatar: this.upperData.avatar,
        openid: this.upperData.openid,
        kefu_id: this.upperData.kefu_id || 0
      }

      userRecord(postData).then(res => {
        if(res.status == 200) {
          this.chatServerData = res.data;
          console.log(this.chatServerData);
          this.$nextTick(() => {
            this.happyScroll = !this.happyScroll;
          })

          this.unReadMesage = 0;
          this.goPageBottom();
          let cookieData = {
            nickname: '',
            uid: '',
            avatar: ''
          };
          if(res.data.is_tourist == 1) {

            Object.keys(cookieData).forEach(item => {
              setLoc(item, getLoc(item) ? getLoc(item) : res.data[item]);
            })
          };
          this.goPageBottom(); // 滑动到页面底部
          document.title = res.data.to_user_nickname ? `正在和${res.data.to_user_nickname}对话中 - ${this.chatServerData.site_name}` : '正在和游客对话中 - ' + this.chatServerData.site_name;
          this.connentServer(); // 建立socket 链接
        };




        if(res.status == 400) {
          this.$router.push({
            name: 'customerOutLine',
            query: this.$route.query
          });
        }
      }).catch(rej => {
        if(rej.status == 400) {
          this.$router.push({ name: 'customerOutLine', query: this.$route.query });
        }
      })
    },
    // 建立连接
    connentServer() {
      let token = getLoc('mobile_token');
      let formTerminal = this.upperData.deviceType == 'Mobile' ? 'h5' : 'pc'
      this.bus.pageWs = mobileScoket(true, token, formTerminal);
      this.bus.pageWs.then((ws) => {
        // 发送消息监听函数
        ws.$on(["reply", "chat"], data => {
          this.chatServerData.serviceList.push(data);
          this.userMessage = '';
          this.goPageBottom(); // 滑动到页面底部
        });

        ws.$on("reply", (data) => {
          this.mp3.play();
        });

        ws.$on('success', data => {

          this.bus.pageWs.then((ws) => {
            ws.send({
              type: 'user',
              data: {
                to_user_id: this.chatServerData.to_user_id,
                uid: this.chatServerData.uid,
                nickname: this.chatServerData.nickname,
                avatar: this.chatServerData.avatar,
                phone: this.userMessage.phone ? this.userMessage.phone : this.chatServerData.phone,
                openid: this.upperData.openid
              }
            })

            if(this.upperData.isShowTip) {
              ws.send({ type: 'to_chat', data: { id: 0 } });
            };

          })
        })

        ws.$on('mssage_num', data => {
          if(data.num > 0) {
            this.mp3.play();
            this.unReadMesage = data.num;
          }

          parent.postMessage({ type: 'message_num', num: data.num }, "*");
        })



        // let num = 1;
        // setInterval(() => {
        //   parent.postMessage({ type: 'message_num', num: num++ }, "*");
        // }, 1000)

      })
    },

    // 前往页面底部，用于接收到聊天记录后查看到最新消息
    goPageBottom() {
      this.$nextTick(() => {
        this.scrollTop = document.querySelector(
          "#chat_scroll"
        ).offsetHeight;
      });
    },
    // 发送商品给客服
    sendProduct() {
      this.bus.pageWs.then((ws) => {
        ws.send({
          type: 'chat',
          data: {
            to_user_id: this.chatServerData.to_user_id,
            uid: this.chatServerData.uid,
            type: 5,
            other: this.productMessage
          }
        })
      })
      this.isShowProductModel = false;
      this.goPageBottom();
    },
    //微信截图上传图片时触发
    handleParse(e) {
      console.log(e);
      let file = null;
      if(
        e.clipboardData &&
        e.clipboardData.items[0] &&
        e.clipboardData.items[0].type &&
        e.clipboardData.items[0].type.indexOf("image") > -1
      ) {
        //这里就是判断是否有粘贴进来的文件且文件为图片格式
        file = e.clipboardData.items[0].getAsFile();
      } else {
        this.$message({
          type: "warning",
          message:
            "上传的文件必须为图片且无法复制本地图片且无法同时复制多张图片",
        });
        return;
      }
      this.update(file);
    },
    update(e) {
      // 上传照片
      let file = e;
      let param = new FormData(); // 创建form对象
      param.append("filename", "file"); // 通过append向form对象添加数据进去
      param.append("file", file); // 通过append向form对象添加数据进去
      // 添加请求头
      serviceUpload(param).then(res => {
        if(res.status == 200) {
          this.sendMsg(res.data.url, 3);
          this.$refs['inputDiv'].innerText = '';
        }
      })

    },
    // 选择表情
    select(item) {
      if(this.$route.query.deviceType == 'Mobile') {
        this.userMessage += `[${item}]`
      } else {
        this.inputConType = 1;
        this.$refs['inputDiv'].innerText += `[${item}]`
        // this.$refs['inputDiv'].innerHTML += `<span class="em ${item}"></span>`
      }

    },

    // 文本发送
    sendText() {
      let sendMessage;
      if(!this.$refs['inputDiv']) {
        sendMessage = this.userMessage;
      } else {
        sendMessage = this.$refs['inputDiv'].innerText.replace(/(↵)/g, '\n');
      }

      if(sendMessage) {
        this.sendMsg(sendMessage, 1);
        this.$refs['inputDiv'] ? this.$refs['inputDiv'].innerText = '' : this.userMessage = '';
      } else {
        this.$Message.error('请先输入信息，在进行发送');

      }



    },
    // type: 1 普通文本 2 图片
    sendMsg(msn, type, id) {
      let sendData = {
        data: {
          msn: msn,
          type: type,
          to_user_id: this.chatServerData.to_user_id,
          is_tourist: 0
        },
        type: 'chat',
        // user: {
        //   uid: this.chatServerData.uid,
        //   nickname: this.chatServerData.nickname,
        //   phone: this.userMessage.phone ? this.userMessage.phone : this.chatServerData.phone
        // }
      }

      this.bus.pageWs.then((ws) => {
        ws.send(sendData);
      })
    },

    // 滑动到顶部
    scrollHandler(e) {
      this.isLoad = true;
      userRecord({
        limit: 20,
        uid: this.chatServerData.uid,
        idTo: this.chatServerData.serviceList ? this.chatServerData.serviceList[0].id : '',
        toUserId: this.chatServerData.to_user_id
      }).then(res => {
        if(res.status == 200) {
          res.data.serviceList.reverse().forEach(item => {
            this.chatServerData.serviceList.unshift(item);
          })
        }
        this.isLoad = false;
      })
    },
    closeIframe() {
      // 通知外部容器，收起iframe
      parent.postMessage({ type: 'closeWindow' }, "*");
      // 通知服务器，客户收起了聊天框
      this.bus.pageWs.then((ws) => {
        ws.send({ type: 'to_chat', data: { id: 0 } });
      })
    },
    // 聊天输入框获取焦点
    textareaInput() {
      this.inputConType = 1;
    },
    // 打开选择表情弹框
    selectEmoji() {
      this.inputConType = 2;
      this.goPageBottom();
    },

    // 上传图片
    uploadFile(e) {
      let data = {
        filename: 'file',
        file: e.target.files[0]
      }
      let formData = new FormData();
      Object.keys(data).forEach(item => {
        formData.append(item, data[item]);
      })

      serviceUpload(formData).then(res => {
        if(res.status == 200) {
          this.sendMsg(res.data.url, 3);
        }
      }).catch(rej => {
        console.log(rej);
        this.$Message.error(rej.msg);
      })
    },

    // 使用 window.opener 更改session
    setSession(name, value) {
      if(window.opener && Object.getOwnPropertyNames(window.opener).length > 0) {
        window.opener.sessionStorage.setItem(name, value)
      } else {
        sessionStorage.setItem(name, value)
      }
    },
    getSession(name) {
      if(window.opener && Object.getOwnPropertyNames(window.opener).length > 0) {
        return window.opener.sessionStorage.getItem(name)
      } else {
        return sessionStorage.getItem(name)
      }
    },
    tolink() {
      window.open('http://github.crmeb.net/u/CRMChat');
    }
  }
}
