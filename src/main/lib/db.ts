import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { Feed, Chache } from '../../preload/types'
import lodash from 'lodash'
import { join } from 'node:path'
import { app } from 'electron'

// - Feed
// |----- Blog

type Data = {
  feeds: Feed[]
  chache: Chache
}

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

const defaultData: Data = {
  feeds: [],
  chache: {
    fid: '',
    bid: ''
  }
}
// const dbPath = join(app.getPath('appData'), 'db.json')
const dbPath = 'db.json'
const adapter = new JSONFile<Data>(dbPath)

export const db = new LowWithLodash(adapter, defaultData)
db.read()
  .then((res) => {
    console.log(res)
  })
  .catch(console.error)

// Instead of db.data use db.chain to access lodash API
// const post = db.chain.get('posts').find({ id: 1 }).value() // Important: value() must be called to execute chain
