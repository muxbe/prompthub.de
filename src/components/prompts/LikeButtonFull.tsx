// LikeButtonFull Component
// Client component - full-width like button for detail page

'use client';

import { useState, useEffect, useOptimistic } from 'react';
import { useRouter } from 'next/navigation';
import { toggleLikeAction, checkUserLikedAction } from '@/actions/likeAction';

type LikeButtonFullProps = {
  promptId: string;
  initialLikes: number;
  initialIsLiked?: boolean;
};

export function LikeButtonFull({
  promptId,
  initialLikes,
  initialIsLiked = false,
}: LikeButtonFullProps) {
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
      className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 ${
        optimisticLiked
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
      title={optimisticLiked ? 'Unlike this prompt' : 'Like this prompt'}
    >
      {optimisticLiked ? 'Unlike' : 'Like'} ({likeCount})
    </button>
  );
}
