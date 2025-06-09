<script setup lang="ts">
import { defineProps, toRefs, computed } from 'vue';
import  axios from 'axios';
import {useSignInStore} from "@/store/SignIn.ts";

const signInStore = useSignInStore();
const userId = signInStore.userInfo.userId;

defineProps(['fileId', 'fileClass', 'downloadCount']);
const ins = axios.create({
  baseURL: 'API_URL',
  timeout: 1000,
});

async function downloadFile(userId, fileId) {
  try {
    const res = await ins.get(`/file/download?userId=${userId}&postId=${fileId}`);
    // 检查响应中是否包含有效的下载链接
    if (res.data && res.data.downloadUrl) {
      const downloadUrl = res.data.downloadUrl;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'download.txt';
      a.click();
      return { code: 0, msg: '下载成功', data: null };
    } else {
      throw new Error('返回数据中缺少下载链接');
    }
  } catch (error) {
    console.error('下载出错:', error);
    alert('下载失败: ' + (error.message || '未知错误'));
    return { code: -3, msg: '下载失败', data: null };
  }
}

</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card outlined class="mx-1 my-1">
          <v-card-title>
            <h3 class="headline mb-0">文件名称: {{ fileId }} </h3>
          </v-card-title>
          <v-card-text> 文件类型: {{ fileClass }}  </v-card-text>
          <v-card-text> 文件下载次数: {{ downloadCount }}  </v-card-text>
          <v-chip small>
            <v-icon left>mdi-clock</v-icon>
            // 上传时间
          </v-chip>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-sheet border="dashed md" color="surface-light" height="100%" rounded="lg" width="auto" class="mx-0 my-0">
          <v-btn @click="downloadFile(fileId)" target="_blank" class="mx-0 my-0" width="100%" height="100%">
              <v-icon left>mdi-download</v-icon>
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>