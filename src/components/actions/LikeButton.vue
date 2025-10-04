<script setup lang="ts">
import { ref } from 'vue'

const liked = ref(false)
const count = ref(0)
</script>

<template>
  <div class="d-flex align-center">
    <v-btn @click="liked = !liked" icon variant="text">
      <v-icon>{{ liked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
    </v-btn>
  </div>
</template>
