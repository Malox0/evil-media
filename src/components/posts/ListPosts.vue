<script setup lang="ts">
import PostCard from '../../components/posts/PostCard.vue'
import { type Post } from '../../types/post'
import { getPosts, getPostsByUsername } from '@/api/service/post.service'
import { ref, onMounted } from 'vue'
import { isLoading } from '../../routes/index'
interface Props {
  disableFollowBtn?: boolean
  username?: string
}

const props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
})

const posts = ref<Post[]>()
const errorMessage = ref<string | null>()

onMounted(async () => {
  try {
    posts.value = props.username ? await getPostsByUsername(props.username) : await getPosts()
  } catch (err: any) {
    errorMessage.value = err.message ?? 'Failed to load posts'
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <PostCard v-for="post in posts" :disableFollowBtn="disableFollowBtn" :post="post" />
</template>
