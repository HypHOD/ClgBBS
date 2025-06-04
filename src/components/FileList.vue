<script setup lang="ts">
import { reactive, ref } from 'vue'
import TextTest from "./PostItem.vue";
import FileItem from "./FileItem.vue";
import axios from 'axios';
import { useRouter  } from 'vue-router';
import { useSignInStore } from '@/store/SignIn.ts';

const router = useRouter();
const signInStore = useSignInStore();


// 模拟数据数组
const items = ref([
  { id: 1, content: 'Text', isBlurred: false , postClassify: '1' },
  { id: 2, content: 'Image', isBlurred: false , postClassify: '2' },
  { id: 3, content: 'Video', isBlurred: false , postClassify: '3' },
  { id: 4, content: 'https://testURL.com', isBlurred: true , postClassify: '4' },
]);

// 模拟每次加载的数据数量
const itemsPerLoad = 3;

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


const handleClick = (item) => {
  console.log(item)
  // 跳转到详情页
  router.push('/post-detail/' + item.id);
}

const tips = ['问题求解', '资料分享', '水贴吃瓜', '闲聊']
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
const dialog = ref(false);

</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-file-input
            label="File input"
            multiple
        ></v-file-input>
      </v-col>
      <v-col>
        <v-btn class="bg-blue hover-effect" @click="dialog = true">
          <v-icon>mdi-comment-text-outline</v-icon>
          编辑信息
        </v-btn>
      </v-col>
    </v-row>
<!--    编辑信息弹窗-->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">编辑信息</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field label="标题" v-model="title"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="描述" v-model="description"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="标签" v-model="tags"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="分类" v-model="classify"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">取消</v-btn>
          <v-btn text @click="dialog = false">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-container class="bg-gray-100">
        <v-combobox
            v-model="chips"
            :items="tips"
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
              <span>(默认时间倒叙)</span>
            </v-chip>
          </template>
        </v-combobox>
        <hr>
        <v-infinite-scroll  @load="loadMore" :items="items" >
          <v-container v-for="(item, index) in items" :key="index" :item="item">
            <v-sheet
                border="dashed md"
                color="surface-light"
                height="200"
                rounded="lg"
                width="100%"
                class="hover-effect"
                @click="handleClick(item)"
            ><FileItem></FileItem></v-sheet>
          </v-container>
        </v-infinite-scroll>
      </v-container>
    </v-row>
  </v-container>
</template>

<style scoped>
.hover-effect:hover {
  background-color: #e0f7fa; /* Light blue background on hover */
  cursor: pointer; /* Change cursor to pointer on hover */
  outline: dashed 5px #706ccb;
}
</style>