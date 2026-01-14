# 🧠 Smart Playwright Agent Protocol
> **The Operating System for SDET Agents: MCP-Native, Memory-First, and Strictly Governed.**

[![Playwright](https://img.shields.io/badge/Playwright-v1.57-green)](https://playwright.dev)
[![MCP](https://img.shields.io/badge/Model%20Context%20Protocol-Enabled-blue)](https://modelcontextprotocol.io)
[![Agentic Workflow](https://img.shields.io/badge/Agentic-Workflow-purple)](.ai/1_CONTEXT/workflow.md)

---

## ⚡ Core Philosophy: Protocol over Prompting
Most AI coding assistants are "fire and forget"—they generate code, but they don't know *why* they wrote it, nor do they remember it later.

**Smart Playwright Agent** is not just a bot; it is a **Protocol** that enforces:
1.  **Grounded Verification (via MCP):** The Agent must "touch" (highlight) an element via the Model Context Protocol before it is allowed to write a selector.
2.  **Institutional Memory (`.ai/`):** A file-system based brain that stores architectural decisions, failure patterns, and verified selectors.
3.  **Strict Governance:** The Agent acts as a "Senior Architect," adhering to strict Git standards, Page Object Models, and a 6-phase daily workflow.

---

## 🏗️ The Agent "Brain" Structure (`.ai/`)
Unlike other frameworks where context is lost when the chat window closes, this framework maintains a persistent memory on disk.


```
.ai/
├── 1_CONTEXT/           # 🛑 IMMUTABLE TRUTHS
│   ├── [mission.md](.ai/1_CONTEXT/mission.md)       # The Agent's Prime Directives
│   ├── [decision_log.md](.ai/1_CONTEXT/decision_log.md)  # Architectural Decision Records (ADR)
│   └── [tech_stack.md](.ai/1_CONTEXT/tech_stack.md)    # Approved tools & versions
│
├── 2_PLANNING/          # 🚧 WORKING MEMORY
│   ├── [active_sprint.md](.ai/2_PLANNING/active_sprint.md) # Current context & todo list
│   ├── maps/            # Visual UI maps (Screenshots)
│   └── daily_logs/      # Session rollover history
│
└── 3_MEMORY/            # 🧠 LONG-TERM MEMORY
├── [selector_vault.md](.ai/3_MEMORY/selector_vault.md) # Database of verified, working selectors
├── [failure_patterns.md](.ai/3_MEMORY/failure_patterns.md) # Library of known bugs & fixes
└── [lessons_learned.md](.ai/3_MEMORY/lessons_learned.md) # Strategic insights
```

---

## 🔌 Powered by MCP (Model Context Protocol)
This framework leverages the **`@executeautomation/playwright-mcp-server`** to give the AI direct, tools-based access to the browser.

Instead of hallucinating selectors, the Agent executes tools:
- `mcp_highlight_element`: To visually confirm a selector works.
- `mcp_get_page_content`: To read the DOM structure intelligently.
- `mcp_screenshot`: To capture visual evidence for mapping.

---

## 🔄 The 6-Phase Daily Workflow
We treat AI interaction as a disciplined software development lifecycle, not a chat. (See [Full Workflow](.ai/1_CONTEXT/workflow.md))

### 🌅 Phase 0: Morning Ritual
**"Context Loading."** The Agent reads the `active_sprint.md` and checks environment health before accepting tasks.

### 🟢 Phase 1: Cartographer Mode (Discovery)
**"Map before you build."** The Agent explores the UI, highlights elements via MCP, and populates the `selector_vault.md`. No code is written yet—only verification.

### 🔵 Phase 2: Architect Mode (Implementation)
**"Strict Construction."** The Agent generates Page Objects and Tests, but it is **only** allowed to use selectors present in the Vault. This prevents "hallucinated" locators.

### 🔴 Phase 3: Healer Mode (Maintenance)
**"Root Cause Analysis."** If a test fails, the Agent consults `failure_patterns.md` to see if this is a known issue before attempting a hot-fix.

### 💾 Phase 4: Git Commit Flow
**"Hyjhie."** The Agent follows a strict Conventional Commits standard (`feat`, `map`, `heal`), ensuring the git history tells a story.

### 🌙 Phase 5: Night Watchman Mode
**"Rollover."** The Agent summarizes the session, updates the logs, and cleans the active sprint file to save context tokens for the next run.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- An MCP-compatible IDE (Cursor, Windsurf) or Agent Client.

### Installation
```bash
# 1. Clone the protocol
git clone https://github.com/your-repo/smart-playwright-agent-protocol.git

# 2. Install dependencies (Includes MCP Server)
npm install

# 3. Start the MCP Server (if running standalone)
npm run mcp:start
```

### Usage (The Protocol)

**Do not just ask the AI to "write a test."** Initialize the protocol:

1. **Start a Session:**
> "Activate **Morning Ritual Mode**. Perform environment health check."

2. **Map a Feature:**
> "Activate **Cartographer Mode**. Map the 'Checkout' page. Verify selectors for the 'Place Order' button using MCP highlight."

3. **Build the Test:**
> "Activate **Architect Mode**. Create a Page Object for Checkout using the selectors from the Vault."


---

## 🛡️ "Self-Healing" vs. "Self-Correction"

While other agents try to "guess" fixes, this protocol uses **Institutional Memory**:

1. **Check:** Is the selector in [`selector_vault.md`](.ai/3_MEMORY/selector_vault.md)?
2. **Verify:** Use MCP to see if the element is still visible.
3. **Reference:** Check [`decision_log.md`](.ai/1_CONTEXT/decision_log.md) for architectural rules.
4. **Fix:** Update code + Update Vault + Log Failure Pattern.

---

**Status:** 🟢 Production Ready Protocol
**Current Version:** 2.0.0
