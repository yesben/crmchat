import { mobileScoket } from '@/libs/socket';
import { userRecord, serviceUpload } from '@/api/kefu';
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
      isShowProductModel: false // 是否显示携带商品
    }
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
        this.productMessage = e.data.productInfo;
      }

      if(e.data.type == 'openCustomeServer') {
        this.bus.pageWs.then((ws) => {
          ws.send({ type: 'to_chat', data: { id: this.chatServerData.to_user_id } });
        })
      }

      if(e.data.type == 'closeCustomeServer') {
        this.bus.pageWs.then((ws) => {
          ws.send({ type: 'to_chat', data: { id: 0 } });
        })
      }


    });
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
    // 查看当前是否有客服在线, 若不在线，跳转到反馈界面
    getUserRecord() {
      let postData = {
        uid: this.upperData.uid || getLoc('uid') || 0,
        limit: 20,
        // user_id: this.upperData.uid ? 0 : getLoc('user_id')
        // idTo: '',
        // toUserId: ''
      }

      userRecord(postData).then(res => {
        if(res.status == 200) {
          this.chatServerData = res.data;
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
          document.title = res.data.nickname ? `正在和${res.data.nickname}对话中 - ${this.chatServerData.site_name}` : '正在和游客对话中 - ' + this.chatServerData.site_name;
          this.connentServer(); // 建立socket 链接
        };
        if(res.status == 400) {
          this.$router.push({ name: 'customerOutLine' });
        }
      }).catch(rej => {
        if(rej.status == 400) {
          this.$router.push({ name: 'customerOutLine' });
        }
      })
    },
    // 建立连接
    connentServer() {
      let token = getLoc('mobile_token');
      this.bus.pageWs = mobileScoket(true, token);
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
                phone: this.userMessage.phone ? this.userMessage.phone : this.chatServerData.phone
              }
            })
          })
        })

        ws.$on('mssage_num', data => {
          if(data.num > 0) {
            this.mp3.play();
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
    // 文本发送
    sendText() {
      if(this.userMessage) {
        this.sendMsg(this.userMessage, 1);
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
    // 选择表情
    select(item) {
      if(this.$route.query.deviceType == 'Mobile') {
        this.userMessage += `[${item}]`
      } else {
        this.inputConType = 1;
        this.userMessage += `[${item}]`
      }
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
    }
  }
}