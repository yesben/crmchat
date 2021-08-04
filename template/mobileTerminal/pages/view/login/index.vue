<template>
	<div class="login_container">
		<!-- 头部背景图 -->
		<div class="login_container_bg"><image class="login_container_bg_image" src="~static/image/login/bg.png" mode="widthFix"></image></div>
		<!-- 头部背景图结束 -->
		<div class="login_container_content">
			<div class="login_container_content_title"><span>欢迎登录</span></div>

			<div class="login_container_content_form">
				<div class="login_container_content_form_input">
					<login-input v-model="loginData.account" type="text" placeholder="请输入账号"><span slot="icon" class="iconfont">&#xe6bc;</span></login-input>
				</div>

				<div class="login_container_content_form_input">
					<login-input v-model="loginData.password" type="password" placeholder="请输入密码"><span slot="icon" class="iconfont">&#xe6bd;</span></login-input>
				</div>
			</div>

			<div class="login_container_content_handle"><div class="login_primary_button" @click="handleLogin">登录</div></div>
		</div>
	</div>
</template>

<script>
import loginInput from './component/loginInput.vue';
import { navigateTo, setStorage, getStorage, Modal } from 'pages/utils/uniApi.js';
import http from 'pages/api/index';
import api from 'pages/api/api.js';
export default {
	components: {
		loginInput
	},
	data() {
		return {
			loginData: {
				account: '',
				password: ''
			},
			cid: ''
		};
	},
	onLoad() {
		//#ifdef APP-PLUS
		var info = plus.push.getClientInfo();
		this.cid = info.clientid;
		//#endif
	},
	methods: {
		async handleLogin() {
			let loginRes = await http(api.login, { ...this.loginData, client_id: this.cid });
			setStorage('userData', loginRes);
			//#ifdef APP-PLUS
			let userClient = await http(api.userClient, { client_id: this.cid });
			if (userClient) {
				setStorage('cid', this.cid);
			}
			//#endif
			navigateTo(4, '/pages/view/messageList/index');
		}
	}
};
</script>

<style scoped lang="less">
.login_container {
	position: relative;
	&_bg {
		&_image {
			width: 100%;
		}
	}

	&_content {
		width: 642rpx;
		padding: 54rpx 79rpx 120rpx 79rpx;
		box-shadow: 0px 3px 20px rgba(0, 20, 41, 0.06);
		box-sizing: border-box;
		position: absolute;
		top: 349rpx;
		left: 0;
		right: 0;
		background: #fff;
		margin: auto;
		border-radius: 20rpx;
		&_title {
			text-align: center;
			font-size: 21px;
			font-weight: 600;
			margin-bottom: 54rpx;
		}
		&_handle {
			margin-top: 115rpx;

			.login_primary_button {
				font-size: 15px;
				width: 100%;
				height: 82rpx;
				background: @primaryBgColor;
				border-radius: 41px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
			}
		}
	}
}
</style>
