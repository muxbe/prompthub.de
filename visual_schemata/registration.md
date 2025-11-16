# Registration Page

**Status**: Planning Phase
**Date**: November 16, 2025
**Route**: `/registration`

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
│         │ Registration              │ ← h2 (left side) │
│         │                           │                  │
│         │  Create your account      │ ← h4             │
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
│         │  Repeat Password          │ ← Label          │
│         │  ┌─────────────────────┐  │                  │
│         │  │ ••••••••••••        │  │ ← Input          │
│         │  └─────────────────────┘  │                  │
│         │                           │                  │
│         │  ┌─────────────────────┐  │                  │
│         │  │   Registration      │  │ ← Button (black bg, white text)
│         │  └─────────────────────┘  │                  │
│         │                           │                  │
│         │  ─────  or continue  ───── │ ← Divider       │
│         │                           │                  │
│         │  Have you account? Login  │ ← Link          │
│         │                    ^^^^^     (clickable)    │
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

### 3. Registration Form (Bordered Container)
- **Width**: 1/3 of screen width (~400-450px)
- **Position**: Centered horizontally and vertically (below logo)
- **Border**: 1px solid light gray
- **Border radius**: 8-12px
- **Padding**: 32-40px
- **Background**: White
- **Shadow**: Subtle shadow (optional)

#### Form Elements (Inside):

**h2 - Title**
- **Text**: "Registration"
- **Position**: Left side (top of form)
- **Font size**: 28-32px
- **Font weight**: Bold
- **Margin**: 0 0 8px 0

**h4 - Subtitle**
- **Text**: "Create your account"
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
  - Margin: 0 0 16px 0

**Repeat Password Field:**
- **Label**: "Repeat Password"
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

**Registration Button:**
- **Text**: "Registration"
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

**Login Link:**
- **Text**: "Have you account? Login"
- **"Login" part**: Clickable link
- **Link color**: Blue or primary color
- **Link hover**: Underline
- **Font size**: 14px
- **Text align**: Center
- **Action**: Navigate to `/login` page

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

### Validation Rules
- **Email**:
  - Required
  - Must be valid email format
  - Error: "Please enter a valid email"

- **Password**:
  - Required
  - Minimum 8 characters (recommended)
  - Error: "Password must be at least 8 characters"

- **Repeat Password**:
  - Required
  - Must match Password field
  - Error: "Passwords do not match"

### Button States
- **Default**: Black background
- **Hover**: Lighter black or shadow
- **Loading**: Show spinner, disable button
- **Disabled**: Gray background, not clickable (until form is valid)

---

## Behavior

### Registration Flow
1. User enters email, password, and repeat password
2. Form validates inputs in real-time or on blur
3. Clicks "Registration" button
4. If passwords don't match: Show error message
5. If valid: Submit to authentication service
6. On success:
   - Create account
   - Auto-login user
   - Redirect to homepage or onboarding
7. On error: Show error message (e.g., "Email already exists")

### Back Button
- Click: Navigate to previous page or homepage (`/`)

### Login Link
- Click: Navigate to login page (`/login`)

---

## Features
- Clean, centered design (same as login page)
- Clear visual hierarchy (h2 → h4 → form fields)
- Password confirmation to prevent typos
- Full-width inputs and button for consistency
- Easy navigation to login page for existing users
- Real-time or on-blur validation for better UX

---

## Notes
- Logo will be provided later
- Back button icon will be provided later
- Form is 1/3 screen width, centered
- All elements inside form are left-aligned
- Black and white color scheme for button (high contrast)
- "or continue" divider prepares for future social registration options
- Password match validation is critical - show error immediately
- Keep form simple - don't ask for too much info upfront
