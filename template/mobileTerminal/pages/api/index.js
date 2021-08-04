import {
	Loading,
	hideLoading,
	Toast,
	getStorage,
	navigateTo
} from 'pages/utils/uniApi.js';

function http(api, data) {
	let url = api.url;
	// 是否在url上挂载单独参数时，也可以传输数据 eg: /api/{12}/ false 代表可传输，true 代表不可传输
	let canNotInputQuery = api.canNotInputQuery ? api.canNotInputQuery : false
	if(api.queryKey instanceof Array && api.queryKey.length) {
		url += api.queryKey.map(item => `/${data[item]}`).join('')
	}	
	
	let post_data = {
		url: url,
		data: api.canNotInputQuery ? '': data,
		header: {
			'content-type': api.form ? 'application/x-www-form-urlencoded' : 'application/json',
			'Authori-zation': 'Bearer ' + getStorage('userData').token
		},
		method: api.method.toUpperCase(),
		timeout: 3000,
	}
	return new Promise((reslove, reject) => {
		if (api.loading) {
			Loading();
		}
		uni.request({
			...post_data,
			success: (data) => {
				switch (data.data.status) {
					case 200:
						reslove(data.data.data);
						break;
					case 400:
						Toast(data.data.msg)
						reject(data.data);
						break;
						case 410003:
						Toast(data.data.msg);
						setTimeout(() => {
							navigateTo(2, '/pages/view/login/index');
						}, 1000);
					default:
						Toast(data.data.msg)
						reject(data.data);
						break;
				}
			},
			fail: (rej) => {
				reject(rej);
			},
			complete: () => {
				if (api.loading) {
					hideLoading();
				}
			}
		});
	})

}


export default http;
