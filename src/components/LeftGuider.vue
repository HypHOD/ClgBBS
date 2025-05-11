<script setup lang="ts">

</script>

<template>

  <v-card class="mx-auto bg-gray-100 rounded-lg h-auto mt-1">
    <v-layout>
      <v-navigation-drawer floating permanent>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-forum" title="最新" value="time"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="最热门" value="hot"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="最多点赞" value="like"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="最多收藏" value="favourite"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="最多评论" value="comment"></v-list-item>
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
        <v-btn color="primary" to="/upload-file">upload file</v-btn>

      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>

  </v-card>

</template>

<style scoped>

</style>