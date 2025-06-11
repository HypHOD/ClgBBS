import {defineStore} from 'pinia'
import axios from 'axios'
import router from "@/router";

export const useSignInStore = defineStore('signIn', {
  state: () => ({
    password: '',
    error: '',
    loading: false,
    userInfo: {
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
        if (res.data.code === 200) {
          this.userInfo = res.data.data
          this.error = ''
          this.loading = false
          return res.data
        }
      } catch (error) {
        this.error = error.message
        this.loading = false
        throw error
      }
    },
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
      await router.push('/sign-in')
    }
  },
})

export default useSignInStore