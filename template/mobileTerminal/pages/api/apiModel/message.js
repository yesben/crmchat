// 聊天界面接口
const customerServer = {
	
	kefuServiceList: {
		url: 'kefu/service/list',
		method: 'get'
	},
	// 获取转接客服列表
	serviceTransferList: {
		url: 'kefu/service/transfer_list',
		method: 'get'
	},
	// 确认转接
	serviceTransfer: {
		url: 'kefu/service/transfer',
		method: 'post'
	},
	// 查询客服话术
	serviceSpeechcraft: {
		url: 'kefu/service/speechcraft',
		method: 'get'
	},
	// 获取话术分类
	kefuServiceCate: {
		url: 'kefu/service/cate',
		method: 'get'
	},
	// 添加话术
	postServiceSpeechcraft: {
		url: 'kefu/service/speechcraft',
		method: 'post'
	},
	// 修改话术
	putServiceSpeechcraft: {
		url: 'kefu/service/speechcraft',
		method: 'put',
		queryKey: ['id']
	},
	// 删除话术
	deleteServiceSpeechcraft: {
		url: 'kefu/service/speechcraft',
		method: 'delete',
		queryKey: ['id'],
		canNotInputQuery: true
	}



}
const api  = {
	// 获取客户列表
	userList: {
		url: 'kefu/user/list',
		method: 'get'
	},
	// 获取聊过天的用户
	userRecord: {
		url: 'kefu/user/record',
		method: 'get',
		loading: true
	},
	...customerServer
};

export default api;