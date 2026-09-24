import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout");
myCheckout.init();

// calculate tax, shipping, and total once the user enters a zip code
document.querySelector("#zip").addEventListener("blur", () => {
  myCheckout.calculateOrderTotal();
});