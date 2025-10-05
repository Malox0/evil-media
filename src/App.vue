<script setup lang="ts">
import NavBar from '@/components/navigation/NavBar.vue'
import { isLoading } from './routes/index'
</script>

<template>
  <v-app theme="dark">
    <NavBar />
    <v-main>
      <v-progress-linear v-if="isLoading" indeterminate height="3" />

      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
