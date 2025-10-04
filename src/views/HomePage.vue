<script setup lang="ts">
import IntroSection from '../components/IntroSection.vue'
import ListPosts from '../components/posts/ListPosts.vue'
import { ref } from 'vue'
const selected = ref<string>('Latest')
</script>
<template>
  <IntroSection />
  <div class="d-flex justify-space-between align center" id="posts-section">
    <h1 class="ma-4" :key="selected">{{ selected }} Posts</h1>

    <div class="d-flex align-center">
      <v-btn-toggle v-model="selected" mandatory>
        <v-btn value="Latest" text="Latest" class="ma-2 rounded-lg" />
        <v-btn value="Popular" text="Popular" class="ma-2 rounded-lg" />
        <v-btn value="Following" text="Following" class="ma-2 rounded-lg" />
      </v-btn-toggle>
    </div>
  </div>
  <ListPosts :disable-follow-btn="true" />
</template>
