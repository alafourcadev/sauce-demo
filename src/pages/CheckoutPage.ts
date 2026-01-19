/**
 * Page Object: CheckoutPage
 * Locators and selectors for the SauceDemo checkout pages
 */
export class CheckoutPage {
  static readonly SELECTORS = {
    // Step 1: Your Information
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    postalCodeInput: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    cancelButton: '[data-test="cancel"]',

    // Step 2: Overview
    pageTitle: '.title',
    finishButton: '[data-test="finish"]',
    summarySubtotal: '.summary_subtotal_label',
    summaryTax: '.summary_tax_label',
    summaryTotal: '.summary_total_label',
    cartItem: '.cart_item',

    // Step 3: Complete
    completeHeader: '.complete-header',
    completeText: '.complete-text',
    backHomeButton: '[data-test="back-to-products"]',
  };
}
