// CategoryBadge Component
// Displays category with icon and color

'use client';

type CategoryBadgeProps = {
  category: string;
  size?: 'small' | 'medium' | 'large';
};

const categoryConfig: Record<
  string,
  { color: string; bgColor: string; icon: string }
> = {
  Coding: {
    color: 'text-blue-700',
    bgColor: 'bg-blue-50 border-blue-200',
    icon: '🔧',
  },
  Business: {
    color: 'text-green-700',
    bgColor: 'bg-green-50 border-green-200',
    icon: '💼',
  },
  Writing: {
    color: 'text-purple-700',
    bgColor: 'bg-purple-50 border-purple-200',
    icon: '✍️',
  },
  Design: {
    color: 'text-gray-700',
    bgColor: 'bg-gray-50 border-gray-200',
    icon: '🎨',
  },
};

const defaultConfig = {
  color: 'text-teal-700',
  bgColor: 'bg-teal-50 border-teal-200',
  icon: '📌',
};

export function CategoryBadge({ category, size = 'medium' }: CategoryBadgeProps) {
  const config = categoryConfig[category] || defaultConfig;

  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-2',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${config.bgColor} ${config.color} ${sizeClasses[size]} font-medium`}
    >
      <span>{config.icon}</span>
      <span>{category}</span>
    </span>
  );
}
