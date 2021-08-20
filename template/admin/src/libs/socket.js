// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import { wss } from '@/libs/util';
import Setting from '@/setting';
import Cookies from "js-cookie";
import Vue from 'vue';


class wsSocket {
    constructor(opt) {
        this.vm = new Vue;
        this.ws = null;
        this.opt = opt || {};
        this.init(opt);
    }

    onOpen(key = false) {
        this.opt.open && this.opt.open();
        let that = this;
        that.ping();
        this.socketStatus = true;
    }

    init(opt) {
        let wsUrl = ''
        let hostUrl = wss(Setting.wsSocketUrl);

         hostUrl = hostUrl + '/ws' ;

        if(opt.key == 1) {
            wsUrl = hostUrl + '?type=admin' + '&token=' + util.cookies.get("token")
        }
        if(opt.key == 2) {
            wsUrl = hostUrl + `?type=kefu` + '&token=' + `${Cookies.get("kefu_token")}`;
        }
        if(opt.key == 3) {
            wsUrl = `${hostUrl}?type=user&form=${opt.form}&token=${opt.token}`;
        }


        // if (opt.token) {
        //     wsUrl += '&token=' + opt.token
        // } else
        if(opt.tourist_uid) {
            wsUrl += '&tourist_uid=' + opt.tourist_uid
        }
        if(wsUrl) {
            this.ws = new WebSocket(wsUrl);
            this.ws.onopen = this.onOpen.bind(this);
            this.ws.onerror = this.onError.bind(this);
            this.ws.onmessage = this.onMessage.bind(this);
            this.ws.onclose = this.onClose.bind(this);
        }

    }

    ping() {
        var that = this;
        this.timer = setInterval(() => {
            that.send({ type: 'ping' });
        }, 10000);
    }

    send(data) {
        return new Promise((resolve, reject) => {
            try {
                this.ws.send(JSON.stringify(data));
                resolve({ status: true });
            } catch(e) {
                reject({ status: false })
            }
        });
    }

    onMessage(res) {
        this.opt.message && this.opt.message(res);
    }

    onClose() {
        this.timer && clearInterval(this.timer);
        this.opt.close && this.opt.close();
    }

    onError(e) {
        this.opt.error && this.opt.error(e);
    }

    $on(...args) {
        this.vm.$on(...args);
    }
    $off(...args) {
        this.vm.$off(...args);
    }
}

let promises = {};

function createSocket(key, flag, token, tourist_uid, type, form) {
    if(flag) promises[key] = null;
    if(!promises[key])
        promises[key] = new Promise((resolve, reject) => {
            const ws = new wsSocket({
                key,
                token,
                tourist_uid,
                type,
                form,
                open() {
                    resolve(ws);
                },
                error(e) {
                    reject(e)
                },
                message(res) {
                    const { type, data = {} } = JSON.parse(res.data);
                    ws.vm.$emit(type, data);
                },
                close(e) {
                    ws.vm.$emit('close', e);
                }
            })
        });

    return promises[key];
}



export const adminSocket = (flag, token) => createSocket(1, flag, token);
export const Socket = (flag, token, tourist_uid, type) => createSocket(2, flag, token, tourist_uid, type);
export const mobileScoket = (flag, token, form, tourist_uid, type,) => createSocket(3, flag, token, tourist_uid, type, form);
