// Centralized category configuration
// All category-related configurations should use this file

export type CategoryKey =
  | 'all'
  | 'არტი და კრეატიული'
  | 'ბიზნესი'
  | 'განათლება'
  | 'დეველოპმენტი'
  | 'თარგმნა'
  | 'კვლევა';

export interface Category {
  value: CategoryKey;
  label: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { value: 'all', label: 'ყველა', icon: '🔍' },
  { value: 'არტი და კრეატიული', label: 'არტი და კრეატიული', icon: '🎨' },
  { value: 'ბიზნესი', label: 'ბიზნესი', icon: '💼' },
  { value: 'განათლება', label: 'განათლება', icon: '📚' },
  { value: 'დეველოპმენტი', label: 'დეველოპმენტი', icon: '💻' },
  { value: 'თარგმნა', label: 'თარგმნა', icon: '🌐' },
  { value: 'კვლევა', label: 'კვლევა', icon: '🔬' },
];

// Get category by value
export function getCategoryByValue(value: string): Category | undefined {
  return CATEGORIES.find(cat => cat.value === value);
}

// Get all categories except "all"
export function getCategoriesForForm(): Category[] {
  return CATEGORIES.filter(cat => cat.value !== 'all');
}
