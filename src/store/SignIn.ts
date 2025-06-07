import {defineStore} from 'pinia'
import axios from 'axios'

const ins = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});

export const useSignInStore = defineStore('signIn', {
  state: () => ({
    email: '',
    username: '',
    password: '',
    error: '',
    loading: false,
    userInfo: {
      token: '',
      userId: null,
      // avatar: '',
      transferCode: '',
      unreadNotifications: 0,
      coins: 0,
    }
  }),
  actions: {
    async signIn() {
      this.loading = true
      try {
        const res = await ins.post('/user/login', {
          username: this.username,
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
  },
})

export default useSignInStore