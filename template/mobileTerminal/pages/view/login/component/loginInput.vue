<template>
	<div class="login_input">
		<div class="title_icon">
			<slot name="icon"></slot>
		</div>
		<div class="input">
			<input :placeholder="placeholder" type="text" v-model="value"  @input="$emit('input', $event.target.value)" />
		</div>
		<div class="clear">
			<span class="iconfont">&#xe6b5;</span>
		</div>
	</div>
</template>

<script>
export default {
	model: {
		prop: 'value',
		event: 'input'
	},
	props: {
		placeholder: {
			type: String,
			default:''
		}
	},
	data() {
		return {
			value: ''
		};
	},
	methods:{
		
	}
};
</script>

<style scoped lang="less"> 
.login_input {
	display: flex;
	align-items: center;
	padding: 22rpx 0;
	border-bottom: 1px solid #EDEDED;
	font-size: 14px;
	.title_icon {
		margin-right: 12rpx;
		color: @primaryColor;
	}
	.input {
		flex: 1;
	}
	.clear {
		opacity: .2;
	}
}
</style>
