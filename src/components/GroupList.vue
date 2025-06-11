<script setup lang="ts">
import { reactive, ref } from 'vue'
import GroupItem from './GroupItem.vue'
import axios from 'axios';
import { useRouter  } from 'vue-router';
import { useSignInStore } from '@/store/SignIn.ts';
import JoinGroup from "@/components/JoinGroup.vue";

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
const groupList = ref([
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
      id: groupList.value.length + i + 1,
      content: `Item ${groupList.value.length + i + 1}`,
    }));
    groupList.value = [...groupList.value, ...newItems];
  }, 1000);
};


const handleClick = (item) => {
  console.log(item)
  // 跳转到详情页
  router.push('/post-detail/' + item.id);
}

</script>

<template>
  <v-container>
        <v-row>
          <JoinGroup></JoinGroup>
        </v-row>
        <hr>
          <v-infinite-scroll  @load="loadMore" :items="groupList" >
            <v-container v-for="(item, index) in groupList" :key="index" :item="item">
              <v-sheet
                  border="dashed md"
                  color="surface-light"
                  height="200"
                  rounded="lg"
                  width="100%"
                  class="hover-effect"
                  @click="handleClick(item)"
              ><GroupItem></GroupItem></v-sheet>
            </v-container>
          </v-infinite-scroll>

  </v-container>

</template>

<style scoped>

</style>