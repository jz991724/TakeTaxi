import Vue from 'vue';
import App from './App';
import QQMapWX from 'static/js/qqmap-wx-jssdk.min';
import store from './store';

Vue.prototype.$store = store;
Vue.prototype.$qqmapsdk = new QQMapWX({
    key: 'KC7BZ-ZPH3D-FDW4E-P3YJB-OYAQQ-M6BBY'
});

import cuCustom from './colorui/components/cu-custom.vue';

Vue.component('cu-custom', cuCustom);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
