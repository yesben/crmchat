<template>
	<div class="container">
		<lay-out isShowHeader headerColor="#3A3A3A" headerTextColor="#fff">
			<div slot="content" class="content">
				<div  class="header_banner">
					<div class="header_banner_content">
						<div class="header_banner_content_title">
							<span>商城客服已离线</span>
						</div>
						<div class="header_banner_content_message">
							<span>您好，现在客服不在线，请留言，如果没有留下您的联系方式，客服将无法和您联系！</span>
						</div>
					</div>
					<div class="header_banner_image">
						<div class="header_banner_image_imageBox">
							<image src="~static/image/feedback/bg.png" mode="widthFix"></image>
						</div>
					</div>
				</div>
	
				<div class="organization_work">
					
					<div class="organization_work_item">
						<div class="organization_work_item_label">
							<span>09:00~22:00</span>
						</div>
						<div class="organization_work_item_value">
							<span>我们的工作时间</span>
						</div>
					</div>
					<div class="tip"></div>
					<div class="organization_work_item">
						<div class="organization_work_item_label">
							<span>400-8888-794</span>
						</div>
						<div class="organization_work_item_value">
							<span>售前客服电话</span>
						</div>
					</div>
					
				</div>
				
				<div class="feedback">
					<div class="feedback_title">
						<span>我要反馈</span>
					</div>
					<div class="feedback_input">
						<input type="text" value="" placeholder="请输入您的姓名"/>
					</div>
					<div class="feedback_input">
						<input type="text" value="" placeholder="请输入您的联系电话" />
					</div>
					<div class="feedback_textarea">
						<textarea value="" placeholder="请填写留言内容" />
					</div>
					
					<div class="handle_button" @click="handleSubmit">
						<span>提交</span>
					</div>
				</div>
			
			</div>			
		</lay-out>
		
		<uni-popup ref="feedbackReslove" animation>
			<submit-response @handleSubmitRes="handleSubmitRes"></submit-response>
		</uni-popup>
		
		
	</div>
</template>

<script>
	import submitResponse from './component/submitResponse.vue';
	export default {
		components: {
			submitResponse
		},
		onLoad() {
		},
		methods: {
			handleSubmit() {
				this.$refs.feedbackReslove.open('center');
			},
			handleSubmitRes() {
				this.$refs.feedbackReslove.close();
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('./less/feedback.less');
</style>
