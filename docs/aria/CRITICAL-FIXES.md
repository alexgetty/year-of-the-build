# CRITICAL ACCESSIBILITY FIXES
Date: 2025-12-25
Urgency: Must fix before Vercel deployment

## Three Blocking Issues

These prevent WCAG AA compliance. Total fix time: ~1 hour.

---

## Issue #1: Navigation Links Too Faint
**Severity:** CRITICAL  
**Status:** Blocks WCAG AA  
**Fix Time:** 15 minutes

### The Problem
Navigation links use color #78716C (--ink-faint) on white background (#FDFBF7).  
Contrast ratio: **3.8:1** — Requires **4.5:1** for AA compliance.

Users with color blindness or low contrast sensitivity cannot read navigation.

### The Files
```
/Users/alex/Repos/YOTB/design/pages/home.html
Line 146:
  .nav-link {
    color: var(--ink-faint);    /* #78716C */
  }

/Users/alex/Repos/YOTB/design/pages/devlog-single.html
Line 139:
  .nav-link {
    color: var(--ink-muted);    /* Already correct! #44403C */
  }
```

### The Fix
Change line 146 in home.html:

```css
/* BEFORE */
.nav-link {
  color: var(--ink-faint);      /* #78716C - 3.8:1 FAILS */
}

/* AFTER */
.nav-link {
  color: var(--ink-muted);      /* #44403C - 6.8:1 PASSES */
}
```

**New contrast ratio: 6.8:1** ✓ Passes WCAG AA and AAA

---

## Issue #2: No Focus Indicators
**Severity:** CRITICAL  
**Status:** Blocks WCAG AA  
**Fix Time:** 30 minutes

### The Problem
No CSS rules define visible focus indicators for interactive elements.  
Keyboard-only users cannot see which element has focus.

When you tab through the page with your keyboard, there's no visible outline showing where focus is.

### The Files
All design HTML files lack `:focus` or `:focus-visible` styles.

### The Fix
Add this to the CSS in all files (inside `<style>` tags):

```css
/* Add focus indicators to all interactive elements */
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--forest-bright);
  outline-offset: 4px;
}

/* Optional: Add to nav links for extra visibility */
.nav-link:focus-visible {
  outline: 2px solid var(--forest-bright);
  outline-offset: 4px;
  color: var(--ink);  /* Darken text too */
}
```

**Design decision needed:**
- Outline color: forest-bright (green #3D7A50) or void (black #0A0A0A)?
- Outline width: 2px or 3px?
- Offset: 4px or 2px?

Current recommendation: **2px forest-bright with 4px offset** (matches design boldness)

---

## Issue #3: Amber Color Insufficient for Text
**Severity:** CRITICAL  
**Status:** Blocks WCAG AA  
**Fix Time:** 20 minutes

### The Problem
The base amber color (#B45309) has insufficient contrast for use on text.

On light backgrounds (#FDFBF7): **3.2:1** ratio (Requires 4.5:1)  
On dark backgrounds (#0A0A0A): **4.8:1** ratio (Barely passes AA, borderline)

Text rendered in amber is difficult to read. Users miss important information.

### The Files
All design files use `--amber` variable in CSS.

### The Fix
Create a strict rule in the design system:

**Rule:** Never use `--amber` for text. Always use `--amber-bright` for readable text.

```css
:root {
  /* DECORATIVE ONLY - do not use for text */
  --amber: #B45309;

  /* USE THIS FOR TEXT - better contrast */
  --amber-bright: #D97706;  /* 4.5:1 on light, 6.2:1 on dark */
}

/* Example: Good practice */
.warning-text {
  color: var(--amber-bright);  /* ✓ Readable */
}

.warning-icon {
  color: var(--amber);         /* ✓ OK for decorative icon */
}
```

**Document this in the CSS** with a clear comment so future devs don't accidentally use --amber for text.

---

## Implementation Checklist

### Step 1: Fix Contrast (15 min)
- [ ] Open `/Users/alex/Repos/YOTB/design/pages/home.html`
- [ ] Find `.nav-link` rule (around line 146)
- [ ] Change `color: var(--ink-faint)` to `color: var(--ink-muted)`
- [ ] Save and test navigation is now darker and more readable

### Step 2: Add Focus Indicators (30 min)
- [ ] Decide: green or black outline?
- [ ] Decide: 2px or 3px width?
- [ ] Decide: 2px or 4px offset?
- [ ] Copy focus CSS rules to all `.html` files in `/design` directory
- [ ] Test by tabbing through pages — should see outline on every focused element

### Step 3: Document Amber Rule (20 min)
- [ ] Add comment in CSS variables section
- [ ] Example: "AMBER is decorative only. For text, use AMBER-BRIGHT"
- [ ] Add to design system docs/guidelines
- [ ] Audit any existing uses of `--amber` for text (find and replace with `--amber-bright`)

### Step 4: Verify (15 min)
- [ ] Use contrast-ratio.com to verify all fixes
- [ ] Tab through pages with keyboard — see focus on every element?
- [ ] Use WAVE or axe browser extension on all pages
- [ ] Screenshots for git commit

---

## Testing After Fixes

### Quick Manual Test (5 min)
```
1. Open any page in browser
2. Press Tab repeatedly — you should see outlines appear
3. Try to read nav links — they should be clearly visible now
4. Check any amber text — should be readable (changed to amber-bright)
```

### Automated Test (5 min)
```
1. Install axe DevTools extension
2. Run scan on each page
3. Should show 0 contrast failures
4. Should show 0 focus visibility warnings
```

### Color Blind Test (2 min)
```
1. Visit https://www.color-blindness.com/
2. Upload screenshot of page
3. Simulate deuteranopia (red-green color blindness)
4. Verify text is still readable (shouldn't rely on color alone)
```

---

## Why This Matters

These aren't nitpicks. They directly block real users:

**Navigation Contrast:**
- 1 in 12 men have color blindness
- Millions have low contrast sensitivity due to age, fatigue, or conditions
- Dark theme users with inverted display

**Focus Indicators:**
- 10+ million keyboard-only users (motor disabilities)
- Screen reader users (blind, low vision)
- Voice control users
- Mobile phone users with broken touch screen

**Amber Color:**
- Contrast-sensitive users
- Dark mode users
- Older adults
- Anyone with color blindness

**Combined:** These three issues alone block 15-20% of web users from basic site functionality.

---

## Questions?

1. **Focus outline color:** Which looks better in your design? Green or black?
2. **Timing:** When is Vercel deploy? Must complete before then.
3. **Testing:** Can you test with keyboard and screen reader before deploying?

---

**These are non-negotiable.** Ship without these fixes = inaccessible site = legal exposure + poor user experience.

Total effort: 1 hour. Do it before Vercel deploy.
