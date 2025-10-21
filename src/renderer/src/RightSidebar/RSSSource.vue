<script setup lang="ts">
import { AiOutlineImport, AiOutlineCheckCircle } from 'vue-icons-plus/ai'
import { useStore } from '../store'
import { ref } from 'vue'
import dayjs from 'dayjs'

// <AiOutlineCheckCircle />
const store = useStore()
const rss = ref<string>('')

const appendRSS = (): void => {
  if (rss.value?.trim()) {
    store.appendFeed(rss.value)
  }
}

function transformLastBuildDate(time: string): string {
  const date = dayjs(time)
  return date.format('YYYY年 MMM D日 ddd h:mm A')
}

const setFeed = (feedId: string): void => {
  store.setFeedId(feedId)
}
</script>

<template>
  <div class="setting-page">
    <h4>订阅 RSS 源</h4>
    <div class="setting-row">
      <div class="import-ipt"><input v-model="rss" type="text" placeholder="RSS 源地址..." /></div>
      <div class="import-btn" @click="appendRSS">
        <span>导入</span> <AiOutlineImport :size="15" />
      </div>
    </div>
    <ul>
      <li v-for="[key, value] in store.feedMap" :key="key" @click="setFeed(value.uid)">
        <span class="right">
          <AiOutlineCheckCircle v-if="store.feedId === value.uid" :size="18" />
        </span>
        <div class="left">
          <div>{{ value.title }}</div>
          <span>最新更新：{{ transformLastBuildDate(value.lastBuildDate) }}</span>
          <div>{{ value.link }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.setting-page {
  // background-color: orange;
  max-height: 100%;
  h4 {
    padding: 4px 24px 0 24px;
  }
  .setting-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 24px 14px 24px;
    .import-ipt {
      margin-right: 8px;
      display: flex;
      align-items: center;
      margin-top: 1px;
      input {
        width: 280px;
        margin: 0;
        height: 24px;
        border: 1px solid #e7e7e7;
        outline: none;
        border-radius: 4px;
        padding: 0 8px;
      }
    }
    .import-btn {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      background-color: #e7e7e7;
      span {
        margin-right: 6px;
      }
      &:hover {
        background-color: var(--color-primary);
        color: white;
      }
    }
  }
  ul {
    list-style: none;
    padding: 8px 15px;
    li {
      padding: 10px 25px;
      cursor: pointer;
      border-radius: 0;
      display: flex;
      border-radius: 8px;
      margin-bottom: 4px;
      &:nth-child(odd) {
        background-color: rgb(240, 240, 240);
      }
      &.active {
        background-color: var(--color-primary);
        color: white;
      }
      &:hover {
        background-color: var(--color-primary);
        color: white;
      }
      .left {
        flex: 1;
      }
      .right {
        width: 40px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
