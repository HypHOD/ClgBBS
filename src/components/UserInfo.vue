<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useSignInStore } from "@/store/signIn";

  const router = useRouter();
  const signInStore = useSignInStore();

  const uid = ref("");
  const form = ref({
    email: "",
    name: "",
    uid: "",
  });

  onMounted(async () => {
    try{
      form.value.email = signInStore.email
      // 向服务器请求用户信息
      // 成功后更新userInfo
      if (signInStore.email) {
        await signInStore.fetchUserInfo()
        console.log('成功获取用户信息', signInStore.email, signInStore.userInfo.uid)
      }
    }catch (error){
      console.log('获取用户信息失败')
    }
  })


</script>

<template>
  <v-container class="mx-auto bg-white rounded-lg h-auto">
    <v-row>
      <v-sheet border="dashed md" color="surface-light" height="200" rounded="lg" width="200" class="mx-1">
<!--        <img src="服务器返回的用户头像" alt="个人头像" class="rounded-lg w-full h-full object-cover hover-effect" @click="$router.push('/personal-homepage/:uid')">-->
        <img src="@/assets/cdm.jpg" alt="个人头像" class="rounded-lg w-full h-full object-cover hover-effect" @click="$router.push('/personal-homepage/:uid')">
        </v-sheet>
    </v-row>
    <v-row>
      <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="200" class="mx-1">
          <v-chip>
            UID:{{form.uid}}
          </v-chip>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<style scoped>

.hover-effect:hover {
  background-color: #e0f7fa;
  cursor: pointer;
  outline: dashed 5px #706ccb;
}

</style>