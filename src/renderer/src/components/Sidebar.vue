<script setup lang="ts">
import { useStore } from '../store'
import { Blog } from '../../../preload/types'

const store = useStore()

function readBlog(blog: Blog): void {
  store.setBlogId(blog.uid)
}
</script>

<template>
  <ul>
    <li
      v-for="blog in store.blogArray"
      :key="blog.uid"
      :class="store.blogId === blog.uid ? 'active' : ''"
      @click="readBlog(blog)"
    >
      <h4>{{ blog.title }}</h4>
      <span class="pub-date">{{ blog.pubDate }}</span>
      <br />
      <span>{{ blog.summary }}</span>
    </li>
  </ul>
</template>
<style lang="less" scoped>
ul {
  list-style: none;
  padding: 0 12px 18px 12px;
  li {
    transition: all 0.02s;
    border-radius: 7px;
    font-size: 12px;
    padding: 8px 12px;
    cursor: pointer;
    margin-bottom: 3px;
    .pub-date {
      font-size: 10px;
    }
    span {
      font-size: 10px;
    }
    h4 {
      margin-top: 0px;
      margin-bottom: 14px;
    }
    &:hover {
      background-color: var(--color-sub-primary);
    }
    &.active {
      background-color: var(--color-primary);
      color: white;
      .pub-date {
        color: white;
      }
    }
  }
}
</style>
