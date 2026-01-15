# 🔄 The Daily Workflow (The "Engine")

**Purpose:** A comprehensive, mode-based workflow that integrates AI-driven QA automation with proper Git hygiene and documentation.

**Status:** Production-Ready | Universal Template
**Use Case:** Any QA automation project using Playwright + AI

---

## 📋 **Overview: The 6-Phase Cycle**

Every work session follows this cycle:

```
1. Morning Ritual (Startup)
   ↓
2. Cartographer Mode (Discovery)
   ↓
3. Architect Mode (Implementation)
   ↓
4. Healer Mode (Fixes - as needed)
   ↓
5. Git Commit Flow (Documentation)
   ↓
6. Night Watchman Mode (Shutdown)
```

**Key Principle:** Each phase has **clear entry criteria, tasks, and exit criteria**. Never skip phases.

---

## 🌅 **Phase 0: Morning Ritual (Session Startup)**

**When to Use:** Start of every work session

**Duration:** 2-5 minutes

### **Prompt Template:**

```
Activate **Morning Ritual Mode**.

**Tasks:**
1. Run environment health check:
   - Execute `npm test` to verify baseline
   - Execute `npm run lint` to check code quality
   - Check git status: `git status`
   
2. Review context:
   - Read `.ai/2_PLANNING/active_sprint.md`
   - Check "Last Completed Task" and "Next Session Focus"
   - Review any blockers
   
3. Activate Smoke Test (optional but recommended):
   - Read `.ai/3_MEMORY/selector_vault.md`
   - Pick 3-5 random selectors from different pages
   - Use MCP to verify they still work
   - Report health status
   
4. Check for updates:
   - Any new daily logs since last session?
   - Any new decisions in decision_log.md?
   - Any new failure patterns?

**Exit Criteria:**
- [ ] Environment is healthy (tests passing, no lint errors)
- [ ] Context loaded (know what to work on)
- [ ] No critical selectors broken (smoke test passed)
- [ ] Ready to choose next mode

**Deliverable:** Status report + recommendation for which mode to activate next
```

### **Expected Output:**

```
Morning Ritual Complete ✅

Environment Health:
- Tests: 3/3 passing ✅
- Lint: 0 errors ✅
- Git: Clean working directory ✅

Context Review:
- Last session: Completed login page automation
- Next focus: Products page mapping
- Blockers: None

Smoke Test:
- Tested 5 selectors across 2 pages
- Results: 5/5 working ✅

Recommendation: Activate Cartographer Mode for products page
Target: https://www.saucedemo.com/inventory.html
```

---

## 🟢 **Phase 1: Cartographer Mode (Discovery)**

**When to Use:** 
- Starting a new page/feature
- Investigating existing page changes
- Selector validation/audit

**Duration:** 10-20 minutes per page

### **Prompt Template:**

```
Activate **Cartographer Mode**.

**Context:** 
- Read `.ai/2_PLANNING/active_sprint.md`
- Read `.ai/1_CONTEXT/mission.md`

**Target:** [YOUR_TARGET_URL_HERE]

**Goal:** [WHAT_ELEMENTS_TO_MAP - e.g., "Map login form" or "Map product grid"]

**Tools Required:** 
- MCP server (playwright-community)

**Task Checklist:**
1. Launch browser (headed mode for visibility)
2. Navigate to target URL
3. Identify ALL interactive elements for the goal:
   - [Element type 1 - e.g., Input fields]
   - [Element type 2 - e.g., Buttons]
   - [Element type 3 - e.g., Links]
   - [Element type 4 - e.g., Validation messages]
   
4. For EACH element:
   - Use MCP `highlight_element` to verify it exists
   - Test the selector in browser console if needed
   - Record: Page | Element | Selector | Strategy | Date | Notes
   - Prefer this priority: data-testid > aria > id > semantic-class > text
   
5. Document edge cases:
   - Any elements requiring special waits?
   - Any elements in iframes or shadow DOM?
   - Any dynamic content?
   
6. Take full-page screenshot:
   - Save to `.ai/2_PLANNING/maps/[pagename]_[YYYYMMDD].png`
   - Annotate if helpful
   
7. Append verified selectors to `.ai/3_MEMORY/selector_vault.md`:
   - Use the standard format
   - Include verification date
   - Add notes for special cases
   
8. Update `active_sprint.md`:
   - Mark Cartographer task as [x] complete
   - Add any observations to Notes section

**Exit Criteria:**
- [ ] All target elements highlighted successfully (zero phantom selectors)
- [ ] Selector vault has entries for all mapped elements (minimum 3)
- [ ] Screenshot saved with descriptive filename
- [ ] No code written yet (this is discovery only)
- [ ] Active sprint updated

**Deliverable:** 
- Populated selector vault entries
- Screenshot in maps/ folder
- Updated active sprint

**IMPORTANT:** Use MCP tools to actually interact with the browser. Verify visually.
```

### **Cartographer → Git Commit Flow:**

After Cartographer completes, commit the mapping work:

```
Activate **Git Commit Flow**.

**Context:**
- Read `.ai/1_CONTEXT/git_standards.md`
- Cartographer Mode just completed

**Pre-Commit Checklist:**
- [ ] Selector vault updated with new entries
- [ ] Screenshot saved to maps/
- [ ] Active sprint updated
- [ ] No code files created (Cartographer doesn't write code)

**Commit Type:** map
**Commit Scope:** [page-name - e.g., products, cart, checkout]

**Task:**
1. Show me `git diff --staged` for review
2. Prepare commit message following the standard:
   - Type: map
   - Include: Number of selectors, page URL, screenshot filename
   - Reference: selector_vault.md
3. Ask for approval before committing
4. After approval, execute commit
5. Update active_sprint.md "Last Commit" reference

**Deliverable:** Committed mapping work with proper message
```

**Example Cartographer Commit:**

```bash
git add .
git commit -m "map(products): Map inventory page with 8 verified selectors

Cartographer Mode:
- Mapped https://www.saucedemo.com/inventory.html
- Verified 8 selectors via MCP highlight:
  * Product grid container
  * 6 product cards
  * Add to cart buttons
  * Shopping cart badge
  * Sort dropdown
- Screenshot: .ai/2_PLANNING/maps/products_20260110.png
- All selectors added to vault with verification dates

Selector Strategy:
- Prefer data-test attributes (SauceDemo standard)
- Product cards use stable class names
- Cart badge uses unique ID

Status: ✅ Cartographer complete
Next: Architect Mode - Build ProductsPage.ts

See: .ai/3_MEMORY/selector_vault.md"
```

---

## 🔵 **Phase 2: Architect Mode (Implementation)**

**When to Use:** After Cartographer completes, ready to write code

**Duration:** 20-40 minutes per page

### **Prompt Template:**

```
Activate **Architect Mode**.

**Context:**
- Read `.ai/3_MEMORY/selector_vault.md` (ONLY use these selectors)
- Read `.ai/1_CONTEXT/mission.md` (follow POM rules)
- Read `.ai/2_PLANNING/active_sprint.md` (know the goal)

**Target Page:** [PAGE_NAME]

**Task Checklist:**

### 1. Create Page Object
**Location:** `pages/[PageName]Page.ts`

**Requirements:**
- Extend BasePage class
- Use ONLY selectors from vault (from recent Cartographer run)
- Include all necessary methods:
  * Navigation (if not inherited from BasePage)
  * Interaction methods (fill, click, select, etc.)
  * Verification method: `isLoaded()`
  * Getter methods for dynamic content
  
**Example Structure:**
```typescript
export class [PageName]Page extends BasePage {
  // Selectors from vault as private readonly Locators
  
  constructor(page: Page) {
    super(page);
    // Initialize locators
  }
  
  // Action methods
  async [primaryAction]() { }
  
  // Verification methods
  async isLoaded() { }
  
  // Getter methods
  async get[Something]() { }
}
```

### 2. Create Test Spec
**Location:** `tests/[feature-name].spec.ts`

**Requirements:**
- Import the Page Object
- Write 3-5 test cases covering:
  * Happy path (primary user flow)
  * Edge cases (error handling, validation)
  * Verification (page loads correctly)
  
**Structure:**
```typescript
import { test, expect } from '@playwright/test';
import { [PageName]Page } from '../pages/[PageName]Page';

test.describe('[Feature Name]', () => {
  test('should [test case 1]', async ({ page }) => {
    // Arrange
    const pageObject = new [PageName]Page(page);
    
    // Act
    await pageObject.goto('[URL]');
    
    // Assert
    await pageObject.isLoaded();
    expect(...).toBe...();
  });
  
  // More test cases...
});
```

### 3. Code Quality Checks
Execute in order:
1. `npm run lint` - Fix all errors before proceeding
2. `npm run type-check` - Resolve all TypeScript errors
3. `npm run test:headed` - Watch tests run, verify behavior
4. If any test fails → Stop and activate Healer Mode
5. If all pass → `npm test` (headless verification)

### 4. Documentation
- Add JSDoc comments to complex methods
- Update selector vault if any selectors needed adjustment
- Add any special cases to active_sprint.md Notes

### 5. Update Active Sprint
- Mark Architect tasks as [x] complete
- Note any edge cases discovered
- Update "Last Completed Task"

**Exit Criteria:**
- [ ] Page Object created following POM pattern
- [ ] Test spec created with 3+ test cases
- [ ] All tests passing (green) in both headed and headless
- [ ] ESLint: 0 errors
- [ ] TypeScript: compiles successfully
- [ ] No hardcoded values (use fixtures/config)
- [ ] Active sprint updated

**Deliverable:** 
- Working Page Object file
- Passing test spec file
- Updated active sprint

**CRITICAL:** If any test fails, STOP and activate Healer Mode immediately.
```

### **Architect → Git Commit Flow:**

```
Activate **Git Commit Flow**.

**Context:**
- Read `.ai/1_CONTEXT/git_standards.md`
- Architect Mode just completed

**Pre-Commit Checklist:**
- [ ] All tests passing (npm test)
- [ ] Linter clean (npm run lint)
- [ ] Type check clean (npm run type-check)
- [ ] Page Object follows POM pattern
- [ ] No raw selectors in test specs
- [ ] Active sprint updated

**Commit Type:** feat (or arch if pure Page Object without tests)
**Commit Scope:** [page-name]

**Task:**
1. Stage files: `git add pages/ tests/ .ai/`
2. Show me `git diff --staged` for review
3. Prepare commit message:
   - Type: feat
   - Include: Page Object name, test count, test results
   - Reference: daily log if session complete
4. Ask for approval
5. Execute commit
6. Update active_sprint.md "Last Commit"

**Deliverable:** Committed feature with proper message
```

**Example Architect Commit:**

```bash
git add .
git commit -m "feat(products): Implement products page automation

Architect Mode:
- Created ProductsPage.ts with POM pattern
- Methods: addProductToCart(), sortProducts(), getProductCount()
- Created products.spec.ts with 4 test cases:
  * Display verification
  * Add single product to cart
  * Add multiple products
  * Sort products by price
  
Code Quality:
- ESLint: 0 errors ✅
- TypeScript: clean ✅
- All tests passing: 4/4 green ✅
- Selectors: All from vault, verified via Cartographer

Status: ✅ Products page automated
Next: Cart page mapping

See: .ai/2_PLANNING/active_sprint.md"
```

---

## 🔴 **Phase 3: Healer Mode (Maintenance & Fixes)**

**When to Use:** 
- Test fails
- Selector breaks
- Unexpected behavior
- Production bug found

**Duration:** 10-30 minutes depending on complexity

### **Prompt Template:**

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

### **Healer → Git Commit Flow:**

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
3. Prepare healing commit message:
   - Type: heal or fix
   - Include: Issue, Investigation, Resolution, Documentation
   - Reference: AD number if decision logged
   - Reference: failure_patterns.md
4. Ask for approval
5. Execute commit
6. Update active_sprint.md

**Deliverable:** Committed fix with full context
```

**Example Healer Commit:**

```bash
git add .
git commit -m "heal(products): Fix race condition in add-to-cart (AD-012)

Issue:
- Test failing intermittently: 'Add to cart button not found'
- Failure rate: ~30% in CI, never local
- Error: TimeoutError: locator.click: Target closed

Investigation:
- Used MCP screenshot to capture failure state
- Button exists but click happens before network idle
- Product data loads async, button disabled until ready
- CI network slower than local, exposes race condition

Resolution:
- Added explicit wait for button enabled state
- Updated ProductsPage.addProductToCart() method:
  * waitForSelector with state: 'visible'
  * waitFor with state: 'enabled'
  * Then click
- Updated vault note: 'wait-enabled' flag

Documentation:
- AD-012: Wait for button enabled before click
- Failure pattern: 'Race Condition in Dynamic Buttons'
- Updated tech_stack.md with wait strategy guidance

Verification:
- Ran test 20 times: 20/20 pass ✅
- Full suite: All tests passing ✅
- No regressions introduced ✅

Status: ✅ Healed successfully

Refs: AD-012
See: .ai/1_CONTEXT/decision_log.md, .ai/3_MEMORY/failure_patterns.md"
```

---

## 💾 **Phase 4: Git Commit Flow (Universal)**

**When to Use:** After ANY mode completes work that changes files

**Duration:** 3-5 minutes

### **Universal Commit Prompt:**

```
Activate **Git Commit Flow**.

**Context:**
- Read `.ai/1_CONTEXT/git_standards.md`
- Previous mode: [Cartographer/Architect/Healer/Other]

**Pre-Commit Checklist:**

Run these checks in order:
1. [ ] Tests status: `npm test`
   - If failed and not Healer Mode → Activate Healer Mode first
   - If passed → Continue
   
2. [ ] Lint status: `npm run lint`
   - If errors → Fix before committing
   - If passed → Continue
   
3. [ ] Type check: `npm run type-check`
   - If errors → Fix before committing
   - If passed → Continue
   
4. [ ] Security check:
   - [ ] No API keys in code
   - [ ] No passwords in code
   - [ ] No hardcoded file paths (e.g., /Users/username/...)
   - [ ] No .env files staged
   
5. [ ] Documentation check:
   - [ ] Active sprint updated
   - [ ] Daily log updated (if session ending)
   - [ ] Decision log updated (if decision made)
   - [ ] Selector vault updated (if selectors changed)
   - [ ] Failure patterns updated (if bug fixed)

**Commit Preparation:**

1. **Stage files:**
   ```bash
   git add .
   ```

2. **Show diff:**
   ```bash
   git diff --staged
   ```
   Present this to user for review

3. **Determine commit type:**
   - Cartographer → `map`
   - Architect (with tests) → `feat`
   - Architect (Page Object only) → `arch`
   - Healer → `heal` or `fix`
   - Documentation → `docs`
   - Dependencies → `chore`
   - Refactoring → `refactor`

4. **Prepare commit message:**
   Follow the standard from git_standards.md:
   - Subject line (max 72 chars)
   - Body with structured sections
   - Footer with references

5. **Show proposed commit:**
   ```
   I'm about to commit these changes:
   
   Type: [type]
   Scope: [scope]
   Subject: [subject]
   
   [Full commit message]
   
   Files changed: [count]
   Insertions: [count]
   Deletions: [count]
   
   Do you approve? (yes/no/edit)
   ```

6. **Execute commit (after approval):**
   ```bash
   git commit -m "[full message]"
   ```

7. **Update active_sprint.md:**
   Add to Quick Reference section:
   ```markdown
   **Last Commit:** [short-hash] - [subject line]
   ```

8. **Ask about push:**
   ```
   ✅ Committed successfully!
   Commit: [hash]
   
   Ready to push to remote? (yes/no/later)
   ```

**Exit Criteria:**
- [ ] All pre-commit checks passed
- [ ] User reviewed and approved diff
- [ ] Commit message follows standard
- [ ] Commit executed successfully
- [ ] Active sprint updated with commit reference
- [ ] User decided on push (executed or noted for later)

**Deliverable:** 
- Clean commit in git history
- Updated active sprint with commit reference
```

---

## 🌙 **Phase 5: Night Watchman Mode (Session Shutdown)**

**When to Use:** 
- End of work session
- Before long break
- When active_sprint.md gets too large (>100 lines)

**Duration:** 5-10 minutes

### **Prompt Template:**

```
Activate **Night Watchman Mode**.

**Context:**
- Read `.ai/2_PLANNING/active_sprint.md`

**Task Checklist:**

### 1. Create Daily Log

**Path:** `.ai/2_PLANNING/daily_logs/[YYYY-MM-DD].md`

**Structure:**
```markdown
# Daily Log: [Month Day, Year]

## Summary: What was accomplished today
[2-3 sentence summary of the session]

## Metrics
- **Pages Mapped:** [count]
- **Selectors Verified:** [count]
- **Page Objects Created:** [count]
- **Tests Written:** [count]
- **Test Pass Rate:** [X/Y green]
- **Healing Activities:** [count]
- **Architectural Decisions:** [count]
- **Code Quality:** [ESLint/TypeScript status]

## Phase 1: Discovery (Cartographer Mode)
[Extract all completed [x] Cartographer tasks from active_sprint.md]

**Selectors Added:**
[List new vault entries]

## Phase 2: Implementation (Architect Mode)
[Extract all completed [x] Architect tasks from active_sprint.md]

**Files Created:**
[List new files]

**Test Cases:**
[List test descriptions]

## Phase 3: Validation
[Extract validation results]

## Healing Activities (if any)
[Extract from "Recent Healing Activities" section]

## Technical Notes
[Extract from "Notes" section - observations about the system]

## Decisions Made
[Reference any AD entries created today]

## Next Session Planning
**Suggested Next Steps:**
1. [Most logical next task]
2. [Alternative task]
3. [Another option]

**Recommended Focus:** [Top priority]

---
**Session Duration:** [hours]
**Overall Status:** [emoji] [status description]
**Team Velocity:** [tests/session, pages/session]
```

### 2. Clean Active Sprint

**In active_sprint.md:**

**REMOVE:**
- All [x] completed tasks → Now in daily log
- All content from "Notes" section → Now in daily log
- "Recent Healing Activities" section → Now in daily log

**KEEP:**
- All [ ] pending tasks
- Unresolved blockers
- Sprint goal and status

**ADD:**
- New placeholder tasks for next session
- Reference to today's log in "Last Completed Task"

**UPDATE:**
- "Last Completed Task" → "See .ai/2_PLANNING/daily_logs/[date].md"
- "Next Session Focus" → First pending task or suggestion
- "Quick Reference" section with last commit

**Target:** active_sprint.md should be < 50 lines after cleanup

### 3. Archive Old Logs (if needed)

**If daily_logs/ has > 30 files:**
```bash
mkdir -p .ai/2_PLANNING/daily_logs/archive_[YYYY_MM]
mv .ai/2_PLANNING/daily_logs/[old-date]*.md .ai/2_PLANNING/daily_logs/archive_[YYYY_MM]/
```

### 4. Token Health Check

**Count lines:**
```bash
wc -l .ai/2_PLANNING/active_sprint.md
```

**Report:**
- ✅ If < 50 lines: "Token count healthy"
- ⚠️ If 50-100 lines: "Consider running Night Watchman more frequently"
- ❌ If > 100 lines: "CRITICAL: Token bloat detected, archive needed"

### 5. Generate Rollover Report

**Format:**
```
Night Watchman Report 🌙

Completed Today:
- [X] tasks completed
- [Y] files created
- [Z] tests written

Moved to Daily Log:
- Location: .ai/2_PLANNING/daily_logs/[date].md
- Size: [line count] lines

Active Sprint Status:
- Pending tasks: [count]
- Sprint completion: [%]
- Token health: ✅ [line count] lines

Next Session:
- Focus: [task description]
- Estimated effort: [time]
- Blockers: [none/list]

Ready for tomorrow! 🚀
```

**Exit Criteria:**
- [ ] Daily log created with all completed work
- [ ] active_sprint.md cleaned (< 100 lines, ideally < 50)
- [ ] Old logs archived (if needed)
- [ ] Token health confirmed
- [ ] Rollover report generated
- [ ] Sprint status updated

**Deliverable:** 
- Comprehensive daily log
- Clean active sprint
- Rollover report
```

### **Night Watchman → Git Commit Flow:**

```
Activate **Git Commit Flow**.

**Context:**
- Night Watchman just completed
- Session is ending

**Pre-Commit Checklist:**
- [ ] Daily log created
- [ ] Active sprint cleaned
- [ ] All previous work already committed

**Commit Type:** docs
**Commit Scope:** planning

**Task:**
1. Stage: `git add .ai/2_PLANNING/`
2. Show diff
3. Prepare commit:
   - Type: docs
   - Subject: "Night Watchman rollover - [date]"
   - Body: Summary of what was moved to daily log
4. Execute commit
5. Recommend: `git push` to preserve work

**Deliverable:** Session properly closed and documented
```

**Example Night Watchman Commit:**

```bash
git add .
git commit -m "docs(planning): Night Watchman rollover - 2026-01-10

Session Summary:
- Completed login and products page automation
- 7 total tests written (all passing)
- 2 Page Objects created
- 12 selectors added to vault
- 1 healing activity (ESLint config)
- 1 architectural decision (AD-005)

Daily Log:
- Created: .ai/2_PLANNING/daily_logs/2026-01-10.md
- Moved: All completed tasks and notes
- Preserved: Test results, healing activities, decisions

Active Sprint Cleanup:
- Removed: 8 completed tasks
- Remaining: 3 pending tasks
- Token health: ✅ 42 lines (healthy)

Next Session Focus:
- Cart page mapping (Cartographer Mode)

See: .ai/2_PLANNING/daily_logs/2026-01-10.md"

git push
```

---

## 🔄 **Phase 6: Continuous Modes (As Needed)**

### **Smoke Test Mode** 🔍

**When to Use:**
- Start of day (before Morning Ritual)
- After deployments
- Before major changes
- Weekly health check

**Prompt:**
```
Activate **Smoke Test Mode**.

**Context:**
- Read `.ai/3_MEMORY/selector_vault.md`

**Task:**
1. Sample 5-10 selectors across different pages
2. Use MCP to navigate to each page
3. Use MCP highlight to verify each selector works
4. Record: ✅ Working or ❌ Broken
5. Generate health report
6. If failures → Flag for Healer Mode

**Deliverable:** Selector health report
```

### **Archaeology Mode** 🏺

**When to Use:**
- Inheriting existing test suite
- Auditing old tests
- Migration planning

**Prompt:**
```
Activate **Archaeology Mode**.

**Context:**
- Read `.ai/1_CONTEXT/mission.md`

**Task:**
1. Scan tests/ directory
2. Extract all locators
3. Check POM usage
4. Analyze selector strategies
5. Use MCP to verify critical selectors
6. Generate audit report
7. Create migration plan

**Deliverable:** Audit report + migration plan
```

---

## 📊 **Workflow Decision Tree**

```
Session Start
    ↓
Morning Ritual
    ↓
Check Active Sprint
    ↓
┌─────────────────────────────────────┐
│ What needs to be done?              │
├─────────────────────────────────────┤
│                                     │
│ New page/feature?                   │
│   → Cartographer Mode               │
│        ↓                            │
│      Git Commit (map)               │
│        ↓                            │
│      Architect Mode                 │
│        ↓                            │
│      Git Commit (feat)              │
│                                     │
│ Test failed?                        │
│   → Healer Mode                     │
│        ↓                            │
│      Git Commit (heal)              │
│                                     │
│ Code improvement?                   │
│   → Architect Mode (refactor)       │
│        ↓                            │
│      Git Commit (refactor)          │
│                                     │
│ Documentation?                      │
│   → Update docs                     │
│        ↓                            │
│      Git Commit (docs)              │
│                                     │
└─────────────────────────────────────┘
    ↓
More work?
    ├─ Yes → Back to decision tree
    └─ No  → Night Watchman
                ↓
            Git Commit (docs)
                ↓
            Session End
```

---

## ⚡ **Quick Reference Card**

### **Mode Selection Guide**

| Situation | Mode | Duration |
|-----------|------|----------|
| **Session start** | Morning Ritual | 2-5 min |
| **New page** | Cartographer → Architect | 30-60 min |
| **Test fails** | Healer | 10-30 min |
| **Selector breaks** | Healer | 10-20 min |
| **Code cleanup** | Architect (refactor) | 20-40 min |
| **Session end** | Night Watchman | 5-10 min |
| **Weekly check** | Smoke Test | 5-10 min |
| **Inherited code** | Archaeology | 30-60 min |

### **Commit Type Guide**

| Action | Type | Scope Example |
|--------|------|---------------|
| **Map elements** | `map` | `map(products): ...` |
| **Create feature** | `feat` | `feat(login): ...` |
| **Fix bug** | `fix` | `fix(cart): ...` |
| **Heal test** | `heal` | `heal(checkout): ...` |
| **Refactor** | `refactor` | `refactor(pages): ...` |
| **Update docs** | `docs` | `docs(readme): ...` |
| **Dependencies** | `chore` | `chore(deps): ...` |

---

## 🎯 **Success Metrics**

Track these to ensure workflow is effective:

### Daily Metrics
- **Phantom Selectors:** Target 0 (Cartographer verification working)
- **Test Pass Rate:** Target >95% (Quality of implementation)
- **Commit Frequency:** Target 3-5/session (Proper segmentation)
- **Active Sprint Size:** Target <50 lines (Token management)

### Weekly Metrics
- **Pages Automated:** Track growth
- **Selector Stability:** Re-run old tests
- **Failure Patterns:** Count unique patterns
- **Decision Velocity:** ADs created per week

### Monthly Metrics
- **Test Suite Size:** Total test count
- **Coverage:** Features automated
- **Healing Frequency:** How often tests break
- **Documentation Quality:** Daily logs completeness

---

## 💡 **Best Practices**

### **Do's ✅**
- ✅ Always run Morning Ritual at session start
- ✅ Always use Cartographer before Architect
- ✅ Always commit after each mode completes
- ✅ Always show diff before committing
- ✅ Always run Night Watchman at session end
- ✅ Always document decisions (AD log)
- ✅ Always document failures (failure patterns)

### **Don'ts ❌**
- ❌ Never write code without verifying selectors first
- ❌ Never commit without running tests
- ❌ Never skip mode phases
- ❌ Never commit directly to main (use feature branches)
- ❌ Never commit secrets or hardcoded paths
- ❌ Never let active_sprint.md exceed 100 lines
- ❌ Never skip documentation updates

---

## 🚀 **Universal Workflow Template**

**Copy this into your AI chat at the start of any session:**

```
Start new work session following the Daily Workflow protocol.

**Step 1:** Activate Morning Ritual
- Check environment health
- Review active sprint
- Run smoke test (optional)
- Recommend next mode

**Step 2:** Execute recommended mode
- Follow mode-specific checklist
- Ensure all exit criteria met
- Prepare for Git commit

**Step 3:** Git Commit Flow
- Run pre-commit checklist
- Show diff for review
- Execute commit after approval
- Update active sprint

**Step 4:** Continue or close
- If more work → Return to Step 2
- If session ending → Activate Night Watchman

**Step 5:** Night Watchman (session end)
- Create daily log
- Clean active sprint
- Commit documentation
- Push to remote

Ready to begin! 🚀
```

---

## 📚 **Additional Resources**

**Related Files:**
- `.ai/1_CONTEXT/mission.md` - Core principles
- `.ai/1_CONTEXT/git_standards.md` - Commit message format
- `.ai/1_CONTEXT/decision_log.md` - Architectural decisions
- `.ai/3_MEMORY/selector_vault.md` - Verified selectors
- `.ai/3_MEMORY/failure_patterns.md` - Known issues

**Git Commands:**
```bash
# Start feature branch
git checkout -b feat/feature-name

# View recent workflow
git log --grep="^(map|feat|heal)" --oneline

# Find commits by mode
git log --grep="^map" --oneline  # All Cartographer work
git log --grep="^heal" --oneline # All Healer work

# View daily log history
ls -lt .ai/2_PLANNING/daily_logs/
```

---

**Version:** 3.0 - Universal Workflow with Git Integration
**Status:** Production Ready
**Use:** Any QA automation project

---

*This workflow ensures consistent, documented, traceable automation development with proper Git hygiene built in.*
