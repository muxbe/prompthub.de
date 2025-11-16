# Add Prompt Page (/prompts/new)

**Status**: Planning Phase
**Date**: November 15, 2025
**Auth**: Required (must be logged in)

---

## Complete Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│  PromptHub                                    [+] [📚] [👤]               │
└──────────────────────────────────────────────────────────────────────────┘

  ← Come back


┌─────────────────────────────────────┬────────────────────────────────────┐
│  FORM (big border)                  │  PREVIEW (small border)            │
│                                     │                                    │
│  Add                         ← h3   │         Review            ← h5     │
│                                     │                                    │
│  Title*                             │  ┌──────────────────────────────┐ │
│  ┌────────────────────────────┐    │  │                              │ │
│  │ Example title...           │    │  │ (category - blue, small)     │ │
│  └────────────────────────────┘    │  │                              │ │
│  0/200                             │  │  Title            ← h3       │ │
│                                     │  │  (grows when written)        │ │
│  Description*                       │  │                              │ │
│  ┌────────────────────────────┐    │  └──────────────────────────────┘ │
│  │ What does it do? When      │    │                                    │
│  │ would you use it?          │    │                                    │
│  │                            │    │  ┌──────────────────────────────┐ │
│  └────────────────────────────┘    │  │                              │ │
│  0/1000                             │  │  Your prompt description     │ │
│                                     │  │  will be shown here   ← h5   │ │
│  Text of prompt*                    │  │  (minimum, grows)            │ │
│  ┌────────────────────────────┐    │  │                              │ │
│  │ Paste prompt here          │    │  └──────────────────────────────┘ │
│  │                            │    │                                    │
│  │                            │    │                                    │
│  └────────────────────────────┘    │  ┌──────────────────────────────┐ │
│  0/500                             │  │                              │ │
│                                     │  │  Your prompt text:           │ │
│  Choose category*                   │  │                              │ │
│  ┌────────────────────────────┐    │  │  (minimum, grows)            │ │
│  │ Coding                  ▼  │    │  │                              │ │
│  └────────────────────────────┘    │  └──────────────────────────────┘ │
│                                     │                                    │
│  AI Platforms                       │  ────────────────────────────────  │
│  ┌────────────────────────────┐    │         👤    ❤️    📋            │
│  │ საუკეთესოა (არასავალდებულო)│    │                                    │
│  │ ☐ ChatGPT                  │    │                                    │
│  │ ☐ Claude                   │    │                                    │
│  │ ☐ Gemini                   │    │                                    │
│  │ ☐ Other                    │    │                                    │
│  └────────────────────────────┘    │                                    │
│                                     │                                    │
│  ☑ Will be visible for all         │                                    │
│                                     │                                    │
│      [Cancel]    [Submit]           │                                    │
│                                     │                                    │
└─────────────────────────────────────┴────────────────────────────────────┘
```

---

## Layout Structure

### Header
See: `header.md` (logged in state)

### Navigation
- **← Come back** - Link with back arrow icon to return to previous page

### Two-Column Layout

---

## Left Side - Form (Big Border)

### h3: "Add"

### Field 1: Title*
- Label: "Title*" (asterisk required)
- Input type: text
- Placeholder: "Example title..."
- Character counter: **0/200**

### Field 2: Description*
- Label: "Description*" (asterisk required)
- Input type: textarea
- Placeholder: "What does it do? When would you use it?"
- Character counter: **0/1000**

### Field 3: Text of prompt*
- Label: "Text of prompt*" (asterisk required)
- Input type: textarea
- Placeholder: "Paste prompt here"
- Character counter: **0/500**

### Field 4: Choose category*
- Label: "Choose category*" (asterisk required)
- Type: Dropdown navbar (single select)
- Default: "Coding" or "Select category..."
- Click to expand and show all options
- Options:
  - Coding
  - Business
  - Writing
  - Design
  - Other
- **Collapsed state**: Shows selected category with ▼ arrow
- **Expanded state**: Drops down to show all 5 options

### Field 5: AI Platforms
- Label: "AI Platforms" (optional)
- Navbar/section label: "საუკეთესოა (არასავალდებულო)" (Best - Optional)
- Type: Checkboxes (multi-select)
- Options:
  - ☐ ChatGPT
  - ☐ Claude
  - ☐ Gemini
  - ☐ Other

### Field 6: Visibility
- Checkbox: "Will be visible for all"
- Default: **Checked** (visible by default)

### Buttons
- **[Cancel]** - Button with border, links back
- **[Submit]** - Button with blue background, white text, border

---

## Right Side - Live Preview (Small Border)

### h5: "Review"

### Section 1: Title Preview (Border)
- **Category display** (top left)
  - Text color: Blue
  - Font size: Small
  - Shows selected category badge
  - Example: "Coding" or "Business"
- **h3: Title**
  - Live updates from title input
  - Starts minimum size
  - Grows as content is added

### Section 2: Description Preview (Border)
- **h5: "Your prompt description will be shown here"**
  - Live updates from description input
  - Starts minimum size
  - Grows as content is added

### Section 3: Prompt Text Preview (Border)
- **Label: "Your prompt text:"**
  - Live updates from prompt text input
  - Starts minimum size
  - Grows as content is added

### Bottom Section
- **Horizontal line separator**
- **Icons (right aligned):**
  - 👤 User icon
  - ❤️ Like icon (gray)
  - 📋 List/menu icon

---

## Features
- **Live preview**: All fields update preview in real-time as user types
- **Character limits**: Visual counters for all text fields
- **Category selection**: Single-select dropdown for use case (Coding, Business, Writing, Design, Other)
- **AI Platform selection**: Multi-select checkboxes for compatible AI platforms (ChatGPT, Claude, Gemini, Other)
- **Visibility control**: Toggle to make prompt public or private
- **Responsive borders**: Preview sections grow with content
- **Form validation**: Required fields marked with asterisk (*)

---

## Behavior
1. User types in title → Shows immediately in preview title (h3)
2. User types description → Shows in description preview section
3. User types prompt text → Shows in prompt text preview section
4. User selects category → Shows as blue badge in preview (e.g., "Coding")
5. User selects AI platforms → (Optional, for compatibility indication)
6. Preview sections start small, expand as content is added
7. Character counters update in real-time (0/200, 0/1000, 0/500)
