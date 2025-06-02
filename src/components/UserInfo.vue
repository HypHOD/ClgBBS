<script setup lang="ts">
  import SignIn from "./SignIn.vue";
  import { ref } from "vue";
  const showSignInDialog = ref(false);
  const isAuthenticated = ref(false);
  function SignInDialog() {
    showSignInDialog.value = !showSignInDialog.value;
  }
</script>

<template>
  <v-container class="mx-auto bg-white rounded-lg flex">
    <v-sheet border="dashed md" color="surface-light" height="200" rounded="lg" width="200" class="mx-1">
      <img src="@/assets/cdm.jpg" alt="个人头像" class="rounded-lg w-full h-full object-cover hover-effect" @click="$router.push('/personal-homepage/:uid')">
    </v-sheet>
    <div class=" items-center p-4">
<!--      <img src="https://picsum.photos/50" alt="User Avatar" class="w-10 h-10 square mr-4"/>-->
<!--      <span class="text-lg font-bold">用户名</span>-->
<!--      <v-btn color="primary" to="/sign-in" class="ml-auto" @click="showSignInDialog=true">Sign in</v-btn>-->
<!--      <v-btn color="primary" class="ml-auto" @click="SignInDialog()">Sign in</v-btn>-->
<!--      <v-container class="ml-auto">-->
<!--&lt;!&ndash;        <SignIn v-if="showSignInDialog" @close="showSignInDialog=false"/>&ndash;&gt;-->
<!--      </v-container>-->
    </div>
  </v-container>

  <v-container v-if="showSignInDialog" class="mx-auto bg-white rounded-lg flex mt-1">
    <SignIn class="position-static z-20"/>
  </v-container>

</template>

<style scoped>

.hover-effect:hover {
  background-color: #e0f7fa;
  cursor: pointer;
  outline: dashed 5px #706ccb;
}

</style>