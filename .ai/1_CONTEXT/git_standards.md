# Commit Message Standard

**Purpose:** Ensure all commits (by humans or AI) follow a consistent, traceable format.

---

## Commit Message Format

Follow the **Conventional Commits** specification with Smart Playwright Agent Protocol extensions:

```
<type>(<scope>): <subject>

<body>

<footer>
```

---

## Commit Types

| Type | When to Use | Example |
|------|-------------|---------|
| **feat** | New feature/test/page object | `feat(login): Add login page automation` |
| **fix** | Bug fix or test fix | `fix(checkout): Fix race condition in payment` |
| **heal** | Healer Mode fixes | `heal(eslint): Resolve config conflict (AD-005)` |
| **refactor** | Code improvement (no behavior change) | `refactor(pages): Extract common wait logic` |
| **test** | Adding/updating tests only | `test(login): Add edge case for locked user` |
| **docs** | Documentation only | `docs(readme): Update setup instructions` |
| **chore** | Maintenance (deps, config, etc.) | `chore(deps): Update Playwright to v1.40` |
| **map** | Cartographer Mode mapping | `map(products): Add products page selectors` |
| **arch** | Architect Mode implementation | `arch(checkout): Build checkout page object` |

---

## Commit Scope

The scope should indicate what part of the system was affected:

| Scope | Meaning |
|-------|---------|
| **login** | Login page/feature |
| **products** | Products page/feature |
| **cart** | Shopping cart |
| **checkout** | Checkout flow |
| **pages** | Page Objects in general |
| **tests** | Test specs |
| **config** | Configuration files |
| **eslint** | ESLint configuration |
| **ci** | CI/CD pipeline |
| **protocol** | The .ai folder structure |

---

## Subject Line Rules

1. **Max 72 characters**
2. **Imperative mood** - "Add feature" not "Added feature"
3. **No period at the end**
4. **Capitalize first letter**
5. **Reference AD numbers** when relevant - `(AD-005)`

**Good Examples:**
```
feat(login): Add password visibility toggle
heal(products): Fix flaky add-to-cart button (AD-012)
map(checkout): Complete payment form selectors
```

**Bad Examples:**
```
fixed stuff
Updated the login page.
WIP
```

---

## Body Format (Multi-line commits)

For complex changes, structure the body with these sections:

### For Feature Commits (feat/arch/map):
```
<Type>(<scope>): <subject>

Cartographer Mode:
- List of elements mapped
- Selectors verified via MCP

Architect Mode:
- Page Objects created
- Tests implemented
- Code quality verified

Status: <emoji> <status>
Next: <what comes next>

See: <reference to daily log or decision>
```

### For Healing Commits (heal/fix):
```
<Type>(<scope>): <subject>

Issue:
- Description of the problem
- Error messages or symptoms

Investigation:
- What was checked
- Root cause identified

Resolution:
- Changes made
- Why this approach was chosen

Documentation:
- AD number (if decision logged)
- Failure pattern logged
- Tech stack updated (if applicable)

Status: <emoji> <status>

See: <reference to .ai/1_CONTEXT/decision_log.md or .ai/3_MEMORY/failure_patterns.md>
```

### For Refactoring Commits (refactor):
```
<Type>(<scope>): <subject>

Before:
- What the code looked like
- Why it was problematic

After:
- What changed
- Benefits gained

Impact:
- Test coverage: <maintained/improved>
- Performance: <impact>
- Maintainability: <impact>
```

---

## Footer Format

Always include relevant references:

### Reference Keywords:
- `Refs:` - Related to (issue, AD, daily log)
- `Closes:` - Fixes/completes (issue, task)
- `See:` - More context available in
- `AD:` - Architectural Decision
- `Breaking:` - Breaking change details

**Examples:**
```
Refs: AD-005, .ai/2_PLANNING/daily_logs/2026-01-10.md
Closes: #42
See: .ai/3_MEMORY/failure_patterns.md (ESLint Config Conflict)
```

---

## Complete Examples

### Example 1: Feature Commit (Cartographer + Architect)
```
feat(login): Complete SauceDemo login page automation

Cartographer Mode:
- Mapped login page at https://www.saucedemo.com
- Verified 4 selectors via MCP highlight
- Added to selector vault (username, password, button, error)

Architect Mode:
- Created SauceDemoLoginPage.ts with POM pattern
- Created 3 test cases:
  - Display verification
  - Successful login flow
  - Error message handling
- All tests passing (headed and headless)
- ESLint: 0 errors, TypeScript: clean

Status: ✅ Sprint goal achieved
Next: Products page mapping

See: .ai/2_PLANNING/daily_logs/2026-01-10.md
```

### Example 2: Healing Commit
```
heal(eslint): Resolve config conflict and migrate to .eslintrc.js (AD-005)

Issue:
- Multiple ESLint config files causing import statement error
- Both .eslintrc.json and eslint.config.js/mjs existed
- "Cannot use import statement outside a module" error

Investigation:
- ESLint 9 defaults to flat config (eslint.config.js)
- Package.json set to "type": "commonjs"
- Playwright ecosystem uses .eslintrc.js format
- Healer Mode investigation confirmed syntax mismatch

Resolution:
- Removed conflicting files (.eslintrc.json, eslint.config.js/mjs)
- Created .eslintrc.js with CommonJS syntax
- Installed eslint-plugin-playwright for Playwright-specific rules
- Updated package.json lint script with ESLINT_USE_FLAT_CONFIG=false
- Fixed missing await in example.spec.ts

Documentation:
- Decision logged: AD-005 in .ai/1_CONTEXT/decision_log.md
- Failure pattern logged: "ESLint Config Conflict After Setup"
- Tech stack updated with ESLint configuration approach

Status: ✅ ESLint runs successfully (0 errors, 1 warning)

Refs: AD-005
See: .ai/1_CONTEXT/decision_log.md, .ai/3_MEMORY/failure_patterns.md
```

---

## AI Commit Workflow

When the AI is ready to commit, it should follow this process:

### Step 1: Pre-Commit Checklist
```
Before committing, verify:
- [ ] All tests passing (npm test)
- [ ] Linter clean (npm run lint)
- [ ] Type check clean (npm run type-check)
- [ ] No secrets in diff (API keys, passwords, tokens)
- [ ] No hardcoded paths (e.g., /Users/username/...)
- [ ] Daily log updated (if end of session)
- [ ] Decision log updated (if AD created)
- [ ] Selector vault updated (if Cartographer ran)
```

### Step 2: Show Diff First
```
AI should execute:
git diff --staged

And show the user:
"I'm about to commit these changes:
[show diff]

Proposed commit message:
[show full commit message]

Type 'yes' to proceed or 'edit' to modify."
```

### Step 3: Commit Command
```
git add .
git commit -m "<full commit message>"
```

### Step 4: Confirmation
```
"✅ Committed successfully!
Commit hash: <hash>
Files changed: <count>

Ready to push? (yes/no)"
```

---

## Git Workflow Rules

Add these rules to `.ai/1_CONTEXT/mission.md`:

```markdown
## Git Workflow Rules
- **ALWAYS** create a feature branch before Architect Mode
- **NEVER** commit directly to main/master without permission
- **ALWAYS** show diff before committing
- **NEVER** force push
- **ALWAYS** ask before pushing to remote
- **NEVER** commit secrets or hardcoded paths
```

---

## Integration with Active Sprint

When committing, also update `.ai/2_PLANNING/active_sprint.md`:

```markdown
## Quick Reference

**Last Completed Task:** <task description>
**Last Commit:** <commit hash> - <commit subject>
**Next Session Focus:** <next task>
```

---

## Example: AI Commit Prompt Template

```
I'm ready to commit my changes.

**Pre-Commit Checklist:**
- [x] All tests passing
- [x] Linter clean
- [x] Type check clean
- [x] No secrets in code
- [x] Daily log updated
- [x] Decision log updated (if applicable)
- [x] Selector vault updated (if applicable)

**Proposed Commit:**

Type: <type>
Scope: <scope>
Subject: <subject>

[Full commit message following the standard]

**Files Changed:**
- <file1> (new/modified/deleted)
- <file2> (new/modified/deleted)

**Diff:**
```
[show git diff --staged]
```

Do you approve this commit? (yes/no/edit)
```