<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import UserProfile from '../components/followers/FollowerProfile.vue'
import ListPosts from '../components/posts/ListPosts.vue'
import ListComments from '../components/comments/ListComments.vue'
import ListFollowers from '../components/followers/ListFollowers.vue'

import { type Follower } from '../types/follower'

const route = useRoute()
const username = route.params.username as string
const selected = ref<string>('Posts')

const followers = ref<Follower[]>([
  {
    id: 1,
    username: 'maxi',
    firstname: 'Maximilian',
    lastname: 'Busch',
    followed: true,
    createdAt: '2025-10-01',
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
    createdAt: '2025-10-02',
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
    createdAt: '2025-10-03',
    ipAddress: '192.168.0.3',
    followerCount: 20,
    description: 'This is a test',
    followingCount: 11,
    postCount: 4,
  },
])

const follower = computed(() => followers.value.find((f: Follower) => f.username === username))
</script>
<template>
  <v-btn to="/home" prepend-icon="mdi-arrow-left-thin" class="mb-4"> go back </v-btn>
  <UserProfile :follower="follower!"></UserProfile>

  <v-btn-toggle
    v-model="selected"
    variant="outlined"
    mandatory
    class="d-flex mt-4 mb-4 rounded-lg"
    group
  >
    <v-btn class="flex-grow-1" value="Posts">Posts</v-btn>
    <v-btn class="flex-grow-1" value="Comments">Comments</v-btn>
    <v-btn class="flex-grow-1" value="Following">Following</v-btn>
  </v-btn-toggle>

  <ListPosts v-if="selected === 'Posts'" :disableFollowBtn="false" />
  <ListComments v-if="selected === 'Comments'" :disable-follow-btn="false" />
  <ListFollowers v-if="selected === 'Following'" />
</template>
