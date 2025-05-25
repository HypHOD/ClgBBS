<script setup lang="ts" name="CreateAccount">
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
import {ref} from 'vue'
import router from '../router'
import axios from 'axios'

const username = ref<string>('')
const password = ref<string>('')
const email = ref<string>('')
const confirmPassword = ref<string>('')
const profession = ref<string>('')

let phoneNumber = ref<number>(0)
let agreed = ref<boolean>(false)

const codeSent = ref<boolean>(false)
const code = ref<string>('')

// const phoneNumberRules = computed(() => {
//   if (phoneNumber.value === 0) {
//     return 'Please enter your phone number'
//   }
//   if (phoneNumber.value.toString().length !== 10) {
//     return 'Please enter a valid 10-digit phone number'
//   }
//   return ''
// })
//
// const codeRules = computed(() => {
//   if (code.value === '') {
//     return 'Please enter the code sent to your phone'
//   }
//   if (code.value.length !== 6) {
//     return 'Please enter a 6-digit code'
//   }
//   return ''
// })
//
// function handleAgree() {
//   agreed.value = true
// }
//
// function handlePhoneNumber(event: any) {
//   phoneNumber.value = event.target.value
// }
//
// function handleCode(event: any) {
//   code.value = event.target.value
// }

function handleSendCode() {
  if (phoneNumber.value === 0) {
    alert('Please enter your phone number')
    return
  }
  if (phoneNumber.value.toString().length !== 10) {
    alert('Please enter a valid 10-digit phone number')
    return
  }
  // 向服务器发送验证码
  console.log('Sending code to ' + phoneNumber.value)
  codeSent.value = true
}

function handleCreate(){
  console.log('Checking Information...')
  if (agreed.value && phoneNumber.value && code.value) {
    console.log('Creating account...')
  }
  console.log('Creating account failed')

}

const handleSubmit = (event: any) => {
  event.preventDefault()
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }
  if (profession.value === '') {
    alert('Please select your profession')
    return
  }
  if (codeSent.value && code.value === '') {
    alert('Please enter the code sent to your phone')
    return
  }
  if (codeSent.value && code.value.length !== 6) {
    alert('Please enter a 6-digit code')
    return
  }
  if (agreed.value && phoneNumber.value && code.value) {
    console.log('Creating account...')
    // 向服务器发送创建账户请求
    axios.post('/api/create-account', {
      username: username.value,
      password: password.value,
      email: email.value,
      profession: profession.value,
      phone_number: phoneNumber.value,
      code: code.value
    })
    .then(response => {
       console.log(response)
       alert('Account created successfully')
       // 重置表单
       username.value = ''
       password.value = ''
       email.value = ''
       confirmPassword.value = ''
       profession.value = ''
       phoneNumber.value = 0
       code.value = ''
       codeSent.value = false
       agreed.value = false
      // 跳转到登录页面
       router.push('/login')
     })
    .catch(error => {
       console.log(error)
       alert('Account creation failed')
     })
  } else {
    alert('Create successfully')
    // handleCreate()
    router.push('/create-account-success')
  }
}




</script>

<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
      <div class="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">创建你的账户</h2>
      <p class="mt-2 text-lg/8 text-gray-600">你热爱的,就是你的生活.</p>
      <p class="mt-2 text-lg/8 text-gray-600">我们网站未来可能会倒闭,但绝不会变质.</p>
    </div>
    <form action="#" method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label for="username" class="block text-sm/6 font-semibold text-gray-900">用户名</label>
          <div class="mt-2.5">
            <input v-model="username" type="text" name="username" id="username" autocomplete="given-name" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
        </div>
        <div>
          <label for="profession" class="block text-sm/6 font-semibold text-gray-900">专业</label>
          <div class="mt-2.5">
            <input v-model="profession" type="text" name="profession" id="profession" autocomplete="profession" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="password" class="block text-sm/6 font-semibold text-gray-900">密码</label>
          <div class="mt-2.5">
            <input v-model="password" type="text" name="password" id="password" autocomplete="password" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="confirmPassword" class="block text-sm/6 font-semibold text-gray-900">再次输入密码</label>
          <div class="mt-2.5">
            <input v-model="confirmPassword" type="text" name="confirmPassword" id="confirmPassword" autocomplete="confirmPassword" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="email" class="block text-sm/6 font-semibold text-gray-900">电子邮件</label>
          <div class="mt-2.5">
            <input v-model="email" type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="phoneNumber" class="block text-sm/6 font-semibold text-gray-900">电话号码</label>
          <div class="mt-2.5">
            <div class="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
              <div class="grid shrink-0 grid-cols-1 focus-within:relative">
                <select id="country" name="country" autocomplete="country" aria-label="Country" class="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                  <option>+86</option>
                </select>
                <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" aria-hidden="true" />
              </div>
              <input v-model="phoneNumber" type="text" name="phone-number" id="phone-number" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="123-456-7890" />
            </div>
          </div>
        </div>

        <!--            验证码输入框 -->
        <div class="sm:col-span-2">
          <label for="code" class="flex block text-sm/6 font-semibold text-gray-900 w-auto">验证码</label>
          <div class="mt-2.5 flex items-center text-sm/6">
            <input v-model="code" type="text" name="code" id="code" class="flex w-auto block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
            <button type="button"
                    @click="handleSendCode"
                    class="ml-2 mt-2.5 inline-flex items-center px-3.5 py-2.5 border border-gray-300 shadow-sm text-no-wrap text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              发送验证码
            </button>
          </div>

        </div>
<!--        <SwitchGroup as="div" class="flex gap-x-4 sm:col-span-2">-->
<!--          <div class="flex h-6 items-center">-->
<!--            <Switch v-model="agreed" :class="[agreed ? 'bg-indigo-600' : 'bg-gray-200', 'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600']">-->
<!--              <span class="sr-only">Agree to policies</span>-->
<!--              <span aria-hidden="true" :class="[agreed ? 'translate-x-3.5' : 'translate-x-0', 'size-4 transform rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition duration-200 ease-in-out']" />-->
<!--            </Switch>-->
<!--          </div>-->
<!--          <SwitchLabel class="text-sm/6 text-gray-600" >-->
<!--            勾选我已阅读并同意-->
<!--            {{ ' ' }}-->
<!--            <a href="#" class="font-semibold text-indigo-600">隐私政策</a>.-->
<!--          </SwitchLabel>-->
<!--        </SwitchGroup>-->
          <div class="text-sm/6 text-gray-600 flex items-center">
            <input value="1" type="checkbox" v-model="agreed" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-2 bg-gray-200" />
            我已阅读并同意
            {{ ' ' }}
            <a href="#" class="font-semibold text-indigo-600">隐私政策</a>.
          </div>

      </div>
      <div class="mt-10 flex justify-center bg-blue-darken-4 rounded-md py-2 text-white text-sm font-semibold hover:bg-blue-darken-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-darken-3" >
        <button @click="handleSubmit" type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
<!--          <a href="create-account-success">-->
<!--            Let's check in-->
<!--          </a>-->
          创建账户
        </button>
      </div>

    </form>

  </div>

</template>

<style scoped>



</style>