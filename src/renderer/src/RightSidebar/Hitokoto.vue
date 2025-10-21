<script setup lang="ts"></script>

<template>
  <div class="hitokoto-page">
    <div class="row">
      <div class="hitokoto">当人们做不到一些事情的时候，他们会对你说你也同样不能。</div>
      <div class="from_who">「 当幸福来敲门 」</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.hitokoto-page {
  height: calc(100vh - var(--drag-height));
  display: flex;
  align-items: center;
  justify-content: center;
  .row {
    margin-top: -180px;
    width: 380px;
    .hitokoto {
      text-indent: 2em;
    }
    .from_who {
      margin-top: 40px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
