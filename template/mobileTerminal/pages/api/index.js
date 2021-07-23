import {
	Loading,
	hideLoading,
	Toast,
	getStorage,
	navigateTo
} from 'pages/utils/uniApi.js';

function http(api, data, jsonModel = true) {
	let post_data = {
		url: api.url, //仅为示例，并非真实接口地址。
		data: jsonModel ? {
			companyId: getStorage('userData').companyId,
			...data
		} : [ ...data ],
		header: {
			'content-type': api.form ? 'application/x-www-form-urlencoded' : 'application/json',
			'Authorization': 'bearer ' + ' ' + getStorage('userData').token
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
				// 根据接口返回参后续进行封装
				switch (data.data.code) {
					case "200":
						reslove(data.data.data ? data.data.data: true);
						break;
					case "401":
						navigateTo(3, '/pages/weighApp/login/index');
						break;
					return;
					default:
						Toast(data.data.data instanceof Array ? data.data.data.join(','): data.data.message ? data.data.message : data.data.msg);
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

// function checkOutCode(data) {
// 	// 检查服务端数据
// 	// if (data.data.code == '200' && data.statusCode == 200) {
// 	//  if(!data.data.data) {
// 	//   return true;
// 	//  }
// 	//  return data.data.data;
// 	// } else {
// 	//  Toast(data.data.msg);
// 	// }
// 	// return false;
// 	// 检查服务端数据
// 	switch (data.data.code) {
// 		case "200":
// 			return data.data.data ? data.data.data: true;
// 		case "401":
// 			navigateTo(3, '/pages/weighApp/login/index');
// 		return;
// 		default:
// 			Toast(data.data.message ? data.data.message : data.data.msg);
// 			break;

// 	}
// 	return false;
// }
export default http;
