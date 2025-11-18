// LikeButton Component
// Client component - shows like count
// Note: In Step 2, this is display only. Step 4 will add toggle functionality

'use client';

export type LikeButtonProps = {
  promptId: string;
  initialLikes: number;
};

export function LikeButton({ initialLikes }: LikeButtonProps) {
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
      className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-50 transition-colors"
      title="Like this prompt"
    >
      <svg
        className="w-6 h-6 text-gray-400 hover:text-red-500"
        fill="none"
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
        <div className="text-xl font-bold text-gray-900">{initialLikes}</div>
        <div className="text-xs text-gray-500">Likes</div>
      </div>
    </button>
  );
}
