<script setup lang="ts" name="ForgetPassword">
import { useRouter } from 'vue-router'
import {ref, onMounted, shallowRef} from 'vue'
import { useCreateAccountStore } from "@/store/CreateAccount.ts";
import axios from "axios";

const router = useRouter()
const createAccountStore = useCreateAccountStore()

const form = ref({
  username: '',
  password: '',
  email: '',
  realNameAuth: false,
  realName: '',
  idCard:'',
  avatar: '',
})

// 生成随机头像
const getRandomAvatar = () => {
  const styles = ['adventurer', 'avataaars', 'bottts', 'pixel-art', 'identicon'];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  const seed = Math.random().toString(36).substring(7);
  return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${seed}`;
}

// 在组件挂载时生成随机头像
onMounted(() => {
  form.value.avatar = getRandomAvatar();
})

async function handleSubmit() {
  try {
    // 添加密码长度验证
    if (form.value.password.length < 6 || form.value.password.length > 16) {
      alert('密码长度必须在6-16个字符之间');
      return;
    }
    
    const res = await axios.post('/api/user/register', {
      username: form.value.username,
      password: form.value.password,
      email: form.value.email,
      avatar: form.value.avatar,
    })
    alert('注册成功')
    console.log('success')
  } catch(err) {
    console.log(err)
    // 添加更友好的错误提示
    if (err.response?.data?.message) {
      alert(err.response.data.message);
    } else {
      alert('注册失败，请重试');
    }
  }
}

</script>

<template>
  <div class="mt-10 isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
      <div class="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">CLGBBS</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">在这里注册账户</p>
    </div>
    <form @submit.prevent="handleSubmit" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="flex flex-col items-center mb-8">
        <img :src="form.avatar" alt="随机头像" class="w-24 h-24 rounded-full mb-4" />
        <button 
          type="button" 
          @click="form.avatar = getRandomAvatar()"
          class="text-sm text-indigo-600 hover:text-indigo-500"
        >
          换一个头像
        </button>
      </div>

      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="username" class="block text-sm font-semibold text-gray-900">用户名</label>
          <div class="mt-2.5">
            <input v-model="form.username" type="text" name="username" id="text" autocomplete="username" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" required />
          </div>
        </div>

        <div class="sm:col-span-2" >
          <label for="email" class="block text-sm font-semibold text-gray-900">邮箱地址</label>
          <div class="mt-2.5">
            <input v-model="form.email" type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" required />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="password" class="block text-sm font-semibold text-gray-900">输入密码</label>
          <div class="mt-2.5">
            <input v-model="form.password" type="password" name="password" id="password" autocomplete="current-password" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" required />
          </div>
        </div>

        <div class="sm:col-span-2" v-if="form.realNameAuth">
          <label for="username" class="block text-sm font-semibold text-gray-900">姓名</label>
          <div class="mt-2.5">
            <input v-model="form.realName" type="text" name="realName" id="text" autocomplete="name" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" required />
          </div>
        </div>

        <div class="sm:col-span-2" v-if="form.realNameAuth">
          <label for="username" class="block text-sm font-semibold text-gray-900">身份证号</label>
          <div class="mt-2.5">
            <input v-model="form.idCard" type="text" name="IC" id="text" autocomplete="sdcard" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" required />
          </div>
        </div>

      </div>

      <v-container fluid>
        <v-checkbox v-model="form.realNameAuth">
          <template v-slot:label>
            <div>
              勾选表示同意
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <a
                      href="https://vuetifyjs.com"
                      target="_blank"
                      v-bind="props"
                      @click.stop
                  >
                    实名政策
                  </a>
                </template>
                提交实名信息
              </v-tooltip>
            </div>
          </template>

        </v-checkbox>
      </v-container>

      <div class="mt-10 flex justify-center bg-blue-darken-4 rounded-md py-2 text-white text-sm font-semibold hover:bg-blue-darken-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-darken-3" >


        <button
            type="submit"
            class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          注册
        </button>
      </div>

    </form>
  </div>
</template>

<style scoped>
/* 您可以在这里添加自定义样式 */
</style>



