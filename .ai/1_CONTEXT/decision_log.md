# Architectural Decision Log

Record all major decisions here to preserve institutional knowledge.

**Format:**
```
## AD-XXX: [Decision Title]
**Date:** YYYY-MM-DD
**Status:** Accepted | Superseded | Deprecated
**Decision:** What was decided
**Context:** Why it was needed
**Consequences:** Trade-offs accepted
**Alternatives Considered:** What was rejected and why
```

---

## AD-001: Use Community MCP Server Over Official
**Date:** 2024-01-10
**Status:** Accepted
**Decision:** Use `@executeautomation/playwright-mcp-server`
**Context:** Need element highlighting for Cartographer mode verification
**Consequences:** 
- ✅ Can verify selectors visually before coding
- ❌ Risk of API changes (community-maintained)
- ❌ May need migration if official MCP adds highlight feature
**Alternatives Considered:**
- Official Microsoft Playwright MCP - lacks highlight capability
- Custom MCP server - too much maintenance overhead

## AD-002: Ban XPath Selectors
**Date:** 2024-01-10
**Status:** Accepted
**Decision:** XPath selectors are prohibited unless no alternative exists
**Context:** XPath breaks frequently with DOM restructures
**Consequences:**
- ✅ More resilient tests
- ❌ Harder to select deeply nested elements
- ❌ Some legacy apps may require exceptions
**Alternatives Considered:**
- Allow XPath with approval - too much process overhead
- Allow XPath for read-only operations - inconsistent rule

## AD-003: Mandatory Page Object Model
**Date:** 2024-01-10
**Status:** Accepted
**Decision:** All tests must use POM, no raw locators in specs
**Context:** Maintainability and reusability
**Consequences:**
- ✅ Centralized selector management
- ✅ Easier refactoring
- ❌ More boilerplate code
- ❌ Slower initial development
**Alternatives Considered:**
- Allow raw selectors for simple tests - inconsistent codebase
- Use helper functions instead of classes - less structured

## AD-004: Selector Vault Metadata Fields
**Date:** 2024-01-10
**Status:** Accepted
**Decision:** Vault format: `Page | Element | Selector | Strategy | Verified | Notes`
**Context:** Need traceability and confidence scoring
**Consequences:**
- ✅ Can track selector staleness
- ✅ Can prioritize reliable selectors
- ❌ More verbose vault entries
**Alternatives Considered:**
- Simple format (Page | Element | Selector) - loses context
- JSON format - harder for humans to read/edit

---

## Template for New Decisions

## AD-XXX: [Title]
**Date:** YYYY-MM-DD
**Status:** Proposed
**Decision:** 
**Context:** 
**Consequences:** 
**Alternatives Considered:** 
