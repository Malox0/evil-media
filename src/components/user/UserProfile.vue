<script setup lang="ts">
import { ref, onMounted } from 'vue'

const followed = ref(false)
const publicIp = ref<string>('')

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

      <v-card-title class="font-weight-bold">Firstname Lastname</v-card-title>
      <v-card-text class="opacity-70 mt-n2">@Username</v-card-text>
      <v-btn
        block
        class="mr-2"
        :color="followed ? 'primary' : undefined"
        :variant="followed ? 'flat' : 'outlined'"
        @click="followed = !followed"
        rounded
      >
        {{ followed ? 'Following' : 'Follow' }}</v-btn
      >
      <v-card-text>This is a description</v-card-text>
      <v-card-text class="opacity-70 mb-n4 mt-n4"
        ><v-icon>mdi-calendar-blank-outline</v-icon> Joined January 2025</v-card-text
      >
      <v-card-text class="opacity-70 mb-n4 mt-n4"
        ><v-icon>mdi-map-marker</v-icon> {{ publicIp }}</v-card-text
      >
      <div class="d-flex flex-row justify-space-between">
        <v-card-text class="font-weight-bold">1234</v-card-text>
        <v-card-text class="ml-n6">Followers</v-card-text>
        <v-card-text class="font-weight-bold">20</v-card-text>
        <v-card-text class="ml-n6">Following</v-card-text>
        <v-card-text class="font-weight-bold">3</v-card-text>
        <v-card-text class="ml-n6">Posts</v-card-text>
      </div>
    </div>
  </v-card>
</template>
