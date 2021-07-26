<template>
	<div class="container">
		<lay-out>
			<div slot="header" class="header">
				<div class="header_left"><span class="iconfont">&#xe6c4;</span></div>
				<div class="header_center">用户名称</div>
				<div class="header_right"><span class="iconfont">&#xe6e3;</span></div>
			</div>
			<div slot="content" class="content"></div>

			<div slot="bottom" class="footer" :class="{ translateY0: selectModel }">
				<div class="footer_input">
					<div class="footer_input_icon mr18"><span class="iconfont">&#xe6b8;</span></div>
					<div class="footer_input_content mr18">
						<textarea v-model="text" @input="textareaChange($event)" @focus="selectModel = 0" class="font" value="" placeholder="" />
						<p v-html="pCont" class="font"></p>
						<span class="iconfont">&#xe6bb;</span>
					</div>
					<div class="footer_input_icon">
						<span class="iconfont mr18" @click="selectOption(1)">&#xe6cb;</span>
						<span class="iconfont" @click="selectOption(2)">&#xe6c2;</span>
					</div>
				</div>

				<div class="footer_option">
					<div class="option" v-if="selectModel == 2">
						<div>
							<image src="~static/image/messageList/picture.png" mode="widthFix"></image>
							<div>图片</div>
						</div>
						<div>
							<image src="~static/image/messageList/connection.png" mode="widthFix"></image>
							<div>转接</div>
						</div>
					</div>

					<scroll-view  class="emoji" v-else scroll-y>
						<div class="emoji-item" v-for="(item, index) in emoji" :key="index">
							<i class="em" :class="item"></i>
						</div>
					</scroll-view>
				</div>
			</div>
		</lay-out>
	</div>
</template>

<script>
import emoji from 'pages/utils/emoji.js';
export default {
	data() {
		return {
			pCont: '',
			text: '',
			selectModel: 0, // 1:选择表情 2: 功能选择（转接，上传图片）
			emoji: []
		};
	},
	onLoad() {
		this.emoji = emoji;
	},
	methods: {
		// 选择上传图片，转接
		selectOption(item) {
			this.selectModel = item;
		},
		// 聊天表情转换
		replace_em(str) {
			str = str.replace(/\[em-([a-z_]*)\]/g, "<span class='em em-$1'/></span>");
			return str;
		},
		textareaChange(e) {
			let strCont = e.target.value.replace(/\n\s(\s)*/gi, '\n'); // 将多个回车换行合并为 1个
			strCont = strCont.replace(/^\s*/gi, ''); // 清除首行的 空格与换行
			let strHtml = strCont.replace(/</gi, '&lt;'); // 将所有的 < 转义为 &lt; 防止html标签被转义
			strHtml = strCont.replace(/\n(\n)*/gi, '<br>'); // 回车换行替换为 <br>
			strHtml = strHtml.replace(/\s+/gi, '&nbsp;'); // 一个或过个空格 替换为 &nbsp;
			strCont = strHtml.replace(/&nbsp;/gi, ' '); // 逆向处理
			strCont = strCont.replace(/<br>/gi, '\n'); // 逆向处理
			strCont = strCont.replace(/&lt;/gi, '<');
			// this.text = strCont;
			/** 如果 p 标签最后的字符为 <br> 并不会单独另起一行, 会导致与 textarea 的高度相差一行,
			 * 所以在最后添加一个字符, 这样就能保证 P 标签的高度与 textarea 的高度一致
			 */
			this.pCont = strHtml + '.';
		}
	}
};
</script>

<style scoped lang="less">
@import './less/customerServer.less';
</style>
