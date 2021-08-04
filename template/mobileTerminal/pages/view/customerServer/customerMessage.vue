<template>
	<div class="container">
		<lay-out  headerColor="#fff">
			<div slot="content" class="content">
				<div class="content_header">
					<div class="content_header_avar"><image :src="userDetilsData.avatar" mode="widthFix"></image></div>
					<div class="content_header_userName">
						<span>{{ userDetilsData.nickname }}</span>
					</div>
					<div class="content_header_tag">
						<span>{{ formType[userDetilsData.type] }}</span>
					</div>
				</div>

				<div class="content_message">
					<div class="content_message_item" v-if="userDetilsData.label && userDetilsData.label.length">
						<div class="content_message_item_label"><span>用户标签</span></div>
						<div class="content_message_item_value flex" @click="openUserTag">
							<div class="tag_list">
								<span v-for="(item, index) in userDetilsData.label" :key="index">{{ item.label }}</span>
							</div>
							<div class="to_link"><span class="iconfont font">&#xe6c3;</span></div>
						</div>
					</div>

					<div class="content_message_item">
						<div class="content_message_item_label"><span>手机号</span></div>
						<div class="content_message_item_value">
							<span>{{ userDetilsData.phone ? userDetilsData.phone : '暂无数据' }}</span>
						</div>
					</div>

					<div class="content_message_item">
						<div class="content_message_item_label"><span>性别</span></div>
						<div class="content_message_item_value">
							<span>{{ sexType[userDetilsData.sex] }}</span>
						</div>
					</div>

					<div class="content_message_item">
						<div class="content_message_item_label"><span>分组</span></div>
						<div class="content_message_item_value">
							<span>{{ userGroupConcat[userDetilsData.group_id] }}</span>
						</div>
					</div>

					<div class="content_message_item">
						<div class="content_message_item_label"><span>用户类型</span></div>
						<div class="content_message_item_value">
							<span>{{ formType[userDetilsData.type] }}</span>
						</div>
					</div>
					<!-- 
					<div class="content_message_item">
						<div class="content_message_item_label"><span>生日</span></div>
						<div class="content_message_item_value"><span>9月5号</span></div>
					</div> -->
				</div>
			</div>
		</lay-out>

		<uni-popup ref="userTagModel" type="center" animation>
			<div class="userTag_container">
				<div class="userTag_container_title">
					<div class="userTag_container_title_message"><span>用户标签</span></div>
					<div class="closeModel" @click="closeUserTagModel"><span class="iconfont">&#xe6c6;</span></div>
				</div>

				<div class="userTag_container_list">
					<div class="userTag_container_list_item" :class="{ mg40: index == 0 }" v-for="(item, index) in userTagList" :key="index">
						<div class="userTag_container_list_item_label">
							<span>{{ item.name }}</span>
						</div>
						<div class="userTag_container_list_item_value">
							<span :class="{ select: val.disabled }" v-for="(val, i) in item.label" :key="i" @click="selectTags(val)">{{ val.label }}</span>
						</div>
					</div>
				</div>

				<div class="userTag_container_handle">
					<div class="userTag_container_handle_button" @click="handleSetTags"><span>确定</span></div>
				</div>
			</div>
		</uni-popup>
	</div>
</template>

<script>
import http from 'pages/api/index';
import api from 'pages/api/api.js';
export default {
	data() {
		return {
			userTagList: [
				{
					tagName: '意向客户',
					tagList: [
						{
							value: '意向一般',
							id: 1,
							select: true
						},
						{
							value: '意向强烈',
							id: 2
						}
					]
				},
				{
					tagName: '意向客户',
					tagList: [
						{
							value: '意向一般',
							id: 1
						},
						{
							value: '意向强烈',
							id: 2
						}
					]
				},
				{
					tagName: '意向客户',
					tagList: [
						{
							value: '意向一般',
							id: 1
						},
						{
							value: '意向强烈',
							id: 2
						},
						{
							value: '意向一般',
							id: 1
						},
						{
							value: '意向强烈',
							id: 2
						}
					]
				}
			],
			formType: {
				0: 'pc',
				1: '微信',
				2: '小程序',
				3: 'H5'
			},
			sexType: {
				0: '未知',
				1: '男',
				2: '女'
			},
			userGroup: [], // 用户分组
			userGroupConcat: {},
			queryUserData: {}, // url上挂载的参数
			userDetilsData: {} // 用户详细信息
		};
	},
	onLoad(opt) {
		this.queryUserData = opt;
		this.initUserGroup();
	},
	methods: {
		// 获取用户详细信息
		initData() {
			http(api.userInfo, this.queryUserData).then(res => {
				this.userDetilsData = res;
			});
		},
		// 获取所有分组 ---> 获取详细信息
		initUserGroup() {
			http(api.UserGroup).then(res => {
				this.userGroup = res;
				this.userGroup.forEach(item => {
					this.userGroupConcat[item.id] = item.group_name;
					this.initData();
				});
			});
		},
		// 打开用户标签选择选项
		openUserTag() {
			http(api.userLabelSelect, { id: this.queryUserData.user_id }).then(res => {
				this.userTagList = res;
				this.$refs.userTagModel.open('center');
			});
		},
		// 选择标签
		selectTags(item) {
			this.$set(item, 'disabled', !item.disabled);
		},
		// 设置标签
		handleSetTags() {
			let postData = {
				label_ids: [],
				un_label_ids: [],
				userId: this.queryUserData.user_id
			};
			this.userTagList.forEach(item => {
				item.label.forEach(val => {
					if (val.disabled) {
						postData.label_ids.push(val.id);
					} else {
						postData.un_label_ids.push(val.id);
					}
				});
			});
			http(api.putUserLabel, postData).then(res => {
				this.$refs.userTagModel.close();
				this.initData();
			});
		},
		// 关闭用户标签选项
		closeUserTagModel() {
			this.$refs.userTagModel.close();
		}
	}
};
</script>

<style scoped lang="less">
@import url('./less/customerMessage.less');
</style>
