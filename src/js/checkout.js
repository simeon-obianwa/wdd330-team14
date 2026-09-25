import { loadHeaderFooter, alertMessage } from "./utils.mjs";
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
    if (form.checkValidity()) {
      const response = await myCheckout.checkout(form);
      if (response && response.orderId) {
        localStorage.removeItem("so-cart");
        window.location.href = "/checkout/success.html";
      } else {
        // order failed — show a message
        alertMessage(
          "Something went wrong with your order. Please check your information and try again.",
        );
      }
    } else {
      form.reportValidity();
    }
  });
