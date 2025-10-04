<script setup lang="ts">
import PostCard from '../../components/posts/PostCard.vue'
import { ref } from 'vue'
import { type Post } from '../../types/post'
import { type Follower } from '../../types/follower'

interface Props {
  disableFollowBtn?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
})

const followers = ref<Follower[]>([
  {
    id: 1,
    username: 'maxi',
    firstname: 'Maximilian',
    lastname: 'Busch',
    followed: true,
    createdOn: '2025-10-01',
    ipAddress: '192.168.0.1',
    followerCount: 20,
    description: 'This is a test',
    followingCount: 11,
    postCount: 4,
  },
  {
    id: 2,
    username: 'johnny',
    firstname: 'Johnny',
    lastname: 'Silverhand',
    followed: false,
    createdOn: '2025-10-02',
    ipAddress: '192.168.0.2',
    followerCount: 20,
    description: 'This is a test',
    followingCount: 11,
    postCount: 4,
  },
  {
    id: 3,
    username: 'lara',
    firstname: 'Lara',
    lastname: 'Croft',
    followed: true,
    createdOn: '2025-10-03',
    ipAddress: '192.168.0.3',
    followerCount: 20,
    description: 'This is a test',
    followingCount: 11,
    postCount: 4,
  },
])

const posts = ref<Post[]>([
  {
    id: 1,
    title: 'Badass Gaming',
    subTitle: 'I shit myself when starting this application',
    by: followers.value[0]!,
    likes: 2,
    commentsCount: 2,
  },
  {
    id: 2,
    title: 'Johnny',
    subTitle: 'Johnny showed me how to add css here, what a nice guy.',
    by: followers.value[1]!,
    likes: 4,
    commentsCount: 2,
  },
  {
    id: 3,
    commentsCount: 2,
    title: 'Flying',
    subTitle: 'sucks',
    by: followers.value[2]!,
    likes: 8,
  },
])
</script>
<template>
  <PostCard v-for="post in posts" :disableFollowBtn="disableFollowBtn" :post="post" />
</template>
