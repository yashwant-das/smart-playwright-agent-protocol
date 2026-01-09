import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `.ai/2_PLANNING/maps/${name}_${Date.now()}.png`,
      fullPage: true 
    });
  }
}
