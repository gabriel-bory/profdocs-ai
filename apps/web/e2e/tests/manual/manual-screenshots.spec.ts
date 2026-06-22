import { expect, Page, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const manualAssetsDir = path.resolve('apps/docs/public/evidence/manual');

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

test.describe('User manual screenshots @manual', () => {
  test.setTimeout(90_000);

  test.beforeAll(() => {
    fs.mkdirSync(manualAssetsDir, { recursive: true });
  });

  test('captures home workspace full page', async ({ page }, testInfo) => {
    await page.goto('/');
    await prepareStableUi(page);

    const documentTitle = page
      .locator('strong:visible, h3:visible')
      .filter({ hasText: 'clinical-research-protocol.pdf' })
      .first();

    await expect(documentTitle).toBeVisible();

    await page.screenshot({
      path: path.join(manualAssetsDir, `home-${testInfo.project.name}.png`),
      fullPage: true,
      animations: 'disabled',
    });
  });
});
