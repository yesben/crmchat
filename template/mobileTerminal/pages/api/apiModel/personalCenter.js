const api = {
	// 获取当前登录客服信息
	userUserInfo: {
		url: 'kefu/user/userInfo',
		method: 'get'
	},
	// 上传头像
	kefuUploadAvatar: {
		url: 'kefu/upload',
		method: 'post',
		form: true
	},
	// 确认信息修改
	putKefuUserUserInfo: {
		url: 'kefu/user/userInfo',
		method: 'put'
	}



};
export default api;