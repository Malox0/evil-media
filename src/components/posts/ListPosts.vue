<template>
  <PostCard
    v-for="post in posts"
    :disableFollowBtn="disableFollowBtn"
    :key="post.id"
    :title="post.title"
    :sub-title="post.subTitle"
  />
</template>
<script setup lang="ts">
import PostCard from '@/components/PostCard.vue'
import { ref } from 'vue'

interface Post {
  id: number
  title: string
  subTitle: string
}

interface Props {
  disableFollowBtn?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
})

const posts = ref<Post[]>([
  { id: 1, title: 'Badass Gaming', subTitle: 'I shit myself when starting this application' },
  { id: 2, title: 'Johnny', subTitle: 'Johnny showed me how to add css here, what a nice guy.' },
  { id: 3, title: 'Flying', subTitle: 'sucks' },
])
</script>
