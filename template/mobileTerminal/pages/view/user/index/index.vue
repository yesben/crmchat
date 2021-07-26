<template>
	<div class="container">
		
		<lay-out>
			<div slot="header"  style="height: 370rpx;">
				<div class="header">
					<div class='font'>我的</div>
					<div class="box">
						<div class="img">
							<img src="../../../../static/images/bguser.png" alt="">
						</div>
						<div>
							<div class="box_font1">客服名称</div>
							<div class="box_font2">手机号：12773844882</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="content" class="content">
				<div class="content_box" @click="setting">
					<img src="../../../../static/images/set.png" mode=""></img>
					<div class="text">设置</div>
					<div><img src="../../../../static/images/right.png" alt=""></div>
				</div>
			</div>
		</lay-out>
	</div>
</template>

<script>
export default {
	components: {
	},
	data() {
		return {
	
		}
	},
	onLoad(opt) {
	
	},
	onShow(opt) {
	
	},
	methods: {
		setting(){
			uni.navigateTo({
				url: '/pages/view/user/setting/setting',
			});
		}
	}
};
</script>

<style lang="less" scoped>
	.header{
		height: 288rpx;
		background: url(../../../../static/images/bguser.png) no-repeat;
		background-color: #1890fc;
		font-family: PingFang SC;
		.font{
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 600;
			line-height: 45rpx;
			text-align: center;
			padding-top: 64rpx;
			margin-bottom: 61rpx;
			color: #FFFFFF;
		}
		.box{
			width: 690rpx;
			height: 180rpx;
			background: #FFFFFF;
			border-radius: 12rpx;
			margin: 0 auto;
			margin-bottom: 24rpx;
			display: flex;
			justify-content: left;
			align-items: center;
			font-family: PingFang SC;
			img{
				width: 100rpx;
				height: 100rpx;
				margin-left: 34rpx;
				margin-right: 20rpx;
				border-radius: 50%;
			}
			.box_font1{
				font-size: 30rpx;
				font-weight: 600;
				line-height: 42rpx;
				color: #282828;
				margin-bottom: 8rpx;
			}
			.box_font2{
				font-size: 26rpx;
				font-weight: 400;
				line-height: 37rpx;
				color: #999999;
			}
		}
	}
	.content{
		width: 690rpx;
		margin: 0 auto;
		.content_box{
			height: 88rpx;
			background: #FFFFFF;
			border-radius: 12rpx;
			margin-bottom: 24rpx;
			display: flex;
			justify-content: left;
			align-items: center;
			.text{
				width: 84%;
			}
			img{
				width: 33rpx;
				height: 33rpx;
				margin: 0rpx 15rpx;
				
			}
		}
	}

</style>
