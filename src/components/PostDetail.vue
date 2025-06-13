<script setup lang="ts">
import { ref , onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
// import {fetchPostDetailById} from '@/api/post'
import {useSignInStore} from '@/store/signIn'
import { useStore } from 'vuex'
import {it} from "vuetify/locale";

const signInStore = useSignInStore()

const router = useRouter()
const route = useRoute()

// 从路由参数获取文章ID
const postId = route.params.uid


// 根据postId获取楼主层信息
const head = ref([
  { uid: 1,postId:'123', title: 'Title', content: 'Text', likes: 0, liked: false, creatTime: '2022-01-01 12:00:00' },
]);

// 获取评论
const comments = ref([
  { uid: 2,postId:'123#1', content: '牛', likes: 0, liked: false , parentId: 1 , commentId:123,  creatTime: '2022-01-01 12:00:00' },
]);
// 根据路由参数获取文章ID


// 模拟每次加载的数据数量
const itemsPerLoad = 3;

// 加载更多数据的方法
const loadMore = () => {
  // 模拟异步加载数据
  setTimeout(() => {
    const newItems = Array.from({ length: itemsPerLoad }, (_, i) => ({
      id: comments.value.length + i + 1,
      content: `Item ${comments.value.length + i + 1}`,
    }));
    comments.value = [...comments.value, ...newItems];
  }, 1000);
};

// 点赞的方法
async function handleLike(item: any){
  console.log(signInStore.userInfo.userId+'->点赞->'+postId)
  try{
    const res = await axios.get('/api/post/like',{userId: signInStore.userInfo.userId, postId: postId })
    console.log(res)
  }catch(err){
    console.log(err)
  }
}

// 打赏
const donateDialog = ref(false)
const donateAmount = ref(0)
async function sendTips(){
  try{
    const res = await axios.post('/api/balance/tip')
    if(res.data.code === 1){
      alert('打赏成功')
    }
    donateDialog.value = false
  }catch(err){
    console.log(err)
    alert(err.message)
    donateDialog.value = false
  }
}

// 举报
const reportDialog = ref(false)
const reportReason = ref('')
async function handleReport(item: any){
  console.log(signInStore.userInfo.userId+'->举报->'+postId+'->'+reportReason.value)
  try{
    const res = await axios.post('api/post/report',{userId: signInStore.userInfo.userId, postId: postId, reportMessage: reportReason.value})
    console.log(res)
    alert('举报成功')
    reportDialog.value = false
  }catch(err){
    console.log(err)
    alert('举报失败')
    reportDialog.value = false
  }
}
// 回复相关的变量和方法
const replyDialog = ref(false);
const currentReplyTarget = ref(null);
const currentReplyContent = ref('');

const openReplyDialog = (target: any) => {
  currentReplyTarget.value = target;
  currentReplyContent.value = ''; // 清空回复内容
  replyDialog.value = true;
};

const submitComment = () => {
  if (currentReplyContent.value.trim()) {
    const newComment = {
      id: comments.value.length + 1,
      content: currentReplyContent.value,
      likes: 0,
      liked: false,
      parentId: currentReplyTarget.value.id
    };

    // 发送新评论到服务器
    axios.post(`/comments/${postId}`, newComment)
        .then(() => {
          alert('评论提交成功');
          console.log('评论提交成功');
          comments.value = [...comments.value, newComment]; // 更新本地评论列表
        })
        .catch(() => {
          alert('评论提交失败');
          console.log('评论提交失败');
        });

    replyDialog.value = false;
  }
};

onMounted(  () => {
  // 获取文章详情
  // fetchPostDetailById(postId).then(res => {
  //   head.value = [res.data.data];
  //   comments.value = res.data.data.comments;
  // });
  console.log('postId:'+postId);
})
</script>

<template>
  <!-- 顶部导航栏-->
  <div class="fixed-top">
    <v-container class="top-0 position-static">
      <v-btn @click="$router.push('/app-layout')" variant="outlined" block class="bg-white text-black hover:bg-violet-600 active:bg-violet-700 focus:outline-dash focus:ring focus:ring-violet-300">
        <v-icon>mdi-arrow-left-bottom</v-icon>
      </v-btn>
    </v-container>
  </div>

  <!-- Head -->
  <v-container class="mt-5 bg-amber mt-8">

    <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 mt-0">
      <v-row>
        <v-col cols="2">
          <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class=" mx-1 mt-0">
            <img src="@/assets/cdm.jpg" alt="个人头像" class="rounded-lg w-full h-full object-cover hover-effect" @click="$router.push('/profile')">
            <v-chip
                color="primary"
                label
                class="mt-1"
            >UID:{{ head[0].uid }}</v-chip>
          </v-sheet>
        </v-col>
        <v-col cols="10">
          <v-sheet border="dashed md" color="surface-light" min-height="200" rounded="lg" width="auto" class="mx-1 mt-0">
            <v-card class="mx-1" height="full">
              <v-card-title>
                {{ head[0].title }}
              </v-card-title>
              <hr>
              <v-card-text>
                {{ head[0].content }}
              </v-card-text>
            </v-card>
          </v-sheet>
          <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 mt-0">
            <!-- 状态栏 -->
            <!-- 点赞 举报 -->
            <v-card-actions>
              <v-btn class="bg-red hover-effect" @click="handleLike(head[0])">
                <v-icon v-if="head[0].liked">mdi-heart</v-icon>
                <v-icon v-if="!head[0].liked">mdi-heart-outline</v-icon>
                点赞
                <!-- 点赞数量 -->
                <v-chip
                    color="primary"
                    label
                >{{ head[0].likes }}</v-chip>
              </v-btn>
              <v-btn class="bg-green hover-effect" @click="donateDialog = true">
                <v-icon>mdi-currency-usd</v-icon>
                打赏
              </v-btn>

              <v-btn class="bg-black hover-effect" @click="reportDialog = true">
                <v-icon>mdi-flag</v-icon>
                举报
              </v-btn>

              <v-btn class="bg-blue hover-effect" @click="openReplyDialog(head[0])">
                <v-icon>mdi-comment-text-outline</v-icon>
                回复
              </v-btn>

              <v-chip>
                发布时间:{{ head[0].creatTime }}
              </v-chip>
              <v-chip>
                群组标签:{{ postId }}
              </v-chip>
            </v-card-actions>
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>

  <v-infinite-scroll @load="loadMore" :items="head" class="mt-4">
    <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 mt-0">
      <!-- Comments -->
      <v-container v-for="(item, index) in comments" :key="index" :item="item">
        <v-row>
          <!-- 评论头像 -->
          <v-col cols="2">
            <v-sheet
                border="dashed md"
                color="surface-light"
                height="150"
                rounded="lg"
                width="100%"
            >
              <img src="@/assets/comment1.png" alt="个人头像" class="rounded-lg w-full h-full object-cover " @click="$router.push('/profile')">
            </v-sheet>
          </v-col>
          <v-col cols="10">
            <v-row>
              <v-col cols="8" class="bg-blue">
                <v-sheet
                    border="dashed md"
                    color="surface-light"
                    height="150"
                    rounded="lg"
                    width="100%"
                    class="hover-effect flex-column"
                    @click=""
                >
                  <v-sheet
                      border="dashed md"
                      color="surface-light"
                      height="50%"
                      rounded="lg"
                      width="50%"
                      class="hover-effect mx-1 mt-1"
                  >
                    {{ item.content }}
                  </v-sheet>
                  <v-sheet
                      border="dashed md"
                      color="surface-light"
                      height="auto"
                      rounded="lg"
                      width="auto"
                      class="hover-effect mx-1 mt-1 flex"
                  >
                    <!-- 点赞 举报 -->
                    <v-card-actions>
                      <v-btn class="bg-red hover-effect" @click="handleLike(item)">
                        <v-icon v-if="item.liked">mdi-heart</v-icon>
                        <v-icon v-if="!item.liked">mdi-heart-outline</v-icon>
                        点赞
                        <!-- 点赞数量 -->
                        <v-chip
                            color="primary"
                            label
                        >{{ item.likes }}</v-chip>
                      </v-btn>
                      <v-btn class="bg-green hover-effect" @click="">
                        <v-icon>mdi-currency-usd</v-icon>
                        打赏
                      </v-btn>
                      <v-btn class="bg-black hover-effect" @click="handleReport(item)">
                        <v-icon>mdi-flag</v-icon>
                        举报
                      </v-btn>
                    </v-card-actions>
                  </v-sheet>
                </v-sheet>
              </v-col>
              <v-col cols="4" class="bg-red">
                <v-sheet
                    border="dashed md"
                    color="surface-light"
                    height="150"
                    rounded="lg"
                    width="100%"
                    class="hover-effect flex-column"
                    @click=""
                >

                    <!-- 状态栏 -->
                    <v-chip
                        color="primary"
                        label
                        class="mt-1 mx-1"
                    >评论UID:{{ item.uid }}</v-chip>
                    <v-chip
                        color="primary"
                        label
                        class="mt-1 mx-1"
                    >父评论ID:{{ head[0].postId }}</v-chip>
                    <v-chip
                        color="primary"
                        label
                        class="mt-1 mx-1"
                    >当前楼层:{{ '#' + comments[index].postId.split('#')[1] }}</v-chip>
                    <v-chip
                        color="primary"
                        label
                        class="mt-1 mx-1"
                    >发布时间:{{ item.creatTime }}</v-chip>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-infinite-scroll>

  <!-- 回复对话框 -->
  <v-dialog v-model="replyDialog" max-width="500px">
    <v-card>
      <v-card-title>回复</v-card-title>
      <v-card-text>
        <v-textarea v-model="currentReplyContent" label="请输入回复内容"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="submitComment">提交</v-btn>
        <v-btn color="grey darken-1" text @click="replyDialog = false">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

<!--打赏对话框-->
  <v-dialog v-model="donateDialog" max-width="500px">
    <v-card>
      <v-card-title>打赏</v-card-title>
      <v-card-text>
        <v-number-input
            :max="5"
            :min="1"
            :model-value="donateAmount"
            label="请输入打赏金额"
        ></v-number-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="sendTips()">提交</v-btn>
        <v-btn color="grey darken-1" text @click="donateDialog = false">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!--举报对话框-->
  <v-dialog v-model="reportDialog" max-width="500px">
    <v-card>
      <v-card-title>举报</v-card-title>
      <v-card-text>
        <v-textarea v-model="reportReason" label="请输入举报原因"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="handleReport">提交</v-btn>
        <v-btn color="grey darken-1" text @click="reportDialog = false">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.fixed-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* 确保按钮在其他内容之上 */
}

.hover-effect:hover {
  background-color: #e0f7fa;
  cursor: pointer;
  outline: dashed 5px #706ccb;
}
</style>



