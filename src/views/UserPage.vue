<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import FollowerProfile from '../components/followers/FollowerProfile.vue'
import ListPosts from '../components/posts/ListPosts.vue'
import ListComments from '../components/comments/ListComments.vue'
import ListFollowers from '../components/followers/ListFollowers.vue'

import { type Follower } from '../types/follower'
import { getFollowerByUsername } from '@/api/service/follower.service'
import { isLoading } from '@/routes'

const route = useRoute()
const username = route.params.username as string
const selected = ref<string>('Posts')
const follower = ref<Follower | null>(null)
const errorMessage = ref<string | null>()

onMounted(async () => {
  try {
    follower.value = await getFollowerByUsername(username)
  } catch (err: any) {
    errorMessage.value = err.message ?? `Follower with username ${username} not found`
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <v-btn to="/home" prepend-icon="mdi-arrow-left-thin" class="mb-4"> go back </v-btn>
  <FollowerProfile v-if="follower" :follower="follower" />

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
