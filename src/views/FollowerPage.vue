<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import FollowerProfile from '../components/followers/FollowerProfile.vue'
import ListPosts from '../components/posts/ListPosts.vue'
import ListComments from '../components/comments/ListComments.vue'
import ListFollowers from '../components/followers/ListFollowers.vue'

import type { Follower } from '../types/follower'
import { getFollowerByUsername } from '@/api/service/follower.service'
import { isLoading } from '@/routes'
import { getPosts, getPostsByUsername } from '@/api/service/post.service'
import type { Post } from '@/types/post'
import UserCard from '@/components/user/UserCard.vue'

const route = useRoute()
const username = route.params.username as string
const selected = ref<string>('')
const follower = ref<Follower | null>(null)
const errorMessage = ref<string | null>()
const toggleLoading = ref(false)
const contentLoading = ref(false)
onMounted(async () => {
  contentLoading.value = true
  try {
    follower.value = await getFollowerByUsername(username)
  } catch (err: any) {
    errorMessage.value = err.message ?? `Follower with username ${username} not found`
  } finally {
    isLoading.value = false
  }
  selected.value = 'Posts'
  contentLoading.value = false
})

async function reloadFollower() {
  contentLoading.value = true
  follower.value = await getFollowerByUsername(username)
  contentLoading.value = false
}

const emit = defineEmits<{
  (e: 'reloadFollower'): void
}>()

const posts = ref<Post[]>()
onMounted(async () => {
  try {
    toggleLoading.value = true

    if (username) {
      posts.value = await getPostsByUsername(username)
    } else if (selected) {
      posts.value = await getPosts(selected.value)
    } else {
      posts.value = await getPosts()
    }
  } catch (err: any) {
    errorMessage.value = err.message ?? 'Failed to load posts'
  } finally {
    toggleLoading.value = false
  }
})
</script>
<template>
  <v-btn to="/home" prepend-icon="mdi-arrow-left-thin" class="mb-4"> go back </v-btn>
  <v-skeleton-loader
    v-if="contentLoading"
    class="mx-auto border"
    type="card-avatar, actions"
  ></v-skeleton-loader>
  <FollowerProfile
    v-if="!contentLoading && follower"
    :follower="follower"
    @reloadFollower="reloadFollower"
  />

  <v-skeleton-loader
    v-if="toggleLoading"
    type="paragraph"
    class="d-flex mt-4 mb-4 rounded-lg mx-auto border mb-4 rounded-lg"
  />

  <v-btn-toggle
    v-if="!toggleLoading"
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

  <v-skeleton-loader
    v-if="toggleLoading"
    type="card, actions"
    class="mx-auto border mb-4 rounded-lg"
  />

  <v-skeleton-loader
    v-if="toggleLoading"
    type="card, actions"
    class="mx-auto border mb-4 rounded-lg"
  />

  <ListPosts
    v-if="!toggleLoading && selected === 'Posts'"
    :disableFollowBtn="false"
    :username="follower?.username"
    :posts="posts!"
  />
  <ListComments
    v-if="!toggleLoading && selected === 'Comments'"
    :disable-follow-btn="false"
    :username="follower?.username"
    :variant="'flat'"
  />
  <ListFollowers v-if="!toggleLoading && selected === 'Following'" :username="follower?.username" />
</template>
