<script setup lang="ts">
import { type Follower } from '../../types/follower'
import { ref } from 'vue'
import FollowerCard from '../followers/FollowerCard.vue'
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
</script>
<template>
  <v-card v-for="follower in followers" class="mt-4 mb-4 rounded-lg">
    <FollowerCard :follower="follower"
  /></v-card>
</template>
