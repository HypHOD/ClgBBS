<script setup lang="ts" name="ForgetPassword">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const feedbackMessage = ref('');
const isSuccess = ref(false);

const handleSubmit = async () => {
  try {
    const response = await fetch('API_URL/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error('登录失败，请检查您的邮箱和密码');
    }

    const data = await response.json();
    if (data.success) {
      feedbackMessage.value = '登录成功！即将跳转到主页面...';
      isSuccess.value = true;
      setTimeout(() => {
        router.push('/app-layout'); // 假设主页面的路由是 /app-layout
      }, 2000);
    } else {
      feedbackMessage.value = '登录失败，请检查您的邮箱和密码';
      isSuccess.value = false;
    }
  } catch (error) {
    feedbackMessage.value = error.message;
    isSuccess.value = false;
  }
};
</script>

<template>
  <div class="mt-10 isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
      <div class="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">CLGBBS</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">share your knowledge with the world</p>
    </div>
    <form @submit.prevent="handleSubmit" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

        <div class="sm:col-span-2">
          <label for="email" class="block text-sm font-semibold text-gray-900">邮箱地址</label>
          <div class="mt-2.5">
            <input v-model="email" type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" required />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="password" class="block text-sm font-semibold text-gray-900">输入密码</label>
          <div class="mt-2.5">
            <input v-model="password" type="password" name="password" id="password" autocomplete="current-password" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" required />
          </div>
        </div>

      </div>
      <div v-if="feedbackMessage" :class="[isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']" class="my-4 p-4 rounded-md">
        {{ feedbackMessage }}
      </div>
      <div class="mt-10 flex justify-center bg-blue-darken-4 rounded-md py-2 text-white text-sm font-semibold hover:bg-blue-darken-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-darken-3" >
        <button
            type="submit"
            class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          登录
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* 您可以在这里添加自定义样式 */
</style>



