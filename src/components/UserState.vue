<script setup lang="ts">
import { ref, reactive } from "vue";
import {useSignInStore} from "@/store/SignIn";

const signInStore = useSignInStore();

const username = ref(signInStore.userInfo.username);
const userId = ref(signInStore.userInfo.userId);
const coinBalance = ref(signInStore.userInfo.coinsBalance);

// const tempNickname = ref("");
// const tempAvatar = ref("");
// const isEditDialogOpen = ref(false);
// const isLoading = ref(false);

// 打开编辑对话框
// const openEditDialog = () => {
//   tempNickname.value = userInfo.nickname; // 初始化昵称
//   tempAvatar.value = userInfo.avatar; // 初始化头像
//   isEditDialogOpen.value = true;
// };


// 保存修改
// 后端没写???
// const saveChanges = async () => {
//   isLoading.value = true; // 显示加载状态
//   try {
//     // 模拟异步请求（实际需替换为接口调用）
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//
//     // 更新用户状态
//     userInfo.nickname = tempNickname.value;
//     userInfo.avatar = tempAvatar.value.startsWith('data:image')
//         ? `http://your-api/upload/${Date.now()}.png` // 示例上传地址
//         : tempAvatar.value;
//     // 关闭对话框
//     isEditDialogOpen.value = false;
//     // 提示成功（可添加通知组件）
//     console.log("修改成功");
//   } catch (error) {
//     console.error("修改失败", error);
//   } finally {
//     isLoading.value = false; // 结束加载
//   }
// };

// 刷新用户持有币数量
// 在Pinia中实现

// 签到获取代币

</script>

<template>
  <v-container class="custom-bg">
    <v-row>
      <v-col>
        <div class="box">
          <span></span>
          <div class="content">
            <h2>{{ username }}</h2>
            <p>UID: {{ userId }}</p>
            <p>持有代币: {{ coinBalance }}</p>
            <a href="#" @click.prevent="openEditDialog">修改个人信息</a>
          </div>
        </div>
      </v-col>
      <v-col>
        <div class="box">
          <span></span>
          <div class="content">
            <h2>活跃度</h2>
            <p>历史发帖: {{  }}.</p>
            <p>历史回复: {{  }}.</p>
            <p>收到点赞: {{  }}.</p>
          </div>
        </div>
      </v-col>
      <v-col>
        <div class="box">
          <span></span>
          <div class="content">
            <h2>上传下载</h2>
            <p>历史上传:</p>
            <p>历史下载:</p>
            <p>累计收益:</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

<!--  <v-dialog v-model="isEditDialogOpen" max-width="500px">-->
<!--    <template #activator="{ on }">-->
<!--      &lt;!&ndash; 不需要激活按钮，直接通过点击事件控制 &ndash;&gt;-->
<!--    </template>-->
<!--    <v-card>-->
<!--      <v-card-text>-->
<!--        &lt;!&ndash; 昵称修改 &ndash;&gt;-->
<!--        <v-text-field-->
<!--            label="昵称"-->
<!--            v-model="tempNickname"-->
<!--            required-->
<!--            :error="!tempNickname"-->
<!--            error-message="昵称不能为空"-->
<!--        ></v-text-field>-->
<!--        <v-text-field-->
<!--            label="密码"-->
<!--            v-model="newPassword"-->
<!--            required-->
<!--            :error="!oldPassword"-->
<!--            error-message="昵称不能为空"-->
<!--        ></v-text-field>-->
<!--      </v-card-text>-->
<!--      <v-card-actions class="justify-end">-->
<!--        <v-btn @click="isEditDialogOpen = false">取消</v-btn>-->
<!--        <v-btn color="primary" @click="saveChanges" :loading="isLoading">-->
<!--          保存-->
<!--        </v-btn>-->
<!--      </v-card-actions>-->
<!--    </v-card>-->
<!--  </v-dialog>-->
</template>

<style scoped>

.custom-bg{
  background-image: url('@/assets/bg.jpg');
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: consolas;
}

body{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #131417;
  background-image: linear-gradient(315deg, #131417 0%, #1e1f26 74%);
}

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 40px 0;
}

.box{
  position: relative;
  display: flex;
  width: 240px;
  height: 300px;
  justify-content: center;
  align-items: center;
  margin: 15px 15px;
  transition: 0.5s;
}

.content{
  position: relative;
  left: 0;
  padding: 20px 40px;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1;
  transition: 0.5s;
}

.content h2{
  font-size: 2em;
  color: #fff;
  margin-bottom: 10px;
}

.content p{
  font-size: 1.1em;
  margin-bottom: 10px;
  line-height: 1.4em;
}

.content a{
  display: inline-block;
  font-size: 1.1em;
  color: #111;
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 700;
  margin-top: 5px;
  transition: 0.6s;
}

.box:hover .content{
  left: -25px;
  padding: 60px 40px;
}

.content a:hover{
  background: #222;
  color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 15px #222;
}

.box::before{
  content: "";
  position: absolute;
  background: #fff;
  top: 0;
  left: 50px;
  width: 50%;
  height: 100%;
  text-decoration: none;
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
}

.box::after{
  content: "";
  position: absolute;
  background: #fff;
  top: 0;
  left: 50px;
  width: 50%;
  height: 100%;
  border-radius: 8px;
  transform: skewX(15deg);
  filter: blur(30px);
  transition: 0.5s;
}

.box:hover::before,
.box:hover::after{
  transform: skewX(0deg);
  left: 20px;
  width: calc(100% - 90px);
}

.box:nth-child(1)::before,
.box:nth-child(1)::after{
  background: linear-gradient(315deg, #ffbc00, #ff0058);
}

.box:nth-child(2):before,
.box:nth-child(2):after{
  background: linear-gradient(315deg, #03a9f4, #ff0058);
}

.box:nth-child(3):before,
.box:nth-child(3):after{
  background: linear-gradient(315deg, #4dff03, #00d0ff);
}

.box span{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
}

.box span::before{
  content: "";
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
  transition: 0.3s;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  animation: animate 2s ease-in-out infinite;
}

.box:hover span::before{
  opacity: 1;
  top: -50px;
  left: 50px;
  width: 100px;
  height: 100px;
}

.box span::after{
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: 0.5s;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  animation: animate 2s ease-in-out infinite;
  animation-delay: -1s;
}

.box:hover span::after{
  bottom: -50px;
  right: 50px;
  width: 100px;
  height: 100px;
  opacity: 1;
}

@keyframes animate {
  0%,
  100%{
    transform: translateY(10px);
  }
  50%{
    transform: translate(-10px);
  }
}
</style>