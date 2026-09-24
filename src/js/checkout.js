import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout");
myCheckout.init();

// calculate tax, shipping, and total once the user enters a zip code
document.querySelector("#zip").addEventListener("blur", () => {
  myCheckout.calculateOrderTotal();
});

// handle the form submission
document
  .querySelector("#checkoutForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    // browser validation: only proceed if all required fields are filled
    if (form.checkValidity()) {
      const response = await myCheckout.checkout(form);
      console.log(response);
    }
  });
