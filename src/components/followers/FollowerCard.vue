<script setup lang="ts">
import { ref } from 'vue'
import { type Follower } from '../../types/follower'

interface Props {
  follower: Follower
}
const props = withDefaults(defineProps<Props>(), {})
</script>
<template>
  <div class="d-flex flex-row justify-space-between align-center">
    <v-card-item>
      <div class="d-flex align-center">
        <router-link
          :to="`/user/${follower.username}`"
          class="text-decoration-none text-inherit cursor-pointer"
        >
          <v-avatar size="40" class="mr-3">
            <v-img src="https://randomuser.me/api/portraits/men/32.jpg" />
          </v-avatar>
        </router-link>
        <div class="d-flex flex-column justify-center">
          <router-link
            :to="`/user/${follower.username}`"
            class="text-decoration-none text-inherit cursor-pointer"
          >
            <h4 class="ma-0 user-link user-text font-weight-bold">
              {{ follower.firstname }} {{ follower.lastname }}
            </h4>
            <h5 class="ma-0 mt-n1 user-text opacity-70">@{{ follower.username }}</h5>
          </router-link>
        </div>
      </div>
    </v-card-item>

    <v-btn
      class="mr-2"
      :color="follower.followed ? 'primary' : undefined"
      :variant="follower.followed ? 'flat' : 'outlined'"
      @click="follower.followed = !follower.followed"
      rounded
    >
      {{ follower.followed ? 'Following' : 'Follow' }}</v-btn
    >
  </div>
</template>

<style>
.user-text {
  color: rgb(var(--v-theme-on-surface));
}
.user-link:hover {
  text-decoration: underline;
}
</style>
