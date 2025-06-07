<script setup lang="ts">
import { reactive, ref } from 'vue'
import TextTest from "./PostItem.vue";
import FileItem from "./FileItem.vue";
import axios from 'axios';
import { useRouter  } from 'vue-router';
import { useSignInStore } from '@/store/SignIn.ts';

const ins = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});
const router = useRouter();
const signInStore = useSignInStore();

const userId = signInStore.userInfo.userId;
const postId = ref(null);
const postPrice = 10;

const handleDownload(postId){
  if(signInStore.userInfo.coins < postPrice){
        alert('余额不足');
        return;
  } else {
    downloadFile(userId, postId);
    signInStore.userInfo.coins -= postPrice;
    // //向服务器请求扣除金币
    // const url = `http://localhost:8080/user/charge?userId=${userId}&coins=${postPrice}`;
    // ins.post(url, {})
  }
}

async function downloadFile(userId, postId) {
  const url = `http://localhost:8080/file/download?userId=${userId}&postId=${postId}`;
  try {
    await const res = await ins.post(url, {})
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([res.data]));
    a.download = 'download.txt';
    a.click();
  } catch (error) {
    console.error('请求出错:', error);
    return { code: -3, msg: '服务器内部错误', data: null };
  }
}

const uploadFile = async (fileBody, fileClass) =>{
  const formData = new FormData();
  formData.append('fileBody', fileBody);
  formData.append('fileClass', JSON.stringify(fileClass));

  try {
    await const res = await ins.post('/upload', formData, {
      headers: {
        'Content-Type':'multipart/form-data'
      }
    })
    console.log(res.data);
    return { code: 200, message: '上传成功', data: null };
  } catch (error) {
    console.error('请求出错:', error);
    return { code: 500, message: '服务器内部错误', data: null };
  }
}
// 模拟数据数组
const items = ref([
  { id: 1, content: 'Text', isBlurred: false , postClassify: '1' },
  { id: 2, content: 'Image', isBlurred: false , postClassify: '2' },
  { id: 3, content: 'Video', isBlurred: false , postClassify: '3' },
  { id: 4, content: 'https://testURL.com', isBlurred: true , postClassify: '4' },
]);

const fileTypes = [
  'Text',
  'Image',
  'Video',
  'Audio',
  'Other'
];
const fileBody = ref(null);
const fileClass=ref('');

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


const chips = ref(['Default'])
const dialog = ref(false);



</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-file-input
            label="File input"
            multiple
            v-model="fileBody"
            @change="uploadFile"
        ></v-file-input>
      </v-col>
      <v-col>
<!--        <v-btn class="bg-blue" @click="dialog = true">-->
<!--          <v-icon>mdi-comment-text-outline</v-icon>-->
<!--          编辑信息-->
<!--        </v-btn>-->
        <v-select
            :items="fileTypes"
            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
            label="Label"
            v-model="fileClass"
        ></v-select>
        <v-btn class="bg-green mx-2" @click="uploadFile(fileBody, fileClass)">
          <v-icon>mdi-cloud-upload</v-icon>
          上传文件
        </v-btn>
      </v-col>
    </v-row>
<!--    编辑信息弹窗-->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">编辑信息</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field label="标题" v-model="title"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="描述" v-model="description"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="标签" v-model="tags"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="分类" v-model="classify"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">取消</v-btn>
          <v-btn text @click="dialog = false">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
                @click="downloadFile(userId, postId)"
            ><FileItem></FileItem></v-sheet>
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