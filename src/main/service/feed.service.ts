import Parser from 'rss-parser'
import { db } from '../lib/db'
import { nanoid } from 'nanoid'
import { CustomFeed, CustomItem, Feed, Chache } from '../../preload/types'

export const parser: Parser<CustomFeed, CustomItem> = new Parser({
  defaultRSS: 2.0,
  timeout: 5000,
  customFields: {
    feed: ['author', 'uid'],
    item: ['uid']
  }
})

class FeedService {
  async append(feedUrl: string): Promise<boolean> {
    if (this.has(feedUrl)) return true

    try {
      const feed = await parser.parseURL(feedUrl)
      await db.update(() => {
        db.data.feeds = db.chain.get('feeds').concat(feed).value()
      })
      await db.write()
      return true
    } catch (error) {
      console.log('parser error :', error)
      return false
    }
  }

  async delete(name: string): Promise<void> {
    db.data.feeds = db.chain
      .get('feeds')
      .remove((feed) => {
        return feed.feedUrl === name
      })
      .value()
    await db.write()
  }

  get(name: string): Feed {
    return db.chain
      .get('feeds')
      .filter((feed) => {
        return feed.feedUrl === name
      })
      .first()
      .value()
  }

  getAll(): Feed[] {
    // 读取订阅内容的时候，需要处理一下各个源的解析结果
    db.data.feeds.forEach((feed) => {
      if (!feed.uid) {
        feed.uid = nanoid()
      }
      feed.items.forEach((el) => {
        if (!el.uid) {
          el.uid = nanoid()
        }
        if (el['content:encoded']) {
          el.content = el['content:encoded']
        }
        if (!el.summary && el.contentSnippet) {
          el.summary = el.contentSnippet
        }
      })
    })

    return db.chain.get('feeds').value()
  }

  has(name: string): boolean {
    const index = db.chain
      .get('feeds')
      .findIndex((feed) => {
        return feed.feedUrl === name
      })
      .value()
    return index !== -1
  }

  async setChache(chache: Chache): Promise<void> {
    db.data.chache = chache
    await db.write()
  }

  getChache(): Chache {
    return db.data.chache
  }
}

export const feed = new FeedService()
