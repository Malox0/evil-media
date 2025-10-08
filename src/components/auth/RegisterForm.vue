<script setup lang="ts">
import { createFollower } from '@/api/service/follower.service'
import { onMounted, ref } from 'vue'
import type { CreateUserProfileRequest } from '../../types/follower'

const formRef = ref()
const formValid = ref(false)

const followerRequest = ref<CreateUserProfileRequest>({
  username: '',
  firstname: '',
  lastname: '',
  description: '',
  email: '',
  password: '',
  ipAddress: '',
})

const confirmPassword = ref('')

function resetForm() {
  followerRequest.value = {
    username: '',
    firstname: '',
    lastname: '',
    description: '',
    email: '',
    password: '',
    ipAddress: '',
  }
  formRef.value?.resetValidation()
  confirmPassword.value = ''
}

function submit(isActive: any) {
  formRef.value?.validate().then(async (res: boolean) => {
    if (res) {
      console.log('Register:', { ...followerRequest })
      await createFollower(followerRequest.value)
      isActive.value = false
    }
  })
}

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    followerRequest.value.avatarFile = target.files[0]
  }
}

onMounted(async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const data = await res.json()
    followerRequest.value.ipAddress = data.ip
  } catch (err) {
    throw err
  }
})
</script>

<template>
  <v-dialog>
    <template #activator="{ props }">
      <v-list-item v-bind="props" class="justify-start">
        <v-icon icon="mdi-account-plus" class="mr-1" />Register
      </v-list-item>
    </template>

    <template #default="{ isActive }">
      <v-card variant="flat" class="rounded-xl pa-4">
        <v-card-title class="font-weight-bold">Register</v-card-title>

        <v-form ref="formRef" v-model="formValid" lazy-validation>
          <v-text-field
            v-model="followerRequest.username"
            label="Username"
            :rules="[(v) => (!!v && v.trim().length > 0) || 'Username is required']"
            class="ma-1"
            rounded="lg"
          />
          <v-text-field
            v-model="followerRequest.firstname"
            label="Firstname"
            class="mt-2"
            :rules="[(v) => (!!v && v.trim().length > 0) || 'Firstname is required']"
            rounded="lg"
          />
          <v-text-field
            v-model="followerRequest.lastname"
            label="Lastname"
            class="mt-2"
            rounded="lg"
            :rules="[(v) => (!!v && v.trim().length > 0) || 'Lastname is required']"
          />
          <v-textarea
            v-model="followerRequest.description"
            label="Description"
            rows="4"
            rounded="lg"
          />
          <v-text-field
            v-model="followerRequest.email"
            label="E-Mail"
            class="mt-2"
            rounded="lg"
            type="email"
            :rules="[(v) => (!!v && v.trim().length > 0) || 'E-Mail is required']"
          />
          <v-text-field
            v-model="followerRequest.password"
            label="Password"
            class="mt-2"
            rounded="lg"
            type="password"
            :rules="[(v) => (!!v && v.trim().length > 0) || 'Password is required']"
          />
          <v-text-field
            label="Confirm Password"
            v-model="confirmPassword"
            class="mt-2"
            rounded="lg"
            type="password"
            :rules="[(v) => (!!v && v == followerRequest.password) || 'Passwords do not match']"
          />
          <v-file-input
            label="Profile Picture"
            prepend-icon="mdi-camera"
            class="mt-2"
            rounded="lg"
            accept="image/*"
            @change="handleFileChange"
          />
        </v-form>

        <v-divider class="ma-2" />

        <v-card-actions>
          <v-spacer />
          <v-btn text="Register" :disabled="!formValid" @click="submit(isActive)" />
          <v-btn text="Close" @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
      <v-responsive v-if="!isActive.value" @vue:mounted="resetForm" />
    </template>
  </v-dialog>
</template>
