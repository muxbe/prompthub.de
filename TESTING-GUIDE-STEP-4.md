# Testing Guide - Before Step 5

**Test URL**: http://localhost:3002

Before moving to Step 5 (Polish & Deploy), you need to test all the features implemented in Steps 1-4 to make sure everything works correctly.

---

## Quick Pre-Test Setup

1. **Make sure you have test data**:
   - At least 5-10 prompts in different categories
   - Some prompts with likes
   - Some prompts with copies

2. **Have two browser windows ready**:
   - Window 1: Logged out (incognito/private mode)
   - Window 2: Logged in with your account

---

## 🔍 SEARCH TESTS (5 minutes)

**Where**: Homepage search bar

### Test 1: Basic Search
- [ ] Type a keyword that appears in a prompt title
- [ ] Results should filter to show only matching prompts
- [ ] Should see "Showing X prompts" at bottom

### Test 2: Search by Description
- [ ] Type a keyword that appears in a description (not title)
- [ ] Should see matching prompts
- [ ] Non-matching prompts should disappear

### Test 3: Clear Search
- [ ] Enter a search term
- [ ] Click the X button in search bar
- [ ] All prompts should reappear
- [ ] Search bar should be empty

### Test 4: No Results
- [ ] Search for "xyzabc123" (gibberish)
- [ ] Should see "No prompts found" message
- [ ] Should see "Try adjusting your filters or search terms"

### Test 5: URL State
- [ ] Search for something
- [ ] Copy the URL (e.g., `/?search=marketing`)
- [ ] Open URL in new tab
- [ ] Search should be preserved

---

## 🏷️ CATEGORY FILTER TESTS (5 minutes)

**Where**: Below search bar, horizontal category buttons

### Test 1: Filter Each Category
- [ ] Click "Copywriting" - see only Copywriting prompts
- [ ] Click "Development" - see only Development prompts
- [ ] Click "Marketing" - see only Marketing prompts
- [ ] Click "Education" - see only Education prompts
- [ ] Click "Other" - see custom categories only

### Test 2: Active State
- [ ] Click a category
- [ ] Active category should have blue background
- [ ] Other categories should be white with border

### Test 3: All Categories
- [ ] Click "All"
- [ ] Should see all prompts regardless of category
- [ ] "All" should be highlighted

### Test 4: URL State
- [ ] Click a category
- [ ] Check URL has `?category=CategoryName`
- [ ] Reload page - category filter should persist

### Test 5: With Search
- [ ] Search for a keyword
- [ ] Then filter by category
- [ ] Should see prompts matching BOTH search AND category

---

## 📊 SORT TESTS (5 minutes)

**Where**: Dropdown on right side (next to category filters)

### Test 1: Sort by Popular
- [ ] Select "Popular" from dropdown
- [ ] Prompts with most likes should appear first
- [ ] Check first prompt has highest like count

### Test 2: Sort by New
- [ ] Select "New" from dropdown
- [ ] Most recently created prompts should appear first
- [ ] Default sort is "New"

### Test 3: Sort by Most Copied
- [ ] Select "Most Copied" from dropdown
- [ ] Prompts with highest copy count should appear first

### Test 4: URL State
- [ ] Select "Popular"
- [ ] Check URL has `?sort=popular`
- [ ] Reload page - sort should persist

### Test 5: Combined with Filters
- [ ] Search for something
- [ ] Filter by category
- [ ] Change sort option
- [ ] URL should have all three: `?search=X&category=Y&sort=Z`

---

## ❤️ LIKE TESTS - LOGGED OUT (5 minutes)

**Where**: Prompt cards and detail pages (use incognito/private browser)

### Test 1: View Like Count
- [ ] See like count displayed on prompt cards
- [ ] See like count on detail page
- [ ] Heart icon should be empty (not filled)

### Test 2: Click Like (Logged Out)
- [ ] Click heart icon on a prompt card
- [ ] Should see alert: "You must be logged in to like prompts"
- [ ] Like count should NOT change
- [ ] Heart should stay empty

### Test 3: Detail Page Like (Logged Out)
- [ ] Go to a prompt detail page
- [ ] Click the "Like" button (blue button)
- [ ] Should see alert: "You must be logged in to like prompts"
- [ ] Button should stay blue

---

## ❤️ LIKE TESTS - LOGGED IN (10 minutes)

**Where**: Use logged-in browser window

### Test 1: Like a Prompt from Card
- [ ] Click heart icon on a prompt you haven't liked
- [ ] Heart should immediately fill with red color
- [ ] Like count should increase by 1
- [ ] No page reload should occur (optimistic UI)

### Test 2: Unlike a Prompt
- [ ] Click heart icon on a prompt you just liked
- [ ] Heart should immediately empty
- [ ] Like count should decrease by 1
- [ ] No page reload should occur

### Test 3: Like from Detail Page
- [ ] Go to a prompt detail page
- [ ] Click the "Like" button
- [ ] Button should turn red
- [ ] Text should change to "Unlike"
- [ ] Like count should increase

### Test 4: Unlike from Detail Page
- [ ] On the same detail page
- [ ] Click "Unlike" button
- [ ] Button should turn blue
- [ ] Text should change to "Like"
- [ ] Like count should decrease

### Test 5: Persistence
- [ ] Like a prompt
- [ ] Refresh the page
- [ ] Heart should still be filled/red
- [ ] Like count should be correct

### Test 6: Like Count Consistency
- [ ] Like a prompt from card view
- [ ] Go to that prompt's detail page
- [ ] Like count should be the same
- [ ] Like state should match (filled heart)

### Test 7: Multiple Likes
- [ ] Like 3-5 different prompts
- [ ] Go to homepage
- [ ] All liked prompts should show filled hearts
- [ ] Refresh page
- [ ] All likes should persist

---

## 📋 COPY TESTS (5 minutes)

**Where**: Prompt detail pages (works logged in or out)

### Test 1: Copy Prompt (Logged Out)
- [ ] Go to any prompt detail page
- [ ] Click "Copy Prompt" button
- [ ] Button should change to "Copied!" for 2 seconds
- [ ] Paste somewhere (Ctrl+V) - should see prompt text
- [ ] No login required

### Test 2: Copy Count Increases
- [ ] Note the copy count on a prompt (e.g., "5 Copies")
- [ ] Click "Copy Prompt" button
- [ ] Wait 2 seconds
- [ ] Refresh the page
- [ ] Copy count should be 6 (increased by 1)

### Test 3: Multiple Copies
- [ ] Copy the same prompt 3 times
- [ ] Refresh after each copy
- [ ] Count should increase each time

### Test 4: Copy Different Prompts
- [ ] Copy 3 different prompts
- [ ] Each should show "Copied!" feedback
- [ ] Each should paste the correct text

---

## 🔄 COMBINED FUNCTIONALITY TESTS (10 minutes)

**Test all features working together**

### Test 1: Search + Filter + Sort + Like
1. [ ] Search for "marketing"
2. [ ] Filter by "Marketing" category
3. [ ] Sort by "Popular"
4. [ ] Like the top result
5. [ ] Unlike it
6. [ ] Everything should work smoothly

### Test 2: URL State Persistence
1. [ ] Search for something
2. [ ] Filter by category
3. [ ] Sort by Popular
4. [ ] Copy the full URL (e.g., `/?search=ai&category=Development&sort=popular`)
5. [ ] Open in new tab
6. [ ] All filters should be applied
7. [ ] Like a prompt
8. [ ] Go back in browser
9. [ ] Filters should still be there

### Test 3: Browser Back/Forward
1. [ ] Start at homepage (All prompts)
2. [ ] Click "Copywriting" filter
3. [ ] Click "Development" filter
4. [ ] Click browser back button
5. [ ] Should show Copywriting prompts
6. [ ] Click browser back again
7. [ ] Should show All prompts

### Test 4: Mobile Responsiveness (Resize Browser)
1. [ ] Resize browser to mobile width (< 768px)
2. [ ] Category filters should scroll horizontally
3. [ ] Search bar should be full width
4. [ ] Prompt cards should stack vertically
5. [ ] Like and copy buttons should work
6. [ ] Everything should be readable

---

## 🐛 ERROR HANDLING TESTS (5 minutes)

### Test 1: Network Error Simulation
1. [ ] Open browser DevTools
2. [ ] Go to Network tab
3. [ ] Set throttling to "Offline"
4. [ ] Try to like a prompt
5. [ ] Should see "Failed to toggle like" alert
6. [ ] Like state should revert (optimistic UI rollback)
7. [ ] Turn network back online

### Test 2: Rapid Clicks
1. [ ] Click like button 5 times rapidly
2. [ ] Should handle gracefully (disabled state)
3. [ ] Final state should be correct
4. [ ] No duplicate requests should be sent

### Test 3: Empty States
1. [ ] Search for gibberish "xyzabc999"
2. [ ] Should see empty state message
3. [ ] Filter by a category with no prompts
4. [ ] Should see "No prompts found"

---

## ✅ CRITICAL ISSUES TO LOOK FOR

### Must Work:
- ✅ Search returns correct results
- ✅ Filters show correct prompts
- ✅ Sort orders correctly
- ✅ Can like when logged in
- ✅ Cannot like when logged out
- ✅ Copy works for everyone
- ✅ Like count updates immediately
- ✅ Copy count updates after refresh
- ✅ URL state preserves filters
- ✅ Browser back/forward works

### Known Issues (OK for now):
- ⚠️ Webpack error on `/prompts/new` page (doesn't affect functionality)
- ⚠️ Port 3000 warning (app runs on 3002 instead)

---

## 📝 TESTING SUMMARY

After completing all tests, answer these questions:

1. **Search working?** Yes / No
2. **Category filter working?** Yes / No
3. **Sort working?** Yes / No
4. **Like working (logged in)?** Yes / No
5. **Like blocked (logged out)?** Yes / No
6. **Copy working?** Yes / No
7. **Copy count tracking?** Yes / No
8. **URL state working?** Yes / No
9. **Mobile responsive?** Yes / No
10. **Any critical bugs?** List them:

---

## 🚀 WHEN TO MOVE TO STEP 5

**Move to Step 5 when:**
- All core features work (search, filter, sort, like, copy)
- No critical bugs found
- Like functionality requires auth
- Copy works without auth
- Counts update correctly
- URL state preserves filters

**Don't move to Step 5 if:**
- Search returns wrong results
- Likes don't work when logged in
- Copy doesn't increment count
- Critical errors in console
- Features don't work together

---

## 📞 NEED HELP?

If you find bugs during testing:
1. Note the exact steps to reproduce
2. Check browser console for errors (F12)
3. Check the terminal for server errors
4. Document what you expected vs what happened

**Ready to test?** Start with Search tests and work your way down! 🎯
