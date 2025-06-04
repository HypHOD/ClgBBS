import {defineStore} from 'pinia'
export const useCreateAccountStore = defineStore('createAccount', {
  state: () => ({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    loading: false,
  }),
  actions: {
    async createAccount() {
      this.loading = true
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
          }),
        })
        const data = await response.json()
        this.error = ''
        this.success = true
        this.loading = false
        return data
      } catch (error) {
        this.error = error.message
        this.success = false
        this.loading = false
      }
    },
    reset() {
      this.name = ''
      this.email = ''
      this.password = ''
      this.error = ''
      this.success = false
      this.loading = false
    },
  },
})