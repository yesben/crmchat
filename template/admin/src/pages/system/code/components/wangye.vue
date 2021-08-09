<template>
    <div class="content">
        <p class="font-w">使用简介</p>
        <p class="text-i">网页内快速接入客服，请把一下代码复制到网页最底部。</p>
        <Divider />
        <p class="typetitle">第一种，普通网页</p>

        <div class="fenlei">
            <div class="code-content-wrap">
                <textarea id="NormalCodeTextarea1" class="code" rows="12">
<script src="{{siteUrl}}/customerServer.js"></script>
<script>
    var option = {
        openUrl: '{{siteUrl}}',
        token: '{{tokeninfo.token_md5}}'
    };
    var canCustomerServer = new initCustomerServer(option);
    canCustomerServer.init();
</script>
            </textarea>
            <div class="other-wrap">
                <a @click="getCopy('NormalCodeTextarea1')" class="btn btn-blue btn-large" href="javascript:void(0);"><span>复制代码</span></a>
            </div>
            </div>

        </div>
        <p class="typetitle">第二种，Vue页面引入</p>
        <div  class="fenlei">
            <p class="font-w">第一步：如果您的项目是基于webpack或其他工具构建的，并且您不想通过操作html文件来引入js，则推荐您在入口文件中如（main.js）中写下以下代码</p>
            <div class="code-content-wrap">
                <textarea id="NormalCodeTextarea2" class="code" rows="7">
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
        <textarea id="NormalCodeTextarea3" class="code textarea" rows="9">
this.canCustomerServer = new initCustomerServer({
    openUrl: "{{siteUrl}}", // 打开客服聊天框的地址，即：部署后台管理系统的地址
    token: {{tokeninfo.token_md5}},
});
this.canCustomerServer.init();
        </textarea>
            <div class="other-wrap">
                <a @click="getCopy('NormalCodeTextarea3')" class="btn btn-blue btn-large" href="javascript:void(0);"><span>复制代码</span></a>
            </div>
            </div>

        </div>

        <div  class="fenlei">
            <p class="font-w">小贴士</p>
            <p class="text-i">如果点击体验，提示客服不在线，请进入客服点击进入客服登录一个账号再试。</p>
            <p class="text-i">如需更换token，请在设置中重新获取。</p>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'wangye',
        props: {
            tokeninfo:{},
            siteUrl:'',
            cgetCopy:{}
        },
        mounted() {

        },
        methods: {
            getCopy(id) {
                this.cgetCopy(id);
            },
        }
    }
</script>

