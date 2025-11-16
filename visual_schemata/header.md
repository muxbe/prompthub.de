# Header Component

**Status**: Planning Phase
**Date**: November 15, 2025

---

## Header Layout

```
┌──────────────────────────────────────────────────────────────┐
│  PromptHub               [+] [📚] [Login (bordered)]          │
└──────────────────────────────────────────────────────────────┘
```

**When user is logged in:**
```
┌──────────────────────────────────────────────────────────────┐
│  PromptHub               [+] [📚] [👤]                        │
└──────────────────────────────────────────────────────────────┘
```

---

## Elements

### Left Side
- **PromptHub** - Website name/logo (text)

### Right Side (Not Logged In)
- **[+]** Add icon (hidden when not logged in)
- **[📚]** Library icon (hidden when not logged in)
- **[Login]** Button with border

### Right Side (Logged In)
- **[+]** Add icon - Links to `/prompts/new`
- **[📚]** Library icon - Links to user's library
- **[👤]** User silhouette icon - User profile/menu

---

## Notes
- Icons use icon library (Lucide/Heroicons)
- Login button has visible border
- Add and Library buttons only visible when authenticated
- User icon replaces Login button when authenticated
