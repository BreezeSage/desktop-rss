<template>
  <div class="control-button-group">
    <RouterLink to="/rss-source">
      <div :class="['setting-or-list', route.path !== '/article' ? 'active' : '']">
        <AiOutlineWindows :size="15" />
      </div>
    </RouterLink>
    <RouterLink to="/article">
      <div :class="['setting-or-list', route.path === '/article' ? 'active' : '']">
        <AiOutlineAlignLeft :size="15" />
      </div>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { AiOutlineAlignLeft, AiOutlineWindows } from 'vue-icons-plus/ai'
import { useRoute } from 'vue-router'
// <AiOutlineUser /> <AiOutlineWindows />
const route = useRoute()
</script>
<style lang="less" scoped>
.control-button-group {
  display: flex;
  justify-content: flex-start;
  padding: 4px 18px;
  gap: 4px;
  height: 50px;
  .setting-or-list {
    width: 26px;
    height: 26px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    transition: all 0.1s;
    cursor: pointer;
    app-region: no-drag;
    color: black;
    background-color: rgb(224, 224, 224);

    &.active {
      background-color: var(--color-primary);
      color: white;
    }
  }
}
</style>
