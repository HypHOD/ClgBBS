<template>
  <div>
    <!-- 输入框，用于实时更新Markdown文本 -->
    <textarea v-model="text" rows="10" cols="50" placeholder="输入Markdown内容"></textarea>

    <!-- 显示渲染的Markdown内容 -->
    <div style="width: 500px; overflow: auto; margin-top: 20px;">
      <div v-html="renderedMarkdown"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import MarkdownIt from 'markdown-it';

// Markdown 内容
const text = ref(``);

const mdi = new MarkdownIt({
  html: false,
  linkify: true,
});

// 处理并渲染Markdown内容
const renderedMarkdown = computed(() => {
  window.MathJax.startup.defaultReady();
  return mdi.render(text.value);

});
</script>

<style scoped>
textarea {
  width: 500px;
  height: 200px;
}
</style>