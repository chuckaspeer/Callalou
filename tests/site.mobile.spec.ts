import { test, expect } from "@playwright/test";

test.describe("mobile layout", () => {
  test("homepage stays usable; CTA visible; key route reachable", async ({
    page,
  }) => {
    const res = await page.goto("/");
    expect(res?.ok()).toBeTruthy();

    await expect(page.getByRole("navigation")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Begin a Private Dialogue/i }).first()
    ).toBeVisible();

    const menuButton = page.getByRole("button", {
      name: /menu|navigation|open(\s+main)?\s+menu/i,
    });
    if ((await menuButton.count()) > 0 && (await menuButton.first().isVisible())) {
      await menuButton.first().click();
      await expect(
        page
          .getByRole("link", {
            name: /Privacy Policy|Terms of Service|Private Dialogue|^Contact$/i,
          })
          .first()
      ).toBeVisible();
    }

    const privacy = page
      .locator("footer")
      .getByRole("link", { name: "Privacy Policy" });
    await privacy.scrollIntoViewIfNeeded();
    await privacy.click();

    await expect(
      page.getByRole("heading", { name: /Privacy Policy/i })
    ).toBeVisible();
  });
});
