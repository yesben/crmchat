<template>
	<div class="container">
		<lay-out>
			<div slot="header" class="header">
				<div @click="cencel"><span>返回</span></div>
				<div class="header_title"><span>标签详情</span></div>
				<div class="finish"><span>完成</span></div>
			</div>

			<div slot="content">
				<div class="content">
					<div class="content_tag"><span>标签名称</span></div>
					<!-- <div class="content_input"><input type="text" placeholder="请输入标签名称" /></div> -->
					<div class="content_input">
						<span>{{tagsData.label}}</span>
					</div>
					<div class="content_tag"><span>标签成员</span></div>
					<div class="content_group">
					<!-- 	<div class="content_group_handle">
							<span class="iconfont">&#xe6c1;</span>
							<span>添加成员</span>
						</div> -->
						<view class="user-content">
							<view class="user-list" v-for="item in canEachUserList" :key="item.key">
								<div class="content_tag">
									<span>{{ item.key }}</span>
								</div>
								<uni-swipe-action v-for="items in item.list" :key="items.id">
									<uni-swipe-action-item>
										<view class="user" >
											<view class="user-list-left"><image :src="items.avatar" mode=""></image></view>
											<view class="user-list-right">{{ items.nickname }}</view>
										</view>
									

										<template v-slot:right>
											<div class="delete_tags"><text>删除</text></div>
										</template>
									</uni-swipe-action-item>
								</uni-swipe-action>
							</view>
						</view>
					</div>
				</div>
			</div>
		</lay-out>
	</div>
</template>

<script>
import { navigateTo, navigateBack, getStorage } from 'pages/utils/uniApi.js';
import { makePy } from 'pages/utils/utils';
export default {
	data() {
		return {
			userList: [
				{
					id: 1,
					username: 'a白小纯',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 2,
					username: 'B罗小黑',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 3,
					username: '张楚岚',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 4,
					username: '冯宝宝',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 5,
					username: '五六七',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 11,
					username: '白月初',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 22,
					username: '王富贵',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 33,
					username: '叶修',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 44,
					username: '唐三',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 55,
					username: '林动',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 12,
					username: '魏无羡',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 23,
					username: '秦羽',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 34,
					username: '蛮吉',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 45,
					username: '荆天明',
					headImg: '../../../static/image/login/bg.png'
				},
				{
					id: 56,
					username: '武庚',
					headImg: '../../../static/image/login/bg.png'
				}
			],
			canEachUserList: [],
			tagsData: {}
		};
	},
	onLoad(opt) {
	
		this.tagsData = getStorage('userTagData');
		console.log(this.tagsData);
		this.canEachUserList = this.letterSrot(this.tagsData.user);
	},
	methods: {
		cencel() {
			navigateBack(1);
		},
		// 对通讯录按字母顺序做排序
		letterSrot(userList) {
			const sortList = [];
			const list = userList;
			const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			letter.forEach(item => {
				const obj = {};
				obj.key = item;
				obj.list = [];
				for (let i = 0; i < list.length; i++) {
					if (item == makePy(list[i].nickname).substr(0, 1)) {
						obj.list.push(list[i]);
						list.splice(i, 1);
						i--;
					}
				}
				if (obj.list.length) sortList.push(obj);
			});
			return sortList;
		}
	}
};
</script>

<style scoped lang="less">
@import url('./less/addTag.less');
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 96rpx;
	padding: 0 30rpx;
	font-size: 16px;
	&_title {
		font-weight: 600;
	}
	.finish {
		width: 92rpx;
		height: 56rpx;
		background: #dddddd;
		opacity: 1;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #aaaaaa;
		opacity: 0;
	}
}
</style>
