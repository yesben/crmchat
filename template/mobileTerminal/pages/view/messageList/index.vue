<template>
	<div class="container">
		<lay-out noBottomHeight @goBottom="goBottom" @goTop="goTop">
			<div slot="header">
				<div class="header">
					<div class="header_customer" @click="setOnlineStatus">
						<div class="header_customer_avar"><image :src="customerServerData.avatar" mode=""></image></div>
						<div class="header_customer_status">
							<div class="header_customer_status_name">{{ customerServerData.nickname }}</div>
							<div class="header_customer_status_item">
								<div class="header_customer_status_item_value">
									<span class="tip_primary" :class="{ tip_danger: !customerServerData.online }"></span>
									<span class="tip_type">{{ customerServerData.online ? '在线' : '离线' }}</span>
								</div>
							</div>
						</div>
					</div>

					<!-- #ifdef MP || APP-PLUS -->
					<div class="header_handle" @click="handleScanCode"><div class="iconfont font">&#xe6c1;</div></div>
					<!-- #endif -->
					<div class="header_checkout_status" v-if="customerServerHandleModel">
						<div class="header_checkout_status_sanjiao"></div>
						<div class="header_checkout_status_select">
							<div class="header_checkout_status_select_item" v-for="(item, index) in onlineStatus" :key="index" @click="changeOnlineStatus(item)">
								<div class="header_checkout_status_select_item_tip " :class="{ tip_select: item.value == 1, tip_select_outline: item.value == 0 }"></div>
								<div class="header_checkout_status_select_item_status">{{ item.label }}</div>
								<div class="header_checkout_status_select_item_icon" v-if="selectOnlineStatus == item.value"><span class="iconfont">&#xe6c7;</span></div>
							</div>
						</div>
					</div>
				</div>
				<!-- 搜索框 -->
				<div class="content_search">
					<div class="content_search_box">
						<div class="icon" @click="searchUser"><span class="iconfont">&#xe6bf;</span></div>
						<div class="input"><input v-model="nickName" type="text" placeholder="搜索用户名称" /></div>
					</div>
				</div>
			</div>

			<div slot="content" class="content">
				<!-- 聊天列表 -->
				<div class="content_userMessgae">
					<div class="content_userMessgae_item" @click="connentServerForUser(item)" v-for="(item, index) in userList" :key="index">
						<div class="content_userMessgae_item_avar"><image :src="item.avatar" mode="widthFix"></image></div>

						<div class="content_userMessgae_item_value">
							<div class="content_userMessgae_item_value_user">
								<div class="content_userMessgae_item_value_user_nickName">{{ item.nickname }}</div>
								<div class="content_userMessgae_item_value_user_form" :class="formType[item.type].className">
									<span>{{ formType[item.type].label }}</span>
								</div>
							</div>
							<!-- 用户消息 -->
							<div class="content_userMessgae_item_value_message">
								<span>{{ item.message }}</span>
							</div>
							<!-- 用户消息结束 -->
						</div>

						<!-- 聊天时间 -->
						<div class="content_userMessgae_item_createTime">
							<div class="content_userMessgae_item_createTime_value">
								<span>{{ item.update_time | toDay }}</span>
							</div>
							<div class="content_userMessgae_item_createTime_count" v-if="item.mssage_num">
								<span>{{ item.mssage_num }}</span>
							</div>
						</div>
						<!-- 聊天时间结束 -->
					</div>

					<!-- 	<div v-if="!userList.length" class="no_message">
						<span>暂无客户!</span>
					</div> -->
				</div>
				<!-- 聊天列表结束 -->
			</div>
		</lay-out>
	</div>
</template>

<script>
import { navigateTo, getStorage, Modal, formatDate, Toast, parseToObject } from 'pages/utils/uniApi.js';
import http from 'pages/api/index';
import api from 'pages/api/api.js';
export default {
	filters: {
		toDay(value) {
			if (!value) return '';
			return formatDate(value, 'M月d日 hh:mm');
		}
	},
	data() {
		return {
			selectOnlineStatus: 1,
			onlineStatus: [
				{
					label: '在线',
					value: 1
				},
				{
					label: '离线',
					value: 0
				}
			],
			customerServerHandleModel: false, // 客服操作开关
			customerServerData: {},
			pageData: {
				page: 1,
				limit: 15
			},
			formType: {
				0: {
					className: 'pc',
					label: 'pc端'
				},
				1: {
					className: 'gozhonghao',
					label: '公众号'
				},
				2: {
					className: 'wchat',
					label: '小程序'
				},
				3: {
					className: 'h5',
					label: 'H5'
				}
			},
			nickName: '',
			is_tourist: '',
			userList: [], // 用户列表
			audioFun: '' // 音频对象
		};
	},
	onShow() {
		if (!this.scoket.connectStatus) {
			this.scoket.init().then(res => {
				res.onMessage(data => {
					switch (data.type) {
						case 'mssage_num':
							this.getMssageNum(data.data);
							if (data.data.num > 0) {
								this.audioFun.play();
							}
							break;
						case 'timeout':
							this.scoket.init();
							break;
						default:
							break;
					}
				});
			});
		}

		if (getStorage('userData')) {
			this.customerServerData = getStorage('userData').kefuInfo;
			this.pageData.page = 1;
			this.initData();
		} else {
			navigateTo(3, '/pages/view/login/index');
		}

		// app端调用存cid接口
		//#ifdef APP-PLUS
		var info = plus.push.getClientInfo();
		var cid = info.clientid;
		http(api.userClient, { client_id: cid }).then(res => {
			setStorage('cid', cid);
		});
		//#endif

		this.initAudio();
	},
	watch: {},
	methods: {
		// 初始化音频
		initAudio() {
			this.audioFun = uni.createInnerAudioContext();
			// this.audioFun.autoplay = ;
			this.audioFun.src = '../../../static/video/notice.wav';
		},
		// 获取客户列表, 客服信息
		initData(type) {
			http(api.userRecord, { nickName: this.nickName, ...this.pageData, is_tourist: this.is_tourist }).then(res => {
				if (res.length > 0) {
					this.pageData.page++;
				}
				if (type == 'concat') {
					this.userList = this.userList.concat(res);
				} else {
					this.userList = res;
				}
			});

			// 获取客服未读条数
			http(api.userCount).then(res => {
				uni.setTabBarBadge({
					index: 0,
					text: res.count ? String(res.count) : 0 // 设置为数值，右下角则不在显示
				});
			});
		},
		// 滑动到页面底部
		goBottom() {
			this.initData('concat');
		},
		goTop() {
			this.pageData.page = 1;
			this.initData();
		},
		// 通过sockect连接收取新的消息
		getMssageNum(data) {
			let isRepeat = false;
			this.userList.forEach(item => {
				// 如果发送方的user_id 与 列表中的 to_uid 一致
				if (item.to_user_id == data.user_id) {
					isRepeat = true;
					this.$set(item, 'mssage_num', data.recored.mssage_num);
					this.$set(item, 'message', data.recored.message);
				}
			});
			if (!isRepeat) {
				this.userList.unshift(data.recored);
			}
		},
		// 设置在线状态
		setOnlineStatus() {
			this.customerServerHandleModel = !this.customerServerHandleModel;
		},
		changeOnlineStatus(item) {
			this.scoket.send({
				data: {
					online: item.value
				},
				type: 'online'
			});
			this.selectOnlineStatus = item.value;
			this.customerServerData.online = this.selectOnlineStatus;
			this.customerServerHandleModel = !this.customerServerHandleModel;
			let str = item.value ? '上线' : '离线';
			Toast(`客服已${str}`);
		},
		// 搜索用户
		searchUser() {
			this.initData();
		},
		// 扫描二维码
		handleScanCode() {
			// let str = "http://192.168.31.192:8081/pages/users/scan_login/index?key=463aca66113f65396dc28e3f0041a2f2";
			uni.scanCode({
				onlyFromCamera: true, // 是否只允许相机扫码，不允许相机选择图片
				success: function(res) {
					console.log(res);
					navigateTo(1, '/pages/view/authorizedLogin/index', { key: res.result.split('=')[1] });
				},
				fail: () => {}
			});
		},
		// 退出登录
		loginOut() {
			http(api.userLogout).then(res => {
				Modal('温馨提示', '您确定要退出登录吗?').then(() => {
					navigateTo(3, '/pages/view/login/index');
				});
			});
		},
		connentServerForUser(item) {
			navigateTo(1, '/pages/view/customerServer/index', item);
		}
	}
};
</script>

<style lang="less" scoped>
@import './less/messageList.less';
</style>
