<script setup lang="ts">
import CreatePost from '../posts/CreatePost.vue'
import Profile from '../auth/Profile.vue'
</script>

<template>
  <v-app-bar fixed title="Evil Media">
    <template #append>
      <CreatePost />

      <Profile></Profile>
    </template>
  </v-app-bar>
</template>
