<script setup lang="ts">
import PostCard from '../../components/posts/PostCard.vue'
import type { Post } from '../../types/post'
interface Props {
  disableFollowBtn?: boolean
  posts: Post[]
}

const props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
})
</script>
<template>
  <PostCard v-for="post in posts" :disableFollowBtn="disableFollowBtn" :post="post" />
</template>
