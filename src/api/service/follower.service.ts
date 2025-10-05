import type { Follower } from '../../types/follower'

export async function getFollowers(): Promise<Follower[]> {
  const mockFollowers: Follower[] = [
    {
      id: 1,
      username: 'maxi',
      firstname: 'Maximilian',
      lastname: 'Busch',
      followed: true,
      createdAt: '2025-10-01',
      ipAddress: '192.168.0.1',
      followerCount: 20,
      description: 'This is a test',
      followingCount: 11,
      postCount: 4,
    },
    {
      id: 2,
      username: 'johnny',
      firstname: 'Johnny',
      lastname: 'Silverhand',
      followed: false,
      createdAt: '2025-10-02',
      ipAddress: '192.168.0.2',
      followerCount: 20,
      description: 'This is a test',
      followingCount: 11,
      postCount: 4,
    },
    {
      id: 3,
      username: 'lara',
      firstname: 'Lara',
      lastname: 'Croft',
      followed: true,
      createdAt: '2025-10-03',
      ipAddress: '192.168.0.3',
      followerCount: 20,
      description: 'This is a test',
      followingCount: 11,
      postCount: 4,
    },
  ]

  return Promise.resolve(mockFollowers)
}

export async function getFollowerByUsername(username: string): Promise<Follower> {
  const followers = await getFollowers()
  const follower = followers.find((t) => t.username === username)
  if (!follower) {
    throw new Error(`Follower with username ${username} not found`)
  }
  return Promise.resolve(follower)
}
