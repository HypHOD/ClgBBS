<template>
  <v-container fluid class="py-4">
    <!-- 搜索区域 -->
    <v-card class="mb-6 rounded-lg shadow-md">
      <v-card-title class="text-h5 font-weight-bold">搜索帖子</v-card-title>
      <v-card-text>
        <v-combobox
            v-model="selectedTags"
            v-model:search="searchTerm"
            :custom-filter="customFilter"
            :items="tagItems"
            label="选择标签或输入关键词搜索"
            variant="solo"
            hide-selected
            multiple
            clearable
            dense
        >
          <!-- 自定义选中标签的显示 -->
          <template v-slot:selection="{ item, index }">
            <v-chip
                v-if="item === Object(item)"
                :color="`${item.raw.color}-lighten-3`"
                :text="item.title"
                size="small"
                variant="flat"
                closable
                label
                @click:close="removeSelection(index)"
            ></v-chip>
          </template>

          <!-- 自定义下拉列表项 -->
          <template v-slot:item="{ props, item }">
            <!-- 创建新标签选项 -->
            <v-list-item v-if="item.raw.header && searchTerm">
              <span class="mr-3">创建标签:</span>
              <v-chip
                  :color="`${tagColors[selectedTags.length % tagColors.length]}-lighten-3`"
                  size="small"
                  variant="flat"
                  label
              >
                {{ searchTerm }}
              </v-chip>
            </v-list-item>

            <!-- 分组标题 -->
            <v-list-subheader v-else-if="item.raw.header" :title="item.title"></v-list-subheader>

            <!-- 普通标签项 -->
            <v-list-item v-else @click="props.onClick">
              <v-chip
                  :color="`${item.raw.color}-lighten-3`"
                  :text="item.raw.title"
                  variant="flat"
                  label
              ></v-chip>
            </v-list-item>
          </template>
        </v-combobox>

        <!-- 搜索按钮 -->
        <v-row class="mt-4 justify-end">
          <v-btn
              color="primary"
              @click="searchPosts"
              :loading="isLoading"
          >
            <v-icon left>mdi-magnify</v-icon>
            搜索
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- 搜索结果统计 -->
    <v-alert
        v-if="searchResults.length > 0"
        type="info"
        border="left"
        dense
    >
      找到 {{ searchResults.length }} 个匹配的帖子
    </v-alert>

    <!-- 帖子列表 -->
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex
            v-for="post in searchResults"
            :key="post.id"
            sm="12"
            md="6"
            lg="4"
        >
          <v-card class="mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <!-- 帖子缩略图 -->
            <v-img
                :src="post.imageUrl"
                :alt="post.title"
                height="200px"
                class="rounded-t-lg"
            ></v-img>

            <!-- 帖子标签 -->
            <v-card-actions class="px-4 py-2">
              <v-chip
                  v-for="tag in post.tags"
                  :key="tag"
                  :color="getTagColor(tag)"
                  size="small"
                  variant="flat"
                  label
              >
                {{ tag }}
              </v-chip>
            </v-card-actions>

            <!-- 帖子内容 -->
            <v-card-text class="py-3">
              <h3 class="text-h6 font-weight-bold mb-2">{{ post.title }}</h3>
              <p class="text-body-2 text-gray-600 mb-3">
                {{ post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content }}
              </p>

              <!-- 作者和日期 -->
              <div class="text-sm text-gray-500 flex items-center">
                <v-avatar size="24">
                  <img :src="post.author.avatar" :alt="post.author.name">
                </v-avatar>
                <span class="ml-2">{{ post.author.name }}</span>
                <span class="mx-2">•</span>
                <span>{{ formatDate(post.date) }}</span>
              </div>
            </v-card-text>

            <!-- 操作按钮 -->
            <v-card-actions class="px-4 py-2 justify-end">
              <v-btn
                  text
                  color="primary"
                  @click="viewPost(post.id)"
              >
                阅读更多
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- 无结果提示 -->
      <v-empty-state
          v-if="searchResults.length === 0 && !isLoading && hasSearched"
          title="没有找到匹配的帖子"
          subtitle="请尝试使用不同的标签或关键词"
          icon="mdi-magnify"
      ></v-empty-state>
    </v-container>

    <!-- 加载状态 -->
    <v-overlay v-model="isLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 模拟数据
const router = useRouter();

// 预设标签数据
const presetTags = [
  { title: '技术', color: 'blue' },
  { title: '生活', color: 'green' },
  { title: '美食', color: 'red' },
  { title: '旅行', color: 'orange' },
  { title: '摄影', color: 'purple' },
  { title: '音乐', color: 'pink' },
  { title: '电影', color: 'indigo' },
  { title: '书籍', color: 'deep-purple' },
  { title: '游戏', color: 'teal' },
  { title: '健康', color: 'cyan' },
];

// 可用的标签颜色
const tagColors = ['blue', 'green', 'red', 'orange', 'purple', 'pink', 'indigo', 'deep-purple', 'teal', 'cyan'];

// 搜索相关数据
const searchTerm = ref('');
const selectedTags = ref([]);
const isLoading = ref(false);
const hasSearched = ref(false);

// 帖子数据
const posts = ref([
  {
    id: 1,
    title: 'Vue 3新特性详解',
    content: 'Vue 3带来了许多令人兴奋的新特性，包括Composition API、Teleport、Suspense等。本文将深入探讨这些新特性如何提升开发体验和应用性能。',
    tags: ['技术', 'Vue'],
    imageUrl: 'https://picsum.photos/seed/vue3/600/400',
    author: {
      name: '张开发',
      avatar: 'https://picsum.photos/seed/author1/100/100'
    },
    date: '2023-05-15'
  },
  {
    id: 2,
    title: '东京美食之旅',
    content: '东京是美食天堂，从街头小吃到米其林餐厅，每一口都让人难忘。本文将分享我在东京一周的美食探索，带你领略这座城市的味蕾盛宴。',
    tags: ['旅行', '美食', '日本'],
    imageUrl: 'https://picsum.photos/seed/food/600/400',
    author: {
      name: '李美食家',
      avatar: 'https://picsum.photos/seed/author2/100/100'
    },
    date: '2023-06-20'
  },
  {
    id: 3,
    title: '摄影构图技巧分享',
    content: '好的构图是摄影的关键，它能让普通的场景变得不寻常。本文将介绍10种基本的摄影构图技巧，帮助你拍摄出更有吸引力的照片。',
    tags: ['摄影', '技巧'],
    imageUrl: 'https://picsum.photos/seed/photography/600/400',
    author: {
      name: '王摄影师',
      avatar: 'https://picsum.photos/seed/author3/100/100'
    },
    date: '2023-07-10'
  },
  {
    id: 4,
    title: '如何在大城市保持健康生活',
    content: '在繁忙的大城市生活，很容易忽略健康。本文将分享一些实用的方法，帮助你在城市环境中保持健康的生活方式，包括饮食、运动和心理健康。',
    tags: ['生活', '健康', '城市'],
    imageUrl: 'https://picsum.photos/seed/health/600/400',
    author: {
      name: '赵健康',
      avatar: 'https://picsum.photos/seed/author4/100/100'
    },
    date: '2023-08-05'
  },
  {
    id: 5,
    title: '2023年度最佳游戏推荐',
    content: '2023年有许多优秀的游戏发布，从AAA大作到独立精品，总有一款适合你。本文将推荐几款今年不可错过的游戏，并分享我的游戏体验。',
    tags: ['游戏', '推荐'],
    imageUrl: 'https://picsum.photos/seed/games/600/400',
    author: {
      name: '孙玩家',
      avatar: 'https://picsum.photos/seed/author5/100/100'
    },
    date: '2023-09-15'
  }
]);

// 搜索结果
const searchResults = ref([]);

// 格式化标签数据以适应v-combobox
const tagItems = computed(() => {
  return [
    { title: '预设标签', raw: { header: true } },
    ...presetTags.map(tag => ({
      title: tag.title,
      raw: { ...tag, header: false }
    })),
    { title: '新创建的标签', raw: { header: true } },
    ...selectedTags.value.filter(tag =>
        !presetTags.some(preset => preset.title === tag.title)
    ).map(tag => ({
      title: tag.title,
      raw: { ...tag, header: false }
    }))
  ];
});

// 自定义过滤函数
const customFilter = (item, queryText, itemText) => {
  const title = item.raw?.title || '';
  return title.toLowerCase().includes(queryText.toLowerCase());
};

// 移除选中的标签
const removeSelection = (index) => {
  selectedTags.value.splice(index, 1);
};

// 获取标签颜色
const getTagColor = (tagName) => {
  const presetTag = presetTags.find(tag => tag.title === tagName);
  if (presetTag) return presetTag.color;

  // 为新标签分配颜色
  const index = selectedTags.value.findIndex(t => t.title === tagName);
  return tagColors[index % tagColors.length];
};

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
};

// 搜索帖子
const searchPosts = () => {
  isLoading.value = true;
  hasSearched.value = true;

  // 模拟API请求延迟
  setTimeout(() => {
    if (!selectedTags.value.length && !searchTerm.value.trim()) {
      // 如果没有选择标签和搜索词，显示所有帖子
      searchResults.value = [...posts.value];
    } else {
      // 过滤帖子
      searchResults.value = posts.value.filter(post => {
        const tagMatch = selectedTags.value.length
            ? post.tags.some(tag => selectedTags.value.some(st => st.title === tag))
            : true;

        const textMatch = searchTerm.value.trim()
            ? post.title.toLowerCase().includes(searchTerm.value.toLowerCase().trim()) ||
            post.content.toLowerCase().includes(searchTerm.value.toLowerCase().trim())
            : true;

        return tagMatch && textMatch;
      });
    }

    isLoading.value = false;
  }, 800);
};

// 查看帖子详情
const viewPost = (id) => {
  router.push(`/post/${id}`);
};

// 初始化
onMounted(() => {
  // 初始加载所有帖子
  searchResults.value = [...posts.value];
});
</script>

<style scoped>
/* 自定义样式 */
.v-combobox__content {
  max-height: 300px !important;
}

.v-card:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}
</style>