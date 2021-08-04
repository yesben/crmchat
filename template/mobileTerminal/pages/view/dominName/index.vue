<template>
	<div class="login_container">
		<!-- 头部背景图 -->
		<div class="login_container_bg"><image class="login_container_bg_image" src="~static/dominName/bg.png" mode="widthFix"></image></div>
		<!-- 头部背景图结束 -->
		<div class="login_container_content">
			<div class="login_container_content_title"><span>设置请求域名</span></div>

			<div class="login_container_content_form">
				<div class="login_container_content_form_input">
					<input type="text" v-model="dominName" placeholder="请输入域名" />
					<span class="iconfont">&#xe6f6;</span>
				</div>
			</div>

			<div class="login_container_content_handle"><div class="login_primary_button" @click="handleSetDominName">确定</div></div>
		</div>
	</div>
</template>

<script>
import { navigateTo, setStorage, getStorage, Modal } from 'pages/utils/uniApi.js';
export default {
	components: {},
	data() {
		return {
			dominName: ''
		};
	},
	onLoad() {
		// #ifdef H5
			if(getStorage('dominName')) {
				navigateTo(2, '/pages/view/login/index');
			}
		// #endif
	},
	methods: {
		handleSetDominName() {
			Modal('温馨提示', `您设置的域名是 "${this.dominName}", 请问是否继续?`).then(res => {
				setStorage('dominName', this.dominName);
				//#ifdef APP-PLUS
					plus.runtime.restart();
				//#endif
				// #ifdef H5
					window.location.reload();
				// #endif
				
			});
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
		padding: 54rpx 79rpx 67rpx 79rpx;
		box-shadow: 0px 3px 20px rgba(0, 20, 41, 0.06);
		box-sizing: border-box;
		position: absolute;
		top: 209rpx;
		left: 0;
		right: 0;
		background: #fff;
		margin: auto;
		border-radius: 20rpx;
		&_title {
			text-align: center;
			font-size: 16px;
			font-weight: 600;
			margin-bottom: 54rpx;
		}
		&_form {
			&_input {
				display: flex;
				align-items: center;
				height: 96rpx;
				background: #f5f5f5;
				padding: 0 28rpx;
				border-radius: 12rpx;
				input {
					flex: 1;
					font-size: 16px;
				}
			}
		}
		&_handle {
			margin-top: 54rpx;

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
