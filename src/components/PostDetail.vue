<script setup lang="ts">
import { ref , onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
// import {fetchPostDetailById} from '@/api/post'

const router = useRouter()
// 模拟数据数组
// 楼主
const head = ref([
  { uid: 1, title: 'Title', content: 'Text', likes: 0, liked: false, creatTime: '2022-01-01 12:00:00' },
]);

// 评论
const comments = ref([
  { uid: 2, content: 'Text', likes: 0, liked: false , parentId: 1 , commentId:123,  creatTime: '2022-01-01 12:00:00' },
  { uid: 3, content: 'Image', likes: 10, liked: false , parentId: 1 , commentId:456,  creatTime: '2022-01-02 12:00:00' },
]);
const postId = Number(router.currentRoute.value.params.id)



// 向服务器申请对应内容
// function fetchPostDetail(id: number) {
//   axios.get('/api/post/' + id)
//      .then((response) => {
//         head.value = [response.data];
//       })
//      .catch((error) => {
//         console.log(error);
//       });
// }


// /api/comments?postId=:id（获取评论列表）
// /api/post/:id（获取帖子详情）


// 模拟每次加载的数据数量
const itemsPerLoad = 3;

// 加载更多数据的方法
const loadMore = () => {
  // 模拟异步加载数据
  setTimeout(() => {
    const newItems = Array.from({ length: itemsPerLoad }, (_, i) => ({
      id: head.value.length + i + 1,
      content: `Item ${head.value.length + i + 1}`,
    }));
    head.value = [...head.value, ...newItems];
  }, 1000);
};

// 点赞的方法
const handleLike = (item: any) => {
  if (!item.liked) {
    item.likes++;
    item.liked = true;
    console.log('点赞成功');
  } else {
    item.likes--;
    item.liked = false;
    console.log('取消点赞成功');
  }

  // 向服务器发送点赞数量
  axios.post('API_URL/like', { id: item.id, likes: item.likes })
      .then(() => {
        console.log('点赞数量刷新成功');
      })
      .catch(() => {
        console.log('点赞数量刷新失败');
      });
};

// 举报的方法
const handleReport = () => {
  console.log('举报');
  // 举报内容
  const report = prompt('请输入举报内容');
  if (report) {
    console.log('举报成功');
  }
  // 向服务器发送举报内容
  axios.post('API_URL/report', { content: report })
      .then(() => {
        console.log('举报成功');
      })
      .catch(() => {
        console.log('举报失败');
      });
};

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
    axios.post('API_URL/comments', newComment)
        .then(() => {
          console.log('评论提交成功');
          comments.value = [...comments.value, newComment]; // 更新本地评论列表
        })
        .catch(() => {
          console.log('评论提交失败');
        });

    replyDialog.value = false;
  }
};
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

              <v-btn class="bg-black hover-effect" @click="handleReport">
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
      <v-container v-for="(item_file, index) in comments" :key="index" :item="item_file">
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
              <v-chip
                  color="primary"
                  label
              >UID:{{ comments[index].uid }}</v-chip>
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
                    {{ item_file.content }}
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
                      <v-btn class="bg-red hover-effect" @click="handleLike(item_file)">
                        <v-icon v-if="item_file.liked">mdi-heart</v-icon>
                        <v-icon v-if="!item_file.liked">mdi-heart-outline</v-icon>
                        点赞
                        <!-- 点赞数量 -->
                        <v-chip
                            color="primary"
                            label
                        >{{ item_file.likes }}</v-chip>
                      </v-btn>

                      <v-btn class="bg-black hover-effect" @click="handleReport">
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

                  <v-sheet
                      border="dashed md"
                      color="surface-light"
                      height="100"
                      rounded="lg"
                      width="auto"
                      class="hover-effect mx-1 mt-1 flex-column"
                  >
                    <!-- 状态栏 -->
                    <v-chip
                        color="primary"
                        label
                        class="mt-1 mx-1"
                    >父评论ID:{{ postId }}</v-chip>
                    <v-chip
                        color="primary"
                        label
                        class="mt-1 mx-1"
                    >当前评论楼层:{{ comments[index].commentId }}</v-chip>
                    <v-chip
                        color="primary"
                        label
                        class="mt-1 mx-1"
                    >发布时间:{{ comments[index].creatTime }}</v-chip>


                  </v-sheet>
                  <v-sheet
                      border="dashed md"
                      color="surface-light"
                      height="auto"
                      rounded="lg"
                      width="auto"
                      class="hover-effect mx-1 mt-1"
                  >
                    操作栏
                  </v-sheet>
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



