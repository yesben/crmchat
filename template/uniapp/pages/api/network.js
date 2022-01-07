export function onNetworkStatusChange(onlineFun, offlineFun) {

	//#ifdef H5
	function addHandler(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	}
	addHandler(window, 'online', () => {
		onlineFun()
	})
	addHandler(window, 'offline', () => {
		offlineFun()
	});
	//#endif
	//#ifdef APP-PLUS
	uni.onNetworkStatusChange(res => {
		if (res.networkType != 'none') {
			onlineFun(res);
		} else {
			offlineFun(res);
		}
	});
	//#endif

}
