# Step 3: Add Prompts

**Goal**: Users can submit prompts
**Time**: 3-4 hours
**Status**: Planning (Updated with all decisions ✅)
**Depends on**: Step 1 (Database + Auth) and Step 2 (Components/UI foundations)

---

## 📋 Key Decisions Applied in This Step

Based on decisions documented in `implementation/DECISIONS.md`:

✅ **Prompt text**: 5000 characters max (more flexible than original 500)
✅ **Custom categories**: "Other" option allows custom category input (3-50 chars)
✅ **Visibility checkbox**: Cosmetic only - all prompts public in v1
✅ **Auth pattern**: Follows Lab37 Constitution (server-side fetch, AuthProvider context)
✅ **Author display**: Shows email only (no username/photos in v1)
✅ **Grid layout**: Sets up for 3-column homepage grid
✅ **Platform buttons**: For Step 4 - will show "Coming soon" message

See full decisions: `implementation/DECISIONS.md`

---

## What We're Building

Create a page where logged-in users can submit their own prompts. They fill out a form with the prompt title, description, actual prompt text, category, and which AI platforms it works with. The form includes a live preview that updates in real-time as they type. After submitting, the prompt is saved to the database and appears on the homepage.

**User can do after this step**:
- Navigate to "Add Prompt" page (only when logged in)
- Fill out a form to create a new prompt
- See live preview of their prompt as they type
- Select category from dropdown
- Choose compatible AI platforms
- Submit prompt to database
- See their prompt appear on homepage immediately

---

## Authentication Requirement

**IMPORTANT**: This entire page requires authentication.

**Protection Strategy**:
- Page is in `src/app/(auth)/` folder (protected route group)
- If user is not logged in, redirect to `/login`
- Show message: "Please log in to add prompts"
- After login, redirect back to this page

---

## Pages We're Creating

### Add Prompt Page
**URL**: `/prompts/new` (maps to `src/app/(auth)/prompts/new/page.tsx`)

**What it shows**:
- "Come back" navigation link (returns to previous page)
- Two-column layout:
  - **Left side (60%)**: Form with all input fields
  - **Right side (40%)**: Live preview showing how prompt will look
- Character counters on all text fields
- Category dropdown (Coding, Business, Writing, Design, Other)
- AI platforms checkboxes (ChatGPT, Claude, Gemini, Other)
- Visibility checkbox (default: checked)
- Cancel and Submit buttons

**What it does**:
- Validates all required fields
- Shows real-time character counts
- Updates preview as user types
- Submits to database when form is valid
- Redirects to homepage on success
- Shows error messages if validation fails

---

## Form Fields Specification

### Field 1: Title*
**Label**: "Title*" (asterisk indicates required)

**Input Details**:
- Type: Text input
- Placeholder: "Example title..."
- Required: Yes
- Max length: 200 characters
- Character counter: "0/200" (updates as user types)

**Validation**:
- Cannot be empty
- Must be at least 10 characters
- Maximum 200 characters
- Error message: "Title must be between 10 and 200 characters"

**Preview**:
- Shows in preview as h3
- Updates in real-time

---

### Field 2: Description*
**Label**: "Description*"

**Input Details**:
- Type: Textarea (3-4 rows)
- Placeholder: "What does it do? When would you use it?"
- Required: Yes
- Max length: 1000 characters
- Character counter: "0/1000"

**Validation**:
- Cannot be empty
- Must be at least 20 characters
- Maximum 1000 characters
- Error message: "Description must be between 20 and 1000 characters"

**Preview**:
- Shows in description preview section
- Updates in real-time
- Grows as content is added

---

### Field 3: Text of prompt*
**Label**: "Text of prompt*"

**Input Details**:
- Type: Textarea (5-6 rows)
- Placeholder: "Paste prompt here"
- Required: Yes
- Max length: **5000 characters** ✅ (DECISION: More flexible than original 500)
- Character counter: "0/5000"

**Validation**:
- Cannot be empty
- Must be at least 20 characters
- Maximum 5000 characters
- Error message: "Prompt text must be between 20 and 5000 characters"

**Preview**:
- Shows in bordered box (like detail page)
- Monospace or readable font
- Updates in real-time
- Grows as content is added

---

### Field 4: Choose category*
**Label**: "Choose category*"

**Input Details**:
- Type: Dropdown select (single choice)
- Default: "Select category..." (placeholder option, disabled)
- Required: Yes
- Options:
  1. Coding
  2. Business
  3. Writing
  4. Design
  5. Other

**Behavior for "Other"**: ✅ (DECISION: Allow custom categories)
- If user selects "Other", show additional text input
- Text input appears below dropdown
- Placeholder: "Enter custom category..."
- Max length: 50 characters
- Saved as custom category name to database `category` field

**Validation**:
- Must select a category
- If "Other" selected, custom text is required
- Custom category: 3-50 characters
- Error message: "Please select a category"

**Preview**:
- Shows as colored badge at top
- Colors match category (Blue for Coding, Green for Business, etc.)
- If "Other" + custom text, shows custom name in Teal badge

**Category Colors** (from Step 2):
- Coding: Blue (#3B82F6)
- Business: Green (#10B981)
- Writing: Purple (#8B5CF6)
- Design: Gray (#6B7280)
- Other/Custom: Teal (#14B8A6)

---

### Field 5: AI Platforms
**Label**: "AI Platforms"
**Subtitle**: "საუკეთესოა (არასავალდებულო)" (Best - Optional)

**Input Details**:
- Type: Checkboxes (multi-select)
- Required: No (optional field)
- Options:
  - ☐ ChatGPT
  - ☐ Claude
  - ☐ Gemini
  - ☐ Other

**Behavior**:
- User can select 0 or more platforms
- All, some, or none can be checked
- If none selected, prompt works with "any" platform

**Database Storage**:
- Saves to `prompt_platforms` junction table
- Each selected platform creates one row
- Links prompt_id to platform_id

**Validation**:
- Optional, no validation needed
- Can submit with 0 platforms selected

**Preview**:
- Not shown in preview (optional feature)
- Or: Show small icons at bottom of preview (future enhancement)

---

### Field 6: Visibility
**Label**: Checkbox with text

**Input Details**:
- Type: Checkbox
- Label text: "Will be visible for all"
- Default: Checked (public by default)
- Required: No (has default)

**Behavior**: ✅ (DECISION: Cosmetic only in v1)
- v1: Always visible to all (checkbox doesn't affect anything)
- All prompts saved as public regardless of checkbox state
- v2: Could control public/private prompts feature

**Note**: In v1, this checkbox is **cosmetic only** - all prompts are public. Can be implemented in v2.

---

## Live Preview Panel (Right Side)

### Layout
**Width**: 40% of screen
**Border**: Small border around entire preview area

### Preview Sections

#### Section Header
- **h5**: "Review"
- Position: Top of preview panel

---

#### Section 1: Title Preview
**Container**: Bordered box

**Shows**:
- Category badge (top left, small, colored)
  - Shows selected category
  - Updates when dropdown changes
  - Correct color for each category
- **h3**: Title text
  - Live updates from title input
  - Starts as placeholder: "Your title will appear here"
  - Grows as content is typed

---

#### Section 2: Description Preview
**Container**: Bordered box (below title)

**Shows**:
- **h5**: "Your prompt description will be shown here"
  - Placeholder when empty
  - Live updates from description textarea
  - Shows actual description text when typed
  - Grows vertically as content increases

---

#### Section 3: Prompt Text Preview
**Container**: Bordered box (below description)

**Shows**:
- **Label**: "Your prompt text:"
- Prompt content in quote/callout style
  - Placeholder when empty: "Your prompt will appear here"
  - Live updates from prompt text textarea
  - Monospace or readable font
  - Background: Light gray (#f9fafb)
  - Grows vertically as content increases

---

#### Section 4: Bottom Icons
**Container**: After horizontal line separator

**Shows**:
- Right-aligned icons:
  - 👤 User icon (gray)
  - ❤️ Heart icon (gray)
  - 📋 Clipboard icon (gray)
- These are static (not interactive in preview)
- Shows how card will look on homepage

---

## Form Buttons

### Cancel Button
**Position**: Bottom left of form
**Style**:
- Border: 1px solid gray
- Background: White or transparent
- Text color: Dark gray
- Padding: 10-12px 24px
- Border radius: 6px
- Hover: Light gray background

**Behavior**:
- Discards all form data
- Navigates back to previous page or homepage
- Optional: Show confirmation if form has data ("Discard changes?")

---

### Submit Button
**Position**: Bottom right of form (next to Cancel)
**Style**:
- Background: Blue (#0066ff or primary color)
- Text color: White
- Padding: 10-12px 32px
- Border radius: 6px
- Border: None or matching blue
- Font weight: Medium/Semibold
- Hover: Darker blue

**Behavior**:
- Validates all fields
- If validation fails: Show errors, don't submit
- If validation passes:
  1. Show loading state (spinner or "Submitting...")
  2. Disable button to prevent double-submit
  3. Call `createPrompt()` server action
  4. Save to database
  5. On success: Redirect to homepage with success message
  6. On error: Show error message, re-enable button

**States**:
- Default: Blue, enabled
- Hover: Darker blue
- Loading: Blue with spinner, disabled
- Disabled: Gray, not clickable (when form invalid)

---

## Files to Create

**Total**: 9 files (includes Zod validation ✅)

### Validation Files (New - Constitution Requirement)

**1. `src/lib/validations/prompt.ts`** (Zod schemas) ✅

See "Validation Files" section above for full code.

---

### Page Files

**2. `src/app/(auth)/prompts/new/page.tsx`** (Add Prompt Page)

**Type**: Server Component (wrapper) + Client Component (form)

**What it does**:
- Checks authentication (server-side)
- Redirects to login if not authenticated
- Renders AddPromptForm component
- Shows header and layout

**Data needed**:
- Current user (to set user_id on prompt)
- AI platforms list (for checkboxes)

**Structure** (following Lab37 Constitution):
```typescript
// Server Component (fetches user server-side)
import { getOptionalUser } from '@/lib/auth/queries';
import { redirect } from 'next/navigation';

export default async function NewPromptPage() {
  // Server-side auth check
  const user = await getOptionalUser();

  if (!user) {
    redirect('/login'); // Redirect if not authenticated
  }

  // Fetch AI platforms from database
  const platforms = await getAiPlatforms();

  return (
    <main>
      <BackButton />
      <AddPromptForm
        platforms={platforms}
        userId={user.id}
        userEmail={user.email}
      />
    </main>
  );
}
```

**Note**: Header component gets user from AuthProvider context (not passed as prop). See constitution auth pattern.

---

### Component Files

**3. `src/components/prompts/AddPromptForm.tsx`**

**Type**: Client Component ('use client')

**Props**:
- platforms: Array of AI platform objects
- userId: String (current user's ID)

**State Management**:
- formData (title, description, promptText, category, customCategory, platforms, visibility)
- errors (field-level validation errors)
- isSubmitting (loading state)
- charCounts (character counters for each field)

**What it renders**:
- Two-column layout (form + preview)
- All form fields with validation
- Live preview panel
- Submit and Cancel buttons

**Functions**:
- handleInputChange() - Updates state and preview
- handleCategoryChange() - Shows/hides custom category input
- handlePlatformToggle() - Manages checkbox state
- validateForm() - Checks all required fields
- handleSubmit() - Calls server action and handles response

---

**4. `src/components/prompts/PromptFormPreview.tsx`**

**Type**: Client Component

**Props**:
- title: String
- description: String
- promptText: String
- category: String
- customCategory: String (optional)

**What it renders**:
- Preview panel with 4 sections
- Updates automatically when props change
- Shows placeholders when fields empty
- Matches prompt card design from Step 2

---

**5. `src/components/ui/BackButton.tsx`**

**Type**: Client Component

**Props**:
- href: String (optional, defaults to previous page)
- text: String (optional, defaults to "← Come back")

**What it renders**:
- Link with back arrow icon
- Positioned outside form, aligned with left border
- Simple, clean design

---

### Server Actions

**6. `src/app/(auth)/prompts/new/actions.ts`**

**Type**: Server Actions file

**Functions**:

**`createPromptAction(formData)`**
- Validates all input data (server-side validation)
- Creates new prompt in database
- Links selected AI platforms
- Returns success or error
- Revalidates homepage cache

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

**Database operations**:
1. Insert into `prompts` table
2. Get the new prompt ID
3. For each selected platform, insert into `prompt_platforms` table
4. Return created prompt

**Error handling**:
- Database errors
- Validation errors
- Authentication errors

---

### Validation Files (Following Lab37 Constitution)

**6. `src/lib/validations/prompt.ts`** (Zod schemas - required by constitution ✅)

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

---

## Data Flow

### Form Submission Flow:

1. **User fills form**
   - Types in fields
   - Preview updates in real-time
   - Character counters update
   - Validation hints appear

2. **User clicks Submit**
   - Client validates all fields
   - If invalid: Show errors, stop
   - If valid: Continue

3. **Submit to server**
   - Call `createPromptAction(formData)`
   - Show loading state
   - Disable submit button

4. **Server processes**
   - Validate again (server-side)
   - Check user is authenticated
   - Insert into `prompts` table
   - Get new prompt ID
   - Insert into `prompt_platforms` for each selected platform

5. **Response handling**
   - On success:
     - Show success toast: "Prompt created!"
     - Redirect to homepage
     - New prompt appears in grid
   - On error:
     - Show error message
     - Re-enable form
     - Keep user data (don't clear form)

---

## Validation Rules Summary

### Client-Side Validation (Real-time):
- Title: 10-200 characters
- Description: 20-1000 characters
- Prompt text: 20-5000 characters
- Category: Required (or custom if "Other")
- Show errors only after field is touched

### Server-Side Validation (On submit):
- Same rules as client-side
- Additional security checks
- Verify user authentication
- Sanitize input (prevent XSS)

### Error Display:
- Show errors below each field
- Red text with specific message
- Field border turns red
- Submit button disabled until errors fixed

---

## Styling Guidelines

### Two-Column Layout:
- Desktop (1200px+): 60% form, 40% preview
- Tablet (768px-1199px): 50% form, 50% preview
- Mobile (<768px): Stack vertically (form first, then preview)

### Form Section:
- Large bordered container
- Padding: 32px
- Border: 1px solid light gray
- Border radius: 8px
- Background: White

### Input Fields:
- Full width within form
- Border: 1px solid gray
- Border radius: 6px
- Padding: 10-12px
- Font size: 14-16px
- Focus state: Blue border

### Preview Section:
- Small bordered container
- Padding: 24px
- Border: 1px solid light gray
- Border radius: 8px
- Background: White or very light gray

### Character Counters:
- Position: Below each input
- Align: Right
- Font size: 12px
- Color: Gray (default), Red (when over limit)
- Format: "X/200"

---

## Files Summary

**Total files created**: 9
1. `src/lib/validations/prompt.ts` - Zod schemas ✅
2. `src/app/(auth)/prompts/new/page.tsx` - Page route
3. `src/components/prompts/AddPromptForm.tsx` - Form component
4. `src/components/prompts/PromptFormPreview.tsx` - Preview component
5. `src/components/ui/BackButton.tsx` - Back navigation
6. `src/app/(auth)/prompts/new/actions.ts` - Server actions
7. `src/lib/validations/prompt.ts` - Zod schemas (already listed)
8. `src/lib/utils/validation.ts` - Client helpers (optional)
9. Query functions (may already exist from Step 1)

---

## Step Completion Checklist

After this step, users should be able to:
- [ ] Click "Add Prompt" button in header (when logged in)
- [ ] Navigate to `/prompts/new` page
- [ ] See form with all fields
- [ ] Type in title and see it update in preview
- [ ] Type in description and see it update in preview
- [ ] Type in prompt text and see it update in preview
- [ ] Select category and see badge update in preview
- [ ] Select "Other" category and type custom category
- [ ] Check/uncheck AI platforms
- [ ] See character counters update in real-time
- [ ] See validation errors when fields are invalid
- [ ] Click Cancel and return to previous page
- [ ] Click Submit with valid data
- [ ] See prompt saved to database
- [ ] See prompt appear on homepage
- [ ] Get redirected to homepage after successful submit
- [ ] See error messages if submission fails

---

## Testing Step 3

### 1. Authentication Test
- Visit `/prompts/new` without logging in
- Should redirect to `/login`
- After login, should return to `/prompts/new`

### 2. Form Display Test
- All fields visible and properly labeled
- Character counters showing "0/X"
- Preview showing placeholders
- Buttons visible and styled correctly

### 3. Real-time Preview Test
- Type in title → Updates immediately in preview
- Type in description → Updates in preview
- Type in prompt text → Updates in preview
- Change category → Badge color changes in preview
- Select "Other" → Custom input appears

### 4. Validation Test
- Leave title empty → Error: "Title is required"
- Enter 5 characters in title → Error: "Title must be at least 10 characters"
- Enter 201 characters → Error: "Title exceeds 200 characters"
- Test same for description and prompt text
- Select "Other" without custom text → Error shown
- Submit button disabled when form invalid

### 5. Character Counter Test
- Type in title → Counter updates (e.g., "15/200")
- Exceed limit → Counter turns red
- Shows warning when near limit (optional enhancement)

### 6. Platform Selection Test
- Check ChatGPT → Checkbox checked
- Check multiple platforms → All saved
- Submit with 0 platforms → Should work (optional)
- Submit with all platforms → All linked in database

### 7. Submission Test
- Fill valid data → Click Submit
- See loading state (spinner or "Submitting...")
- Button disabled during submit
- Success: Redirect to homepage
- New prompt appears in grid (at top, newest first)

### 8. Database Test
- Check Supabase → New row in `prompts` table
- Verify all fields saved correctly
- Check `prompt_platforms` table → Correct links
- Verify user_id matches logged-in user

### 9. Cancel Test
- Fill form with data
- Click Cancel
- (Optional) See confirmation: "Discard changes?"
- Navigate back to previous page
- Data not saved

### 10. Error Handling Test
- Disconnect internet
- Try to submit → See error: "Network error, please try again"
- Submit duplicate title (optional uniqueness check)
- Server validation fails → See error message

### 11. Mobile Responsive Test
- View on mobile
- Form stacks vertically
- All inputs full width
- Preview appears below form
- Everything readable and tappable

---

## Common Issues & Solutions

**Issue**: Preview not updating
- Check state management in AddPromptForm
- Verify props passed to PromptFormPreview
- Check for console errors

**Issue**: Form submits with invalid data
- Ensure client-side validation runs before submit
- Check server-side validation is working
- Verify error messages display correctly

**Issue**: Redirect not working after submit
- Check router.push() or redirect() call
- Verify success condition is correct
- Check for JavaScript errors blocking redirect

**Issue**: Platforms not saving
- Verify `prompt_platforms` inserts happen
- Check platform IDs are correct
- Ensure junction table logic is correct

**Issue**: Custom category not saving
- Check "Other" condition logic
- Verify custom category text is captured
- Ensure it saves to `category` field

**Issue**: Character counter wrong
- Verify .length calculation
- Check for special characters or line breaks
- Ensure counter updates on every keystroke

---

## What's NOT in This Step

This step does NOT include:
- ❌ Edit prompts (v2 feature)
- ❌ Delete prompts (v2 feature)
- ❌ Draft saving (auto-save)
- ❌ Image upload
- ❌ Rich text editor
- ❌ AI-assisted prompt generation
- ❌ Prompt templates
- ❌ Batch import

We're just creating basic prompt submission. Advanced features come later!

---

## Dependencies Check

**Before starting Step 3, make sure**:
- ✅ Step 1 is complete (database tables exist)
- ✅ Step 2 is complete (have PromptCard and CategoryBadge components)
- ✅ Authentication works (can log in)
- ✅ Query functions exist (`createPrompt()` from Step 1)
- ✅ AI platforms exist in database (4 default platforms)

**If not, go back and complete previous steps!**

---

## Notes

- Focus on functionality first, polish later
- Keep form simple and clean
- Real-time preview is key feature
- Validate on both client and server (never trust client)
- Character counters help users write better prompts
- Category system matches Step 2 display
- AI platforms are optional (user may skip)
- All prompts are public in v1 (visibility checkbox cosmetic) ✅
- After Step 3, users can CREATE but not EDIT/DELETE (that's v2)

**Key Decisions Applied in Step 3**:
- ✅ Prompt text: 5000 chars (not 500)
- ✅ Custom categories allowed for "Other"
- ✅ Visibility checkbox is cosmetic only
- ✅ Auth follows constitution pattern (server-side fetch, context for client)
- ✅ All prompts show author email (not username)

---

## Integration with Other Steps

**Uses from Step 1**:
- `createPrompt()` query function
- `prompts` and `prompt_platforms` tables
- Authentication system
- Database types

**Uses from Step 2**:
- CategoryBadge component
- Prompt card design (for preview)
- Category colors (3-column grid layout) ✅
- Layout patterns
- Author display (email only) ✅

**Sets up for Step 4**:
- New prompts immediately visible on homepage (3-column grid) ✅
- Prompts can be liked and copied
- Search will find new prompts (homepage search bar only) ✅
- Platform buttons will show "Coming soon" message ✅
- Similar prompts (3 from same category) ✅

---

## Security Considerations

**Authentication**:
- Page requires login (redirect if not authenticated)
- Server validates user ID matches auth.uid()

**Input Validation**:
- Client-side: Prevent bad UX
- Server-side: Prevent malicious input
- Sanitize all text inputs (prevent XSS)

**Database**:
- RLS policies enforce user can only create with their own user_id
- Unique constraint on prompt_platforms prevents duplicates

**Rate Limiting** (optional v2):
- Limit prompts per user per day
- Prevent spam submissions

---

**Ready to build Step 3!** 🚀
