import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/ExampleLoginPage';

test.describe('Example Login Flow', () => {
  test('should load login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Navigate
    await loginPage.goto('https://example.com/login');
    
    // Verify page loaded
    await loginPage.isLoaded();
    
    // Take screenshot for documentation
    await loginPage.takeScreenshot('login_page_loaded');
    
    await expect(page).toHaveURL(/.*login/);
  });
});
