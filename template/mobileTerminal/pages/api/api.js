import apiSetting from './apiSetting.js';
import login from './apiModel/login.js';
import message from './apiModel/message.js';
import userProgAdministration from "./apiModel/userProgAdministration.js";
import feedBack from './apiModel/feedBack.js';
import statistics from './apiModel/statistics.js';
import personalCenter from './apiModel/personalCenter.js';
const api = {
	...login,
	// 聊天列表
	...message,
	// 客户管理
	...userProgAdministration,
	// 客户反馈
	...feedBack,
	// 统计
	...statistics,
	// 个人中心
	...personalCenter
}




if (process.env.NODE_ENV === 'production') {
	Object.keys(api).forEach((item) => {
		api[item]['url'] = apiSetting.productionApiUrl + api[item]['url'];
	});
} else {
	Object.keys(api).forEach((item) => {
		api[item]['url'] = apiSetting.developeApiUrl  + api[item]['url'];
	});
}





export default api;
