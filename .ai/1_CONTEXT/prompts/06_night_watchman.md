# Night Watchman Mode

Activate **Night Watchman Mode**.

**Context:**
- Read `.ai/2_PLANNING/active_sprint.md`

**Task Checklist:**

### 1. Create Daily Log

**Path:** `.ai/2_PLANNING/daily_logs/[YYYY-MM-DD].md`

**Structure:**
```markdown
# Daily Log: [Month Day, Year]

## Summary: What was accomplished today
[2-3 sentence summary of the session]

## Metrics
- **Pages Mapped:** [count]
- **Selectors Verified:** [count]
- **Page Objects Created:** [count]
- **Tests Written:** [count]
- **Test Pass Rate:** [X/Y green]
- **Healing Activities:** [count]
- **Architectural Decisions:** [count]
- **Code Quality:** [ESLint/TypeScript status]

## Phase 1: Discovery (Cartographer Mode)
[Extract all completed [x] Cartographer tasks from active_sprint.md]

**Selectors Added:**
[List new vault entries]

## Phase 2: Implementation (Architect Mode)
[Extract all completed [x] Architect tasks from active_sprint.md]

**Files Created:**
[List new files]

**Test Cases:**
[List test descriptions]

## Phase 3: Validation
[Extract validation results]

## Healing Activities (if any)
[Extract from "Recent Healing Activities" section]

## Technical Notes
[Extract from "Notes" section - observations about the system]

## Decisions Made
[Reference any AD entries created today]

## Next Session Planning
**Suggested Next Steps:**
1. [Most logical next task]
2. [Alternative task]
3. [Another option]

**Recommended Focus:** [Top priority]

---
**Session Duration:** [hours]
**Overall Status:** [status description]
**Team Velocity:** [tests/session, pages/session]
```

### 2. Clean Active Sprint

**In active_sprint.md:**

**REMOVE:**
- All [x] completed tasks → Now in daily log
- All content from "Notes" section → Now in daily log
- "Recent Healing Activities" section → Now in daily log

**KEEP:**
- All [ ] pending tasks
- Unresolved blockers
- Sprint goal and status

**ADD:**
- New placeholder tasks for next session
- Reference to today's log in "Last Completed Task"

**UPDATE:**
- "Last Completed Task" → "See .ai/2_PLANNING/daily_logs/[date].md"
- "Next Session Focus" → First pending task or suggestion
- "Quick Reference" section with last commit

**Target:** active_sprint.md should be < 50 lines after cleanup

### 3. Archive Old Logs (if needed)

**If daily_logs/ has > 30 files:**
```bash
mkdir -p .ai/2_PLANNING/daily_logs/archive_[YYYY_MM]
mv .ai/2_PLANNING/daily_logs/[old-date]*.md .ai/2_PLANNING/daily_logs/archive_[YYYY_MM]/
```

### 4. Token Health Check

**Count lines:**
```bash
wc -l .ai/2_PLANNING/active_sprint.md
```

**Report:**
- If < 50 lines: "Token count healthy"
- If 50-100 lines: "Consider running Night Watchman more frequently"
- If > 100 lines: "CRITICAL: Token bloat detected, archive needed"

### 5. Generate Rollover Report

**Format:**
```
Night Watchman Report

Completed Today:
- [X] tasks completed
- [Y] files created
- [Z] tests written

Moved to Daily Log:
- Location: .ai/2_PLANNING/daily_logs/[date].md
- Size: [line count] lines

Active Sprint Status:
- Pending tasks: [count]
- Sprint completion: [%]
- Token health: [line count] lines

Next Session:
- Focus: [task description]
- Estimated effort: [time]
- Blockers: [none/list]

Ready for tomorrow!
```

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
