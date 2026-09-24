import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  // calculate and display the item subtotal
  calculateItemSubTotal() {
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, price) => sum + Number(price), 0);

    const subtotalElement = document.querySelector(
      `${this.outputSelector} #orderSubtotal`,
    );
    if (subtotalElement) {
      subtotalElement.textContent = this.itemTotal.toFixed(2);
    }
  }

  // calculate and display tax, shipping, and order total
  calculateOrderTotal() {
    // tax: 6% of subtotal
    this.tax = this.itemTotal * 0.06;
    // shipping: $10 for first item + $2 for each additional
    const numItems = this.list.length;
    this.shipping = numItems > 0 ? 10 + (numItems - 1) * 2 : 0;
    // order total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #orderTax`);
    const shipping = document.querySelector(
      `${this.outputSelector} #orderShipping`,
    );
    const orderTotal = document.querySelector(
      `${this.outputSelector} #orderTotal`,
    );

    tax.textContent = this.tax.toFixed(2);
    shipping.textContent = this.shipping.toFixed(2);
    orderTotal.textContent = this.orderTotal.toFixed(2);
  }
}