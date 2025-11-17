# Step 2: Browse & View Prompts

**Goal**: View all prompts + details
**Time**: 6-7 hours
**Status**: Planning
**Depends on**: Step 1 (Database + Auth must be complete)

---

## What We're Building

Build the main homepage where users can see all available prompts in a grid layout. Each prompt shows its category, title, description, and statistics (like count, copy count). When users click on a prompt card, they go to a detail page that shows the complete prompt with options to open it in different AI platforms.

**User can do after this step**:
- Visit homepage and see all prompts
- Browse prompts in a nice grid layout
- Click any prompt to see full details
- See how many likes and copies each prompt has
- View which AI platforms work with each prompt
- Click to open prompt in ChatGPT, Claude, etc.

---

## Pages We're Creating

### 1. Homepage / Prompts List Page
**URL**: `/` (maps to `src/app/(public)/page.tsx`)

**What it shows**:
- Header with logo and navigation
- Grid of prompt cards (3 columns on desktop, 2 on tablet, 1 on mobile)
- Each card shows: category badge, title, description, author (with photo), like count, copy count
- Clean, modern design
- Empty state with card borders and "Add Prompt" text if no prompts exist yet

**What it does**:
- Fetches all prompts from database
- Displays them in a grid
- Updates automatically when new prompts added
- Shows skeleton cards (gray placeholder boxes) while loading

---

### 2. Prompt Detail Page
**URL**: `/prompts/[id]` (example: `/prompts/abc-123`)

**What it shows**:
- Full prompt title
- Category badge
- Complete description
- Full prompt text (in a quote/callout box style for easy reading)
- Like button with count
- Copy button with count
- "Open in ChatGPT" button
- "Open in Claude" button
- "Open in Gemini" button
- Other compatible platforms
- Author information (email only in v1)
- Created date (shown on detail page only, not on cards)

**What it does**:
- Fetches single prompt by ID from database
- Shows all details
- Allows liking (if logged in) - coming in Step 4
- Allows copying prompt text - coming in Step 4
- Opens prompt in AI platform when button clicked

---

## Components We're Creating

### 1. PromptCard Component
**What it is**: A card that shows prompt preview

**What it shows**:
- Category badge (colored, with icon based on category)
- Title (bold, max 2 lines)
- Description (lighter text, max 3 lines, truncated with "...")
- Horizontal divider line
- Bottom row with:
  - Author email (from database)
  - Like count with heart icon
  - Copy count with clipboard icon (from database counter)

**Note**:
- Does NOT show creation date or "used X times" count on cards (keep cards clean and simple)
- Author shows email only in v1 (no photos, no display names)

**Used where**: Homepage grid

**Styling**:
- White background with border
- Rounded corners
- Hover effect (shadow appears)
- Clickable (whole card is a link)

---

### 2. CategoryBadge Component
**What it is**: Small colored label showing category

**Shows**: Category name with matching icon

**Categories and colors**:
- Coding → Blue badge, code icon
- Business → Green badge, briefcase icon
- Writing → Purple badge, pen icon
- Design → Gray badge, palette icon
- Other/Custom → Teal badge, sparkles icon

**Used where**: Prompt cards and detail page

---

### 3. Header Component
**What it shows**:
- Logo (left side)
- Navigation links (center)
- User menu or Login button (right side)

**Links**:
- Home / Library
- Add Prompt button (top right, only if logged in)

**Used where**: Every page (top of page)

---

### 4. PromptDetail Component
**What it is**: Full prompt display

**What it shows**:
- Large title
- Category badge
- Description in readable paragraph
- Prompt text in quote/callout box style (clean, readable, stands out)
- Action buttons section
- Platform buttons section
- Metadata (author email, like count, copy count)

**Used where**: Prompt detail page

---

### 5. PlatformButtons Component
**What it shows**: Buttons to open prompt in AI platforms

**Buttons shown**:
- Only shows platforms that work with this prompt
- Each button has platform logo/icon
- "Open in ChatGPT", "Open in Claude", etc.

**How it works (v1)**:
- Buttons are PLACEHOLDERS (non-functional in v1)
- Clicking does nothing or shows "Coming soon" message
- Will be implemented in future version
- For now, users just copy the prompt manually

**Used where**: Prompt detail page

---

## Files to Create

### Page Files

**1. `src/app/(public)/page.tsx`** (Homepage)

What it does:
- Fetches all prompts from database using query function
- Displays them in a grid
- Shows empty state if no prompts
- Server component (fetches data on server)

**Auth Pattern** (following Lab37 Constitution):
```typescript
import { getOptionalUser } from '@/lib/supabase/queries/auth';

export default async function HomePage() {
  const user = await getOptionalUser(); // Optional - for personalization
  const prompts = await getPrompts();

  return <PromptsGrid prompts={prompts} />;
}
```

Data needed:
- All prompts with like counts and platform info
- Sorted by newest first (for now, sorting comes in Step 4)
- User (optional, for showing if logged in)

---

**2. `src/app/(public)/prompts/[id]/page.tsx`** (Detail Page)

What it does:
- Gets prompt ID from URL
- Fetches that specific prompt from database
- Shows 404 page if prompt doesn't exist
- Displays full prompt details
- Server component

Data needed:
- Single prompt with all details
- Like count
- Platforms list
- Author info

---

### Component Files

**3. `src/components/prompts/PromptCard.tsx`**

Props it receives:
- prompt (object with title, description, category, likes, copies)
- showAuthor (yes/no, default yes)

What it renders:
- Card with all prompt preview info
- Link wrapper to detail page
- Formatted dates
- Category badge

Type: Client component (needs hover effects and click handling)

---

**4. `src/components/prompts/PromptDetail.tsx`**

Props it receives:
- prompt (full prompt object)
- platforms (list of compatible platforms)

What it renders:
- Complete prompt display
- All action buttons
- Platform buttons (show "Coming soon" message) ✅
- Metadata section
- Similar prompts section (3 from same category) ✅

Type: Client component (has interactive buttons)

**Platform Buttons Behavior** (v1):
- Clicking "Open in ChatGPT" shows tooltip: "Coming soon - copy prompt manually for now"
- Don't open platform URLs in v1
- Visual placeholders only
- v2: Implement deep linking when platforms support it

---

**5. `src/components/ui/CategoryBadge.tsx`**

Props it receives:
- category (string like "Coding", "Business", etc.)
- size (small, medium, large - optional)

What it renders:
- Colored badge with category name
- Icon matching the category
- Different colors for each category

Type: Client component (simple, reusable)

---

**6. `src/components/layout/Header.tsx`**

Props it receives:
- **NONE** - Gets user from AuthProvider context ✅

What it renders:
- Site logo (links to home)
- Navigation menu
- Login button (if not logged in)
- User menu (if logged in)
- "Add Prompt" button (if logged in)
- Library button (📚) - placeholder, shows "Coming soon" ✅

Type: Client component (has dropdown menus and links)

**Auth Pattern** (following Lab37 Constitution):
```typescript
'use client';
import { useAuth } from '@/lib/auth/auth-context';

export function Header() {
  const { user } = useAuth(); // From context, not props

  return (
    <nav>
      {/* Logo, nav items */}
      {user ? (
        <>
          <button>Add (+)</button>
          <button onClick={() => alert('Coming soon')}>Library (📚)</button>
          <span>{user.email}</span>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}
```

---

**7. `src/components/prompts/PlatformButtons.tsx`**

Props it receives:
- platforms (array of platform names)
- promptText (the prompt to send to AI)

What it renders:
- Button for each platform
- Each button opens AI platform with prompt
- Platform logos/icons

Type: Client component (handles clicks and opens new tabs)

---

**8. `src/components/prompts/SimilarPrompts.tsx`** ✅ (NEW)

Props it receives:
- currentPromptId (string) - To exclude current prompt
- category (string) - To find similar prompts

What it renders:
- Section title: "Similar Prompts"
- 3 prompt cards from same category (random selection)
- Small card format (compact version)
- Link to each prompt detail page

Type: Server Component (fetches data)

**Logic** (v1 simple implementation):
- Query prompts with same category
- Exclude current prompt
- Random order (or newest)
- Limit to 3 results
- If <3 available, show what exists
- If 0, show "No similar prompts found"

**Used where**: Prompt detail page (bottom of right sidebar)

**v2 Enhancement**: Could use tags, AI similarity, user behavior for better matching

---

**9. `src/components/ui/EmptyState.tsx`**

Props it receives:
- message (text to show)
- showCardBorders (yes/no)

What it renders:
- Empty card borders in grid layout
- "Add Prompt" text in center of each empty card
- Maintains same grid structure as filled cards
- Clean, minimal design

Type: Client component (reusable for any empty state)

Used when:
- No prompts exist yet
- Search returns no results (Step 4)
- User has no prompts (future)

**Design**: Shows 3-6 empty card outlines with dashed borders and centered "Add Prompt" text

---

### Utility Files

**9. `src/lib/utils/platform-urls.ts`** (Optional - Future Use)

What it does:
- Helper functions to get AI platform homepage URLs
- For v1: Just returns platform homepage

Functions:
- `getChatGPTUrl()` → Returns `https://chat.openai.com/`
- `getClaudeUrl()` → Returns `https://claude.ai/`
- `getGeminiUrl()` → Returns `https://gemini.google.com/`

**v1 Note**: These are just homepage URLs. Buttons don't pre-fill prompts yet.

**Future**: Can be updated to include prompt text when platforms support it

---

**10. `src/lib/utils/truncate.ts`**

What it does:
- Truncates long text with "..."
- Used for card descriptions

Function:
- `truncate(text, maxLength)` → Returns shortened text

Example:
- Input: "This is a very long description that goes on and on..."
- Output: "This is a very long descrip..."

---

## How Data Flows

### Homepage Flow:

1. User visits `/`
2. Page runs on server (Next.js)
3. Server calls `getPrompts()` query function
4. Database returns all prompts with stats
5. Page renders grid of PromptCard components
6. Each card receives prompt data as props
7. User sees grid of prompts
8. Click card → Navigate to detail page

### Detail Page Flow:

1. User clicks prompt card or visits `/prompts/abc-123`
2. Page runs on server
3. Server gets ID from URL (`abc-123`)
4. Server calls `getPromptById('abc-123')` query function
5. Database returns prompt with all details
6. If not found → Show 404 page
7. If found → Render PromptDetail component
8. User sees full prompt
9. Click "Open in ChatGPT" → Shows "Coming soon" message (non-functional in v1)

---

## Platform URL Formats

**Note**: Platform buttons are NON-FUNCTIONAL in v1 (placeholders only).

These URLs are for future implementation:

**ChatGPT**:
```
https://chat.openai.com/ (user copies prompt manually)
```

**Claude** (Anthropic):
```
https://claude.ai/ (user copies prompt manually)
```

**Gemini** (Google):
```
https://gemini.google.com/ (user copies prompt manually)
```

**v1 Behavior**: Buttons just open platform homepage, user pastes prompt themselves

---

## Styling Guidelines

### Grid Layout:
- Desktop (1200px+): 3 columns
- Tablet (768px-1199px): 2 columns
- Mobile (<768px): 1 column
- Gap between cards: 24px
- Cards same height in each row

### Card Styling:
- Background: White
- Border: 1px light gray
- Border radius: 8px
- Padding: 24px
- Hover: Add shadow, slight lift effect
- Transition: Smooth (200ms)

### Typography:
- Title: 20px, bold, dark gray
- Description: 16px, normal, medium gray
- Metadata: 14px, light gray
- Prompt text: 16px, normal font in quote/callout box

### Colors (Category Badges):
- Coding: Blue (#3B82F6)
- Business: Green (#10B981)
- Writing: Purple (#8B5CF6)
- Design: Gray (#6B7280)
- Other/Custom: Teal (#14B8A6)

### Icons:
Icons will be added later. For now, use text labels.

---

## Step Completion Checklist

After this step, users should be able to:
- [ ] Visit homepage and see grid of prompts
- [ ] See prompt cards with title, description, category
- [ ] See like counts and copy counts on cards
- [ ] Click a prompt card
- [ ] Navigate to prompt detail page
- [ ] See full prompt with all details
- [ ] See which AI platforms work with prompt
- [ ] Click "Open in ChatGPT" and see prompt open in new tab
- [ ] Click "Open in Claude" and see prompt open in new tab
- [ ] See empty state if no prompts exist
- [ ] Navigate using header links
- [ ] See responsive design work on mobile

---

## Testing Step 2

**How to test:**

### 1. Database Test
- Add 3-5 sample prompts manually in Supabase
- Check they have different categories
- Check they have different platforms selected

### 2. Homepage Test
- Visit `/`
- Should see grid of prompt cards
- Count should match database
- Each card should show correct info

### 3. Card Click Test
- Click any prompt card
- Should navigate to detail page
- URL should be `/prompts/[id]`

### 4. Detail Page Test
- Should see full title
- Should see full description
- Should see complete prompt text
- Should see category badge
- Should see platform buttons

### 5. Platform Button Test
- Click "Open in ChatGPT"
- New tab should open
- ChatGPT should be pre-filled with prompt (or close to it)
- Test each platform button

### 6. Empty State Test
- Delete all prompts from database
- Visit homepage
- Should see "No prompts yet" message
- Should not crash

### 7. Mobile Test
- Resize browser to mobile width
- Cards should stack (1 column)
- Everything should be readable
- Buttons should be tappable

### 8. 404 Test
- Visit `/prompts/fake-id-12345`
- Should show 404 or "Prompt not found"
- Should not crash

---

## Common Issues & Solutions

**Issue**: Prompts not showing on homepage
- Check database has prompts
- Check query function is working
- Check console for errors
- Verify Supabase connection

**Issue**: Detail page shows error
- Check prompt ID in URL is valid
- Check prompt exists in database
- Check query returns data
- Look for console errors

**Issue**: Platform buttons don't work
- Check URL format is correct
- Check prompt text is URL-encoded
- Try clicking in different browser
- Some platforms may need different URL format

**Issue**: Cards look broken on mobile
- Check responsive CSS breakpoints
- Test in mobile view in browser dev tools
- Adjust grid columns for small screens

**Issue**: Images/icons not showing
- Icons will be added later
- For now, use text or emoji as placeholders
- Focus on functionality first

---

## Copy Button Flow (For Step 4 Reference)

**How copy button will work when implemented in Step 4:**

1. User clicks copy button on prompt card or detail page
2. Client component calls `incrementCopyCount(promptId)` function (from Step 1)
3. Database updates: `copy_count` field increases by 1
4. Prompt text is copied to user's clipboard using browser API
5. UI shows "Copied!" message
6. Copy count on card updates optimistically (shows new number immediately)

**In Step 2**: Copy button just shows the current count from database (non-functional)

**Why document this now**: So Step 4 knows what to implement

---

## What's NOT in This Step

This step does NOT include:
- ❌ Like button functionality (Step 4)
- ❌ Copy button functionality (Step 4 - just shows count from database)
- ❌ Search (Step 4)
- ❌ Filters (Step 4)
- ❌ Sorting (Step 4)
- ❌ Creating prompts (Step 3)
- ❌ Real icons (added later)
- ❌ Working "Open in AI" buttons (placeholders only in v1 - show "Coming soon") ✅
- ❌ Library button functionality (placeholder only - show "Coming soon") ✅
- ❌ User photos/profiles (just email in v1)
- ❌ Tracking who copied prompts (just count total copies)

**What IS Included** (clarifications):
- ✅ Platform buttons appear but clicking shows "Coming soon" tooltip
- ✅ Library button (📚) appears in header but shows "Coming soon" when clicked
- ✅ Similar Prompts section shows 3 prompts from same category

We're just displaying prompts and viewing details. Interactions come next!

---

## Dependencies Check

**Before starting Step 2, make sure**:
- ✅ Step 1 is complete
- ✅ Database tables exist
- ✅ Supabase connection works
- ✅ Query functions are created
- ✅ At least 1 sample prompt in database (for testing)

**If not, go back to Step 1!**

---

## Notes

- Start with homepage first, then detail page
- Add sample data to database for testing
- Don't worry about perfect design yet - functionality first
- Use simple styling - we'll polish in Step 5
- Platform URLs might not work perfectly for all platforms (some don't support URL params)
- Like/copy buttons will be placeholders (non-functional until Step 4)
- Focus on displaying data correctly first
