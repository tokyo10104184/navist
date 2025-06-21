// src/features/sns/components/FeedItem.tsx
import Image from 'next/image';
import { FeedPost } from '@/types/sns';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Heart, Repeat, BarChart2, Upload } from 'lucide-react'; // Example icons
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale'; // For Japanese "time ago" format

interface FeedItemProps {
  post: FeedPost;
}

export default function FeedItem({ post }: FeedItemProps) {
  const timeAgo = post.timestamp ? formatDistanceToNow(new Date(post.timestamp), { addSuffix: true, locale: ja }) : '';

  return (
    <Card className="mb-4">
      <CardHeader className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            {post.author.avatarUrl && <AvatarImage src={post.author.avatarUrl} alt={`${post.author.username}'s avatar`} />}
            <AvatarFallback>{post.author.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-sm text-foreground">{post.author.username}</span>
              {post.author.userHandle && (
                <span className="text-xs text-muted-foreground">@{post.author.userHandle}</span>
              )}
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground hover:underline cursor-pointer" title={new Date(post.timestamp).toLocaleString()}>
                {timeAgo}
              </span>
            </div>
            {post.content && <p className="text-sm text-foreground mt-1 whitespace-pre-wrap">{post.content}</p>}
          </div>
        </div>
      </CardHeader>

      {(post.attachmentType === 'study_log' && post.studyLog) && (
        <CardContent className="px-4 pt-0 pb-2">
          <div className="border rounded-lg p-3 bg-muted/50">
            <div className="flex items-center text-sm text-primary">
              <BarChart2 className="h-4 w-4 mr-2" />
              <span className="font-semibold">学習ログ</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
              <p>科目: {post.studyLog.subject}</p>
              <p>時間: {post.studyLog.durationMinutes}分</p>
              {post.studyLog.activity && (
                <p className="pl-2 text-xs">内容: {post.studyLog.activity}</p>
              )}
            </div>
          </div>
        </CardContent>
      )}

      {post.imageUrl && (
         <CardContent className="px-4 pt-0 pb-2">
            <div className="mt-2 border rounded-lg overflow-hidden aspect-video relative"> {/* aspect-video for 16:9 image */}
                <Image src={post.imageUrl} alt="Post image" layout="fill" objectFit="cover" />
            </div>
         </CardContent>
      )}

      <CardFooter className="p-4 pt-2 flex justify-between items-center text-muted-foreground">
        {/* Action buttons - placeholders for now */}
        <Button variant="ghost" size="sm" className="flex items-center space-x-1 hover:text-blue-500">
          <MessageCircle size={16} />
          <span className="text-xs">{post.commentCount || 0}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center space-x-1 hover:text-green-500">
          <Repeat size={16} />
          {/* <span className="text-xs">{post.repostCount || 0}</span> */}
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center space-x-1 hover:text-red-500">
          <Heart size={16} />
          <span className="text-xs">{post.likeCount || 0}</span>
        </Button>
        <Button variant="ghost" size="sm" className="hover:text-blue-500">
          <Upload size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}
