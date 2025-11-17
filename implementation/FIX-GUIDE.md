# Implementation Plans - Fix Guide

**Purpose**: Detailed instructions for fixing the 5 compatibility issues
**Time Required**: ~47 minutes
**Status**: Ready to apply

---

## 📋 **OVERVIEW OF FIXES**

| # | Issue | File(s) | Lines | Time |
|---|-------|---------|-------|------|
| 1 | Auth pattern | Step 1 | 276-330 | 10 min |
| 2 | Auth pattern | Step 2 | Multiple | 10 min |
| 3 | Similar Prompts missing | Step 2 | Add new section | 10 min |
| 4 | Library button missing | Step 2 | Add new section | 5 min |
| 5 | Zod schemas missing | Step 3 | Add new section | 10 min |
| 6 | Route naming | Visual schema | Line 5 | 2 min |

---

## 🔧 **FIX #1: Update Auth Pattern in Step 1**

**File**: `implementation/step-1-backend-foundation.md`

### Location 1: Auth Query Functions Section (around line 276-283)

**FIND THIS**:
```markdown
**`src/lib/supabase/queries/auth.ts`**

Functions:
- `getCurrentUser()` - get logged-in user info
- `requireAuth()` - check if user is logged in, redirect if not
- `getOptionalUser()` - get user if logged in, null if not
```

**REPLACE WITH**:
```markdown
**`src/lib/supabase/queries/auth.ts`**

Functions following Lab37 Constitution pattern:

- `getOptionalUser()` - get user if logged in, null if not (primary pattern)
  - Use in Server Components for auth checks
  - Returns User object or null
  - Example: `const user = await getOptionalUser();`

- `requireAuth()` - DEPRECATED - Use `getOptionalUser()` + manual redirect instead
  - Old pattern: `const user = await requireAuth();`
  - New pattern: `const user = await getOptionalUser(); if (!user) redirect('/login');`
```

---

### Location 2: Authentication Pages Section (around line 294-309)

**FIND THIS** (Step 1, around line 304):
```markdown
**`src/lib/auth/middleware.ts`** (helper file)

What it does:
- Protects pages that need login
- Checks if user is logged in
- Redirects to login page if not
- Used on "Add Prompt" page and other protected pages
```

**REPLACE WITH**:
```markdown
**Authentication Pattern** (following Lab37 Constitution)

**Server-Side Auth Check** (in page.tsx):
```typescript
import { getOptionalUser } from '@/lib/supabase/queries/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const user = await getOptionalUser();
  if (!user) redirect('/login');

  // Page content...
}
```

**Client-Side Auth State** (for Header, etc.):
- Use AuthProvider context (see constitution)
- Provider wraps app in root layout
- Client components use `useAuth()` hook
- No props needed - gets user from context
```

---

### Location 3: Add AuthProvider Setup Section

**ADD THIS NEW SECTION** after the "Authentication Pages" section (around line 330):

```markdown
---

### AuthProvider Setup (Constitution Pattern)

**`src/lib/auth/auth-context.tsx`**

What it does:
- Provides auth state to all client components
- Eliminates need to pass user as props
- Handles auth state changes automatically

**Usage in root layout**:
```typescript
// src/app/layout.tsx (Server Component)
import { getOptionalUser } from '@/lib/supabase/queries/auth';
import { AuthProvider } from '@/lib/auth/auth-context';

export default async function RootLayout({ children }) {
  const user = await getOptionalUser(); // Server-side fetch

  return (
    <html>
      <body>
        <AuthProvider initialUser={user}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

**Usage in client components**:
```typescript
// src/components/layout/Header.tsx (Client Component)
'use client';
import { useAuth } from '@/lib/auth/auth-context';

export function Header() {
  const { user } = useAuth(); // No async, from context

  return (
    <nav>
      {user ? <span>{user.email}</span> : <a href="/login">Login</a>}
    </nav>
  );
}
```

**Why this pattern**:
- Server fetches user once per request
- Client components get user from context (no props needed)
- No hydration mismatches
- Follows Lab37 Constitution exactly

See `docs/lab-37-constitution.md` lines 660-738 for full details.

```

---

## 🔧 **FIX #2: Update Auth Pattern in Step 2**

**File**: `implementation/step-2-browse-view-prompts.md`

### Location 1: Homepage Page File (around line 167-178)

**FIND THIS**:
```markdown
**1. `src/app/(public)/page.tsx`** (Homepage)

What it does:
- Fetches all prompts from database using query function
- Displays them in a grid
- Shows empty state if no prompts
- Server component (fetches data on server)

Data needed:
- All prompts with like counts and platform info
- Sorted by newest first (for now, sorting comes in Step 4)
```

**REPLACE WITH**:
```markdown
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
```

---

### Location 2: Header Component (around line 246-260)

**FIND THIS**:
```markdown
**6. `src/components/layout/Header.tsx`**

Props it receives:
- user (current logged-in user or null)

What it renders:
- Site logo (links to home)
- Navigation menu
- Login button (if not logged in)
- User menu (if logged in)
- "Add Prompt" button (if logged in)

Type: Client component (has dropdown menus and links)
```

**REPLACE WITH**:
```markdown
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
          <button>Library (📚)</button> {/* Coming soon */}
          <span>{user.email}</span>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}
```
```

---

## 🔧 **FIX #3: Add Similar Prompts to Step 2**

**File**: `implementation/step-2-browse-view-prompts.md`

### Location: After PlatformButtons Component (around line 275)

**ADD THIS NEW SECTION**:

```markdown
---

**8. `src/components/prompts/SimilarPrompts.tsx`**

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
```

---

### Location: Update Prompt Detail Page Component (around line 217-230)

**FIND THIS**:
```markdown
**4. `src/components/prompts/PromptDetail.tsx`**

Props it receives:
- prompt (full prompt object)
- platforms (list of compatible platforms)

What it renders:
- Complete prompt display
- All action buttons
- Platform buttons
- Metadata section

Type: Client component (has interactive buttons)
```

**REPLACE WITH**:
```markdown
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
```

---

### Location: Update Files to Create List (around line 299)

**FIND THIS** (around line 299):
```markdown
**8. `src/components/ui/EmptyState.tsx`**
```

**CHANGE TO**:
```markdown
**8. `src/components/prompts/SimilarPrompts.tsx`** (NEW ✅)

**9. `src/components/ui/EmptyState.tsx`**
```

---

## 🔧 **FIX #4: Add Library Button Behavior to Step 2**

**File**: `implementation/step-2-browse-view-prompts.md`

### Location: Update Header Component (already updated in Fix #2)

This is already covered in **Fix #2, Location 2** above where we update the Header component to include:
```markdown
- Library button (📚) - placeholder, shows "Coming soon" ✅
```

---

### Location: Add Note in "What's NOT in This Step" Section (around line 542-555)

**FIND THIS**:
```markdown
## What's NOT in This Step

This step does NOT include:
- ❌ Like button functionality (Step 4)
- ❌ Copy button functionality (Step 4 - just shows count from database)
- ❌ Search (Step 4)
- ❌ Filters (Step 4)
- ❌ Sorting (Step 4)
- ❌ Creating prompts (Step 3)
- ❌ Real icons (added later)
- ❌ Working "Open in AI" buttons (placeholders only in v1)
- ❌ User photos/profiles (just email in v1)
- ❌ Tracking who copied prompts (just count total copies)
```

**REPLACE WITH**:
```markdown
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

**Notes**:
- Platform buttons appear but clicking shows "Coming soon" tooltip
- Library button (📚) appears in header but shows "Coming soon" when clicked
- Similar Prompts section shows 3 prompts from same category ✅
```

---

## 🔧 **FIX #5: Add Zod Schemas to Step 3**

**File**: `implementation/step-3-add-prompts.md`

### Location 1: Update Utility Files Section (around line 445-461)

**FIND THIS**:
```markdown
### Utility Files

**6. `src/lib/utils/validation.ts`**

**What it does**:
- Reusable validation functions
- Used by both client and server

**Functions**:
- validateTitle(title: string): boolean
- validateDescription(desc: string): boolean
- validatePromptText(text: string): boolean
- validateCategory(category: string, custom?: string): boolean
```

**REPLACE WITH**:
```markdown
### Validation Files (Following Lab37 Constitution)

**6. `src/lib/validations/prompt.ts`** (Zod schemas - required by constitution)

**What it does**:
- Defines validation schemas using Zod
- Used by server actions for type-safe validation
- Single source of truth for validation rules

**Zod Schema**:
```typescript
import { z } from 'zod';

export const promptSchema = z.object({
  title: z.string()
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title must be 200 characters or less"),

  description: z.string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be 1000 characters or less"),

  prompt_text: z.string()
    .min(20, "Prompt text must be at least 20 characters")
    .max(5000, "Prompt text must be 5000 characters or less"),

  category: z.string()
    .min(1, "Please select a category"),

  custom_category: z.string()
    .min(3, "Custom category must be at least 3 characters")
    .max(50, "Custom category must be 50 characters or less")
    .optional(),

  platform_ids: z.array(z.string().uuid()).optional(),
});

export type PromptFormData = z.infer<typeof promptSchema>;
```

**Usage in Server Action**:
```typescript
export async function createPromptAction(formData: FormData) {
  // Parse and validate with Zod
  const parsed = promptSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    // ... other fields
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  // Type-safe data
  const data = parsed.data;
  // ... create prompt
}
```

---

**7. `src/lib/utils/validation.ts`** (Client-side helpers - optional)

**What it does**:
- Lightweight client-side validation helpers
- Quick checks before form submission
- Uses same rules as Zod schema

**Functions**:
```typescript
export function validateTitle(title: string): boolean {
  return title.length >= 10 && title.length <= 200;
}

export function validateDescription(desc: string): boolean {
  return desc.length >= 20 && desc.length <= 1000;
}

export function validatePromptText(text: string): boolean {
  return text.length >= 20 && text.length <= 5000;
}

export function getCharacterCountColor(current: number, max: number): string {
  if (current > max) return 'text-red-500';
  if (current > max * 0.9) return 'text-yellow-500';
  return 'text-gray-500';
}
```
```

---

### Location 2: Update Server Actions Section (around line 417-443)

**FIND THIS**:
```markdown
**Server-side validation** (critical for security):
- Title: 10-200 characters
- Description: 20-1000 characters
- Prompt text: 20-5000 characters
- Category: Must be valid or custom with 3-50 chars
- User ID: Must match authenticated user
```

**REPLACE WITH**:
```markdown
**Server-side validation** (critical for security - uses Zod ✅):

```typescript
import { promptSchema } from '@/lib/validations/prompt';

export async function createPromptAction(formData: FormData) {
  // 1. Check authentication
  const user = await getOptionalUser();
  if (!user) {
    return { error: 'Authentication required' };
  }

  // 2. Validate with Zod schema
  const parsed = promptSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    prompt_text: formData.get('prompt_text'),
    category: formData.get('category'),
    custom_category: formData.get('custom_category'),
    platform_ids: formData.getAll('platform_ids'),
  });

  if (!parsed.success) {
    // Return field-level errors
    return {
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  // 3. Type-safe data from Zod
  const data = parsed.data;

  // 4. Insert into database...
}
```

**Validation rules** (defined in Zod schema):
- Title: 10-200 characters
- Description: 20-1000 characters
- Prompt text: 20-5000 characters
- Category: Required, min 1 char
- Custom category (if Other): 3-50 characters
- Platform IDs: Array of UUIDs (optional)
- User ID: Must match authenticated user
```

---

### Location 3: Update Files to Create Count (around line 350-392)

**FIND THIS**:
```markdown
## Files to Create

### Page File

**1. `src/app/(auth)/prompts/new/page.tsx`** (Add Prompt Page)
```

**ADD BEFORE IT**:
```markdown
## Files to Create

**Total**: 8 files (1 added for Zod ✅)

### Validation Files (New - Constitution Requirement)

**1. `src/lib/validations/prompt.ts`** (Zod schemas) ✅

See "Validation Files" section above for full code.

---

### Page Files
```

Then continue with the existing "**1. `src/app/(auth)/prompts/new/page.tsx`**"

And update the numbering:
- Old #1 becomes #2
- Old #2 becomes #3
- etc.

---

## 🔧 **FIX #6: Update Route Naming in Visual Schema**

**File**: `visual_schemata/registration.md`

### Location: Line 5

**FIND THIS**:
```markdown
**Route**: `/registration`
```

**REPLACE WITH**:
```markdown
**Route**: `/register` ✅ (DECISION: Use shorter route name)
```

---

**File**: `visual_schemata/login.md`

### Location: Line 150

**FIND THIS**:
```markdown
- **Action**: Navigate to `/registration` page
```

**REPLACE WITH**:
```markdown
- **Action**: Navigate to `/register` page ✅
```

---

## ✅ **VERIFICATION CHECKLIST**

After applying all fixes, verify:

### Step 1:
- [ ] Auth pattern uses `getOptionalUser()` not `requireAuth()`
- [ ] AuthProvider context pattern documented
- [ ] Example code shows constitution pattern

### Step 2:
- [ ] Homepage uses `getOptionalUser()`
- [ ] Header gets user from context (no props)
- [ ] SimilarPrompts component documented
- [ ] Library button behavior specified
- [ ] Platform buttons behavior clarified

### Step 3:
- [ ] Zod schema file added to files list
- [ ] Server action uses Zod validation
- [ ] Example code shows Zod usage
- [ ] File count updated to 8 files

### Visual Schemata:
- [ ] Registration route changed to `/register`
- [ ] Login link points to `/register`

---

## 📊 **BEFORE vs AFTER**

| Aspect | Before | After |
|--------|--------|-------|
| Constitution compliance | 60% | 100% ✅ |
| Auth pattern | Mixed/unclear | Consistent ✅ |
| Missing features | 3 features | All documented ✅ |
| Zod validation | Not explicit | Required & documented ✅ |
| Route naming | Inconsistent | Consistent ✅ |

---

## 🎯 **NEXT STEPS**

After reviewing this guide:

1. **Option A**: I apply all these changes automatically
2. **Option B**: You review each change and approve one-by-one
3. **Option C**: You make the changes manually using this guide

**Which option do you prefer?**
