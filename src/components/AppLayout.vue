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
</script>

<template>
  <v-layout class="rounded rounded-md border">
    <v-navigation-drawer color="grey-lighten-1" permanent class="z-10 rounded rounded-md relative">
      <v-container>
        <v-row>
          <UserInfo />
        </v-row>
        <v-row>
          <v-card class="mx-auto bg-gray-100 rounded-lg h-auto mt-1 w-full">
          </v-card>
        </v-row>
        <v-row>
          <v-card class="mt-1">
            <v-card-title>
              <h2>消息通知</h2>
            </v-card-title>
            <v-card-text>
              <v-layout>
                <v-container class="">
                  <v-row>
                    <v-col v-for="(message, index) in messageList" :key="index" cols="12" xs="12">
                      <v-card class="elevation-2">
                        <v-card-title>{{ message.fromUser }}</v-card-title>
                        <v-card-text>{{ message.content }}</v-card-text>
                        <v-card-actions justify="end">
                          <v-btn icon color="primary">
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <!--    上侧导航-->
    <v-app-bar :order="order" color="grey-lighten-2" title="BBSTest" flat class="flex position-fixed top-0 right-0 z-20">
      <template v-slot:append>
        <v-btn value="recent">
          <v-icon>mdi-history</v-icon>
        </v-btn>
        <v-btn value="favorites">
          <v-icon class="">mdi-heart</v-icon>
        </v-btn>
        <v-btn value="nearby">
          <v-badge
              :content="UserInfo.unread"
              :absolute="true"
              :right="0"
              :top="0"
              color="red"
              rounded
          >
            <v-icon class="h-6 w-6 text-gray-600">mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
    </v-app-bar>

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