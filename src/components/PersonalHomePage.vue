<script setup lang="ts">
import PersonalPost from "@/components/PersonalPost.vue";
import {ref, onMounted, shallowRef} from 'vue'
import { useSignInStore } from '@/store/SignIn.ts';
import PostItem from "@/components/PostItem.vue";
import FileItem from "@/components/FileItem.vue";
import UserState from "@/components/UserState.vue";

const uid = useSignInStore().userInfo.uid;

const UserPosts = fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => data.slice(0, 10))
    .catch(error => console.error(error));

// 模拟分页
const page = ref(1)
const pages_number = ref(10)

// 模拟数据数组
const items = ref([
  { postId: 1, content: 'Text' },
  { postId: 2, content: 'Image' },
]);

const items_file = ref([
  { fileId: 1, content: 'Text' },
  { fileId: 2, content: 'Image' },
]);

// 模拟每次加载的数据数量
const itemsPerLoad = 2;

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

const tab = ref('option-3');
</script>

<template>

  <div class="flex">
    <!-- 侧边栏 -->
    <div>
      <v-btn @click="$router.push('/app-layout')" variant="outlined" class="h-screen hover:bg-violet-600 active:bg-violet-700 focus:outline-dash focus:ring focus:ring-violet-300">
        <v-icon>mdi-arrow-left-bottom</v-icon>
      </v-btn>
    </div>

    <v-container class="bg-blue-100 rounded-lg ml-2 mt-2" max-width="240">

      <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="200" class="mx-1">
<!--        点击修改个人信息-->
        <img src="@/assets/cdm.jpg" alt="个人头像" class="rounded-lg w-full h-full object-cover hover-effect" @click="$router.push('/profile')">
      </v-sheet>

      <v-sheet border="dashed md" color="surface-light" rounded="lg" width="200" class="mx-1 h-screen mt-2" height="auto">
        <v-tabs
            v-model="tab"
            color="primary"
            direction="vertical"
        >
          <v-tab prepend-icon="mdi-account" text="Post" value="option-1"></v-tab>
          <v-tab prepend-icon="mdi-lock" text="File" value="option-2"></v-tab>
          <v-tab prepend-icon="mdi-access-point" text="State" value="option-3"></v-tab>
        </v-tabs>
      </v-sheet>
    </v-container>

    <!-- 主内容区 -->
    <v-container class="mt-2 ml-2 flex-grow-1 bg-blue-100 rounded-lg">
      <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 mt-2 ">
        <v-tabs-window v-model="tab" >
          <v-tabs-window-item value="option-1" >
            <v-card flat>
              <v-card-text>
                // TODO: 个人动态
              </v-card-text>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="option-2">
            <v-card flat>
              <v-card-text>
                // TODO: 文件管理
              </v-card-text>
            </v-card>
          </v-tabs-window-item >
          <v-tabs-window-item value="option-3" >
            <v-card flat>
              <v-card-text>
                <UserState></UserState>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>

      </v-sheet>

<!--      <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 mt-2">-->
<!--        <v-container v-for="(item_file, index) in items_file" :key="index" :item="item_file">-->
<!--          <v-row>-->
<!--            <v-col >-->
<!--              <v-sheet-->
<!--                  border="dashed md"-->
<!--                  color="surface-light"-->
<!--                  height="auto"-->
<!--                  rounded="lg"-->
<!--                  width="auto"-->
<!--                  class="hover-effect"-->
<!--                  @click="$router.push('/file-manager/{{item_file.id}}')"-->
<!--              >-->
<!--                <FileItem></FileItem>-->
<!--              </v-sheet>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </v-container>-->
<!--      </v-sheet>-->
    </v-container>
  </div>
</template>

<style scoped>
.hover-effect:hover {
  background-color: #e0f7fa;
  cursor: pointer;
  outline: dashed 5px #706ccb;
}


</style>