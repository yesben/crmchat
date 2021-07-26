<template>
	<div class="container">
		<lay-out>
			<div slot="header" class="header">
				<div class="header_customer">
					<div class="header_customer_avar"><image src="~static/image/customer/avar.png" mode=""></image></div>
					<div class="header_customer_status">
						<div class="header_customer_status_name">客服名称</div>
						<div class="header_customer_status_item">
							<div class="header_customer_status_item_value">
								<span class="tip_primary"></span>
								<span class="tip_type">在线</span>
							</div>
							<!-- 	<div class="header_customer_status_item_value">
								<span class="tip_primary"></span>
								<span>离线</span>
							</div> -->
						</div>
					</div>
				</div>

				<div class="header_handle">
					<div class="iconfont font">&#xe6b7;</div>
					<div class="loginOut">退出登录</div>
				</div>
				
				<div class="header_checkout_status">
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
						<div class="icon"><span class="iconfont">&#xe6bf;</span></div>
						<div class="input"><input type="text" placeholder="搜索用户名称" /></div>
					</div>
				</div>
				<!-- 聊天列表 -->
				<div class="content_userMessgae">
					
					
					<div class="content_userMessgae_item" @click="connentServerForUser">
						<div class="content_userMessgae_item_avar"><image src="~static/image/messageList/head.gif" mode="widthFix"></image></div>
						
						<div class="content_userMessgae_item_value">
							<div class="content_userMessgae_item_value_user">
								<div class="content_userMessgae_item_value_user_nickName">用户昵称</div>
								<div class="content_userMessgae_item_value_user_form"><span>小程序</span></div>
							</div>
							<!-- 用户消息 -->
							<div class="content_userMessgae_item_value_message"><span>麻烦尽快发货，谢谢哟~</span></div>
							<!-- 用户消息结束 -->
						</div>
						
						<!-- 聊天时间 -->
						<div class="content_userMessgae_item_createTime">
							<div class="content_userMessgae_item_createTime_value">
								<span>9月8日 15:20</span>
							</div>
							<div class="content_userMessgae_item_createTime_count">
								<span>1</span>
							</div>
						</div>
						<!-- 聊天时间结束 -->
					</div>
					
				</div>
				<!-- 聊天列表结束 -->
			</div>
		</lay-out>
	</div>
</template>

<script>
	import { navigateTo } from 'pages/utils/uniApi.js';
export default {
	data() {
		return {};
	},
	methods: {
		connentServerForUser() {
			navigateTo(1, '/pages/view/customerServer/index')
		}
	}
};
</script>

<style lang="less" scoped>
@import './less/messageList.less';
</style>
