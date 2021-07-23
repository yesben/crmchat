<template>
	<view class="layout">
		<div class="layout_header"><slot name="header"></slot></div>
		<div class="layout_content">
			<!-- <slot name="content"></slot> -->
			<scroll-view :scroll-y="true" class="layout_content_scroll"><slot name="content"></slot></scroll-view>
		</div>
		<div class="layout_bottom"><slot name="bottom"></slot></div>
	</view>
</template>

<script></script>

<style lang="less" scoped>
.layout {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.layout_header {
	// padding-top: 10rpx;
}
.layout_content {
	flex: 1;
	overflow: hidden;
	.layout_content_scroll {
		height: 100%;
	}
}
.layout_bottom {
}
</style>
