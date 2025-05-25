<script setup lang="ts">
  import { ref } from 'vue'
  const items = ['问题求解', '资料分享', '水贴吃瓜', '闲聊']
  const breadcrumbs = [
    {
      title: 'Dashboard',
      href: 'breadcrumbs_dashboard'
    },
      {
      title: 'Link 1',
      href: 'breadcrumbs_link_1'
    },
      {
      title: 'Link 2',
      href: 'breadcrumbs_link_2',
      disabled: false
    }
  ]
  const chips = ref(['Default'])

</script>

<template>
  <v-breadcrumbs :items="breadcrumbs" bg-color="primary" class="flex position-relative top-0">
    <template v-slot:prepend>
      <v-icon icon="$vuetify" size="small"></v-icon>
    </template>
  </v-breadcrumbs>
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