<script setup lang="ts">
import { ref } from 'vue'
import axios from "axios";
import { useSignInStore } from '@/store/signIn'

const signInStore = useSignInStore()
const userId = signInStore.userInfo.userId

const ins = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});

// 消息通知列表
const messageList = ref([
    {id: 1, type: 'comment', content: '评论了你的帖子', relatedPostId: 1, timestamp: 1626211200000, isRead: false},
    {id: 2, type: 'comment', content: '回复了你的评论', relatedPostId: 1, timestamp: 1626211200000, isRead: false},
])
type Message = {
  id: number
  type: string
  content: string
  relatedPostId: number
  timestamp: number
  isRead: boolean
}

async function fetchMessageList() {
  try{
    const res = await ins.get(`/notification?userId=${userId}&pageNum=$\{currentPage}&pageSize=5&unreadOnly=true`)
    if(res.data.code === 200){
      messageList.value = res.data.data.list
    }
  }catch(error){
    console.log(error)
  }
}


</script>

<template>

</template>

<style scoped>

</style>