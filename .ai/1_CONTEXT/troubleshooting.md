# Troubleshooting Guide

## MCP Server Issues

### Problem: "MCP server not responding"

**Symptoms:** Agent can't use highlight/screenshot tools
**Diagnosis:**

```bash
# Test MCP server manually
npx -y @executeautomation/playwright-mcp-server
```

**Solutions:**

1. Check Node version (must be 18+): `node --version`
2. Clear npm cache: `npm cache clean --force`
3. Reinstall: `npm install -D @executeautomation/playwright-mcp-server`
4. Restart IDE

### Problem: "MCP tools not appearing in IDE"

**For Cursor:**

- Check `~/.cursor/mcp.json` exists
- Restart Cursor completely (Cmd+Q, not just close window)
- Check Cursor logs: Help → Toggle Developer Tools → Console

**For Windsurf:**

- Check `~/.windsurf/mcp.json` exists
- Verify JSON syntax (use JSONLint.com)
- Restart Windsurf

## Test Execution Issues

### Problem: "Element not found" but it exists

**Diagnosis:**

1. Run test with `--headed` to watch
2. Use MCP screenshot at the failure point
3. Check if element is in iframe
4. Check if element needs scroll into view

**Solutions:**

```typescript
// Add explicit wait
await page.waitForSelector('[data-testid="element"]');

// Handle iframes
const frame = page.frameLocator('iframe#myframe');
await frame.locator('[data-testid="element"]').click();

// Scroll into view
await page.locator('[data-testid="element"]').scrollIntoViewIfNeeded();
```

### Problem: "Tests pass locally, fail in CI"

**Common Causes:**

1. Race conditions (network slower in CI)
2. Viewport differences
3. Missing test data

**Solutions:**

```typescript
// Add network idle wait
await page.goto(url, { waitUntil: 'networkidle' });

// Set explicit viewport
await page.setViewportSize({ width: 1920, height: 1080 });

// Use test fixtures
test.use({ storageState: 'auth.json' });
```

## Selector Vault Issues

### Problem: "Vault has duplicate entries"

**Prevention:**

- Before adding selector, search vault: `grep "ElementName" .ai/3_MEMORY/selector_vault.md`
- Use consistent naming: `PageName_ElementName` format

**Cleanup:**

```bash
# Find duplicates
sort .ai/3_MEMORY/selector_vault.md | uniq -d

# Manual review and consolidate
```

## Token Limit Issues

### Problem: "Agent losing context mid-task"

**Symptoms:** Agent forgets instructions, repeats work
**Diagnosis:** Check file sizes:

```bash
wc -l .ai/**/*.md
```

**Solutions:**

1. Run Night Watchman mode to rollover old tasks
2. Archive old daily logs: `mkdir .ai/2_PLANNING/daily_logs/archive`
3. Consolidate failure patterns (keep only recent patterns)

## Emergency Recovery

### "I broke everything, how do I reset?"

```bash
# Backup current state
cp -r .ai .ai.backup.$(date +%Y%m%d)

# Re-run setup script (keeps existing files)
./setup_agentic_qa.sh

# Restore only the memory
cp .ai.backup.*/.ai/3_MEMORY/* .ai/3_MEMORY/
```

### "Tests are all red after framework update"

1. Activate Archaeology Mode (see workflows)
2. Regenerate selector vault from scratch
3. Use MCP to verify each selector still works
