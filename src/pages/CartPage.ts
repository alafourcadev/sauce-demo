/**
 * Page Object: CartPage
 * Locators and selectors for the SauceDemo cart page
 */
export class CartPage {
  static readonly SELECTORS = {
    pageTitle: '.title',
    cartItem: '.cart_item',
    checkoutButton: '[data-test="checkout"]',
    continueShoppingButton: '[data-test="continue-shopping"]',
    removeButton: (productName: string) =>
      `[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`,
    cartQuantity: '.cart_quantity',
    inventoryItemName: '.inventory_item_name',
  };
}
