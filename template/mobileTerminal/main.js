import Vue from 'vue'
import App from './App'
import layOut from 'pages/components/layout.vue';
Vue.component('layOut', layOut);


Vue.config.productionTip = false



App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
