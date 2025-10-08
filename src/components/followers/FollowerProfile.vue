<script setup lang="ts">
import type { EditFollowerRequest, Follower } from '../../types/follower'
import { ref, onMounted } from 'vue'
import { useAuth } from '../../auth/useAuth'
import { editFollower } from '../../api/service/follower.service'
const publicIp = ref<string>('')

interface Props {
  follower: Follower
  disableFollowBtn?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
})

const editRequest = ref<EditFollowerRequest>({ ...props.follower })
const isMe = ref<boolean>(false)
const { follower: clientFollower } = useAuth()

const editProfile = ref<boolean>(false)

onMounted(async () => {
  if (clientFollower.value && clientFollower.value.username === props.follower.username) {
    isMe.value = true
  } else {
    isMe.value = false
  }
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const data = await res.json()
    publicIp.value = data.ip
  } catch (err) {
    throw err
  }
})

const fileInput = ref<HTMLInputElement | null>(null)

function triggerFileInput() {
  fileInput.value?.click()
}

const emit = defineEmits<{
  (e: 'reloadFollower'): void
}>()

function triggerReload() {
  emit('reloadFollower')
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    editRequest.value.avatarUrl = URL.createObjectURL(file)

    console.log('Selected file:', file)
  }
}

function discardChanges() {
  editRequest.value = { ...props.follower }
  editProfile.value = false
}

async function saveChanges() {
  const updated = await editFollower(editRequest.value)
  await triggerReload()
  discardChanges()
}
</script>
<template>
  <v-card class="rounded-lg">
    <div class="ma-8">
      <div class="avatar-wrapper cursor-pointer" @click="triggerFileInput">
        <v-avatar size="120" class="ml-4">
          <v-img
            :src="editProfile ? editRequest?.avatarUrl : follower?.avatarUrl"
            :class="editProfile ? 'opacity-70' : ''"
            cover
          >
            <template #placeholder>
              <v-icon size="120" :class="editProfile ? 'opacity-70' : ''">
                mdi-account-circle
              </v-icon>
            </template>
          </v-img>
        </v-avatar>

        <span v-if="editProfile" class="edit-icon">
          <v-icon v-if="editProfile" icon="mdi-pencil" size="28"> </v-icon>
          New image
        </span>

        <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="onFileChange" />
      </div>

      <v-card-title v-if="!editProfile" class="font-weight-bold"
        >{{ follower.firstname }} {{ follower.lastname }}</v-card-title
      >

      <div class="d-flex w-50">
        <v-textarea
          v-if="editProfile"
          v-model="editRequest.firstname"
          class="mb-n4 mt-4 mr-2"
          rows="1"
          label="Edit firstname..."
          rounded="lg"
          :rules="[() => !!editRequest.firstname || 'Firstname is required']"
        />
        <v-textarea
          v-if="editProfile"
          v-model="editRequest.lastname"
          class="mb-n4 mt-4 mr-2"
          rows="1"
          label="Edit lastname..."
          rounded="lg"
          :rules="[() => !!editRequest.lastname || 'Lastname is required']"
        />
      </div>
      <v-card-text class="opacity-70 mt-n2">@{{ follower.username }}</v-card-text>
      <v-btn
        v-if="!isMe"
        block
        class="mr-2"
        :color="follower.followed ? 'primary' : undefined"
        :variant="follower.followed ? 'flat' : 'outlined'"
        @click="follower.followed = !follower.followed"
        rounded
      >
        {{ follower.followed ? 'Following' : 'Follow' }}</v-btn
      >

      <v-btn
        v-if="!editProfile"
        block
        class="mr-2"
        color="primary"
        variant="outlined"
        @click="editProfile = true"
        rounded
        text="Edit profile"
      >
      </v-btn>
      <v-btn
        v-if="editProfile"
        block
        class="mr-2"
        color="primary"
        variant="outlined"
        @click="discardChanges"
        rounded
        text="Discard changes"
      >
      </v-btn>
      <v-btn
        v-if="editProfile"
        block
        class="mr-2 mt-2"
        color="primary"
        variant="flat"
        @click="saveChanges"
        :disabled="!editRequest.firstname || !editRequest.lastname"
        rounded
        text="Save changes"
      >
      </v-btn>
      <v-card-text v-if="!editProfile"> {{ follower.description }}</v-card-text>
      <v-textarea
        v-if="editProfile"
        v-model="editRequest.description"
        class="mt-4"
        rows="2"
        label="Edit description..."
        rounded="lg"
      />

      <v-card-text class="opacity-70 mb-n4 mt-n4"
        ><v-icon>mdi-calendar-blank-outline</v-icon> Joined {{ follower.createdAt }}</v-card-text
      >
      <v-card-text class="opacity-70 mb-n4 mt-n4"
        ><v-icon>mdi-map-marker</v-icon> {{ publicIp }}</v-card-text
      >
      <div class="d-flex flex-row justify-space-between">
        <div class="d-flex align-center">
          <v-card-text class="font-weight-bold mb-0 pr-1">
            {{ follower.followerCount }}
          </v-card-text>
          <v-card-text class="mb-0">Followers</v-card-text>
        </div>

        <div class="d-flex align-center">
          <v-card-text class="font-weight-bold mb-0 pr-1">
            {{ follower.followingCount }}
          </v-card-text>
          <v-card-text class="mb-0">Following</v-card-text>
        </div>

        <div class="d-flex align-center">
          <v-card-text class="font-weight-bold mb-0 pr-1">
            {{ follower.postCount }}
          </v-card-text>
          <v-card-text class="mb-0">Posts</v-card-text>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.edit-icon {
  position: absolute;
  top: 4px;
  right: -80px;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
}
</style>
