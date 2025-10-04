<script setup lang="ts">
import CommentCard from '../../components/comments/CommentCard.vue'
import { type Comment } from '../../types/comment'

import { ref } from 'vue'
import { type Post } from '../../types/post'
import { type Follower } from '../../types/follower'

interface Props {
  disableFollowBtn: boolean
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
    likes: 3,
    commentsCount: 2,
  },
  {
    id: 2,
    title: 'Johnny',
    subTitle: 'Johnny showed me how to add css here, what a nice guy.',
    by: followers.value[1]!,
    likes: 3,
    commentsCount: 2,
  },
  {
    id: 3,
    commentsCount: 2,
    title: 'Flying',
    likes: 2,
    subTitle: 'sucks',
    by: followers.value[0]!,
  },
])

const comments = ref<Comment[]>([
  {
    id: 1,
    text: 'This is hilarious, my vscode is fucked up',
    user: 'maximilian',
    likes: 2,
    uploadDate: '5H ago',
    post: posts.value[0],
    by: followers.value[2]!,
  },
  {
    id: 2,
    text: 'Oh i cannot go to the gym crybaby',
    user: 'alex',
    likes: 13,
    uploadDate: 'a few seconds ago',
    post: posts.value[1],
    by: followers.value[0]!,
  },
  {
    id: 3,
    text: 'fuck',
    user: 'fuckinghell',
    likes: 222,
    uploadDate: '2H ago',
    post: posts.value[2],
    by: followers.value[1]!,
  },
])
</script>
<template>
  <CommentCard
    v-for="comment in comments"
    :comment="comment"
    :disable-follow-btn="disableFollowBtn"
  />
</template>
