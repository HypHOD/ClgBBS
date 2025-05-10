<script setup lang="ts">

</script>

<template>
  <v-card class="mx-auto bg-gray-100 rounded-lg h-1/2 mt-1">
    <v-layout>
      <v-navigation-drawer
          floating
          permanent
      >
        <v-list
            density="compact"
            nav
        >
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>

</style>