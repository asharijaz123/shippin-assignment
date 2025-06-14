import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly checkoutPageTitle = "Checkout";

  private readonly placeOrderButtonText = "Place Order";

  async placeOrder() {
    const placeOrderButton = this._page.getByText(this.placeOrderButtonText);
    await placeOrderButton.click();
    await this._page.waitForLoadState("networkidle");
  }
}
