// src/app/api/sns/feed/route.ts
import { NextResponse } from 'next/server';
import type { FeedPost, FeedPostList, UserProfile } from '@/types/sns'; // Assuming UserProfile is also needed for author details

// Mock database for feed posts
let mockFeedPosts: FeedPostList = [
  {
    postId: 'post1',
    author: {
      userId: 'user123',
      username: 'Jules The Learner',
      userHandle: 'jules_learns',
      avatarUrl: 'https://i.pravatar.cc/150?u=jules',
    },
    content: 'Just finished a 2-hour session on Next.js Server Components! Mind blown. 🤯 #learnings #nextjs',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    likeCount: 15,
    commentCount: 3,
  },
  {
    postId: 'post2',
    author: {
      userId: 'user456',
      username: 'Alex The Coder',
      userHandle: 'alex_codes',
      avatarUrl: 'https://i.pravatar.cc/150?u=alex',
    },
    content: 'Spent the morning refactoring some old CSS. Feels good to clean things up! #coding #frontend',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likeCount: 25,
    commentCount: 5,
  },
  {
    postId: 'post3',
    author: {
      userId: 'user123',
      username: 'Jules The Learner',
      userHandle: 'jules_learns',
      avatarUrl: 'https://i.pravatar.cc/150?u=jules',
    },
    content: 'Diving deep into data structures today. Wish me luck! 📚',
    attachmentType: 'study_log',
    studyLog: {
      subject: 'Data Structures',
      durationMinutes: 120,
      activity: 'Chapter 3: Trees',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    likeCount: 30,
    commentCount: 8,
  },
];

// Mock UserProfile for the current user (needed for creating new posts)
const currentUserMock: Pick<UserProfile, 'userId' | 'username' | 'avatarUrl' | 'userHandle'> = {
    userId: 'user123', // Assuming Jules is the one making posts
    username: 'Jules The Learner',
    userHandle: 'jules_learns',
    avatarUrl: 'https://i.pravatar.cc/150?u=jules',
};


export async function GET(request: Request) {
  // In a real app, you might have pagination, filtering, etc.
  // For now, just return all mock posts sorted by newest first.
  const sortedPosts = [...mockFeedPosts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return NextResponse.json(sortedPosts);
}

export async function POST(request: Request) {
  try {
    const { content, attachmentType, studyLog, imageUrl } = await request.json();

    if (!content && !studyLog && !imageUrl) {
      return NextResponse.json({ message: 'Post content cannot be empty' }, { status: 400 });
    }

    const newPost: FeedPost = {
      postId: `post${Date.now()}`, // Simple unique ID
      author: currentUserMock, // In a real app, get this from session/auth
      content: content || '', // Ensure content is at least an empty string if not provided
      attachmentType,
      studyLog,
      imageUrl,
      timestamp: new Date().toISOString(),
      likeCount: 0,
      commentCount: 0,
    };

    mockFeedPosts.unshift(newPost); // Add to the beginning of the array
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
  }
}
