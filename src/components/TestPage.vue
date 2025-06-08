<script setup>
import { ref, onMounted, watch } from 'vue';
import MarkdownIt from 'markdown-it';
import katex from 'markdown-it-katex';  // 引入 KaTeX 插件
import DOMPurify from 'dompurify';
import { debounce } from 'lodash-es';
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';  // 引入 KaTeX 样式
import hljs from "highlight.js";

const input = ref('');
const output = ref('');

// 配置 MarkdownIt 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, code).value;
      } catch (__) {}
    }
    return '';
  },
});

// 使用 KaTeX 插件解析数学公式
md.use(katex, {
  throwOnError: false,  // 错误时不抛出异常
  errorColor: '#cc0000' // 错误显示颜色
});

// 配置 DOMPurify 以允许 KaTeX 生成的特殊标签和属性
DOMPurify.addHook('beforeSanitizeElements', (node, data) => {
  // 允许 KaTeX 使用的所有标签
  const allowedTags = [
    'math', 'maction', 'maligngroup', 'malignmark', 'menclose',
    'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr',
    'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom',
    'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub',
    'msubsup', 'msup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder',
    'munderover', 'semantics', 'annotation', 'annotation-xml'
  ];

  if (allowedTags.includes(node.tagName?.toLowerCase())) {
    data.allowedTags.push(node.tagName.toLowerCase());
  }
});

// 扩展允许的属性
DOMPurify.addHook('uponSanitizeAttribute', (node, data) => {
  if (node.tagName?.toLowerCase().startsWith('m')) {
    // 允许所有以 m 开头的 MathML 标签的所有属性
    data.allow = true;
  }
});

const update = debounce(() => {
  // 解析 Markdown 并应用安全过滤
  output.value = DOMPurify.sanitize(md.render(input.value), {
    ADD_ATTR: ['class', 'href', 'name', 'src', 'type', 'for', 'property', 'typeof', 'xmlns'],
  });
}, 300);

onMounted(() => {
  update();
});

watch(input, update);
</script>

<template>
  <div class="bg-gray-100 p-4">
    <textarea v-model="input" @input="update" rows="10" class="w-full p-2 border border-gray-300 rounded"></textarea>
    <div v-html="output" class="mt-4 p-4 bg-white border border-gray-300 rounded"></div>
  </div>
</template>

<style scoped>
/* 添加基本样式 */
textarea {
  font-family: monospace;
}

/* 数学公式样式 */
.katex {
  font-size: 1em !important;
}

.mjx-chtml {
  outline: none;
}
</style>