import { Page } from '@playwright/test';

export class BasePage {
  /**
   * Wrapper for Playwright Page
   * @param page - Playwright Page object
   */
  constructor(protected page: Page) { }

  /**
   * Navigates to the specified URL
   * @param url - Destination URL
   */
  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  /**
   * Captures a screenshot for debugging or documentation
   * @param name - Name of the screenshot file
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `.ai/2_PLANNING/maps/${name}_${Date.now()}.png`,
      fullPage: true
    });
  }
}
