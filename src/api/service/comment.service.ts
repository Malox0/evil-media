import { getFollowerByUsername } from './follower.service'
import { getPostById } from './post.service'
import type { Comment } from '../../types/comment'

export async function getComments(): Promise<Comment[]> {
  const maxi = await getFollowerByUsername('maxi')
  const lara = await getFollowerByUsername('lara')
  const johnny = await getFollowerByUsername('johnny')

  const mockComments: Comment[] = [
    {
      id: 1,
      text: 'This is hilarious, my vscode is fucked up',
      user: 'maximilian',
      likes: 2,
      uploadDate: '5H ago',
      post: await getPostById(1),
      by: maxi,
    },
    {
      id: 2,
      text: 'Oh i cannot go to the gym crybaby',
      user: 'alex',
      likes: 13,
      uploadDate: 'a few seconds ago',
      post: await getPostById(1),
      by: lara,
    },
    {
      id: 3,
      text: 'fuck',
      user: 'fuckinghell',
      likes: 222,
      uploadDate: '2H ago',
      post: await getPostById(1),
      by: johnny,
    },
  ]

  return Promise.resolve(mockComments)
}

export async function getCommentById(id: number): Promise<Comment> {
  const comments = await getComments()
  const comment = comments.find((t) => t.id === id)
  if (!comment) {
    throw new Error(`Comment with id ${id} not found`)
  }
  return Promise.resolve(comment)
}
