// LikeButtonFull Component
// Client component - full-width like button for detail page
// Note: In Steps 1-3, this shows alert. Step 4 will add toggle functionality

'use client';

type LikeButtonFullProps = {
  promptId: string;
  initialLikes: number;
};

export function LikeButtonFull({ initialLikes }: LikeButtonFullProps) {
  // TODO: Step 4 will add:
  // - useAuth() to check if user is logged in
  // - hasUserLiked() to check if current user liked this
  // - toggleLike() onClick handler
  // - Optimistic UI updates

  const handleClick = () => {
    alert('Like functionality coming in Step 4! Please log in to like prompts.');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
      title="Like this prompt"
    >
      Like ({initialLikes})
    </button>
  );
}
