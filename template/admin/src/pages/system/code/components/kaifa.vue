<template>
    <div class="content">
        <p class="font-w">使用简介</p>
        <p class="text-i">程序内定制接入客服，深度定制开发说明，省去VUE说明。</p>
        <Divider />
        <p class="typetitle">第一步，引入js</p>
        <div class="fenlei">
            <div class="code-content-wrap">
                <textarea id="NormalCodeTextareakaifa1" class="code" rows="1">
<script src="{{siteUrl}}/customerServer.js"></script>
            </textarea>
            <div class="other-wrap">
                <a @click="getCopy('NormalCodeTextareakaifa1')" class="btn btn-blue btn-large" href="javascript:void(0);"><span>复制代码</span></a>
            </div>
            </div>

        </div>
        <p class="typetitle">第二步，设置参数并初始化</p>
        <div  class="fenlei">
            <p class="font-w">在所需使用crmChat服务的文件中，实例化 initCustomerServer 对象, 调用对象的 init 方法，开始加载crmChat服务</p>
            <div class="code-content-wrap">
                <textarea id="NormalCodeTextareakaifa2" class="code" rows="35">
var option = {
    openUrl: "{{siteUrl}}", // 打开客服聊天框的地址，即：部署后台管理系统的地址，若未填写，则自动获取当前服务器的地址
    token: {{tokeninfo.token_md5}}, // token,与后台交互的凭证
    kefuid:'',//默认为空自动对接客服，可填写指定客服ID
    isShowTip: true, // 初始化成功后，界面右下角会自动创建 “联系客服按钮”， 如无需默认展示，则填写false即可,默认为true
    mobileIcon: '', //  手机端悬浮客服图片
    pcIcon: '', // pc端悬浮客服图片
    windowStyle:'center',//默认空 右下角小弹窗， center 普通中间弹窗样式
    domId: 'customerServerTip',//展示在页面右下角联系客服的dom的id，可根据id获取到dom后自行修改样式, 默认为customerServerTip
    insertDomNode: '.getCode_container', // SPA应用必填，html文件单独引入选填，表示插入客服弹窗的 dom节点，一般为当前界面的根节点，默认为body
    //设置客户信息
    sendUserData: {
        uid: '1', // 用户id
        nickName: '', // 用户昵称
        phone: '', // 用户联系方式
        sex: '1', // 用户性别
        avatar: '', // 用户头像 URL地址
        openid: ''//微信openid
    }，
    //设置默认打开推送产品
    productInfo: {
        store_name: '蒙奇 D 路飞',
        stock: '库存',
        sales: '122', // 销量
        ficti: '10', // 赠送
        price: '100',
        image: ''//产品图片
        proUrl:''//产品链接
    }
};
var canCustomerServer = new initCustomerServer(option);

canCustomerServer.init();

//样式设置说明
canCustomerServer.setStyleOfCustomerServer(this.canCustomerServer.connentServerDom,{
            bottom:'300px',
            left:'50%'
        });
// 调用打开客服弹窗的方法，如果isShowTip为false，就使用这个函数，当然也可以使用A链接
canCustomerServer.getCustomeServer();

                </textarea>

                <p class="font-w">超链接参数说明</p>
                <p class="text-i">
                    <br>token:与后台交互的凭证
                <br>deviceType:手动适应浏览器类型Mobile移动端
                <br>uid:用户ID
                <br>nickName:用户昵称
                <br>phone:用户手机号
                <br>kefu_id:客服ID
                </p>
                <div class="other-wrap">
                    <a @click="getCopy('NormalCodeTextareakaifa2')" class="btn btn-blue btn-large" href="javascript:void(0);"><span>复制代码</span></a>
                </div>
            </div>

        </div>
        <div class="fenlei">
            <p class="font-w">小贴士</p>
            <p class="text-i">如果点击体验，提示客服不在线，请进入客服点击进入客服登录一个账号再试。</p>
            <p class="text-i">如需更换token，请在设置中重新获取。</p>
            <p class="text-i">更多设置请自己参考引入js代码修改，例如修改悬浮客服图片。</p>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'kaifa',
        props: {
            tokeninfo:{},
            siteUrl:'',
//            cgetCopy:{},
        },
        mounted() {

        },
        methods: {
            getCopy(id) {
//                this.cgetCopy(id);
                this.$emit('cgetCopy',id);
            }

        }
    }
</script>

