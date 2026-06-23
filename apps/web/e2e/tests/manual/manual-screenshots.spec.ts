import { expect, Locator, Page, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const manualEvidenceDir = path.resolve('apps/docs/public/evidence/manual');

function ensureManualEvidenceDir(): void {
  fs.mkdirSync(manualEvidenceDir, { recursive: true });
}

async function prepareStableManualPage(page: Page): Promise<void> {
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

async function setManualTheme(page: Page, theme: 'light' | 'dark'): Promise<void> {
  await page.evaluate((selectedTheme) => {
    document.documentElement.dataset['theme'] = selectedTheme;
    document.documentElement.classList.toggle('dark-theme', selectedTheme === 'dark');
    document.documentElement.classList.toggle('light-theme', selectedTheme === 'light');
    window.localStorage.setItem('profdocs-theme', selectedTheme);
  }, theme);
}

async function expectWorkspaceReady(page: Page): Promise<void> {
  await expect(page.getByText('Build a trusted document intelligence workspace.')).toBeVisible();
  await expect(page.getByText('Workspace overview')).toBeVisible();
  await expect(page.getByText('Total documents')).toBeVisible();
  await expect(page.getByText('128')).toBeVisible();
}

async function expectMockDocumentVisible(page: Page): Promise<void> {
  const documentTitle = page
    .locator('strong:visible, h3:visible')
    .filter({ hasText: 'clinical-research-protocol.pdf' })
    .first();

  await expect(documentTitle).toBeVisible();
}

async function sectionById(page: Page, id: string, fallbackText: string): Promise<Locator> {
  const byId = page.locator(`#${id}`).first();

  if (await byId.count()) {
    return byId;
  }

  return page.locator('section').filter({ hasText: fallbackText }).first();
}

async function captureSectionScreenshot(section: Locator, fileName: string): Promise<void> {
  await expect(section).toBeVisible();
  await section.scrollIntoViewIfNeeded();
  await section.page().waitForTimeout(300);

  await section.screenshot({
    path: path.join(manualEvidenceDir, fileName),
    animations: 'disabled',
  });
}

test.describe('ProfDocs AI user manual visual evidence @manual', () => {
  test.setTimeout(120_000);

  test.beforeAll(() => {
    ensureManualEvidenceDir();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await prepareStableManualPage(page);
    await expectWorkspaceReady(page);
  });

  test('captures desktop user manual evidence', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('desktop'), 'Desktop evidence only');

    const dashboard = await sectionById(page, 'dashboard', 'Workspace overview');
    const documents = await sectionById(page, 'documents', 'Mock document workspace');
    const upload = await sectionById(page, 'upload', 'Upload pipeline placeholder');
    const aiPreview = await sectionById(page, 'ai-preview', 'Grounded RAG chat placeholder');

    await setManualTheme(page, 'light');
    await captureSectionScreenshot(dashboard, 'dashboard-desktop-light.png');

    await expectMockDocumentVisible(page);
    await captureSectionScreenshot(documents, 'documents-desktop-light.png');

    await expect(page.getByText('Upload pipeline placeholder')).toBeVisible();
    await captureSectionScreenshot(upload, 'upload-desktop-light.png');

    await expect(page.getByText('Grounded RAG chat placeholder')).toBeVisible();
    await captureSectionScreenshot(aiPreview, 'ai-preview-desktop-light.png');

    await setManualTheme(page, 'dark');
    await captureSectionScreenshot(dashboard, 'dashboard-desktop-dark.png');

    await expectMockDocumentVisible(page);
    await captureSectionScreenshot(documents, 'documents-desktop-dark.png');

    await expect(page.getByText('Upload pipeline placeholder')).toBeVisible();
    await captureSectionScreenshot(upload, 'upload-desktop-dark.png');

    await expect(page.getByText('Grounded RAG chat placeholder')).toBeVisible();
    await captureSectionScreenshot(aiPreview, 'ai-preview-desktop-dark.png');
  });

  test('captures mobile user manual evidence', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('mobile'), 'Mobile evidence only');

    const dashboard = await sectionById(page, 'dashboard', 'Workspace overview');

    await setManualTheme(page, 'light');
    await captureSectionScreenshot(dashboard, 'dashboard-mobile-light.png');

    await setManualTheme(page, 'dark');
    await captureSectionScreenshot(dashboard, 'dashboard-mobile-dark.png');
  });
});
