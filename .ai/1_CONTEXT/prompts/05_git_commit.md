# Git Commit Flow

Activate **Git Commit Flow**.

**Context:**

- Read `.ai/1_CONTEXT/git_standards.md`
- Previous mode: [Cartographer/Architect/Healer/Other]

**Pre-Commit Checklist:**

Run these checks in order:

1. Tests status: `npm test`
   - If failed: Activate Healer Mode first
   - If passed: Continue

2. Lint status: `npm run lint`
   - If errors: Run `npm run lint:fix` to auto-fix
   - Manually fix remaining errors
   - If passed: Continue

3. Type check: `npm run type-check`
   - If errors: Fix before committing
   - If passed: Continue

4. Security check:
   - [ ] No API keys in code
   - [ ] No passwords in code
   - [ ] No hardcoded file paths
   - [ ] No .env files staged

5. Documentation check:
   - [ ] Active sprint updated
   - [ ] Selector vault updated (if selectors changed)
   - [ ] Failure patterns updated (if bug fixed)

**Commit Preparation:**

1. Stage files: `git add .`
2. Show diff: `git diff --staged`
3. Determine commit type (map/feat/arch/heal/fix/docs/chore/refactor)
4. Prepare commit message following git_standards.md
5. Show proposed commit for approval
6. Execute commit after approval
7. Update active_sprint.md with commit reference
8. Ask about push to remote

**Exit Criteria:**

- [ ] All pre-commit checks passed
- [ ] User reviewed and approved diff
- [ ] Commit message follows standard
- [ ] Commit executed successfully
- [ ] Active sprint updated with commit reference
- [ ] User decided on push

**Deliverable:**

- Clean commit in git history
- Updated active sprint with commit reference
