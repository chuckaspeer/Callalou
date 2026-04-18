import { test, expect, type Page } from "@playwright/test";

/** Console error substrings/patterns we intentionally allow (document why inline). */
const ALLOWED_CONSOLE_ERROR_PATTERNS: RegExp[] = [
  // None yet — add sparingly, e.g. /known noisy library/i
];

function isAllowedConsoleError(text: string): boolean {
  return ALLOWED_CONSOLE_ERROR_PATTERNS.some((re) => re.test(text));
}

async function settlePage(page: Page): Promise<void> {
  await page.waitForLoadState("load");
  await expect(page.locator("main")).toBeVisible();
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise<void>((resolve) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            })
        )
    )
  );
}

/** Masks the Next.js dev-only toolbar so it does not appear in baselines. */
async function devToolsMask(page: Page) {
  const btn = page.getByRole("button", { name: /Open Next.js Dev Tools/i });
  return (await btn.isVisible().catch(() => false)) ? [btn] : [];
}

test.describe("homepage console", () => {
  test("has no unexpected browser console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await settlePage(page);

    const unexpected = errors.filter((t) => !isAllowedConsoleError(t));
    expect(
      unexpected,
      `Unexpected console.error calls:\n${unexpected.join("\n---\n")}`
    ).toEqual([]);
  });
});

/**
 * Full-page screenshots after `load` + main + images settled.
 * Baselines are desktop Chromium only (see beforeEach).
 * Possible drift: footer © year, font rasterization across OS/CI — update snapshots if needed.
 */
test.describe("visual snapshots", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "Snapshot baselines: desktop Chromium project only"
    );
  });

  test("homepage", async ({ page }) => {
    await page.goto("/");
    await settlePage(page);
    await expect(page).toHaveScreenshot("home.png", {
      fullPage: true,
      animations: "disabled",
      mask: await devToolsMask(page),
    });
  });

  test("privacy", async ({ page }) => {
    await page.goto("/privacy");
    await settlePage(page);
    await expect(
      page.getByRole("heading", { name: /Privacy Policy/i })
    ).toBeVisible();
    await expect(page).toHaveScreenshot("privacy.png", {
      fullPage: true,
      animations: "disabled",
      mask: await devToolsMask(page),
    });
  });

  test("terms", async ({ page }) => {
    await page.goto("/terms");
    await settlePage(page);
    await expect(
      page.getByRole("heading", { name: /Terms of Service/i })
    ).toBeVisible();
    await expect(page).toHaveScreenshot("terms.png", {
      fullPage: true,
      animations: "disabled",
      mask: await devToolsMask(page),
    });
  });

  test("private-dialogue", async ({ page }) => {
    await page.goto("/private-dialogue");
    await settlePage(page);
    await expect(
      page.getByRole("heading", { name: /Request introduction/i })
    ).toBeVisible();
    await expect(page).toHaveScreenshot("private-dialogue.png", {
      fullPage: true,
      animations: "disabled",
      mask: await devToolsMask(page),
    });
  });
});
