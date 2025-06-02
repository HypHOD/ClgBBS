import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//导入 nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from './router'

// import marked from 'marked'
// import DOMPurify from 'dompurify'

// 配置 NProgress（可选）
NProgress.configure({
    showSpinner: false,  // 隐藏加载 spinner
    easing: 'ease',
    speed: 500
});

// 路由切换时显示进度条
router.beforeEach((to, from, next) => {
    NProgress.start();  // 开始加载
    next();
});

router.afterEach(() => {
    NProgress.done();  // 加载完成
});

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)


app.use(vuetify)
    .use(router)
    .mount('#app')
