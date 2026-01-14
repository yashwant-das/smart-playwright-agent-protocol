# Planning Standards

## File Lifecycle

### active_sprint.md
- **Purpose:** What we're doing RIGHT NOW
- **Lifespan:** Until Night Watchman rollover
- **Update Frequency:** Every mode execution
- **Keep It:** < 50 tasks at any time

### daily_logs/
- **Purpose:** Historical record of completed work
- **Format:** `YYYY-MM-DD.md`
- **Created By:** Night Watchman mode
- **Archive When:** > 30 days old (move to daily_logs/archive/)

### maps/
- **Purpose:** Visual references of page states
- **Content:** Screenshots from Cartographer mode
- **Naming:** `PageName_YYYYMMDD.png`
- **Use Case:** Compare before/after during Healer mode

## Best Practices

1. **Run Night Watchman Daily:** Prevents active_sprint.md bloat
2. **Archive Old Logs Monthly:** Keeps token count manageable
3. **Screenshot Every New Page:** Visual documentation is invaluable
4. **Use Checkboxes:** `- [ ]` and `- [x]` for easy tracking
