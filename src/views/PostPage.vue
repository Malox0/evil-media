<template>
  <v-btn to="/home" prepend-icon="mdi-arrow-left-thin" class="mb-4"> go back </v-btn>
  <PostCard
    v-if="post"
    :key="post.id"
    @like="reloadPost"
    :post="post"
    :extended="true"
    :disable-follow-btn="true"
  />
  <section id="comments">
    <v-card class="rounded-xl pa-4" variant="outlined">
      <v-card-title> Comments ({{ post?.commentsCount }}) </v-card-title>
      <v-card-item class="rounded-lg pa-4">
        <v-textarea v-model="commentText" rows="3" label="Write a comment..."></v-textarea>
        <v-btn color="primary" rounded @click="PostComment">Post Comment</v-btn>
      </v-card-item>
      <ListComments :key="reload" :post-id="id" :disable-follow-btn="true" variant="tonal" />
    </v-card>
  </section>
</template>
<script setup lang="ts">
import { getPostById, updateLikeOnPost } from '@/api/service/post.service'
import type { Post } from '@/types/post'
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '../components/posts/PostCard.vue'
import ListComments from '@/components/comments/ListComments.vue'
import { createComment } from '@/api/service/comment.service'

const route = useRoute()
const id = Number(route.params.id)
const post = ref<Post | null>()
const postLoading = ref<boolean>(false)
const errorMessage = ref<string>()

async function scrollToHash() {
  if (route.hash) {
    await nextTick()
    const el = document.querySelector(route.hash)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }
}
const commentText = ref<string>('')
const reload = ref(0)
async function PostComment() {
  if (commentText.value.trim().length > 0) {
    await createComment(commentText.value, post.value!.id)
    commentText.value = ''
    reload.value++
  } else {
    //Red alert on button
  }
}

onMounted(async () => {
  postLoading.value = false

  try {
    post.value = await getPostById(id)
  } catch (err: any) {
    errorMessage.value = err.message ?? `Post with id ${id} not found`
  } finally {
    postLoading.value = true
    await nextTick()
    await scrollToHash()
  }
})

watch(() => route.hash, scrollToHash)

async function reloadPost(postId: number) {
  const updated: Post = await updateLikeOnPost(postId)
  post.value = { ...updated }
}
</script>
