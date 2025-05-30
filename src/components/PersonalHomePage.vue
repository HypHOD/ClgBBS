<script setup lang="ts">

import PersonalPost from "@/components/PersonalPost.vue";

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
<div>
  <v-btn variant="outlined" class="h-screen w-2">
    <v-icon>mdi-arrow-left-bottom</v-icon>
  </v-btn>
</div>


  <v-row>

    <v-col cols="12" md="6">
      <v-card class="mt-5 mx-auto bg-blue rounded-lg">
        <v-card-title>
          <h2 class="text-xl font-bold text-gray-800">个人动态</h2>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <PersonalPost :post="post1"></PersonalPost>
            </v-col>
            <v-col cols="12" md="6">
              <PersonalPost :post="post2"></PersonalPost>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card class="mt-5 mx-auto bg-blue rounded-lg">
        <v-card-title>
          <h2 class="text-xl font-bold text-gray-800">路由展示</h2>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <PersonalPost :post="post1"></PersonalPost>
            </v-col>
            <v-col cols="12" md="6">
              <PersonalPost :post="post2"></PersonalPost>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>


  </v-row>





</template>

<style scoped>

</style>