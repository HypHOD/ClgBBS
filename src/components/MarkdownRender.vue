<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import MarkdownIt from 'markdown-it';

// 定义 props 并指定类型
const props = defineProps<{
  postContent: string
}>();

// 使用 ref 存储处理后的 Markdown 内容
const processedContent = ref('');

// 初始化 MarkdownIt 实例
const mdi = new MarkdownIt({
  html: false,  // 不解析 HTML 标签（安全考虑）
  linkify: true, // 自动识别链接
});

// 处理并渲染 Markdown 内容
const renderedMarkdown = computed(() => {
  return mdi.render(processedContent.value);
});

// 监听 postContent 变化，更新处理后的内容
watch(() => props.postContent, (newContent) => {
  processedContent.value = newContent;
  renderMath(); // 内容更新时重新渲染数学公式
});

// 初始渲染
onMounted(() => {
  processedContent.value = props.postContent;
  renderMath(); // 首次加载时渲染数学公式
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