const api = {
	// 客户列表
	userList: {
		url: 'kefu/user/list',
		method: 'get'
	},
	// 客户全部标签
	userLabe: {
		url: 'kefu/user/label/all',
		method: 'get'
	},
	// 客户已有标签，带有选中标识
	userLabelSelect: {
		url: 'kefu/user/label',
		method: 'get'
	},
	// 设置用户标签
	putUserLabel: {
		url: 'kefu/user/label',
		method: 'put',
		queryKey: ['userId']
	},
	// 客户详细信息
	userInfo: {
		url: 'kefu/user/info',
		method: 'get',
		queryKey: ['user_id'],
		canInputQuery: true
	},
	// 用户分组
	UserGroup: {
		url: 'kefu/user/group',
		method: 'get'
	}

}
export default api; 