# PromptHub Implementation Plan

**Status**: Ready for implementation
**Estimated Time**: 5-7 days
**Based on**: prompt-library-spec.md

---

## Prerequisites
- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Set up Supabase project
- [ ] Install dependencies: TanStack Query, Zod

---

## Phase 1: Database & Queries (Day 1)

### 1.1 Database Setup
- [ ] Create tables: `prompts`, `tags`, `prompt_tags`, `votes`, `comments`
- [ ] Enable RLS policies on all tables
- [ ] Create `prompts_with_stats` view
- [ ] Add indexes
- [ ] Generate TypeScript types: `npm run db:types`

### 1.2 Query Functions
- [ ] `/lib/supabase/queries/prompts.ts` - getPrompts, getPromptById, createPrompt, updatePrompt, deletePrompt
- [ ] `/lib/supabase/queries/votes.ts` - toggleVote, hasUserVoted
- [ ] `/lib/supabase/queries/comments.ts` - getComments, createComment, deleteComment
- [ ] `/lib/supabase/queries/tags.ts` - getAllTags, getOrCreateTag
- [ ] `/lib/supabase/queries/users.ts` - getUserProfile

---

## Phase 2: Core Prompts (Day 2-3)

### 2.1 Validation & Types
- [ ] Create Zod schemas in `/features/prompts/types.ts`
- [ ] Define TypeScript types

### 2.2 Basic Components
- [ ] PromptCard component
- [ ] CopyButton component
- [ ] TagChip component

### 2.3 Prompts List Page
- [ ] `/app/(public)/prompts/page.tsx` - browse all prompts
- [ ] CategoryFilter component
- [ ] Basic layout

### 2.4 Prompt Detail Page
- [ ] `/app/(public)/prompts/[id]/page.tsx`
- [ ] Increment view count

### 2.5 Create/Edit Prompts
- [ ] `/app/(auth)/prompts/new/page.tsx` - create form
- [ ] `/app/(auth)/prompts/[id]/edit/page.tsx` - edit form
- [ ] PromptForm component
- [ ] TagInput component
- [ ] Server actions: createPromptAction, updatePromptAction, deletePromptAction

---

## Phase 3: Community Features (Day 4)

### 3.1 Voting System
- [ ] UpvoteButton component
- [ ] toggleVoteAction server action
- [ ] Optimistic UI updates

### 3.2 Comments System
- [ ] CommentsSection component
- [ ] CommentItem component
- [ ] createCommentAction, deleteCommentAction
- [ ] Display on prompt detail page

---

## Phase 4: Search & Filtering (Day 5)

### 4.1 Search
- [ ] SearchBar component
- [ ] Add search to getPrompts query
- [ ] Integrate into prompts list page

### 4.2 Advanced Filters
- [ ] TagFilter component (multi-select)
- [ ] SortDropdown component (Recent, Top Rated, Most Discussed)
- [ ] URL state management for filters

---

## Phase 5: User Profiles (Day 6)

- [ ] `/app/(public)/users/[id]/page.tsx`
- [ ] Display user stats (prompts count, votes received)
- [ ] List user's prompts

---

## Phase 6: Polish & Testing (Day 7)

### 6.1 TanStack Query Hooks
- [ ] Create custom hooks in `/features/prompts/queries.ts`
- [ ] Set up cache invalidation

### 6.2 UX Polish
- [ ] Empty states
- [ ] Loading skeletons
- [ ] Error messages
- [ ] Toast notifications

### 6.3 Responsive Design
- [ ] Mobile-friendly layouts
- [ ] Test all breakpoints

### 6.4 Testing
- [ ] Manual testing checklist from spec
- [ ] Fix bugs
- [ ] Performance check

---

## Implementation Notes

- **Start simple**: Build MVP features first, skip edge cases initially
- **Server Components by default**: Only use `'use client'` when needed (forms, interactions)
- **Follow constitution**: Collocated features, auth patterns, naming conventions
- **Test incrementally**: Test each phase before moving to next

---

## Out of Scope (v1)
- Downvoting
- Favorites/bookmarks
- Notifications
- Admin panel
- Image uploads
- AI suggestions
- Advanced analytics
