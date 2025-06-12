<script setup lang="ts">
import {computed, ref} from 'vue'
import axios from "axios";
import { useSignInStore } from '@/store/signIn'
import dayjs from 'dayjs'

const signInStore = useSignInStore()

// 消息通知列表
const messageList = ref([
  {id: 1, type: 'comment', content: '测试内容', relatedPostId: 1, timestamp: 1626211200000, isRead: false},
])

type Message = {
  id: number
  type: string
  content: string
  relatedPostId: number
  timestamp: number|number[]
  isRead: boolean
}

async function fetchMessageList() {
  try{
    const res = await axios.get(`/api/notification?userId=${signInStore.userInfo.userId}`)
    alert('获取成功')
    console.log(res.data.data.list)
    messageList.value = res.data.data.list
  }catch(error){
    alert('获取失败')
    console.log(error)
  }
}

async function markAsRead(id: number) {
  try{
    const res = await axios.patch('/api/notification/mark-read',{userId: signInStore.userInfo.userId, notificationIds: [id]})
    if(1){
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
      <v-col cols="2">
        <v-btn @click="fetchMessageList">刷新</v-btn>
      </v-col>
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
            <span># {{ formatDate(item.timestamp) }}</span>
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
