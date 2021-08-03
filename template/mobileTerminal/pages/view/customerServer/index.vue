<template>
	<div class="container">
		<lay-out ref="layOut" :scrollTop="scrollTop" refresherEnabled @refresherrefresh="refresherrefresh" :refresherTriggered="refresherTriggered">
			<div slot="header" class="header">
				<div class="header_left" @click="goBackToMessageList"><span class="iconfont icon-fanhui"></span></div>
				<div class="header_center">{{ userData.nickname }}</div>
				<!-- <div class="header_right"><span class="iconfont">&#xe6e3;</span></div> -->
				<div></div>
			</div>
			<div slot="content" class="content">
				<div class="content_list" v-for="(item, index) in messageList" :key="index" :class="{ right_box: item.user_id == customerServerData.user_id }">
					<div class="content_list_avar" @click="selectCustomerServer(item)"><image :src="item.avatar" mode="widthFix"></image></div>
					<div class="content_list_message">
						<div class="content_list_message_value" v-if="item.msn_type <= 2"><span v-html="replace_em(item.msn)"></span></div>

						<div class="content_list_message_product" v-if="item.msn_type == 5">
							<div class="content_list_message_orderId">
								<span class="content_list_message_orderId_label">商品名称:</span>
								<span class="content_list_message_orderId_value">{{ item.other.store_name }}</span>
							</div>

							<div class="content_list_message_detils">
								<div class="content_list_message_detils_image"><image :src="item.other.image" mode="widthFix"></image></div>
								<div class="content_list_message_detils_value">
									<div class="content_list_message_detils_value_shopMessag">
										<div class="content_list_message_detils_value_shopMessag_item">
											<div class="content_list_message_detils_value_shopMessag_item_label"><span>库存:</span></div>
											<div class="content_list_message_detils_value_shopMessag_item_value">
												<span>{{ item.other.stock }}</span>
											</div>
										</div>
										<div class="content_list_message_detils_value_shopMessag_item">
											<div class="content_list_message_detils_value_shopMessag_item_label"><span>销量:</span></div>
											<div class="content_list_message_detils_value_shopMessag_item_value">
												<span>{{ parseInt(item.other.sales) + parseInt(item.other.ficti ? item.other.ficti : 0) }}</span>
											</div>
										</div>
										<!-- <span>{{ item.other }}</span> -->
									</div>
									<div class="content_list_message_detils_value_shopPrice">
										<span>￥{{ item.other.price }}</span>
									</div>
								</div>
							</div>
						</div>

						<div class="content_list_message_image" v-if="item.msn_type == 3"><image :src="item.msn" mode="widthFix"></image></div>
					</div>
				</div>
			</div>

			<div slot="bottom" class="footer" :class="{ translateY0: selectModel }">
				<div class="footer_input">
					<div class="footer_input_icon mr18" @click="selectScriptLibary"><span class="iconfont">&#xe6b8;</span></div>
					<div class="footer_input_content mr18">
						<textarea v-model="sendMessage" @input="textareaChange($event)" @focus="selectModel = 0" class="font" value="" placeholder="" />
						<p v-html="pCont" class="font"></p>
						<span class="iconfont" @click="sendText">&#xe6bb;</span>
					</div>
					<div class="footer_input_icon">
						<span class="iconfont mr18" @click="selectOption(1)">&#xe6cb;</span>
						<span class="iconfont" @click="selectOption(2)">&#xe6c2;</span>
					</div>
				</div>

				<div class="footer_option" :style="{ height: selectModel ? '440rpx' : '0' }">
					<div class="option" v-if="selectModel == 2">
						<div @click="uploadImage">
							<image src="~static/image/messageList/picture.png" mode="widthFix"></image>
							<div>图片</div>
						</div>
						<div @click="transfer">
							<image src="~static/image/messageList/connection.png" mode="widthFix"></image>
							<div>转接</div>
						</div>
					</div>

					<scroll-view class="emoji" v-if="selectModel == 1" scroll-y>
						<div class="emoji-item" v-for="(item, index) in emoji" :key="index" @click="sendEmoji(item)"><i class="em" :class="item"></i></div>
					</scroll-view>
				</div>
			</div>
		</lay-out>

		<uni-popup ref="transferModel" animation type="bottom"><transfer @close="transferModelClose" @handleSubmit="handleSubmitTransfer"></transfer></uni-popup>

		<uni-popup ref="scriptLibaryModel" animation type="bottom">
			<div class="scriptLibary">
				<div class="scriptLibary_header">
					<div class="scriptLibary_header_title">
						<div v-for="(item, index) in speechArtTypeList" :key="index" @click="selectSpeechArtType(item)" :class="{ speechArtSelectEd: speechArtType == item.id }">
							<span>{{ item.label }}</span>
						</div>
					</div>

					<div class="scriptLibary_header_icon">
						<div @click="editScript"><span class="iconfont">&#xe6b4;</span></div>
						<div @click="closeScript"><span class="iconfont">&#xe6b5;</span></div>
					</div>
				</div>
				<div class="scriptLibary_search">
					<div>
						<span @click="handleSetTitle" class="iconfont">&#xe6d8;</span>
						<input v-model="scriptTitle" type="text" placeholder="搜索快捷回复" />
					</div>
				</div>
				<div class="scriptLibary_content">
					<scripts-libary
						:tagList="speechTagList"
						:speechArtType="speechArtType"
						maxHeight="900rpx"
						height="800rpx"
						:title="scriptTitle"
						@sendSpeechMessage="sendSpeechMessage"
					></scripts-libary>
				</div>
			</div>
		</uni-popup>
	</div>
</template>

<script>
import emoji from 'pages/utils/emoji.js';
import { navigateBack, navigateTo, getStorage, serialize, chooseImage } from 'pages/utils/uniApi.js';
import transfer from './component/transfer.vue';
import scriptsLibary from './component/scriptLibary.vue';
import http from 'pages/api/index';
import api from 'pages/api/api.js';

export default {
	components: {
		transfer, // 转接客服
		scriptsLibary // 话术库
	},
	data() {
		return {
			pCont: '',
			sendMessage: '', // 发送的消息
			selectModel: 0, // 1:选择表情 2: 功能选择（转接，上传图片）
			emoji: [],
			messageList: [],
			userData: {},
			pageData: {
				limit: 20,
				upperId: 0
			},
			speechArtType: 1, // 0 全局 1 私有
			speechTagList: [], // 话术分类
			scriptTitle: '', // 搜索输入的内容
			propstitle: '',
			speechArtTypeList: [
				{
					id: 1,
					label: '个人库'
				},
				{
					id: 0,
					label: '公共库'
				}
			],
			customerServerData: {},
			scrollTop: 0, // 滚动位置
			refresherTriggered: true, // 下拉刷新装状态
			audioFun: '' // 音频对象
		};
	},
	async onLoad(opt) {
		this.emoji = emoji;
		this.userData = opt; // 获取用户信息
		this.customerServerData = getStorage('userData').kefuInfo;

		await this.initData();
		this.initAudio();
		this.sockEventListenr();
		this.$nextTick(() => {
			this.goBottom();
		});
	},
	methods: {
		// socket监听
		sockEventListenr() {
			this.scoket.send({
				data: {
					id: this.userData.to_user_id
				},
				type: 'to_chat'
			});

			this.scoket.onMessage(data => {
				switch (data.type) {
					case 'reply':
					case 'chat':
						this.pushMessageToList(data.data);
						break;
					case 'mssage_num':
						if (data.data.num > 0) {
							this.audioFun.play();
						}
						break;
				
					default:
						break;
				}
			});
		},

		// 初始化音频
		initAudio() {
			this.audioFun = uni.createInnerAudioContext();
			// this.audioFun.autoplay = false;
			this.audioFun.src = '../../../static/video/notice.wav';
		},

		// 获取聊天列表
		async initData() {
			return await http(api.kefuServiceList, {
				user_id: this.userData.to_user_id,
				...this.pageData
			}).then(res => {
				this.messageList = res.concat(this.messageList);
				this.pageData.upperId = this.messageList.length ? this.messageList[0].id : 0;
				this.refresherTriggered = false;
			});
		},
		// 触发下拉刷新
		refresherrefresh() {
			this.refresherTriggered = true;
			this.initData();
		},
		// 发送文本消息
		sendText() {
			this.sendMsg(this.sendMessage, 1);
			this.sendMessage = '';
		},
		// 选择表情
		sendEmoji(item) {
			this.sendMessage += `[${item}]`;
		},
		// 发送图片
		uploadImage() {
			chooseImage(1).then(res => {
				uni.uploadFile({
					url: api.kefuUploadAvatar.url,
					filePath: res.tempFilePaths[0],
					name: 'file',
					formData: {
						// file: res.tempFilePaths[0],
						filename: 'file'
					},
					header: {
						// #ifdef MP || APP-PLUS
						'Content-Type': 'multipart/form-data',
						// #endif
						'Authori-zation': 'Bearer ' + getStorage('userData').token
					},
					success: uploadFileRes => {
						let unloadResponse = JSON.parse(uploadFileRes.data);
						if (unloadResponse.status == 200) {
							this.sendMsg(unloadResponse.data.url, 3);
						}
					},
					complete: res => {
						console.log(res);
					}
				});
			});
		},
		pushMessageToList(data) {
			this.messageList.push(data);
			this.goBottom();
		},
		goBottom() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.content')
				.boundingClientRect(data => {
					this.$nextTick(() => {
						this.scrollTop = data.height;
					});
				})
				.exec();
		},
		// 发送消息统一处理
		sendMsg(msn, type) {
			let obj = {
				type: 'chat',
				data: {
					msn,
					type,
					to_user_id: this.userData.to_user_id
				}
			};
			this.scoket.send(obj);
		},
		// 查询话术类
		selectScriptLibary() {
			http(api.kefuServiceCate, {
				type: this.speechArtType
			}).then(res => {
				this.speechTagList = res.data;
				this.$refs.scriptLibaryModel.open();
			});
		},
		// 选择话术库，个人，工共
		selectSpeechArtType(item) {
			this.speechArtType = item.id;
			this.selectScriptLibary();
		},
		// 选中话术
		sendSpeechMessage(item) {
			this.sendMessage = item.message;
			this.$refs.scriptLibaryModel.close(); // 关闭话术库弹框
		},
		// 关闭话术弹框
		closeScript() {
			this.$refs.scriptLibaryModel.close();
		},
		// 修改话术库
		editScript() {
			this.$refs.scriptLibaryModel.close();
			navigateTo(1, '/pages/view/customerServer/script', { speechArtType: this.speechArtType });
		},
		// 话术搜索
		handleSetTitle() {
			this.propstitle = serialize(this.scriptTitle);
		},
		// 转接
		transfer() {
			this.selectModel = 0;
			this.$refs.transferModel.open();
		},
		// 确认转接
		handleSubmitTransfer() {
			this.$refs.transferModel.close();
		},
		// 关闭转接弹框
		transferModelClose() {
			this.$refs.transferModel.close();
		},
		// 头部方法，回到聊天列表页
		goBackToMessageList() {
			navigateTo(2, '/pages/view/messageList/index');
		},
		// 查看用户详情
		selectCustomerServer(item) {
			if (item.type == 1) {
				navigateTo(1, '/pages/view/customerServer/customerMessage', item);
			}
		},
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
@import './less/scriptLibary.less';
</style>
