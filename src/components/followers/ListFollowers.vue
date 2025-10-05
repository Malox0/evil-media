<script setup lang="ts">
import type { Follower } from '../../types/follower'
import FollowerCard from '../followers/FollowerCard.vue'
import { getFollowers } from '../../api/service/follower.service'
import { onMounted, ref } from 'vue'
import { isLoading } from '../../routes/index'
import { getFollowing } from '../../api/service/follower.service'

const props = defineProps<{
  username?: string
}>()

const followers = ref<Follower[]>()
const errorMessage = ref<string | null>()
onMounted(async () => {
  try {
    followers.value = props.username ? await getFollowing(props.username) : await getFollowers()
  } catch (err: any) {
    errorMessage.value = err.message ?? 'Failed to load posts'
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <v-card v-for="follower in followers" class="mt-4 mb-4 rounded-lg">
    <FollowerCard :follower="follower"> </FollowerCard>
  </v-card>
</template>
