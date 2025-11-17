# PromptHub v1 - Implementation Decisions

**Date**: November 17, 2025
**Status**: Locked for v1 Implementation

---

## 📋 Key Design & Feature Decisions

### 1. Prompt Text Field
**Decision**: 5000 characters (more flexible)
- Original visual schema: 500 characters
- Updated to: 5000 characters
- **Reason**: Users can write longer, more detailed prompts for complex use cases

---

### 2. Library Button in Header
**Decision**: Keep as placeholder
- Button shows in header (📚 icon)
- Clicking shows "Coming soon" message or tooltip
- **v2 Feature**: Will implement actual library/saved prompts functionality
- **v1**: Visual placeholder only

---

### 3. Category System
**Decision**: Allow custom categories
- 5 main options: Coding, Business, Writing, Design, Other
- When "Other" is selected → Show text input
- Custom category: 3-50 characters
- **Reason**: Gives users flexibility for niche use cases

---

### 4. Visibility Checkbox
**Decision**: Cosmetic only in v1
- Checkbox appears on Add Prompt form
- Text: "Will be visible for all"
- Default: Checked
- **v1**: Does nothing, all prompts are public
- **v2**: Can implement private prompts feature

---

### 5. Homepage Grid Layout
**Decision**: 3 columns on desktop
- Desktop (1200px+): 3 columns
- Tablet (768px-1199px): 2 columns
- Mobile (<768px): 1 column
- **Reason**: More space per card, better readability
- **Note**: Visual schema showed 4, but 3 is better UX

---

### 6. Author Display
**Decision**: Email only
- Prompt cards show author's email
- No username system in v1
- No profile photos in v1
- Example: "user@example.com"
- **v2**: Can add username/display name field

---

### 7. Platform Buttons (Detail Page)
**Decision**: Show "Coming soon" message
- Buttons appear: "Open in ChatGPT", "Open in Claude", etc.
- Clicking shows tooltip: "Coming soon - copy prompt manually for now"
- **Don't** open platform homepages
- **v2**: Can implement deep linking when platforms support it

---

### 8. Similar Prompts Section
**Decision**: Yes - show 3 from same category
- Detail page shows "Similar Prompts" section
- Logic: 3 random prompts from same category
- Simple implementation
- If <3 prompts in category, show what's available
- **v2**: Can improve algorithm (tags, AI similarity, etc.)

---

### 9. Sort Filter Options
**Decision**: Popular, New, Most Copied
- **Popular**: ORDER BY like_count DESC
- **New**: ORDER BY created_at DESC
- **Most Copied**: ORDER BY copy_count DESC
- **Removed**: "Trending" and "Most Used" (too complex for v1)
- Default sort: New (most recent first)

---

### 10. Search Bar Location
**Decision**: On homepage only
- Prominent search bar in hero section (below title)
- Full-width input with search icon
- Placeholder: "Search for prompts..."
- **Not** in header (keeps header clean)
- Search works on: title, description, prompt_text

---

### 11. Self-Liking Prompts
**Decision**: Allow it
- Users can like their own prompts
- No restriction or validation
- Simpler implementation
- **Reason**: Not harmful, reduces complexity

---

## 🎨 Color Scheme (Category Badges)

- **Coding**: Blue (#3B82F6)
- **Business**: Green (#10B981)
- **Writing**: Purple (#8B5CF6)
- **Design**: Gray (#6B7280)
- **Other/Custom**: Teal (#14B8A6)

---

## 📏 Character Limits

| Field | Min | Max |
|-------|-----|-----|
| Title | 10 | 200 |
| Description | 20 | 1000 |
| Prompt Text | 20 | 5000 |
| Custom Category | 3 | 50 |

---

## 🔗 Routes

- Homepage: `/`
- Prompt Detail: `/prompts/[id]`
- Add Prompt: `/prompts/new`
- Login: `/login`
- Register: `/register` (not `/registration`)

---

## 🚫 Explicitly NOT in v1

- ❌ Edit prompts (v2)
- ❌ Delete prompts (v2)
- ❌ Comments system (not planned)
- ❌ Tags system (not planned)
- ❌ User profiles/pages (not planned)
- ❌ Private prompts (v2)
- ❌ Library/saved prompts functionality (v2)
- ❌ Username/display names (v2)
- ❌ Profile photos (v2)
- ❌ View counts (not planned)
- ❌ Trending algorithm (simplified to Popular/New/Most Copied)
- ❌ Platform deep linking (v2)
- ❌ Advanced similar prompts algorithm (v2)

---

## 📊 v1 Success Metrics

**User can**:
- Browse prompts in 3-column grid
- Search prompts by keyword
- Filter by category (All, Coding, Business, Writing, Design, Other)
- Sort by Popular, New, or Most Copied
- View prompt details
- See which platforms work with each prompt
- Like prompts (including own)
- Copy prompts to clipboard
- See copy count increase
- Create new prompts
- Select category or enter custom
- Choose AI platforms
- See live preview while creating
- Register and login
- Access Add Prompt page when authenticated

**Platform provides**:
- Clean, responsive design
- Real-time updates (likes, copies)
- Form validation
- Error handling
- Empty states
- Loading states

---

## 🔄 Changes from Original Specs

| Original | Changed To | Reason |
|----------|-----------|--------|
| 4-column grid | 3-column grid | Better card sizing, more readable |
| 500 char prompts | 5000 char prompts | More flexibility for complex prompts |
| Platform buttons work | "Coming soon" | Platforms don't support deep linking yet |
| Fixed categories only | Custom categories | User flexibility |
| Username display | Email display | Simpler v1, no username system needed |
| Sort: Trending | Sort: Popular/New/Most Copied | Simpler, no time-based algorithm |
| Library functional | Library placeholder | Defer to v2 |

---

**These decisions are locked for v1 implementation.** ✅

Any changes should be documented here with rationale.
