import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class PaymentDonePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly orderPlacedLocator = '[data-qa="order-placed"]';

  readonly orderPlacedConfirmText =
    "Congratulations! Your order has been confirmed!";

  readonly continueButtonText = "Continue";

  async continueAfterConfirm() {
    const continueButton = this._page.getByText(this.continueButtonText);
    await continueButton.click();
  }
}
