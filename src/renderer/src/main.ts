import './assets/main.less'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { createApp } from 'vue'

import Article from './RightSidebar/Article.vue'
import Setting from './LeftSidebar/Setting.vue'
import RSSSource from './RightSidebar/RSSSource.vue'
import Mail from './RightSidebar/Mail.vue'
import App from './App.vue'
import Layout from './Layout.vue'
import Hitokoto from './RightSidebar/Hitokoto.vue'
import Sidebar from './LeftSidebar/Sidebar.vue'

dayjs.locale('zh-cn')

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/article',
    children: [
      {
        path: 'hitokoto',
        components: {
          LeftSidebar: Setting,
          RightSidebar: Hitokoto
        }
      },
      {
        path: 'rss-source',
        components: {
          LeftSidebar: Setting,
          RightSidebar: RSSSource
        }
      },
      {
        path: 'mail',
        components: {
          LeftSidebar: Setting,
          RightSidebar: Mail
        }
      },
      {
        path: 'article',
        components: {
          LeftSidebar: Sidebar,
          RightSidebar: Article
        }
      }
      // { path: 'article', component: Article },
      // { path: 'setting', component: Setting },
      // { path: 'hitokoto', component: Hitokoto }
      // { path: 'article', component: Article },
      // { path: 'setting', component: Setting },
      // { path: 'hitokoto', component: Hitokoto }
    ]
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

createApp(App).use(createPinia()).use(router).mount('#app')
