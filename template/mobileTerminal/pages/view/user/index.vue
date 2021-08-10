<template>
	<div class="container">
		<lay-out>
			<div slot="header">
				<div class="header">
					<div class="font">我的</div>
					<div class="box">
						<div class="img"><image :src="customerServerData.avatar" mode=""></image></div>
						<div>
							<div class="box_font1">{{ customerServerData.nickname }}</div>
							<div class="box_font2">手机号：{{ customerServerData.phone }}</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="content" class="content">
				<div class="content_box" @click="setting">
					<div><span class="iconfont">&#xe6fa;</span></div>
					<div class="text">设置</div>
					<div><image src="~static/images/right.png" alt=""></image></div>
				</div>
				<div class="line"></div>
				<div class="content_box" @click="setting">
					<div><span class="iconfont">&#xe6f9;</span></div>
					<div class="text">域名设置</div>
					<div><image src="~static/images/right.png" alt=""></image></div>
				</div>
				<div class="line"></div>
				<div class="content_box" @click="setting">
					<div><span class="iconfont">&#xe6f8;</span></div>
					<div class="text">退出登录</div>
					<div><image src="~static/images/right.png" alt=""></image></div>
				</div>
			</div>
		</lay-out>
	</div>
</template>

<script>
import { navigateTo } from 'pages/utils/uniApi.js';
import http from 'pages/api/index';
import api from 'pages/api/api.js';
export default {
	components: {},
	data() {
		return {
			customerServerData: {}
		};
	},
	onLoad(opt) {
		this.initData();
	},
	methods: {
		// 获取当前登录客服信息
		initData() {
			http(api.userUserInfo).then(res => {
				this.customerServerData = res;
			});
		},
		// 设置
		setting() {
			navigateTo(1, '/pages/view/user/setting/setting', this.customerServerData);
		}
	}
};
</script>

<style lang="less" scoped>
.header {
	height: 288rpx;
	background: url(../../../static/images/bguser.png) no-repeat;
	background-color: #1890fc;
	.font {
		font-size: 32rpx;
		font-weight: 600;
		line-height: 45rpx;
		text-align: center;
		padding-top: 32rpx;
		margin-bottom: 61rpx;
		color: #ffffff;
	}
	.box {
		width: 690rpx;
		height: 180rpx;
		background: #ffffff;
		border-radius: 12rpx;
		margin: 0 auto;
		margin-bottom: 24rpx;
		display: flex;
		justify-content: left;
		align-items: center;
		image {
			width: 100rpx;
			height: 100rpx;
			margin-left: 34rpx;
			margin-right: 20rpx;
			border-radius: 50%;
		}
		.box_font1 {
			font-size: 30rpx;
			font-weight: 600;
			line-height: 42rpx;
			color: #282828;
			margin-bottom: 8rpx;
		}
		.box_font2 {
			font-size: 26rpx;
			font-weight: 400;
			line-height: 37rpx;
			color: #999999;
		}
	}
}
.content {
	width: 690rpx;
	margin: 0 auto;
	margin-top: 70rpx;
	background: #fff;
	.line {
		width: 80%;
		height: 1px;
		background: #eeeeee;
		position: relative;
		left: 20%;
	}
	.content_box {
		padding: 28rpx 30rpx;
		// height: 88rpx;
		background: #ffffff;
		border-radius: 12rpx;
		// margin-bottom: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.text {
			width: 84%;
		}
		image {
			width: 33rpx;
			height: 33rpx;
		}
	}
}
</style>
