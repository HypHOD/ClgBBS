<script setup lang="ts">
import { reactive, ref , onMounted } from 'vue'
import PostItem from "./PostItem.vue";
import axios from 'axios';
import { useRouter  } from 'vue-router';
import { useSignInStore } from '@/store/SignIn.ts';
import SearchPart from "@/components/SearchPart.vue";


const tips = ['问题求解', '资料分享', '水贴吃瓜', '闲聊']
const chips = ref(['Default'])

type Post = {
  id: number | null,
  section: string | null,
  userId: number | null,
  createTime: string,
  updateTime: string,
  title: string,
  like_num: number,
  isDelete: number,
  content: string,
}
const PostList = ref<Post[]>([]);

const ins = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});
const router = useRouter();
const signInStore = useSignInStore();
const newPost= reactive({
  uid: '',
  postTitle: '',
  postContent: '',
  isAnonymous: false
});

async function uploadPost() {
  // 发送请求

  const res = await ins.post('/post/create', {
    userId: signInStore.userInfo.userId,
    postTitle: newPost.postTitle,
    postContent: newPost.postContent,
    isAnonymous: newPost.isAnonymous,
    tags: chips.value
  });
  console.log(res.data);
  // 刷新页面
  await router.push('/app-layout');
}

// 接收帖子列表数据
async function GetPostList() {
  // 发送请求
  const res = await ins.get('/section/search',{
    params:{
      pageNum: 1,
      pageSize: 5,
      name: 'test'
    }
  }).then(
      (response) => {
        console.log(response.data);
        return response.data;
      },
      (error) => {
        console.log(error);
      }
  ).then((data) => {
    console.log(data)
    PostList.value = data.data.list
  });

}

const loadMoreWithHttp = () => {
  // 模拟异步加载数据
  setTimeout(() => {
    GetPostList();
  }, 1000);
};


// 模拟数据数组
const items = ref([
  { id: 1, content: 'Text', isBlurred: false , postClassify: '1' },
  { id: 2, content: 'Image', isBlurred: false , postClassify: '2' },
  { id: 3, content: 'Video', isBlurred: false , postClassify: '3' },
  { id: 4, content: 'https://testURL.com', isBlurred: true , postClassify: '4' },
]);
const itemsPerLoad = 3;
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



const GetSearchResponse = (response) => {
  console.log(response)
  items.value = response.data.data
}

onMounted(() => {
  GetPostList();
}, { wait: true });

</script>

<template>

  <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
    <v-container>
      <v-row>
        <v-container>
          <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 my-1">
            <v-input>
              <v-container class="h-auto">
                <v-row>
                  <v-text-field
                      v-model="newPost.postTitle"
                      label="输入标题"
                      outlined
                      dense
                      clearable
                      class="mx-1 mt-1 h-100"
                      variant="outlined"
                      bg-color="white"
                  ></v-text-field>

                </v-row>
                <v-row>
                  <v-textarea
                      v-model="newPost.postContent"
                      label="输入正文"
                      row-height="15"
                      rows="3"
                      variant="outlined"
                      auto-grow
                      clearable
                      bg-color="white"
                  ></v-textarea>
                </v-row>
                <v-row>
                  <v-combobox
                      v-model="chips"
                      :items="tips"
                      label="选择群组标签"
                      variant="solo"
                      chips
                      clearable
                      closable-chips
                      multiple
                  >
                    <template v-slot:chip="{ props, item }">
                      <v-chip v-bind="props">
                        <strong>{{ item.raw }}</strong>&nbsp;
                        <span>(默认时间倒叙)</span>
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-row>
                <v-row class="flex-column">
                  <v-btn color="primary" @click="uploadPost">发布</v-btn>
                </v-row>
              </v-container>
            </v-input>
          </v-sheet>
        </v-container>
      </v-row>
      <v-row justify="end">
        <v-col>
          <SearchPart :SendSerachResponse="GetSearchResponse"></SearchPart>
        </v-col>
      </v-row>
      <v-row>
        <v-container>
          <v-row justify="center">
            <v-infinite-scroll  @load="loadMore" :items="items">
              <v-container v-for="(item, index) in items" :key="index" :item="item">
                <v-sheet
                    border="dashed md"
                    color="surface-light"
                    height="200"
                    rounded="lg"
                    width="750"
                    class="hover-effect mx-0"
                    @click="handleClick(item)"
                ><PostItem :where="'post-list'"/></v-sheet>
              </v-container>
            </v-infinite-scroll>
          </v-row>
        </v-container>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<style scoped>
.hover-effect:hover {
  background-color: #e0f7fa; /* Light blue background on hover */
  cursor: pointer; /* Change cursor to pointer on hover */
  outline: dashed 5px #706ccb;
}

</style>