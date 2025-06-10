<script setup lang="ts">
import {reactive, ref, shallowRef} from 'vue'
import TextTest from "./PostItem.vue";
import UserInfo from "./UserInfo.vue";
import PostList from "./PostList.vue";
import PostDetail from "./PostDetail.vue";
import SignIn from "./SignIn.vue";
import OperationBar from "./OperationBar.vue";
import axios from 'axios';
import { useRouter , RouterView , RouterLink } from 'vue-router';
import FileList from "@/components/FileList.vue";
import GroupList from "@/components/GroupList.vue";

const router = useRouter();


// 模拟群组数据
const messageList = ref([
  { fromUser: 'user1', content: 'user1' },
  { fromUser: 'user1', content: 'user1' },
  { fromUser: 'user1', content: 'user1' },
]);

const order = shallowRef(0)

const tab = ref('Post')
const drawer = ref(true)
const rail = ref(true)

// 登出
const logout = () => {
  localStorage.removeItem('token')
  router.push('/sign-in')
}
</script>

<template>
  <v-layout class="rounded rounded-md border">
    <v-card>
      <v-layout>
        <v-spacer></v-spacer>
        <v-navigation-drawer
            v-model="drawer"
            :rail="rail"
            permanent
            @click="rail = false"
        >
          <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/men/1.jpg"
                title="{{ user.name }}"
            >
              <template v-slot:append>
                <v-btn
                    icon="mdi-chevron-left"
                    variant="text"
                    @click.stop="rail = !rail"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>

          <v-list density="compact" nav height="fit-content">

            <v-list-item
                prepend-icon="mdi-home-city"
                title="Home"
                value="home"
            ></v-list-item>
            <v-list-item
                prepend-icon="mdi-account"
                title="My Account"
                value="account"
                to="/personal-homepage"
            ></v-list-item>
            <v-list-item
                prepend-icon="mdi-message"
                title="Message"
                value="message"
            ></v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-2" >
              <v-btn block color="primary" @click="logout()" v-if="!rail">
                Logout
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <v-main style="height: 700px"></v-main>
      </v-layout>
    </v-card>

    <!--    主界面-->
    <v-main height="auto">
      <v-container>
        <v-tabs
            bg-color="indigo-darken-2"
            fixed-tabs
            v-model="tab"
        >
          <v-tab text="Post" value="Post"></v-tab>
          <v-tab text="File" value="File"></v-tab>
          <v-tab text="Group" value="Group"></v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="Post">
            <PostList></PostList>
          </v-tabs-window-item>
          <v-tabs-window-item value="File">
            <FileList></FileList>
          </v-tabs-window-item>
          <v-tabs-window-item value="Group">
            <GroupList></GroupList>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-container>
    </v-main>
  </v-layout>
</template>

<style scoped>
.hover-effect:hover {
  background-color: #e0f7fa; /* Light blue background on hover */
  cursor: pointer; /* Change cursor to pointer on hover */
  outline: dashed 5px #706ccb;
}
</style>