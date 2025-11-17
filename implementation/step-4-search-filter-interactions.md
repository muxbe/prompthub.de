# Step 4: Search, Filter & Interactions

**Goal**: Find and interact with prompts
**Time**: 5-7 hours
**Status**: Planning ✅
**Depends on**: Step 1 (Database + Auth), Step 2 (Browse/View), Step 3 (Add Prompts)

---

## 📋 Key Decisions Applied in This Step

Based on decisions documented in `implementation/DECISIONS.md`:

✅ **Search bar location**: On homepage only (below title, not in header)
✅ **Search scope**: Searches title, description, and prompt_text fields
✅ **Sort options**: Popular (like_count), New (created_at), Most Copied (copy_count)
✅ **Category filter**: All, Coding, Business, Writing, Design, Other (+ custom categories)
✅ **Self-liking**: Allowed - users can like their own prompts
✅ **Copy button**: Updates copy_count in database
✅ **Like button**: Real-time toggle with optimistic updates
✅ **Default sort**: New (most recent first)

See full decisions: `implementation/DECISIONS.md`

---

## What We're Building

Add powerful search and filter capabilities to help users discover prompts. Implement interactive features like liking and copying prompts. Users can search by keywords, filter by category, sort by different criteria (Popular, New, Most Copied), and interact with prompts through like and copy buttons.

**User can do after this step**:
- Search prompts by typing keywords (searches title, description, text)
- Filter prompts by category (All, Coding, Business, Writing, Design, Other)
- Sort prompts by Popular, New, or Most Copied
- Like prompts (including their own) - toggle on/off
- Copy prompt text to clipboard with one click
- See like count increase/decrease in real-time
- See copy count increase when copying
- See empty states when no results found
- Experience smooth, responsive interactions

---

## Features Overview

### 1. Search Functionality
**Location**: Homepage only (prominent search bar below page title)
**Searches**: title, description, prompt_text fields
**Behavior**: Real-time search with debouncing (300ms)
**Empty state**: Shows "No prompts found" message

### 2. Category Filter
**Options**: All (default), Coding, Business, Writing, Design, Other
**Custom categories**: Also appear in filter (dynamically added)
**Display**: Tab-style buttons on desktop, dropdown on mobile
**Behavior**: Single-select, updates URL params

### 3. Sort Options
**Options**:
- **New** (default): ORDER BY created_at DESC
- **Popular**: ORDER BY like_count DESC
- **Most Copied**: ORDER BY copy_count DESC

**Display**: Dropdown select on right side of filter bar
**Behavior**: Single-select, updates URL params

### 4. Like Button
**Location**: Bottom right of each prompt card + detail page
**Icon**: Heart (❤️ outline when not liked, filled when liked)
**Behavior**:
- Click to toggle like on/off
- Optimistic UI update (instant feedback)
- Requires authentication (redirect to login if not authenticated)
- Users can like their own prompts ✅
- Real-time count updates

### 5. Copy Button
**Location**: Bottom right of each prompt card + detail page (detail page has larger copy button)
**Icon**: Clipboard (📋)
**Behavior**:
- Click to copy prompt text to clipboard
- Show success toast: "Prompt copied!"
- Increment copy_count in database
- No authentication required
- Works on all devices

---

## Pages We're Modifying

### 1. Homepage (`src/app/page.tsx`)

**What changes**:
- Add search bar below page title
- Add category filter tabs
- Add sort dropdown
- Update PromptCard to include interactive like/copy buttons
- Handle URL query params (?search=, ?category=, ?sort=)
- Show loading states during filtering
- Show empty states when no results

**URL Structure**:
```
/                                    → All prompts, sorted by New
/?search=react                      → Search for "react"
/?category=coding                   → Filter by Coding category
/?sort=popular                      → Sort by Popular
/?search=debug&category=coding      → Search + filter combined
/?category=coding&sort=popular      → Filter + sort combined
```

**Query Params**:
- `search`: String (keyword search)
- `category`: String (coding, business, writing, design, other, or custom)
- `sort`: String (new, popular, most_copied)

---

### 2. Prompt Detail Page (`src/app/prompts/[id]/page.tsx`)

**What changes**:
- Add interactive like button (left side, vertical layout with count)
- Add prominent copy button (in prompt section header)
- Show which AI platforms work with this prompt
- Update like count in real-time when toggled
- Update copy count when copied
- Show "Similar Prompts" section (3 from same category) ✅

**Similar Prompts Logic**:
- Query: 3 random prompts from same category
- Exclude current prompt
- If <3 available, show what exists
- Display as PromptCard components

---

## Components We're Creating

### Search & Filter Components

**1. `src/components/search/SearchBar.tsx`**

**Type**: Client Component ('use client')

**Props**:
- defaultValue?: string (from URL params)
- onSearch: (query: string) => void

**Features**:
- Full-width input field
- Search icon (🔍) on left
- Clear button (×) on right (shows when text exists)
- Debounced input (300ms delay)
- Placeholder: "Search for prompts..."
- Keyboard accessible (Enter to search, Escape to clear)

**State**:
- searchQuery: string
- isSearching: boolean (loading indicator)

**Behavior**:
- User types → Wait 300ms → Trigger search
- Fast typing → Cancel previous search
- Clear button → Reset to empty, show all prompts
- Updates URL params using useRouter

**Styling**:
- Height: 48-56px (prominent)
- Border: 1px solid gray, rounded
- Focus: Blue border
- Full width on mobile
- Max width: 800px on desktop (centered)

---

**2. `src/components/filters/CategoryFilter.tsx`**

**Type**: Client Component

**Props**:
- categories: string[] (all unique categories from database)
- selectedCategory?: string (from URL params)
- onCategoryChange: (category: string) => void

**Features**:
- Tab-style buttons: All, Coding, Business, Writing, Design, Other
- Custom categories appear dynamically
- Selected tab has colored background
- Responsive: Tabs on desktop, dropdown on mobile (<768px)

**State**:
- activeCategory: string (default: "all")

**Behavior**:
- Click category → Filter prompts
- "All" shows everything (removes filter)
- Updates URL params
- Selected state persists on page refresh

**Styling (Desktop)**:
- Horizontal tabs
- Selected: Colored background matching category
- Unselected: Gray text, transparent background
- Hover: Light gray background

**Styling (Mobile)**:
- Dropdown select
- Full width
- Selected shows colored badge

---

**3. `src/components/filters/SortDropdown.tsx`**

**Type**: Client Component

**Props**:
- selectedSort?: string (from URL params)
- onSortChange: (sort: string) => void

**Features**:
- Dropdown select with 3 options
- Options:
  - "New" (default)
  - "Popular"
  - "Most Copied"
- Icon indicates current sort

**State**:
- currentSort: string

**Behavior**:
- Select option → Re-sort prompts
- Updates URL params
- Default: "New"

**Styling**:
- Aligned to right side of filter bar
- Width: 150-180px
- Border: 1px solid gray
- Dropdown arrow icon
- Same height as category tabs

---

### Interaction Components

**4. `src/components/prompts/LikeButton.tsx`**

**Type**: Client Component

**Props**:
- promptId: string
- initialLikeCount: number
- initialIsLiked: boolean (has current user liked this?)
- size?: "small" | "large" (default: "small")
- variant?: "card" | "detail" (layout style)

**Features**:
- Heart icon (❤️)
- Shows like count
- Visual feedback on hover/click
- Optimistic UI updates
- Auth requirement handling

**State**:
- isLiked: boolean
- likeCount: number
- isLoading: boolean (during API call)

**Behavior**:
1. User clicks → Check authentication
2. If not authenticated → Redirect to /login
3. If authenticated:
   - Immediately update UI (optimistic)
   - Call toggleLike server action
   - On success: Keep optimistic state
   - On error: Revert to previous state, show error

**API Call**:
- Server Action: `toggleLikeAction(promptId)`
- Returns: { liked: boolean, likeCount: number }
- Revalidates: Homepage and detail page caches

**Styling (Card variant)**:
- Horizontal layout
- Heart icon + count
- Small size (16px icon)
- Gray when not liked
- Red when liked (#EF4444)

**Styling (Detail variant)**:
- Vertical layout (icon on top, count below)
- Large size (24px icon)
- Left side of page (sticky on scroll)

---

**5. `src/components/prompts/CopyButton.tsx`**

**Type**: Client Component

**Props**:
- promptText: string (the actual prompt to copy)
- promptId: string (to increment copy_count)
- size?: "small" | "large"
- showLabel?: boolean (default: false)

**Features**:
- Clipboard icon (📋)
- Shows "Copy" label (optional)
- Success feedback (toast + icon change)
- Increments copy count in database

**State**:
- isCopied: boolean (for success state)
- isLoading: boolean

**Behavior**:
1. User clicks → Copy to clipboard (navigator.clipboard)
2. Show success feedback:
   - Icon changes to checkmark (✓) for 2 seconds
   - Toast notification: "Prompt copied!"
3. Call `incrementCopyCount` server action (background)
4. Revert icon after 2 seconds

**API Call**:
- Server Action: `incrementCopyCountAction(promptId)`
- Returns: { copyCount: number }
- No authentication required
- Revalidates: Prompt data cache

**Styling (Small)**:
- Icon only, no label
- Size: 16px
- Gray color
- Hover: Darker gray

**Styling (Large)**:
- Icon + "Copy" label
- Size: 20px icon
- Blue background button
- Prominent on detail page

**Clipboard API Fallback**:
- Modern browsers: navigator.clipboard.writeText()
- Legacy fallback: document.execCommand('copy')
- Error handling: Show error toast if copying fails

---

## Server Actions

### File: `src/app/actions/prompt-interactions.ts`

**1. `toggleLikeAction(promptId: string)`**

**Purpose**: Toggle like on/off for a prompt

**Process**:
1. Check authentication (getOptionalUser)
2. If not authenticated → Return error
3. Check if like exists: Query `prompt_likes` table
4. If exists → Delete like (unlike)
5. If not exists → Insert like
6. Update `prompts.like_count` (increment or decrement)
7. Revalidate: `/` and `/prompts/[id]` pages
8. Return: { liked: boolean, likeCount: number }

**Zod Schema**:
```typescript
const toggleLikeSchema = z.object({
  promptId: z.string().uuid(),
});
```

**Security**:
- Requires authentication
- Validates user_id matches auth.uid()
- Uses database transaction (ensure count is accurate)

**Database Operations**:
```sql
-- Check if like exists
SELECT * FROM prompt_likes
WHERE prompt_id = $1 AND user_id = $2

-- If exists, delete
DELETE FROM prompt_likes
WHERE prompt_id = $1 AND user_id = $2

-- If not exists, insert
INSERT INTO prompt_likes (prompt_id, user_id)
VALUES ($1, $2)

-- Update count
UPDATE prompts
SET like_count = like_count + 1 (or - 1)
WHERE id = $1
```

---

**2. `incrementCopyCountAction(promptId: string)`**

**Purpose**: Increment copy count when user copies prompt

**Process**:
1. Validate promptId (UUID)
2. Increment `prompts.copy_count` by 1
3. Revalidate: `/` and `/prompts/[id]` pages
4. Return: { copyCount: number }

**Zod Schema**:
```typescript
const incrementCopySchema = z.object({
  promptId: z.string().uuid(),
});
```

**Security**:
- No authentication required (anyone can copy)
- Rate limiting (optional): Max 1 increment per prompt per IP per minute

**Database Operations**:
```sql
UPDATE prompts
SET copy_count = copy_count + 1
WHERE id = $1
RETURNING copy_count
```

---

## Database Queries

### File: `src/lib/db/queries/prompts.ts`

**Update existing queries to support new features**:

**1. `getPrompts()` - Enhanced**

Add support for search, filter, and sort:

```typescript
export async function getPrompts({
  search,
  category,
  sort = 'new',
  userId,
}: {
  search?: string;
  category?: string;
  sort?: 'new' | 'popular' | 'most_copied';
  userId?: string;
}) {
  let query = supabase
    .from('prompts')
    .select(`
      *,
      users:user_id (email),
      prompt_likes (user_id)
    `);

  // Search filter
  if (search) {
    query = query.or(`
      title.ilike.%${search}%,
      description.ilike.%${search}%,
      prompt_text.ilike.%${search}%
    `);
  }

  // Category filter
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  // Sort
  switch (sort) {
    case 'popular':
      query = query.order('like_count', { ascending: false });
      break;
    case 'most_copied':
      query = query.order('copy_count', { ascending: false });
      break;
    case 'new':
    default:
      query = query.order('created_at', { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error) throw error;

  // Transform data to include isLiked for current user
  return data.map(prompt => ({
    ...prompt,
    isLiked: userId
      ? prompt.prompt_likes.some(like => like.user_id === userId)
      : false,
  }));
}
```

---

**2. `getSimilarPrompts(promptId, category, limit = 3)`**

Get similar prompts from same category:

```typescript
export async function getSimilarPrompts(
  promptId: string,
  category: string,
  limit: number = 3
) {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('category', category)
    .neq('id', promptId) // Exclude current prompt
    .limit(limit)
    .order('created_at', { ascending: false }); // Or random

  if (error) throw error;
  return data;
}
```

---

**3. `getUniqueCategories()`**

Get all unique categories (including custom ones):

```typescript
export async function getUniqueCategories() {
  const { data, error } = await supabase
    .from('prompts')
    .select('category')
    .order('category');

  if (error) throw error;

  // Get unique categories
  const uniqueCategories = [...new Set(data.map(p => p.category))];
  return uniqueCategories;
}
```

---

**4. `getLikeStatus(promptId, userId)`**

Check if user has liked a prompt:

```typescript
export async function getLikeStatus(promptId: string, userId: string) {
  const { data, error } = await supabase
    .from('prompt_likes')
    .select('*')
    .eq('prompt_id', promptId)
    .eq('user_id', userId)
    .single();

  return { isLiked: !!data };
}
```

---

## URL State Management

### Using Next.js searchParams and useRouter

**Server Component (Homepage)**:
```typescript
export default async function HomePage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; sort?: string };
}) {
  const { search, category, sort } = searchParams;

  const prompts = await getPrompts({
    search,
    category,
    sort: sort as 'new' | 'popular' | 'most_copied',
  });

  return (
    <main>
      <SearchBar defaultValue={search} />
      <CategoryFilter selectedCategory={category} />
      <SortDropdown selectedSort={sort} />
      <PromptsGrid prompts={prompts} />
    </main>
  );
}
```

**Client Component (Filters)**:
```typescript
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function CategoryFilter({ selectedCategory }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);

    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    // ... filter UI
  );
}
```

---

## Empty States & Loading States

### Empty State Component

**`src/components/ui/EmptyState.tsx`**

**Props**:
- icon?: ReactNode (default: 📝)
- title: string
- description?: string
- action?: { label: string, href: string }

**Usage**:
```typescript
<EmptyState
  icon="🔍"
  title="No prompts found"
  description="Try different search terms or filters"
  action={{ label: "Clear filters", href: "/" }}
/>
```

**When to show**:
- Search returns no results
- Category filter has no prompts
- User has no liked prompts (future feature)

---

### Loading State Component

**`src/components/ui/LoadingState.tsx`**

**Features**:
- Skeleton cards matching PromptCard layout
- Shimmer animation
- Shows 6 skeleton cards by default

**Usage**:
```typescript
{isLoading ? (
  <LoadingState count={6} />
) : (
  <PromptsGrid prompts={prompts} />
)}
```

---

## Toast Notifications

### Toast Component

**`src/components/ui/Toast.tsx`**

**Library**: Use `sonner` or `react-hot-toast`

**Install**:
```bash
npm install sonner
```

**Setup in Root Layout**:
```typescript
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
```

**Usage in Components**:
```typescript
import { toast } from 'sonner';

// Success
toast.success('Prompt copied!');

// Error
toast.error('Failed to copy prompt');

// Info
toast.info('Please log in to like prompts');
```

---

## Files to Create/Modify

### New Files (9 files)

**Components**:
1. `src/components/search/SearchBar.tsx` - Search input with debouncing
2. `src/components/filters/CategoryFilter.tsx` - Category tabs/dropdown
3. `src/components/filters/SortDropdown.tsx` - Sort options select
4. `src/components/prompts/LikeButton.tsx` - Interactive like button
5. `src/components/prompts/CopyButton.tsx` - Copy to clipboard button
6. `src/components/ui/EmptyState.tsx` - No results component
7. `src/components/ui/LoadingState.tsx` - Skeleton loading

**Server Actions**:
8. `src/app/actions/prompt-interactions.ts` - Like and copy actions

**Queries**:
9. `src/lib/db/queries/prompts.ts` - Enhanced queries (modify existing)

---

### Modified Files (3 files)

**Pages**:
1. `src/app/page.tsx` - Add search/filter UI, integrate new components
2. `src/app/prompts/[id]/page.tsx` - Add like/copy buttons, similar prompts
3. `src/components/prompts/PromptCard.tsx` - Add interactive buttons (from Step 2)

---

## Step-by-Step Implementation Order

### Part 1: Search & Filters (2-3 hours)

**Task 1.1**: Create SearchBar component
- Debounced input
- URL param updates
- Clear button

**Task 1.2**: Create CategoryFilter component
- Tab-style buttons
- Dynamic categories
- Mobile dropdown

**Task 1.3**: Create SortDropdown component
- Three sort options
- Default to "New"

**Task 1.4**: Update homepage to use filters
- Integrate search/filter components
- Handle URL params
- Update getPrompts query

**Task 1.5**: Add loading and empty states
- LoadingState component (skeletons)
- EmptyState component
- Show appropriate states

---

### Part 2: Like Functionality (1.5-2 hours)

**Task 2.1**: Create LikeButton component
- Heart icon with count
- Optimistic UI updates
- Auth check

**Task 2.2**: Create toggleLikeAction
- Database logic
- Transaction handling
- Revalidation

**Task 2.3**: Update PromptCard to include LikeButton
- Add to card footer
- Pass props (promptId, counts, isLiked)

**Task 2.4**: Update detail page with LikeButton
- Large variant (vertical layout)
- Sticky on scroll (optional)

---

### Part 3: Copy Functionality (1-1.5 hours)

**Task 3.1**: Create CopyButton component
- Clipboard API
- Success feedback
- Toast notification

**Task 3.2**: Create incrementCopyCountAction
- Database update
- Revalidation

**Task 3.3**: Integrate CopyButton
- Add to PromptCard (small variant)
- Add to detail page (large variant)

**Task 3.4**: Setup toast notifications
- Install `sonner`
- Add Toaster to root layout
- Test notifications

---

### Part 4: Similar Prompts (0.5-1 hour)

**Task 4.1**: Create getSimilarPrompts query
- Filter by category
- Exclude current prompt
- Limit to 3

**Task 4.2**: Add Similar Prompts section to detail page
- Section header: "Similar Prompts"
- Display as PromptCard grid
- Handle empty state (<3 prompts)

---

### Part 5: Testing & Polish (1 hour)

**Task 5.1**: Test search functionality
- Keyword search works
- Debouncing works (no rapid requests)
- Clear button works

**Task 5.2**: Test filters
- Category filter works
- Sort options work correctly
- Combined filters work (search + category + sort)

**Task 5.3**: Test like button
- Toggle on/off
- Count updates
- Optimistic UI works
- Auth redirect works

**Task 5.4**: Test copy button
- Copies to clipboard
- Toast shows success
- Count increments
- Works on all devices

**Task 5.5**: Test edge cases
- Empty search results
- No prompts in category
- Network errors
- Unauthenticated like attempts

---

## Data Flow

### Search Flow
```
1. User types in SearchBar
   ↓
2. Debounce 300ms
   ↓
3. Update URL params (?search=keyword)
   ↓
4. Server Component re-renders
   ↓
5. getPrompts({ search: "keyword" })
   ↓
6. Database query with ILIKE filter
   ↓
7. Return filtered prompts
   ↓
8. Display results or empty state
```

### Filter Flow
```
1. User clicks category tab
   ↓
2. Update URL params (?category=coding)
   ↓
3. Server Component re-renders
   ↓
4. getPrompts({ category: "coding" })
   ↓
5. Database query with WHERE category = 'coding'
   ↓
6. Return filtered prompts
   ↓
7. Display results
```

### Like Flow
```
1. User clicks like button
   ↓
2. Check authentication → If not, redirect to login
   ↓
3. Optimistically update UI (instant feedback)
   ↓
4. Call toggleLikeAction(promptId)
   ↓
5. Server checks if like exists
   ↓
6. Insert or delete like
   ↓
7. Update like_count in prompts table
   ↓
8. Revalidate page caches
   ↓
9. Return new state { liked, likeCount }
   ↓
10. On success: Keep optimistic state
    On error: Revert to previous state
```

### Copy Flow
```
1. User clicks copy button
   ↓
2. Copy text to clipboard (navigator.clipboard)
   ↓
3. Show success feedback (checkmark + toast)
   ↓
4. Call incrementCopyCountAction(promptId) (background)
   ↓
5. Increment copy_count in database
   ↓
6. Revalidate page caches
   ↓
7. Icon reverts after 2 seconds
```

---

## Styling Guidelines

### Search Bar
- Height: 48-56px (prominent)
- Border: 1px solid #D1D5DB
- Border radius: 8px
- Padding: 12px 16px
- Focus: Blue border (#3B82F6)
- Icon: Gray (#6B7280)
- Full width on mobile, max-width 800px on desktop

### Category Tabs (Desktop)
- Horizontal layout
- Padding: 8px 16px
- Border radius: 6px
- Selected: Colored background (matching category color)
- Unselected: Gray text, transparent
- Hover: Light gray background (#F3F4F6)

### Category Dropdown (Mobile)
- Full width
- Height: 40px
- Border: 1px solid gray
- Shows selected category with colored badge

### Sort Dropdown
- Width: 150-180px
- Height: 40px (matches category tabs)
- Border: 1px solid gray
- Dropdown arrow icon
- Right-aligned

### Like Button (Card)
- Horizontal: ❤️ 24
- Icon size: 16px
- Count font: 14px
- Spacing: 8px between icon and count
- Gray when not liked (#6B7280)
- Red when liked (#EF4444)
- Hover: Slightly darker

### Like Button (Detail)
- Vertical layout (icon on top, count below)
- Icon size: 24px
- Count font: 18px
- Center-aligned
- Sticky position on scroll (optional)

### Copy Button (Small)
- Icon only: 📋
- Size: 16px
- Color: Gray (#6B7280)
- Hover: Darker gray (#4B5563)
- Success: Checkmark ✓ (green)

### Copy Button (Large)
- Button style
- Background: Blue (#3B82F6)
- Text: White
- Padding: 10px 20px
- Icon + "Copy" label
- Hover: Darker blue

### Toast Notifications
- Position: Bottom right
- Duration: 3 seconds
- Success: Green background
- Error: Red background
- Info: Blue background
- Slide-in animation

---

## Testing Checklist

### Search Tests

- [ ] Type in search bar → Results update after 300ms
- [ ] Fast typing → Only last query executes
- [ ] Search "react" → Shows prompts with "react" in title/description/text
- [ ] Search with no results → Shows empty state
- [ ] Clear button → Resets to all prompts
- [ ] Search persists on page refresh (URL param)

---

### Filter Tests

- [ ] Click category → Shows only prompts from that category
- [ ] "All" category → Shows all prompts
- [ ] Custom category appears in filter list
- [ ] Category persists on page refresh
- [ ] Mobile: Category filter shows as dropdown

---

### Sort Tests

- [ ] Sort by "New" → Shows newest first
- [ ] Sort by "Popular" → Shows most liked first
- [ ] Sort by "Most Copied" → Shows most copied first
- [ ] Default sort is "New"
- [ ] Sort persists on page refresh

---

### Like Tests

- [ ] Click like (not authenticated) → Redirects to login
- [ ] Click like (authenticated) → Heart fills, count increases
- [ ] Click liked heart → Heart unfills, count decreases
- [ ] Optimistic update → Instant visual feedback
- [ ] Network error → Reverts to previous state
- [ ] Like own prompt → Allowed, works correctly ✅
- [ ] Like count accurate on refresh

---

### Copy Tests

- [ ] Click copy → Text copied to clipboard
- [ ] Click copy → Shows success toast "Prompt copied!"
- [ ] Click copy → Icon changes to checkmark for 2s
- [ ] Click copy → copy_count increments in database
- [ ] Copy works without authentication
- [ ] Copy works on mobile devices
- [ ] Clipboard API fallback works on older browsers

---

### Similar Prompts Tests

- [ ] Detail page shows 3 similar prompts
- [ ] Similar prompts are from same category
- [ ] Current prompt not included in similar list
- [ ] If <3 prompts in category, shows available
- [ ] If 0 other prompts, section hidden or shows empty state

---

### Combined Tests

- [ ] Search + Category filter → Both filters applied
- [ ] Search + Sort → Sorted search results
- [ ] Category + Sort → Sorted category results
- [ ] Search + Category + Sort → All three work together
- [ ] URL params reflect all active filters
- [ ] Browser back button works correctly

---

### Edge Cases

- [ ] Network error during search → Shows error message
- [ ] Database timeout → Handles gracefully
- [ ] Empty database → Shows appropriate empty state
- [ ] Very long search query → Handles correctly
- [ ] Special characters in search → Properly escaped
- [ ] Rapid like toggling → Handles race conditions
- [ ] Copy on unsupported browser → Shows fallback

---

### Performance Tests

- [ ] Search debouncing prevents excessive requests
- [ ] Optimistic UI provides instant feedback
- [ ] Large result sets load efficiently
- [ ] No layout shift during loading states
- [ ] Smooth animations (no jank)

---

### Mobile Tests

- [ ] Search bar full width on mobile
- [ ] Category filter switches to dropdown (<768px)
- [ ] Like button touch-friendly (44px tap target)
- [ ] Copy button works on mobile
- [ ] Toast notifications visible and dismissible
- [ ] Filters accessible and usable

---

## Common Issues & Solutions

**Issue**: Search executes on every keystroke
- **Solution**: Implement debouncing (300ms delay)

**Issue**: Like count gets out of sync
- **Solution**: Use database transactions, revalidate cache

**Issue**: Optimistic update doesn't revert on error
- **Solution**: Store previous state, use try/catch, revert on error

**Issue**: Copy button doesn't work on iOS Safari
- **Solution**: Use fallback method, ensure HTTPS

**Issue**: Toast notifications overlap
- **Solution**: Use toast library's queue system

**Issue**: URL params get messy with multiple filters
- **Solution**: Use URLSearchParams correctly, preserve existing params

**Issue**: Similar prompts query is slow
- **Solution**: Add database index on category column

---

## Performance Considerations

### Database Optimization

**Indexes needed**:
```sql
-- For search
CREATE INDEX idx_prompts_title_search ON prompts USING gin(to_tsvector('english', title));
CREATE INDEX idx_prompts_description_search ON prompts USING gin(to_tsvector('english', description));

-- For filters
CREATE INDEX idx_prompts_category ON prompts(category);

-- For sorting
CREATE INDEX idx_prompts_like_count ON prompts(like_count DESC);
CREATE INDEX idx_prompts_copy_count ON prompts(copy_count DESC);
CREATE INDEX idx_prompts_created_at ON prompts(created_at DESC);
```

### Frontend Optimization

- **Debouncing**: Prevents excessive API calls during typing
- **Optimistic Updates**: Instant UI feedback, no waiting
- **URL State**: Persists filters, shareable links
- **Lazy Loading**: Load more prompts on scroll (optional)
- **Memoization**: Use React.memo for PromptCard to prevent re-renders

---

## Security Considerations

### Like System
- Server-side validation: User must be authenticated
- Database constraints: Unique (prompt_id, user_id) in prompt_likes
- RLS policies: Users can only insert their own user_id

### Copy System
- No authentication needed (public action)
- Optional rate limiting: Prevent abuse (max X copies per IP per hour)
- No sensitive data exposure

### Search
- Sanitize search input: Prevent SQL injection
- Use parameterized queries (Supabase handles this)
- Limit search query length (max 200 characters)

---

## Integration with Other Steps

**Uses from Step 1**:
- `prompt_likes` table (for like functionality)
- `prompts.like_count` and `prompts.copy_count` columns
- Authentication system
- Database queries

**Uses from Step 2**:
- PromptCard component (add like/copy buttons)
- CategoryBadge component
- Layout patterns

**Uses from Step 3**:
- Prompt creation flow (new prompts appear in search)
- Category system (including custom categories)

**Sets up for Step 5**:
- All core features working (ready to polish)
- Edge cases handled
- Error states implemented
- Ready for final testing and deployment

---

## What's NOT in This Step

This step does NOT include:
- ❌ Advanced search (boolean operators, filters by AI platform)
- ❌ Search suggestions/autocomplete
- ❌ Saved searches
- ❌ Sort by "Trending" (complex algorithm)
- ❌ Filter by AI platform (simple v1, defer to v2)
- ❌ Like notifications
- ❌ Comment system (not planned for v1)
- ❌ Share button (defer to v2)
- ❌ Favorite/bookmark system (defer to v2)

We're building essential search, filter, and interaction features. Advanced features come later!

---

## Dependencies Check

**Before starting Step 4, make sure**:
- ✅ Step 1 is complete (database with `prompt_likes` table)
- ✅ Step 2 is complete (PromptCard, CategoryBadge components)
- ✅ Step 3 is complete (can create prompts)
- ✅ `like_count` and `copy_count` columns exist in `prompts` table
- ✅ Authentication works (can check if user is logged in)

**If not, go back and complete previous steps!**

---

## Notes

- Search uses simple ILIKE (case-insensitive LIKE) - good enough for v1
- Debouncing prevents excessive database queries
- Optimistic UI provides instant feedback (feels faster)
- URL params make filters shareable and bookmarkable
- Like system allows self-liking (simpler, not harmful) ✅
- Copy count helps measure prompt popularity
- Similar prompts use simple category matching (can improve in v2)
- Toast notifications provide clear feedback
- Empty states guide users when no results found
- Loading states prevent layout shift

**Key Decisions Applied in Step 4**:
- ✅ Search on homepage only (not in header)
- ✅ Sort: Popular, New, Most Copied (not Trending)
- ✅ Self-liking allowed
- ✅ Copy increments database counter
- ✅ Similar prompts show 3 from same category

---

**Ready to build Step 4!** 🚀
