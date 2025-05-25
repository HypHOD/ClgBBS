<script setup lang="ts">
import {ref} from "vue";
import TextTest from "@/components/TextTest.vue";
import PersonalPost from "@/components/PersonalPost.vue";

// const items = [
//   {
//     title: 'Item #1',
//     value: 1,
//   },
//   {
//     title: 'Item #2',
//     value: 2,
//   },
//   {
//     title: 'Item #3',
//     value: 3,
//   },
// ]

const items = [
  { text: '历史发帖', icon: 'mdi-clock-outline' },
  { text: '我的社群', icon: 'mdi-account-multiple' },
  { text: '文件管理', icon: 'mdi-folder' },
  { text: '上传文件', icon: 'mdi-upload' },
  { text: '个人设置', icon: 'mdi-pencil' },

  // { text: 'Starred', icon: 'mdi-star' },
  // { text: 'Recent', icon: 'mdi-history' },
  // { text: 'Offline', icon: 'mdi-check-circle' },
  // { text: 'Uploads', icon: 'mdi-upload' },
  // { text: 'Backups', icon: 'mdi-cloud-upload' },
]

</script>

<template>
  <div class="top-0">
    <v-card class="mx-auto bg-blue rounded-lg">
      <v-card-title>
        <h2 class="text-xl font-bold text-gray-800">Welcome to your Personal Home Page</h2>
      </v-card-title>
      <v-card-text>
        <p>上边栏.</p>
      </v-card-text>
    </v-card>
  </div>


  <div class="flex-row d-flex bg-black rounded-lg">
    <div>
      <v-card class="elevation-2 w-10 h-screen bg-indigo-600 v-card--hover:bg-gray-700">
        <v-btn class="h-screen" @click="$router.push('/')">
          <v-icon class="mr-7">mdi mdi-arrow-left-bottom</v-icon>
        </v-btn>
      </v-card>
    </div>

    <v-container class="d-flex border-r-2 border-gray-500 bg-background-image ml-0">

      <v-row class="d-flex">
<!--        个人信息卡片 -->



        <v-col cols="3" class=" rounded-lg item-center bg-blue rounded-lg">
          <v-col>
            <v-sheet
                border="dashed md"
                color="surface-light"
                height="auto"
                rounded="lg"
                width="100%"
            >
            <v-avatar
                color="grey"
                rounded="0"
                size="200"
                class="ml-5 mt-5 "
            >
              <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg" cover></v-img>
            </v-avatar>
            <v-list-item
                class="text-black ml-10"
                subtitle="User ID"
                title="User Name"
            ></v-list-item>
            </v-sheet>
          </v-col>


<!--          <v-col>-->
<!--            <v-card-->
<!--                class="mx-auto"-->
<!--                max-width="300"-->
<!--            >-->
<!--              <v-list :items="items"></v-list>-->
<!--            </v-card>-->
<!--          </v-col>-->

          <v-card
              class="mx-auto"
              width="256"
          >
            <v-layout>
              <v-navigation-drawer absolute permanent>
                <v-list>

                </v-list>

                <v-divider></v-divider>

                <v-list
                    :lines="false"
                    density="compact"
                    nav
                >
                  <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                      :value="item"
                      color="primary"
                  >
                    <template v-slot:prepend>
                      <v-icon :icon="item.icon"></v-icon>
                    </template>

                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>

              <v-main style="height: 354px;"></v-main>
            </v-layout>
          </v-card>

        </v-col>

        <v-col class="ml-2 bg-white rounded-lg">
          <v-container v-for="(item, index) in items" :key="index" :item="item">
            <v-sheet
                border="dashed md"
                color="surface-light"
                height="200"
                rounded="lg"
                width="100%"
            >
              <PersonalPost :index="index" :item="item"/>
            </v-sheet>
          </v-container>


          <v-avatar
              color="grey"
              rounded="0"
              size="250"
              class="ml-10 mt-10"
          >
            <v-img src="" cover></v-img>
          </v-avatar>

        </v-col>

      </v-row>


    </v-container>



  </div>





</template>

<style scoped>

.bg-background-image{
  background-image: url("../assets/test.jpg");
}

</style>