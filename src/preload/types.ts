import { Output, Item } from 'rss-parser'

export enum ChannelName {
  feed_get_all = 'feed: get all',
  feed_append = 'feed: append',
  setChache = 'set chache',
  getChache = 'get chache'
}

export type CustomFeed = { author: string; uid: string }
export type CustomItem = { uid: string }
export type Feed = Output<CustomItem> & CustomFeed
export type Blog = Item & CustomItem
export type Chache = {
  fid: string
  bid: string
}
