# Step 1: Backend Foundation

**Goal**: Database + Auth ready
**Time**: 6-8 hours
**Status**: Planning

---

## What We're Building

Set up the database structure and user authentication system. Create tables for storing prompts, likes, and AI platform information. Configure security rules so anyone can view prompts but only logged-in users can add them. Build the login and registration pages so users can create accounts and sign in.

---

## Database Tables Needed

### 1. prompts
Stores all prompts submitted by users

**Fields**:
- id - unique identifier
- user_id - who created this prompt
- title - prompt title
- description - what the prompt is for
- prompt_text - the actual prompt content
- category - Dropdown with 5 options (Coding, Business, Writing, Design, Other). If user selects "Other", they can type custom category name
- copy_count - how many times this prompt was copied (number, starts at 0)
- created_at - when it was created
- updated_at - when it was last modified

**Security**:
- Anyone can view prompts
- Only logged-in users can create prompts
- Only owner can update/delete (v2 feature)

---

### 2. likes
Tracks which users liked which prompts

**Fields**:
- id - unique identifier
- prompt_id - which prompt was liked
- user_id - who liked it
- created_at - when they liked it

**Rules**:
- One user can only like a prompt once
- No duplicate likes allowed

**Security**:
- Anyone can view like counts
- Only logged-in users can add likes
- Only the user who liked can remove their like

---

### 3. ai_platforms
List of AI platforms (reference data)

**Fields**:
- id - unique identifier
- name - platform name (ChatGPT, Claude, Gemini, Other)

**Data**:
- Pre-filled with: ChatGPT, Claude, Gemini, Other
- This is a fixed list

**Security**:
- Anyone can view
- No one can modify (admin only)

---

### 4. prompt_platforms
Links prompts to AI platforms (many-to-many)

**Fields**:
- id - unique identifier
- prompt_id - which prompt
- platform_id - which platform

**Purpose**:
- One prompt can work with multiple platforms
- Shows which AI tools are compatible

**Security**:
- Anyone can view
- Created automatically when user submits prompt

---

## Supabase Setup (Before Creating Files)

Before we write code, you need to set up Supabase and get your connection credentials.

### How to Get Supabase Credentials:

**Step 1**: Go to https://supabase.com and create free account

**Step 2**: Create a new project
- Give it a name (example: "prompthub")
- Choose a password (save it somewhere safe)
- Choose region (closest to you)
- Wait 2-3 minutes for project to be ready

**Step 3**: Get your credentials
- Go to Project Settings (gear icon)
- Click "API" section
- Copy two things:
  - **Project URL** (looks like: https://xxxxx.supabase.co)
  - **anon/public key** (long string of random characters)

**Step 4**: Create environment file
Create a file called `.env.local` in your project root with this format:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace "your-project-url-here" and "your-anon-key-here" with the values you copied.

**Important**: Never share these keys publicly or commit them to GitHub!

---

## Files to Create

### Database Files

**`supabase/migrations/001_initial_schema.sql`** (migrations don't go in src/)
- Creates all 4 tables
- Sets up security rules (RLS policies)
- Adds indexes for fast queries
- Inserts default AI platforms data

---

### Database Connection

**`src/lib/supabase/client.ts`**
- Connects to Supabase database
- Creates client for making queries
- Used by all other files

---

## Database View: How Data Flows

### Understanding the Data Structure

**We have RAW TABLES** (store individual pieces of data):
- `prompts` - stores prompt info
- `likes` - stores who liked what
- `prompt_platforms` - stores which platforms work with which prompts
- `ai_platforms` - stores platform names

**We have a VIEW** (combines data from multiple tables):
- `prompts_with_stats` - joins everything together

**Query functions USE the view** to get complete data in one query.

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ RAW TABLES (Database)                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  prompts table          likes table         prompt_platforms│
│  ├─ id                  ├─ prompt_id        ├─ prompt_id   │
│  ├─ title               ├─ user_id          ├─ platform_id │
│  ├─ description         └─ ...              └─ ...         │
│  ├─ category                                                │
│  ├─ copy_count                                              │
│  └─ ...                                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ VIEW (Combines tables automatically)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  prompts_with_stats VIEW                                    │
│  ├─ All prompt fields (title, description, etc.)           │
│  ├─ author_email (from auth.users table)                   │
│  ├─ like_count (COUNT of likes)                            │
│  ├─ platforms (JSON array of platform names)               │
│  └─ Calculated on-the-fly when queried                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ QUERY FUNCTIONS (lib/supabase/queries/)                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  getPrompts()           getPromptById()                     │
│  ├─ Queries VIEW        ├─ Queries VIEW                    │
│  ├─ Adds filtering      ├─ Gets single row                 │
│  ├─ Adds sorting        └─ Returns enriched data           │
│  └─ Returns array                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ COMPONENTS (React/Next.js)                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Homepage                Detail Page                        │
│  ├─ Calls getPrompts()  ├─ Calls getPromptById()          │
│  ├─ Gets array with:    ├─ Gets object with:              │
│  │  • All prompt data   │  • All prompt data              │
│  │  • author_email      │  • author_email                 │
│  │  • like_count        │  • like_count                   │
│  │  • platforms list    │  • platforms list               │
│  └─ Displays cards      └─ Displays detail                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Why Use a View?

**Without view**: Need 3 separate queries
1. Get prompts
2. Count likes for each prompt
3. Get platforms for each prompt

**With view**: One query gets everything!

**Performance**: Database does the joining efficiently

**Simplicity**: Query functions just use the view, don't worry about joins

---

### Query Functions

**`src/lib/supabase/queries/prompts.ts`**

Functions:
- `getPrompts()` - get all prompts with enriched data
  - Queries `prompts_with_stats` view (not raw prompts table)
  - Returns: prompt data + author_email + like_count + platforms array
  - Supports: filtering by category, searching, sorting
  - Example: `[{id, title, description, category, author_email: "user@example.com", like_count: 45, platforms: [{name: "ChatGPT"}, ...]}]`

- `getPromptById(id)` - get one specific prompt with all details
  - Queries `prompts_with_stats` view
  - Returns single object with enriched data
  - Example: `{id, title, description, prompt_text, author_email: "user@example.com", like_count: 45, platforms: [...]}`

- `createPrompt(data)` - save new prompt to database
  - Inserts into raw `prompts` table
  - Also inserts into `prompt_platforms` junction table
  - Returns the created prompt

- `incrementCopyCount(promptId)` - increase copy counter
  - Updates `copy_count` field in prompts table
  - Called when user clicks copy button (Step 4)
  - No return value needed

---

**`src/lib/supabase/queries/likes.ts`**

Functions:
- `toggleLike(promptId, userId)` - add or remove like
- `getLikeCount(promptId)` - count total likes for a prompt
- `hasUserLiked(promptId, userId)` - check if user already liked
- `getLikesByUser(userId)` - get all prompts a user liked

---

**`src/lib/supabase/queries/auth.ts`**

Functions following Lab37 Constitution pattern:

- `getOptionalUser()` - get user if logged in, null if not (primary pattern ✅)
  - Use in Server Components for auth checks
  - Returns User object or null
  - Example: `const user = await getOptionalUser();`

- `requireAuth()` - DEPRECATED - Use `getOptionalUser()` + manual redirect instead
  - Old pattern: `const user = await requireAuth();`
  - New pattern: `const user = await getOptionalUser(); if (!user) redirect('/login');`

---

### Authentication Pages

**`src/app/login/page.tsx`**

What it shows:
- Page title "Login"
- Email input field
- Password input field
- "Login" button
- Link to registration page ("Don't have an account? Sign up")

What it does:
- User enters email and password
- Clicks login button
- Checks credentials with Supabase
- If correct: redirect to homepage
- If wrong: show error message

---

**`src/app/register/page.tsx`**

What it shows:
- Page title "Create Account"
- Email input field
- Password input field
- Confirm password input field
- "Create Account" button
- Link to login page ("Already have an account? Login")

What it does:
- User enters email and password twice
- Checks passwords match
- Creates new account in Supabase
- Sends confirmation email
- Redirects to login or homepage

---

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

---

## Project Structure & Standards

### Folder Structure

**We follow the Lab37 Constitution** (see `docs/lab-37-constitution.md`)

All source code goes in `src/` folder:

```
prompthub.de/
├── src/
│   ├── app/                    # Next.js routes
│   │   ├── (public)/          # Public pages (no auth)
│   │   │   ├── page.tsx       # Homepage
│   │   │   └── prompts/[id]/
│   │   ├── (auth)/            # Protected pages
│   │   │   └── prompts/new/
│   │   ├── login/
│   │   └── register/
│   ├── components/
│   │   ├── prompts/           # Prompt components
│   │   ├── ui/                # Reusable UI
│   │   └── layout/            # Layout components
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── queries/
│   │   ├── auth/
│   │   └── utils/
│   └── types/
│       └── database.ts        # Generated Supabase types
├── supabase/
│   └── migrations/            # Database migrations (not in src/)
├── .env.local                 # Environment variables
└── package.json
```

**Important**: The `src/` folder keeps code organized and separate from config files.

---

### TypeScript Types

**Where types are generated**: `src/types/database.ts`

**How to generate**:
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

**How to use in query functions**:
```typescript
// src/lib/supabase/queries/prompts.ts
import { Database } from '@/types/database';

type Prompt = Database['public']['Tables']['prompts']['Row'];
type PromptInsert = Database['public']['Tables']['prompts']['Insert'];

export async function getPrompts(): Promise<Prompt[]> {
  // TypeScript knows the shape of data!
}
```

**Why this matters**: TypeScript autocomplete and type safety for all database operations.

---

### Environment Variables Usage

**File**: `.env.local` (in project root, NOT in src/)

**Contents**:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
```

**How to use in code** (`src/lib/supabase/client.ts`):
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Important**:
- `NEXT_PUBLIC_` prefix = available in browser
- Without prefix = server-only
- Never commit `.env.local` to GitHub!

---

### Server vs Client Components (Glossary)

**Server Components** (default in Next.js 15):
- Run on server
- Can fetch data directly
- Cannot use state, events, or browser APIs
- Faster initial load
- Example: Pages that fetch and display data

```typescript
// src/app/(public)/page.tsx
// No 'use client' = Server Component
export default async function HomePage() {
  const prompts = await getPrompts(); // Direct DB query!
  return <div>{/* Display prompts */}</div>
}
```

**Client Components** (need 'use client'):
- Run in browser
- Can use state (useState, useReducer)
- Can use events (onClick, onChange)
- Can use browser APIs
- Example: Forms, buttons, interactive UI

```typescript
// src/components/prompts/PromptCard.tsx
'use client'; // ← This makes it a Client Component

export function PromptCard() {
  const [liked, setLiked] = useState(false);

  return <button onClick={() => setLiked(!liked)}>Like</button>
}
```

**When to use each**:
- **Use Server** by default (better performance)
- **Use Client** only when you need: state, events, browser APIs

---

## Security Rules Summary

**Public (anyone can view)**:
- All prompts
- Like counts
- AI platforms list

**Requires login**:
- Creating prompts
- Liking prompts
- Accessing "Add Prompt" page

**Owner only**:
- Removing your own like
- Editing/deleting your prompts (v2)

---

## How to Run the Database Schema

After creating all the files, you need to run the SQL to create the tables.

### Option 1: Using Supabase Dashboard (Easiest for beginners)

**Step 1**: Open your Supabase project dashboard

**Step 2**: Click "SQL Editor" in the left menu

**Step 3**: Click "New Query"

**Step 4**: Copy everything from `supabase/migrations/001_initial_schema.sql` file

**Step 5**: Paste it into the SQL editor

**Step 6**: Click "Run" button

**Step 7**: Check for success message (should say "Success. No rows returned")

**Step 8**: Click "Table Editor" to see your new tables (prompts, likes, ai_platforms, prompt_platforms)

### Option 2: Using Supabase CLI (Advanced)

If you installed Supabase CLI, you can run:
```
supabase db push
```

This automatically applies all migrations.

---

## Step Completion Checklist

After this step, users should be able to:
- [ ] Supabase project is created
- [ ] Environment variables are set up (.env.local file)
- [ ] Database tables exist (visible in Supabase dashboard)
- [ ] All 8 files are created
- [ ] Login/register pages are visible (can navigate to them)
- [ ] Create a new account
- [ ] Log in with email and password
- [ ] Query functions are ready to use in next steps

---

## Testing Step 1

**How to know it's working:**

1. **Database test**: Go to Supabase dashboard → Table Editor → You should see 4 tables
2. **Auth test**: Go to your site → /register → Create account → Should get confirmation email
3. **Login test**: Go to /login → Enter email/password → Should redirect to homepage
4. **AI Platforms test**: In Supabase → ai_platforms table → Should have 4 rows (ChatGPT, Claude, Gemini, Other)

**If something doesn't work:**
- Check environment variables are correct
- Check SQL ran without errors
- Check Supabase project is active (not paused)

---

## Notes

- No actual prompts exist yet - that comes in Step 2
- Login/register pages are basic - no password reset yet (can add in v2)
- Database will be empty initially - we'll add sample data in testing
- Icons will be added later
- Email confirmation is automatic with Supabase (no extra work needed)
