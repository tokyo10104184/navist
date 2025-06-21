// src/features/sns/components/PostForm.tsx
'use client'; // For form handling with useState

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ImagePlus, BarChartHorizontalBig, Send } from 'lucide-react'; // Icons for attachments and send

interface PostFormProps {
  currentUserAvatarUrl?: string; // Optional URL for the current user's avatar
  currentUserName?: string; // Optional name for avatar fallback
  onSubmit: (content: string) => Promise<void>; // Function to handle post submission
  isLoading?: boolean;
}

export default function PostForm({
  currentUserAvatarUrl,
  currentUserName,
  onSubmit,
  isLoading,
}: PostFormProps) {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("投稿内容を入力してください。");
      return;
    }
    setError(null);
    try {
      await onSubmit(content);
      setContent(''); // Clear textarea after successful submission
    } catch (err) {
      setError("投稿に失敗しました。もう一度お試しください。");
      console.error("Post submission error:", err);
    }
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Avatar className="h-10 w-10 mt-1">
              {currentUserAvatarUrl && <AvatarImage src={currentUserAvatarUrl} alt="Your avatar" />}
              <AvatarFallback>{currentUserName?.charAt(0).toUpperCase() || 'Me'}</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="いま何してる？ (学習の記録や思ったことをつぶやこう！)"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (error) setError(null); // Clear error when user types
              }}
              rows={3}
              className="flex-1 text-sm focus-visible:ring-primary/50"
              maxLength={280} // Twitter-like character limit
            />
          </div>
          {error && <p className="text-xs text-red-500 mt-2 ml-12">{error}</p>}
          <p className="text-xs text-muted-foreground mt-1 ml-12 text-right">{content.length} / 280</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary" aria-label="Add image (not implemented)">
              <ImagePlus size={20} />
            </Button>
            <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary" aria-label="Add study log (not implemented)">
              <BarChartHorizontalBig size={20} />
            </Button>
          </div>
          <Button type="submit" disabled={isLoading || !content.trim()} className="gap-2">
            {isLoading ? '投稿中...' : '投稿する'}
            {!isLoading && <Send size={16}/>}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
