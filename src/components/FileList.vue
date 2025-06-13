<script setup lang="ts">
import {computed, reactive, ref} from 'vue'
import TextTest from "./PostItem.vue";
import FileItem from "./FileItem.vue";
import axios from 'axios';
import { useRouter  } from 'vue-router';
import { useSignInStore } from '@/store/SignIn.ts';
import dayjs from "dayjs";


const router = useRouter();
const signInStore = useSignInStore();

const userId = signInStore.userInfo.userId;
const postId = ref(null);
const postPrice = 10;

async function getFileList() {
  try {
    const res = await axios.get('/api/file/list?userId=' + userId);
    console.log(res.data);
    return { code: 200, message: '获取成功', data: res.data };
  }catch(err) {
    console.error(err);
    return { code: 500, message: '服务器内部错误', data: null };
  }
}



const fileTypes = [
  'PDF',
  'Video',
  'ZIP'
];

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

// 上传文件
const fileBody = ref<null | File[]>(null);
const fileClass=reactive({
  postId: 1001,
  fileComment: '测试文件',
  fileValue: 0,
  fileName: 'test'
})

const dialog = ref(false);

async function uploadFile(fileBody, fileClass) {
  if (!fileBody || fileBody.length === 0) {
    alert('请选择要上传的文件');
    return { code: 400, message: '请选择要上传的文件', data: null };
  }

  // 验证文件大小（例如限制为10MB）
  const maxSize = 10 * 1024 * 1024; // 10MB
  for (const file of fileBody) {
    if (file.size > maxSize) {
      alert('文件大小不能超过10MB');
      return { code: 400, message: '文件大小不能超过10MB', data: null };
    }
  }
//解决报错
  const json = JSON.stringify(fileClass);
  const blob = new Blob([json], { type: 'application/json'});
  const formData = new FormData();
  // 确保文件被正确添加到 FormData
  for (const file of fileBody) {
    formData.append('fileBody', file, file.name);
  }
  formData.append('fileClass', blob, 'fileClass.json');

  try {
    const res = await axios.post('/api/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${signInStore.userInfo.token}`
      },
      // 确保 FormData 被正确处理
      transformRequest: [(data) => data]
    });
    console.log(res.data);
    alert('上传成功');
    return { code: 200, message: '上传成功', data: null };
  } catch (error) {
    console.error('请求出错:', error);
    alert('上传失败，请重试');
    return { code: 500, message: '服务器内部错误', data: null };
  }
}

// 下载文件

async function downloadFile(userId, postId) {
  try {
    const res = await axios.get(`/api/file/download?userId=${userId}&postId=${postId}`);
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

async function downloadAFile(fileId, userId) {

  try {
    const res = await axios.get(`/api/file/download2`,{
      data:{
        userId:userId,
        fileId:fileId
      }
    });
    alert('下载成功');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([res.data]));
    a.download = 'download.txt';
    a.click();
    a.remove();

  }catch(err) {
    alert('下载失败，请重试')
    console.error('<UNK>:', err);
  }
}

// 文件刷新
type FileItem = {
  id: number;
  filePath: null|string;
  fileName: null|string;
  postId: number;
  filePermission: null|number;
  fileComment: null|string;
  fileValue: number;
  createTime: null|string;
  isDelete: number;
}
const fileList = ref([
  {id: 1, filePath: 'https://www.baidu.com', fileName: 'test1.txt', postId: 1001, filePermission: 1, fileComment: '测试文件1', fileValue: 10, createTime: '2022-01-01 12:00:00', isDelete: 0}
]);

async function loadFiles() {
  try{
    const res = await axios.get('/api/file/search')
    console.log(res.data.data);
    fileList.value = res.data.data;
  }catch(err) {
    console.error('请求出错:', err);
  }
}

const formatDate = computed(() => {
  return (timestamp: number | number[]) => {
    if (Array.isArray(timestamp)) {
      // 处理数组格式的日期 [年, 月, 日, 时, 分]
      // 注意：JavaScript的月份是从0开始的，所以需要减1
      const date = new Date(timestamp[0], timestamp[1] - 1, timestamp[2], timestamp[3], timestamp[4])
      return dayjs(date).format('YYYY-MM-DD HH:mm')
    } else {
      // 处理原来的时间戳格式
      return dayjs(timestamp).format('YYYY-MM-DD HH:mm')
    }
  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-file-input
            label="File input"
            multiple
            show-size
            v-model="fileBody"
        ></v-file-input>
      </v-col>
      <v-col cols="2">
        <v-btn class="bg-green mx-2" @click="dialog = true">
          <v-icon>mdi-cloud-upload</v-icon>
          编辑信息
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="File ID" v-model="fileId"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" @click="downloadAFile(fileId, userId)">
          <v-icon>mdi-cloud-download</v-icon>
          下载文件</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-container class="bg-gray-100">
        <v-row>
          <v-col>
            <v-btn color="primary" @click="loadFiles()">
              <v-icon>mdi-refresh</v-icon>
              加载更多
            </v-btn>
          </v-col>
        </v-row>
        <br>
        <v-row>
          <v-col cols="4" v-for="(item, index) in fileList" :key="index" :item="item">
            <v-card
                @click="()=> downloadFile(item.id, signInStore.userInfo.userId)"
            >
              <v-card-title>
                <v-row>
                  <v-col cols="9">
                    <span>{{ item.fileName }}</span>
                  </v-col>
                  <v-col cols="3" v-if="item.isDelete === 0">
                    <v-icon color="success">mdi-check-circle</v-icon>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="文件描述" v-model="item.fileComment" disabled></v-text-field>
                    <v-text-field label="文件地址" v-model="item.filePath" disabled></v-text-field>
                  </v-col>
                  <v-col>
                    <v-chip small>
                      需要点数:{{ item.fileValue }}
                    </v-chip>
                  </v-col>
                  <v-col>
                    <v-chip small>PID:{{ item.postId }}</v-chip>
                    <v-chip small>UID:{{ item.id }}</v-chip>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <span># {{ formatDate(item.createTime) }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

<!--        <v-infinite-scroll  @load="loadMore" :items="fileList" >-->
<!--          <v-container v-for="(item, index) in fileList" :key="index" :item="item">-->
<!--            <v-sheet-->
<!--                border="dashed md"-->
<!--                color="surface-light"-->
<!--                height="200"-->
<!--                rounded="lg"-->
<!--                width="100%"-->
<!--                class="hover-effect"-->
<!--                v-if="fileTypes.includes(item.fileClass)"-->
<!--                @click="downloadFile(userId, postId)"-->
<!--            ><FileItem :item="item"></FileItem></v-sheet>-->
<!--          </v-container>-->
<!--        </v-infinite-scroll>-->
      </v-container>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">编辑信息</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="文件名称" v-model="fileClass.fileName"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="文件价格" v-model="fileClass.fileValue"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="文件描述" v-model="fileClass.fileComment"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="dialog = false">取消</v-btn>
        <v-btn text @click="uploadFile(fileBody, fileClass)">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.hover-effect:hover {
  background-color: #e0f7fa;
  cursor: pointer;
  outline: dashed 5px #706ccb;
}
</style>