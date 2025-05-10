<script setup lang="ts">
import { ref } from 'vue';

// 模拟群组数据
const groups = ref([
  { name: '群组 1' },
  { name: '群组 2' },
  { name: '群组 3' },
]);
</script>

<template>
  <v-card>
    <v-card-title>
      <h2>Group List</h2>
    </v-card-title>
    <v-card-text>
      <v-layout>
        <v-container class="">
          <v-row>
            <v-col
                v-for="(group, index) in groups"
                :key="index"
                cols="12"
                xs="12"


            >
              <v-card class="elevation-2">
                <v-card-title>{{ group.name }}</v-card-title>
                <v-card-actions justify="end">
                  <v-btn icon color="primary">
                    <v-icon>mdi-more-vert</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

      </v-layout>
<!--      群组管理-->
      <v-btn color="primary" to="/create-group">Create Group</v-btn>

    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>