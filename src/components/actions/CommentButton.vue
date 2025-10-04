<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="d-flex align-center">
    <v-btn icon variant="text">
      <v-icon> mdi-chat-outline </v-icon>
    </v-btn>
  </div>
</template>
