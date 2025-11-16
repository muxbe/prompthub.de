Lab37 Constitution v1.2
Last Updated: October 23, 2025 Status: Active Philosophy: Start simple, add complexity slowly

Table of Contents
Core Values & Principles
Technical Stack
Folder Structure
Code Quality Standards
Development Workflow
AI-Assisted Development
Database & Supabase Standards
Authentication Patterns
Git Standards
Core Values & Principles
What We Optimize For
Start simple, add complexity slowly

Don't over-engineer
Add structure only when needed
Iterate and refactor as we learn
Simplicity over completeness

Build what's needed now
Perfect is the enemy of done
Ship fast, improve later
Speed of shipping over perfection

Get to users quickly
Learn from real usage
Iterate based on feedback
Comprehensible to humans AND AI

Code is read more than written
Clear structure helps everyone
Proper abstractions aid understanding
The Lab37 Way
We're building "alive artifacts" - software that feels meaningful and personal. Every technical decision should serve this vision. We leverage AI heavily but maintain human oversight on architecture and product vision.

Technical Stack
Core Technologies
Framework: Next.js 15 (App Router)
Language: TypeScript (strict mode)
Backend: Supabase (PostgreSQL + Auth + Storage)
Hosting: Vercel
State Management: TanStack Query (primary)
State Management: Zustand (only when absolutely necessary)
Validation: Zod
Auth: @supabase/ssr (NEVER use deprecated @supabase/auth-helpers-nextjs)
Technical Principles
Server Components by default

Use Server Components unless you need interactivity
Only mark components with 'use client' when necessary
Server Components are faster and more secure
TypeScript strict mode always

No any types (use unknown if needed, then narrow)
Generate and use Supabase database types
Types catch bugs before runtime
Forms use Server Actions + Zod

Server Actions for form submissions
Zod schemas for validation
Return user-friendly error messages
Navigation uses Next.js Link component

Use <Link> for all internal navigation (not router.push() or <a> tags)
Automatic prefetching, better SEO, accessibility
Use Button with asChild prop for styled links: <Button asChild><Link href="/path">Text</Link></Button>
Only use router.push() for programmatic navigation (redirects after actions)
Only use onClick handlers for non-navigation actions (sign out, modals, etc.)
Never use deprecated packages

Check documentation for current best practices
Update dependencies regularly
Document why we use each library
Folder Structure
Standard Lab37 Project Structure
/project-root
├── src/
│   ├── app/                    # Next.js App Router (routes only)
│   │   ├── (auth)/            # Route group: authenticated pages
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── profile/
│   │   │       └── page.tsx
│   │   ├── (public)/          # Route group: public pages
│   │   │   ├── page.tsx       # Landing page
│   │   │   └── about/
│   │   │       └── page.tsx
│   │   ├── api/               # API routes
│   │   │   └── [...]/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Generic: Button, Input, Card
│   │   └── shared/           # Shared across features: Navbar, Footer
│   │
│   ├── features/             # Feature-specific code (COLLOCATED)
│   │   └── [feature-name]/   # Example: interviews, prompts, etc.
│   │       ├── components/   # Components only for this feature
│   │       ├── hooks/        # Hooks only for this feature
│   │       ├── actions.ts    # Server Actions for this feature
│   │       ├── queries.ts    # TanStack queries for this feature
│   │       └── types.ts      # Types specific to this feature
│   │
│   ├── lib/                  # Core utilities & integrations
│   │   ├── supabase/
│   │   │   ├── client.ts    # Supabase browser client
│   │   │   ├── server.ts    # Supabase server client
│   │   │   ├── middleware.ts # Session refresh
│   │   │   └── queries/     # Database query functions
│   │   │       ├── users.ts
│   │   │       ├── [feature].ts
│   │   │       └── index.ts
│   │   ├── auth/
│   │   │   └── helpers.ts   # requireAuth(), getOptionalUser()
│   │   ├── validations/     # Zod schemas
│   │   └── utils.ts         # General utilities
│   │
│   ├── types/
│   │   └── database.ts      # Generated Supabase types
│   │
│   └── hooks/               # Global hooks (if not feature-specific)
│       └── queries/         # Global TanStack Query hooks
│
├── public/                  # Static assets
├── docs/                    # Specifications & documentation
│   ├── specifications/
│   │   └── [feature]-spec.md
│   └── plans/
│       └── [feature]-plan.md
│
├── .cursorrules             # Cursor AI configuration
├── CLAUDE.md                # Claude Code configuration
└── lab37-constitution.md    # This file
Folder Structure Principles
Routes in /app - Only routing logic, use route groups like (auth) and (public) for organization
Features are collocated - Everything for a feature lives together in /features/[feature-name]
Shared stuff at top level - Only truly reusable components go in /components
Clear hierarchy - You can understand the whole project by reading top-level folders
Files under 300 lines - If bigger, split into logical modules
Code Quality Standards
TypeScript Rules
No any types - Use unknown if truly needed, then narrow with type guards
Exception: Third-party library types that are genuinely broken (document why in comment)
Use generated Supabase types - Run npm run db:types after schema changes
Strict mode enabled - Catch bugs at compile time
Naming Conventions
Variables & Functions:

Descriptive names: getUserInterviews() not getUI()
Boolean variables: isLoading, hasAccess, canEdit
Arrays/lists: plural names users, interviews
Constants: UPPER_SNAKE_CASE for true constants
Files & Folders:

kebab-case: interview-card.tsx, user-profile.tsx
Feature folders: lowercase interviews/, prompts/
Components: PascalCase filenames match component name
Comments & Documentation
Required comments:

Complex logic that isn't immediately obvious
Non-obvious decisions or workarounds
"Why" something is done a certain way
Business logic that has specific requirements
Not required:

Self-explanatory code
Obvious operations
Example:

// ❌ Bad: Increment counter
count++;

// ✅ Good: Cache for 5 minutes because API has rate limits
const CACHE_TTL = 300000;
Error Handling
Must handle:

Database errors (Supabase queries can fail)
Form validation errors
Network errors (API calls)
Authentication errors
Standard pattern:

Client-side: Show user-friendly message

try {
  await createInterview(data);
  toast.success("Interview created successfully");
} catch (error) {
  toast.error("Failed to create interview. Please try again.");
  console.error("Interview creation failed:", error);
}
Server-side: Log and throw structured error

try {
  return await supabase.from("interviews").insert(data);
} catch (error) {
  console.error("Database error in createInterview:", error);
  throw new Error("Failed to create interview");
}
What's NOT Required (Simplicity Over Perfection)
❌ Unit tests (unless critical business logic)
❌ Perfect abstraction (refactor when needed, not preemptively)
❌ Complete edge case handling (handle happy path + obvious failures)
❌ Perfect UI polish (iterate based on user feedback)
The Quality Question
"Could Mariam pick up this code in 2 weeks and understand what it does and why, without asking me?"

If YES → good enough to merge If NO → needs better names, comments, or structure

Development Workflow
The Three-Document System
All features require three documents:

[feature]-spec.md - What and why (user perspective)
[feature]-plan.md - How (technical approach, AI-generated)
Implementation - Code following the plan
When to Write a Spec
ALWAYS write a spec (200+ words minimum):

New features or user-facing functionality
Anything that takes >4 hours to build
Changes to database schema
When team members are unclear about requirements
SKIP the spec (just do it):

Bug fixes
UI styling tweaks
Copy/text changes
Obvious small improvements
Workflow Steps
1. Create [feature]-spec.md using template
   └─ Fill out: User Story, User Flow, Technical Implementation

2. Ask AI: "Read @spec.md and @constitution.md. Generate a plan.md
   that breaks this into implementation steps."

3. Review plan.md
   ├─ Does it follow our folder structure?
   ├─ Are steps small enough (<1 hour each)?
   ├─ Does it use our patterns?
   └─ Any missing considerations?

4. Approve/iterate on plan → Get Shoto's 👍

5. Give AI: "@spec.md @plan.md - Implement step 1"

6. After step 1 complete → commit → implement step 2

7. When reality differs from spec → update spec immediately
Approval Process
Shoto approves all specs initially (keep it simple)
Future: Can delegate to team members as trust builds
Learning Loop
After building 5 features with specs, team reviews:

Did specs help or slow us down?
What sections were useful vs. wasteful?
What should we change?
Constitution evolves based on what we learn.

AI-Assisted Development
Core Principles
We're an AI-first company. AI helps us build faster, but humans maintain architecture and vision.

"AI is a junior developer who codes fast but needs clear direction. Your job is to provide context, catch mistakes, and maintain the architecture."

1. Always Generate a Plan First
Before any coding:

Prompt: "Read @[feature]-spec.md and @lab37-constitution.md.
Generate a detailed plan.md that breaks this feature into
small implementation steps. Include:
- Database changes needed
- Files to create/modify
- Order of implementation
- Estimated time per step
- Potential issues to consider"
Review the plan:

Does it follow our folder structure?
Are steps small enough (under 1 hour each)?
Does it use our patterns (Supabase client passing, etc.)?
Iterate on plan if needed, then approve before coding.

2. Give AI the Right Context
Before asking Cursor/Claude to generate code:

Good prompt structure:

Reference the spec: @[feature]-spec.md
Reference the plan: @[feature]-plan.md
Reference constitution: @lab37-constitution.md
Reference relevant files: @lib/supabase/queries/users.ts
State the task clearly: "Create the database query functions for interviews"
Example:

Read @interview-flow-spec.md, @interview-flow-plan.md,
and @lab37-constitution.md.

Create the interview database query functions in
/lib/supabase/queries/interviews.ts following the pattern
from @lib/supabase/queries/users.ts
3. Break Tasks Into Small Pieces
AI works best on discrete, bounded tasks:

❌ Bad: "Build the entire interview feature"

✅ Good:

Step 1: "Create the database query functions for interviews"
Step 2: "Create the TanStack Query hooks using those functions"
Step 3: "Create the InterviewCard component"
Step 4: "Create the interview page that uses the hooks"
Rule: One prompt = one file or one function. Not ten files.

4. Review Before Running
Workflow:

AI generates code
Read it first - does it make sense?
Check: Does it follow our folder structure?
Check: Does it use the right Supabase client pattern?
Check: Are variable names clear and descriptive?
Then run it
If broken, show AI the error and iterate
Never blindly accept and run. AI hallucinates. You catch it by reading.

5. Project Context Files
For Cursor: Create .cursorrules in project root For Claude Code: Create CLAUDE.md in project root

What to include:

# Project: [Project Name]

## Structure

- Database queries: /lib/supabase/queries/
- TanStack hooks: /hooks/queries/
- Features: /features/[feature-name]/

## Our Patterns

- All database query functions accept supabase client as first parameter
- Use Server Components by default, 'use client' only when needed
- Forms use Server Actions + Zod validation
- Never use @supabase/auth-helpers-nextjs (deprecated)

## Before You Code

- Read the spec in @[feature]-spec.md
- Read the plan in @[feature]-plan.md
- Follow @lab37-constitution.md standards
- Check example patterns in existing code
6. When AI Goes Wrong
Common problems:

Hallucinated imports: AI invents packages that don't exist

Fix: Show error, ask AI to use real packages from package.json
Wrong Supabase client: Uses browser client in Server Component

Fix: Point to constitution pattern, show correct example
Ignores folder structure: Puts files in wrong place

Fix: Show folder structure, ask to move files
Pattern: Treat AI like a junior developer. Give clear feedback, show examples, reference standards.

7. Development Server Rules
❌ NEVER run npm run dev if:

A terminal is already showing dev server output
The user said "the app is running"
Port 3000 is already in use
✅ INSTEAD:

If user asks to start server AND no terminal visible, ask: "Is the dev server already running?"
If making code changes, just save files - Next.js auto-reloads
Only start dev server if explicitly asked AND confirmed it's not running
Example AI behavior:

User: "Add a login button to the navbar"
AI: [Edits navbar file, saves]
    "I've added the login button. Since your dev server is running,
    the changes should appear automatically."

NOT: "Let me start the dev server..." ❌
8. Handoffs Between Team Members
When Mariam picks up where Shoto left off:

Read the spec: @[feature]-spec.md
Read the plan: @[feature]-plan.md
Ask Cursor: "Summarize what's been built so far for this feature"
Ask Cursor: "What needs to be done next according to plan?"
Continue with small tasks
9. The Quality Check
Before committing AI-generated code, ask:

✅ Does it follow our folder structure?
✅ Does it match the spec?
✅ Are variable names clear and descriptive?
✅ Does it use the right Supabase client pattern?
✅ Would Mariam understand this in 2 weeks?
If 5/5 yes → commit If not → iterate with AI to fix

Database & Supabase Standards
Schema Changes - Flexible Approach
Option 1: Supabase Dashboard (Quick iteration)

Use when: Rapid prototyping, small changes, MVP phase
Good for: Lab37's "move fast" philosophy
After changes: Always regenerate types
Option 2: SQL Migrations (Production-ready)

Use when: Stabilizing features, team coordination needed
Location: /supabase/migrations/
Run: supabase migration new [name]
Good for: Version control, reproducible across environments
Rule: Pick one per project phase. Don't mix randomly.

RLS (Row Level Security) - Secure by Default
Default: RLS ENABLED on all tables

-- When creating any new table:
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Then add policies:
CREATE POLICY "Users can read own data"
  ON table_name FOR SELECT
  USING (auth.uid() = user_id);
Only disable RLS when:

Public read-only data (e.g., blog posts, public prompts)
Explicitly documented in spec why it's safe
Admin/system tables that bypass user auth
Pattern to follow:

Create table
Enable RLS immediately
Add policies for: SELECT, INSERT, UPDATE, DELETE
Test: Can users access others' data? (Should fail)
Type Generation
Add to package.json:

{
  "scripts": {
    "db:types": "supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts",
    "db:types:local": "supabase gen types typescript --local > src/types/database.ts"
  }
}
When to run:

✅ After every schema change (table, column, policy)
✅ Before committing database changes
✅ When pulling latest from teammate who changed schema
Process:

# 1. Make schema changes (dashboard or migration)
# 2. Regenerate types
npm run db:types

# 3. Commit both schema + types together
git add supabase/migrations/* src/types/database.ts
git commit -m "feat: add interviews table with types"
Database Query Functions Pattern
All database query functions in /lib/supabase/queries/ must:

Accept supabase: SupabaseClient<Database> as first parameter
Never create client inside the function
Be reusable in Server Components, Client Components, and Server Actions
Example:

// lib/supabase/queries/users.ts
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

type Client = SupabaseClient<Database>;

export async function getUsers(supabase: Client) {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data;
}

export async function getUserById(supabase: Client, id: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}
Usage in different contexts:

// Server Component
import { createClient } from '@/lib/supabase/server'
import { getUsers } from '@/lib/supabase/queries/users'

export default async function UsersPage() {
  const supabase = await createClient()
  const users = await getUsers(supabase)
  return <div>...</div>
}

// Client Component with TanStack Query
'use client'
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { getUsers } from '@/lib/supabase/queries/users'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const supabase = createClient()
      return getUsers(supabase)
    },
  })
}

// Server Action
'use server'
import { createClient } from '@/lib/supabase/server'
import { getUserById } from '@/lib/supabase/queries/users'

export async function updateUserAction(userId: string, data: any) {
  const supabase = await createClient()
  const user = await getUserById(supabase, userId)
  // ... update logic
}
Benefits:

✅ Same query function works everywhere
✅ Explicit about which client you're using
✅ Easy to test (mock the client)
✅ Type-safe with your Database types
Authentication Patterns
Setup: Three Client Functions (Required)
File structure:

/lib/supabase/
├── client.ts       # Browser client (Client Components)
├── server.ts       # Server client (Server Components, Actions)
└── middleware.ts   # Middleware client (token refresh)
Middleware Setup (Required)
Root middleware.ts:

import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
What this does:

Automatically refreshes expired Auth tokens
Stores tokens in cookies
Runs on every request to keep sessions alive
Required for SSR auth to work properly
Protecting Routes
CRITICAL SECURITY RULE:

Always use supabase.auth.getUser() to protect pages and user data. Never trust supabase.auth.getSession() inside Server Components. It isn't guaranteed to revalidate the Auth token.

Pattern 1: Protected Server Component

// app/(auth)/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return <div>Hello {data.user.email}</div>
}
Pattern 2: Public Route (No Auth Check)

// app/(public)/page.tsx
export default function HomePage() {
  return <div>Welcome to Lab37!</div>
}
Pattern 3: Redirect if Already Logged In

// app/(public)/login/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    redirect('/dashboard')
  }

  return <LoginForm />
}
Auth Helper Functions
Create /lib/auth/helpers.ts:

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return data.user;
}

export async function getOptionalUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
}
Usage:

// Protected page - redirects if not logged in
export default async function DashboardPage() {
  const user = await requireAuth()
  return <div>Hello {user.email}</div>
}

// Optional auth page - returns null if not logged in
export default async function HomePage() {
  const user = await getOptionalUser()
  return <div>{user ? `Hello ${user.email}` : 'Welcome!'}</div>
}
Passing Auth State to Client Components
Problem: Client Components using async hooks for auth cause hydration mismatches (server renders different HTML than client).

Solution: Fetch user on server in root layout, pass via AuthProvider context.

Create /lib/auth/auth-context.tsx:

"use client";

import { createContext, useContext } from "react";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {
  return (
    <AuthContext.Provider value={{ user: initialUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
Update root layout.tsx:

import { AuthProvider } from "@/lib/auth/auth-context";
import { getOptionalUser } from "@/lib/auth/helpers";

export default async function RootLayout({ children }) {
  const user = await getOptionalUser(); // Fetch on server once

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
Use in Client Components:

"use client";
import { useAuth } from "@/lib/auth/auth-context";

export function Header() {
  const { user } = useAuth(); // Get user from context, no async hook

  return (
    <nav>
      {user ? <span>{user.email}</span> : <a href="/login">Login</a>}
    </nav>
  );
}
Why this works:

Server fetches user once per request with getOptionalUser()
Server passes exact data to client via props (serializable)
Client hydrates with same data → No mismatch ✅
Simple, no isMounted workarounds
Folder Structure for Auth
Use route groups to organize auth vs. public routes:

/app
├── (auth)/              # Protected routes
│   ├── dashboard/
│   │   └── page.tsx
│   └── profile/
│       └── page.tsx
│
├── (public)/            # Public routes
│   ├── page.tsx         # Landing page
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
│
└── api/
    └── auth/
        └── callback/    # OAuth callback
            └── route.ts
The (auth) and (public) folders don't appear in URLs - they're just for organization.

Auth Summary
✅ ALWAYS:

Use @supabase/ssr (never deprecated auth-helpers)
Create three separate client functions (browser, server, middleware)
Use getUser() for auth checks (never getSession() in server code)
Have middleware refresh tokens
Use route groups (auth) and (public) for organization
Use requireAuth() helper for protected pages
Fetch user on server in root layout, pass via AuthProvider (prevents hydration mismatches)
❌ NEVER:

Use @supabase/auth-helpers-nextjs (deprecated)
Trust getSession() in Server Components
Check auth on client side only
Forget to set up middleware
Git Standards
Commit Format
Format: type: description

Types:

feat: New feature
fix: Bug fix
refactor: Code refactoring
docs: Documentation changes
style: Code style changes (formatting, etc.)
chore: Maintenance tasks
Examples:

feat: add user interview flow
fix: handle empty results in interview list
refactor: extract interview queries to separate file
docs: update README with setup instructions
Commit Guidelines:

Keep commits small (one logical change per commit)
Commit every 30 minutes when actively coding
Commit before switching tasks or stopping for the day
Write clear, descriptive messages
Branch Format
Format: type/description

Types:

feature/: New features
fix/: Bug fixes
refactor/: Code refactoring
docs/: Documentation
Examples:

feature/interview-system
fix/auth-redirect
refactor/database-queries
docs/api-documentation
Branch Guidelines:

Use lowercase with hyphens
Keep branches short-lived (merge within 2-3 days)
Delete branches after merging
One feature per branch
Commit Best Practices
Commit related changes together

Schema change + type generation = one commit
Component + its styles = one commit
Test before committing

Does it compile?
Does it work on the happy path?
No console errors?
Write for your future self

You'll read this in 6 months
Make it clear what changed and why
Constitution Changelog
v1.2 - October 23, 2025
Added "Passing Auth State to Client Components" pattern
Documents AuthProvider approach to prevent hydration mismatches
Prevents async auth hooks from causing server/client render mismatches
v1.1 - October 20, 2025
Added navigation best practices (use Next.js Link component)
Clarified when to use Link vs. router.push() vs. onClick handlers
Added pattern for Button + Link with asChild prop
v1.0 - October 17, 2025
Initial constitution created
Core values and principles established
Technical stack and standards defined
Folder structure standardized
Code quality standards set
Development workflow established
AI-assisted development practices defined
Database and auth patterns documented
Git standards established
How to Use This Constitution
For Humans (Shoto, Mariam, Nino)
Before starting a feature: Read relevant sections
When making decisions: Reference the principles
When stuck: Check if constitution has guidance
When confused: Ask Shoto, then update constitution
For AI (Cursor, Claude Code)
Always reference: @lab37-constitution.md in context
Follow patterns: Use examples as templates
When uncertain: Ask for clarification
Never deviate: Without explicit permission
Updating the Constitution
Small fixes: Just update and commit
Major changes: Discuss with team first
Always: Update the changelog
Remember: Constitution evolves as we learn
This is a living document. As we learn, we update it. As we grow, it grows.

Version: 1.2 Status: Active Next Review: After 5 features shipped

"Start simple, add complexity slowly. Ship fast, iterate faster."

— Lab37 Team