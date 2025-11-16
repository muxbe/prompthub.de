# Prompt Library Specification

**Status**: v1 Implementation
**Author**: Prompthub Team
**Date**: November 14, 2025
**Approver**: Shoto
**Estimated Effort**: 3-4 days (v1 scope)

---

## v1 Scope

**Included in v1:**
- ✅ Browse prompts (homepage with grid)
- ✅ Search and filter by category (Coding, Business, Writing, Design, Other)
- ✅ Sort by: Popular, Trending, Most Used, New
- ✅ View prompt cards (category, title, description, author, likes, copies)
- ✅ View prompt detail page (click card to see full prompt)
- ✅ Login/Registration
- ✅ Add new prompts (with category + AI platform selection)
- ✅ Like prompts
- ✅ Copy prompts to clipboard

**Deferred to v2:**
- ⏳ Edit prompts
- ⏳ Delete prompts

**Not Planned:**
- ❌ Comments system
- ❌ Tags system
- ❌ View counts
- ❌ User Profile Page

---

## Overview

**What**: A community-driven platform where users can discover, share, and rate AI prompts with search and category filtering

**Why**: People struggle with how to effectively interact with AI - they need good prompt examples for coding, business, and other use cases, plus a way to find the best prompts through community curation

**Success Metrics** (v1):
- Users can browse, search, and filter prompts effectively
- Users can submit prompts and receive community feedback through likes
- Top-rated prompts surface through like/copy counts and sort filters
- Users can discover prompts by category and AI platform compatibility

---

## User Story (v1)

**As a** user who works with AI tools
**I want to** discover the best AI prompts through search, categories, and community ratings, and share my own prompts
**So that** I can interact with AI more effectively and learn from the community

### Context
AI tools like ChatGPT, Claude, and others are powerful, but many people don't know how to write effective prompts. A developer might struggle to get good code from AI, or a business person might not know how to ask AI for help with their tasks. They waste time with trial and error, getting poor results because their prompts are vague or poorly structured.

PromptHub solves this by creating a community-driven library where the best prompts rise to the top through likes and copy counts. Users can search for specific use cases, filter by categories like "Coding" or "Business", and sort by popularity metrics. This creates a quality-focused ecosystem where proven prompts are easy to find and users can learn from each other.

Without these features, users face an overwhelming list of prompts with no way to identify quality, can't find specific prompts they need, and can't engage with the community. With PromptHub, the community self-curates the best content through simple like/copy actions, making it easy to find exactly what you need.

---

## User Flow (v1)

### Happy Path - Browse & Search Prompts
1. **Entry Point**: User visits homepage
2. **Search**: User can use search bar to find prompts by keyword, or browse by category
3. **Filter**: User sees filter options:
   - Category (Coding, Business, Writing, Design, Other)
   - Sort by (Popular, Trending, Most Used, New)
4. **View List**: User sees prompt cards with:
   - Category badge
   - Title and description (2 lines)
   - Author name
   - Like count and copy count
5. **Interact**: User can like or copy prompts directly from cards

### Happy Path - Submit Prompt
1. **Entry Point**: User clicks "Add Prompt" button (must be authenticated)
2. **Fill Form**: User fills out form with:
   - Prompt title
   - Prompt description (what it's for)
   - Prompt text (the actual prompt)
   - Category (dropdown: Coding, Business, Writing, Design, Other)
   - AI Platforms (checkboxes: ChatGPT, Claude, Gemini, Other)
3. **Submit**: User clicks "Submit" button
4. **Success State**: User sees success message and prompt appears in homepage grid

### Happy Path - Like Prompt
1. **View Card**: User sees a prompt card on homepage (must be authenticated)
2. **Like**: User clicks like button (heart icon)
3. **Visual Feedback**: Like count increases, button changes to red to show user liked
4. **Undo**: User can click again to remove their like

### Happy Path - Copy Prompt
1. **View Card**: User sees a prompt card on homepage (no authentication required)
2. **Copy**: User clicks copy button (clipboard icon)
3. **Action**: Prompt text is copied to clipboard
4. **Feedback**: Shows "Copied!" tooltip and copy count increases

### Happy Path - View Prompt Details
1. **View Card**: User clicks on a prompt card
2. **Detail Page**: User sees full prompt with all details
3. **Interact**: User can like, copy, open in AI platform, see similar prompts

<!-- v2 FEATURES - DEFERRED -->
<!--

### Happy Path - Edit Prompt (v2)
1. **My Prompts**: User views their own prompt
2. **Edit**: User clicks edit button
3. **Update**: User modifies and saves changes

### Happy Path - Delete Prompt (v2)
1. **My Prompts**: User views their own prompt
2. **Delete**: User clicks delete with confirmation
3. **Remove**: Prompt is removed from system
-->

<!-- NEVER FEATURES - NOT PLANNED -->
<!--
### Comments System (Not Planned)
- Users can comment on prompts
- Reply to comments
- Delete own comments
-->

### Edge Cases (v1)
- **What if**: User is not logged in and tries to submit prompt or like
  - **Behavior**: Redirect to login page with message "Please log in to {action}"

- **What if**: User submits empty or invalid form
  - **Behavior**: Show validation errors inline (e.g., "Title is required", "Prompt text must be at least 20 characters")

- **What if**: No prompts exist in a category
  - **Behavior**: Show empty state with message "No prompts yet in this category. Be the first to add one!"

- **What if**: Search returns no results
  - **Behavior**: Show "No prompts found. Try different keywords or browse by category"

- **What if**: User tries to like their own prompt
  - **Behavior**: Allow it (users can like their own content)

- **What if**: User has already liked a prompt
  - **Behavior**: Show button in "liked" state (red heart), clicking again removes like

- **What if**: Copy button fails
  - **Behavior**: Show error tooltip "Failed to copy. Please try again"

### Error Handling
- **Network failure**: Show toast message "Failed to load prompts. Please try again."
- **Validation errors**: Show field-level errors with red text below inputs
- **Permission denied**: Redirect to login with message

---

## UI/UX Requirements (v1)

### Screens/Components Needed

**v1 Components:**

1. **Homepage / Prompts List Page** (`/`)
   - Purpose: Browse, search, and filter all prompts
   - See: `visual_schemata/homepage.md`
   - Key elements:
     - Header (logo, add button, library, login/user icon)
     - Search bar (prominent, at top)
     - Category filter (All, Coding, Business, Writing, Design, Other)
     - Sort dropdown (Popular, Trending, Most Used, New)
     - Grid of prompt cards (4 columns)
     - "Add Prompt" button (visible only if authenticated)
     - Footer

2. **Prompt Card Component**
   - Purpose: Display prompt preview in grid
   - See: `visual_schemata/prompt-card.md`
   - Key elements:
     - Category badge (with icon)
     - Title (h3, max 2 lines)
     - Description (2 lines, truncated)
     - Divider
     - Author name
     - Like button with count (gray heart)
     - Copy button with count (clipboard icon)

3. **Add Prompt Form** (`/prompts/new`)
   - Purpose: Create new prompt
   - See: `visual_schemata/add-prompt-page.md`
   - Key elements:
     - Two-column layout (form + preview)
     - Title input (required, max 200 chars)
     - Description textarea (required, max 1000 chars)
     - Prompt text textarea (required, max 500 chars)
     - Category dropdown (required: Coding, Business, Writing, Design, Other)
     - AI Platforms checkboxes (optional: ChatGPT, Claude, Gemini, Other)
     - Visibility checkbox
     - Submit and Cancel buttons
     - Live preview on right side

4. **Login Page** (`/login`)
   - Purpose: User authentication
   - See: `visual_schemata/login.md`
   - Key elements:
     - Centered form (1/3 width)
     - Email and password inputs
     - Login button
     - Link to registration page

5. **Registration Page** (`/registration`)
   - Purpose: User signup
   - See: `visual_schemata/registration.md`
   - Key elements:
     - Centered form (1/3 width)
     - Email, password, repeat password inputs
     - Registration button
     - Link to login page

6. **Search Bar Component**
   - Purpose: Full-text search across prompts
   - Key elements:
     - Input field with search icon
     - Clear button when text entered
     - Enter to search

7. **Like Button Component**
   - Purpose: Allow users to like prompts
   - Key elements:
     - Heart icon (gray by default, red when liked)
     - Like count number
     - Visual states: default, liked, hover
     - Auth required tooltip if not logged in

8. **Copy Button Component**
   - Purpose: Copy prompt to clipboard
   - Key elements:
     - Clipboard icon
     - Copy count number
     - Click feedback: "Copied!" tooltip
     - No auth required

9. **Prompt Detail Page** (`/prompts/[id]`)
   - Purpose: Show full prompt with all details
   - See: `visual_schemata/prompt-detail-page.md`
   - Key elements:
     - Two-column layout (2/3 left, 1/3 right)
     - Full title, description, and prompt text
     - Copy, Open in AI, Copy link buttons
     - Like and Library buttons with counts
     - Author information
     - Similar prompts section

<!-- v2 COMPONENTS - DEFERRED -->
<!--
10. **Edit Prompt Form** (`/prompts/[id]/edit`) - v2
    - Similar to add form but for editing
-->

<!-- NEVER COMPONENTS - NOT PLANNED -->
<!--
11. **User Profile Page** (`/users/[id]`) - Not Planned
    - User info and stats
    - List of user's prompts

12. **Comments Section Component** - Not Planned
    - Display and add comments

13. **Tag Components** - Not Planned
    - Tag chips and filtering
-->

### Design Notes
- Clean, simple interface - focus on readability
- Prompt text should be in monospace font for easy reading
- Copy button should provide visual feedback when clicked
- Upvote button should have clear visual states (default, voted, hover)
- Tags should be visually distinct from category badges
- Comments section should be clearly separated from main content
- Mobile responsive - cards should stack on small screens, filters become dropdowns
- Search bar should be prominent and always visible

---

## Technical Implementation

**v1 Database Scope:**
- ✅ `prompts` table (without view_count, INSERT only - no UPDATE/DELETE for v1)
- ✅ `likes` table (renamed from "votes" for clarity)
- ✅ `ai_platforms` table (for ChatGPT, Claude, Gemini, Other)
- ✅ `prompt_platforms` junction table
- ⏳ UPDATE/DELETE policies on prompts (v2)
- ❌ `tags` and `prompt_tags` tables (not planned)
- ❌ `comments` table (not planned)
- ❌ `view_count` field (not planned)

**Note:** The full database schema below includes v2 and unused features for reference. Implement only the v1 tables marked with ✅ above.

### Database Changes

#### New Tables (Reference - Implement only v1 scope above)
```sql
-- 1. Prompts table
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  category TEXT NOT NULL,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view prompts"
  ON prompts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create prompts"
  ON prompts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prompts"
  ON prompts FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own prompts"
  ON prompts FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_prompts_category ON prompts(category);
CREATE INDEX idx_prompts_user_id ON prompts(user_id);
CREATE INDEX idx_prompts_created_at ON prompts(created_at DESC);

-- 2. Tags table
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tags"
  ON tags FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create tags"
  ON tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE INDEX idx_tags_slug ON tags(slug);

-- 3. Prompt Tags (junction table)
CREATE TABLE prompt_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE NOT NULL,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(prompt_id, tag_id)
);

ALTER TABLE prompt_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view prompt tags"
  ON prompt_tags FOR SELECT USING (true);

CREATE POLICY "Users can add tags to own prompts"
  ON prompt_tags FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM prompts
      WHERE id = prompt_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can remove tags from own prompts"
  ON prompt_tags FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM prompts
      WHERE id = prompt_id AND user_id = auth.uid()
    )
  );

CREATE INDEX idx_prompt_tags_prompt_id ON prompt_tags(prompt_id);
CREATE INDEX idx_prompt_tags_tag_id ON prompt_tags(tag_id);

-- 4. Votes table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(prompt_id, user_id)
);

ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view votes"
  ON votes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can vote"
  ON votes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own votes"
  ON votes FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_votes_prompt_id ON votes(prompt_id);
CREATE INDEX idx_votes_user_id ON votes(user_id);

-- 5. Comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_comments_prompt_id ON comments(prompt_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- 6. View to get prompts with aggregated data
CREATE OR REPLACE VIEW prompts_with_stats AS
SELECT
  p.*,
  COUNT(DISTINCT v.id) as vote_count,
  COUNT(DISTINCT c.id) as comment_count,
  COALESCE(
    json_agg(
      DISTINCT jsonb_build_object('id', t.id, 'name', t.name, 'slug', t.slug)
    ) FILTER (WHERE t.id IS NOT NULL),
    '[]'::json
  ) as tags
FROM prompts p
LEFT JOIN votes v ON p.id = v.prompt_id
LEFT JOIN comments c ON p.id = c.prompt_id
LEFT JOIN prompt_tags pt ON p.id = pt.prompt_id
LEFT JOIN tags t ON pt.tag_id = t.id
GROUP BY p.id;
```

#### Type Generation Required?
- [x] Yes - Run `npm run db:types` after schema changes

---

### API/Data Layer

#### Database Queries
Location: `/lib/supabase/queries/prompts.ts`

Functions needed:
```typescript
// Get all prompts with stats (filtered by category, tags, search, sort)
export async function getPrompts(
  supabase: Client,
  options?: {
    category?: string,
    tags?: string[],
    search?: string,
    sortBy?: 'recent' | 'top_rated' | 'most_discussed',
    limit?: number,
    offset?: number
  }
)

// Get single prompt by ID with full details
export async function getPromptById(supabase: Client, id: string)

// Get prompts by user ID
export async function getPromptsByUserId(supabase: Client, userId: string)

// Create new prompt with tags
export async function createPrompt(
  supabase: Client,
  data: CreatePromptData,
  tags: string[]
)

// Update prompt
export async function updatePrompt(
  supabase: Client,
  id: string,
  data: UpdatePromptData,
  tags?: string[]
)

// Delete prompt
export async function deletePrompt(supabase: Client, id: string)

// Increment view count
export async function incrementViewCount(supabase: Client, promptId: string)
```

Location: `/lib/supabase/queries/votes.ts`

```typescript
// Toggle vote (add if doesn't exist, remove if exists)
export async function toggleVote(
  supabase: Client,
  promptId: string,
  userId: string
)

// Check if user has voted
export async function hasUserVoted(
  supabase: Client,
  promptId: string,
  userId: string
)

// Get vote count for prompt
export async function getVoteCount(supabase: Client, promptId: string)
```

Location: `/lib/supabase/queries/comments.ts`

```typescript
// Get comments for a prompt
export async function getCommentsByPromptId(supabase: Client, promptId: string)

// Create comment
export async function createComment(
  supabase: Client,
  data: { prompt_id: string, user_id: string, content: string }
)

// Delete comment
export async function deleteComment(supabase: Client, commentId: string)
```

Location: `/lib/supabase/queries/tags.ts`

```typescript
// Get all tags
export async function getAllTags(supabase: Client)

// Get or create tag by name (auto-create if doesn't exist)
export async function getOrCreateTag(supabase: Client, tagName: string)

// Get popular tags (most used)
export async function getPopularTags(supabase: Client, limit?: number)
```

Location: `/lib/supabase/queries/users.ts`

```typescript
// Get user profile with stats
export async function getUserProfile(supabase: Client, userId: string)
// Returns: { user, total_prompts, total_votes_received }
```

#### TanStack Query Hooks
Location: `/features/prompts/queries.ts`

```typescript
// Fetch all prompts with filters
export function usePrompts(options?: {
  category?: string,
  tags?: string[],
  search?: string,
  sortBy?: 'recent' | 'top_rated' | 'most_discussed'
})

// Fetch single prompt
export function usePrompt(id: string)

// Fetch user's prompts
export function useUserPrompts(userId: string)

// Mutation for creating prompt
export function useCreatePrompt()

// Mutation for updating prompt
export function useUpdatePrompt()

// Mutation for deleting prompt
export function useDeletePrompt()

// Mutation for toggling vote
export function useToggleVote()

// Check if user has voted
export function useHasVoted(promptId: string, userId?: string)

// Fetch comments for prompt
export function useComments(promptId: string)

// Mutation for creating comment
export function useCreateComment()

// Mutation for deleting comment
export function useDeleteComment()

// Fetch all tags
export function useTags()

// Fetch popular tags
export function usePopularTags(limit?: number)

// Fetch user profile
export function useUserProfile(userId: string)
```

---

### Server Actions
Location: `/features/prompts/actions.ts`

```typescript
// Create prompt from form (with tags)
export async function createPromptAction(data: FormData)

// Update prompt from form (with tags)
export async function updatePromptAction(id: string, data: FormData)

// Delete prompt
export async function deletePromptAction(id: string)

// Toggle vote on prompt
export async function toggleVoteAction(promptId: string)

// Create comment
export async function createCommentAction(data: FormData)

// Delete comment
export async function deleteCommentAction(commentId: string)

// Increment view count (called when viewing prompt)
export async function incrementViewAction(promptId: string)
```

---

### Components

#### New Components
Location: `/features/prompts/components/`

1. **PromptCard.tsx**
   - Type: Server Component
   - Purpose: Display prompt preview with stats
   - Props: `{ prompt: PromptWithStats, showAuthor?: boolean }`

2. **PromptForm.tsx**
   - Type: Client Component (form interactions)
   - Purpose: Create/edit prompt form with tag input
   - Props: `{ initialData?: Prompt, initialTags?: Tag[], mode: 'create' | 'edit' }`

3. **PromptDetail.tsx**
   - Type: Server Component
   - Purpose: Full prompt display
   - Props: `{ prompt: PromptWithStats, isOwner: boolean, currentUserId?: string }`

4. **CategoryFilter.tsx**
   - Type: Client Component
   - Purpose: Filter prompts by category
   - Props: `{ currentCategory?: string, onCategoryChange: (cat: string) => void }`

5. **TagFilter.tsx**
   - Type: Client Component
   - Purpose: Multi-select tag filter
   - Props: `{ tags: Tag[], selectedTags: string[], onTagsChange: (tags: string[]) => void }`

6. **SortDropdown.tsx**
   - Type: Client Component
   - Purpose: Sort prompts by recent/top rated/most discussed
   - Props: `{ currentSort: string, onSortChange: (sort: string) => void }`

7. **SearchBar.tsx**
   - Type: Client Component
   - Purpose: Search prompts by keyword
   - Props: `{ onSearch: (query: string) => void, initialQuery?: string }`

8. **UpvoteButton.tsx**
   - Type: Client Component
   - Purpose: Upvote/downvote prompt
   - Props: `{ promptId: string, initialVoteCount: number, hasVoted: boolean }`

9. **CopyButton.tsx**
   - Type: Client Component
   - Purpose: Copy prompt text to clipboard
   - Props: `{ text: string }`

10. **CommentsSection.tsx**
    - Type: Client Component
    - Purpose: Display comments and add new ones
    - Props: `{ promptId: string, currentUserId?: string }`

11. **CommentItem.tsx**
    - Type: Client Component
    - Purpose: Single comment display
    - Props: `{ comment: Comment, canDelete: boolean, onDelete: () => void }`

12. **TagChip.tsx**
    - Type: Client Component
    - Purpose: Display single tag as clickable chip
    - Props: `{ tag: Tag, onClick?: () => void, removable?: boolean }`

13. **TagInput.tsx**
    - Type: Client Component
    - Purpose: Input for adding tags (comma-separated or multi-select)
    - Props: `{ value: string[], onChange: (tags: string[]) => void, suggestions?: Tag[] }`

---

### Routes/Pages

#### New Pages
- `/app/(public)/page.tsx` or `/app/(public)/prompts/page.tsx` - List all prompts with search/filter (public access)
- `/app/(public)/prompts/[id]/page.tsx` - View single prompt with comments (public access)
- `/app/(public)/users/[id]/page.tsx` - User profile page (public access)
- `/app/(auth)/prompts/new/page.tsx` - Create new prompt (auth required)
- `/app/(auth)/prompts/[id]/edit/page.tsx` - Edit prompt (auth + owner only)

---

### Validation

#### Zod Schemas
Location: `/features/prompts/types.ts`

```typescript
import { z } from 'zod';

export const promptCategoryEnum = z.enum([
  'coding',
  'business',
  'writing',
  'design',
  'other'
]);

export const createPromptSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z.string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be less than 500 characters"),
  prompt_text: z.string()
    .min(20, "Prompt must be at least 20 characters"),
  category: promptCategoryEnum,
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").optional(),
});

export const updatePromptSchema = createPromptSchema.partial();

export const createCommentSchema = z.object({
  prompt_id: z.string().uuid(),
  content: z.string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment must be less than 1000 characters"),
});

export const tagSchema = z.object({
  name: z.string()
    .min(1, "Tag name required")
    .max(50, "Tag name too long")
    .regex(/^[a-z0-9-]+$/, "Tag must be lowercase, alphanumeric, and hyphens only"),
});

export type CreatePromptInput = z.infer<typeof createPromptSchema>;
export type UpdatePromptInput = z.infer<typeof updatePromptSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type PromptCategory = z.infer<typeof promptCategoryEnum>;
```

---

### Authentication & Authorization

**Auth Required?**: Partial

- **Viewing prompts/comments/user profiles**: No auth required (public)
- **Creating prompts**: Auth required
- **Editing/deleting prompts**: Auth required + must be owner
- **Voting**: Auth required
- **Commenting**: Auth required
- **Deleting comments**: Auth required + must be owner

**RLS Policies**:

Prompts:
- SELECT: Anyone (public read)
- INSERT: Authenticated users only
- UPDATE: Owner only (user_id = auth.uid())
- DELETE: Owner only (user_id = auth.uid())

Votes:
- SELECT: Anyone (public read for counts)
- INSERT: Authenticated users only
- DELETE: Owner only (user_id = auth.uid())

Comments:
- SELECT: Anyone (public read)
- INSERT: Authenticated users only
- UPDATE: Owner only (user_id = auth.uid())
- DELETE: Owner only (user_id = auth.uid())

Tags/Prompt_Tags:
- SELECT: Anyone (public read)
- INSERT: Authenticated users (tags created automatically when prompt submitted)

---

## Dependencies

### New Packages
- [x] None - Using existing stack (Supabase, Zod, TanStack Query)

### Existing Code Dependencies
- Auth system (for user_id and requireAuth)
- Supabase client setup (already configured)
- UI components (Button, Input, Textarea, Card from /components/ui)

---

## Out of Scope

**v1 Includes:**
- ✅ Browse prompts (homepage grid)
- ✅ Search by keyword
- ✅ Filter by category (Coding, Business, Writing, Design, Other)
- ✅ Sort by: Popular, Trending, Most Used, New
- ✅ View prompt cards (category, title, description, author, likes, copies)
- ✅ View prompt detail page (click card to see full prompt)
- ✅ Login/Registration
- ✅ Add new prompts (with category + AI platforms)
- ✅ Like prompts (heart icon)
- ✅ Copy prompts to clipboard
- ✅ Open prompts in AI platforms (ChatGPT, Claude, etc.)

**Deferred to v2:**
- ⏳ Edit prompts
- ⏳ Delete prompts

**Not Planned (Never):**
- ❌ User Profile Page
- ❌ Comments system
- ❌ Tags system (using categories only)
- ❌ View counts
- ❌ Downvoting (only liking)
- ❌ Favorites/Bookmarks
- ❌ Notifications
- ❌ Admin panel
- ❌ Image uploads
- ❌ AI-generated suggestions
- ❌ Export/Import
- ❌ Social sharing integrations

**Why?**: We're building a simple, focused v1 that solves the core problem: finding and sharing great prompts. The community can curate content through likes and copy counts. We can add complexity based on user feedback after launch.

---

## Testing Strategy (v1)

### Manual Testing Checklist

**Browsing & Search:**
- [ ] Can view prompts homepage without being logged in
- [ ] Can filter prompts by category (All, Coding, Business, Writing, Design, Other)
- [ ] Can search prompts by keyword
- [ ] Can sort by: Popular, Trending, Most Used, New
- [ ] Search returns relevant results
- [ ] Category filter works correctly
- [ ] Empty state shown when no prompts in category

**Prompt Creation:**
- [ ] Login required to access "Add Prompt" page
- [ ] Form validation works (empty fields, min/max lengths)
- [ ] Can select category (required dropdown)
- [ ] Can select AI platforms (optional checkboxes)
- [ ] Live preview updates as user types
- [ ] Can successfully create a new prompt
- [ ] Created prompt appears in homepage grid immediately
- [ ] Success message shown after creation

**Liking:**
- [ ] Can see like counts without logging in
- [ ] Login required to like
- [ ] Can like a prompt
- [ ] Like count increases immediately
- [ ] Heart icon turns red when liked
- [ ] Can remove like by clicking again
- [ ] Cannot double-like (one like per user per prompt)
- [ ] Can like own prompts

**Copying:**
- [ ] Can copy prompt without logging in
- [ ] Click copy button copies prompt text to clipboard
- [ ] "Copied!" tooltip appears
- [ ] Copy count increases
- [ ] Copy works on all prompts

<!-- v2 Testing -->
<!--
**Editing/Deleting (v2):**
- [ ] Only prompt owner sees "Edit" button
- [ ] Can edit own prompt successfully
- [ ] Can delete own prompt
- [ ] Cannot edit/delete other users' prompts
-->

<!-- Never Testing -->
<!--
**Comments (Not Planned):**
- [ ] Can view comments without logging in
- [ ] Login required to post comment
- [ ] Can successfully post a comment
- [ ] Comment appears immediately with correct user/timestamp
- [ ] Can delete own comments
- [ ] Cannot delete other users' comments
- [ ] Empty state when no comments

**User Profiles:**
- [ ] Can view any user's profile without logging in
- [ ] Profile shows correct stats (total prompts, total votes received)
- [ ] Profile shows user's prompts
- [ ] Clicking prompt from profile goes to detail page
- [ ] Empty state when user has no prompts

**General:**
- [ ] Can copy prompt text (shows confirmation)
- [ ] View count increments when viewing prompt
- [ ] Mobile responsive on all pages
- [ ] All links work correctly (tags, categories, user names)

### Edge Cases to Test
- [ ] Empty state when no prompts exist
- [ ] Empty state when no prompts in category/tag
- [ ] Empty state when search returns no results
- [ ] Empty state when user has no prompts
- [ ] Empty state when no comments on prompt
- [ ] Very long prompt text displays correctly
- [ ] Special characters in prompts (code snippets, quotes, emojis)
- [ ] Many tags on one prompt (UI doesn't break)
- [ ] Very long tag names
- [ ] Duplicate tags (should be prevented)
- [ ] Very long comments
- [ ] Rapid clicking vote button (debounce)
- [ ] Submitting empty comment (validation)

---

## Open Questions

1. Should prompts require approval before being public?
   - **Status**: ✅ Decided
   - **Decision**: Auto-publish with report feature
   - **Implementation**: Prompts publish immediately, add "Report" button for community moderation

2. Character limits for prompt_text field?
   - **Status**: ✅ Decided
   - **Decision**: No max limit in database, but UI shows warning if >2000 characters for readability

3. How should search work technically?
   - **Status**: ✅ Decided
   - **Decision**: Start simple, upgrade later
   - **Implementation**: Begin with PostgreSQL ILIKE for MVP, monitor performance, upgrade to full-text search if needed

4. Should users be able to downvote?
   - **Status**: ✅ Decided
   - **Decision**: No - only upvoting for v1 to keep it simple and positive

5. Tag creation: auto-create or predefined list?
   - **Status**: ✅ Decided
   - **Decision**: Auto-create + suggestions
   - **Implementation**: Users can create new tags freely, but system suggests existing/popular tags as they type

---

## Implementation Notes

### For AI Context
When implementing this feature, reference:
- `@lab37-constitution.md` - Follow all standards
- `@prompt-library-spec.md` - This spec
- Existing auth patterns from constitution (requireAuth, getOptionalUser)
- Database query pattern: accept `supabase: Client` as first param

### Breaking Into Steps

**Phase 1: Core Infrastructure (Foundation)**
1. **Database setup** (~2 hours)
   - Create all tables: prompts, tags, prompt_tags, votes, comments
   - Enable RLS and policies for all tables
   - Create indexes and views (prompts_with_stats)
   - Run `npm run db:types`

2. **Query functions** (~3 hours)
   - `/lib/supabase/queries/prompts.ts` - CRUD + filtering/search/sorting
   - `/lib/supabase/queries/votes.ts` - Toggle vote, check voted
   - `/lib/supabase/queries/comments.ts` - CRUD operations
   - `/lib/supabase/queries/tags.ts` - Get/create tags
   - `/lib/supabase/queries/users.ts` - User profile with stats

**Phase 2: Basic Prompt Features (MVP)**
3. **Basic UI components** (~2 hours)
   - PromptCard component (with stats display)
   - CopyButton component
   - Basic layout/styling

4. **Prompts list page** (~2 hours)
   - `/prompts/page.tsx` with data fetching
   - Category filter (basic)
   - Display prompt cards with stats

5. **Prompt detail page** (~1.5 hours)
   - `/prompts/[id]/page.tsx`
   - Display full prompt with tags
   - Copy functionality
   - Increment view count

6. **Create prompt form** (~2 hours)
   - Form with validation (Zod schema)
   - Tag input component
   - Server action for creation
   - Success/error handling

7. **Edit/delete prompts** (~1.5 hours)
   - Edit page with pre-filled form
   - Edit tags
   - Delete action with confirmation

**Phase 3: Community Features (Engagement)**
8. **Voting system** (~2 hours)
   - UpvoteButton component
   - Toggle vote action
   - Optimistic UI updates
   - Check if user has voted

9. **Comments system** (~2.5 hours)
   - CommentsSection component
   - CommentItem component
   - Create comment action
   - Delete comment action
   - Real-time updates (via TanStack Query)

10. **Tags system** (~2 hours)
    - TagChip component
    - TagInput component (multi-select or comma-separated)
    - Tag filtering in prompts list
    - Popular tags display
    - Auto-create tags on prompt submission

**Phase 4: Search & Discovery**
11. **Search functionality** (~2 hours)
    - SearchBar component
    - Search query parameter handling
    - Full-text search in database queries
    - Search results highlighting

12. **Advanced filtering** (~2 hours)
    - TagFilter component (multi-select)
    - SortDropdown component
    - URL state management for filters
    - Combine category + tags + search + sort

**Phase 5: User Profiles**
13. **User profile page** (~2 hours)
    - `/users/[id]/page.tsx`
    - Display user stats (prompts count, votes received)
    - List user's prompts
    - Profile card component

**Phase 6: Polish & Testing**
14. **TanStack Query setup** (~1.5 hours)
    - Create all custom hooks
    - Implement optimistic updates
    - Cache invalidation strategies
    - Loading and error states

15. **Error handling & UX** (~2 hours)
    - Empty states for all scenarios
    - Loading skeletons
    - Toast notifications
    - Form error messages
    - 404 pages

16. **Mobile responsive** (~1.5 hours)
    - Make all pages mobile-friendly
    - Responsive filters (dropdowns on mobile)
    - Card layouts stack properly
    - Test on different screen sizes

17. **Final testing & bug fixes** (~2 hours)
    - Go through testing checklist
    - Fix any bugs found
    - Performance optimization
    - Accessibility check

**Total estimated**: ~32-35 hours (5-7 days for one developer)

---

## Approval

**Reviewed by**: _________________
**Approved by**: Shoto
**Date**: _________________

**Approval Decision**:
- [ ] Approved - Proceed to plan.md generation
- [ ] Needs revision - See comments below
- [ ] Rejected - See reasons below

**Comments**:


---

## Changelog

### v2.0 - November 14, 2025 (Enhanced Version)
- **Added community features**: Upvoting system, comments, user profiles
- **Added discovery features**: Full-text search, tag system, advanced filtering
- **Enhanced database**: 5 tables (prompts, tags, prompt_tags, votes, comments)
- **Added sorting**: Most Recent, Top Rated, Most Discussed
- **Added user profiles**: View user stats and their prompts
- **Improved UX**: Vote counts, comment counts, view counts on cards
- **Estimated effort**: Increased from 2-3 days to 5-7 days

### v1.0 - November 14, 2025 (Initial Draft)
- Initial spec created based on PromptHub vision
- Core features: browse prompts, submit prompts
- Categories: coding, business, writing, design, other
- Basic CRUD operations
