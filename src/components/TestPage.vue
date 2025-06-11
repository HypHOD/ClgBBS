<script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'

  const ins = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
  });

  const groupKey = ref('')

  async function joinGroup() {
    try{
      const res = await ins.post(`/groups/${groupKey.value}/join`)
      console.log(res.data)
      alert("Joined group #"+groupKey.value)
    }catch(err){
      console.log(err)
      alert("Failed to join group #"+groupKey.value)
    }

  }
</script>

<template>
  <v-container>
    <v-row class="w-50">
      <v-col>
        <v-text-field label="Group Key" v-model="groupKey"></v-text-field>
      </v-col>
      <v-col>
        <v-btn color="primary" @click="joinGroup">Add Group</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>