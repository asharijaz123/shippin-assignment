import { expect } from "@playwright/test";
import { test } from "../fixtures/automationFixture";

test.describe("shopping functionality scenarios", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("TC03 - Scenario A - Shopping without logging before and without viewing product", async ({
    productsPage,
    viewCartPage,
    loginPage,
    homePage,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    page,
    baseURL,
  }) => {
    await productsPage.gotoProductsPage();
    await productsPage.addToCardFirstProduct();
    await productsPage.viewCartFromAddedModal();

    await expect(page).toHaveURL(`${baseURL}view_cart`);
    await expect(
      page.getByText(" Shopping Cart", { exact: true })
    ).toBeVisible();

    await viewCartPage.proceedToCheckout();

    await expect(
      page.getByText(viewCartPage.loginBeforeCheckoutText)
    ).toBeVisible();

    await viewCartPage.goToLoginPageFromCheckoutModal();
    await loginPage.attemptCorrectLogin();

    await homePage.goToPage("CART_PAGE");
    await viewCartPage.proceedToCheckout();

    await expect(
      page.getByText(checkoutPage.checkoutPageTitle, { exact: true })
    ).toBeVisible();
    await expect(page).toHaveURL(`${baseURL}checkout`);

    await checkoutPage.placeOrder();

    await expect(
      page
        .getByRole("listitem")
        .filter({ hasText: paymentPage.paymentPageTitle })
    ).toBeVisible();

    await paymentPage.fillPaymentDetails();
    await paymentPage.confirmOrder();

    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/.*payment_done.*/);
    await expect(
      page.locator(paymentDonePage.orderPlacedLocator)
    ).toBeVisible();
    await expect(
      page.getByText(paymentDonePage.orderPlacedConfirmText, { exact: true })
    ).toBeVisible();

    await paymentDonePage.continueAfterConfirm();

    await expect(page).toHaveURL(baseURL!);
  });

  test("TC03 - Scenario B - Shopping without logging before and with viewing product", async ({
    productsPage,
    viewCartPage,
    loginPage,
    homePage,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    productDetailsPage,
    page,
    baseURL,
  }) => {
    await productsPage.gotoProductsPage();
    await productsPage.viewFirstProduct();

    await expect(page).toHaveURL(/.*product_details.*/);

    await productDetailsPage.addToCartFromProductDetails();

    await expect(
      page.getByText(productDetailsPage.addedToCartText)
    ).toBeVisible();

    await productDetailsPage.viewCartFromCartModal();

    await expect(page).toHaveURL(`${baseURL}view_cart`);
    await expect(
      page.getByText(" Shopping Cart", { exact: true })
    ).toBeVisible();

    await viewCartPage.proceedToCheckout();

    await expect(
      page.getByText(viewCartPage.loginBeforeCheckoutText)
    ).toBeVisible();

    await viewCartPage.goToLoginPageFromCheckoutModal();
    await loginPage.attemptCorrectLogin();

    await homePage.goToPage("CART_PAGE");
    await viewCartPage.proceedToCheckout();

    await expect(
      page.getByText(checkoutPage.checkoutPageTitle, { exact: true })
    ).toBeVisible();
    await expect(page).toHaveURL(`${baseURL}checkout`);

    await checkoutPage.placeOrder();

    await expect(
      page
        .getByRole("listitem")
        .filter({ hasText: paymentPage.paymentPageTitle })
    ).toBeVisible();

    await paymentPage.fillPaymentDetails();
    await paymentPage.confirmOrder();

    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/.*payment_done.*/);
    await expect(
      page.locator(paymentDonePage.orderPlacedLocator)
    ).toBeVisible();
    await expect(
      page.getByText(paymentDonePage.orderPlacedConfirmText, { exact: true })
    ).toBeVisible();

    await paymentDonePage.continueAfterConfirm();

    await expect(page).toHaveURL(baseURL!);
  });

  test("TC03 - Scenario C - Shopping with logging before and without viewing product", async ({
    productsPage,
    viewCartPage,
    loginPage,
    homePage,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    page,
    baseURL,
  }) => {
    await homePage.goToPage("LOGIN_PAGE");
    await loginPage.attemptCorrectLogin();

    await productsPage.gotoProductsPage();
    await productsPage.addToCardFirstProduct();
    await productsPage.viewCartFromAddedModal();

    await expect(page).toHaveURL(`${baseURL}view_cart`);
    await expect(
      page.getByText(" Shopping Cart", { exact: true })
    ).toBeVisible();

    await viewCartPage.proceedToCheckout();

    await homePage.goToPage("CART_PAGE");
    await viewCartPage.proceedToCheckout();

    await expect(
      page.getByText(checkoutPage.checkoutPageTitle, { exact: true })
    ).toBeVisible();
    await expect(page).toHaveURL(`${baseURL}checkout`);

    await checkoutPage.placeOrder();

    await expect(
      page
        .getByRole("listitem")
        .filter({ hasText: paymentPage.paymentPageTitle })
    ).toBeVisible();

    await paymentPage.fillPaymentDetails();
    await paymentPage.confirmOrder();

    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/.*payment_done.*/);
    await expect(
      page.locator(paymentDonePage.orderPlacedLocator)
    ).toBeVisible();
    await expect(
      page.getByText(paymentDonePage.orderPlacedConfirmText, { exact: true })
    ).toBeVisible();

    await paymentDonePage.continueAfterConfirm();

    await expect(page).toHaveURL(baseURL!);
  });

  test("TC03 - Scenario D - Shopping with logging before and with viewing product", async ({
    productsPage,
    viewCartPage,
    loginPage,
    homePage,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    productDetailsPage,
    page,
    baseURL,
  }) => {
    await homePage.goToPage("LOGIN_PAGE");
    await loginPage.attemptCorrectLogin();

    await productsPage.gotoProductsPage();
    await productsPage.viewFirstProduct();

    await expect(page).toHaveURL(/.*product_details.*/);

    await productDetailsPage.addToCartFromProductDetails();

    await expect(
      page.getByText(productDetailsPage.addedToCartText)
    ).toBeVisible();

    await productDetailsPage.viewCartFromCartModal();

    await expect(page).toHaveURL(`${baseURL}view_cart`);
    await expect(
      page.getByText(" Shopping Cart", { exact: true })
    ).toBeVisible();

    await viewCartPage.proceedToCheckout();

    await homePage.goToPage("CART_PAGE");
    await viewCartPage.proceedToCheckout();

    await expect(
      page.getByText(checkoutPage.checkoutPageTitle, { exact: true })
    ).toBeVisible();
    await expect(page).toHaveURL(`${baseURL}checkout`);

    await checkoutPage.placeOrder();

    await expect(
      page
        .getByRole("listitem")
        .filter({ hasText: paymentPage.paymentPageTitle })
    ).toBeVisible();

    await paymentPage.fillPaymentDetails();
    await paymentPage.confirmOrder();

    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/.*payment_done.*/);
    await expect(
      page.locator(paymentDonePage.orderPlacedLocator)
    ).toBeVisible();
    await expect(
      page.getByText(paymentDonePage.orderPlacedConfirmText, { exact: true })
    ).toBeVisible();

    await paymentDonePage.continueAfterConfirm();

    await expect(page).toHaveURL(baseURL!);
  });
});
