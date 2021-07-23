<template>
	<div class="login_container">
		<!-- 头部背景图 -->
		<div class="login_container_bg"><image class="login_container_bg_image" src="~static/image/login/bg.png" mode="widthFix"></image></div>
		<!-- 头部背景图结束 -->
		<div class="login_container_content">
			<div class="login_container_content_title"><span>欢迎登录</span></div>
			<div class="login_container_content_form">
				
				<div class="login_container_content_form_input">
					<login-input placeholder="请输入账号">
						<span slot="icon" class="iconfont">&#xe6bc;</span>
					</login-input>
				</div>
				
				<div class="login_container_content_form_input">
					<login-input placeholder="请输入密码">
						<span slot="icon" class="iconfont">&#xe6bd;</span>
					</login-input>
				</div>
				
			</div>
			<div class="login_container_content_handle"><div class="login_primary_button">登录</div></div>
		</div>
	</div>
</template>

<script>
import loginInput from './component/loginInput.vue';
export default {
	components: {
		loginInput
	},
	data() {
		return {
			userName: ''
		};
	},
	watch:{
		userName(val) {
			console.log(val);
		}
	}
};
</script>

<style scoped lang="less">
.login_container {
	width: 100%;
	&_bg {
		width: 100%;
		&_image {
			width: 100%;
		}
	}
}
</style>
