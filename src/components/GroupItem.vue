<script setup lang="ts">

</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-img src="groupIcon" aspect-ratio="1" max-width="100" max-height="100" class="mx-1 my-1">
        </v-img>
        // 群组图标
        <v-sheet border="dashed md" color="surface-light" height="auto" rounded="lg" width="auto" class="mx-1 my-1">
          //群组介绍
          <v-btn href="#" target="_blank" class="mx-1 my-1">
            <v-icon class="mr-1" small>mdi-group</v-icon>
            加入群组
          </v-btn>
        </v-sheet>
      </v-col>
      <v-col>
        // 群组信息
        <v-card outlined class="mx-1 my-1">
          <v-card-title>
            <h3 class="headline mb-0">  </h3>
          </v-card-title>
          <v-card-text>  fileSize  </v-card-text>
          <v-chip small>
            <v-icon left>mdi-clock</v-icon>
            // 群组信息
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>