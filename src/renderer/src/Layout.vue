<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStore } from './store'
import { onMounted } from 'vue'
// import { useRoute } from 'vue-router'
import SiderbarControl from './components/SiderbarControl.vue'

// const route = useRoute()
const store = useStore()

onMounted(() => {
  store.initialStore()
})
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <div class="drag"></div>
      <Transition name="fade-slide" appear mode="out-in">
        <RouterView class="view left-sidebar scroll-container" name="LeftSidebar" />
      </Transition>
      <SiderbarControl class="controls" />
    </div>
    <main>
      <div class="drag"></div>
      <Transition name="fade-slide" appear mode="out-in">
        <RouterView class="view right-sidebar" name="RightSidebar" />
      </Transition>
    </main>
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
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .left-sidebar {
      flex: 1;
      overflow: auto;
    }
    .controls {
      flex-shrink: 0;
    }
  }
  main {
    background-color: white;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}

.drag {
  flex-shrink: 0;
  display: inline-flex;
  align-items: flex-end;
  width: 100%;
  height: var(--drag-height);
  background-color: transparent;
  app-region: drag;
  padding: 0 24px;
  &.right-top-bar {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0 9px;
  }
}

.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translate(-100px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translate(100px);
}
</style>
