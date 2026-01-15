# Git Commit Flow

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
   Committed successfully!
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
