import { expect, test } from "@playwright/test";

const SKILL_NAMES = [
  // Web
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "GSAP + Motion",
  "Three.js / GLSL",
  // DevOps
  "Linux",
  "Go",
  "Docker & Podman",
  "Kubernetes & K3s",
  "GitHub Actions + Argo CD",
  "Tailscale + SAST",
  // Designer
  "Design Systems & Tokens",
  "Figma",
  "Typography & Art Direction",
  "Motion Design",
  "Prototyping",
];

const CATEGORY_LABELS = ["WEB", "DEVOPS", "DESIGNER"];

test.describe("Skills Section (Stack & Craft)", () => {
  test("skills section is visible and navigable via deep link", async ({ page }) => {
    await page.goto("/#skills");
    const section = page.locator("#skills");
    await expect(section).toBeAttached();
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeInViewport();
  });

  test("displays all 3 category labels", async ({ page }) => {
    await page.goto("/#skills");
    const section = page.locator("#skills");
    await section.scrollIntoViewIfNeeded();

    for (const category of CATEGORY_LABELS) {
      const label = section.getByText(category, { exact: false }).first();
      await expect(label).toBeAttached();
    }
  });

  test("renders all 17 skill cards across chapters", async ({ page }) => {
    await page.goto("/#skills");
    const section = page.locator("#skills");

    for (const name of SKILL_NAMES) {
      const card = section.getByRole("heading", { name, exact: true }).first();
      await expect(card).toBeAttached();
    }
  });

  test("does not trigger horizontal overflow at desktop viewport (1440px)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#skills");
    const section = page.locator("#skills");
    await section.scrollIntoViewIfNeeded();

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasOverflow).toBeFalsy();
  });

  test("does not trigger horizontal overflow at mobile viewport (390px)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#skills");
    const section = page.locator("#skills");
    await section.scrollIntoViewIfNeeded();

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasOverflow).toBeFalsy();
  });

  test("renders accessible static grouped grid under prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#skills");
    const section = page.locator("#skills");
    await section.scrollIntoViewIfNeeded();

    // Verify all 17 skill cards are attached and visible in reduced motion
    for (const name of SKILL_NAMES) {
      const heading = section.getByRole("heading", { name, exact: true }).first();
      await expect(heading).toBeVisible();
    }

    // Verify no horizontal overflow in reduced-motion mode
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBeFalsy();
  });
});
