<script setup lang="ts">
import PostCard from '../../components/posts/PostCard.vue'
import type { Post } from '../../types/post'
import { updateLikeOnPost } from '@/api/service/post.service'
interface Props {
  disableFollowBtn?: boolean
  posts: Post[]
}

const emit = defineEmits<{
  (e: 'like', postId: number): void
}>()

const props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
})
</script>
<template>
  <PostCard
    v-for="post in posts"
    :key="post.id"
    @like="$emit('like', $event)"
    :disableFollowBtn="disableFollowBtn"
    :post="post"
  />
</template>
