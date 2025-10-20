<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import Main from './components/Main.vue'
import { AiOutlineGlobal } from 'vue-icons-plus/ai'
import { useStore } from './store'
import { onMounted } from 'vue'

const store = useStore()

function appendRSSSource(): void {
  const feed = 'http://www.ruanyifeng.com/blog/atom.xml'
  store.appendFeed(feed)
}

onMounted(() => {
  store.initialStore()
})
</script>

<template>
  <div class="container">
    <div class="sidebar main-parent">
      <div class="drag"></div>
      <div class="menu main-body scroll-container"><Sidebar /></div>
    </div>
    <div class="contentbar main-parent">
      <div class="drag right-top-bar">
        <div class="icon-btn" @click="appendRSSSource">
          <AiOutlineGlobal :size="15" />
        </div>
      </div>
      <div class="blog main-body"><Main /></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100vh;
  background-color: rgb(241, 241, 241);
  .sidebar {
    width: var(--sidebar-width);
    flex-shrink: 0;
  }
  .contentbar {
    flex: 1;
    background-color: rgb(255, 255, 255);
    padding: 0;
  }
  .main-parent {
    display: flex;
    flex-direction: column;
    height: 100vh;
    box-sizing: border-box;
    .main-body {
      flex: 1;
      // overflow-y: auto;
    }
  }
}
</style>
