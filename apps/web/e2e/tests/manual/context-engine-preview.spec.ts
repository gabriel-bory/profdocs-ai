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

async function openContextEngine(page: Page): Promise<void> {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const heading = page.getByRole('heading', {
    name: /Safe orchestration workspace/i,
  });

  await heading.scrollIntoViewIfNeeded();

  await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h1, h2, h3')).find(
      (element) =>
        element.textContent?.toLowerCase().includes('safe orchestration workspace'),
    );

    if (!heading) {
      return;
    }

    const top = heading.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
  });

  await page.waitForTimeout(500);

  await expect(heading).toBeVisible();
  await expect(page.getByText(/Local registry selection/i)).toBeVisible();
  await expect(page.getByText(/Human Approval Gate/i)).toBeVisible();
}

async function clickThemeAction(page: Page, label: RegExp): Promise<boolean> {
  const candidates = [
    page.getByRole('button', { name: label }).first(),
    page.locator('button').filter({ hasText: label }).first(),
    page.getByText(label).first(),
  ];

  for (const candidate of candidates) {
    if (await candidate.isVisible().catch(() => false)) {
      await candidate.click();
      await page.waitForTimeout(600);
      return true;
    }
  }

  return false;
}

async function setTheme(page: Page, theme: EvidenceTheme): Promise<void> {
  if (theme === 'light') {
    await clickThemeAction(page, /light/i);
  }

  if (theme === 'dark') {
    await clickThemeAction(page, /dark/i);
  }

  await page.waitForTimeout(500);
}

async function captureViewportEvidence(
  page: Page,
  testInfo: TestInfo,
  theme: EvidenceTheme,
): Promise<void> {
  await openContextEngine(page);
  await setTheme(page, theme);
  await openContextEngine(page);

  await page.screenshot({
    path: evidencePath(testInfo, theme),
    fullPage: false,
    animations: 'disabled',
  });
}

test.describe('Context Engine Preview visual evidence', () => {
  test.beforeAll(() => {
    mkdirSync(evidenceDir, { recursive: true });
  });

  test('captures polished Context Engine viewport evidence in light and dark mode', async ({
    page,
  }, testInfo) => {
    await captureViewportEvidence(page, testInfo, 'light');
    await captureViewportEvidence(page, testInfo, 'dark');
  });
});
