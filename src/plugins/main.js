import Vue from 'vue';
import './directive.js';
import './filter.js';
import url from './url.js';

import Http from './Http.js';
import './components.js';
import './Origin.js';
import ElementUI from 'element-ui';
import '../styles/element-variables.scss';


import { pcaa } from 'area-data';//引入地址数据
import 'vue-area-linkage/dist/index.css'; // 地址选择器样式
import VueAreaLinkage from 'vue-area-linkage';//地址选择器组件
Vue.prototype.$pcaa = pcaa;//绑定地址数据
Vue.use(VueAreaLinkage)//注册地址组件



import Vant from 'vant';
// import '@/styles/vant.scss';
import 'vant/lib/index.css';

Vue.use(Vant);




import VCharts from 'v-charts'

Vue.use(VCharts)

Vue.use(ElementUI, {
    size: 'mini'
});

import '@/styles/styles.scss';

Vue.prototype.$Url = url;
Vue.prototype.$http = Http;


import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)



import vdr from 'vue-draggable-resizable-gorkys'

// 导入默认样式
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vdr', vdr)