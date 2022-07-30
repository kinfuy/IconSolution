import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '../static/font/iconfont.css';
const app = createApp(App);
app.use(ElementPlus);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
