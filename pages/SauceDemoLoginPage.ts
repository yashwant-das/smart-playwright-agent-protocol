import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SauceDemoLoginPage extends BasePage {
  // Selectors from vault - ONLY use these verified selectors
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessageContainer: Locator;

  constructor(page: Page) {
    super(page);
    // Using selectors from .ai/3_MEMORY/selector_vault.md
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessageContainer = page.locator('.error-message-container');
  }

  /**
   * Performs full login flow
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Verifies page is ready by checking all required elements are visible
   */
  async isLoaded(): Promise<void> {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.loginButton.waitFor({ state: 'visible' });
  }

  /**
   * Returns error message text if present, null otherwise
   */
  async getErrorMessage(): Promise<string | null> {
    const isVisible = await this.errorMessageContainer.isVisible();
    if (!isVisible) {
      return null;
    }
    return await this.errorMessageContainer.textContent();
  }
}
