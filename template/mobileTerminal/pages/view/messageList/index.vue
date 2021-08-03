<template>
	<div class="container">
		<lay-out isShowTap :unreadMessage="unreadMessage">
			<div slot="header" class="header">
				<div class="header_customer">
					<div class="header_customer_avar"><image :src="customerServerData.avatar" mode=""></image></div>
					<div class="header_customer_status">
						<div class="header_customer_status_name">{{ customerServerData.nickname }}</div>
						<div class="header_customer_status_item">
							<div class="header_customer_status_item_value">
								<span class="tip_primary"></span>
								<span class="tip_type">{{ customerServerData.online ? '在线' : '下线' }}</span>
							</div>
							<!-- 			<div class="header_customer_status_item_value">
								<span class="tip_primary"></span>
								<span>离线</span>
							</div> -->
						</div>
					</div>
				</div>

				<div class="header_handle" @click="loginOut">
					<div class="iconfont font">&#xe6b7;</div>
					<div class="loginOut">退出登录</div>
				</div>

				<div class="header_checkout_status" v-if="customerServerHandleModel">
					<div class="header_checkout_status_sanjiao"></div>
					<div class="header_checkout_status_select">
						<div class="header_checkout_status_select_item">
							<div class="header_checkout_status_select_item_tip tip_select"></div>
							<div class="header_checkout_status_select_item_status">在线</div>
							<div class="header_checkout_status_select_item_icon"><span class="iconfont">&#xe6c7;</span></div>
						</div>

						<div class="header_checkout_status_select_line"></div>

						<div class="header_checkout_status_select_item">
							<div class="header_checkout_status_select_item_tip"></div>
							<div class="header_checkout_status_select_item_status">离线</div>
						</div>
					</div>
				</div>
			</div>

			<div slot="content" class="content">
				<!-- 搜索框 -->
				<div class="content_search">
					<div class="content_search_box">
						<div class="icon" @click="searchUser"><span class="iconfont">&#xe6bf;</span></div>
						<div class="input"><input v-model="nickName" type="text" placeholder="搜索用户名称" /></div>
					</div>
				</div>
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
import { navigateTo, getStorage, Modal, formatDate } from 'pages/utils/uniApi.js';
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
			unreadMessage: '', // 未读消息数
			audioFun: '' // 音频对象
		};
	},
	onLoad() {
		if (this.scoket.connectStatus) {
			this.scoket.closeSocket();
		}

		this.customerServerData = getStorage('userData').kefuInfo;
		this.initData();

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
		this.initAudio();
		
		uni.setTabBarBadge({
		  index: 0,
		  text: '10'
		})
		
	},
	watch: {
		userList: {
			handler(val) {
				this.unreadMessage = this.userList
					.map(item => item.mssage_num)
					.reduce((val1, val2) => {
						return (val1 * 1000 + val2 * 1000) / 1000;
					});
			},
			deep: true
		}
	},
	methods: {
		// 初始化音频
		initAudio() {
			this.audioFun = uni.createInnerAudioContext();
			// this.audioFun.autoplay = ;
			this.audioFun.src = '../../../static/video/notice.wav';
		},
		// 获取客户列表, 客服信息
		initData() {
			http(api.userRecord, { nickName: this.nickName, ...this.pageData, is_tourist: this.is_tourist }).then(res => {
				this.userList = res;
			});
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
		searchUser() {
			this.initData();
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
