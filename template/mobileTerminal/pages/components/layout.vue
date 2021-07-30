<template>
	<view class="layout">
		<div class="layout_header">
			<div v-if="isShowHeader" class="global_title">
				<div class="goBack" @click="goBack">
					<span class="iconfont">&#xe6c4;</span>
				</div>
				<div class="title_message">{{ getCurRoute.$holder.navigationBarTitleText }}</div>
			</div>
			<slot v-else name="header"></slot>
		</div>
		<div class="layout_content">
			<!-- <slot name="content"></slot> -->
			<scroll-view :scroll-y="true" class="layout_content_scroll"><slot name="content"></slot></scroll-view>
		</div>
		<div class="layout_bottom">
			<div v-if="isShowTap" class="footer">
				<div class="footer_item" v-for="(item, index) in footerData" :key="index" @click="toRouter(item)">
					<div class="footer_item_image"><image :src="getCurRoute.route == item.path ? item.selectImage : item.unSelectImage" mode="widthFix"></image></div>
					<div class="footer_item_tip">
						<span>{{ item.title }}</span>
					</div>
				</div>
			</div>
			<slot v-else name="bottom"></slot>
		</div>
	</view>
</template>

<script>
import { navigateTo, navigateBack } from '../utils/uniApi.js';
export default {
	props: {
		isShowHeader: {
			type: Boolean,
			default: false
		},
		isShowTap: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			selectId: 1,
			footerData: [
				{
					title: '聊天',
					selectImage: require('../../static/image/footer/chatSelect.png'),
					unSelectImage: require('../../static/image/footer/chatUnSelcect.png'),
					id: 1,
					path: 'pages/view/messageList/index'
				},
				{
					title: '客户',
					selectImage: require('../../static/image/footer/userselect.png'),
					unSelectImage: require('../../static/image/footer/userUnselect.png'),
					id: 2,
					path: 'pages/view/list/addbook'
				},
				{
					title: '统计',
					selectImage: require('../../static/image/footer/staticSelect.png'),
					unSelectImage: require('../../static/image/footer/staticUnSelect.png'),
					id: 3,
					path: ''
				},
				{
					title: '我的',
					selectImage: require('../../static/image/footer/mySelect.png'),
					unSelectImage: require('../../static/image/footer/myUnSelect.png'),
					id: 4,
					path: 'pages/view/user/index/index'
				}
			]
		};
	},
	created() {},
	computed: {
		getCurRoute() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1]; // 获取当前路由
			return curRoute;
		}
	},
	methods: {
		toRouter(item) {
			navigateTo(3, '/' + item.path);
		},
		// 返回上一页
		goBack() {
			navigateBack(1);
		}
	}
};
</script>

<style lang="less" scoped>
.layout {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.layout_header {
	// padding-top: 10rpx;
}
.layout_content {
	flex: 1;
	overflow: hidden;
	.layout_content_scroll {
		height: 100%;
	}
}

.global_title {
	height: 96rpx;
	display: flex;
	align-items: center;
	padding: 0 30rpx;
	position: relative;
	font-size: 16px;
	font-weight: 600;
	.title_message {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		
	}
}




.footer {
	height: 98rpx;
	padding: 0 65rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0px -3px 16px rgba(0, 33, 96, 0.04);
	background: #fff;
	&_item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		&_image {
			width: 44rpx;
			image {
				width: 100%;
			}
		}
		&_tip {
			color: #707070;
			font-size: 22rpx;
		}
	}
}
</style>
