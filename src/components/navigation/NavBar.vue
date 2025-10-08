<script setup lang="ts">
import CreatePost from '../posts/CreatePost.vue'
import Profile from '../auth/Profile.vue'
</script>

<template>
  <v-app-bar fixed title="Evil Media">
    <template #append>
      <v-btn icon="mdi-bell"></v-btn>
      <CreatePost />

      <Profile></Profile>
    </template>
  </v-app-bar>
</template>
