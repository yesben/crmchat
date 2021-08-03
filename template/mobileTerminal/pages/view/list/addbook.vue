<template>
	<view class="container">
		<lay-out isShowTap>
			<div slot="header">
				<div class="header_content">
					<div></div>
					<div>客户列表</div>
					<div @click="toTagList">
						<span class="iconfont">&#xe6b6;</span>
						<span>标签</span>
					</div>
				</div>
			</div>
			
			
			<div slot="content">
				<view class="search-content padding">
					<view class="uni-input-wrapper"><input class="uni-input" v-model="searchData.nickname" placeholder="搜索用户名称" /></view>
				</view>
				<!-- 通讯录导航 -->
				<address-book :bookList="bookList" :letter="letter">
					<template v-slot:addressBookList>
						<view class="user-content">
							<view class="user-list" v-for="(item, index) in Object.keys(bookList)" :key="index">
								<view class="number padding">{{ item }}</view>
								<view class="user" v-for="(val, i) in bookList[item]" :key="i" @click="selectUser(val)">
									<view class="user-list-left"><image :src="val.avatar" mode=""></image></view>
									<view class="user-list-right">{{ val.nickname }}</view>
								</view>
							</view>
						</view>
					</template>
				</address-book>
			</div>
		</lay-out>
	</view>
</template>

<script>
import AddressBook from './addressBookNavigation/addressBookNavigation';
import { makePy } from '../../utils/utils';
import { navigateTo, getStorage } from 'pages/utils/uniApi.js';
import http from 'pages/api/index';
import api from 'pages/api/api.js';
export default {
	components: { AddressBook },
	data() {
		return {
			letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			list: [],
			search: '',
			bookList: {} || [],
			customerServerData: {}, // 客服数据
			searchData: {
				nickname: ''
			}
		};
	},
	onLoad() {
		this.customerServerData = getStorage('userData').kefuInfo;
		this.initData();
	},
	methods: {
		// 查询当前客服的客户列表
		initData() {
			
			http(api.userList, this.searchData).then(res => {
				this.bookList = res;
			})
		},
		
		toTagList() {
			navigateTo(1, '/pages/view/setTags/index');
		},
		selectUser(item) {
			navigateTo(1, '/pages/view/customerServer/customerMessage', {user_id: item.to_user_id});
		},
		// 对通讯录按字母顺序做排序
		letterSrot() {
			const sortList = [];
			const list = this.list;
			this.letter.forEach(item => {
				const obj = {};
				obj.key = item;
				obj.list = [];
				for (let i = 0; i < list.length; i++) {
					if (item == makePy(list[i].username).substr(0, 1)) {
						obj.list.push(list[i]);
						list.splice(i, 1);
						i--;
					}
				}
				if (obj.list.length) sortList.push(obj);
			});
			this.bookList = sortList;
		}
	}
};
</script>

<style lang="less" scoped>
@padding-l-r: 30rpx;
@padding-t-p: 20rpx;
@bgc-f: #ffffff;
@fontSize: 28rpx;
@imgSize: 64rpx;
.padding {
	padding: @padding-t-p @padding-l-r;
}
.search-content {
	background-color: @bgc-f;
	input {
		border: none;
		background-color: #f5f6f9;
		color: #c4c4c4;
		font-size: @fontSize;
		border-radius: 30rpx;
		padding: @padding-t-p 0 @padding-t-p @padding-l-r;
		text-align: center;
	}
}
.user-content {
	background-color: #eeeeee;
	.user-list {
		.number {
			color: #666666;
			font-size: @fontSize - 2rpx;
		}
		.user {
			background-color: @bgc-f;
			display: flex;
			align-items: center;
			padding: @padding-t-p @padding-l-r;
			border-bottom: 1rpx solid #f0f2f7;
			.user-list-left {
				width: @imgSize;
				height: @imgSize;
				padding-right: 20rpx;
				image {
					width: @imgSize;
					height: @imgSize;
					border-radius: 50%;
				}
			}
			.user-list-right {
				color: #282828;
			}
		}
	}
}
.header {

	&_content {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: relative;
		height: 96rpx;
		background: @primaryBgColor;
		padding: 0 30rpx;
		/* #ifdef APP-PLUS */
		padding-top: 64rpx;
		 /* #endif */ 
		color: #fff;
		> div {
			flex: 1;
		}
		> div:nth-child(2) {
			text-align: center;
			font-weight: bold;
		}
		> div:nth-child(3) {
			font-size: 14px;
			text-align: right;
			.iconfont {
				font-size: 14px;
				margin-right: 8rpx;
				font-weight: bold;
			}
		}
	}
}
</style>
