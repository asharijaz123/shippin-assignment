import { test as base } from "@playwright/test";
import { LoginPage } from "../page-object-models/login-page";
import { ProductsPage } from "../page-object-models/products-page";
import { ViewCartPage } from "../page-object-models/view-cart-page";
import { HomePage } from "../page-object-models/home-page";
import { CheckoutPage } from "../page-object-models/checkout-page";
import { PaymentPage } from "../page-object-models/payment-page";
import { PaymentDonePage } from "../page-object-models/payment-done-page";
import { ProductDetailsPage } from "../page-object-models/product-details-page";

type automationFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  viewCartPage: ViewCartPage;
  homePage: HomePage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  paymentDonePage: PaymentDonePage;
  productDetailsPage: ProductDetailsPage;
};

export const test = base.extend<automationFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  viewCartPage: async ({ page }, use) => {
    await use(new ViewCartPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  paymentDonePage: async ({ page }, use) => {
    await use(new PaymentDonePage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
});
