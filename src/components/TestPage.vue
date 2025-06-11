<script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'


  async function getData0() {
    try{
      const res = await ins.get('/student');
      console.log(res.data);
    }catch(err){
      console.log(err);
    }
  }

  async function getData1() {
    try{
      const res = await axios.options('/api/student');
      console.log(res.data);
    }catch(err){
      console.log(err);
    }
  }

</script>

<template>
  <v-container>
    <v-row>
      <v-btn @click="getData0">Get Data0</v-btn>
    </v-row>
    <v-row>
      <v-btn @click="getData1" class="mt-4">Get Data1</v-btn>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>