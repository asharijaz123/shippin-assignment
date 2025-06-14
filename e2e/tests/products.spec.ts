import { expect } from "@playwright/test";
import { test } from "../fixtures/automationFixture";

test.describe("product functionality scenarios", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.gotoProductsPage();
  });

  test("TC02 - Scenario A - Verify Search Products", async ({
    productsPage,
    page,
  }) => {
    await expect(page.getByText(productsPage.withoutSearchTitle)).toBeVisible();
    await productsPage.searchProduct();
    await expect(
      page.getByText(productsPage.withoutSearchTitle)
    ).not.toBeVisible();
    await expect(page.getByText(productsPage.withSearchTitle)).toBeVisible();
  });

  test("TC02 - Scenario B - Verify View Product", async ({
    productsPage,
    page,
    baseURL,
  }) => {
    await productsPage.viewFirstProduct();
    await expect(page).toHaveURL(/.*product_details.*/);
  });

  test("TC02 - Scenario C - Verify Add To Cart", async ({
    productsPage,
    page,
  }) => {
    await productsPage.addToCardFirstProduct();
    await expect(page.getByText(productsPage.addedToCardText)).toBeVisible();
  });

  test("TC02 - Scenario D - Continue shopping after adding to cart", async ({
    productsPage,
    page,
  }) => {
    await productsPage.addToCardFirstProduct();
    await productsPage.continueShoppingAfterAddingToCart();
    await productsPage.addToCardFirstProduct();
    await expect(page.getByText(productsPage.addedToCardText)).toBeVisible();
  });
});
