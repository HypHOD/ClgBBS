<script setup lang="ts">

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="2" class="d-flex justify-center align-center">
        <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 my-1 hover-effect">
          <v-img src="url" aspect-ratio="1" max-width="100" max-height="100" class="mx-1 my-1">
          </v-img>
          // 群组图标
        </v-sheet>
      </v-col>
      <v-col cols="5">
        <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 my-1">
          <v-chip small>
            <v-icon left>mdi-clock</v-icon>
            // 创建日期
          </v-chip>
          <v-chip small>
            <v-icon left>mdi-clock</v-icon>
            // 标签1
          </v-chip><v-chip small>
          <v-icon left>mdi-clock</v-icon>
          // 标签2
        </v-chip>
        </v-sheet>
      </v-col>
      <v-col cols="5">
        // 群组信息
        <v-card outlined class="mx-1 my-1">
          <v-card-title>
            <h3 class="headline mb-0"> 群组名称 </h3>
          </v-card-title>
          <v-card-text> 群组介绍 </v-card-text>
        </v-card>
        <v-btn href="#" target="_blank" class="mx-1 my-1">
          <v-icon class="mr-1" small>mdi-group</v-icon>
          加入群组
        </v-btn>
      </v-col>
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