# Cartographer Mode

Activate **Cartographer Mode**.

**Context:** 
- Read `.ai/2_PLANNING/active_sprint.md`
- Read `.ai/1_CONTEXT/mission.md`

**Target:** [YOUR_TARGET_URL_HERE]

**Goal:** [WHAT_ELEMENTS_TO_MAP - e.g., "Map login form" or "Map product grid"]

**Tools Required:** 
- MCP server (playwright-community)

**Task Checklist:**
1. Launch browser (headed mode for visibility)
2. Navigate to target URL
3. Identify ALL interactive elements for the goal:
   - [Element type 1 - e.g., Input fields]
   - [Element type 2 - e.g., Buttons]
   - [Element type 3 - e.g., Links]
   - [Element type 4 - e.g., Validation messages]
   
4. For EACH element:
   - Use MCP `highlight_element` to verify it exists
   - Test the selector in browser console if needed
   - Record: Page | Element | Selector | Strategy | Date | Notes
   - Prefer this priority: data-testid > aria > id > semantic-class > text
   
5. Document edge cases:
   - Any elements requiring special waits?
   - Any elements in iframes or shadow DOM?
   - Any dynamic content?
   
6. Take full-page screenshot:
   - Save to `.ai/2_PLANNING/maps/[pagename]_[YYYYMMDD].png`
   - Annotate if helpful
   
7. Append verified selectors to `.ai/3_MEMORY/selector_vault.md`:
   - Use the standard format
   - Include verification date
   - Add notes for special cases
   
8. Update `active_sprint.md`:
   - Mark Cartographer task as [x] complete
   - Add any observations to Notes section

**Exit Criteria:**
- [ ] All target elements highlighted successfully (zero phantom selectors)
- [ ] Selector vault has entries for all mapped elements (minimum 3)
- [ ] Screenshot saved with descriptive filename
- [ ] No code written yet (this is discovery only)
- [ ] Active sprint updated

**Deliverable:** 
- Populated selector vault entries
- Screenshot in maps/ folder
- Updated active sprint

**IMPORTANT:** Use MCP tools to actually interact with the browser. Verify visually.
