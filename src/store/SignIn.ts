import {defineStore} from 'pinia'

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
      avatar: '',
      transferCode: '',
      unreadNotifications: 0,
    }
  }),
  actions: {
    async signIn() {
      this.loading = true
      try {
        const response = await fetch('/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // email: this.email,
            token: this.token,
            userId: this.userId,
            transferCode: this.transferCode,
            unreadNotifications: this.unreadNotifications,
          }),
        })
        if (!response.ok) {
          throw new Error('Failed to sign in')
        }
        const data = await response.json()
        this.error = ''
        this.loading = false
        return data
      } catch (error) {
        this.error = error.message
        this.loading = false
        throw error
      }
    },
    async fetchUserInfo() {
      if (!this.userInfo.token) {
        throw new Error('没有用户token')
      }
      this.loading = true
      this.error = ''
      try {
        const response = await fetch(`https://example.com/api/user?email=${encodeURIComponent(this.email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 认证头
            // 'Authorization': `Bearer ${this.token}`
          }
        })

        if (!response.ok) {
          throw new Error('获取用户信息失败')
        }

        const data = await response.json()

        // 更新store中的用户信息
        this.userInfo = {
          uid: data.uid,
          avatar: data.avatar,
          username: data.username
        }

        return this.userInfo
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  },
})

export default useSignInStore