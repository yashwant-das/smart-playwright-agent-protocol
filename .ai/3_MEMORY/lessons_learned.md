# Lessons Learned

*High-level insights from the trenches. Different from failure patterns - these are strategic learnings.*

---

## Lesson: Always Verify Selectors Visually
**Date:** 2026-01-10
**Context:** Wrote 10 tests with CSS selectors, 7 failed on first run
**Insight:** LLMs can hallucinate selectors that look correct but don't exist
**Action:** Made MCP highlight mandatory in Cartographer mode
**Impact:** Zero phantom selector bugs since implementation

---

## Lesson: Page Objects Catch Refactors Early
**Date:** 2026-01-10
**Context:** Login button selector changed, broke 5 tests
**Insight:** With POM, only needed to change 1 file instead of 5
**Action:** Enforced strict POM policy
**Impact:** Refactor time reduced by 80%

---

*Your lessons go below this line*

