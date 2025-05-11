<script setup lang="ts">
  import { ref } from 'vue'
  const items = ['问题求解', '资料分享', '水贴吃瓜', '闲聊']
  const chips = ref(['Default'])
</script>

<template>
  <v-container class="bg-gray-100">
    <v-combobox
        v-model="chips"
        :items="items"
        label="条件筛选"
        variant="solo"
        chips
        clearable
        closable-chips
        multiple
    >
      <template v-slot:chip="{ props, item }">
        <v-chip v-bind="props">
          <strong>{{ item.raw }}</strong>&nbsp;
          <span>(数量)</span>
        </v-chip>
      </template>
    </v-combobox>

  </v-container>
</template>

<style scoped>

</style>