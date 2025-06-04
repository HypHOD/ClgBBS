<script setup lang="ts">

</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        // 文件图标
        <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 my-1">
          //下载链接
          <v-btn href="#" target="_blank" class="mx-1 my-1">
            <v-icon class="mr-1" small>cloud_download</v-icon>
          </v-btn>
        </v-sheet>
      </v-col>
      <v-col>
        // 文件信息
        <v-card outlined class="mx-1 my-1">
          <v-card-title>
            <h3 class="headline mb-0"> fileName </h3>
          </v-card-title>
          <v-card-text>  fileSize  </v-card-text>
          <v-chip small>
            <v-icon left>mdi-clock</v-icon>
            // 上传时间
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>