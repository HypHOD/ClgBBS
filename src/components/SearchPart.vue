<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search-result'])
const loaded = ref(false)
const loading = ref(false)
const search = ref('')
const selectSection = ref('')

async function onClick() {
  if (!search.value.trim()) return // 避免空搜索

  loading.value = true
  loaded.value = false

  try {
    const prefix = search.value[0] || ''
    const searchText = search.value.slice(1)
    let response

    if (prefix === '!') {
      response = await fetch(`/section/search/${searchText}`).then(res => res.json())
    } else if (prefix === '@') {
      response = await fetch(`/user/search/${searchText}`).then(res => res.json())
    } else {
      response = await fetch(`/post/search?keyword=${encodeURIComponent(search.value)}`).then(res => res.json())
    }

    // emit('search-result', response)
    defineProps({ searchResult: response })
  } catch (error) {

    console.error('搜索出错:', error)
    // emit('search-result', { code: 500, message: '网络错误', data: null })
  } finally {
    loading.value = false
    loaded.value = true
  }
}
</script>

<template>
  <v-card class="mx-auto" color="surface-light">
  <v-container>
    <v-row>
      <v-col>
          <v-card-text>
            <v-text-field
                v-model="search"
                :loading="loading"
                append-inner-icon="mdi-magnify"
                density="compact"
                label='<!>分区搜索 <@>uid搜索'
                variant="solo"
                hide-details
                single-line
                @click:append-inner="onClick"
                @keyup.enter="onClick"
            ></v-text-field>
          </v-card-text>
      </v-col>
      <v-col>
        <v-select
            label="选择分区"
            v-model="selectSection"
            :items="['分区1', '分区2', '分区3']"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
  </v-card>

</template>