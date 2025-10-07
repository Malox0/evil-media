import type { CreatePostRequest, Post } from '@/types/post'
import { getFollowerByUsername } from './follower.service'
import { ref } from 'vue'

let mockPosts: Post[] | null = null

async function initPost() {
  if (!mockPosts) {
    const maxi = await getFollowerByUsername('maxi')
    const lara = await getFollowerByUsername('lara')
    const johnny = await getFollowerByUsername('johnny')

    mockPosts = [
      {
        id: 1,
        title: 'Badass Gaming',
        subTitle: 'I shit myself when starting this application',
        by: maxi,
        createdAt: new Date('2025-10-01T10:15:00Z'),
        likes: 2,
        commentsCount: 2,
        tags: ['#gaming', '#ragequit', '#funny'],
        imageUrls: [
          'https://picsum.photos/id/1011/600/400',
          'https://picsum.photos/id/1012/600/400',
        ],
      },
      {
        id: 2,
        title: 'Johnny',
        subTitle: 'Johnny showed me how to add css here, what a nice guy.',
        by: lara,
        likes: 4,
        commentsCount: 2,
        createdAt: new Date('2025-10-01T10:15:00Z'),
        tags: ['#frontend', '#css', '#tutorial'],
        imageUrls: ['https://picsum.photos/id/1025/600/400'],
      },
      {
        id: 3,
        title: 'Flying',
        subTitle: 'sucks',
        by: johnny,
        likes: 8,
        commentsCount: 2,
        createdAt: new Date('2025-10-04T08:45:00Z'),
        tags: ['#travel', '#flying', '#delays'],
        imageUrls: [
          'https://picsum.photos/id/1040/600/400',
          'https://picsum.photos/id/1041/600/400',
        ],
      },
    ]
  }

  return Promise.resolve(mockPosts)
}
export async function getPosts(sortBy?: string): Promise<Post[]> {
  const posts = await initPost()

  if (!posts) {
    return []
  }

  if (posts.length === 0) {
    throw new Error('No posts found')
  }

  if (sortBy) {
    if (sortBy === 'Latest') {
      return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    } else if (sortBy === 'Popular') {
      return posts.sort((a, b) => b.likes - a.likes)
    } else if (sortBy === 'Following') {
      return posts.filter((a) => a.by.followed === true)
    }
  }

  return posts
}

export async function getPostById(id: number): Promise<Post> {
  const posts = await getPosts()
  const post = posts.find((t) => t.id === id)
  if (!post) {
    throw new Error(`Post with id ${id} not found`)
  }

  return Promise.resolve(post)
}

export async function getPostsByUsername(username: string): Promise<Post[]> {
  const mockPosts = await getPosts()

  const posts = mockPosts.filter((t) => t.by.username == username)

  if (!posts) {
    throw new Error(`Failed to load posts for ${username}`)
  }
  return Promise.resolve(posts)
}

export async function updateLikeOnPost(id: number) {
  const post: Post = await getPostById(id)
  const index = mockPosts!.findIndex((p) => p.id === id)
  if (index !== -1) {
    const updated: Post = {
      ...post,
      likes: post.likedByClient ? post.likes - 1 : post.likes + 1,
      likedByClient: !post.likedByClient,
    }

    mockPosts![index] = updated
    return updated
  }
  throw new Error(`Post with id ${id} not found`)
}

export async function createPost(request: CreatePostRequest) {
  //Create Post
  const post: Post = {
    ...request,
    id: mockPosts!.length + 1,
    createdAt: new Date(),
    likes: 0,
    commentsCount: 0,
  }
  mockPosts?.push(post)

  return post
}
