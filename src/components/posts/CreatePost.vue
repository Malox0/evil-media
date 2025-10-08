<script setup lang="ts">
import type { CreatePostRequest, Post } from '@/types/post'
import type { Follower } from '@/types/follower'
import { ref, watch } from 'vue'
import { createPost } from '@/api/service/post.service'
import { useRouter } from 'vue-router'

const clientFollower: Follower = {
  id: 1,
  username: 'maxi',
  firstname: 'Maximilian',
  lastname: 'Busch',
  followed: true,
  createdAt: new Date(),
  ipAddress: '192.168.0.1',
  followerCount: 20,
  description: 'This is a test',
  followingCount: 11,
  postCount: 4,
  avatarUrl: `https://ui-avatars.com/api/?name=Maximilian+Busch`,
}
const post = ref<CreatePostRequest>({
  title: '',
  subTitle: '',
  by: clientFollower,
  tags: [],
  imageFiles: [],
})

const tags = ref<string>('')

const images = ref<File[]>([])

function fileRules(files: File[] | File | null) {
  if (!files) return true

  const list = Array.isArray(files) ? files : [files]
  for (const file of list) {
    if (file.size > 10 * 1024 * 1024) {
      return 'Each file must be ≤ 10 MB'
    }
  }
  return true
}

watch(tags, () => {
  if (tags.value?.trim().length > 0) {
    const extractedTags = tags.value
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    post.value.tags = extractedTags.filter((tag, index) => extractedTags.indexOf(tag) === index)

    post.value.tags.forEach((t) => console.log(t))
  } else {
    post.value.tags = []
  }
})

function resetForm() {
  post.value.title = ''
  post.value.subTitle = ''
  tags.value = ''
  images.value = []
  formRef.value?.resetValidation()
}

const formRef = ref()
const formValid = ref(false)

const router = useRouter()

async function submit(isActive: any) {
  formRef.value?.validate().then(async (res: boolean) => {
    if (res) {
      post.value.imageFiles = images.value
      console.log(
        'Post submitted:',
        post.value.title,
        post.value.subTitle,
        post.value.tags,
        post.value.imageFiles,
      )
      const newPost = await createPost(post.value)

      router.push({
        name: 'home',
        hash: `#post-${newPost.id}`,
        query: {
          scroll: 'true',
        },
      })

      isActive.value = false
    }
  })
}
</script>
<template>
  <v-dialog>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        variant="flat"
        color="primary"
        prepend-icon="mdi-square-edit-outline"
        rounded
      >
        Write
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card variant="flat" class="rounded-xl pa-4">
        <v-card-title class="font-weight-bold">Write a Post</v-card-title>

        <v-form ref="formRef" v-model="formValid" lazy-validation>
          <v-textarea
            v-model="post.title"
            rows="1"
            label="Title"
            rounded="lg"
            class="ma-1"
            :rules="[(v) => (!!v && v.trim().length > 0) || 'Title is required']"
          />

          <v-textarea
            v-model="post.subTitle"
            rows="6"
            label="Description"
            rounded="lg"
            :rules="[(v) => (!!v && v.trim().length > 0) || 'Description is required']"
          />

          <v-textarea
            v-model="tags"
            class="mt-2"
            rows="1"
            label="Tags (separate by comma)"
            rounded="lg"
          />

          <v-file-upload
            v-model="images"
            clearable
            multiple
            show-size
            density="compact"
            class="py-2 mt-2"
            accept="image/*"
            :rules="[fileRules]"
            :max-files="5"
          >
            <template v-slot:title>
              <span class="align-center text-white opacity-70">Drag or drop your files here</span>
            </template>
            <template v-slot:item="{ props: itemProps }">
              <v-file-upload-item
                v-bind="itemProps"
                lines="one"
                nav
                density="compact"
                class="py-1 rounded-lg"
              >
                <template v-slot:prepend>
                  <v-avatar size="28"></v-avatar>
                </template>

                <template v-slot:clear="{ props: clearProps }">
                  <v-btn v-bind="clearProps" size="x-small" icon="mdi-close" />
                </template>
              </v-file-upload-item>
            </template>
          </v-file-upload>
        </v-form>

        <v-divider class="ma-2" />

        <v-card-actions>
          <v-spacer />
          <v-btn class="ml-auto" text="Post" :disabled="!formValid" @click="submit(isActive)" />
          <v-btn class="ml-auto" text="Close" @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
      <v-responsive v-if="!isActive.value" @vue:mounted="resetForm" />
    </template>
  </v-dialog>
</template>
