# PromptHub - Quick Start Guide

## 🚀 You're at Step 1 Complete!

All code is ready. Follow these steps to get PromptHub running:

---

## Step-by-Step Setup (15 minutes)

### 1. Create Supabase Project (5 min)

1. Go to **https://supabase.com**
2. Click "New Project"
3. Fill in:
   - Name: `prompthub`
   - Password: (save it somewhere!)
   - Region: (choose closest to you)
4. Click "Create Project"
5. Wait 2-3 minutes ⏳

### 2. Get Your Credentials (2 min)

1. In Supabase Dashboard, click **Settings** (gear icon)
2. Click **API** in the left menu
3. Copy these two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Long string starting with `eyJ...`

### 3. Create .env.local File (2 min)

1. In your project root, create a file: `.env.local`
2. Add this content:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace with your actual values from Step 2
4. Save the file

### 4. Run Database Migration (3 min)

1. In Supabase Dashboard, click **SQL Editor**
2. Click **New Query**
3. Open `supabase/migrations/001_initial_schema.sql` in your code editor
4. Copy ALL the SQL code
5. Paste it into Supabase SQL Editor
6. Click **Run** (or press Ctrl/Cmd + Enter)
7. Should see: "Success. No rows returned"

### 5. Verify Tables Created (1 min)

1. In Supabase Dashboard, click **Table Editor**
2. You should see 4 tables:
   - ✅ prompts
   - ✅ prompt_likes
   - ✅ ai_platforms
   - ✅ prompt_platforms
3. Click **ai_platforms** → should have 4 rows (ChatGPT, Claude, Gemini, Other)

### 6. Start the App (2 min)

```bash
npm run dev
```

Open **http://localhost:3000**

### 7. Test Authentication (5 min)

1. Go to **http://localhost:3000/register**
2. Enter your email and password
3. Click "Create account"
4. Check your email inbox
5. Click the confirmation link
6. Go to **http://localhost:3000/login**
7. Enter email and password
8. Click "Sign in"
9. You should see: **"You are logged in! ✓"**

---

## ✅ Success!

If you see "You are logged in!" on the homepage, **Step 1 is complete!**

---

## What's Next?

### Step 2: Browse & View Prompts

Add the homepage with:
- 3-column prompt grid
- Prompt cards with categories
- Prompt detail page
- Header and Footer

See `implementation/step-2-browse-view-prompts.md`

---

## Troubleshooting

### ❌ "Invalid API key"
- Check `.env.local` is in project root (not in `src/`)
- Check you copied the **anon** key (not the service role key)
- Restart dev server: Stop (Ctrl+C) then `npm run dev`

### ❌ "Table does not exist"
- Make sure you ran the migration SQL
- Check Supabase Table Editor to verify tables exist
- Verify you're using the correct project

### ❌ Can't create account
- Check email is valid format
- Password must be at least 6 characters
- Check browser console for errors
- Verify Supabase project is not paused

### ❌ Email confirmation not arriving
- Check spam folder
- In Supabase Dashboard → Authentication → Settings:
  - Disable email confirmation for development (optional)
  - Or use a real email service

---

## Useful Commands

```bash
# Start development server
npm run dev

# Install dependencies
npm install

# Build for production
npm run build

# Generate database types (after schema changes)
npm run db:types
```

---

## File Locations

**Environment:**
- `.env.local` - Your Supabase credentials (in project root)

**Database:**
- `supabase/migrations/001_initial_schema.sql` - Database schema

**Auth Pages:**
- `src/app/login/page.tsx` - Login page
- `src/app/register/page.tsx` - Registration page

**Query Functions:**
- `src/lib/supabase/queries/auth.ts` - Auth helpers
- `src/lib/supabase/queries/prompts.ts` - Prompt queries
- `src/lib/supabase/queries/likes.ts` - Like queries
- `src/lib/supabase/queries/platforms.ts` - Platform queries

---

## Need More Help?

- **Full Setup Guide:** `SETUP.md`
- **Step 1 Complete:** `STEP-1-COMPLETE.md`
- **Implementation Plans:** `implementation/` folder
- **Lab37 Standards:** `docs/lab-37-constitution.md`

---

## Quick Links

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Local App:** http://localhost:3000
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

**Ready? Start with Step 1 above! 🎉**
