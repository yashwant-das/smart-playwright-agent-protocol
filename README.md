# Smart Playwright Protocol v5.0 (Task-Force Edition)

**Codename:** Task Force
**Architecture:** Zero-Trust, File-Based Automation.
**Objective:** Deterministic UI automation managed by a file-system state machine.

---

## ⚡ Core Logic

This framework removes the concept of "implicit state." The status of a Task File (`tasks/*.md`) is the **Single Source of Truth** for the automation lifecycle.

1. **State is File-Based:** We do not track progress in git commit messages or external Jira boards. If `tasks/T-001.md` says `status: TODO`, the work is not done.
2. **Zero-Trust Execution:** The AI Agent is not trusted to "remember" rules.

* **Static Analysis:** `eslint` blocks commits with missing JSDoc or raw locators.
* **Runtime Enforcers:** The `run_task.ts` script forces a strict `DEV` -> `TEST` -> `DONE` transition.

3. **Atomic Work Units:** Every feature is a self-contained Markdown file containing its own Context, Objective, and Status.

---

## 📂 Project Structure

```text
.
├── AGENTS.md                  # The Protocol Definition (AI Read-Only)
├── tasks/                     # The State Database (Work Items)
│   ├── template.md            # Blueprint
│   └── T-001_Login.md         # Active Task
├── scripts/                   # The Automation Engine
│   └── run_task.ts            # State Machine Logic
├── pages/                     # Page Objects (Strict JSDoc)
├── tests/                     # Playwright Specs
├── .husky/                    # Git Hooks
├── .eslintrc.js               # Static Analysis Rules
└── package.json

```

---

## 🚦 Workflow

### 1. Create a Task

Create a file in `tasks/` using `template.md`.

**Example `tasks/T-101.md`:**

```markdown
---
id: "T-101"
title: "Map Checkout"
status: "TODO"
owner: "AI"
priority: "High"
---

**T-101: Map Checkout**

## 🎯 Objective
Automate the checkout flow including shipping address entry.

## 📂 Context
- **Page Object:** `pages/CheckoutPage.ts`
- **Test File:** `tests/checkout.spec.ts`

## ✅ Definition of Done
- [ ] Page Object updated with JSDoc
- [ ] Test passed
- [ ] Lint passed

```

### 2. Execute (The Loop)

Run the state machine. The script detects the `status` and advances the lifecycle.

```bash
# Option A: Auto-pilot (Runs next TODO item)
npm run task next

# Option B: Sniper Mode (Runs specific ID)
npm run task T-101

```

### 3. Lifecycle Transitions

The `run_task.ts` script enforces these transitions automatically:

| Current Status | Action Taken | Next Status (Success) | Next Status (Fail) |
| --- | --- | --- | --- |
| `TODO` | **DEV:** AI reads requirements, maps Selectors, writes Spec. | `IN_PROGRESS` | N/A |
| `IN_PROGRESS` | **VERIFY:** Runs `lint` and `test`. | `DONE` | `BLOCKED` |
| `BLOCKED` | **DEBUG:** Agent attempts 1 fix and re-runs test. | `DONE` | `BLOCKED` |
| `DONE` | **None:** Task is archived. | N/A | N/A |

---

## 🛡️ The Regulations (Immutable)

Violating these rules causes immediate build failure.

1. **Zero Raw Locators:** `page.locator()` is **FORBIDDEN** in `tests/`. It is only allowed in `pages/`.
2. **JSDoc Authority:** All Page Object properties must define `@selector`, `@strategy`, and `@verified` date.
3. **Linter is Law:** You cannot commit code that fails `npm run lint`.

---

## 🛠️ Setup & Boilerplate

### 1. `package.json`

```json
{
  "name": "smart-playwright-taskforce",
  "version": "5.0.0",
  "scripts": {
    "test": "playwright test",
    "lint": "eslint 'pages/**/*.ts' 'tests/**/*.ts'",
    "task": "ts-node scripts/run_task.ts",
    "prepare": "husky install"
  },
  "devDependencies": {
    "@playwright/test": "^1.41.0",
    "@types/node": "^20.11.0",
    "@typescript-eslint/eslint-plugin": "^6.19.0",
    "@typescript-eslint/parser": "^6.19.0",
    "eslint": "^8.56.0",
    "eslint-plugin-jsdoc": "^48.0.0",
    "husky": "^9.0.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3",
    "front-matter": "^4.0.2"
  }
}

```

### 2. `AGENTS.md` (The Protocol)

```markdown
---
name: "Task-Force SDET"
version: "5.0.0"
---

# 🛡️ Mission
You are the **Task-Force SDET**. You execute tasks from the `tasks/` directory.

# 📜 Regulations
1. **No Raw Locators:** Never use `page.locator()` in `.spec.ts` files.
2. **JSDoc Authority:** Every Page Object property MUST have `@selector`, `@strategy`, and `@verified` (YYYY-MM-DD).
3. **Linter is Law:** If `npm run lint` fails, stop and fix it.

# 🔄 Lifecycle
- **TODO** -> **IN_PROGRESS**: Read task, map pages, write tests.
- **IN_PROGRESS** -> **DONE**: Run `npm run lint` && `npm test`.
- **FAIL** -> **BLOCKED**: Fix bugs and retry.

```

### 3. `scripts/run_task.ts` (The Engine)

```typescript
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import fm from 'front-matter';

const TASKS_DIR = path.join(__dirname, '../tasks');
let taskId = process.argv[2];

// Logic: Handle 'next' command
if (taskId === 'next') {
    const allFiles = fs.readdirSync(TASKS_DIR).filter(f => f.endsWith('.md') && f !== 'template.md');
    for (const f of allFiles) {
        const c = fs.readFileSync(path.join(TASKS_DIR, f), 'utf8');
        // @ts-ignore
        if (fm(c).attributes.status === 'TODO') {
            taskId = f.split('_')[0];
            break;
        }
    }
    if (taskId === 'next') { console.log("🎉 No TODO tasks found!"); process.exit(0); }
}

const files = fs.readdirSync(TASKS_DIR);
const taskFile = files.find(f => f.startsWith(taskId));
if (!taskFile) { console.error(`❌ Task ${taskId} not found.`); process.exit(1); }

const filePath = path.join(TASKS_DIR, taskFile);
const content = fs.readFileSync(filePath, 'utf8');
const parsed = fm(content);
// @ts-ignore
const attributes: any = parsed.attributes;

console.log(`\n🚀 ACTIVATING TASK: ${attributes.title}`);

try {
    if (attributes.status === 'TODO') {
        console.log("🔹 Moving to IN_PROGRESS...");
        updateStatus(filePath, content, 'IN_PROGRESS');
    }
    else if (attributes.status === 'IN_PROGRESS') {
        console.log("🔹 Running Verification...");
        execSync('npm run lint', { stdio: 'inherit' });
        execSync('npm test', { stdio: 'inherit' });
        console.log("✅ Verified. Moving to DONE.");
        updateStatus(filePath, content, 'DONE');
    }
} catch (e) {
    console.error("❌ Verification Failed. Moving to BLOCKED.");
    updateStatus(filePath, content, 'BLOCKED');
}

function updateStatus(path: string, fullContent: string, newStatus: string) {
    const newContent = fullContent.replace(/status: ".*"/, `status: "${newStatus}"`);
    fs.writeFileSync(path, newContent);
}

```

### 4. `.eslintrc.js` (The Enforcer)

```javascript
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsdoc'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    "jsdoc/require-jsdoc": ["error", { "require": { "ClassProperty": true }, "contexts": ["PropertyDefinition"] }],
    "jsdoc/check-tag-names": ["error", { "definedTags": ["selector", "strategy", "verified", "reason"] }],
    "no-restricted-syntax": [
      "error",
      {
        "selector": "CallExpression[callee.property.name='locator']",
        "message": "❌ VIOLATION: Raw page.locator() is FORBIDDEN. Use Page Objects."
      }
    ]
  },
  overrides: [
    { "files": ["pages/**/*.ts"], "rules": { "no-restricted-syntax": "off" } }
  ]
};

```
