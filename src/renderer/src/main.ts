import './assets/main.less'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')
