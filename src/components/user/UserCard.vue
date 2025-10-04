<script setup lang="ts"></script>
<template>
  <v-card-item>
    <div class="d-flex align-center">
      <route-link :to="`/profile/username`" class="cursor-pointer">
        <v-avatar size="40" class="mr-3">
          <v-img src="https://randomuser.me/api/portraits/men/32.jpg" />
        </v-avatar>
      </route-link>
      <div class="d-flex flex-column justify-center">
        <route-link :to="`/profile/username`" class="cursor-pointer">
          <h4 class="ma-0 user-link font-weight-bold">Firstname Lastname</h4>
          <h5 class="ma-0 mt-n1 opacity-70">@username</h5>
        </route-link>
      </div>
    </div>
  </v-card-item>
</template>

<style>
.user-link:hover {
  text-decoration: underline;
}
</style>
