<script setup lang="ts">
import { ref } from 'vue';
const postContent = ref('');
const isBlurred = ref(false);
const displayText = ref('');

setTimeout(() => {
  postContent.value = '这是一个很长的服务器帖子内容示例，包含很多信息...';
  displayText.value = postContent.value.substring(0, 50) + (postContent.value.length > 50? '...' : '');
}, 1000);

defineProps(['index','item'])

</script>

<template>
  <v-container class="d-flex flex-col fill-width">
    <v-chip
        :class="{ 'text-field-blur': isBlurred }"
        class="height-50"
    >{{item.content}}</v-chip>
  </v-container>
</template>

<style scoped>
.text-field-blur {
  filter: blur(10px);
}
</style>