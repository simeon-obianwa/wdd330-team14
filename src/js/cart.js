import { getLocalStorage, setLocalStorage, renderCartCount } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  addRemoveListeners();
}

function cartItemTemplate(item) {
  // fall back gracefully if fields are missing (e.g. older cart data)
  const image = item.Images?.PrimaryMedium || item.Image || "";
  const color = item.Colors?.[0]?.ColorName || "";
  const price = item.FinalPrice || "";

  const newItem = `<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${item.Id}" title="Remove item">X</span>
  <a href="#" class="cart-card__image">
    <img
      src="${image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${color}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${price}</p>
</li>`;

  return newItem;
}

function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart") || [];
  const index = cartItems.findIndex((item) => item.Id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
    renderCartCount();
  }
}

function addRemoveListeners() {
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      removeFromCart(id);
    });
  });
}

renderCartContents();
renderCartCount();
