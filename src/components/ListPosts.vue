<template>
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
  <PostCard v-for="post in posts" :key="post.id" :title="post.title" :sub-title="post.subTitle" />
</template>
<script setup lang="ts">
import PostCard from '@/components/PostCard.vue'
import { ref } from 'vue'

interface Post {
  id: number
  title: string
  subTitle: string
}

const selected = ref<string>('Latest')

const posts = ref<Post[]>([
  { id: 1, title: 'Badass Gaming', subTitle: 'I shit myself when starting this application' },
  { id: 2, title: 'Johnny', subTitle: 'Johnny showed me how to add css here, what a nice guy.' },
  { id: 3, title: 'Flying', subTitle: 'sucks' },
])
</script>
