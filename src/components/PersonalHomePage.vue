<script setup lang="ts">
import {ref, onMounted, shallowRef} from 'vue'
import UserState from "@/components/UserState.vue";
import TestPage from "@/components/TestPage.vue";

const links = [
  'Home',
  'About Us',
  'Team',
  'Services',
  'Blog',
  'Contact Us',
]

const tab = ref('option-1');
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

      <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="200" class="mx-1">
<!--        点击修改个人信息-->
        <img src="@/assets/cdm.jpg" alt="个人头像" class="rounded-lg w-full h-full object-cover hover-effect" @click="$router.push('/profile')">
      </v-sheet>

      <v-sheet border="dashed md" color="surface-light" rounded="lg" width="200" class="mx-1 h-screen mt-2" height="auto">
        <v-tabs
            v-model="tab"
            color="primary"
            direction="vertical"
        >
          <v-tab prepend-icon="mdi-account" text="Post" value="option-1"></v-tab>
          <v-tab prepend-icon="mdi-lock" text="File" value="option-2"></v-tab>
          <v-tab prepend-icon="mdi-access-point" text="State" value="option-3"></v-tab>
        </v-tabs>
      </v-sheet>
    </v-container>

    <!-- 主内容区 -->
    <v-container class="mt-2 ml-2 flex-grow-1 bg-blue-100 rounded-lg">
      <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 mt-2 ">
        <v-tabs-window v-model="tab" >
          <v-tabs-window-item value="option-1" >
            <v-card flat>
              <v-card-text>
                // TODO: 个人动态
                <TestPage></TestPage>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="option-2">
            <v-card flat>
              <v-card-text>
                // TODO: 文件管理
              </v-card-text>
            </v-card>
          </v-tabs-window-item >
          <v-tabs-window-item value="option-3" >
            <v-card flat>
              <v-card-text>
                <UserState></UserState>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-sheet>
    </v-container>
  </div>

  <v-footer class="d-flex align-center justify-center ga-2 flex-wrap flex-grow-1 py-3" color="surface-light">
    <v-btn
        v-for="link in links"
        :key="link"
        :text="link"
        variant="text"
        rounded
    ></v-btn>

    <div class="flex-1-0-100 text-center mt-2">
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>
</template>

<style scoped>
.hover-effect:hover {
  background-color: #e0f7fa;
  cursor: pointer;
  outline: dashed 5px #706ccb;
}


</style>