<script setup lang="ts">
import { ref } from 'vue';
import MarkdownRender from "@/components/MarkdownRender.vue";
const postContent = ref('default post content');
const displayText = ref('');

setTimeout(() => {
  postContent.value = '$y=x^2$';
  displayText.value = postContent.value.substring(0, 50) + (postContent.value.length > 50? '...' : '');
}, 1000);

defineProps(['where'])

const groupTag = ref(['群组1', '群组2', '群组3'])
</script>

<template>
  <v-container class="d-flex flex-col fill-width">
      <v-row>
          <v-col v-if = "where === 'post-list'" cols="2" class="hover-effect1">
            <img
                src="@/assets/cdm.jpg"
                alt="User Avatar"
                class="w-35 rounded mr-2 "
            />
          </v-col>
          <v-col >
            <v-row>
              <v-sheet
                  border="dashed md"
                  color="surface-light"
                  height="150"
                  rounded="lg"
                  width="100%"
                  class="opacity-100"
              >
                <MarkdownRender :postContent="postContent"></MarkdownRender>
              </v-sheet>
            </v-row>
            <v-row>
              <v-chip
                  label
                  v-for="tag in groupTag"
                  color="black"
                  class="height-40 ma-1"
                  :key="tag">{{tag}}
              </v-chip>
            </v-row>
          </v-col>
<!--        <v-col cols="1">-->
<!--          <v-sheet border="dashed md" color="surface-light" height="100%" rounded="lg" width="auto" class="mx-0 my-0">-->
<!--            <v-btn @click="sendTips(userId,postId)" target="_blank" class="mx-0 my-0" width="100%" height="100%">-->
<!--              <v-icon left>mdi-download</v-icon>-->
<!--            </v-btn>-->
<!--          </v-sheet>-->
<!--        </v-col>-->
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