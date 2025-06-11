<script setup lang="ts">
import { reactive, ref } from 'vue'
import TextTest from "./PostItem.vue";
import FileItem from "./FileItem.vue";
import axios from 'axios';
import { useRouter  } from 'vue-router';
import { useSignInStore } from '@/store/SignIn.ts';

const ins = axios.create({
  baseURL: 'API_URL',
  timeout: 1000,
});
const router = useRouter();
const signInStore = useSignInStore();

const userId = signInStore.userInfo.userId;
const postId = ref(null);
const postPrice = 10;

async function getFileList() {
  try {
    const res = await ins.get('/file/list?userId=' + userId);
    console.log(res.data);
    return { code: 200, message: '获取成功', data: res.data };
  }catch(err) {
    console.error(err);
    return { code: 500, message: '服务器内部错误', data: null };
  }
}

// 模拟数据数组
const fileList = ref([
  { fileId: 1, fileClass: 'PDF', fileName: 'xxx小测' , filePrice: 10 },
  { fileId: 2, fileClass: 'PDF', fileName: 'xxx电子版教材' , filePrice: 20 },
  { fileId: 3, fileClass: 'ZIP', fileName: 'xxx资料包' , filePrice: 30 },
]);

const fileTypes = [
  'PDF',
  'Video',
  'ZIP'
];
const fileBody = ref(null);
const fileClass=ref('');

// 搜索参数
const searchParams = reactive({
  pageNum: 1,
  pageSize: 10,
  comment: '',
  sectionId: null,
  begin: '',
  end: ''
});
// 模拟每次加载的数据数量
const itemsPerLoad = 3;

const isLoading = ref(false);
const hasMore = ref(true);
const errorMessage = ref('');
// 加载更多数据的方法
// 加载更多数据的方法
const loadMore = async () => {
  try {
    // 如果正在加载或没有更多数据，直接返回
    if (isLoading.value || !hasMore.value) return;

    isLoading.value = true;

    // 构建查询参数
    const params = {
      ...searchParams,
      pageNum: searchParams.pageNum + 1 // 请求下一页
    };

    // 使用 axios 发送请求
    const response = await axios.get('/post/search', { params });

    // 假设返回格式为 { items: [...], total: 100 }
    const newItems = response.data.items || [];

    // 更新文件列表
    fileList.value = [...fileList.value, ...newItems];

    // 更新分页信息
    searchParams.pageNum += 1;

    // 判断是否还有更多数据
    hasMore.value = newItems.length > 0 && fileList.value.length < (response.data.total || Infinity);

  } catch (error) {
    console.error('加载更多数据失败:', error);
    errorMessage.value = '加载更多数据失败，请重试';
  } finally {
    isLoading.value = false;
  }
};

const chips = ref(['Default'])
// const dialog = ref(false);

async function uploadFile(fileBody, fileClass) {
  const formData = new FormData();
  formData.append('fileBody', fileBody);
  formData.append('fileClass', JSON.stringify(fileClass));

  try {
    const res = await ins.post('/upload', formData, {
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

async function downloadFile(userId, postId) {
  try {
    const res = await ins.get(`/file/download?userId=${userId}&postId=${postId}`);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([res.data]));
    a.download = 'download.txt';
    a.click();
  } catch (error) {
    console.error('请求出错:', error);
    return { code: -3, msg: '服务器内部错误', data: null };
  }
}

// 下载指定ID的文件
const fileId = ref(null);

async function downloadAFile(userId, fileId) {
  try {
    const res = await ins.get(`/file/download2?fileId=${fileId}&userId=${userId}`);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([res.data]));
    a.download = 'download.txt';
    a.click();
    a.remove();

  }catch(err) {
    console.error('<UNK>:', err);
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-file-input
            label="File input"
            multiple
            v-model="fileBody"
        ></v-file-input>
      </v-col>
      <v-col>
        <v-select
            :items="fileTypes"
            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
            label="选择上传的文件类型"
            v-model="fileClass"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-btn class="bg-green mx-2" @click="uploadFile(userId,fileId)">
          <v-icon>mdi-cloud-upload</v-icon>
          上传文件
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="File ID" v-model="fileId"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" @click="downloadAFile(userId, postId)">
          <v-icon>mdi-cloud-download</v-icon>
          下载文件</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-container class="bg-gray-100">
        <v-combobox
            v-model="chips"
            :items="fileTypes"
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
        <v-infinite-scroll  @load="loadMore" :items="fileList" >
          <v-container v-for="(item, index) in fileList" :key="index" :item="item">
            <v-sheet
                border="dashed md"
                color="surface-light"
                height="200"
                rounded="lg"
                width="100%"
                class="hover-effect"
                v-if="fileTypes.includes(item.fileClass)"
                @click="downloadFile(userId, postId)"
            ><FileItem :item="item"></FileItem></v-sheet>
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