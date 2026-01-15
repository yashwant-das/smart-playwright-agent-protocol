# Phase 4: Healer Mode (Maintenance and Fixes)

**When to Use:**

- Test fails unexpectedly
- Selector breaks after deployment
- Unexpected behavior detected
- Production bug found
- CI/CD pipeline fails

**Duration:** 10-30 minutes depending on complexity

**Philosophy:** "Root cause analysis before hot-fixes. Consult institutional memory first."

**Quick Copy:** [Prompt Template](../prompts/04_healer.md)

---

## Workflow Diagram

```mermaid
flowchart TD
    Start([Test Fails]) --> Reproduce[Step 1: Reproduce and Capture]
    Reproduce --> Analyze[Step 2: Root Cause Analysis]
    Analyze --> Fix[Step 3: Apply Fix]
    Fix --> Verify[Step 4: Verify Fix]
    Verify --> Pass{All Tests Pass?}
    Pass -->|Yes| Doc[Step 5: Document Pattern]
    Pass -->|No| Analyze
    Doc --> Sprint[Step 6: Update Active Sprint]
    Sprint --> Git[Git Commit Flow]
    Git --> Done([Healer Complete])
```

---

## Prompt Template

```
Activate **Healer Mode**.

**Issue Description:**
[PASTE ERROR LOG OR DESCRIBE FAILURE HERE]

**Context:**
- Read `.ai/1_CONTEXT/mission.md`
- Read `.ai/3_MEMORY/failure_patterns.md` (check if known issue)
- Read `.ai/3_MEMORY/selector_vault.md`
- Read `.ai/1_CONTEXT/decision_log.md` (check for related decisions)

**Diagnostic Phase:**

1. **Reproduce the Issue:**
   - Run failing test with `npm run test:headed`
   - Use MCP to screenshot the failure state
   - Note exact error message and stack trace

2. **Identify Root Cause:**
   - Is this a selector issue? (element not found)
   - Is this a timing issue? (race condition)
   - Is this a logic issue? (wrong assertion)
   - Is this an environment issue? (CI vs local)
   - Is this a known pattern? (check failure_patterns.md)

3. **Check History:**
   - Did this test pass before?
   - What changed? (git log, recent commits)
   - Is the selector in the vault? Has it been updated?

**Investigation Checklist:**
- [ ] Screenshot current page state via MCP
- [ ] Compare to expected state
- [ ] Try highlighting failing selector via MCP
- [ ] Check if selector still exists in DOM
- [ ] Check console for JS errors
- [ ] Check network tab for failed requests
- [ ] Review recent code changes

**Fix Phase:**

Based on root cause, apply appropriate fix:

### If Selector Changed:
1. Use MCP to find new selector
2. Highlight to verify it works
3. Update selector vault with:
   - New selector
   - Mark old selector as deprecated
   - Add note explaining change
4. Update Page Object with new selector
5. Re-run test to verify fix

### If Timing Issue:
1. Add appropriate wait strategy:
   - `waitForLoadState('networkidle')` for page loads
   - `waitForSelector()` for dynamic elements
   - `waitFor({ state: 'visible' })` for visibility
2. Document in vault with note: "wait-net" or "wait-sel"
3. Update Page Object method
4. Re-run test

### If Logic Issue:
1. Fix the test logic
2. Add better assertions
3. Consider adding edge case test
4. Re-run test

### If Tech Stack Issue:
1. Document decision needed
2. Add entry to decision_log.md (propose solution)
3. Update tech_stack.md if approved
4. Implement fix
5. Re-run test

**Documentation Phase:**

1. **Update failure_patterns.md:**
```markdown
## Pattern: [Descriptive Name]
**First Seen:** YYYY-MM-DD
**Frequency:** Rare | Occasional | Common
**Symptom:** [Error message]
**Root Cause:** [Why it happened]
**Fix:** [How to resolve]
**Prevention:** [How to avoid]
**Affected Tests:** [List]
```

2. **Update decision_log.md (if architectural change):**
   - Add new AD entry if tech stack changed
   - Reference from commit message

3. **Update lessons_learned.md (if strategic insight):**
   - High-level insight
   - Impact on future work

4. **Update active_sprint.md:**
   - Mark healing complete
   - Add to "Recent Healing Activities"

**Verification Phase:**

1. Run fixed test: `npm run test:headed`
2. Verify test passes
3. Run full suite: `npm test`
4. Verify no regressions
5. Check lint and type-check still pass

**Exit Criteria:**

- [ ] Test runs green
- [ ] Root cause identified and documented
- [ ] Fix applied and verified
- [ ] Failure pattern logged (in failure_patterns.md)
- [ ] Vault/decision log updated if needed
- [ ] No regressions introduced

**Deliverable:**

- Fixed test
- Documented failure pattern
- Updated documentation

```

---

## Detailed Investigation Guide

### Step 1: Reproduce and Capture Evidence

**Commands:**

```bash
# Run the failing test with UI visible
npm run test:headed -- tests/[filename].spec.ts

# Capture screenshot via MCP
# Use playwright_screenshot tool
```

---

### Step 2: Root Cause Analysis

1. **Selector issue?** (element not found)
2. **Timing issue?** (race condition)
3. **Logic issue?** (wrong assertion)
4. **Environment issue?** (CI vs local)

---

### Step 3: Apply Fix

Based on root cause, apply the appropriate fix.

#### If Selector Changed

1. Find new selector via MCP
2. Update vault (deprecate old, add new)
3. Update Page Object
4. Re-run test

#### If Timing Issue

1. Add explicit waits (`networkidle`, `visible`, `enabled`)
2. Update vault notes
3. Update Page Object

#### If Logic Issue

1. Fix the assertion/logic
2. Re-run test

---

### Step 4: Verify Fix

Run comprehensive verification.

```bash
# Run fixed test
npm run test:headed -- tests/[filename].spec.ts

# Stability check (optional)
for i in {1..10}; do npm test -- tests/[filename].spec.ts || break; done

# Regression check
npm test
```

---

### Step 5: Document Pattern

Add entry to `.ai/3_MEMORY/failure_patterns.md`.

---

## Healer → Git Commit Flow

```
Activate **Git Commit Flow**.

**Context:**
- Read `.ai/1_CONTEXT/git_standards.md`
- Healer Mode just completed

**Pre-Commit Checklist:**
- [ ] Fixed test now passing
- [ ] Full test suite passing (no regressions)
- [ ] Failure pattern documented
- [ ] Decision log updated (if AD created)
- [ ] Selector vault updated (if selector changed)

**Commit Type:** heal (or fix if minor bug)
**Commit Scope:** [affected-area]

**Task:**
1. Stage changes: `git add .`
2. Show `git diff --staged`
3. Prepare healing commit message
4. Execute commit after approval
```

---

## Example Healer Commit

```bash
git commit -m "heal(products): Fix race condition in add-to-cart (AD-012)

Issue:
- Test failing intermittently: 'Add to cart button not found'
- Error: TimeoutError: locator.click: Target closed

Investigation:
- Button exists but click happens before network idle
- CI network slower than local, exposes race condition

Resolution:
- Added explicit wait for button enabled state
- Updated ProductsPage.addProductToCart()

Documentation:
- AD-012: Wait for button enabled before click
- Failure pattern: 'Race Condition in Dynamic Buttons'

Verification:
- All tests passing green
"
```

---

## Next Steps

| Situation | Next Mode |
|-----------|-----------|
| Fix complete | Continue or [Night Watchman](./06_night_watchman.md) |
| More tests failing | Continue Healer Mode |

---

## Related Documentation

- [Healer Prompt](../prompts/04_healer.md) - Copy-paste version
- [Failure Patterns](../../3_MEMORY/failure_patterns.md) - Known issues
- [Selector Vault](../../3_MEMORY/selector_vault.md) - Verified selectors

---

**Healer Mode is complete. Ready for Git Commit Flow.**
