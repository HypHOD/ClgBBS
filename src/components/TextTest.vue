<script setup lang="ts">
import { ref } from 'vue';
const postContent = ref('');
const isBlurred = ref(false);
const displayText = ref('');

setTimeout(() => {
  postContent.value = '这是一个很长的服务器帖子内容示例，包含很多信息...';
  displayText.value = postContent.value.substring(0, 50) + (postContent.value.length > 50? '...' : '');
}, 1000);
</script>

<template>
  <v-container class="d-flex flex-col fill-width">
    <v-container class="d-flex items-center">
      <img
          src="https://picsum.photos/50"
          alt="User Avatar"
          class="w-10 h-10 rounded-full mr-2"
      />
      <span class="text-lg font-bold">用户名</span>
      <v-switch v-model="isBlurred" label="Toggle Blur" class = "right-0-0 ml-auto mt-0"/>

    </v-container>
    <v-chip
        :class="{ 'text-field-blur': isBlurred }"
        class="height-40"

    />
  </v-container>
</template>

<style scoped>
  .text-field-blur {
    filter: blur(2px);
  }
</style>