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
        ><v-icon>mdi-calendar-blank-outline</v-icon> Joined {{ follower.createdOn }}</v-card-text
      >
      <v-card-text class="opacity-70 mb-n4 mt-n4"
        ><v-icon>mdi-map-marker</v-icon> {{ publicIp }}</v-card-text
      >
      <div class="d-flex flex-row justify-space-between">
        <v-card-text class="font-weight-bold">{{ follower.followerCount }}</v-card-text>
        <v-card-text class="ml-n6">Followers</v-card-text>
        <v-card-text class="font-weight-bold">{{ follower.followingCount }}</v-card-text>
        <v-card-text class="ml-n6">Following</v-card-text>
        <v-card-text class="font-weight-bold"> {{ follower.postCount }} </v-card-text>
        <v-card-text class="ml-n6">Posts</v-card-text>
      </div>
    </div>
  </v-card>
</template>
