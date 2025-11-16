# PromptHub - Page Schemas & Wireframes

**Version**: 1.0
**Date**: November 14, 2025
**Purpose**: Visual reference for all pages before implementation

---

## Table of Contents
1. [Prompts List Page](#prompts-list-page)
2. [Prompt Detail Page](#prompt-detail-page)
3. [Create Prompt Page](#create-prompt-page)
4. [Edit Prompt Page](#edit-prompt-page)
5. [User Profile Page](#user-profile-page)
6. [Component Hierarchy](#component-hierarchy)

---

## 1. Prompts List Page

**Route**: `/prompts` or `/` (homepage)
**Auth**: Public (no login required)

### Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR                                    [Login] [Sign Up]     │
│  PromptHub Logo                                                  │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  🔍 [Search for prompts...]                    [+ Add Prompt]   │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  [All] [Coding] [Business] [Writing] [Design] [Other]           │ ← Categories
│                                                                   │
│  Tags: [× python] [× react] [+ add filter]    Sort: [Top ▼]    │ ← Filters
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  ┌────────────────────┐  ┌────────────────────┐                 │
│  │ How to debug React │  │ Email templates    │                 │
│  │ components         │  │ for sales          │                 │
│  │                    │  │                    │                 │
│  │ Fix React bugs...  │  │ Professional...    │                 │
│  │                    │  │                    │                 │
│  │ [coding] [react]   │  │ [business] [email] │                 │
│  │                    │  │                    │                 │
│  │ ↑ 24  💬 5  👁 120 │  │ ↑ 18  💬 3  👁 89  │                 │
│  │ @john_dev          │  │ @sarah_sales       │                 │
│  │ 2 days ago         │  │ 1 week ago         │                 │
│  └────────────────────┘  └────────────────────┘                 │
│                                                                   │
│  ┌────────────────────┐  ┌────────────────────┐                 │
│  │ Python script for  │  │ Creative writing   │                 │
│  │ data analysis      │  │ prompts            │                 │
│  │ ...                │  │ ...                │                 │
│  └────────────────────┘  └────────────────────┘                 │
│                                                                   │
│  [Load More] or [← 1 2 3 4 →]                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Layout Structure

```
Page Layout
├── Navbar
│   ├── Logo (Link to /)
│   ├── Navigation links
│   └── Auth buttons (Login/Sign Up) OR User menu
│
├── Search Section
│   ├── SearchBar component
│   └── "Add Prompt" button (if authenticated)
│
├── Filters Section
│   ├── CategoryFilter component (tabs)
│   ├── TagFilter component (multi-select chips)
│   └── SortDropdown component
│
└── Prompts Grid
    ├── PromptCard (repeated)
    │   ├── Title
    │   ├── Description preview
    │   ├── Tag chips
    │   ├── Stats (upvotes, comments, views)
    │   ├── Author (clickable)
    │   └── Timestamp
    │
    └── Pagination or Load More
```

### Data Requirements

```typescript
// Page needs to fetch:
- prompts: PromptWithStats[]
- popularTags: Tag[]
- userVotedPromptIds: string[] (if authenticated)

// URL Query Params:
?category=coding
&tags=python,react
&search=debug
&sort=top_rated
&page=1
```

### States

**Loading State**:
```
┌────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ ← Skeleton cards
│ ▓▓▓▓▓▓             │
│ ▓▓▓                │
└────────────────────┘
```

**Empty State**:
```
┌─────────────────────────────┐
│         📝                   │
│   No prompts found          │
│   Try different filters     │
│   or [Create First Prompt]  │
└─────────────────────────────┘
```

**Error State**:
```
┌─────────────────────────────┐
│         ⚠️                   │
│   Failed to load prompts    │
│   [Try Again]               │
└─────────────────────────────┘
```

---

## 2. Prompt Detail Page

**Route**: `/prompts/[id]`
**Auth**: Public (viewing), Auth required (voting, commenting)

### Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                          │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to prompts                                              │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  ┌──┐  How to debug React components effectively                │
│  │↑ │                                                            │
│  │24│  [Coding]  #react  #debugging  #javascript                │
│  └──┘                                                            │
│                                                                   │
│  By @john_dev  •  Posted 2 days ago  •  👁 120 views            │
│  [Edit] [Delete] ← (only if owner)                              │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│  Description                                                     │
│  ─────────────                                                   │
│  This prompt helps you debug React components by analyzing      │
│  the component lifecycle and common pitfalls. Perfect for...    │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│  Prompt                                                   [Copy] │
│  ──────                                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ I'm having issues with my React component:              │   │
│  │                                                          │   │
│  │ [Component code here]                                   │   │
│  │                                                          │   │
│  │ Please analyze this component and:                      │   │
│  │ 1. Identify potential bugs                              │   │
│  │ 2. Check for performance issues                         │   │
│  │ 3. Suggest improvements                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│  💬 Comments (5)                                                 │
│  ───────────────                                                 │
│                                                                   │
│  [Add a comment...]                              [Post Comment] │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ @sarah_dev  •  1 day ago                         [Delete]│   │
│  │ This is really helpful! I used it to find a bug in...   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ @mike_coder  •  2 days ago                              │   │
│  │ Great prompt. Could you add a section about hooks?      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Layout Structure

```
Page Layout
├── Navbar
│
├── Breadcrumb / Back button
│
├── Prompt Header
│   ├── UpvoteButton (left side)
│   ├── Title
│   ├── Category badge + Tag chips
│   ├── Metadata (author, date, views)
│   └── Action buttons (Edit/Delete if owner, Report)
│
├── Description Section
│   └── Full description text
│
├── Prompt Section
│   ├── Section header with Copy button
│   └── Prompt text (code block style, monospace)
│
└── Comments Section
    ├── Comment count header
    ├── Add comment form (if authenticated)
    │   ├── Textarea
    │   └── Submit button
    └── Comments list
        └── CommentItem (repeated)
            ├── Author + timestamp
            ├── Comment text
            └── Delete button (if owner)
```

### Data Requirements

```typescript
// Page needs to fetch:
- prompt: PromptWithStats (includes tags, vote count, comment count)
- comments: Comment[] (with user info)
- currentUser: User | null
- hasVoted: boolean (if user logged in)

// Server Actions needed:
- incrementViewAction(promptId)
- toggleVoteAction(promptId)
- createCommentAction(formData)
- deleteCommentAction(commentId)
```

### States

**Loading**: Skeleton for entire page
**Error**: Prompt not found (404)
**Auth Required**: Show modal/redirect for vote/comment actions

---

## 3. Create Prompt Page

**Route**: `/prompts/new`
**Auth**: Required (redirect to /login if not authenticated)

### Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                          │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to prompts                                              │
│                                                                   │
│  Create New Prompt                                               │
│  ══════════════════                                              │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Title *                                                    │ │
│  │ [How to debug React components]                           │ │
│  │ 0/200 characters                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Description *                                              │ │
│  │ [This prompt helps you debug React components by...]      │ │
│  │                                                            │ │
│  │                                                            │ │
│  │ 45/500 characters (min 20)                                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Prompt Text *                                              │ │
│  │ [I'm having issues with my React component...]            │ │
│  │                                                            │ │
│  │                                                            │ │
│  │                                                            │ │
│  │                                                            │ │
│  │ 120 characters (min 20)                                    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Category *                                                      │
│  [Coding        ▼]                                               │
│                                                                   │
│  Tags (optional)                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ [× react] [× debugging] [× javascript]                    │ │
│  │ [Type to add tags...]                                      │ │
│  │                                                            │ │
│  │ Suggestions: python, nodejs, typescript                   │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                   │
│  [Cancel]                                    [Create Prompt]    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Layout Structure

```
Page Layout
├── Navbar
│
├── Breadcrumb / Back button
│
├── Page Header
│   └── "Create New Prompt" title
│
└── PromptForm component
    ├── Title input
    │   ├── Input field
    │   └── Character counter
    │
    ├── Description textarea
    │   ├── Textarea field
    │   └── Character counter
    │
    ├── Prompt text textarea
    │   ├── Textarea field (large)
    │   └── Character counter
    │
    ├── Category dropdown
    │   └── Select (Coding, Business, Writing, Design, Other)
    │
    ├── Tags input
    │   ├── TagInput component
    │   ├── Selected tags (removable chips)
    │   └── Tag suggestions
    │
    └── Action buttons
        ├── Cancel (go back)
        └── Submit (create prompt)
```

### Data Requirements

```typescript
// Form schema (Zod):
{
  title: string (1-200 chars)
  description: string (20-500 chars)
  prompt_text: string (min 20 chars)
  category: 'coding' | 'business' | 'writing' | 'design' | 'other'
  tags: string[] (optional, max 10)
}

// Page needs:
- popularTags: Tag[] (for suggestions)
- currentUser: User (from auth)

// Server Action:
- createPromptAction(formData) → redirects to /prompts/[id]
```

### States

**Idle**: Form ready to fill
**Validating**: Show field errors inline
**Submitting**: Loading spinner on button, disable inputs
**Success**: Redirect to new prompt detail page
**Error**: Show error toast, keep form data

---

## 4. Edit Prompt Page

**Route**: `/prompts/[id]/edit`
**Auth**: Required + Must be owner

### Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                          │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to prompt                                               │
│                                                                   │
│  Edit Prompt                                                     │
│  ═══════════                                                     │
│                                                                   │
│  [Same form layout as Create, but pre-filled with existing data]│
│                                                                   │
│  Title: [How to debug React components]                         │
│  Description: [This prompt helps...]                            │
│  Prompt Text: [I'm having issues...]                            │
│  Category: [Coding ▼]                                            │
│  Tags: [× react] [× debugging]                                  │
│                                                                   │
│  [Cancel]                                    [Save Changes]      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Layout Structure

Same as Create Prompt Page, but:
- Pre-filled with existing prompt data
- Button says "Save Changes" instead of "Create Prompt"
- Must verify user is owner before showing page

### Data Requirements

```typescript
// Page needs to fetch:
- prompt: Prompt (to pre-fill form)
- currentUser: User
- Verify: currentUser.id === prompt.user_id

// Server Action:
- updatePromptAction(id, formData) → redirects to /prompts/[id]
```

---

## 5. User Profile Page

**Route**: `/users/[id]`
**Auth**: Public (anyone can view)

### Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                          │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to prompts                                              │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  ┌──────┐                                                        │
│  │  JD  │  @john_dev                                            │
│  └──────┘  Joined March 2025                                    │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐                             │
│  │  Prompts     │  │  Upvotes     │                             │
│  │     12       │  │     247      │                             │
│  └──────────────┘  └──────────────┘                             │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Prompts by @john_dev                                           │
│  ─────────────────────                                          │
│                                                                   │
│  ┌────────────────────┐  ┌────────────────────┐                 │
│  │ How to debug React │  │ Python data clean  │                 │
│  │ components         │  │ automation         │                 │
│  │ [coding] [react]   │  │ [coding] [python]  │                 │
│  │ ↑ 24  💬 5         │  │ ↑ 18  💬 3         │                 │
│  └────────────────────┘  └────────────────────┘                 │
│                                                                   │
│  [Load More]                                                     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Layout Structure

```
Page Layout
├── Navbar
│
├── Breadcrumb / Back button
│
├── User Profile Header
│   ├── Avatar (initials or image)
│   ├── Username
│   ├── Join date
│   └── Stats cards
│       ├── Total prompts
│       └── Total upvotes received
│
└── User's Prompts Section
    ├── Section header ("Prompts by @username")
    └── Prompts grid
        └── PromptCard (repeated)
```

### Data Requirements

```typescript
// Page needs to fetch:
- user: User (basic info)
- userStats: {
    total_prompts: number
    total_votes_received: number
  }
- userPrompts: PromptWithStats[]
```

### States

**Loading**: Skeleton for profile
**Empty**: "No prompts yet" (if user has no prompts)
**Error**: User not found (404)

---

## 6. Component Hierarchy

### Component Tree

```
App
├── RootLayout
│   ├── Navbar
│   │   ├── Logo
│   │   ├── Navigation
│   │   └── AuthButtons / UserMenu
│   │
│   └── Pages
│       │
│       ├── PromptsListPage
│       │   ├── SearchBar
│       │   ├── CategoryFilter
│       │   ├── TagFilter
│       │   ├── SortDropdown
│       │   └── PromptCard (multiple)
│       │       ├── TagChip (multiple)
│       │       └── UpvoteButton
│       │
│       ├── PromptDetailPage
│       │   ├── PromptDetail
│       │   │   ├── UpvoteButton
│       │   │   ├── TagChip (multiple)
│       │   │   └── CopyButton
│       │   └── CommentsSection
│       │       ├── CommentForm
│       │       └── CommentItem (multiple)
│       │
│       ├── CreatePromptPage
│       │   └── PromptForm
│       │       ├── TagInput
│       │       └── TagChip (multiple)
│       │
│       ├── EditPromptPage
│       │   └── PromptForm (same as create)
│       │
│       └── UserProfilePage
│           ├── UserProfileHeader
│           │   └── StatsCard (multiple)
│           └── PromptCard (multiple)
```

### Shared Components

Components used across multiple pages:

1. **PromptCard** - Used in:
   - Prompts List Page
   - User Profile Page
   - Search Results

2. **TagChip** - Used in:
   - PromptCard
   - PromptDetail
   - TagFilter
   - PromptForm

3. **UpvoteButton** - Used in:
   - PromptCard
   - PromptDetail

4. **PromptForm** - Used in:
   - Create Prompt Page
   - Edit Prompt Page

---

## URL Structure & Routing

```
Public Routes (no auth required):
/                           → Prompts List (homepage)
/prompts                    → Prompts List
/prompts?category=coding    → Filtered list
/prompts?search=react       → Search results
/prompts/[id]              → Prompt Detail
/users/[id]                → User Profile
/login                     → Login page
/signup                    → Sign up page

Protected Routes (auth required):
/prompts/new               → Create Prompt
/prompts/[id]/edit         → Edit Prompt (+ owner check)
/dashboard                 → User dashboard (optional)
```

---

## Data Flow Summary

### Prompts List Page
```
Server Component
  ↓ fetch data
prompts_with_stats view
  ↓ pass to
Client Components (filters, search)
  ↓ update URL params
Re-fetch with new filters
```

### Prompt Detail Page
```
Server Component
  ↓ fetch prompt + comments
Display data
  ↓ pass to
Client Components (vote, comments)
  ↓ mutations
Server Actions
  ↓ revalidate
TanStack Query refetch
```

### Create/Edit Forms
```
Client Component (PromptForm)
  ↓ validate with Zod
Server Action (createPromptAction)
  ↓ insert to database
Redirect to /prompts/[id]
```

---

## Mobile Responsive Considerations

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Changes

**Prompts List**:
- Category tabs → Dropdown
- Tags filter → Collapsible
- Grid → Single column
- Search bar → Full width

**Prompt Detail**:
- Upvote button → Sticky top or bottom
- Comments → Full width
- Copy button → Always visible

**Forms**:
- All inputs → Full width
- Tags → Wrap to multiple lines

---

## Accessibility Checklist

- [ ] All interactive elements keyboard accessible
- [ ] Proper ARIA labels on buttons
- [ ] Form inputs have labels
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader friendly
- [ ] Alt text for any images/icons

---

## Next Steps

With these schemas defined, we can now:

1. ✅ **Generate Implementation Plan** - Reference these wireframes
2. ✅ **Start building components** - Know exact structure
3. ✅ **Design in parallel** - Designer can use these as base
4. ✅ **Test systematically** - Each page has clear requirements

---

**Ready to generate the implementation plan?** 🚀
