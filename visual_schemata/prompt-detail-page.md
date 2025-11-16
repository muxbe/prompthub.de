# Prompt Detail Page

**Status**: Planning Phase
**Date**: November 16, 2025
**Route**: `/prompts/[id]`

---

## Complete Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│  Header (PromptHub, [+], [📚], [User])                                 │
└────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────┬─────────────────────────────────┐
│ ← Back    🔧 Coding                  │                                 │
│                                      │   ┌───────────────────────┐     │ ← Section 1
│ Write Better Code Comments      ← h1│   │ Copy                  │     │   (3 buttons)
│                                      │   └───────────────────────┘     │   80-90% width
│ This is the description of the      │   ┌───────────────────────┐     │
│ prompt and what it does...      ← h3│   │ Open in ChatGPT       │     │
│                                      │   └───────────────────────┘     │
│ ──────────────────────────────────  │   ┌───────────────────────┐     │
│                                      │   │ Copy link             │     │
│ Your actual prompt text here:       │   └───────────────────────┘     │
│ [The full prompt text that can be   │                                 │
│  multiple lines and shows everything]│   ┌───────────────────────┐     │ ← Section 2
│                                      │   │ ❤️       │  📚       │     │   (stats block)
│                                      │   ├──────────┼───────────┤     │   80-90% width
│                                      │   │   24     │   142     │     │
│                                      │   │  likes   │  copied   │     │
│                                      │   └───────────────────────┘     │
│                                      │                                 │
│                                      │   ─────────────────────────     │
│                                      │                                 │
│                                      │   ┌───────────────────────┐     │ ← Section 3
│                                      │   │ username              │     │   (author)
│                                      │   │ Status/badge          │     │   80-90% width
│                                      │   │                       │     │
│                                      │   │ 5 prompts  24 likes   │     │
│                                      │   │ 142 copies            │     │
│                                      │   │   👤                  │     │
│                                      │   └───────────────────────┘     │
│                                      │                                 │
│                                      │   ─────────────────────────     │
│                                      │                                 │
│                                      │   ┌───────────────────────┐     │ ← Section 4
│                                      │   │ Similar Prompts   ← h4│     │   (similar)
│                                      │   │                       │     │   80-90% width
│                                      │   │ ┌───┐ ┌───┐ ┌───┐   │     │
│                                      │   │ │h5 │ │h5 │ │h5 │   │     │
│                                      │   │ │...│ │...│ │...│   │     │
│                                      │   │ │ → │ │ → │ │ → │   │     │
│                                      │   │ └───┘ └───┘ └───┘   │     │
│                                      │   └───────────────────────┘     │
└──────────────────────────────────────┴─────────────────────────────────┘
```

---

## Layout Structure

### Header
See: `header.md` (logged in or logged out state)

### Two-Column Layout
- **Left Side**: 2/3 width, bordered
- **Right Side**: 1/3 width, bordered

---

## Left Side (2/3 Width - Main Content)

### Top Bar
- **← Back button**: Icon with text, links to previous page or homepage
- **Category Badge**: Positioned right of back button
  - Icon (🔧 Coding, 💼 Business, ✍️ Writing, 🎨 Design, 📌 Other)
  - Category name
  - Small, bordered pill style

### Title Section
- **h1**: Prompt title
- **Position**: Starting from left side
- **Font size**: 32-36px
- **Font weight**: Bold
- **Margin**: 16px bottom

### Description Section
- **h3**: Full prompt description (not truncated)
- **Font size**: 18-20px
- **Font weight**: Normal or medium
- **Color**: Dark gray
- **Line height**: 1.6
- **Margin**: 16px bottom

### Divider
- Horizontal line separating description from prompt text
- Light gray color

### Prompt Text Section
- **Label**: "Your actual prompt text here:" or "Prompt:"
- **Content**: Full prompt text in bordered box
  - Background: Light gray (#f9fafb)
  - Border: 1px solid gray
  - Border radius: 8px
  - Padding: 16-20px
  - Font: Monospace for readability
  - Multiple lines supported
  - No character limit display

---

## Right Side (1/3 Width - Actions & Info)

**All sections**: 80-90% width of right column, centered with equal margins

### Section 1: Action Buttons

**Button 1: Copy**
- **Text**: "Copy"
- **Width**: 80-90% of right column
- **Background**: Blue (#0066ff or similar)
- **Text color**: White
- **Border**: 1px solid (optional, can match bg)
- **Border radius**: 6px
- **Padding**: 12px
- **Font size**: 16px
- **Margin**: 0 0 12px 0
- **Action**: Copies prompt text to clipboard
- **Feedback**: Show "Copied!" tooltip

**Button 2: Open in ChatGPT**
- **Text**: "Open in ChatGPT" (or selected AI platform)
- **Width**: Same as Button 1
- **Background**: White
- **Text color**: Dark (#333)
- **Border**: 1px solid gray
- **Border radius**: 6px
- **Padding**: 12px
- **Font size**: 16px
- **Margin**: 0 0 12px 0
- **Action**: Opens prompt in selected AI platform (external link)

**Button 3: Copy link**
- **Text**: "Copy link"
- **Width**: Same as Button 1 & 2
- **Background**: Transparent or white
- **Text color**: Gray or primary
- **Border**: Hidden/none
- **Padding**: 12px
- **Font size**: 16px
- **Margin**: 0 0 16px 0
- **Action**: Copies page URL to clipboard
- **Feedback**: Show "Link copied!" tooltip

### Section 2: Stats Block

**Layout**: 2x2 grid

**Top Row (Icons only):**
- **Top Left**: Like button (❤️ heart icon)
  - Clickable
  - Gray by default, red when liked
  - Auth required
- **Top Right**: Save to library button (📚 library icon)
  - Clickable
  - Gray by default, filled when saved
  - Auth required

**Bottom Row (Counts):**
- **Bottom Left**: Like count
  - Height: 2x the icon row
  - Shows number of likes
  - Text: "24 likes"
  - Centered text
  - Border: 1px solid light gray
- **Bottom Right**: Copy count
  - Height: 2x the icon row
  - Shows number of times copied
  - Text: "142 copied"
  - Centered text
  - Border: 1px solid light gray

**Width**: 80-90% of right column
**Gap**: Small gap between cells
**Margin**: 0 0 16px 0

### Section 3: Author Information

**Container**: Bordered box, 80-90% width

**Content (top to bottom):**

1. **Username**
   - Font size: 16-18px
   - Font weight: Bold
   - Color: Dark
   - Margin: 0 0 4px 0

2. **Status/Badge**
   - Font size: 14px
   - Color: Medium gray or colored badge
   - Example: "Pro Member", "Verified", etc.
   - Margin: 0 0 12px 0

3. **Stats Row** (one line, small text)
   - "5 prompts  24 likes  142 copies"
   - Font size: 13px
   - Color: Gray
   - Icons optional
   - Margin: 0 0 12px 0

4. **User Photo**
   - Small circular avatar
   - Size: 40-50px
   - Position: Lower in section
   - Centered or left-aligned
   - Default icon if no photo
   - Margin: 0 0 12px 0

**Separator**: Horizontal line above this section

### Section 4: Similar Prompts

**Container**: 80-90% width

**Title**:
- h4: "Similar Prompts"
- Font size: 18px
- Font weight: Bold
- Margin: 0 0 12px 0

**Prompt Cards** (3 cards, horizontal row):
- **Layout**: 3 columns, equal width
- **Gap**: Small gap between cards (8-12px)

**Each Card**:
- **Border**: 1px solid light gray
- **Border radius**: 6px
- **Padding**: 12px
- **Background**: White
- **Hover**: Slight shadow or border color change

**Card Content**:
1. **Title** (h5)
   - Font size: 14px
   - Font weight: Bold
   - Max 2 lines
   - Truncate with "..."

2. **Description**
   - Font size: 12px
   - Color: Gray
   - Max 2 lines
   - Truncate with "..."

3. **Link**
   - Text: "Go to prompt →"
   - Font size: 12px
   - Color: Primary/blue
   - Icon: Arrow right (→)
   - Action: Navigate to that prompt's detail page

**If no similar prompts**:
- Show message: "No similar prompts found"

**Separator**: Horizontal line above this section

---

## Responsive Behavior

### Desktop (1200px+)
- Left: 2/3 width
- Right: 1/3 width
- All as specified above

### Tablet (768px - 1199px)
- Left: 60% width
- Right: 40% width
- Reduce padding and font sizes slightly
- Similar prompts: 2-3 cards or vertical stack

### Mobile (< 768px)
- **Stack vertically**:
  1. Header
  2. Back + Category
  3. Title
  4. Description
  5. Prompt text
  6. Action buttons (full width)
  7. Stats block
  8. Author info
  9. Similar prompts (vertical stack or 1-2 cards)
- Full width for all sections
- Reduce spacing

---

## Interactive States

### Copy Button
- **Default**: Blue background
- **Hover**: Darker blue
- **Click**: Show "Copied!" tooltip for 2 seconds
- **Disabled**: Gray background (if needed)

### Open in AI Button
- **Default**: White background, bordered
- **Hover**: Light gray background or border color change
- **Click**: Opens in new tab

### Copy Link Button
- **Default**: No visible border
- **Hover**: Underline or color change
- **Click**: Show "Link copied!" tooltip

### Like Button
- **Default**: Gray heart ❤️
- **Hover**: Light red background
- **Liked**: Red heart
- **Click**: Toggle like/unlike
- **Auth required**: Redirect to login if not authenticated

### Library Button
- **Default**: Gray library icon 📚
- **Hover**: Light blue background
- **Saved**: Filled/colored icon
- **Click**: Toggle save/unsave
- **Auth required**: Redirect to login if not authenticated

### Similar Prompt Cards
- **Default**: White background, light border
- **Hover**: Shadow and/or border color change
- **Click**: Navigate to that prompt

---

## Features
- Public page (no login required to view)
- Login required for: liking, saving to library
- Copy functionality works without login
- Back button returns to previous page
- Full prompt text displayed (no truncation)
- Similar prompts suggest related content
- Author section shows basic info (no profile link)
- Responsive design for all screen sizes

---

## Notes
- Left side shows all prompt content in full detail
- Right side organized into 4 logical sections
- All right-side sections maintain consistent 80-90% width
- Clear visual hierarchy with dividers
- Actions prioritized at top (copy, open in AI)
- Social proof in middle (likes, copies)
- Author info for credibility
- Discovery through similar prompts
- Clean, scannable layout
