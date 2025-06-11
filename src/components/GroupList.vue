<script setup lang="ts">
import { ref } from 'vue'
import axios from "axios";
import { useSignInStore } from '@/store/signIn'

const signInStore = useSignInStore()
const userId = signInStore.userInfo.userId

// 消息通知列表
const groupList = ref([])
type group = {}

async function fetchMessageList() {
  try{
    const res = await ins.get(`/api/notification?userId=${userId}&pageNum=$\{currentPage}&pageSize=5&unreadOnly=true`)
    if(res.data.code === 200){
      messageList.value = res.data.data.list
    }
  }catch(error){
    console.log(error)
  }
}

async function markAsRead(id: number) {
  try{
    const res = await axios.patch('/notification/mark-read',{userId: userId, notificationIds: [id]})
    if(res.data.code === 200){
      messageList.value = messageList.value.map(item => {
        if(item.id === id){
          item.isRead = true
        }
        return item
      })
    }
  }catch(error){
    console.log(error)
  }
}

</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="(item) in messageList" :key="item.id" cols="3" @click="()=> markAsRead(item.id)">
        <v-card
            :class="{ 'dark-card': item.isRead }"
            :color="item.isRead ? 'grey darken-3' : 'white'"
            :text-color="item.isRead ? 'white' : 'black'"
            @click="()=> markAsRead(item.id)"
        >
          <v-card-title>
            <v-row>
              <v-col>
                <span>{{ item.content }}</span>
              </v-col>
              <v-col>
                <v-chip small :color="item.isRead ? 'grey darken-2' : 'primary'">{{ item.type }}</v-chip>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <span>#{{ item.timestamp }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<style scoped>
.dark-card {
  opacity: 0.7;
  transition: all 0.3s ease;
}

.dark-card:hover {
  opacity: 0.9;
}
</style>
