# [Feature Name] Specification

**Status**: Draft | In Review | Approved
**Author**: [Your Name]
**Date**: [Date]
**Approver**: Shoto
**Estimated Effort**: [Hours/Days]

---

## Overview

**What**: [One sentence describing what this feature is]

**Why**: [One sentence explaining why we're building this]

**Success Metric**: [How we'll know this feature is successful]

---

## User Story

**As a** [type of user]
**I want to** [goal/desire]
**So that** [benefit/value]

### Context
[200+ words describing the user's problem, current workarounds, and why this feature matters. Be specific about:
- What pain point does this solve?
- Who experiences this problem?
- What happens if we don't build this?
- How does this align with Lab37's vision of "alive artifacts"?]

---

## User Flow

### Happy Path
Step-by-step flow of how a user will interact with this feature:

1. **Entry Point**: [Where does the user start?]
   - Example: User clicks "Create New Interview" button on dashboard

2. **Step 2**: [What happens next?]
   - Example: User fills out interview form (title, description, type)

3. **Step 3**: [Continue the flow]
   - Example: User clicks "Create" button

4. **Success State**: [What does the user see when successful?]
   - Example: User is redirected to interview detail page with success message

### Edge Cases
- **What if**: [Edge case scenario]
  - **Behavior**: [How should the system respond?]

- **What if**: [Another edge case]
  - **Behavior**: [How should the system respond?]

### Error Handling
- **Network failure**: [What happens?]
- **Validation errors**: [What happens?]
- **Permission denied**: [What happens?]

---

## UI/UX Requirements

### Screens/Components Needed
1. **[Component Name]**
   - Purpose: [What it does]
   - Location: [Where it appears]
   - Key elements: [What it contains]

2. **[Another Component]**
   - Purpose: [What it does]
   - Location: [Where it appears]
   - Key elements: [What it contains]

### Design Notes
- [Any specific design requirements, accessibility needs, responsive behavior]
- [Reference to Figma/design files if available]

---

## Technical Implementation

### Database Changes

#### New Tables
```sql
-- If creating new tables:
CREATE TABLE table_name (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Users can read own data"
  ON table_name FOR SELECT
  USING (auth.uid() = user_id);
```

#### Modified Tables
```sql
-- If modifying existing tables:
ALTER TABLE existing_table ADD COLUMN new_column TEXT;
```

#### Type Generation Required?
- [ ] Yes - Run `npm run db:types` after schema changes
- [ ] No - No database changes needed

---

### API/Data Layer

#### Database Queries
Location: `/lib/supabase/queries/[feature].ts`

Functions needed:
- `get[Feature](supabase: Client)` - [What it does]
- `create[Feature](supabase: Client, data: CreateData)` - [What it does]
- `update[Feature](supabase: Client, id: string, data: UpdateData)` - [What it does]
- `delete[Feature](supabase: Client, id: string)` - [What it does]

#### TanStack Query Hooks
Location: `/features/[feature-name]/queries.ts` or `/hooks/queries/[feature].ts`

Hooks needed:
- `use[Feature]()` - For fetching data
- `useCreate[Feature]()` - For mutations
- `useUpdate[Feature]()` - For mutations
- `useDelete[Feature]()` - For mutations

---

### Server Actions
Location: `/features/[feature-name]/actions.ts`

Actions needed:
- `create[Feature]Action(data: FormData)` - [What it does]
- `update[Feature]Action(id: string, data: FormData)` - [What it does]
- `delete[Feature]Action(id: string)` - [What it does]

---

### Components

#### New Components
Location: `/features/[feature-name]/components/`

1. **[ComponentName].tsx**
   - Type: Server Component | Client Component
   - Purpose: [What it does]
   - Props: [List key props]

2. **[AnotherComponent].tsx**
   - Type: Server Component | Client Component
   - Purpose: [What it does]
   - Props: [List key props]

#### Modified Components
- [Existing component path] - [What changes]

---

### Routes/Pages

#### New Pages
- `/app/(auth)/[route]/page.tsx` - [Description]
- `/app/(public)/[route]/page.tsx` - [Description]

#### Modified Pages
- [Existing page path] - [What changes]

---

### Validation

#### Zod Schemas
Location: `/features/[feature-name]/types.ts` or `/lib/validations/[feature].ts`

```typescript
// Example schema
export const createFeatureSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(10).max(1000),
  type: z.enum(["type1", "type2"]),
});

export type CreateFeatureInput = z.infer<typeof createFeatureSchema>;
```

---

### Authentication & Authorization

**Auth Required?**: Yes | No

**Who can access?**:
- [ ] Public (anyone)
- [ ] Authenticated users only
- [ ] Owner only (user_id match)
- [ ] Admin only

**RLS Policies Needed?**: Yes | No
If yes, describe:
- [Policy description]

---

## Dependencies

### New Packages
- [ ] None
- [ ] [package-name] - [Why needed]

### Existing Code Dependencies
- Depends on: [List any features this builds upon]
- Blocks: [List any features waiting for this]

---

## Out of Scope

Things we are explicitly NOT doing in this iteration:
- [Feature/functionality we're deferring]
- [Another thing we're not doing]

**Why?**: [Brief explanation of why these are out of scope]

---

## Testing Strategy

### Manual Testing Checklist
- [ ] Happy path works end-to-end
- [ ] Form validation shows errors correctly
- [ ] Error states display user-friendly messages
- [ ] Loading states work as expected
- [ ] Mobile responsive (if applicable)
- [ ] Works for different user roles (if applicable)

### Edge Cases to Test
- [ ] Empty states
- [ ] Large data sets
- [ ] Network failures
- [ ] Concurrent users (if applicable)

---

## Open Questions

1. [Question that needs answering before implementation]
   - **Status**: Open | Answered
   - **Answer**: [If answered]

2. [Another question]
   - **Status**: Open | Answered
   - **Answer**: [If answered]

---

## Implementation Notes

### For AI Context
When implementing this feature, reference:
- `@lab37-constitution.md` - Follow all standards
- `@[feature]-spec.md` - This spec
- `@[feature]-plan.md` - Implementation plan (generated after approval)
- Existing patterns in similar features: [List similar features to reference]

### Breaking Into Steps
This feature should be implemented in small steps:
1. Database setup (schema + types)
2. Query functions
3. UI components (without data)
4. Connect data to UI
5. Forms + validation
6. Error handling
7. Testing + polish

**Estimated steps**: [Number] steps, ~[Time] per step

---

## Approval

**Reviewed by**: _________________
**Approved by**: Shoto
**Date**: _________________

**Approval Decision**:
- [ ] Approved - Proceed to plan.md generation
- [ ] Needs revision - See comments below
- [ ] Rejected - See reasons below

**Comments**:
[Feedback from reviewers]

---

## Changelog

### v1.0 - [Date]
- Initial spec created

### v1.1 - [Date]
- [Changes made based on feedback]
