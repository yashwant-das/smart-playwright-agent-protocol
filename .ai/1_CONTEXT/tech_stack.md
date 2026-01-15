# Tech Stack Reference

## Core Framework

- **Test Runner:** Playwright Test (TypeScript)
- **Language:** TypeScript 5.x
- **Node Version:** 22+ (LTS recommended)

## AI Agent Vision

- **MCP Server:** `@executeautomation/playwright-mcp-server`
- **Capabilities:** navigate, click, fill, screenshot, evaluate, highlight
- **Why Community Edition:** Supports element highlighting (critical for verification)

### Client Configuration (example for Cursor)

Add the following to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    }
  }
}
```

## Code Quality Tools

- **Linter:** ESLint 9.x
- **Config Format:** `.eslintrc.js` (CommonJS format, aligns with Playwright best practices)
- **Plugins:**
  - `@typescript-eslint/eslint-plugin` - TypeScript support
  - `eslint-plugin-playwright` - Playwright-specific rules
- **Formatter:** Prettier
- **Type Checking:** TypeScript compiler
- **Decision Reference:** See AD-005 in `.ai/1_CONTEXT/decision_log.md`

## Assertion Strategy

- `expect(locator).toBeVisible()` - Element exists and is visible
- `expect(locator).toHaveText()` - Content validation
- `expect(locator).toBeEnabled()` - Interaction ready
- `expect(page).toHaveURL()` - Navigation validation

## Browser Configuration

- **Primary:** Chromium (fastest for development)
- **CI/CD:** All three (chromium, firefox, webkit)
- **Headless:** Default for CI, headed for debugging

## File Structure

```
smart-playwright-agent-protocol/
├── .ai/                    # Agent Brain
│   ├── 1_CONTEXT/         # Static rules (READ-ONLY)
│   ├── 2_PLANNING/        # Active work (READ-WRITE)
│   └── 3_MEMORY/          # Validated data (APPEND-ONLY)
├── pages/                 # Page Object Models
├── tests/                 # Test specifications
├── playwright.config.ts   # Playwright configuration
└── package.json          # Dependencies
```
