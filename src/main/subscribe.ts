import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { ChannelName } from '../preload/types'
import { feed } from './service/feed.service'

export function createSubscribe(): void {
  // IPC 测试
  ipcMain.on('ping', () => console.log('pong'))

  // 添加 RSS 订阅
  ipcMain.handle(ChannelName.feed_append, (_e: IpcMainInvokeEvent, feedUrl: string) => {
    console.log('添加订阅：', feedUrl)
    return feed.append(feedUrl)
  })

  // 获取所有 RSS 订阅内容
  ipcMain.handle(ChannelName.feed_get_all, () => {
    return feed.getAll()
  })

  // 缓存客户端的配置
  ipcMain.handle(ChannelName.setChache, (_e: IpcMainInvokeEvent, fid: string, bid: string) => {
    console.log('服务端触发： set chache fid bid', fid, bid)
    feed.setChache({
      fid,
      bid
    })
  })

  // 获取服务端存储的配置
  ipcMain.handle(ChannelName.getChache, () => {
    return feed.getChache()
  })
}
