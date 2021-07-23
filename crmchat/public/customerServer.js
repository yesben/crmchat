
// 图片
var base64ImageObject = {
  // 客服消息
  message: 'data:image/png;base64,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',
  // 打开客服服务，向上按钮
  open: 'data:image/png;base64,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',
  // 关闭客服服务，向下按钮
  putItAway: 'data:image/png;base64,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'
}
const settingObj = {
  wssUrl: 'wss://pro.crmeb.net/adminapi',
  domId: 'customerServerTip',
  openUrl: `${location.origin}/chat/index`,
  deviceType: '',
  httpUrl: 'http://chat.lfmn.fun/',
  token: '',
  insertDomNode: 'body'
};

function customerServerStyle() {

  this.customerServer_container = {
    position: 'fixed',
    bottom: 0,
    right: 0,
    background: 'linear-gradient(270deg, #1890FF 0%, #3875EA 100%)',
    color: '#fff',
    'border-radius': '4px',
    width: '230px',
    padding: '8px 10px',
    'box-sizing': 'border-box',
    cursor: 'pointer',
    'z-index': 99
  }

  this.connect_customerServer = {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'space-between',
  }

  this.connect_customerServer_con = {
    'display': 'flex',
    'align-items': 'center'
  }

  this.connect_customerServer_con_img = {
    width: '20px',
    height: '20px',
    'margin-right': '4px'
  }

  this.connect_customerServer_open = {
    display: 'flex',
    'align-items': 'center'
  }

  this.connect_customerServer_open_img = {
    width: '20px',
    height: '20px'
  }

  this.connent_count = {
    position: 'absolute',
    top: '-12px',
    right: 0,
    background: 'red',
    width: '25px',
    height: '25px',
    'border-radius': '50%',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'font-size': '12px',
    opacity: '.8'
  }

  this.iframe_content = {
    position: 'fixed',
    'z-index': 999,
    right: 0,
    'border-radius': '4px',
    transition: '.3s',

  }
}

const customerServerStyleObject = new customerServerStyle();


function initCustomerServer(option) {
  this.settingObj = settingObj;
  this.settingObj.openUrl = `${option.openUrl || location.origin}/chat/index`; //服务器地址加路由, 若不传入则自动获取引入应用所在服务器的域名
  this.settingObj.domId = option.customerServerTip || 'customerServerTip';
  this.settingObj.insertDomNode = option.insertDomNode || 'body'
  this.settingObj.token = option.token; // token为必填项
  // 判断当前环境下的设备是pc端 || 移动端, 将客户信息挂载到iframe的链接上
  this.setMatchMedia = () => {
    const matchMedia = window.matchMedia;
    if(matchMedia('(max-width: 600px)').matches) {
      this.settingObj.deviceType = 'Mobile';
    } else if(matchMedia('(max-width: 992px)').matches) {
      this.settingObj.deviceType = 'Tablet';
    } else {
      this.settingObj.deviceType = 'Desktop';
    };
    // 获取客服相关参数
    let customerServerData = '';
    if(option.sendUserData && Object.keys(option.sendUserData).length) {
      customerServerData = toParams(option.sendUserData);
      this.settingObj.openUrl += `?${customerServerData}&token=${this.settingObj.token}&deviceType=${this.settingObj.deviceType}`;
    }
  }

  // 创建 联系客服小弹窗按钮（点击时打开聊天界面）,创建iframe容器 并将iframe添加至body中
  this.createCustomerServerContainer = () => {
    // 联系客服按钮dom结构
    let html = `
    <div class="customerServer_container" id="${this.settingObj.domId}">
      <div class="connect_customerServer">
        <div class="connect_customerServer_con">
          <img class="connect_customerServer_con_img" src="${base64ImageObject.message}"></img>
          <span>联系客服</span>
        </div>
        <div class="connect_customerServer_open">
          <img class="connect_customerServer_open_img" src="${base64ImageObject.open}"></img>
        </div>
      </div>
      <div class="connent_count"></div>
    </div>
    `;
    let iframeHtml = `
    <iframe src="${this.settingObj.openUrl}&now=${Math.random()}" frameborder="0" class="iframe_contanier" style="width:100%; height:100%;"></iframe>
  `;

    var app = document.createElement('div');
    app.setAttribute('id', 'app');
    app.innerHTML = html;
    this.body = document.querySelector(this.settingObj.insertDomNode);
    this.body.appendChild(app);
    // 创建完毕后，添加样式，样式可以从外部传入
    this.iframeLayout = document.createElement('div');
    this.iframeLayout.setAttribute('id', 'iframe_content');
    this.setStyleOfCustomerServer(this.iframeLayout, customerServerStyleObject.iframe_content);
    this.iframeLayout.style['z-index'] = 999;
    this.iframeLayout.innerHTML = iframeHtml;
    this.body.appendChild(this.iframeLayout);

    // 获取联系客服按钮dom对象
    this.connentServerDom = document.querySelector(`#${settingObj.domId}`);
    // 获取 iframe 弹框dom对象，便于后期数据交互
    this.iframe_contanier = document.querySelector('.iframe_contanier');

  }

  // 设置基本样式样式
  this.batchSetStyle = () => {
    Object.keys(customerServerStyleObject).forEach(item => {
      if(document.querySelector(`.${item}`)) {
        this.setStyleOfCustomerServer(document.querySelector(`.${item}`), customerServerStyleObject[item]);
      }
    })
  }

  // 设置初始化样式，包括iframe弹宽初始定位，未读消息等, 将iframe 插入到body里面
  this.initPositionStyle = () => {
    let mobileInitStyle = {
      width: '100%',
      height: '100%',
      top: '100%',
      left: 0
    }
    // pc端初始化样式
    let pcInitStyle = {
      width: '400px',
      bottom: '-645px',
      height: '645px',
      'z-index': 999
    }
    // 判断设备的类型，是移动端或是pc端
    if(this.settingObj.deviceType == 'Mobile') {
      this.setStyleOfCustomerServer(this.iframeLayout, mobileInitStyle);
    } else {
      this.setStyleOfCustomerServer(this.iframeLayout, pcInitStyle);
    }

    // 用来展示未读消息数的小圆点
    this.connent_count = document.querySelector('.connent_count');
    this.connent_count.style.display = 'none';
  }

  // 打开客服聊天框
  this.getCustomeServer = () => {

    if(this.settingObj.deviceType == 'Mobile') {
      this.iframeLayout.style.top = '0';
    } else {
      this.iframeLayout.style.bottom = 0;
      this.iframeLayout.style.opacity = '1';
    }
    // 接收来自iframe中的参数
    window.addEventListener("message", e => {
      // 关闭弹框
      if(e.data.type == 'closeWindow') {
        if(this.settingObj.deviceType == 'Mobile') {
          this.iframeLayout.style.top = '100%';
        } else {
          this.iframeLayout.style.bottom = '-645px';
          this.iframeLayout.style.opacity = '0';
        }
      }
      // 收取未读消息

      if(e.data.type == 'message_num') {
        if(e.data.num > 0) {
          this.connent_count.style.display = 'flex';
        } else {
          this.connent_count.style.display = 'none';
        }
        this.connent_count.innerHTML = e.data.num;
      }

    });

    this.iframe_contanier.contentWindow.postMessage({ type: 'getImgOrText', productInfo: option.productInfo }, "*"); // 传送图文数据
    this.iframe_contanier.contentWindow.postMessage({ type: 'openCustomeServer' }, "*"); //通知iframe 打开了客服弹框
  }

  // 更新传送的图文信息
  this.postProductMessage = (productInfo) => {
    this.iframe_contanier.contentWindow.postMessage({ type: 'getImgOrText', productInfo: productInfo }, "*"); // 传送图文数据
  }


}

initCustomerServer.prototype.init = function() {
  this.setMatchMedia();
  this.createCustomerServerContainer();
  this.batchSetStyle();
  this.initPositionStyle();

  // 联系客服小按钮，点击事件
  this.connentServerDom.addEventListener('click', () => {
    this.getCustomeServer();
  })
};

initCustomerServer.prototype.setStyleOfCustomerServer = function(dom, styleObj) {
  Object.keys(styleObj).forEach(item => {
    dom['style'][item] = styleObj[item]
  })
}



// export default initCustomerServer;








// 将token获取并携带
// let scriptToken = document.querySelector('#customerServer').getAttribute('token');
// window.testGetFatherData.token = scriptToken;


// 判断设备类型
// const matchMedia = window.matchMedia;
// if(matchMedia('(max-width: 600px)').matches) {
//   settingObj.deviceType = 'Mobile';
// } else if(matchMedia('(max-width: 992px)').matches) {
//   settingObj.deviceType = 'Tablet';
// } else {
//   settingObj.deviceType = 'Desktop';
// };
// // 获取客服相关参数
// let customerServerData = '';
// if(window.testGetFatherData && Object.keys(window.testGetFatherData)) {
//   customerServerData = toParams(window.testGetFatherData);
//   settingObj.openUrl += `?${customerServerData}&deviceType=${settingObj.deviceType}`;
// }


// const html = `
//     <div class="customerServer_container" id="${settingObj.domId}">
//       <div class="connect_customerServer">
//         <div class="connect_customerServer_con">
//           <img class="connect_customerServer_con_img" src="${base64ImageObject.message}"></img>
//           <span>联系客服</span>
//         </div>
//         <div class="connect_customerServer_open">
//           <img class="connect_customerServer_open_img" src="${base64ImageObject.open}"></img>
//         </div>
//       </div>
//       <div class="connent_count"></div>
//     </div>
// `;

// const iframeHtml = `
//     <iframe src="${settingObj.openUrl}&now=${Math.random()}" frameborder="0" class="iframe_contanier" style="width:100%; height:100%;"></iframe>
//   `;


// window.onload = function() {

//   // 界面右下角联系客服dom
//   var app = document.createElement('div');
//   app.setAttribute('id', 'app');
//   app.innerHTML = html;


//   var body = document.querySelector('body');
//   body.appendChild(app);

//   // iframe dom
//   var iframe = document.createElement('div');
//   iframe.setAttribute('id', 'iframe_content');
//   iframe.innerHTML = iframeHtml;

//   Object.keys(iframe_content_css).forEach(item => {
//     iframe.style[item] = iframe_content_css[item]
//   })
//   // 初始化移动端，以及pc端聊天框样式时，使用定位将其隐藏
//   // 移动端初始化样式
//   let mobileInitStyle = {
//     width: '100%',
//     // height: (window.innerHeight - 50) + 'px',
//     height: '100%',
//     top: '100%',
//     left: 0
//   }
//   // pc端初始化样式
//   let pcInitStyle = {
//     width: '400px',
//     bottom: '-645px',
//     height: '645px'
//   }

//   if(settingObj.deviceType == 'Mobile') {
//     Object.keys(mobileInitStyle).forEach(item => {
//       iframe.style[item] = mobileInitStyle[item];
//     });
//   } else {
//     Object.keys(pcInitStyle).forEach(item => {
//       iframe.style[item] = pcInitStyle[item];
//     });
//   }


//   var connent_count = document.querySelector('.connent_count');
//   Object.keys(connent_count_css).forEach(item => {
//     connent_count.style[item] = connent_count_css[item]
//   })

//   var connentCount = document.querySelector('.connent_count'); // 维度消息数dom节点
//   connentCount.style.display = 'none';


//  ----------------
//   // 接收来自iframe中的参数
//   window.addEventListener("message", e => {
//     // 关闭弹框
//     if(e.data.type == 'closeWindow') {
//       if(settingObj.deviceType == 'Mobile') {
//         iframe.style.top = '100%';
//       } else {
//         iframe.style.bottom = '-645px';
//         iframe.style.opacity = '0';
//       }
//     }
//     // 收取未读消息

//     if(e.data.type == 'message_num') {
//       if(e.data.num > 0) {
//         connentCount.style.display = 'flex';
//       } else {
//         connentCount.style.display = 'none';
//       }
//       connentCount.innerHTML = e.data.num;
//     }

//   });



//   // 获取联系客服按钮id
//   var connentServerDom = document.querySelector(`#${settingObj.domeId}`);
//   // 样式引入
//   Object.keys(customerServer_container_css).forEach(item => {
//     connentServerDom.style[item] = customerServer_container_css[item];
//   })

//   // connect_customerServer 样式
//   var connect_customerServer = document.querySelector('.connect_customerServer');
//   Object.keys(connect_customerServer_css).forEach(item => {
//     connect_customerServer.style[item] = connect_customerServer_css[item];
//   })

//   // connect_customerServer_con 样式

//   var connect_customerServer_con = document.querySelector('.connect_customerServer_con');
//   Object.keys(connect_customerServer_con_css).forEach(item => {
//     connect_customerServer_con.style[item] = connect_customerServer_con_css[item];
//   })

//   var connect_customerServer_con_img = document.querySelector('.connect_customerServer_con img');
//   Object.keys(connect_customerServer_con_img_css).forEach(item => {
//     connect_customerServer_con_img.style[item] = connect_customerServer_con_img_css[item]
//   })

//   var connect_customerServer_open = document.querySelector('.connect_customerServer_open');
//   Object.keys(connect_customerServer_open_css).forEach(item => {
//     connect_customerServer_open.style[item] = connect_customerServer_open_css[item];
//   })

//   var connect_customerServer_open_img = document.querySelector('.connect_customerServer_open img');
//   Object.keys(connect_customerServer_open_img_css).forEach(item => {
//     connect_customerServer_open_img.style[item] = connect_customerServer_open_img_css[item]
//   })





//   // 联系客服 小标签操作 -- 展示联系客服弹窗
//   connentServerDom.addEventListener('click', getCustomeServer);
//   var canCustomerServerType = true; // 是否可以打开客服聊天框
//   body.appendChild(iframe);

//   function getCustomeServer() {



//     if(canCustomerServerType) {
//       if(settingObj.deviceType == 'Mobile') {
//         iframe.style.top = '0';
//       } else {
//         iframe.style.bottom = 0;
//         iframe.style.opacity = '1';
//       }
//     }


//     canCustomerServerType = true;
//     var iframe_contanier;

//     iframe_contanier = document.querySelector('.iframe_contanier');
//     iframe_contanier.contentWindow.postMessage(testGetFatherData, "*"); // 传送图文数据
//     iframe_contanier.contentWindow.postMessage({ type: 'openCustomeServer' }, "*"); //通知iframe 打开了客服弹框
//   }


//   // 如果用户浏览网页超过10秒，则开始进行websocket链接，构造 iframe 聊天框
//   // var timer = null;
//   // var count = 0;
//   // timer = setInterval(() => {
//   //   count++;
//   //   console.log(count);
//   //   // 如果计数大于10 或者 客服服务已经创建，则清空计数器
//   //   if(count > 10 || document.body.querySelector('.iframe_contanier')) {
//   //     clearInterval(timer);
//   //     count = 0;
//   //     getCustomeServer({ canOpen: false });
//   //   }

//   // }, 1000);


// }
// 生成指定范围内的随机数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ajax(options) {
  var xhr = null;
  var params = options.data;
  //创建对象
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  switch(options.type) {
    case 'GET':
      xhr.open(options.type, options.url + "?" + params, options.async);
      xhr.send(null);
      break;
    case 'POST':
      xhr.open(options.type, options.url, options.async);
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhr.setRequestHeader("Authori-zation", `Bearer ${token}`);
      xhr.send(JSON.stringify(params));
      break;
    default:
      break;
  }

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      options.success(xhr.responseText);
    }
  }
}




// 将Object 改装成以 & 符号连接的字符串

function toParams(param) {
  var result = ""
  for(let name in param) {
    if(typeof param[name] != 'function') {
      result += "&" + name + "=" + encodeURI(param[name]);
    }
  }
  return result.substring(1)
}

//set session
function setSen(k, val) {
  if(typeof val == 'string') {
    sessionStorage.setItem(k, val);
    return val;
  }
  sessionStorage.setItem(k, JSON.stringify(val));
  return val;
}

//get session
function getSen(k) {
  let uu = sessionStorage.getItem(k);

  try {
    if(typeof JSON.parse(uu) != 'number') {
      uu = JSON.parse(uu);
    }
  } catch(e) { }
  return uu;
}
//set local
function setLoc(k, val) {
  if(typeof val == 'string') {
    localStorage.setItem(k, val);
    return val;
  }
  localStorage.setItem(k, JSON.stringify(val));
  return val;
}

//get local
function getLoc(k) {
  let uu = localStorage.getItem(k);

  try {
    if(typeof JSON.parse(uu) != 'number') {
      uu = JSON.parse(uu);
    }
  } catch(e) { }
  return uu;
}

//序列化对象和数组
function serialize(data) {
  if(data != null && data != '') {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch(e) {
      if(data instanceof Array) {
        return [];
      }
      return {};
    }
  }
  return data;
}


