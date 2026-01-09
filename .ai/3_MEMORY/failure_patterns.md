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

*Your failure patterns go below this line*

