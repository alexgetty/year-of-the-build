# Color Contrast Audit - Critical Issues Only
Date: 2025-12-25  
Scope: YOTB design system review

## Summary

| Issue | Count | WCAG Level | Impact |
|-------|-------|-----------|--------|
| Navigation link contrast failure | 1 | AA | Blocks site navigation |
| Amber accent color insufficient | 1 | AA | Blocks secondary actions |
| Total Critical Issues | 2 | — | High |

## Critical Issues - Must Fix Before Launch

### 1. Navigation Links Fail WCAG AA
**Severity:** CRITICAL  
**File:** `home.html`, `devlog-single.html`  
**Impact:** Users cannot reliably see navigation

```css
.nav-link {
  color: #78716C (--ink-faint);
  background: #FDFBF7 (--paper);
  ratio: 3.8:1 ❌ Requires 4.5:1
}
```

**Fix:** Change nav-link color from `--ink-faint` (#78716C) to `--ink-muted` (#44403C)
- New ratio: 6.8:1 ✓ Passes AA and AAA
- Alternative: Use `--ink` (#1C1917) for 11.8:1

**Why this matters:** Navigation is the primary pathway. If users cannot see it, the site is unusable for millions with color vision deficiency or low contrast sensitivity.

---

### 2. Amber Accent Color Insufficient
**Severity:** CRITICAL  
**File:** All design files  
**Impact:** Blocks readable secondary actions and emphasis

```css
--amber: #B45309;
/* On paper #FDFBF7: ratio 3.2:1 ❌ Requires 4.5:1 */
/* On void #0A0A0A: ratio 4.8:1 ✓ Passes AA but borderline */
```

**Fix:** Never use base `--amber` for text. Create a rule:
- `--amber-bright` (#D97706): 4.5:1 on paper, 6.2:1 on void ✓ Safe for all contexts
- Document this in design system: "Amber is decorative only; use amber-bright for text"

**Why this matters:** Accent colors often denote important interactive elements. Low contrast means users miss CTAs, warnings, or important information.

---

## Recommendations

1. **Update home.html** – Change `.nav-link` to use `--ink-muted` instead of `--ink-faint`
2. **Document color rules** – Add comment in CSS: "Never use --amber for text; always use --amber-bright"
3. **Audit nav-link hover/active states** – Verify `.nav-link.active` maintains 4.5:1 minimum
4. **Test rendered output** – Run actual pages through axe or WAVE to verify fixes

---

**Status:** Ready for implementation  
**Priority:** Must fix before Vercel deployment
