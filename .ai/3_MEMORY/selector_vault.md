# Selector Vault
*Approved, tested selectors only. This is the source of truth.*

**Format:** `Page | Element | Selector | Strategy | Verified | Notes`

**Verification Rules:**
1. Every selector MUST be highlighted via MCP before entry
2. Update "Verified" date if selector is re-tested
3. Add notes for special cases (waits, iframes, etc.)

---

## Example Entries

```
Login | UsernameField | [data-testid="username"] | testid | 2024-01-10 | Stable, no waits needed
Login | PasswordField | [data-testid="password"] | testid | 2024-01-10 | Stable, no waits needed
Login | SubmitButton | button[type="submit"] | css | 2024-01-10 | Only submit button on page
Dashboard | WelcomeMessage | .user-greeting | css-semantic | 2024-01-10 | Requires networkidle wait
```

---

## Legend

**Strategy Codes:**
- `testid` - data-testid attribute (preferred)
- `aria` - aria-label or role
- `id` - element id
- `css` - CSS selector (class or tag)
- `css-semantic` - Semantic CSS (e.g., .submit-button)
- `text` - Text content matching
- `xpath` - XPath (requires AD log justification)

**Special Notes Abbreviations:**
- `iframe` - Element is inside iframe
- `wait-net` - Requires waitForLoadState('networkidle')
- `wait-sel` - Requires explicit waitForSelector
- `scroll` - Needs scrollIntoViewIfNeeded
- `shadow` - Inside Shadow DOM

---

## Active Selectors

*Your verified selectors go below this line*

```
SauceDemo Login | UsernameField | #user-name | id | 2025-01-10 | Stable ID, verified via browser evaluation and hover. No waits needed.
SauceDemo Login | PasswordField | #password | id | 2025-01-10 | Stable ID, verified via browser evaluation and hover. No waits needed.
SauceDemo Login | LoginButton | #login-button | id | 2025-01-10 | Stable ID, type="submit", verified via browser evaluation and hover. No waits needed.
SauceDemo Login | ErrorMessageContainer | .error-message-container | css | 2025-01-10 | Error validation element, only visible on failed login. Verified via browser evaluation.
```