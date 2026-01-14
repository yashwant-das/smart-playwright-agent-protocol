# Test Suite Migration Plan

**Generated:** 2026-01-10  
**Mode:** Archaeology Mode - Legacy Test Audit

## Executive Summary

This migration plan addresses violations of the Page Object Model (POM) principle and selector strategy standards identified in the test suite audit.

## Current State Analysis

### Test Files Scanned

- `tests/saucedemo-login.spec.ts` (1 file)

### Total Tests

- **3 tests** across 1 test file

### Page Object Model Usage

- **Status:** ⚠️ **Partial Compliance**
- Page Object exists: `pages/SauceDemoLoginPage.ts`
- **Violation:** Raw locators found in spec file (5 instances)

### Selector Strategy Breakdown

- **CSS (ID):** 3 instances (`#user-name`, `#password`, `#login-button`)
- **CSS (class):** 2 instances (`.inventory_container`, `.error-message-container`)
- **testid:** 0 instances
- **aria-label/role:** 0 instances
- **xpath:** 0 instances ✅ (No banned selectors)

### Critical Selectors Verification

- ✅ `#user-name` - **Working** (exists, visible)
- ✅ `#password` - **Working** (exists, visible)
- ✅ `#login-button` - **Working** (exists, visible)

**Result:** Critical selectors: **3/3 working**

## Issues Identified

### Priority 1: POM Violations

**File:** `tests/saucedemo-login.spec.ts`

**Raw locators in spec file (should be in Page Object):**

1. Line 23: `page.locator('#user-name')` - Already in Page Object, should use Page Object method
2. Line 24: `page.locator('#password')` - Already in Page Object, should use Page Object method
3. Line 25: `page.locator('#login-button')` - Already in Page Object, should use Page Object method
4. Line 57: `page.locator('.inventory_container')` - **Missing from Page Object** - needs new Page Object
5. Line 82: `page.locator('.error-message-container')` - Already in Page Object, should use Page Object method

### Priority 2: Selector Strategy

- All selectors use CSS (ID/class) instead of preferred `data-testid` or `aria-label`
- **Note:** SauceDemo is a demo site, so we cannot add testids. CSS selectors are acceptable for this case, but should be documented.

## Migration Plan

### Phase 1: Refactor POM Violations (High Priority)

**Effort:** 2-3 hours

#### Task 1.1: Move inventory container to Page Object

- **File:** `pages/SauceDemoLoginPage.ts` or create `pages/SauceDemoInventoryPage.ts`
- **Action:** Add `inventoryContainer` locator to appropriate Page Object
- **Impact:** Fix line 57 in `saucedemo-login.spec.ts`

#### Task 1.2: Remove raw locators from spec file

- **File:** `tests/saucedemo-login.spec.ts`
- **Actions:**
  - Replace `page.locator('#user-name')` with Page Object getter or method
  - Replace `page.locator('#password')` with Page Object getter or method
  - Replace `page.locator('#login-button')` with Page Object getter or method
  - Replace `page.locator('.error-message-container')` with `loginPage.getErrorMessage()` (already exists)
  - Replace `page.locator('.inventory_container')` with Page Object method

**Estimated Effort:** 1-2 hours

### Phase 2: Create Inventory Page Object (Medium Priority)

**Effort:** 1-2 hours

Since the test navigates to the inventory page, we should create a proper Page Object for it:

- **File:** `pages/SauceDemoInventoryPage.ts`
- **Methods needed:**
  - `isLoaded()` - Verify inventory container is visible
  - Potentially add methods for product interactions (future expansion)

### Phase 3: Documentation (Low Priority)

**Effort:** 0.5 hours

- Document that SauceDemo uses CSS selectors due to demo site limitations
- Update selector_vault.md with rationale for CSS selector usage

## Files Requiring Refactoring

### Priority Order

1. **`tests/saucedemo-login.spec.ts`** - Remove 5 raw locators, use Page Object methods
2. **`pages/SauceDemoLoginPage.ts`** - Add getter methods for elements if needed
3. **`pages/SauceDemoInventoryPage.ts`** - **NEW FILE** - Create for inventory page interactions

## Effort Estimation

| Phase | Task | Hours |
|-------|------|-------|
| Phase 1 | Refactor POM violations | 2-3 |
| Phase 2 | Create Inventory Page Object | 1-2 |
| Phase 3 | Documentation | 0.5 |
| **Total** | | **3.5-5.5 hours** |

## Success Criteria

- [ ] Zero raw locators in spec files
- [ ] All page interactions go through Page Objects
- [ ] All tests pass after refactoring
- [ ] ESLint passes
- [ ] Code review shows 100% POM compliance

## Risk Assessment

**Low Risk:**

- Selectors are verified and working
- Page Objects already exist for most elements
- Changes are isolated to test file and Page Objects

**Mitigation:**

- Run tests after each refactoring step
- Use MCP browser tools to verify selectors remain valid
- Keep changes incremental and testable

## Next Steps

1. Create feature branch: `refactor/pom-compliance`
2. Start with Phase 1, Task 1.2 (remove raw locators)
3. Run tests after each change
4. Create Inventory Page Object (Phase 2)
5. Update documentation (Phase 3)
6. Create PR with audit report attached
