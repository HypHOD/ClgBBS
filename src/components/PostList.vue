<script setup lang="ts">
import { reactive, ref , onMounted } from 'vue'
import PostItem from "./PostItem.vue";
import axios from 'axios';
import { useRouter  } from 'vue-router';
import { useSignInStore } from '@/store/SignIn.ts';
import SearchPart from "@/components/SearchPart.vue";


const tips = ['分区1', '分区2', '分区3']
const chips = ref(['Default'])

type Post = {
  id: number | null,
  sectionId: number | null,
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

// 搜索参数
const searchParams = reactive({
  pageNum: 1,
  pageSize: 10,
  keyword: '',    // 搜索关键词
  sectionId: '',  // 版块ID
  startTime: '',  // 开始时间
  endTime: ''     // 结束时间
});

// 加载状态
const isLoading = ref(false);
const hasMore = ref(true);
const errorMessage = ref('');

// 模拟数据数组
const items = ref([
  { id: 1, content: '$y=x^2$', isBlurred: false , postClassify: '1' },
  { id: 2, content: 'Image', isBlurred: false , postClassify: '2' },
  { id: 3, content: 'Video', isBlurred: false , postClassify: '3' },
  { id: 4, content: '#123', isBlurred: true , postClassify: '4' },
]);
const itemsPerLoad = 3;
const loadMore = async () => {
  // 如果正在加载或没有更多数据，直接返回
  if (isLoading.value || !hasMore.value) return;

  try {
    isLoading.value = true;

    // 构建查询参数
    const params = {
      ...searchParams,
      pageNum: searchParams.pageNum + 1 // 请求下一页
    };

    // 发送请求
    const response = await ins.get('/post/search', { params });

    // 处理响应数据
    const { items, total } = response.data;

    // 更新数据列表
    items.value = [...items.value, ...items];

    // 更新分页信息
    searchParams.pageNum += 1;

    // 判断是否还有更多数据
    hasMore.value = items.length > 0 && items.value.length < total;

  } catch (error) {
    console.error('加载更多数据失败:', error);

    // 错误处理
    if (error.response) {
      // 服务器返回错误状态码
      errorMessage.value = `请求失败 (${error.response.status})`;
    } else if (error.request) {
      // 请求已发送但没有响应
      errorMessage.value = '服务器无响应';
    } else {
      // 请求设置时出错
      errorMessage.value = '请求配置错误';
    }

  } finally {
    isLoading.value = false;
  }
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

const postTypes = [
  '闲聊',
  '吐槽',
  '问答',
];

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
                ><PostItem :where="'post-list'" :postContent="item.content"/></v-sheet>
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