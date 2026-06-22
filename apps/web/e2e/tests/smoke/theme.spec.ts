import { expect, Page, test } from '@playwright/test';

async function prepareStableUi(page: Page): Promise<void> {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
      }
    `,
  });
}

test.describe('Theme behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await prepareStableUi(page);
  });

  test('toggles light and dark mode', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: /toggle color theme/i });
    await expect(themeButton).toBeVisible();

    const root = page.locator('html');
    const initialTheme = await root.getAttribute('data-theme');

    await expect(initialTheme).toMatch(/light|dark/);

    await themeButton.click({ force: true });

    await expect
      .poll(async () => page.locator('html').getAttribute('data-theme'))
      .not.toBe(initialTheme);
  });
});
