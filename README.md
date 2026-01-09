# Agentic QA Project v2.0

This project uses the **Agentic QA Protocol** - an AI-driven, self-healing test automation framework.

## Quick Start

1. **Setup Complete** ✅ (You just ran the setup script)
2. **Configure MCP:** See "MCP Configuration" section below
3. **Run First Test:** `npm test`

## MCP Configuration

The AI agent needs MCP server access to "see" the browser. Configure for your IDE:

### For Cursor
Create/edit `~/.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "playwright-community": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    }
  }
}
```

### For Windsurf
Create/edit `~/.windsurf/mcp.json`:
```json
{
  "mcpServers": {
    "playwright-community": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    }
  }
}
```

### For VS Code
MCP support may vary. Check latest Anthropic documentation.

## Project Structure

```
.ai/                    # Agent Brain (DO NOT delete)
├── 1_CONTEXT/         # Rules & Standards (READ-ONLY)
├── 2_PLANNING/        # Active Work (READ-WRITE)
└── 3_MEMORY/          # Validated Data (APPEND-ONLY)
pages/                 # Page Object Models
tests/                 # Test Specifications
```

## Available Scripts

- `npm test` - Run all tests
- `npm run test:headed` - Run tests with browser visible
- `npm run test:ui` - Run tests in Playwright UI mode
- `npm run test:debug` - Run tests in debug mode
- `npm run lint` - Check code quality
- `npm run lint:fix` - Auto-fix linting issues

## How to Use the Protocol

See `.ai/1_CONTEXT/mission.md` for the full guide.

**Quick workflow:**
1. Tell AI: "Activate Cartographer Mode for [URL]"
2. AI maps the page and populates selector vault
3. Tell AI: "Activate Architect Mode"
4. AI builds Page Objects and tests
5. Run tests and iterate

## Troubleshooting

See `.ai/1_CONTEXT/troubleshooting.md` for common issues.

**Quick fixes:**
- MCP not working? Restart IDE completely
- Tests failing? Run with `--headed` to watch
- Selectors broken? Use Healer Mode

## Next Steps

1. Edit `.ai/2_PLANNING/active_sprint.md` with your target URL
2. Tell your AI: "Activate Cartographer Mode"
3. Watch the magic happen ✨
