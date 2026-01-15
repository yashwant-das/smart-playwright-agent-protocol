# Night Watchman Mode

Activate **Night Watchman Mode**.

**Context:**

- Read `.ai/2_PLANNING/active_sprint.md`

**Task Checklist:**

## 1. Create Daily Log

**Path:** `.ai/2_PLANNING/daily_logs/[YYYY-MM-DD].md`

**Include:**

- Summary of session accomplishments (2-3 sentences)
- Metrics: pages mapped, selectors verified, tests written, pass rate
- Cartographer work completed
- Architect work completed
- Healing activities (if any)
- Technical notes and observations
- Decisions made (AD references)
- Next session suggestions

## 2. Clean Active Sprint

**REMOVE:**

- All [x] completed tasks (now in daily log)
- All content from "Notes" section (now in daily log)
- "Recent Healing Activities" section (now in daily log)

**KEEP:**

- All [ ] pending tasks
- Unresolved blockers
- Sprint goal and status

**ADD:**

- New placeholder tasks for next session
- Reference to today's log in "Last Completed Task"

**UPDATE:**

- "Last Completed Task" -> "See .ai/2_PLANNING/daily_logs/[date].md"
- "Next Session Focus" -> First pending task or suggestion
- "Quick Reference" section with last commit

**Target:** active_sprint.md should be < 50 lines after cleanup

## 3. Archive Old Logs (if needed)

If daily_logs/ has > 30 files, archive older logs.

## 4. Token Health Check

Count lines in active_sprint.md:

- < 50 lines: Healthy
- 50-100 lines: Consider more frequent cleanup
- > 100 lines: Critical, needs immediate cleanup

## 5. Generate Rollover Report

Summarize:

- Tasks completed today
- Files created
- Daily log location
- Pending tasks count
- Token health status
- Next session focus

**Exit Criteria:**

- [ ] Daily log created with all completed work
- [ ] active_sprint.md cleaned (< 100 lines, ideally < 50)
- [ ] Old logs archived (if needed)
- [ ] Token health confirmed
- [ ] Rollover report generated
- [ ] Sprint status updated

**Deliverable:**

- Comprehensive daily log
- Clean active sprint
- Rollover report
