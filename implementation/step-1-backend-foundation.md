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

**`supabase/migrations/001_initial_schema.sql`**
- Creates all 4 tables
- Sets up security rules (RLS policies)
- Adds indexes for fast queries
- Inserts default AI platforms data

---

### Database Connection

**`lib/supabase/client.ts`**
- Connects to Supabase database
- Creates client for making queries
- Used by all other files

---

### Query Functions

**`lib/supabase/queries/prompts.ts`**

Functions:
- `getPrompts()` - get all prompts with filters and sorting
- `getPromptById(id)` - get one specific prompt
- `createPrompt(data)` - save new prompt to database
- `searchPrompts(keyword)` - search prompts by text

---

**`lib/supabase/queries/likes.ts`**

Functions:
- `toggleLike(promptId, userId)` - add or remove like
- `getLikeCount(promptId)` - count total likes for a prompt
- `hasUserLiked(promptId, userId)` - check if user already liked
- `getLikesByUser(userId)` - get all prompts a user liked

---

**`lib/supabase/queries/auth.ts`**

Functions:
- `getCurrentUser()` - get logged-in user info
- `requireAuth()` - check if user is logged in, redirect if not
- `getOptionalUser()` - get user if logged in, null if not

---

### Authentication Pages

**`app/login/page.tsx`**

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

**`app/register/page.tsx`**

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

**`lib/auth/middleware.ts`** (helper file)

What it does:
- Protects pages that need login
- Checks if user is logged in
- Redirects to login page if not
- Used on "Add Prompt" page and other protected pages

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
