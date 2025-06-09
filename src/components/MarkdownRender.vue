<script setup lang="ts">
import { computed, watch, onMounted } from "vue";
import MarkdownIt from 'markdown-it';

// 定义 props 并指定类型
const props = defineProps<{
  postContent: string
}>();

// 初始化 MarkdownIt 实例
const mdi = new MarkdownIt({
  html: false,  // 不解析 HTML 标签（安全考虑）
  linkify: true, // 自动识别链接
});

// 直接渲染 prop 传来的 postContent
const renderedMarkdown = computed(() => {
  return mdi.render(props.postContent);
});

// 监听 postContent 变化，重新渲染数学公式
watch(() => props.postContent, () => {
  renderMath();
});

// 首次加载时渲染数学公式
onMounted(() => {
  renderMath();
});

// 渲染数学公式的辅助函数
const renderMath = () => {
  if (window.MathJax) {
    window.MathJax.typeset();
  }
};
</script>

<template>
  <div>
    <!-- 只显示渲染后的内容 -->
    <div style="width: 500px; overflow: auto; margin-top: 20px;">
      <div v-html="renderedMarkdown"></div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  width: 500px;
  height: 200px;
}
</style>