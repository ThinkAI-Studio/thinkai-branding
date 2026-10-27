import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3005",
    trace: "retain-on-failure",
    launchOptions: process.env.CI ? undefined : { executablePath: "/usr/bin/google-chrome" },
  },
  webServer: {
    command: "npm run start -- -p 3005",
    url: "http://127.0.0.1:3005",
    reuseExistingServer: false,
    timeout: 30_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], browserName: "chromium" } },
    { name: "mobile", use: { ...devices["iPhone 13"], browserName: "chromium" } },
  ],
});
