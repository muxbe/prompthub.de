// LikeButton Component
// Client component - shows like count and handles like/unlike

'use client';

import { useState, useEffect, useOptimistic } from 'react';
import { useRouter } from 'next/navigation';
import { toggleLikeAction, checkUserLikedAction } from '@/actions/likeAction';

export type LikeButtonProps = {
  promptId: string;
  initialLikes: number;
  initialIsLiked?: boolean;
};

export function LikeButton({
  promptId,
  initialLikes,
  initialIsLiked = false,
}: LikeButtonProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user has liked this prompt on mount
  useEffect(() => {
    checkUserLikedAction(promptId).then((result) => {
      setIsLiked(result.isLiked);
    });
  }, [promptId]);

  // Optimistic UI: immediately update UI, then sync with server
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    isLiked,
    (state, newValue: boolean) => newValue
  );

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);

    // Optimistic update
    const newIsLiked = !optimisticLiked;
    setOptimisticLiked(newIsLiked);
    setLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1));

    try {
      const result = await toggleLikeAction(promptId);

      if (!result.success) {
        // Revert optimistic update on error
        setOptimisticLiked(!newIsLiked);
        setLikeCount((prev) => (newIsLiked ? prev - 1 : prev + 1));

        if (result.error) {
          alert(result.error);
        }
      } else {
        // Update with server result
        setIsLiked(result.isLiked);
        router.refresh();
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert optimistic update
      setOptimisticLiked(!newIsLiked);
      setLikeCount((prev) => (newIsLiked ? prev - 1 : prev + 1));
      alert('Failed to toggle like');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
      title={optimisticLiked ? 'Unlike this prompt' : 'Like this prompt'}
    >
      <svg
        className={`w-6 h-6 transition-colors ${
          optimisticLiked
            ? 'text-red-500 fill-red-500'
            : 'text-gray-400 hover:text-red-500'
        }`}
        fill={optimisticLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <div className="text-center mt-1">
        <div className="text-xl font-bold text-gray-900">{likeCount}</div>
        <div className="text-xs text-gray-500">Likes</div>
      </div>
    </button>
  );
}
