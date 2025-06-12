import {defineStore} from 'pinia'
import axios from 'axios'
import router from "@/router";
import {number} from "zod";

export const useSignInStore = defineStore('signIn', {
  state: () => ({
    password: '',
    error: '',
    loading: false,
    userInfo: {
      token: String,
      userId: number,
      username: String,
      email: String,
      transferCode: '',
      unreadNotifications: 0,
      coinsBalance: 0,
      isBanned: false,
      realNameAuth: false,
    }
  }),
  actions: {
    async signIn() {
      this.loading = true
      try {
        const res = await axios.post('/api/user/login', {
          username: this.userInfo.username,
          password: this.password
        })
        console.log(res)
        this.userInfo.token = res.data.data.token
        this.error = ''
        this.loading = false
        this.userInfo.userId=res.data.data.userId
        this.userInfo.transferCode = res.data.data.transferCode
        this.userInfo.unreadNotifications = res.data.data.unreadNotifications
        alert('登录成功')
        // 跳转到首页
        await router.push('/app-layout')
      } catch (error) {
        this.error = error.message
        this.loading = false
        throw error
      }
    },
    // 恢复本地存储
    loadFromLocal() {
      const local = localStorage.getItem('userInfo')
      if (local) {
        this.userInfo = JSON.parse(local)
      }
    },
    // 登出时清空
    async signOut() {
      this.loading = false
      this.userInfo = {
        token: '',
        userId: null,
        username: '',
        email: '',
        transferCode: '',
        unreadNotifications: 0,
        coinsBalance: 0,
        isBanned: false,
        realNameAuth: false,
      }
      this.error = ''
      localStorage.removeItem('userInfo')
      await router.push('/sign-in')
    }
  },
})

export default useSignInStore