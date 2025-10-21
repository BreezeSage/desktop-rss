import { defineStore } from 'pinia'
import { ChannelName, Feed, Blog, Chache } from '../../preload/types'
import { sanitizeAndProcessHTML } from './utils'

interface State {
  feedMap: Map<string, Feed>
  feedId: string
  blogMap: Map<string, Blog>
  blogId: string
}

const invoke = window.electron.ipcRenderer.invoke

export const useStore = defineStore('rss', {
  state: (): State => {
    return {
      feedMap: new Map(),
      feedId: '',
      blogMap: new Map(),
      blogId: ''
    }
  },
  getters: {
    blog: (state) => {
      return state.blogMap.get(state.blogId)
    },
    blogArray: (state) => {
      return state.feedMap.get(state.feedId)?.items
    }
  },
  actions: {
    async initialStore() {
      const feeds = ((await invoke(ChannelName.feed_get_all)) || []) as Feed[]
      const config = (await invoke(ChannelName.getChache)) as Chache

      feeds.forEach((feed) => {
        this.feedMap.set(feed.uid, feed)
        const blogs = feed.items as Blog[]
        // this.blogArray = blogs
        blogs.forEach((blog) => {
          blog.content = sanitizeAndProcessHTML(blog.content || '<h1>404</h1>')
          this.blogMap.set(blog.uid, blog)
        })
      })

      const { fid, bid } = config || {}
      fid && (this.feedId = fid)
      bid && (this.blogId = bid)
    },
    async appendFeed(feedUrl: string) {
      await invoke(ChannelName.feed_append, feedUrl)
      await this.initialStore()
    },
    saveChache() {
      invoke(ChannelName.setChache, this.feedId, this.blogId)
    },
    setFeedId(uid: string) {
      this.feedId = uid
      this.saveChache()
    },
    setBlogId(uid: string) {
      this.blogId = uid
      this.saveChache()
    }
  }
})
