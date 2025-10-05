<script setup lang="ts">
import type { Follower } from '../../types/follower'
import { ref, onMounted } from 'vue'

const publicIp = ref<string>('')

interface Props {
  follower: Follower
  disableFollowBtn?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
})

onMounted(async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const data = await res.json()
    publicIp.value = data.ip
  } catch (err) {
    throw err
  }
})
</script>
<template>
  <v-card>
    <div class="ma-8">
      <v-avatar size="120" class="ml-4">
        <v-img src="https://randomuser.me/api/portraits/men/32.jpg" />
      </v-avatar>

      <v-card-title class="font-weight-bold"
        >{{ follower.firstname }} {{ follower.lastname }}</v-card-title
      >
      <v-card-text class="opacity-70 mt-n2">@{{ follower.username }}</v-card-text>
      <v-btn
        block
        class="mr-2"
        :color="follower.followed ? 'primary' : undefined"
        :variant="follower.followed ? 'flat' : 'outlined'"
        @click="follower.followed = !follower.followed"
        rounded
      >
        {{ follower.followed ? 'Following' : 'Follow' }}</v-btn
      >
      <v-card-text> {{ follower.description }}</v-card-text>
      <v-card-text class="opacity-70 mb-n4 mt-n4"
        ><v-icon>mdi-calendar-blank-outline</v-icon> Joined {{ follower.createdAt }}</v-card-text
      >
      <v-card-text class="opacity-70 mb-n4 mt-n4"
        ><v-icon>mdi-map-marker</v-icon> {{ publicIp }}</v-card-text
      >
      <div class="d-flex flex-row justify-space-between">
        <div class="d-flex align-center">
          <v-card-text class="font-weight-bold mb-0 pr-1">
            {{ follower.followerCount }}
          </v-card-text>
          <v-card-text class="mb-0">Followers</v-card-text>
        </div>

        <div class="d-flex align-center">
          <v-card-text class="font-weight-bold mb-0 pr-1">
            {{ follower.followingCount }}
          </v-card-text>
          <v-card-text class="mb-0">Following</v-card-text>
        </div>

        <div class="d-flex align-center">
          <v-card-text class="font-weight-bold mb-0 pr-1">
            {{ follower.postCount }}
          </v-card-text>
          <v-card-text class="mb-0">Posts</v-card-text>
        </div>
      </div>
    </div>
  </v-card>
</template>
