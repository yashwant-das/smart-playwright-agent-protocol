# Smart Playwright Protocol v1.0 (Task-Force Edition)

**Codename:** Task Force  
**Architecture:** Zero-Trust, File-Based Automation  
**Objective:** Deterministic UI automation managed by a file-system state machine.

---

## Core Philosophy

This framework eliminates "implicit state." The status of a Task File (`tasks/*.md`) is the **Single Source of Truth** for the automation lifecycle.

1. **State is File-Based:** Progress is tracked in markdown files, not git messages or external tools.
2. **Zero-Trust Execution:**
    * **Static Analysis:** `eslint` strictly forbids raw locators in tests and enforces JSDoc in Page Objects.
    * **Runtime Enforcement:** The [run_task.ts](scripts/run_task.ts) engine forces a strict `DEV` -> `TEST` -> `DONE` transition.
3. **Atomic Work Units:** Every feature is a self-contained Markdown file with its own Context, Objective, and Status.

---

## Getting Started

### Installation

```bash
npm install
npx playwright install
```

### Running Tasks

The primary interface is the `task` script, which manages the lifecycle state machine.

**Auto-Pilot Mode:**
Runs the next available `TODO` task.

```bash
npm run task next
```

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
* **Logs:** "NEXT STEP: Copy/Paste this to your AI Assistant..."

### 2. AI Implements

You turn to your AI Assistant (Cursor/Windsurf/Cline) and say:

> "Task T-101 is now IN_PROGRESS. Read AGENTS.md for protocol rules, then implement the plan."

**Agent Action:**

* Reads `T-101.md`.
* Creates Page Objects in `pages/`.
* Writes Tests in `tests/`.

### 3. Human Triggers Verification

One the AI finishes writing code, you run:

```bash
npm run task T-101
```

**System Action:**

* Runs `npm run lint` (Code + Markdown Analysis).
* Runs `playwright test` (Dynamic Verification).
* **If Pass:** Updates file to `status: "DONE"`.
* **If Fail:** Updates file to `status: "BLOCKED"`.

---

## Project Structure

```text
.
├── AGENTS.md                  # Protocol Definition & Rules (Read-Only)
├── tasks/                     # State Database (Work Items)
├── scripts/                   # Automation Engine (run_task.ts)
├── pages/                     # Page Objects (Strict JSDoc Enforced)
├── tests/                     # Playwright Specs (No Raw Locators)
└── .eslintrc.js               # Static Analysis Configuration
```

---

## Workflow Lifecycle

The `run_task.ts` script enforces these transitions automatically:

| Current Status | Action Taken | Success Outcome | Failure Outcome |
| :--- | :--- | :--- | :--- |
| **TODO** | **DEV Phase:** AI reads requirements, maps selectors, writes code. | Moves to `IN_PROGRESS` | N/A |
| **IN_PROGRESS**| **VERIFY Phase:** Runs `npm run lint` and `npm test`. | Moves to `DONE` | Moves to `BLOCKED` |
| **BLOCKED** | **DEBUG Phase:** Developer/AI fixes bugs and retries. | Moves to `DONE` | Remain `BLOCKED` |
| **DONE** | **ARCHIVED:** Task is complete. | N/A | N/A |

---

## The Regulations

> [!IMPORTANT]
> Violating these rules causes immediate build failure.

1. **Zero Raw Locators:** `page.locator()` is **FORBIDDEN** in `tests/`. Use Page Object properties.
2. **JSDoc Authority:** All Page Object properties must define `@selector`, `@strategy`, and `@verified`.
3. **Linter is Law:** Code must pass `npm run lint` before a task can be marked `DONE`.

---

## Configuration

* **Protocol Definition:** [AGENTS.md](AGENTS.md)
* **Lint Configuration:** [.eslintrc.js](.eslintrc.js)
* **Dependencies:** [package.json](package.json)
