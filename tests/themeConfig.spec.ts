import { test, expect } from "@playwright/test";

test("Pink theme works", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Dashboard" }).click();
  await page
    .locator("label")
    .filter({ hasText: "pink" })
    .locator("span")
    .first()
    .click();
  await page.getByRole("button", { name: "Salvar alterações" }).click();

  await page.goto("http://localhost:5173/");
  await page.reload();

  await expect(page).toHaveScreenshot({ fullPage: true });
});
