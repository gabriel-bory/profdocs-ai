import { defineConfig, devices } from '@playwright/test';

const useSystemChrome =
  process.env.PW_USE_SYSTEM_CHROME === 'true' ||
  (process.platform === 'win32' && process.env.CI !== 'true');

const chromeChannel = useSystemChrome ? ({ channel: 'chrome' as const }) : {};
const webServerCommand = 'pnpm dev:web';

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  workers: process.env.CI ? 2 : 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: './playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:4200',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: webServerCommand,
        cwd: process.cwd(),
        url: 'http://localhost:4200',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {
      name: 'chromium-desktop',
      testIgnore: /manual\//,
      use: {
        ...devices['Desktop Chrome'],
        ...chromeChannel,
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'mobile-chrome',
      testIgnore: /manual\//,
      use: {
        ...devices['Pixel 7'],
        ...chromeChannel,
      },
    },
    {
      name: 'manual-chromium-desktop',
      testMatch: /manual\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        ...chromeChannel,
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
});
