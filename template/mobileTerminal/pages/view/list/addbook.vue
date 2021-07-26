<template>
	<view class="content">
		<view class="search-content padding">
			<view class="uni-input-wrapper">
				<input class="uni-input" v-model="search" placeholder="搜索用户名称"/>
			</view>
		</view>
		<!-- 通讯录导航 -->
		<address-book :bookList="bookList" :letter="letter">
			<template v-slot:addressBookList>
			<view class="user-content">
				<view class="user-list" v-for="item in bookList" :key="item.key">
					<view class="number padding">{{item.key}}</view>
					<view class="user" v-for="items in item.list" :key="items.id">
						<view class="user-list-left">
							<image :src="items.headImg" mode=""></image>
						</view>
						<view class="user-list-right">{{items.username}}</view>
					</view>
				</view>
			</view>	
			</template>
		</address-book>
	</view>
</template>

<script>
import AddressBook from '../../components/addressBookNavigation/addressBookNavigation'
import {makePy} from '../../utils/utils'
	
export default{
	components:{AddressBook},
	data(){
		return{
			letter:["A", "B", "C", "D","E", "F", "G", "H","I", "J", "K", "L", "M", "N","O", "P", "Q", "R", "S", "T","U","V", "W", "X", "Y", "Z"],
			list:[
				{
					id:1,
					username:"a白小纯",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:2,
					username:"B罗小黑",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:3,
					username:"张楚岚",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:4,
					username:"冯宝宝",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:5,
					username:"五六七",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:11,
					username:"白月初",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:22,
					username:"王富贵",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:33,
					username:"叶修",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:44,
					username:"唐三",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:55,
					username:"林动",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:12,
					username:"魏无羡",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:23,
					username:"秦羽",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:34,
					username:"蛮吉",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:45,
					username:"荆天明",
					headImg:"../../../static/image/login/bg.png"
				},
				{
					id:56,
					username:"武庚",
					headImg:"../../../static/image/login/bg.png"
				}
			],
			search:'',
			bookList:[]
		}
	},
	created() {
		this.letterSrot()
	},
	methods:{
		// 对通讯录按字母顺序做排序
		letterSrot(){
			const sortList = []
			const list = this.list
			this.letter.forEach(item => {
				const obj = {}
				obj.key = item
				obj.list = []
				for(let i = 0;i < list.length;i++){
					if(item == makePy(list[i].username).substr(0,1)){
						obj.list.push(list[i])
						list.splice(i,1)
						i--
					}
				}
				if(obj.list.length)
					sortList.push(obj)
			})
			this.bookList = sortList
		}
	}
}
</script>

<style lang="less" scoped>
@padding-l-r:30rpx;
@padding-t-p:20rpx;
@bgc-f:#FFFFFF;
@fontSize:28rpx;
@imgSize:64rpx;
.padding{
	padding: @padding-t-p @padding-l-r;
}
.search-content{
	background-color: @bgc-f;
	input{
		border: none;
		background-color:#F5F6F9;
		color: #C4C4C4;
		font-size: @fontSize;
		border-radius: 30rpx;
		padding:@padding-t-p 0 @padding-t-p  @padding-l-r;
		text-align: center;
	}
}
.user-content{
	background-color: #EEEEEE;
	.user-list{
		.number{
			color: #666666;
			font-size:@fontSize - 2rpx;
		}
		.user{
			background-color: @bgc-f;
			display: flex;
			align-items: center;
			padding:@padding-t-p  @padding-l-r;
			border-bottom: 1rpx solid #F0F2F7;
			.user-list-left{
				width: @imgSize;
				height: @imgSize;
				padding-right: 20rpx;
				image{
					width: @imgSize;
					height: @imgSize;
					border-radius: 50%;
				}
			}
			.user-list-right{
				color: #282828;
			}
		}
	}
}
</style>
