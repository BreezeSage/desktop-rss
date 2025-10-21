<template>
  <div class="setting">
    <ul>
      <li>
        <RouterLink to="/hitokoto">一言</RouterLink>
      </li>
      <li><RouterLink to="/rss-source">订阅切换 RSS 源</RouterLink></li>
      <li><RouterLink to="/mail">163 邮箱📮</RouterLink></li>
    </ul>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
.setting {
  ul {
    list-style: none;
    padding: 8px 12px 18px 12px;
    li {
      cursor: pointer;
      margin-bottom: 3px;
      &.active {
        a {
          background-color: var(--color-primary);
          color: white;
          .pub-date {
            color: white;
          }
        }
      }
      a {
        display: flex;
        width: 100%;
        height: 100%;
        transition: all 0.02s;
        border-radius: 7px;
        font-size: 12px;
        padding: 8px 12px;
        text-decoration: none;
        color: black;
        &:hover {
          background-color: var(--color-sub-primary);
        }
      }
    }
  }
}
</style>
