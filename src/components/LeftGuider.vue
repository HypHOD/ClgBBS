<script setup lang="ts">

</script>

<template>
  <v-card class="mx-auto bg-gray-100 rounded-lg h-1/2 mt-1">
    <v-layout>
      <v-navigation-drawer floating permanent>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="最新" value="time"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="最热门" value="hot"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="最多点赞" value="like"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="最多收藏" value="favourite"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="最多评论" value="comment"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>

</style>