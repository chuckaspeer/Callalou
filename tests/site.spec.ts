import { test, expect } from "@playwright/test";

function isIntroductionsPost(url: URL): boolean {
  return url.pathname === "/api/introductions";
}

test.describe("smoke", () => {
  test("homepage loads successfully", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.ok()).toBeTruthy();
    await expect(page.locator("body")).toBeVisible();
  });

  test("primary CTA is visible", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", {
      name: /Begin a Private Dialogue|Request Introduction|Private Dialogue|Contact/i,
    });
    await expect(cta.first()).toBeVisible();
  });

  test("/privacy loads and mentions Privacy", async ({ page }) => {
    await page.goto("/privacy");
    await expect(
      page.getByRole("heading", { name: /Privacy Policy/i })
    ).toBeVisible();
  });

  test("/terms loads and mentions Terms", async ({ page }) => {
    await page.goto("/terms");
    await expect(
      page.getByRole("heading", { name: /Terms of Service/i })
    ).toBeVisible();
  });

  test("/private-dialogue has a form", async ({ page }) => {
    await page.goto("/private-dialogue");
    await expect(page.locator("form")).toBeVisible();
  });
});

test("internal links from homepage are not broken", async ({
  page,
  request,
}) => {
  await page.goto("/");

  const paths = await page.$$eval(
    'a[href^="/"]',
    (anchors) => {
      const unique = new Set<string>();
      for (const a of anchors) {
        const href = a.getAttribute("href");
        if (!href || href === "#" || href.startsWith("#")) continue;
        const pathOnly = href.split("#")[0];
        if (pathOnly) unique.add(pathOnly);
      }
      return [...unique];
    }
  );

  expect(paths.length).toBeGreaterThan(0);

  for (const path of paths) {
    const res = await request.get(path);
    expect.soft(res.status(), `${path} → ${res.status()}`).toBeLessThan(400);
  }
});

test.describe("private dialogue form", () => {
  test("shows validation when submitting empty required fields", async ({
    page,
  }) => {
    await page.goto("/private-dialogue");
    await page.getByRole("button", { name: "Request Introduction" }).click();
    const nameInput = page.locator("#fullName");
    await expect(nameInput).toHaveJSProperty("validity.valid", false);
    await expect(nameInput).toHaveJSProperty("validity.valueMissing", true);
  });

  test("submits successfully when API returns ok", async ({ page }) => {
    await page.route(isIntroductionsPost, async (route) => {
      if (route.request().method() !== "POST") {
        await route.continue();
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/private-dialogue");
    const fullName = page.locator("form #fullName");
    const email = page.locator("form #email");
    await fullName.click();
    await fullName.pressSequentially("Test User");
    await email.click();
    await email.pressSequentially("test.user@example.com");
    await expect(fullName).toHaveValue("Test User");
    await expect(email).toHaveValue("test.user@example.com");

    await page.getByRole("button", { name: "Request Introduction" }).click();

    await expect(
      page.getByRole("heading", { name: /Thank you/i })
    ).toBeVisible();
    await expect(
      page.getByText(/24.?48 hours|in touch within/i)
    ).toBeVisible();
  });

  test("shows failure after API error response", async ({ page }) => {
    await page.route(isIntroductionsPost, async (route) => {
      if (route.request().method() !== "POST") {
        await route.continue();
        return;
      }
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          ok: false,
          error: { code: "TEST", message: "Service temporarily unavailable." },
        }),
      });
    });

    await page.goto("/private-dialogue");
    const fullName = page.locator("form #fullName");
    const email = page.locator("form #email");
    await fullName.click();
    await fullName.pressSequentially("Test User");
    await email.click();
    await email.pressSequentially("error.case@example.com");
    await expect(fullName).toHaveValue("Test User");
    await expect(email).toHaveValue("error.case@example.com");

    await page.getByRole("button", { name: "Request Introduction" }).click();

    await expect(page.getByRole("heading", { name: /Thank you/i })).toHaveCount(
      0
    );
    const submitError = page.locator("#private-dialogue-form-error");
    await expect(submitError).toBeVisible();
    await expect(submitError).toHaveAttribute("role", "alert");
    await expect(submitError).toHaveAttribute("aria-live", "assertive");
    await expect(submitError).toContainText(
      "Something went wrong. Please try again."
    );
  });
});
