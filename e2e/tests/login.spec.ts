import { expect } from "@playwright/test";
import { test } from "../fixtures/automationFixture";

test.describe("login scenarios", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
  });

  test("TC01 - Scenario A - Verify Correct Login", async ({
    loginPage,
    page,
    baseURL,
  }) => {
    await loginPage.attemptCorrectLogin();
    await expect(page).toHaveURL(baseURL!);
  });

  test("TC01 - Scenario B - Verify Incorrect Email Login", async ({
    loginPage,
    page,
  }) => {
    await loginPage.attemptIncorrectEmailLogin();
    await expect(page.getByText(loginPage.loginErrorText)).toBeVisible();
  });

  test("TC01 - Scenario C - Verify Incorrect Password Login", async ({
    loginPage,
    page,
  }) => {
    await loginPage.attemptIncorrectPasswordLogin();
    await expect(page.getByText(loginPage.loginErrorText)).toBeVisible();
  });
});
