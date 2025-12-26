# Keyboard Navigation Audit - Critical Issues Only
Date: 2025-12-25  
Scope: YOTB design system review

## Summary

| Issue | Count | Impact |
|--------|-------|--------|
| Missing keyboard handlers on interactive divs | 3 | Cannot navigate |
| Non-focusable interactive elements | 2 | Cannot tab to actions |
| Total Critical Issues | 5 | High |

## Critical Issues - Must Fix Before Launch

### 1. Navigation Links May Not Be Keyboard Accessible
**Severity:** CRITICAL  
**File:** `home.html`, `devlog-single.html`  
**Lines:** Navigation sections

**Current pattern:**
```jsx
<a href="/">Home</a>  // ✓ Native anchor - keyboard safe
<a href="/about">About</a>  // ✓ Native anchor - keyboard safe
```

**Status:** ✓ Good — All `.nav-link` are native `<a>` elements with `href` attributes.

**However, verify in React/Astro implementation:**
- Ensure no `<div>` with onClick replaces `<a>` tags
- Confirm `href` attributes are present (not removed for SPA routing)

---

### 2. Hero Section Title - No Keyboard Access to Content
**Severity:** CRITICAL  
**File:** `hero-static.html`, `glowing-header.html`  
**Pattern:**
```html
<h1 class="title">
  <span class="title-word">Year</span>
  <span class="title-word">Of</span>
  <span class="title-word">The</span>
  <span class="title-word">Build</span>
</h1>
```

**Issue:** H1 heading is not interactive but creates entry point for screen reader users. **Current implementation is correct** — heading is semantic and does not need keyboard handler.

**Verify:** Ensure CTA buttons below hero are actual `<button>` elements, not `<div>` elements.

---

### 3. Potential Issue: Scroll-Triggered State Changes
**Severity:** HIGH  
**File:** `home.html`  
**Pattern:**
```css
.nav--scrolled {
  background: rgba(10, 10, 10, 0.95);
}
```

**Issue:** CSS class applied on scroll. Keyboard-only users may not see visual feedback.

**Fix:** Ensure navigation remains focusable and visible during scroll. Consider adding `focus-within` state:
```css
.nav:focus-within,
.nav--scrolled {
  background: rgba(10, 10, 10, 0.95);
}
```

---

### 4. Button/Link Implementation in React/Astro
**Severity:** CRITICAL (in implementation phase)  
**Pattern to avoid:**
```jsx
// ❌ BAD - DIV with onClick
<div onClick={handleClick} className="button">Click me</div>

// ❌ BAD - Link with onClick instead of href
<a onClick={handleAction}>Action</a>

// ✓ GOOD - Native button
<button onClick={handleClick}>Click me</button>

// ✓ GOOD - Native link for navigation
<a href="/page">Go to page</a>
```

**Action:** During Astro/React implementation, enforce:
1. All clickable elements use `<button>` or `<a>` with `href`
2. No custom `<div>` with keyboard handlers
3. No `onClick` handlers on non-interactive elements

---

### 5. Focus Management on Modal/Overlay (If Used)
**Severity:** CRITICAL (if implemented)  
**Concern:** News section, project modals, or expanded details

**Ensure:**
- Modal takes focus on open
- Focus cannot escape modal (focus trap)
- Focus returns to trigger on close
- Escape key closes modal

**Pattern:**
```jsx
// ✓ GOOD
<dialog open ref={dialogRef}>
  {/* Focus trapped inside dialog */}
</dialog>

// ❌ BAD
<div className="modal">  {/* No focus management */}
  Content
</div>
```

---

## Recommendations

1. **Audit Astro components** – When implementation begins:
   - Grep for `<div.*onClick` and replace with `<button>`
   - Verify all navigation uses `<a href>` not `onClick`
   - Check for custom components that bypass native semantics

2. **Test with keyboard only:**
   - Tab through entire page — all interactive elements should be reachable
   - Can you close any modals with Escape?
   - Do focus indicators appear?

3. **Add to pre-deploy checklist:**
   - [ ] No div with onClick (except internal game/interactive demos)
   - [ ] All links have href
   - [ ] All buttons are <button> elements
   - [ ] Tab order is logical (left-to-right, top-to-bottom)

---

**Status:** Design files are semantically correct. Critical work happens in implementation.  
**Priority:** Enforce these patterns during React/Astro development.
