<script setup lang="ts">
  import { shallowRef, ref } from 'vue'
  import TextTest from "./TextTest.vue";
  import UserInfo from "./UserInfo.vue";
  import LeftGuider from "./LeftGuider.vue";
  import GroupList from "./GroupList.vue";

  const order = shallowRef(0)

  // 模拟数据数组
  const items = ref([
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3' },
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
  <v-layout class="rounded rounded-md border">
    <v-navigation-drawer color="grey-lighten-1" permanent class="z-10 rounded rounded-md relative">
      <UserInfo />
      <LeftGuider />
      <GroupList />
    </v-navigation-drawer>

    <v-app-bar
        :order="order"
        color="grey-lighten-2"
        title="BBSTest"
        flat
        class="position-fixed top-0 right-0 z-20"
    >
      <template v-slot:append>
        <v-btn value="recent">
          <v-icon>mdi-history</v-icon>

          <span>Recent</span>
        </v-btn>

        <v-btn value="favorites">
          <v-icon>mdi-heart</v-icon>

          <span>Favorites</span>
        </v-btn>

        <v-btn value="nearby">
          <v-icon>mdi-map-marker</v-icon>

          <span>Nearby</span>
        </v-btn>
<!--        <v-switch-->
<!--            v-model="order"-->
<!--            class="me-2"-->
<!--            false-value="0"-->
<!--            label="Toggle order"-->
<!--            true-value="-1"-->
<!--            hide-details-->
<!--            inset-->
<!--        ></v-switch>-->
      </template>
    </v-app-bar>

    <v-main class="flex-column align-center justify-center" height="300">
      <v-container>
<!--        <v-sheet-->
<!--            border="dashed md"-->
<!--            color="surface-light"-->
<!--            height="200"-->
<!--            rounded="lg"-->
<!--            width="100%"-->
<!--        ><TextTest /></v-sheet>-->
      </v-container>

      <v-infinite-scroll  @load="loadMore" :items="items" >
        <v-container v-for="(item, index) in items" :key="index" :item="item">
          <v-sheet
              border="dashed md"
              color="surface-light"
              height="200"
              rounded="lg"
              width="100%"
          ><TextTest /></v-sheet>
        </v-container>
      </v-infinite-scroll>

    </v-main>
  </v-layout>

</template>

<style scoped>

</style>