// LikeButtonFull Component
// Client component - full-width like button for detail page

'use client';

import { useState, useEffect, useOptimistic, startTransition } from 'react';
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

    // Optimistic update wrapped in startTransition
    const newIsLiked = !optimisticLiked;
    startTransition(() => {
      setOptimisticLiked(newIsLiked);
      setLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1));
    });

    try {
      const result = await toggleLikeAction(promptId);

      if (!result.success) {
        // Revert optimistic update on error
        startTransition(() => {
          setOptimisticLiked(!newIsLiked);
          setLikeCount((prev) => (newIsLiked ? prev - 1 : prev + 1));
        });

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
      startTransition(() => {
        setOptimisticLiked(!newIsLiked);
        setLikeCount((prev) => (newIsLiked ? prev - 1 : prev + 1));
      });
      alert('Failed to toggle like');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
      title={optimisticLiked ? 'Unlike this prompt' : 'Like this prompt'}
    >
      <svg
        className={`w-5 h-5 ${optimisticLiked ? 'fill-blue-600 text-blue-600' : 'fill-none'}`}
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
      <span>{likeCount}</span>
    </button>
  );
}
