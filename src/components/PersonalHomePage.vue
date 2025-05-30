<script setup lang="ts">
import PersonalPost from "@/components/PersonalPost.vue";
import TextTest from "@/components/TextTest.vue";
import {ref, onMounted, shallowRef} from 'vue'

const ID = ref(123)

// 状态跟踪当前选中的组件
const currentComponent = ref('')

// 预定义组件映射
const componentsMap = {
  'PersonalPost': PersonalPost,
  'TextTest': TextTest
}

// 组件挂载后默认显示第一个组件
onMounted(() => {
  currentComponent.value = 'PersonalPost'
})

// 处理按钮点击并更新当前组件
const handleClick = (componentName: string) => {
  if (componentsMap[componentName]) {
    currentComponent.value = componentName
  } else {
    console.error('未找到组件:', componentName)
  }
}

const order = shallowRef(0)

// 模拟数据数组
const items = ref([
  { id: 1, content: 'Text' },
  { id: 2, content: 'Image' },
]);

const items_file = ref([
  { id: 1, content: 'Text' },
  { id: 2, content: 'Image' },
]);

// 模拟每次加载的数据数量
const itemsPerLoad = 2;

// 加载更多数据的方法
const loadMore = () => {
  // 模拟异步加载数据
  setTimeout(() => {
    const newItems = Array.from({ length: itemsPerLoad }, (_, i) => ({
      id: items.value.length + i + 1,
      content: `Item ${items.value.length + i + 1}`,
    }));
    items.value = [...items.value, ...newItems];
  }, 1000);
};
</script>

<template>
  <v-card class="mx-auto bg-blue rounded-lg">
    <v-card-title>
      <h2 class="text-xl font-bold text-gray-800">Welcome to your Personal Home Page</h2>
    </v-card-title>
    <v-card-text>
      <h2 class="text-xl font-bold text-gray-800">个人主页上边栏</h2>
    </v-card-text>
  </v-card>

  <div class="flex">
    <!-- 侧边栏 -->
    <div>
      <v-btn @click="$router.push('/')" variant="outlined" class="h-screen hover:bg-violet-600 active:bg-violet-700 focus:outline-dash focus:ring focus:ring-violet-300">
        <v-icon>mdi-arrow-left-bottom</v-icon>
      </v-btn>
    </div>

    <v-container class="bg-blue-100 rounded-lg ml-2 mt-2" max-width="240">
      <v-sheet border="dashed md" color="surface-light" height="200" rounded="lg" width="200" class="mx-1">
        <img src="@/assets/cdm.jpg" alt="个人头像" class="rounded-lg w-full h-full object-cover hover-effect" @click="$router.push('/profile')">
      </v-sheet>

<!--      <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="200" class="mx-1">-->
<!--        <v-card class="mt-2 bg-white rounded-lg w-full h-full">-->
<!--          <v-card-title>ID:{{ID}}</v-card-title>-->
<!--        </v-card>-->
<!--      </v-sheet>-->

      <v-sheet border="dashed md" color="surface-light" rounded="lg" width="200" class="mx-1 h-screen mt-2" height="auto">
        <v-btn class="text-none mt-2" color="secondary" size="x-large" variant="outlined" block @click="handleClick('PersonalPost')">
          <v-icon>mdi mdi-card-bulleted</v-icon>
          <span class="ml-2">我的帖子</span>
        </v-btn>
        <v-btn class="text-none mt-2" color="secondary" size="x-large" variant="outlined" block @click="handleClick('TextTest')">
          <v-icon>mdi mdi-cards-heart</v-icon>
          <span class="ml-2">我的收藏</span>
        </v-btn>
        <v-btn class="text-none mt-2" color="secondary" size="x-large" variant="outlined" block>
          <v-icon>mdi-arrow-left-bottom</v-icon>
          <span class="ml-2">文件管理</span>
        </v-btn>
        <v-btn class="text-none mt-2" color="secondary" size="x-large" variant="outlined" block>
          <v-icon>mdi-arrow-left-bottom</v-icon>
          <span class="ml-2">我的社群</span>
        </v-btn>
        <v-btn class="text-none mt-2" color="secondary" size="x-large" variant="outlined" block>
          <v-icon>mdi mdi-card-account-details-outline</v-icon>
          <span class="ml-2">个人信息</span>
        </v-btn>
      </v-sheet>
    </v-container>

    <!-- 主内容区 -->
    <v-container class="mt-2 ml-2 flex-grow-1 bg-blue-100 rounded-lg">

      <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 mt-2 ">
          <v-container v-for="(item, index) in items" :key="index" :item="item">
            <v-sheet
                border="dashed md"
                color="surface-light"
                height="150"
                rounded="lg"
                width="100%"
                class="hover-effect"
            ><PersonalPost :index="index" :item="item"/></v-sheet>

          </v-container>
        // 换页按钮

      </v-sheet>

      <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 mt-2">
        <v-container v-for="(item_file, index) in items_file" :key="index" :item="item_file">
          <v-row>
            <v-col >
              <v-sheet
                  border="dashed md"
                  color="surface-light"
                  height="150"
                  rounded="lg"
                  width="100%"
                  class="hover-effect"
                  @click="$router.push('/file-manager/{{item_file.id}}')"
              >
                // 文件浏览
                <p>{{item_file.content}}</p>
              </v-sheet>
            </v-col>
          </v-row>

        </v-container>
      </v-sheet>

    </v-container>

  </div>
</template>

<style scoped>
.hover-effect:hover {
  background-color: #e0f7fa;
  cursor: pointer;
  outline: dashed 5px #706ccb;
}
</style>