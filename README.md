# Smart Playwright Protocol v1.0

[![Playwright](https://img.shields.io/badge/Playwright-1.41.0-2ead34?logo=playwright)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![ESLint](https://img.shields.io/badge/ESLint-8.56.0-4b32c3?logo=eslint)](https://eslint.org)
[![Node](https://img.shields.io/badge/Node-18+-339933?logo=nodedotjs)](https://nodejs.org)

**Codename:** Task Force  
**Architecture:** Zero-Trust, File-Based Automation  
**Objective:** Deterministic UI automation managed by a file-system state machine.

Agentic SDET Framework: A file-system state machine for Playwright automation with MCP-first exploration, strict JSDoc enforcement, and collaborative human-AI workflows.

---

## Quick Start

```bash
# 1. Install dependencies
npm install && npx playwright install

# 2. Run next available task
npm run task next

# 3. Let AI implement (copy the prompt from terminal)
# 4. Verify implementation
npm run task T-001
```

> **First time?** Read [The Handshake](#the-handshake-how-you-work) section to understand the workflow.

---

## Core Philosophy

This framework eliminates "implicit state." The status of a Task File (`tasks/*.md`) is the **Single Source of Truth** for the automation lifecycle.

1. **State is File-Based:** Progress is tracked in markdown files, not git messages or external tools.
2. **Zero-Trust Execution:**
    * **Static Analysis:** `eslint` strictly forbids raw locators in tests and enforces JSDoc in Page Objects.
    * **Runtime Enforcement:** The [run_task.ts](scripts/run_task.ts) engine forces a strict `TODO` → `IN_PROGRESS` → `DONE` transition (with `BLOCKED` on failures).
3. **Atomic Work Units:** Every feature is a self-contained Markdown file with its own Context, Objective, and Status.

---

## Getting Started

### Prerequisites

* **IDE Extension:** Install [mcp-playwright](https://github.com/executeautomation/mcp-playwright) in your Agentic IDE (Cursor/Windsurf/Cline).

### Installation

```bash
npm install
npx playwright install
```

### Git Hooks & Quality Gates

This project uses **Husky** to enforce code quality and commit standards at commit time:

**Pre-commit Hook:**

* Automatically runs `npm run lint` (ESLint + Markdownlint)
* Prevents commits with linting errors
* Ensures all code meets quality standards before entering version control

**Commit Message Enforcement:**

* Follows Conventional Commits with custom types tailored for test automation
* Format: `<type>(<scope>): <subject>` or `<type>: <subject>`
* **Allowed types:** `feat`, `fix`, `heal`, `map`, `arch`, `refactor`, `test`, `docs`, `chore`
* **Allowed scopes (optional):** `login`, `products`, `cart`, `checkout`, `pages`, `tests`, `config`, `ci`
* Examples:
  * `feat(auth): add login page`
  * `fix: resolve selector issue`
  * `heal(cart): fix flaky test`
  * `map(checkout): add new page object`

**Setup Git Commit Template (Optional):**

```bash
git config commit.template .gitmessage
```

This will provide helpful hints when writing commit messages.

---

### Running Tasks

The primary interface is the `task` script, which manages the lifecycle state machine.

**Auto-Pilot Mode:**
Runs the next available task based on priority order:

1. **IN_PROGRESS** - Resumes any task currently being worked on
2. **BLOCKED** - Fixes failed tasks before starting new work
3. **TODO** - Starts the next pending task

```bash
npm run task next
```

> **Note:** This prioritizes fixing broken tasks (BLOCKED) before starting new features (TODO).

**Sniper Mode:**
Runs a specific task by ID.

```bash
npm run task T-001
```

---

## The Handshake (How You Work)

This architecture requires a specific 2-step loop between YOU (The Human) and the AI.

### 1. Human Triggers Activation

You run this in your terminal (VS Code, PowerShell, bash):

```bash
npm run task next
```

**System Action:**

* Finds the next `TODO` task (e.g., `T-101`).
* **Updates file:** Changes `status: "TODO"` to `status: "IN_PROGRESS"`.
* **Logs Prompt:** `[T-101] Status is TODO. Moving to IN_PROGRESS...`
* **Outputs AI Instruction:** "Task T-101 is now IN_PROGRESS. Read AGENTS.md for protocol rules, then implement the plan."

### 2. AI Implements

You turn to your AI Assistant (Cursor/Windsurf/Cline) and say:

> "Task T-101 is now IN_PROGRESS. Read AGENTS.md for protocol rules, then implement the plan."

**Agent Action:**

* Reads `T-101.md`.
* Creates Page Objects in `pages/`.
* Writes Tests in `tests/`.

### 3. Human Triggers Verification

Once the AI finishes writing code, you run:

```bash
npm run task T-101
```

**System Action:**

* Runs `npm run lint` (Code + Markdown Analysis).
* Runs `playwright test` (Dynamic Verification).
* **Pipes Output:** All output is mirrored to `logs/last_run.log`.
* **If Pass:** Updates file to `status: "DONE"`.
* **If Fail:**
  * Updates file to `status: "BLOCKED"`.
  * **Outputs AI Instruction:** "Task T-101 is BLOCKED. Review the logs at logs/last_run.log and fix the issues."

---

## Project Structure

```text
.
├── .husky/                    # Git Hooks (Pre-commit, Commit-msg)
│   ├── commit-msg            # Conventional commit enforcement
│   └── pre-commit            # Lint before commit
├── logs/                      # Runtime Logs
│   └── last_run.log          # Latest task execution output
├── pages/                     # Page Objects (Strict JSDoc Enforced)
│   ├── BasePage.ts           # Base class with common methods
│   └── *.ts                  # Feature-specific page objects
├── scripts/                   # Automation Engine
│   └── run_task.ts           # Task lifecycle state machine
├── tasks/                     # State Database (Work Items)
│   ├── template.md           # Task template
│   └── T-*.md                # Individual task files
├── tests/                     # Playwright Specs (No Raw Locators)
│   ├── fixtures/             # Test fixtures & data files
│   └── *.spec.ts             # Test specifications
├── .eslintrc.js              # ESLint Configuration
├── .gitmessage               # Git Commit Message Template
├── .gitignore                # Git Ignore Rules
├── .markdownlint.json        # Markdownlint Configuration
├── AGENTS.md                 # Protocol Definition & Rules (Read-Only)
├── package.json              # Dependencies & Scripts
├── playwright.config.ts      # Playwright Configuration
├── README.md                 # Main Documentation
└── tsconfig.json             # TypeScript Configuration
```

**Task File Naming Convention:**

All task files follow the format: `T-###_description-in-kebab-case.md`

* **ID**: `T-###` (3-digit zero-padded number)
* **Separator**: Single underscore `_`
* **Description**: kebab-case (lowercase with hyphens)
* **Examples**: `T-001_login-navigation.md`, `T-007_checkout-step1.md`

---

## Workflow Lifecycle

The `run_task.ts` script enforces these transitions automatically:

| Current Status | Action Taken | Success Outcome | Failure Outcome |
| :--- | :--- | :--- | :--- |
| **TODO** | **DEV Phase:** AI reads requirements, maps selectors, writes code. | Moves to `IN_PROGRESS` | N/A |
| **IN_PROGRESS**| **VERIFY Phase:** Runs `npm run lint` and `npm test`. | Moves to `DONE` | Moves to `BLOCKED` |
| **BLOCKED** | **DEBUG Phase:** Agent reviews `logs/last_run.log`, fixes bugs and retries. | Moves to `DONE` | Remain `BLOCKED` |
| **DONE** | **ARCHIVED:** Task is complete. | N/A | N/A |

---

## The Regulations

> [!IMPORTANT]
> Violating these rules causes immediate build failure.

1. **Zero Raw Locators:** `page.locator()` is **FORBIDDEN** in `tests/`. Use Page Object properties.
2. **JSDoc Authority:** All Page Object properties must define `@selector`, `@strategy`, and `@verified`.
3. **Linter is Law:** Code must pass `npm run lint` before a task can be marked `DONE`.
4. **MCP-First:** You SHOULD use the [mcp-playwright](https://github.com/executeautomation/mcp-playwright) tool to explore pages and verify selectors before writing code.

---

## Configuration

* **Protocol Definition:** [AGENTS.md](AGENTS.md)
* **ESLint Configuration:** [.eslintrc.js](.eslintrc.js)
* **Markdownlint Configuration:** [.markdownlint.json](.markdownlint.json)
* **Git Hooks:** [.husky/](.husky/) (Pre-commit & Commit-msg)
* **Dependencies:** [package.json](package.json)
