import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");
});

test("Check main features are visible", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Clínica Odontológica" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Entre em contato!" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Localização" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Contato", exact: true })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Localização" })).toBeVisible();
  await expect(
    page.getByText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i"
    )
  ).toBeVisible();
  await expect(
    page.getByText("Rua 15 de Novembro, 1234 - Centro - Iacanga/SP")
  ).toBeVisible();
  await expect(
    page.getByText("© 2023 Vai De Digital! Todos os direitos reservados")
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Banner principal" })
  ).toBeVisible();

  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("Dashboard works", async ({ page }) => {
  // 1. Alterando configurações no Dashboard
  await page.getByRole("link", { name: "Dashboard" }).click();

  await page.getByRole("heading", { name: "Cabeçalho" }).click();
  await page.getByPlaceholder("Título do cabeçalho").fill("Teste");

  await page.getByLabel("Remover link Contato").click();
  await page.getByLabel("Remover link Localização").click();

  await page.getByPlaceholder("Texto de introdução").fill("Texto principal");
  await page
    .getByLabel("Banner")
    .setInputFiles("tests/assets/vaidedigital-logo.png");

  await page
    .getByPlaceholder("Embed do Google Maps")
    .fill(
      '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29615.687963559292!2d-49.01794221691894!3d-21.89757770618606!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bf239b2d6feae7%3A0x8bba34cd8ce185c3!2sCanafort!5e0!3m2!1spt-BR!2sbr!4v1693924648516!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    );

  await page.getByPlaceholder("Descrição da localização").fill("canafort");

  await page
    .getByPlaceholder("Texto do rodapé")
    .fill("© 2023 Vai De Digital! Todos os direitos reservados!");

  await page.getByRole("button", { name: "Salvar alterações" }).click();

  // 2. Verificando alterações na Home

  // recarregando a página deve manter as alterações
  await page.reload();

  await page.getByRole("link", { name: "Home" }).click();

  await expect(
    page.getByRole("link", { name: "Contato", exact: true })
  ).not.toBeVisible();
  await expect(
    page.getByRole("link", { name: "Localização" })
  ).not.toBeVisible();
  await expect(
    page.getByText("Texto principal", { exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Entre em contato!" })
  ).toBeVisible();
  await expect(page.getByText("canafort")).toBeVisible();
  await expect(
    page.getByRole("img", {
      name: "Banner principal",
    })
  ).toHaveAttribute("src", /^data:image\/png;base64,/);
  await expect(
    page.getByText("© 2023 Vai De Digital! Todos os direitos reservados!", {
      exact: true,
    })
  ).toBeVisible();

  await expect(page).toHaveScreenshot({ fullPage: true });
});
