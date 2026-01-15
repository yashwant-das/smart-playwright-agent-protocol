# Cartographer Mode

Activate **Cartographer Mode**.

**Context:**

- Read `.ai/2_PLANNING/active_sprint.md`
- Read `.ai/1_CONTEXT/mission.md`

**Target:** [YOUR_TARGET_URL_HERE]

**Goal:** [WHAT_ELEMENTS_TO_MAP - e.g., "Map login form" or "Map product grid"]

**Tools Required:**

- MCP server (playwright-mcp)

**Task Checklist:**

1. Navigate to target URL using MCP
2. Identify ALL interactive elements for the goal
3. For EACH element, verify selector with MCP hover/highlight
4. Document any edge cases (waits, iframes, dynamic content)
5. Take full-page screenshot
6. Add verified selectors to selector_vault.md
7. Update active_sprint.md with completed task

**Exit Criteria:**

- [ ] All target elements verified via MCP (zero phantom selectors)
- [ ] Selector vault updated with all mapped elements
- [ ] Screenshot saved to maps/ folder
- [ ] Edge cases documented with notes
- [ ] No code written (discovery only)
- [ ] Active sprint updated

**Deliverable:**

- Populated selector vault entries
- Screenshot in maps/ folder
- Updated active sprint
