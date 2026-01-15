# Architect Mode

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
