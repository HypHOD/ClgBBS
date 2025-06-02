<script setup lang="ts">

</script>

<template>

  <v-card class="mx-auto bg-gray-100 rounded-lg h-auto mt-1 z-10">
    <v-layout>
      <v-navigation-drawer floating permanent>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-forum" title="帖子" value="time"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="文件" value="hot"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="群组" value="like"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>

  <v-card class="mx-auto bg-gray-100 rounded-lg h-auto mt-1">
    <v-card-title>
      <h2>File List</h2>
    </v-card-title>
    <v-layout>
      <v-navigation-drawer floating permanent>
        <v-list density="compact" nav>
<!--          根据用户文件相关内容渲染-->
          <v-list-item prepend-icon="mdi-view-dashboard" title="文件1" value="fileID:001"></v-list-item>
          <v-list-item prepend-icon="mdi-view-dashboard" title="文件2" value="fileID:002"></v-list-item>
          <v-list-item prepend-icon="mdi-view-dashboard" title="文件3" value="fileID:003"></v-list-item>
        </v-list>
        <v-card-title>
          <h2>File List</h2>
        </v-card-title>
        <v-file-input
            label="File input"
            multiple
        ></v-file-input>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>

</template>

<style scoped>

</style>