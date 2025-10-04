<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const username = route.params.username as string
</script>
<template>
  <p>Welcome {{ username }}</p>
</template>
