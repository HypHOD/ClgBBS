import {defineStore} from 'pinia'
import axios from 'axios'

const ins = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});
export const useCreateAccountStore = defineStore('createAccount', {
  state: () => ({
    username: '',
    email: '',
    password: '',
    realNameAuth: '',
    realName:'',
    idCard: '',
    error: '',
    success: false,
    loading: false,
  }),
  actions: {
    async createAccount() {
      this.loading = true
      try {
        const { data } = await ins.post('/user/register', {
          username: this.username,
          password: this.password,
          email: this.email,
          relNameAuth: this.realNameAuth,
          realName: this.realName,
          idCard: this.idCard,
        })
        this.error = ''
        this.success = true
        this.loading = false
        return data
      } catch (error) {
        this.error = error.message
        this.success = false
        this.loading = false
      }
      // try {
      //   const response = await fetch('/user/register', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       username: this.username,
      //       password: this.password,
      //       email: this.email,
      //       relNameAuth: this.realNameAuth,
      //       realName: this.realName,
      //       idCard: this.idCard,
      //     }),
      //   })
      //   this.error = ''
      //   this.success = true
      //   this.loading = false
      //   return data
      // } catch (error) {
      //   this.error = error.message
      //   this.success = false
      //   this.loading = false
      // }
    },
    reset() {
      this.username = ''
      this.email = ''
      this.password = ''
      this.realNameAuth = ''
      this.realName = ''
      this.idCard = ''
      this.error = ''
      this.success = false
      this.loading = false
    },
  },
})