<template>
  <article ref="articleRef" class="scroll-container">
    <h1 @click="jumpToGuide">{{ store.blogId }}</h1>
    <h2>{{ store.blog?.title }}</h2>
    <div v-html="store.blog?.content"></div>
  </article>
</template>
<script setup lang="ts">
import { useStore } from '../store'
import { ref, watch } from 'vue'

const articleRef = ref<HTMLDivElement>()
const store = useStore()
const jumpToGuide = (): void => {
  const url = store.blog?.link
  url && window.open(url)
}

watch(
  () => store.blogId,
  () => {
    articleRef.value?.scrollTo(0, 0)
  }
)
</script>
<style lang="less" scoped>
article {
  flex: 1;
  overflow: auto;
  padding: 0 24px 0 24px;
  height: calc(100vh - var(--drag-height));
  h1 {
    cursor: pointer;
    &:hover {
      color: var(--color-primary);
    }
  }
  h2 {
    font-size: 16px;
  }
}
</style>
