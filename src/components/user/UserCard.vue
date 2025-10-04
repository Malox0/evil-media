<script setup lang="ts">
import { ref } from 'vue'

const username = ref('alex')
</script>
<template>
  <v-card-item>
    <div class="d-flex align-center">
      <router-link
        :to="`/user/${username}`"
        class="text-decoration-none text-inherit cursor-pointer"
      >
        <v-avatar size="40" class="mr-3">
          <v-img src="https://randomuser.me/api/portraits/men/32.jpg" />
        </v-avatar>
      </router-link>
      <div class="d-flex flex-column justify-center">
        <router-link
          :to="`/user/${username}`"
          class="text-decoration-none text-inherit cursor-pointer"
        >
          <h4 class="ma-0 user-link user-text font-weight-bold">Firstname Lastname</h4>
          <h5 class="ma-0 mt-n1 user-text opacity-70">@{{ username }}</h5>
        </router-link>
      </div>
    </div>
  </v-card-item>
</template>

<style>
.user-text {
  color: rgb(var(--v-theme-on-surface));
}
.user-link:hover {
  text-decoration: underline;
}
</style>
