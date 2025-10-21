<template>
  <article ref="articleRef" class="scroll-container">
    <h2>{{ store.blog?.title }}</h2>
    <a v-if="store.blog?.link" :href="store.blog?.link" target="_blank">{{ store.blog?.link }}</a>
    <div v-html="store.blog?.content"></div>
  </article>
</template>
<script setup lang="ts">
import { useStore } from '../store'
import { ref, watch } from 'vue'

const articleRef = ref<HTMLDivElement>()
const store = useStore()

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
