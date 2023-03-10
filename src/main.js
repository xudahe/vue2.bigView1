import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from "./vuex/store"
import * as echarts from 'echarts';
import ViewUI from 'view-design';
import scroll from 'vue-seamless-scroll'
import 'view-design/dist/styles/iview.css';
import 'viewerjs/dist/viewer.css'
import axios from "./askAxios.js";
import apiSet from "./ApiSetting.js"
import Viewer from 'v-viewer'
import mixin from './mixin'

Vue.use(ViewUI);
Vue.use(Vuex)
Vue.use(scroll)
Vue.use(Viewer)
Vue.mixin(mixin) //定义全局混入
Vue.prototype.$store=store
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
Vue.prototype.ApiSetting = apiSet;
Vue.prototype.$echarts = echarts;
import 'vue-easytable/libs/themes-base/index.css'
import {
  VTable,
} from 'vue-easytable'

Vue.component(VTable.name, VTable)
Vue.config.productionTip = false
Vue.prototype.$http =axios;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeCreate() {
  }
})


