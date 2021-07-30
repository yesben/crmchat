<template>
	<div class="container">
		<lay-out isShowHeader>
			<div slot="content" class="content">
				<div class="handle_title" @click="createdTag">
					<span class="iconfont">&#xe6c1;</span>
					<span class="handle_title_message">新建标签</span>
				</div>

				<uni-swipe-action>
					<uni-swipe-action-item>
						<div class="tag_container">
							<div class="tag_container_name">
								<span class="name">意向客户</span>
								<span class="num">(9)</span>
							</div>
							<div class="tag_container_user">
								<div class="userList">
									阿萨大大啊水水水水水水水水水水水水水水水水水水水啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊反反复复反反复复反反复复方法方法分分分3
								</div>
							</div>
						</div>

						<template v-slot:right>
							<div class="delete_tags">
								<text>删除</text>
							</div>
						</template>
					</uni-swipe-action-item>
				</uni-swipe-action>
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
	methods:{
		createdTag() {
			navigateTo(1, '/pages/view/setTags/addTag');
		}
	}
};
</script>

<style lang="less" scoped>
@import url('./less/setTags.less');
</style>
