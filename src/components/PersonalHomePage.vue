<script setup lang="ts">

import PersonalPost from "@/components/PersonalPost.vue";
import TextTest from "@/components/TextTest.vue";

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
      <v-btn @click="$router.push('/')" variant="outlined" class="h-screen w-1" color="secondary">
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
        头像
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
          <v-icon>mdi-arrow-left-bottom</v-icon>
          <span class="ml-2"></span>
        </v-btn>

        <v-btn
            class="text-none mt-2"
            color="secondary"
            size="x-large"
            variant="outlined"
            block
        >
          <v-icon>mdi-arrow-left-bottom</v-icon>
          <span class="ml-2"></span>
        </v-btn>

        <v-btn
            class="text-none mt-2"
            color="secondary"
            size="x-large"
            variant="outlined"
            block
        >
          <v-icon>mdi-arrow-left-bottom</v-icon>
          <span class="ml-2"></span>
        </v-btn>

        <v-btn
            class="text-none mt-2"
            color="secondary"
            size="x-large"
            variant="outlined"
            block
        >
          <v-icon>mdi-arrow-left-bottom</v-icon>
          <span class="ml-2"></span>
        </v-btn>

        <v-btn
            class="text-none mt-2"
            color="secondary"
            size="x-large"
            variant="outlined"
            block
        >
          <v-icon>mdi-arrow-left-bottom</v-icon>
          <span class="ml-2"></span>
        </v-btn>


      </v-sheet>

    </v-container>
    <v-container class="bg-gray-100 rounded-lg ml-2 mt-2">
      展示区
      <router-view></router-view>
    </v-container>



  </div>









</template>

<style scoped>

</style>