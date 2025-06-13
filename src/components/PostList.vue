<script setup lang="ts">
import { reactive, ref , onMounted } from 'vue'
import PostItem from "./PostItem.vue";
import axios from 'axios';
import { useRouter  } from 'vue-router';
import { useSignInStore } from '@/store/SignIn.ts';
import SearchPart from "@/components/SearchPart.vue";

const groupSelect = ref(null)
const groupList = ['Default']
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

const router = useRouter();
const signInStore = useSignInStore();
const newPost= reactive({
  uid: '',
  postTitle: '',
  postContent: '',
  isAnonymous: false
});

// 上传帖子
async function uploadPost() {
  // 发送请求
  const res = await axios.post('/api/post/create', {
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
  try{
    const res = await axios.get('/api/post/search')
    console.log(res)
  }catch(err){
    console.log(err)
  }

}

const loadMoreFromHttp = () => {
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
]);
const itemsPerLoad = 3;
const loadMore = async () => {
  // 如果正在加载或没有更多数据，直接返回
  if (isLoading.value || !hasMore.value) return;
  try {
    isLoading.value = true;
    const params = {
      ...searchParams,
      pageNum: searchParams.pageNum + 1 // 请求下一页
    };
    const response = await ins.get('/post/search', { params });
    const { items, total } = response.data;
    items.value = [...items.value, ...items];
    searchParams.pageNum += 1;
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

// 搜索模块
const emit = defineEmits(['search-result'])
const loaded = ref(false)
const loading = ref(false)
const searchForm = ref('')
const selectGroup = ref('')

async function handleSearch() {
  if (!searchForm.value.trim()) return // 避免空搜索
  // alert('搜索中...')
  loading.value = true
  loaded.value = false

  try {
    const prefix = searchForm.value[0] || ''
    const searchText = searchForm.value.slice(1)
    console.log(prefix, searchText)
    let res

    if (prefix === '!') {
      try{
        console.log('查询分区=${searchText}')
        res = await axios.get('/api/post/search/${searchText}')
        console.log(res)
      }catch(error){
        console.log(error)
      }
    } else if (prefix === '@') {
      try{
        res = await axios.get('/api/user/search/${searchText}')
        console.log(`查询UID=${searchText}`)
        console.log(res)
      }catch(err){
        console.log(err)
      }

    } else {
      try{
        console.log('查询标题=${searchText}')
        const res = await axios.get('/api/user/search/search?keyword=${encodeURIComponent(searchForm.value)}')
        console.log(res)
      }catch(error){
        console.log(error)
      }
    }


    // emit('search-result', response)
    defineProps({ searchResult: res })
  } catch (error) {

    console.error('搜索出错:', error)
    // emit('search-result', { code: 500, message: '网络错误', data: null })
  } finally {
    loading.value = false
    loaded.value = true
  }
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
                  <v-col>
                    <v-select
                        v-model="groupSelect"
                        :items="groupList"
                        hint="选择要发送的群组"
                        label="Select"
                        multiple
                        persistent-hint
                    ></v-select>
                  </v-col>

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
          <v-card class="mx-auto" color="surface-light">
            <v-container>
              <v-row>
                <v-col>
                  <v-card-text>
                    <v-text-field
                        v-model="searchForm"
                        :loading="loading"
                        append-inner-icon="mdi-magnify"
                        density="compact"
                        label='<!>分区搜索 <@>uid搜索'
                        variant="solo"
                        hide-details
                        single-line
                        @click:append-inner="handleSearch"
                        @keyup.enter="handleSearch"
                    ></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-select
                      label="选择群组"
                      v-model="selectGroup"
                      :items="['Group1', 'Group2', 'Group3']"
                      @change=""
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-container>
          <v-row>
            <v-btn color="primary" @click="GetPostList">刷新帖子</v-btn>
          </v-row>
          <v-row justify="center">
            <v-infinite-scroll  @load="loadMoreFromHttp()" :items="items">
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