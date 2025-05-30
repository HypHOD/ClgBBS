<script setup lang="ts">
import {ref, onMounted, shallowRef} from 'vue'

// 模拟数据数组
// 楼主
// const {head, comments}= fetch('')

const head = ref([
  { id: 1, content: 'Text' },
  { id: 2, content: 'Image' },
]);

// 评论
const comments = ref([
  { id: 1, content: 'Text' },
  { id: 2, content: 'Image' },
]);

// 模拟每次加载的数据数量
const itemsPerLoad = 2;

// 加载更多数据的方法
const loadMore = () => {
  // 模拟异步加载数据
  setTimeout(() => {
    const newItems = Array.from({ length: itemsPerLoad }, (_, i) => ({
      id: head.value.length + i + 1,
      content: `Item ${head.value.length + i + 1}`,
    }));
    head.value = [...head.value, ...newItems];
  }, 1000);
};

</script>

<template>
  <!-- 顶部导航栏-->
  <div>
    <v-btn @click="$router.push('/')" variant="outlined" block class="bg-white text-black hover:bg-violet-600 active:bg-violet-700 focus:outline-dash focus:ring focus:ring-violet-300">
      <v-icon>mdi-arrow-left-bottom</v-icon>
    </v-btn>
  </div>
  <v-infinite-scroll  @load="loadMore" :items="head" class="mt-4" >
    <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 mt-0">
      <!--      Head-->
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet border="dashed md" color="surface-light" height="200" rounded="lg" width="200" class="mx-1">
              <img src="@/assets/cdm.jpg" alt="个人头像" class="rounded-lg w-full h-full object-cover hover-effect" @click="$router.push('/profile')">
          </v-sheet>

            </v-col>
          <v-col cols="10">
            <v-sheet border="dashed md" color="surface-light" height="200" rounded="lg" width="auto" class="mx-1 right-0">
              <v-card :height="'100%'">
                <v-card-title>我是标题</v-card-title>
                <v-card-text>我是内容</v-card-text>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <!--      Comments-->
      <v-container v-for="(item_file, index) in comments" :key="index" :item="item_file">
        <v-row>
          <v-col cols="2">
            <v-sheet
                border="dashed md"
                color="surface-light"
                height="150"
                rounded="lg"
                width="100%"
            >
              <img src="@/assets/comment1.png" alt="个人头像" class="rounded-lg w-full h-full object-cover " @click="$router.push('/profile')">
              <v-chip
                  color="primary"
                  label
              >ID:12312312312312</v-chip>
            </v-sheet>
          </v-col>
          <v-col cols="10">
            <v-sheet
                border="dashed md"
                color="surface-light"
                height="150"
                rounded="lg"
                width="100%"
                class="hover-effect"
                @click="$router.push('/file-manager/{{item_file.id}}')"
            >
              // 评论内容
              <div class="d-flex justify-content-between align-items-center ">
                <v-row>
                  <v-col cols="10">
                    <v-card-title>评论内容</v-card-title>
                    <v-card-text>评论内容</v-card-text>
                    </v-col>
                  <v-col cols="2">
                    <v-btn
                        color="primary"
                        icon
                        @click="$router.push('/profile')"
                    >
                      <v-icon>mdi-account</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

              </div>


            </v-sheet>
          </v-col>
        </v-row>

      </v-container>
    </v-sheet>
  </v-infinite-scroll>
</template>

<style scoped>
.hover-effect:hover {
  background-color: #e0f7fa;
  cursor: pointer;
  outline: dashed 5px #706ccb;
}

</style>