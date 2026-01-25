import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    /**
     * @selector #user-name
     * @strategy id
     * @verified 2024-01-25
     */
    public readonly usernameInput: Locator;

    /**
     * @selector #password
     * @strategy id
     * @verified 2024-01-25
     */
    public readonly passwordInput: Locator;

    /**
     * @selector #login-button
     * @strategy id
     * @verified 2024-01-25
     */
    public readonly loginButton: Locator;

    /**
     * Initializes the login page object
     * @param page - Playwright Page object
     */
    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    /**
     * Verifies page is ready by checking all required elements are visible
     */
    async isLoaded(): Promise<void> {
        await this.usernameInput.waitFor({ state: 'visible' });
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.loginButton.waitFor({ state: 'visible' });
    }
}
