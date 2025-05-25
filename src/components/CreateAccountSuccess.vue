<script setup lang="ts" name="CreateAccountSuccess">

setTimeout(() => {
  console.log('CreateAccountSuccess')
  window.location.href = '/app-layout'
}, 3000)

</script>


<template>
    <div>
        <h1 class="text-center bg-green-500 text-white p-4">Account Created Successfully!</h1>
        <p class="text-center text-gray-700">You can now log in to your account.</p>
    </div>
</template>

<style scoped>

</style>