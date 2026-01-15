# Morning Ritual Mode

Activate **Morning Ritual Mode**.

**Tasks:**
1. Run environment health check:
   - Execute `npm test` to verify baseline
   - Execute `npm run lint` to check code quality
   - Check git status: `git status`
   
2. Review context:
   - Read `.ai/2_PLANNING/active_sprint.md`
   - Check "Last Completed Task" and "Next Session Focus"
   - Review any blockers
   
3. Activate Smoke Test (optional but recommended):
   - Read `.ai/3_MEMORY/selector_vault.md`
   - Pick 3-5 random selectors from different pages
   - Use MCP to verify they still work
   - Report health status
   
4. Check for updates:
   - Any new daily logs since last session?
   - Any new decisions in decision_log.md?
   - Any new failure patterns?

**Exit Criteria:**
- [ ] Environment is healthy (tests passing, no lint errors, TypeScript clean)
- [ ] Context loaded (know what to work on)
- [ ] No critical selectors broken (smoke test passed)
- [ ] Ready to choose next mode

**Deliverable:** Status report + recommendation for which mode to activate next
