# Login Page

**Status**: Planning Phase
**Date**: November 16, 2025
**Route**: `/login`

---

## Complete Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    [LOGO]                               │ ← Logo (center)
│                 (provided later)                        │
│                                                         │
│                                                         │
│         ← Back                                          │ ← Back button (aligned with form's left border)
│         ┌───────────────────────────┐                  │
│         │ Login                     │ ← h2 (left side) │
│         │                           │                  │
│         │  Login your email         │ ← h4             │
│         │                           │                  │
│         │  Email                    │ ← Label          │
│         │  ┌─────────────────────┐  │                  │
│         │  │ m@example.com       │  │ ← Input          │
│         │  └─────────────────────┘  │                  │
│         │                           │                  │
│         │  Password                 │ ← Label          │
│         │  ┌─────────────────────┐  │                  │
│         │  │ ••••••••••••        │  │ ← Input          │
│         │  └─────────────────────┘  │                  │
│         │                           │                  │
│         │  ┌─────────────────────┐  │                  │
│         │  │      Login          │  │ ← Button (black bg, white text)
│         │  └─────────────────────┘  │                  │
│         │                           │                  │
│         │  ─────  or continue  ───── │ ← Divider       │
│         │                           │                  │
│         │  No account? Registration │ ← Link          │
│         │              ^^^^^^^^^^^^    (clickable)    │
│         └───────────────────────────┘                  │
│              (1/3 screen width)                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Elements (Top to Bottom)

### 1. Logo
- **Position**: Center of screen, top area
- **Image**: Provided later
- **Margin**: 40-60px from top
- **Size**: Medium (to be defined with logo)

### 2. Back Button
- **Position**: Outside form, aligned with form's left border
- **Icon**: ← (arrow icon, provided later)
- **Text**: "Back"
- **Style**: Link or ghost button
- **Action**: Navigate to previous page or homepage
- **Margin**: 16px above form

### 3. Login Form (Bordered Container)
- **Width**: 1/3 of screen width (~400-450px)
- **Position**: Centered horizontally and vertically (below logo)
- **Border**: 1px solid light gray
- **Border radius**: 8-12px
- **Padding**: 32-40px
- **Background**: White
- **Shadow**: Subtle shadow (optional)

#### Form Elements (Inside):

**h2 - Title**
- **Text**: "Login"
- **Position**: Left side (top of form)
- **Font size**: 28-32px
- **Font weight**: Bold
- **Margin**: 0 0 8px 0

**h4 - Subtitle**
- **Text**: "Login your email"
- **Position**: Below h2
- **Font size**: 16px
- **Font weight**: Normal or medium
- **Color**: Medium gray (#6b7280)
- **Margin**: 0 0 24px 0

**Email Field:**
- **Label**: "Email"
- **Font size**: 14px
- **Font weight**: Medium
- **Margin**: 0 0 6px 0
- **Input**:
  - Type: email
  - Placeholder: "m@example.com"
  - Border: 1px solid gray
  - Border radius: 6px
  - Padding: 10-12px
  - Width: 100%
  - Font size: 14px
  - Margin: 0 0 16px 0

**Password Field:**
- **Label**: "Password"
- **Font size**: 14px
- **Font weight**: Medium
- **Margin**: 0 0 6px 0
- **Input**:
  - Type: password
  - Placeholder: "••••••••••••"
  - Border: 1px solid gray
  - Border radius: 6px
  - Padding: 10-12px
  - Width: 100%
  - Font size: 14px
  - Margin: 0 0 20px 0

**Login Button:**
- **Text**: "Login"
- **Width**: 100% (same as inputs)
- **Background**: Black (#000000)
- **Text color**: White (#ffffff)
- **Padding**: 12-14px
- **Border radius**: 6px
- **Font size**: 16px
- **Font weight**: Medium or semibold
- **Margin**: 0 0 20px 0
- **Hover**: Slightly lighter black or add shadow
- **Cursor**: Pointer

**Divider with Text:**
- **Style**: Horizontal line broken in middle
- **Text**: "or continue"
- **Line color**: Light gray
- **Text color**: Medium gray
- **Font size**: 12-14px
- **Margin**: 20px 0

**Registration Link:**
- **Text**: "No account? Registration"
- **"Registration" part**: Clickable link
- **Link color**: Blue or primary color
- **Link hover**: Underline
- **Font size**: 14px
- **Text align**: Center
- **Action**: Navigate to `/registration` page

---

## Responsive Behavior

### Desktop (1200px+)
- **Form width**: 1/3 screen (~400-450px)
- **Logo size**: Medium
- **All elements**: As specified above

### Tablet (768px - 1199px)
- **Form width**: 50% screen (~350-400px)
- **Logo size**: Medium
- **Padding**: Slightly reduced

### Mobile (< 768px)
- **Form width**: 90% screen (max 400px)
- **Logo size**: Small-medium
- **Padding**: 24px
- **Back button**: Smaller text/icon

---

## States & Validation

### Input States
- **Default**: Gray border
- **Focus**: Primary color border (blue)
- **Error**: Red border with error message below
- **Success**: Green border (optional)

### Validation
- **Email**: Must be valid email format
- **Password**: Required field
- **Error messages**: Show below respective input
  - "Please enter a valid email"
  - "Password is required"

### Button States
- **Default**: Black background
- **Hover**: Lighter black or shadow
- **Loading**: Show spinner, disable button
- **Disabled**: Gray background, not clickable

---

## Behavior

### Login Flow
1. User enters email and password
2. Clicks "Login" button
3. Form validates inputs
4. If valid: Submit to authentication
5. On success: Redirect to homepage or previous page
6. On error: Show error message

### Back Button
- Click: Navigate to previous page or homepage (`/`)

### Registration Link
- Click: Navigate to registration page (`/registration`)

---

## Features
- Clean, centered design
- Clear visual hierarchy (h2 → h4 → form fields)
- Full-width inputs and button for consistency
- Alternative authentication option (divider text suggests future social login)
- Easy navigation to registration

---

## Notes
- Logo will be provided later
- Back button icon will be provided later
- Form is 1/3 screen width, centered
- All elements inside form are left-aligned
- Black and white color scheme for button (high contrast)
- "or continue" divider prepares for future social login options
- Keep form simple and clean - no distractions
