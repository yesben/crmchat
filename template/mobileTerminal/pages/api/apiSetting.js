
import { getStorage } from 'pages/utils/uniApi.js';
const setting = {
	// developeApiUrl: 'http://chat.lfmn.fun',
	developeApiUrl: `http://${getStorage('dominName')}`,
	productionApiUrl: `https://${getStorage('dominName')}`,
	// productionApiUrl: location.origin + '/api' : '',
	wsUrlDevelop: `ws://${getStorage('dominName')}/`,
	wsUrlProduction: `wss://${getStorage('dominName')}/`,
	// wsUrlProduction: `ws:${location.hostname}`
}

export default setting;