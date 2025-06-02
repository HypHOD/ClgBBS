<script setup lang="ts">
import {reactive, ref, shallowRef} from 'vue'
import TextTest from "./TextTest.vue";
import UserInfo from "./UserInfo.vue";
import LeftGuider from "./LeftGuider.vue";
import GroupList from "./GroupList.vue";
import OperationBar from "./OperationBar.vue";
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();



//   const fetchPosts = async () => {
//   try {
//     const response = await axios.get('API_URL');
//     const data = response.data;
//
//     // 使用 reactive 来管理帖子数据
//     return reactive(data);
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     return [];
//   }
// };
//
// // 调用函数获取帖子数据
// const posts = await fetchPosts();

const order = shallowRef(0)

  // 模拟数据数组
  const items = ref([
    { id: 1, content: 'Text', isBlurred: false },
    { id: 2, content: 'Image', isBlurred: false},
    { id: 3, content: 'Video', isBlurred: false },
    { id: 4, content: 'https://testURL.com', isBlurred: true },
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


  const handleClick = (item) => {
    console.log(item)
    // 跳转到详情页
    router.push('/post-detail/' + item.id);
  }
</script>

<template>
  <v-layout class="rounded rounded-md border">
    <v-navigation-drawer color="grey-lighten-1" permanent class="z-10 rounded rounded-md relative">
      <UserInfo />
      <LeftGuider />
      <GroupList />
    </v-navigation-drawer>

<!--    上侧导航-->
    <v-app-bar :order="order" color="grey-lighten-2" title="BBSTest" flat class="flex position-fixed top-0 right-0 z-20">
      <template v-slot:append>
        <v-btn value="recent">
            <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn value="favorites">
            <v-icon class="">mdi-heart</v-icon>
        </v-btn>

        <v-btn value="nearby">
          <v-badge
              :content="1"
              :absolute="true"
              :right="0"
              :top="0"
              color="red"
              rounded
          >
            <v-icon class="h-6 w-6 text-gray-600">mdi-bell-outline</v-icon>
          </v-badge>
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

<!--    主界面-->
    <v-main class="flex-column align-center justify-center" height="300">
      <OperationBar />

      <v-infinite-scroll  @load="loadMore" :items="items" >
        <v-container v-for="(item, index) in items" :key="index" :item="item">
          <v-sheet
              border="dashed md"
              color="surface-light"
              height="200"
              rounded="lg"
              width="100%"
              class="hover-effect"
              @click="handleClick(item)"
          ><TextTest :id="item.id" :content="item.content" :index="index" :item="item" :isBlurred="item.isBlurred"/></v-sheet>
        </v-container>
      </v-infinite-scroll>

    </v-main>
  </v-layout>

</template>

<style scoped>
.hover-effect:hover {
  background-color: #e0f7fa; /* Light blue background on hover */
  cursor: pointer; /* Change cursor to pointer on hover */
  outline: dashed 5px #706ccb;

}
</style>