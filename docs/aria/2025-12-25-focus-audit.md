# Focus Management Audit - Critical Issues Only
Date: 2025-12-25  
Scope: YOTB design system review

## Summary

| Issue | Count | Impact |
|--------|-------|--------|
| No visible focus indicators defined | 1 | Critical |
| Positive tabIndex usage | 0 | None |
| Missing focus restoration handlers | 3 | High |
| Total Critical Issues | 4 | High |

## Critical Issues - Must Fix Before Launch

### 1. No Focus Indicator in CSS
**Severity:** CRITICAL  
**Scope:** All HTML files  
**Impact:** Users cannot see which element has keyboard focus

**Current state:** No CSS rules define `:focus` or `:focus-visible` for interactive elements.

**Required implementation:**
```css
/* Add to all design files before launch */
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #0A0A0A;
  outline-offset: 2px;
}

/* Optional: style per design */
button:focus-visible {
  outline: 3px solid var(--forest-bright);
  outline-offset: 4px;
  box-shadow: 0 0 0 4px rgba(61, 122, 80, 0.1);
}
```

**Why critical:** Without a focus indicator, keyboard-only users and screen reader users have no idea which element is active. This blocks all navigation.

**Design decisions needed:**
1. Should focus outline be **green** (forest-bright) or **black** (void)?
2. Should outline-offset be **2px** (tight) or **4px** (loose)?
3. Should buttons have additional shadow effect?

---

### 2. No `:focus-visible` for CSS States
**Severity:** CRITICAL  
**Scope:** All interactive elements  
**Issue:** Hover state exists (e.g., `.nav-link:hover`) but no focus state

**Current pattern in home.html:**
```css
.nav-link:hover,
.nav-link.active {
  color: var(--ink);
}

/* ❌ Missing focus state */
```

**Required:** Add focus-visible states to all interactive elements:
```css
.nav-link:focus-visible {
  outline: 2px solid var(--forest-bright);
  outline-offset: 4px;
}

.nav-link:hover,
.nav-link.active {
  color: var(--ink);
}
```

**Why critical:** Keyboard users need visual feedback distinct from hover states.

---

### 3. Scroll-Based Focus Loss
**Severity:** HIGH  
**File:** `home.html` (sticky navigation)  
**Pattern:**
```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

**Concern:** When user tabs through navigation while page scrolls, focus might be obscured or lost.

**Verify before launch:**
- Focus remains visible when navigation is sticky
- Content below navigation is not hidden by nav when focused
- No "focus trap" where keyboard user gets stuck on nav

**Test:** Tab through page on mobile — navigation should not cover focused elements.

---

### 4. Modal/Overlay Focus Management (Future)
**Severity:** CRITICAL (if implemented)  
**Scope:** Project details, expanded content, any modal

**Pattern to implement:**
```jsx
// When modal opens
useEffect(() => {
  if (isOpen) {
    dialogRef.current?.focus();  // Move focus to modal
  }
}, [isOpen]);

// When modal closes
const handleClose = () => {
  setIsOpen(false);
  triggerRef.current?.focus();  // Return focus to button
};
```

**Ensure:**
- Focus moves to modal when it opens
- Focus cannot escape modal (tab wraps within modal)
- Focus returns to trigger when modal closes
- Escape key closes modal

---

## Positive tabIndex - Status Check

**Current findings:** No positive tabIndex values found in design files. ✓ Good.

**Ensure during implementation:**
```jsx
// ❌ BAD - never do this
<div tabIndex={1}>First focus</div>
<div tabIndex={2}>Second focus</div>

// ✓ GOOD - natural DOM order or -1 for programmatic
<div tabIndex={0}>First in DOM order</div>
<div tabIndex={-1}>Hidden from tab, can focus programmatically</div>
```

---

## Recommendations

1. **Add focus indicators immediately:**
   - Decide on visual design (outline color, offset, shadow)
   - Add `:focus-visible` to all interactive elements
   - Test with keyboard-only navigation

2. **Sticky navigation:** 
   - Test keyboard navigation with scrolling
   - Ensure focus is never hidden behind nav

3. **Modal implementation checklist:**
   - [ ] Modal receives focus when opened
   - [ ] Focus trap: Tab/Shift+Tab stays within modal
   - [ ] Escape closes modal
   - [ ] Focus returns to trigger on close

4. **Pre-deploy testing:**
   - Tab through entire page with keyboard only
   - Can you see focus indicator on every element?
   - Does focus order match reading order (left-to-right, top-to-bottom)?
   - On mobile, is focus ever hidden behind sticky nav?

---

**Status:** Design files lack focus styles. Implementation must add these before launch.  
**Priority:** Must implement before Vercel deployment. Focus is non-negotiable.
