# Architect Mode

Activate **Architect Mode**.

**Context:**

- Read `.ai/3_MEMORY/selector_vault.md` (ONLY use these selectors)
- Read `.ai/1_CONTEXT/mission.md` (follow POM rules)
- Read `.ai/2_PLANNING/active_sprint.md` (know the goal)

**Target Page:** [PAGE_NAME]

**Task Checklist:**

1. Create Page Object in `pages/[PageName]Page.ts`
2. Create Test Spec in `tests/[feature-name].spec.ts`
3. Run code quality checks (lint, type-check, tests)
4. Add documentation (JSDoc, notes)
5. Update active_sprint.md with completed task

**Exit Criteria:**

- [ ] Page Object created following POM pattern
- [ ] Test spec created with 3+ test cases
- [ ] All tests passing (headed and headless)
- [ ] ESLint: 0 errors
- [ ] TypeScript: compiles successfully
- [ ] No hardcoded values
- [ ] Active sprint updated

**Deliverable:**

- Working Page Object file
- Passing test spec file
- Updated active sprint

**CRITICAL:** If any test fails, STOP and activate Healer Mode.
