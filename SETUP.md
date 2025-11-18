# PromptHub Setup Guide - Step 1 Complete! 🎉

## What's Been Created

Step 1: Backend Foundation is now complete! Here's what we've built:

### ✅ Project Structure
- Next.js 15 with TypeScript
- Tailwind CSS configured
- All dependencies installed

### ✅ Database Schema
- Migration file: `supabase/migrations/001_initial_schema.sql`
- Tables: prompts, prompt_likes, ai_platforms, prompt_platforms
- Database view: prompts_with_stats
- Row Level Security (RLS) policies configured

### ✅ Supabase Integration
- Client files (browser, server, middleware)
- Middleware for token refresh
- Query functions for prompts, likes, platforms, and auth

### ✅ Authentication
- Login page (`/login`)
- Registration page (`/register`)
- Server actions for auth flows
- AuthProvider context for client components

---

## Next Steps - Complete the Setup

### 1. Set Up Supabase Project

**Go to:** https://supabase.com

1. Create a free account (if you don't have one)
2. Create a new project:
   - Name: `prompthub` (or any name you like)
   - Database Password: **Save this somewhere safe!**
   - Region: Choose closest to you
   - Wait 2-3 minutes for project to initialize

3. Get your credentials:
   - Go to Project Settings (gear icon)
   - Click "API" section
   - Copy these two values:
     - **Project URL** (looks like `https://xxxxx.supabase.co`)
     - **anon/public key** (long string)

### 2. Create Environment File

1. In your project root, create a file called `.env.local`
2. Copy the contents from `.env.local.example`
3. Replace the placeholder values with your actual Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Never commit `.env.local` to git! It's already in `.gitignore`.

### 3. Run the Database Migration

You have two options:

#### Option A: Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard
2. Click "SQL Editor" in the left menu
3. Click "New Query"
4. Open `supabase/migrations/001_initial_schema.sql`
5. Copy **all** the SQL code
6. Paste it into the SQL editor
7. Click "Run"
8. You should see "Success. No rows returned"
9. Click "Table Editor" to verify - you should see 4 tables

#### Option B: Supabase CLI (Advanced)

If you have the Supabase CLI installed:
```bash
supabase db push
```

### 4. Verify Tables Created

In Supabase Dashboard → Table Editor, you should see:
- ✅ prompts
- ✅ prompt_likes
- ✅ ai_platforms (with 4 rows: ChatGPT, Claude, Gemini, Other)
- ✅ prompt_platforms

### 5. Start the Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 6. Test Authentication

1. Go to http://localhost:3000/register
2. Create an account with your email
3. Check your email for confirmation (Supabase sends this automatically)
4. Click the confirmation link
5. Go to http://localhost:3000/login
6. Log in with your credentials
7. You should see the homepage with "You are logged in! ✓"

---

## Troubleshooting

### "Invalid API key" error
- Check that you copied the correct anon key from Supabase
- Make sure `.env.local` is in the project root (not in `src/`)
- Restart the dev server after changing `.env.local`

### Tables not appearing
- Make sure you ran the migration SQL in Supabase SQL Editor
- Check for errors in the SQL Editor output
- Verify your project is active (not paused)

### Can't create account
- Check Supabase dashboard → Authentication → Users
- Look for error messages in browser console
- Verify RLS policies are enabled

### Next.js errors
- Run `npm install` again
- Delete `.next` folder and restart: `rm -rf .next && npm run dev`

---

## What's Next?

Once Step 1 is working:

### Step 2: Browse & View Prompts (6-7 hours)
- Homepage with prompt grid
- Prompt detail page
- Categories and basic layout

### Step 3: Add Prompts (3-4 hours)
- Add Prompt page with form
- Validation and submission

### Step 4: Search, Filter & Interactions (5-7 hours)
- Search and filters
- Like and copy buttons
- Optimistic updates

### Step 5: Polish & Deploy (3-4 hours)
- Mobile responsiveness
- Loading states
- Deploy to Vercel

---

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Generate Supabase types (after schema changes)
npm run db:types

# Install dependencies
npm install
```

---

## File Structure Created

```
prompthub.ge/
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── auth.ts                 # Server actions for auth
│   │   ├── login/
│   │   │   ├── page.tsx                # Login page
│   │   │   └── LoginForm.tsx           # Login form component
│   │   ├── register/
│   │   │   ├── page.tsx                # Registration page
│   │   │   └── RegisterForm.tsx        # Registration form
│   │   ├── layout.tsx                  # Root layout with AuthProvider
│   │   ├── page.tsx                    # Homepage (placeholder)
│   │   └── globals.css                 # Global styles
│   ├── components/
│   │   ├── ui/                         # UI components (empty, for Step 2)
│   │   ├── layout/                     # Layout components (for Step 2)
│   │   └── prompts/                    # Prompt components (for Step 2)
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts               # Browser Supabase client
│   │   │   ├── server.ts               # Server Supabase client
│   │   │   ├── middleware.ts           # Middleware for token refresh
│   │   │   └── queries/
│   │   │       ├── auth.ts             # Auth query functions
│   │   │       ├── prompts.ts          # Prompt query functions
│   │   │       ├── likes.ts            # Like query functions
│   │   │       └── platforms.ts        # Platform query functions
│   │   └── auth/
│   │       └── auth-context.tsx        # AuthProvider for client components
│   └── types/
│       └── database.ts                 # TypeScript types (placeholder)
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql      # Database schema
├── middleware.ts                        # Next.js middleware
├── .env.local.example                   # Environment template
├── package.json                         # Dependencies
├── tailwind.config.ts                   # Tailwind config
├── tsconfig.json                        # TypeScript config
└── next.config.ts                       # Next.js config
```

---

## Need Help?

Check these resources:
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Lab37 Constitution:** `docs/lab-37-constitution.md`
- **Implementation Plans:** `implementation/` folder

---

**You're ready to go! Complete the setup steps above and test your authentication. Once that's working, we'll move on to Step 2!** 🚀
