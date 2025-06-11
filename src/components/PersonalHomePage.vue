<script setup lang="ts">
import {ref, onMounted, shallowRef} from 'vue'
import UserState from "@/components/UserState.vue";
import FileItem from "@/components/FileItem.vue";
import PostItem from "@/components/PostItem.vue";
import axios from "axios";
import {useSignInStore} from "@/store/SignIn";
import MessageList from "@/components/MessageList.vue";

const signInStore = useSignInStore();

const links = [
  'Home',
  'About Us',
  'Team',
  'Services',
  'Blog',
  'Contact Us',
]

const ins = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});

// 模拟数据数组

const postList = ref([
  { postId: 1, content: 'Text', isBlurred: false , postClassify: '1' },
  { postId: 2, content: 'Image', isBlurred: false , postClassify: '2' },
]);
const loadMorePost = () => {
  // 模拟异步加载数据
  setTimeout(() => {
    const newItems = Array.from({ length: itemsPerLoad }, (_, i) => ({
      id: postList.value.length + i + 1,
      content: `Item ${postList.value.length + i + 1}`,
    }));
    postList.value = [...postList.value, ...newItems];
  }, 1000);
};

// 只访问自己上传的文件
const fileList = ref([
  { fileId: 1, fileClass: 'PDF', downloadCount: 100 },
  { fileId: 2, fileClass: 'Video', downloadCount: 10 },
  { fileId: 3, fileClass: 'ZIP', downloadCount: 1 },
]);

const fileTypes = [
  'PDF',
  'Video',
  'ZIP'
];

const itemsPerLoad = 3;

const loadMoreFile = () => {
  // 模拟异步加载数据
  setTimeout(() => {
    const newItems = Array.from({ length: itemsPerLoad }, (_, i) => ({
      id: fileList.value.length + i + 1,
      content: `Item ${fileList.value.length + i + 1}`,
    }));
    fileList.value = [...fileList.value, ...newItems];
  }, 1000);
};

async function deleteFile(toDeletefileId: number) {
  // 模拟异步删除文件
  // await new Promise(resolve => setTimeout(resolve, 1000));
  // fileList.value = fileList.value.filter(item => item.fileId!== fileId);
  try{
    const res = await ins.get('/file/delete',{fileId: toDeletefileId})
    alert('删除成功')
    fileList.value = fileList.value.filter(item => item.fileId!== toDeletefileId);
  }catch(error){
    console.log('删除失败');
    alert('删除失败')
  }
}

const isCheckIn = ref(false)

async function checkIn() {
  try{
    const res = await ins.get('/balance/checkin',{userId: signInStore.userInfo.userId})
    alert('签到成功')
    isCheckIn.value = true;
  }catch(error){
    console.log('签到失败');
    if (isCheckIn.value) {
      alert('已签到')
    }else {
      alert('签到失败')
    }
  }
}

const tab = ref('option-1');
const dialog = shallowRef(false)
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
      <v-row>
        <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="200" class="mx-1">
          <!--        点击修改个人信息-->
          <img src="@/assets/cdm.jpg" alt="个人头像" class="rounded-lg w-full h-full object-cover hover-effect" @click="dialog = true">
        </v-sheet>
      </v-row>
      <v-row>
        <v-btn width="200" height="50" color="primary" text @click="checkIn">签到</v-btn>
      </v-row>
      <v-row>
          <v-sheet border="dashed md" color="surface-light" rounded="lg" width="200" class="mx-1 h-screen mt-2" height="auto">
          <v-tabs
              v-model="tab"
              color="primary"
              direction="vertical"
          >
            <v-tab prepend-icon="mdi-account" text="文件管理" value="option-1"></v-tab>
            <v-tab prepend-icon="mdi-lock" text="帖子管理" value="option-2"></v-tab>
            <v-tab prepend-icon="mdi-access-point" text="状态信息" value="option-3"></v-tab>
            <v-tab prepend-icon="mdi-bell-ring" text="消息通知" value="option-4"></v-tab>
          </v-tabs>
        </v-sheet>
      </v-row>
    </v-container>

    <!-- 主内容区 -->
    <v-container class="mt-2 ml-2 flex-grow-1 bg-blue-100 rounded-lg">
      <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 mt-2 ">
        <v-tabs-window v-model="tab" >
          <v-tabs-window-item value="option-1" >
            <v-card flat>
              <v-card-text>
                <v-infinite-scroll  @load="loadMoreFile" :items="fileList" >
                  <v-container v-for="(item, index) in fileList" :key="index" :item="item">
                    <v-row>
                      <v-col>
                        <v-sheet
                            border="dashed md"
                            color="surface-light"
                            height="200"
                            rounded="lg"
                            width="100%"
                            class="hover-effect"
                            v-if="fileTypes.includes(item.fileClass)"
                        ><FileItem :fileId="item.fileId" :fileClass="item.fileClass" :downloadCount="item.downloadCount"></FileItem></v-sheet>
                      </v-col>
                      <v-col cols="2">
                        <v-sheet
                            border="dashed md"
                            color="surface-light"
                            height="200"
                            rounded="lg"
                            width="100%"
                            class="hover-effect"
                            v-if="fileTypes.includes(item.fileClass)"
                        >
                          <v-btn
                              color="primary"
                              text
                              width="100%"
                              height="100%"
                              @click="deleteFile(item.fileId)"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-infinite-scroll>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="option-2">
                <v-infinite-scroll  @load="loadMorePost" :items="postList">
                  <v-container v-for="(item, index) in postList" :key="index" :item="item">
                    <v-row>
                      <v-col>
                        <v-sheet
                            border="dashed md"
                            color="surface-light"
                            height="200"
                            rounded="lg"
                            width="100%"
                            class="hover-effect"
                        ><PostItem :where="'homepage'" :post-content="item.content"></PostItem></v-sheet>
                      </v-col>
                      <v-col cols="2">
                        <v-sheet
                            border="dashed md"
                            color="surface-light"
                            height="200"
                            rounded="lg"
                            width="100%"
                            class="hover-effect"
                        >
                          <v-btn
                              color="primary"
                              text
                              width="100%"
                              height="100%"
                              @click="deleteFile(item.postId)"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-infinite-scroll>
          </v-tabs-window-item >

          <v-tabs-window-item value="option-3" >
            <v-card flat>
              <v-card-text>
                <UserState></UserState>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="option-4" >
            <v-card flat>
              <v-card-text>
                <MessageList></MessageList>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-sheet>
    </v-container>
  </div>

<!--  页脚-->
  <v-footer class="d-flex align-center justify-center ga-2 flex-wrap flex-grow-1 py-3" color="surface-light">
    <div class="flex-1-0-100 text-center mt-2">
      {{ new Date().getFullYear() }} — <strong>CLGBBS</strong>
    </div>
  </v-footer>

  <v-dialog
      v-model="dialog"
      max-width="600"
  >

    <v-card
        prepend-icon="mdi-account"
        title="编辑个人信息"
    >
      <v-card-text>
        <v-row dense>
            <v-text-field
                label="昵称"
                required
            ></v-text-field>
        </v-row>
        <v-row dense>
            <v-text-field
                label="Email*"
                autocomplete="email"
                type="email"
                required
            ></v-text-field>
        </v-row>
        <v-row dense>

            <v-text-field
                label="密码*"
                type="password"
                required
            ></v-text-field>
        </v-row>
        <v-row dense>
            <v-text-field
                label="确认密码*"
                type="password"
                required
            ></v-text-field>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
        ></v-btn>

        <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
        ></v-btn>
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