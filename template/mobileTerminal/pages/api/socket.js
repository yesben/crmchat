import apiSetting from './apiSetting.js';
import {
	getStorage
} from 'pages/utils/uniApi.js';
let wsUrl = '';
if (process.env.NODE_ENV === 'production') {
	wsUrl = apiSetting.wsUrlProduction
} else {
	wsUrl = apiSetting.wsUrlDevelop
}

wsUrl += `?type=kefu&token=${getStorage('userData').token}`
class Socket {
	constructor() {
		this.socketTask = null;
		this.timer = null;
		this.connectStatus = false;
	}

	init() {
		this.socketTask = uni.connectSocket({
			url: wsUrl,
			method: 'GET',
			complete: () => {}
		})
		return new Promise((reslove, reject) => {
			this.socketTask.onOpen(() => {
				console.log('socket连接已被开启');
				this.connectStatus = true;
				this.ping();
				reslove(this);
			})
		})

	}
	ping() {
		this.timer = setInterval(() => {
			this.send({
				type: 'ping'
			})
		}, 10000)
	}

	onMessage(callback) {
	  this.socketTask.onMessage(data => {
			callback(JSON.parse(data.data));
		})
	}


	send(data) {
		this.socketTask.send({
			data: JSON.stringify(data)
		})
	}

	closeSocket() {
		this.socketTask.close({
			success() {
				console.log('socket连接已被关闭');
			}
		})
	}

	clearPing() {
		clearInterval(this.timer);
		this.timer = null;
	}

}


export default Socket;
