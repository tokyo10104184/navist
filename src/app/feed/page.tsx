// src/app/feed/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import PostForm from '@/features/sns/components/PostForm';
import FeedList from '@/features/sns/components/FeedList';
import { FeedPost, UserProfile } from '@/types/sns'; // Assuming UserProfile might be needed for PostForm's avatar

export default function FeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching current user's minimal profile for PostForm avatar
  // In a real app, this would come from a global store or session
  const [currentUser, setCurrentUser] = useState<Pick<UserProfile, 'avatarUrl' | 'username'> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFeed = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/sns/feed');
      if (!response.ok) {
        throw new Error(`Failed to fetch feed: ${response.statusText}`);
      }
      const data: FeedPost[] = await response.json();
      setPosts(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while fetching feed.");
      }
      console.error("Error fetching feed:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
    // Simulate fetching current user for avatar in PostForm
    // In a real app, this would likely come from a user context/store
    const fetchCurrentUser = async () => {
        try {
            const res = await fetch('/api/sns/profile/me'); // 'me' resolves to user123
            if(res.ok) {
                const profile: UserProfile = await res.json();
                setCurrentUser({ avatarUrl: profile.avatarUrl, username: profile.username });
            }
        } catch (e) {
            console.error("Failed to fetch current user for PostForm", e);
        }
    };
    fetchCurrentUser();
  }, [fetchFeed]);

  const handlePostSubmit = async (content: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/sns/feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }), // Simple text post for now
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to submit post. Server returned an error.' }));
        throw new Error(errorData.message || `Failed to submit post: ${response.statusText}`);
      }
      // const newPost: FeedPost = await response.json();
      // Optimistically update UI or refetch feed
      // For simplicity, just refetch the feed for now
      await fetchFeed();
    } catch (err) {
      console.error("Error submitting post:", err);
      if (err instanceof Error) {
        alert(`投稿エラー: ${err.message}`);
      } else {
        alert("投稿エラー: 不明なエラーが発生しました。");
      }
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto"> {/* Typical max-width for a feed */}
      <h1 className="text-2xl font-bold text-foreground mb-6">フィード</h1>
      <PostForm
        currentUserAvatarUrl={currentUser?.avatarUrl}
        currentUserName={currentUser?.username}
        onSubmit={handlePostSubmit}
        isLoading={isSubmitting}
      />
      <FeedList posts={posts} isLoading={isLoading} error={error} />
    </div>
  );
}
