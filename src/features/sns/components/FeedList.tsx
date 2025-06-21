// src/features/sns/components/FeedList.tsx
import { FeedPost } from '@/types/sns';
import FeedItem from './FeedItem';

interface FeedListProps {
  posts: FeedPost[];
  isLoading?: boolean;
  error?: string | null;
}

export default function FeedList({ posts, isLoading, error }: FeedListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Skeleton Loader for FeedItem */}
        {[1, 2, 3].map((n) => (
          <div key={n} className="p-4 border rounded-lg shadow-sm bg-card animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-12 bg-muted rounded mt-2"></div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
                <div className="h-6 w-12 bg-muted rounded"></div>
                <div className="h-6 w-12 bg-muted rounded"></div>
                <div className="h-6 w-12 bg-muted rounded"></div>
                <div className="h-6 w-12 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">エラーが発生しました: {error}</p>;
  }

  if (!posts || posts.length === 0) {
    return <p className="text-muted-foreground text-center py-8">まだ投稿がありません。最初の投稿をしてみましょう！</p>;
  }

  return (
    <div className="space-y-0"> {/* Removed space-y-4 as FeedItem has mb-4 */}
      {posts.map((post) => (
        <FeedItem key={post.postId} post={post} />
      ))}
    </div>
  );
}
