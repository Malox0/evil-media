<script setup lang="ts">
import NavBar from '@/components/navigation/NavBar.vue'
import { isLoading } from '@/routes/index.ts'
</script>

<template>
  <v-app theme="dark">
    <NavBar />
    <v-main>
      <v-container>
        <div v-if="isLoading">
          <v-skeleton-loader type="card, text, avatar" />
        </div>
        <div v-else>
          <router-view />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
