<script setup lang="ts">
import { type Follower } from '../../types/follower'
import FollowerCard from '../followers/FollowerCard.vue'
import { getFollowers } from '../../api/service/follower.service'
import { onMounted, ref } from 'vue'
import { isLoading } from '../../routes/index'

const followers = ref<Follower[]>()
const errorMessage = ref<string | null>()
onMounted(async () => {
  try {
    followers.value = await getFollowers()
  } catch (err: any) {
    errorMessage.value = err.message ?? 'Failed to load posts'
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <v-card v-for="follower in followers" class="mt-4 mb-4 rounded-lg">
    <FollowerCard :follower="follower"
  /></v-card>
</template>
