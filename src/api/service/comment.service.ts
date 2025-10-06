import { getFollowerByUsername } from './follower.service'
import { getPostById } from './post.service'
import type { Comment, CreateCommentRequest } from '../../types/comment'
import type { Post } from '@/types/post'

let mockComments: Comment[] | null = null

async function initComments(): Promise<Comment[]> {
  if (!mockComments) {
    const maxi = await getFollowerByUsername('maxi')
    const lara = await getFollowerByUsername('lara')
    const johnny = await getFollowerByUsername('johnny')

    mockComments = [
      {
        id: 1,
        text: 'This is hilarious, my vscode is fucked up',
        likes: 2,
        uploadDate: '5H ago',
        post: await getPostById(1),
        by: maxi,
      },
      {
        id: 2,
        text: 'Oh i cannot go to the gym crybaby',
        likes: 13,
        uploadDate: 'a few seconds ago',
        post: await getPostById(1),
        by: lara,
      },
      {
        id: 3,
        text: 'fuck',
        likes: 222,
        uploadDate: '2H ago',
        post: await getPostById(1),
        by: johnny,
      },
    ]
  }
  return Promise.resolve(mockComments)
}
export async function getComments(): Promise<Comment[]> {
  const comments: Comment[] = await initComments()
  if (!comments) {
    return []
  }
  return initComments()
}

export async function getCommentById(id: number): Promise<Comment> {
  const comments = await getComments()
  const comment = comments.find((t) => t.id === id)
  if (!comment) {
    throw new Error(`Comment with id ${id} not found`)
  }
  return Promise.resolve(comment)
}

export async function getCommentsByPost(id: number) {
  const mockComments = await getComments()
  const comments = mockComments.filter((t) => t.post.id == id)

  if (comments.length === 0) {
    throw new Error(`Nobody commented on this yet`)
  }
  return Promise.resolve(comments)
}

export async function getCommentsByUsername(username: string) {
  const mockComments = await getComments()
  const comments = mockComments.filter((t) => t.by.username == username)

  if (comments.length === 0) {
    throw new Error(`${username} commented on this yet`)
  }
  return Promise.resolve(comments)
}

export async function createComment(text: string, postId: number) {
  const comments = await getComments()
  const user = await getFollowerByUsername('maxi')
  const post = await getPostById(postId)

  const body: CreateCommentRequest = {
    text: text,
    userId: 'username',
    postId: postId,
  }

  const newComment: Comment = {
    id: comments.length + 1,
    text: body.text,
    likes: 0,
    uploadDate: 'just now',
    post: post,
    by: user,
  }
  comments.push(newComment)

  return newComment
}

export async function updateLikeOnComment(commentId: number, postId: number) {
  const comments: Comment[] = await getCommentsByPost(postId)

  const index = comments.findIndex((t) => t.id === commentId)

  if (index !== -1) {
    const comment: Comment = comments[index]!

    const updated: Comment = {
      ...comment,
      likes: !comment.likedByClient ? comment.likes + 1 : comment.likes - 1,
      likedByClient: !comment.likedByClient,
    }

    const mockIndex = mockComments!.findIndex(
      (t) => t.id == updated.id && t.post.id === updated.post.id,
    )
    mockComments![mockIndex] = updated
    return Promise.resolve(updated)
  }

  throw Error(`Comment of id ${commentId} im post of id ${postId}`)
}
