<script setup lang="ts">
import CreatePost from '../posts/CreatePost.vue'
</script>

<template>
  <v-app-bar fixed title="Evil Media">
    <template #append>
      <v-btn icon="mdi-bell"></v-btn>
      <CreatePost />

      <v-btn icon="mdi-account"></v-btn>
    </template>
  </v-app-bar>
</template>
