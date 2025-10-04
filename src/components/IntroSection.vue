<script setup lang="ts">
function scrollToPosts() {
  const el = document.getElementById('posts-section')
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80 // 80px offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
</script>
<template>
  <div class="mb-16"></div>
  <div class="pt-16 d-flex justify-center align-center">
    <v-chip class="ma-2" color="success" variant="outlined">
      <v-icon>mdi-creation</v-icon>
      <span class="ma-2">Welcome to Evil Media</span>
    </v-chip>
  </div>
  <h1 class="ma-6 text-h3 font-weight-bold text-center">Share Your bad Ideas with the World</h1>
  <p class="text-subtitle-1 text-medium-emphasis text-center">Share your trash.</p>
  <v-btn class="ma-2" size="large">Get Started</v-btn>
  <v-btn class="ma-2 mb-4" size="large" @click="scrollToPosts">Explore Posts</v-btn>

  <v-divider class="mt-16" />
</template>
