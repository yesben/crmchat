<script>
import { navigateTo, setStorage, getStorage } from 'pages/utils/uniApi.js';
export default {
	onLaunch: function() {
		// console.log('App Launch')
	},
	onShow: function() {
		// console.log('App Show')
		this.getDomainName();
		//#ifdef APP-PLUS
		/* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/
		plus.push.addEventListener(
			'click',
			function(msg) {
				console.log('click:' + JSON.stringify(msg));
				// console.log(msg.payload);
				//这里可以写跳转业务代码
			},
			false
		);
		//#endif
	},
	onHide: function() {
		console.log('App Hide');
		this.scoket.send({
			data: {
				open: 0
			},
			type: 'open'
		})
	},
	methods:{
		// 获取域名, 若没有域名，自动跳转到填写域名界面
		getDomainName() {
			let dominName = getStorage('dominName');
			console.log(dominName);
			if(!dominName) {
				navigateTo(2, '/pages/view/dominName/index');
			}
		}
	}
};
</script>

<style lang="less">
/*每个页面公共less */
@import url('./static/globalLess/index.less');
@import url('./static/globalLess/iconfont.css');
// 表情包
@import url('./static/emoji/emojione.css');
</style>
