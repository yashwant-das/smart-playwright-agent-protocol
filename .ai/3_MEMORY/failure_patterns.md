# Failure Pattern Library

*Document every test failure cause and fix. This builds institutional knowledge.*

**Format:**
```
## Pattern: [Descriptive Name]
**First Seen:** YYYY-MM-DD
**Frequency:** Rare | Occasional | Common
**Symptom:** What the error looks like
**Root Cause:** Why it happens
**Fix:** How to resolve
**Prevention:** How to avoid in future
**Affected Tests:** List of test files
```

---

## Pattern: Element Not Found After Deploy
**First Seen:** 2024-01-10
**Frequency:** Common
**Symptom:** `Error: locator.click: Target closed`
**Root Cause:** Race condition - element loads slower in CI than local
**Fix:** 
```typescript
await page.waitForLoadState('networkidle');
await page.locator('[data-testid="element"]').click();
```
**Prevention:** Always use `waitForLoadState` after navigation
**Affected Tests:** All navigation-dependent tests

---

## Pattern: Flaky Click on Mobile Viewport
**First Seen:** 2024-01-10
**Frequency:** Occasional
**Symptom:** Click doesn't register, no error thrown
**Root Cause:** Element obscured by sticky header
**Fix:**
```typescript
await page.locator('[data-testid="element"]').scrollIntoViewIfNeeded();
await page.locator('[data-testid="element"]').click();
```
**Prevention:** Always scroll into view before click on mobile
**Affected Tests:** Mobile viewport tests

---

## Pattern: ESLint Config Conflict After Setup
**First Seen:** 2025-01-10
**Frequency:** Rare
**Symptom:** `SyntaxError: Cannot use import statement outside a module` or `ESLint couldn't find an eslint.config.(js|mjs|cjs) file`
**Root Cause:** Multiple ESLint configuration files present (e.g., `.eslintrc.json`, `eslint.config.js`, `eslint.config.mjs`). ESLint 9 defaults to flat config format, but project uses CommonJS. When both formats exist, conflicts occur.
**Fix:** 
1. Remove all conflicting config files
2. Use single `.eslintrc.js` with CommonJS format (`module.exports`)
3. Set `ESLINT_USE_FLAT_CONFIG=false` in npm script to enable legacy config support
4. Install `eslint-plugin-playwright` for Playwright-specific rules
**Prevention:** 
- Always check for existing ESLint config files before creating new ones
- Use `.eslintrc.js` format for Playwright projects (aligns with community best practices)
- Document ESLint config format decision in decision_log.md (see AD-005)
**Affected Tests:** All files (build-time issue, not test-specific)

*Your failure patterns go below this line*

