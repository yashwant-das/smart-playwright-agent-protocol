# Healer Mode

Activate **Healer Mode**.

**Issue Description:**
[PASTE ERROR LOG OR DESCRIBE FAILURE HERE]

**Context:**
- Read `.ai/1_CONTEXT/mission.md`
- Read `.ai/3_MEMORY/failure_patterns.md` (check if known issue)
- Read `.ai/3_MEMORY/selector_vault.md`
- Read `.ai/1_CONTEXT/decision_log.md` (check for related decisions)

**Diagnostic Phase:**

1. **Reproduce the Issue:**
   - Run failing test with `npm run test:headed`
   - Use MCP to screenshot the failure state
   - Note exact error message and stack trace

2. **Identify Root Cause:**
   - Is this a selector issue? (element not found)
   - Is this a timing issue? (race condition)
   - Is this a logic issue? (wrong assertion)
   - Is this an environment issue? (CI vs local)
   - Is this a known pattern? (check failure_patterns.md)

3. **Check History:**
   - Did this test pass before?
   - What changed? (git log, recent commits)
   - Is the selector in the vault? Has it been updated?

**Investigation Checklist:**
- [ ] Screenshot current page state via MCP
- [ ] Compare to expected state
- [ ] Try highlighting failing selector via MCP
- [ ] Check if selector still exists in DOM
- [ ] Check console for JS errors
- [ ] Check network tab for failed requests
- [ ] Review recent code changes

**Fix Phase:**

Based on root cause, apply appropriate fix:

### If Selector Changed:
1. Use MCP to find new selector
2. Highlight to verify it works
3. Update selector vault with:
   - New selector
   - Mark old selector as deprecated
   - Add note explaining change
4. Update Page Object with new selector
5. Re-run test to verify fix

### If Timing Issue:
1. Add appropriate wait strategy:
   - `waitForLoadState('networkidle')` for page loads
   - `waitForSelector()` for dynamic elements
   - `waitFor({ state: 'visible' })` for visibility
2. Document in vault with note: "wait-net" or "wait-sel"
3. Update Page Object method
4. Re-run test

### If Logic Issue:
1. Fix the test logic
2. Add better assertions
3. Consider adding edge case test
4. Re-run test

### If Tech Stack Issue:
1. Document decision needed
2. Add entry to decision_log.md (propose solution)
3. Update tech_stack.md if approved
4. Implement fix
5. Re-run test

**Documentation Phase:**

1. **Update failure_patterns.md:**
```markdown
## Pattern: [Descriptive Name]
**First Seen:** YYYY-MM-DD
**Frequency:** Rare | Occasional | Common
**Symptom:** [Error message]
**Root Cause:** [Why it happened]
**Fix:** [How to resolve]
**Prevention:** [How to avoid]
**Affected Tests:** [List]
```

2. **Update decision_log.md (if architectural change):**
   - Add new AD entry if tech stack changed
   - Reference from commit message

3. **Update lessons_learned.md (if strategic insight):**
   - High-level insight
   - Impact on future work

4. **Update active_sprint.md:**
   - Mark healing complete
   - Add to "Recent Healing Activities"

**Verification Phase:**
1. Run fixed test: `npm run test:headed`
2. Verify test passes
3. Run full suite: `npm test`
4. Verify no regressions
5. Check lint and type-check still pass

**Exit Criteria:**
- [ ] Test runs green
- [ ] Root cause identified and documented
- [ ] Fix applied and verified
- [ ] Failure pattern logged (in failure_patterns.md)
- [ ] Vault/decision log updated if needed
- [ ] No regressions introduced

**Deliverable:** 
- Fixed test
- Documented failure pattern
- Updated documentation
