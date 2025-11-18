# Step 2 Testing Guide

## Quick Setup

Before testing, you need some prompts in your database.

### Option 1: Add Prompts via Supabase Dashboard (Easiest)

1. Go to Supabase Dashboard → Table Editor → `prompts` table
2. Click "Insert" → "Insert row"
3. Fill in:
   - **title**: "Write Better Code Comments"
   - **description**: "This prompt helps you generate clear code comments"
   - **prompt_text**: "Please analyze this code and suggest better comments:\n[Your code here]"
   - **category**: "Coding"
   - **user_id**: (Copy from auth.users table)
4. Click Save
5. Repeat 2-3 times with different categories

### Option 2: Insert via SQL (Faster)

Run this in Supabase SQL Editor:

```sql
-- Get your user ID first
SELECT id, email FROM auth.users LIMIT 1;

-- Copy the id from above, then run:
INSERT INTO prompts (user_id, title, description, prompt_text, category) VALUES
  ('YOUR_USER_ID_HERE', 'Write Better Code Comments', 'Generate clear and concise code comments for better maintainability', 'Please analyze this code and suggest better comments:\n\n[Paste your code here]\n\nProvide:\n1. Inline comments for complex logic\n2. Function/method documentation\n3. Overall module description', 'Coding'),
  ('YOUR_USER_ID_HERE', 'Create Email Templates', 'Professional email templates for business communication', 'Create a professional email template for:\n\nPurpose: [Describe purpose]\nTone: [Professional/Casual/Formal]\nRecipient: [Who is receiving]\n\nInclude:\n- Subject line\n- Greeting\n- Main body\n- Call to action\n- Professional signature', 'Business'),
  ('YOUR_USER_ID_HERE', 'Blog Post Outline', 'Generate structured blog post outlines with SEO keywords', 'Create a detailed blog post outline for:\n\nTopic: [Your topic]\nTarget Audience: [Who are you writing for]\nKeywords: [SEO keywords]\n\nInclude:\n- Catchy title (3 options)\n- Introduction hook\n- Main sections with subheadings\n- Conclusion with CTA', 'Writing');

-- Add some platforms
INSERT INTO prompt_platforms (prompt_id, platform_id)
SELECT p.id, ap.id
FROM prompts p
CROSS JOIN ai_platforms ap
WHERE ap.name IN ('ChatGPT', 'Claude')
LIMIT 6;
```

---

## Test Scenarios

### 1. Homepage Tests

**Test 1: Basic Grid Display**
```
Action: Visit http://localhost:3000
Expected:
- Should see 3-column grid of prompts
- Each card shows: category badge, title, description, author, like count, copy count
- Header shows PromptHub logo
```

**Test 2: Search Functionality**
```
Action: Type "code" in search bar and press Enter
Expected:
- URL changes to /?search=code
- Only prompts with "code" in title/description show
- Cards update immediately
```

**Test 3: Category Filter**
```
Action: Click "Coding" category
Expected:
- URL changes to /?category=Coding
- Only Coding prompts show
- "Coding" button is highlighted (blue background)
```

**Test 4: Sort Options**
```
Action: Click sort dropdown, select "Popular"
Expected:
- URL changes to /?sort=popular
- Prompts reorder by like_count (highest first)
```

**Test 5: Empty State**
```
Action: Search for "nonexistent-keyword-xyz"
Expected:
- Empty state shows
- Message: "No prompts found"
- Suggestion: "Try adjusting your filters"
```

**Test 6: Responsive - Mobile**
```
Action: Resize browser to 375px width
Expected:
- Grid becomes 1 column
- Search bar full width
- Category filter scrollable
- Header compact
```

---

### 2. Prompt Detail Page Tests

**Test 7: View Prompt Details**
```
Action: Click any prompt card on homepage
Expected:
- Navigate to /prompts/[id]
- Left side shows: category badge, title, description, prompt text
- Right side shows: copy button, platform buttons, stats, similar prompts
```

**Test 8: Copy Button**
```
Action: Click "Copy Prompt" button
Expected:
- Button text changes to "Copied!"
- Prompt text is in clipboard (try pasting)
- Button reverts to "Copy Prompt" after 2 seconds
```

**Test 9: Copy Link Button**
```
Action: Click "Copy link" button
Expected:
- Alert: "Link copied to clipboard!"
- URL is in clipboard
```

**Test 10: Platform Buttons**
```
Action: Click "Open in ChatGPT" button
Expected:
- Tooltip appears: "Coming soon - copy prompt manually for now"
- Tooltip disappears after 3 seconds
- Does NOT navigate away
```

**Test 11: Like Button (Placeholder)**
```
Action: Click like button (heart icon)
Expected:
- Alert: "Like functionality coming in Step 4!"
- Like count does NOT change (placeholder only)
```

**Test 12: Similar Prompts**
```
Action: Scroll to "Similar Prompts" section
Expected:
- Shows up to 3 prompts from same category
- Each has: category badge, title, description snippet, "View →"
- Clicking navigates to that prompt's detail page
```

**Test 13: Back Button**
```
Action: Click "← Back to prompts"
Expected:
- Navigate back to homepage
- Filters/search preserved if you came from filtered view
```

**Test 14: 404 Page**
```
Action: Visit http://localhost:3000/prompts/invalid-id-123
Expected:
- Shows "404 - Prompt Not Found" page
- "Back to Homepage" button works
```

**Test 15: Responsive - Mobile Detail**
```
Action: Visit detail page, resize to 375px width
Expected:
- Two columns stack vertically
- Left content first, then right sidebar
- All buttons full width
- Readable on small screen
```

---

### 3. Header Tests

**Test 16: Logged Out State**
```
Action: Log out, visit homepage
Expected:
- Header shows: PromptHub logo + Login button
- No Add (+) button
- No Library button
```

**Test 17: Logged In State**
```
Action: Log in, visit homepage
Expected:
- Header shows: PromptHub logo + Add (+) + Library (📚) + User email + Logout
- Add button is visible
```

**Test 18: Library Button (Placeholder)**
```
Action: Click Library (📚) button
Expected:
- Alert: "Coming soon! Library feature will be available in v2."
```

**Test 19: Add Prompt Button**
```
Action: Click Add (+) button
Expected:
- Navigate to /prompts/new
- (Will show 404 for now - created in Step 3)
```

**Test 20: Logo Navigation**
```
Action: Click "PromptHub" logo
Expected:
- Navigate to homepage (/)
- Clears any filters/search
```

---

## Browser Compatibility

Test in:
- ✅ Chrome/Edge (primary)
- ✅ Firefox
- ✅ Safari (if on Mac)

---

## Performance Checks

**Test 21: Page Load Speed**
```
Action: Open DevTools → Network tab, reload homepage
Expected:
- Page loads in < 2 seconds
- No JavaScript errors in console
```

**Test 22: Search Debouncing**
```
Action: Type quickly in search bar without pressing Enter
Expected:
- URL doesn't update on every keystroke
- Only updates when you stop typing or press Enter
```

---

## Common Issues & Solutions

### Issue: No prompts showing on homepage
**Solution**:
1. Check Supabase dashboard → prompts table has data
2. Check browser console for errors
3. Verify .env.local has correct credentials
4. Restart dev server

### Issue: Search/filter doesn't work
**Solution**:
1. Check URL params are updating
2. Check browser console for errors
3. Verify getPrompts() function works (check Step 1)

### Issue: Copy button doesn't copy
**Solution**:
1. Check you're using HTTPS or localhost (clipboard API requires secure context)
2. Check browser permissions for clipboard access
3. Try different browser

### Issue: Images/icons not showing
**Solution**:
- This is expected in Step 2
- We're using SVG icons inline
- Platform icons are emojis

### Issue: Like button does nothing
**Solution**:
- This is expected! It's a placeholder
- Shows alert instead of actually liking
- Full functionality comes in Step 4

---

## What to Check Before Moving to Step 3

- [ ] ✅ Homepage shows prompt grid
- [ ] ✅ Search works
- [ ] ✅ Category filter works
- [ ] ✅ Sort works
- [ ] ✅ Can click card and view details
- [ ] ✅ Copy button works
- [ ] ✅ Similar prompts show
- [ ] ✅ 404 page works
- [ ] ✅ Mobile responsive
- [ ] ✅ Header shows correct auth state

**If all checked ✅, you're ready for Step 3!**

---

## Debugging Tips

**Enable verbose logging**:
```javascript
// Add to any Server Component
console.log('Prompts fetched:', prompts);
console.log('Search params:', params);
```

**Check database queries**:
- Go to Supabase Dashboard → SQL Editor
- Run: `SELECT * FROM prompts_with_stats;`
- Verify data looks correct

**Check network requests**:
- Open DevTools → Network tab
- Filter by "Fetch/XHR"
- Look for Supabase API calls
- Check response data

---

**Happy Testing!** 🧪

If everything works, Step 2 is solid and you can move to Step 3: Add Prompts. 🚀
