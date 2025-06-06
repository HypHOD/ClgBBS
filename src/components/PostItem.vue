<script setup lang="ts">
import { ref } from 'vue';
const postContent = ref('');
const displayText = ref('');

setTimeout(() => {
  postContent.value = '服务器帖子内容示例，';
  displayText.value = postContent.value.substring(0, 50) + (postContent.value.length > 50? '...' : '');
}, 1000);

defineProps(['where'])

</script>

<template>
  <v-container class="d-flex flex-col fill-width bg-blue hover-effect1">
      <v-row>
        <v-col cols="2" v-if = "where === 'post-list'" >
          <v-row >
            <img
                src="@/assets/cdm.jpg"
                alt="User Avatar"
                class="w-35 rounded mr-2 "
            />
          </v-row>
          <v-row>
            <v-chip
                class="height-40"
            >UID:{{}}</v-chip>
          </v-row>
        </v-col>
        <v-col cols="6"
        >
              <v-sheet
                  border="dashed md"
                  color="surface-light"
                  height="150"
                  rounded="lg"
                  width="100%"

              >
                {{displayText}}
              </v-sheet>
        </v-col>
        <v-col cols="3" class="bg-gray-200 text-center text-black">
          <v-chip class="height-40">发帖时间:</v-chip>
          <v-chip class="height-40">回复数:</v-chip>
          <v-chip class="height-40">PID:</v-chip>
          <v-chip class="height-40">所属群组:</v-chip>
        </v-col>
      </v-row>
  </v-container>
</template>

<style scoped>
  .text-field-blur {
    filter: blur(10px);
  }
  .hover-effect1:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .custom-bg{
    background-image: url('@/assets/bg.jpg');
  }
</style>