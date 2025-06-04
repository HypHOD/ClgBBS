import {defineStore} from 'pinia'

export const useSignInStore = defineStore('signIn', {
  state: () => ({
    email: '',
    password: '',
    error: '',
    loading: false,
  }),
  actions: {
    async signIn() {
      this.loading = true
      try {
        const response = await fetch('https://example.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
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
  },
})

export default useSignInStore