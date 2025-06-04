<script setup lang="ts">
import { reactive, ref } from 'vue'
import PostItem from "./PostItem.vue";
import axios from 'axios';
import { useRouter  } from 'vue-router';
import { useSignInStore } from '@/store/SignIn.ts';

const router = useRouter();
const signInStore = useSignInStore();
const newPost= reactive({
  postTitle: '',
  postContent: '',
  uid: '',
  isAnonymous: false
});

const handleSubmit = () => {
  // 发送请求
  if (!newPost.isAnonymous){
    newPost.uid = signInStore.userInfo.uid;
  }
  axios.post('/api/post', newPost).then(res => {
    console.log(res.data);
    // 刷新页面
    router.push('/post-list');
  }).catch(err => {
    console.log(err);
  });
}

// 模拟数据数组
const items = ref([
  { id: 1, content: 'Text', isBlurred: false , postClassify: '1' },
  { id: 2, content: 'Image', isBlurred: false , postClassify: '2' },
  { id: 3, content: 'Video', isBlurred: false , postClassify: '3' },
  { id: 4, content: 'https://testURL.com', isBlurred: true , postClassify: '4' },
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

const tips = ['问题求解', '资料分享', '水贴吃瓜', '闲聊']
const breadcrumbs = [
  {
    title: 'Dashboard',
    href: 'breadcrumbs_dashboard'
  },
  {
    title: 'Link 1',
    href: 'breadcrumbs_link_1'
  },
  {
    title: 'Link 2',
    href: 'breadcrumbs_link_2',
    disabled: false
  }
]
const chips = ref(['Default'])

</script>

<template>
  <v-container>
    <v-row>
      <v-container>
        <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 my-1">
          <v-input>
            <v-container class="h-auto">
              <v-row>
                <v-text-field
                    v-model="newPost.postTitle"
                    label="请输入标题"
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
              <v-row class="flex-column">
                <v-checkbox label="匿名" class="my-1 h-100" v-model="newPost.isAnonymous"></v-checkbox>
                <v-btn color="primary" @click="handleSubmit" class="left-0">发布</v-btn>
              </v-row>
            </v-container>
          </v-input>
        </v-sheet>
      </v-container>
    </v-row>
    <v-row>
      <v-container class="bg-gray-100">
        <v-combobox
            v-model="chips"
            :items="tips"
            label="条件筛选"
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
        <hr>
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
            ><PostItem :where="'post-list'"/></v-sheet>
          </v-container>
        </v-infinite-scroll>
      </v-container>
    </v-row>
  </v-container>

</template>

<style scoped>
.hover-effect:hover {
  background-color: #e0f7fa; /* Light blue background on hover */
  cursor: pointer; /* Change cursor to pointer on hover */
  outline: dashed 5px #706ccb;
}
</style>