import { Actor } from '../actors/Actor';
import { Click } from '../interactions/Click';
import { InventoryPage } from '../../pages/InventoryPage';

/**
 * Task: AddProductToCart
 * Add a product to the shopping cart
 */
export class AddProductToCart {
  private constructor(private productName: string) {}

  static named(productName: string): AddProductToCart {
    return new AddProductToCart(productName);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Click.on(InventoryPage.SELECTORS.addToCartButton(this.productName))
    );
  }
}
