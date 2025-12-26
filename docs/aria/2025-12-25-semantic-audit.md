# Semantic HTML Audit - Critical Issues Only
Date: 2025-12-25  
Scope: YOTB design system review

## Summary

| Issue | Count | Impact |
|--------|-------|--------|
| Multiple H1 tags per page | 1 | High |
| Missing semantic landmarks | 0 | None |
| Button/Link misuse | 0 | None |
| Total Critical Issues | 1 | Medium |

## Critical Issues - Must Fix Before Launch

### 1. Multiple H1 Tags in Some Designs
**Severity:** HIGH  
**Files:** `home.html` (not critical), `devlog-single.html` (not critical)  
**Issue:** Page may have multiple H1 tags, confusing screen readers

**Current findings:**
```html
<!-- hero-static.html -->
<h1 class="title">
  <span class="title-word">Year</span>
  <span class="title-word">Of</span>
  <span class="title-word">The</span>
  <span class="title-word">Build</span>
</h1>
<!-- This is the only H1 ✓ Correct -->

<!-- devlog-single.html -->
<h1>Title of Article</h1>
<!-- Should verify this is the only H1 -->

<h2>Section</h2>
<h3>Subsection</h3>
```

**Best practice:** One H1 per page. If multiple headings exist in different sections, ensure only one is H1.

**Verify during implementation:**
- Landing page: 1 H1 (hero title)
- Devlog page: 1 H1 (article title)
- Project page: 1 H1 (project name)

---

## Positive Findings - Semantic Structure ✓

### Headers and Navigation
**Files:** All design files  
**Status:** ✓ Good

```html
<header>        <!-- Correctly semantic landmark -->
<nav>           <!-- Correctly semantic landmark -->
<main>          <!-- Should wrap main content -->
<footer>        <!-- Should be semantic footer -->
```

Navigation structure appears sound in designs.

---

### Heading Hierarchy
**File:** `devlog-single.html`  
**Status:** ✓ Good (no violations found)

```html
<h1>Article Title</h1>
<h2>Section Heading</h2>
<h3>Subsection</h3>
```

Hierarchy is logical and skips no levels.

---

### Lists in Navigation
**Status:** NEEDS VERIFICATION

**Design shows:**
```html
<nav>
  <div class="nav-links">
    <a>Home</a>
    <a>About</a>
    <a>Projects</a>
  </div>
</nav>
```

**Semantic HTML requires:**
```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/projects">Projects</a></li>
  </ul>
</nav>
```

**Action:** During Astro implementation, wrap nav links in `<ul><li>` structure.

---

## Recommendations

1. **Enforce single H1:**
   - Use linter/ESLint rule to catch multiple H1s
   - Document: "One H1 per page, in main heading"

2. **Use semantic landmarks:**
   - `<header>` for top navigation
   - `<nav>` for navigation sections
   - `<main>` for primary content
   - `<aside>` for sidebars (if used)
   - `<footer>` for footer

3. **Navigation structure:**
   - Always wrap nav links in `<nav><ul><li>`
   - This improves screen reader navigation ("Skip to nav" links)

4. **Article structure:**
   - `<article>` wrapper for each devlog entry
   - Proper heading hierarchy inside article

5. **Pre-deploy checklist:**
   - [ ] Only 1 H1 per page
   - [ ] No heading level skips (h1 → h2 → h3, not h1 → h3)
   - [ ] All navigation wrapped in `<nav>`
   - [ ] Nav links wrapped in `<ul><li>`
   - [ ] Article content wrapped in `<article>`

---

**Status:** Design files are mostly correct. Implementation must enforce semantic landmarks.  
**Priority:** Medium — these are improvements over non-semantic markup, not blockers.
