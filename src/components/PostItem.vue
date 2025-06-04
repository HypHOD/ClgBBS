<script setup lang="ts">
import { ref } from 'vue';
const postContent = ref('');
const displayText = ref('');

setTimeout(() => {
  postContent.value = '服务器帖子内容示例，';
  displayText.value = postContent.value.substring(0, 50) + (postContent.value.length > 50? '...' : '');
}, 1000);


defineProps(['index','item','isBlurred','postClassify'])

</script>

<template>
  <v-container class="d-flex flex-col fill-width">
      <v-row>
        <v-col cols="2">
          <v-row>
            <img
                src="@/assets/cdm.jpg"
                alt="User Avatar"
                class="w-35  rounded mr-2"
            />
          </v-row>
<!--          <v-row>-->
<!--            <span class="text-lg font-bold">用户{{index}}</span>-->
<!--          </v-row>-->
          <v-row>
            <v-chip
                class="height-40"
            >UID:{{item.id}}</v-chip>
          </v-row>
        </v-col>
        <v-col cols="9"
               :class="{ 'text-field-blur': isBlurred }"
        >
              <v-sheet
                  border="dashed md"
                  color="surface-light"
                  height="150"
                  rounded="lg"
                  width="100%"
                  class="hover-effect"
              >
                {{displayText}}
              </v-sheet>
        </v-col>
        <v-col cols="1" class="bg-gray-200 text-center">
          <v-chip
              class="height-40"
          >PID:{{item.id}}</v-chip>
          <v-chip
              class="height-40"
          >分类:{{postClassify}}</v-chip>
        </v-col>
      </v-row>
<!--      <v-switch label="Toggle Blur" class = "right-0-0 ml-auto mt-0"/>-->
  </v-container>
</template>

<style scoped>
  .text-field-blur {
    filter: blur(10px);
  }

</style>