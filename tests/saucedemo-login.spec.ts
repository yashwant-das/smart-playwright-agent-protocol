import { test, expect } from '@playwright/test';
import { SauceDemoLoginPage } from '../pages/SauceDemoLoginPage';

test.describe('SauceDemo Login Flow', () => {
  const baseURL = 'https://www.saucedemo.com';
  const validUsername = 'standard_user';
  const validPassword = 'secret_sauce';

  test('should display login page correctly', async ({ page }) => {
    const loginPage = new SauceDemoLoginPage(page);

    // Navigate to login page
    await loginPage.goto(baseURL);

    // Verify page is loaded with all required elements
    await loginPage.isLoaded();

    // Meaningful assertions - verify page title and URL
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page).toHaveURL(baseURL);

    // Verify form elements are present and enabled
    const usernameInput = page.locator('#user-name');
    const passwordInput = page.locator('#password');
    const loginButton = page.locator('#login-button');

    await expect(usernameInput).toBeVisible();
    await expect(usernameInput).toBeEnabled();
    await expect(usernameInput).toHaveAttribute('placeholder', 'Username');

    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toBeEnabled();
    await expect(passwordInput).toHaveAttribute('placeholder', 'Password');

    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
    await expect(loginButton).toHaveValue('Login');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new SauceDemoLoginPage(page);

    // Navigate to login page
    await loginPage.goto(baseURL);

    // Verify page is loaded
    await loginPage.isLoaded();

    // Perform login
    await loginPage.login(validUsername, validPassword);

    // Meaningful assertions - verify successful navigation to inventory page
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page).toHaveTitle(/Swag Labs/);

    // Verify we're on the products page by checking for inventory items
    const inventoryContainer = page.locator('.inventory_container');
    await expect(inventoryContainer).toBeVisible();
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new SauceDemoLoginPage(page);

    // Navigate to login page
    await loginPage.goto(baseURL);

    // Verify page is loaded
    await loginPage.isLoaded();

    // Attempt login with invalid credentials
    await loginPage.login('invalid_user', 'wrong_password');

    // Meaningful assertions - verify error message appears
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).not.toBeNull();
    expect(errorMessage).toContain('Epic sadface');

    // Verify we're still on login page (not redirected)
    await expect(page).toHaveURL(baseURL);

    // Verify error container is visible
    const errorContainer = page.locator('.error-message-container');
    await expect(errorContainer).toBeVisible();
  });
});
