import { expect, test, type Page, type TestInfo } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const evidenceDir = resolve(
  process.cwd(),
  'apps/docs/public/evidence/context-engine-preview',
);

type EvidenceTheme = 'light' | 'dark';

function viewportName(testInfo: TestInfo): 'desktop' | 'mobile' {
  return testInfo.project.name.includes('mobile') ? 'mobile' : 'desktop';
}

function evidencePath(testInfo: TestInfo, theme: EvidenceTheme): string {
  return resolve(
    evidenceDir,
    `context-engine-preview-${viewportName(testInfo)}-${theme}.png`,
  );
}

async function setTheme(page: Page, theme: EvidenceTheme): Promise<void> {
  const toggleToDark = page.getByRole('button', { name: /dark/i }).first();
  const toggleToLight = page.getByRole('button', { name: /light/i }).first();

  if (theme === 'dark' && (await toggleToDark.isVisible().catch(() => false))) {
    await toggleToDark.click();
  }

  if (theme === 'light' && (await toggleToLight.isVisible().catch(() => false))) {
    await toggleToLight.click();
  }

  await page.waitForTimeout(500);
}

async function openContextEngine(page: Page) {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const section = page.locator('#context-engine');
  await section.scrollIntoViewIfNeeded();

  await expect(
    section.getByRole('heading', { name: /Safe orchestration workspace/i }),
  ).toBeVisible();

  await expect(section.getByText(/Local registry selection/i)).toBeVisible();
  await expect(section.getByText(/Human Approval Gate/i)).toBeVisible();

  return section;
}

test.describe('Context Engine Preview visual evidence', () => {
  test.beforeAll(() => {
    mkdirSync(evidenceDir, { recursive: true });
  });

  test('captures polished Context Engine section in light and dark mode', async ({
    page,
  }, testInfo) => {
    const section = await openContextEngine(page);

    await setTheme(page, 'light');
    await section.scrollIntoViewIfNeeded();
    await section.screenshot({ path: evidencePath(testInfo, 'light') });

    await setTheme(page, 'dark');
    await section.scrollIntoViewIfNeeded();
    await section.screenshot({ path: evidencePath(testInfo, 'dark') });
  });
});
