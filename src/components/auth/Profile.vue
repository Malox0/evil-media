<script setup lang="ts">
import { useAuth } from '../../auth/useAuth'

const { follower, state, username, login, register, logout } = useAuth()
</script>
<template>
  <v-menu>
    <template #activator="{ props }">
      <v-avatar v-bind="props" class="ma-2 cursor-pointer">
        <v-img v-if="follower" :src="`${follower.avatarUrl}`"> </v-img>
        <template v-else>
          <v-icon size="42">mdi-account-circle</v-icon>
        </template>
      </v-avatar>
    </template>

    <v-list v-if="!state.authenticated" density="compact">
      <v-list-item key="login" value="Login" @click="login">
        <v-icon icon="mdi-login" class="mr-1" />Login</v-list-item
      >
      <v-list-item key="register" value="Register" @click="register"
        ><v-icon icon="mdi-account-plus" class="mr-1" />Register</v-list-item
      >
    </v-list>

    <v-list v-else>
      <router-link
        :to="`/user/${username}`"
        class="text-decoration-none text-inherit cursor-pointer"
      >
        <v-list-item class="user-text">
          <v-icon icon="mdi-account-arrow-right" class="mr-1" />View Profile
        </v-list-item>
      </router-link>
      <v-list-item @click="logout"> <v-icon icon="mdi-logout" class="mr-1" />Logout</v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.user-text {
  color: rgb(var(--v-theme-on-surface));
}
</style>
