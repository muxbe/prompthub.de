# Prompt Card Component

**Status**: Planning Phase
**Date**: November 16, 2025
**Used in**: Homepage, Search Results

---

## Card Layout

```
┌─────────────────────────────────────────────┐
│ ┌──────────────┐                            │
│ │ 🔧 Coding    │ ← Category badge (small)   │
│ └──────────────┘                            │
│                                             │
│ Write Better Code Comments                  │ ← h3 (title)
│                                             │
│ This prompt helps you generate clear and    │ ← Description
│ concise code comments for better...         │   (2 lines only)
│                                             │
│ ─────────────────────────────────────────── │ ← Divider
│                                             │
│ 👤 username    ❤️ 24 [Like]    📋 142 [Copy]│ ← Footer
│ (author)      (likes count)   (copy count)  │
└─────────────────────────────────────────────┘
```

---

## Elements (Top to Bottom)

### 1. Container
- **Type**: Bordered article
- **Border**: Light gray, 1px solid
- **Border radius**: 8px
- **Padding**: 16-20px
- **Background**: White
- **Hover state**: Slight shadow or border color change

### 2. Category Badge (Top Left)
- **Position**: Top left corner
- **Style**: Small, bordered pill
- **Elements**: Icon + Category name
- **Border**: 1px solid, matching category color
- **Padding**: 4px 8px
- **Font size**: 12px
- **Icons by category**:
  - 🔧 Coding
  - 💼 Business
  - ✍️ Writing
  - 🎨 Design
  - 📌 Other

### 3. Title
- **Tag**: h3
- **Style**: Bold, dark text
- **Font size**: 18-20px
- **Margin**: 12px top, 8px bottom
- **Max lines**: 1-2 lines
- **Overflow**: Allow wrap or truncate

### 4. Description
- **Tag**: p
- **Style**: Regular weight, gray text
- **Font size**: 14px
- **Lines**: Exactly 2 lines
- **Overflow**: Truncate with "..." on 2nd line
- **Color**: Medium gray (#6b7280)
- **Margin**: 8px bottom

### 5. Divider
- **Type**: Horizontal line
- **Color**: Light gray (#e5e7eb)
- **Thickness**: 1px
- **Margin**: 12px top and bottom

### 6. Footer (Last Line)
Three sections in one row:

**Left: Author**
- Icon: 👤
- Text: Username
- Clickable: Link to user profile
- Color: Dark gray

**Middle: Like Button**
- Icon: ❤️ (gray heart)
- Number: Like count (left of button)
- Button text: "Like" or just heart icon
- Color: Gray (not red)
- Hover: Red tint

**Right: Copy Button**
- Icon: 📋
- Number: Copy count (left of button)
- Button text: "Copy" or just icon
- Click: Copies prompt to clipboard
- Feedback: Visual confirmation on click

**Layout**: Flex row, space-between
**Font size**: 13-14px
**Gap**: 12-16px between sections

---

## Responsive Behavior

### Desktop (1200px+)
- **Card width**: ~300px
- **Padding**: 20px
- **Description**: 2 lines

### Tablet (768px - 1199px)
- **Card width**: ~250px
- **Padding**: 18px
- **Description**: 2 lines

### Mobile (< 768px)
- **Card width**: 100% or ~160px
- **Padding**: 16px
- **Description**: 2 lines
- **Footer**: Stack if needed

---

## Interactive States

### Hover
- Border color: Darker gray or primary color
- Shadow: Slight elevation
- Cursor: Pointer (if card is clickable)

### Like Button States
- **Default**: Gray heart ❤️
- **Hover**: Light red background
- **Clicked**: Red heart (if liked)
- **Require auth**: Show tooltip if not logged in

### Copy Button States
- **Default**: Gray clipboard 📋
- **Hover**: Light blue background
- **Clicked**: Show "Copied!" tooltip
- **Animation**: Brief checkmark or success indicator

---

## Features
- Card is clickable (navigates to prompt detail page)
- Like button requires login
- Copy button works without login
- Numbers update in real-time when liked/copied

---

## Notes
- Keep card clean and scannable
- Gray heart (not red by default)
- Description must be exactly 2 lines
- All interactive elements should have hover states
- Maintain consistent card height in grid layout
