<script setup lang="ts">
import type { Post } from '@/types/post'
import IntroSection from '../components/IntroSection.vue'
import ListPosts from '../components/posts/ListPosts.vue'
import { ref, watch, onMounted } from 'vue'
import { getPosts, updateLikeOnPost } from '@/api/service/post.service'

const selected = ref<string>('Latest')

const posts = ref<Post[]>([])
const errorMessage = ref<string>()
const postLoading = ref<boolean>(false)

onMounted(async () => {
  postLoading.value = true
  try {
    posts.value = await getPosts(selected.value)
  } catch (err: any) {
    errorMessage.value = err.message ?? 'Failed to load posts'
  } finally {
    postLoading.value = false
  }
})

watch(selected, async (newSort) => {
  postLoading.value = true
  try {
    posts.value = await getPosts(newSort)
  } catch (err: any) {
    errorMessage.value = err.message ?? 'Failed to load posts'
  } finally {
    postLoading.value = false
  }
})

async function reloadPost(postId: number) {
  const updated = await updateLikeOnPost(postId)
  const index = posts.value.findIndex((p) => p.id === postId)
  if (index !== -1) {
    posts.value[index] = { ...updated } // force reactivity
  }
}
</script>
<template>
  <IntroSection />
  <div class="d-flex justify-space-between align center" id="posts-section">
    <h1 class="ma-4" :key="selected">{{ selected }} Posts</h1>

    <div class="d-flex align-center">
      <v-btn-toggle v-model="selected" mandatory>
        <v-btn value="Latest" class="ma-2 rounded-lg">Latest</v-btn>
        <v-btn value="Popular" class="ma-2 rounded-lg">Popular</v-btn>
        <v-btn value="Following" class="ma-2 rounded-lg">Following</v-btn>
      </v-btn-toggle>
    </div>
  </div>
  <v-skeleton-loader v-if="postLoading" type=" avatar, text, card" class="rounded-lg" />

  <ListPosts v-else :disable-follow-btn="true" :posts="posts!" @like="reloadPost" />
</template>
