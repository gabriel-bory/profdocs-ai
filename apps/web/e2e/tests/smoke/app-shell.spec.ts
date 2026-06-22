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

async function navigateToSection(page: Page, label: string): Promise<void> {
  const sideNavLink = page.locator('.side-nav__link', { hasText: label }).first();
  const bottomNavLink = page.locator('.bottom-nav a', { hasText: label }).first();
  const link = await sideNavLink.isVisible() ? sideNavLink : bottomNavLink;

  await link.click({ force: true });
}

test.describe('ProfDocs AI app shell', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await prepareStableUi(page);
  });

  test('loads the dashboard workspace', async ({ page }) => {
    await expect(page.getByText('Build a trusted document intelligence workspace.')).toBeVisible();
    await expect(page.getByText('Workspace overview')).toBeVisible();
    await expect(page.getByText('Mock document workspace')).toBeVisible();
    await expect(page.getByText('Grounded RAG chat placeholder')).toBeVisible();
  });

  test('navigates through main sections', async ({ page }) => {
    await navigateToSection(page, 'Documents');
    await expect(page.getByText('Mock document workspace')).toBeVisible();

    await navigateToSection(page, 'Upload');
    await expect(page.getByText('Upload pipeline placeholder')).toBeVisible();

    await navigateToSection(page, 'AI Preview');
    await expect(page.getByText('Grounded RAG chat placeholder')).toBeVisible();
  });
});
