<script setup lang="ts">

import PersonalPost from "@/components/PersonalPost.vue";
import TextTest from "@/components/TextTest.vue";
import { ref } from 'vue'

const length = ref(3)
const onboarding = ref(0)
const ID = ref(123)
</script>

<template>
    <v-card class="mx-auto bg-blue rounded-lg">
      <v-card-title>
        <h2 class="text-xl font-bold text-gray-800">Welcome to your Personal Home Page</h2>
      </v-card-title>
      <v-card-text>
        <h2 class="text-xl font-bold text-gray-800">个人主页上边栏</h2>
      </v-card-text>
    </v-card>


  <div class="flex">
    <div>
      <v-btn @click="$router.push('/')" variant="outlined" class="h-screen" color="secondary">
        <v-icon>mdi-arrow-left-bottom</v-icon>
      </v-btn>
    </div>



    <v-container
        class="bg-blue-100 rounded-lg ml-2 mt-2"
        max-width="240">
      <v-sheet
          border="dashed md"
          color="surface-light"
          height="200"
          rounded="lg"
          width="200"
          class="mx-1"
      >
<!--        接收头像-->
<!--        <v-img-->
<!--            :aspect-ratio="1"-->
<!--            class="bg-white"-->
<!--            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"-->
<!--            width="300"-->
<!--            cover-->
<!--        >-->
<!--        </v-img>-->

<!--        测试图片-->
        <img src="../assets/cdm.jpg" alt="?" class="rounded-lg w-full h-full object-cover">

      </v-sheet>

      <v-sheet
          border="dashed md"
          color="surface-light"
          height="auto"
          rounded="lg"
          width="200"
          class="mx-1"

      >
        <v-card class="mt-2 bg-white rounded-lg w-full h-full">
          <v-card-title >ID:{{ID}}</v-card-title>
        </v-card>

      </v-sheet>

      <v-sheet
          border="dashed md"
          color="surface-light"
          rounded="lg"
          width="200"
          class="mx-1 h-screen mt-2"
          height="auto"
      >
        <v-btn
            class="text-none mt-2"
            color="secondary"
            size="x-large"
            variant="outlined"
            block
        >
          <v-icon>mdi mdi-card-bulleted</v-icon>
          <span class="ml-2">我的帖子</span>
        </v-btn>

        <v-btn
            class="text-none mt-2"
            color="secondary"
            size="x-large"
            variant="outlined"
            block
        >
          <v-icon>mdi mdi-cards-heart</v-icon>
          <span class="ml-2">我的收藏</span>

        </v-btn>

        <v-btn
            class="text-none mt-2"
            color="secondary"
            size="x-large"
            variant="outlined"
            block
        >
          <v-icon>mdi-arrow-left-bottom</v-icon>
          <span class="ml-2">文件管理</span>
        </v-btn>

        <v-btn
            class="text-none mt-2"
            color="secondary"
            size="x-large"
            variant="outlined"
            block
        >
          <v-icon>mdi-arrow-left-bottom</v-icon>
          <span class="ml-2">我的社群</span>
        </v-btn>

        <v-btn
            class="text-none mt-2"
            color="secondary"
            size="x-large"
            variant="outlined"
            block
        >
          <v-icon>mdi mdi-card-account-details-outline</v-icon>
          <span class="ml-2">个人信息</span>
        </v-btn>
      </v-sheet>
    </v-container>

    <div class="flex">
      <PersonalPost>123</PersonalPost>
    </div>
  </div>










</template>

<style scoped>

</style>