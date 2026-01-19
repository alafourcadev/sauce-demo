/**
 * Page Object: InventoryPage
 * Locators and selectors for the SauceDemo inventory page
 */
export class InventoryPage {
  static readonly SELECTORS = {
    pageTitle: '.title',
    inventoryItem: '.inventory_item',
    addToCartButton: (productName: string) =>
      `[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`,
    removeButton: (productName: string) =>
      `[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`,
    shoppingCartBadge: '.shopping_cart_badge',
    shoppingCartLink: '.shopping_cart_link',
    productName: '.inventory_item_name',
  };
}
