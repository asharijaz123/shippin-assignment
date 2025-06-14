import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class ViewCartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly checkoutButtonText = "Proceed To Checkout";

  private readonly registerLoginButtonText = "Register / Login";

  readonly loginBeforeCheckoutText =
    "Register / Login account to proceed on checkout.";

  private readonly checkoutModalLocator = "#checkoutModal";

  async proceedToCheckout() {
    const checkoutButton = this._page.getByText(this.checkoutButtonText);
    await checkoutButton.click();
  }

  async goToLoginPageFromCheckoutModal() {
    const checkOutModal = this._page.locator(this.checkoutModalLocator);
    const registerLoginButton = checkOutModal.getByRole("link", {
      name: this.registerLoginButtonText,
    });

    await registerLoginButton.click();
  }
}
