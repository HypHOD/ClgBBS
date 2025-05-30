<script setup lang="ts">

import PersonalPost from "@/components/PersonalPost.vue";
import TextTest from "./TextTest.vue";
import {ref, shallowRef} from "vue";

const order = shallowRef(0)

// 模拟数据数组
const items = ref([
  { id: 1, content: 'Text' },
  { id: 2, content: 'Image' },
  { id: 3, content: 'Video' },
  { id: 4, content: 'https://testURL.com' },
]);

// 模拟每次加载的数据数量
const itemsPerLoad = 3;

// 加载更多数据的方法
const loadMore = () => {
  // 模拟异步加载数据
  setTimeout(() => {
    const newItems = Array.from({ length: itemsPerLoad }, (_, i) => ({
      id: items.value.length + i + 1,
      content: `Item ${items.value.length + i + 1}`,
    }));
    items.value = [...items.value, ...newItems];
  }, 1000);
};

</script>

<template>
  <v-infinite-scroll  @load="loadMore" :items="items" >
    <v-container v-for="(item, index) in items" :key="index" :item="item">
      <v-sheet
          border="dashed md"
          color="surface-light"
          height="200"
          rounded="lg"
          width="100%"
      ><PersonalPost :index="index" :item="item"/></v-sheet>
    </v-container>
  </v-infinite-scroll>
</template>

<style scoped>

</style>