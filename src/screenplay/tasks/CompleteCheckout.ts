import { Actor } from '../actors/Actor';
import { Click } from '../interactions/Click';
import { Fill } from '../interactions/Fill';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

/**
 * Task: CompleteCheckout
 * Complete the checkout process with customer information
 */
export class CompleteCheckout {
  private constructor(
    private firstName: string,
    private lastName: string,
    private postalCode: string
  ) {}

  static withInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): CompleteCheckout {
    return new CompleteCheckout(firstName, lastName, postalCode);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      // Go to cart
      Click.on(InventoryPage.SELECTORS.shoppingCartLink),
      // Click checkout
      Click.on(CartPage.SELECTORS.checkoutButton),
      // Fill customer information
      Fill.field(CheckoutPage.SELECTORS.firstNameInput).with(this.firstName),
      Fill.field(CheckoutPage.SELECTORS.lastNameInput).with(this.lastName),
      Fill.field(CheckoutPage.SELECTORS.postalCodeInput).with(this.postalCode),
      // Continue to overview
      Click.on(CheckoutPage.SELECTORS.continueButton),
      // Finish purchase
      Click.on(CheckoutPage.SELECTORS.finishButton)
    );
  }
}
