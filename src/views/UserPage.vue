<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import UserProfile from '@/components/user/UserProfile.vue'
import ListPosts from '@/components/posts/ListPosts.vue'

const route = useRoute()
const username = route.params.username as string
const selected = ref<string>('Posts')
</script>
<template>
  <v-btn to="/home" prepend-icon="mdi-arrow-left-thin" @click="MoveBack" class="mb-4">
    go back
  </v-btn>
  <UserProfile />

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

  <ListPosts v-if="selected === 'Posts'" :disableFollowBtn="true" />
</template>
