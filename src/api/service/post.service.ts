import type { Post } from '@/types/post'
import { getFollowerByUsername } from './follower.service'

export async function getPosts(): Promise<Post[]> {
  const maxi = await getFollowerByUsername('maxi')
  const lara = await getFollowerByUsername('lara')
  const johnny = await getFollowerByUsername('johnny')

  const posts: Post[] = [
    {
      id: 1,
      title: 'Badass Gaming',
      subTitle: 'I shit myself when starting this application',
      by: maxi,
      likes: 2,
      commentsCount: 2,
    },
    {
      id: 2,
      title: 'Johnny',
      subTitle: 'Johnny showed me how to add css here, what a nice guy.',
      by: lara,
      likes: 4,
      commentsCount: 2,
    },
    {
      id: 3,
      title: 'Flying',
      subTitle: 'sucks',
      by: johnny,
      likes: 8,
      commentsCount: 2,
    },
  ]

  if (posts.length === 0) {
    throw new Error('No posts found')
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
