<script setup lang="ts">
import {reactive, ref, shallowRef} from 'vue'
import TextTest from "./TextTest.vue";
import UserInfo from "./UserInfo.vue";
import PostList from "./PostList.vue";
import PostDetail from "./PostDetail.vue";
import SignIn from "./SignIn.vue";
import OperationBar from "./OperationBar.vue";
import axios from 'axios';
import { useRouter , RouterView , RouterLink } from 'vue-router';

const router = useRouter();


// 模拟群组数据
const groups = ref([
  { name: '群组 1' },
  { name: '群组 2' },
  { name: '群组 3' },
]);
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

const tab = ref('Post')
</script>

<template>
  <v-layout class="rounded rounded-md border">
    <v-navigation-drawer color="grey-lighten-1" permanent class="z-10 rounded rounded-md relative">
      <v-container>
        <v-row>
          <UserInfo />
        </v-row>
        <v-row>
          <v-card class="mx-auto bg-gray-100 rounded-lg h-auto mt-1 w-full">
            <v-chip>
              UID:1234567890
            </v-chip>
          </v-card>
        </v-row>
        <v-row>
          <v-card class="mx-auto bg-gray-100 rounded-lg h-auto mt-1 w-full">
            <v-btn color="primary" block class="w-full rounded-lg my-1" @click="">发帖</v-btn>
            <v-btn color="primary" to="/create-group" block class="w-full rounded-lg my-1">加入群组</v-btn>
          </v-card>
        </v-row>
        <v-row>
          <v-card class="mt-1">
            <v-card-title>
              <h2>Group List</h2>
            </v-card-title>
            <v-card-text>
              <v-layout>
                <v-container class="">
                  <v-row>
                    <v-col v-for="(group, index) in groups" :key="index" cols="12" xs="12">
                      <v-card class="elevation-2">
                        <v-card-title>{{ group.name }}</v-card-title>
                        <v-card-actions justify="end">
                          <v-btn icon color="primary">
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
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
      </template>
    </v-app-bar>

    <!--    主界面-->
    <v-main height="auto">
      <v-container>
        <v-tabs
            bg-color="indigo-darken-2"
            fixed-tabs
            v-model="tab"
        >
          <v-tab text="Post" value="Post"></v-tab>
          <v-tab text="File" value="File"></v-tab>
          <v-tab text="Group" value="Group"></v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="Post">
            <PostList></PostList>
          </v-tabs-window-item>
          <v-tabs-window-item value="File">
            NULL
          </v-tabs-window-item>
          <v-tabs-window-item value="Group">
            NULL
          </v-tabs-window-item>
        </v-tabs-window>
      </v-container>
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