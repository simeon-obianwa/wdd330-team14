import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    const cart = getLocalStorage("so-cart") || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
    alertMessage(`${this.product.NameWithoutBrand} added to your cart!`, false, "success");
  }

  renderProductDetails() {
    const product = this.product;
    document.querySelector("#productBrand").textContent = product.Brand.Name;
    document.querySelector("#productName").textContent =
      product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryLarge;
    document.querySelector("#productImage").alt = product.NameWithoutBrand;
    document.querySelector("#productPrice").textContent =
      `$${product.FinalPrice}`;
    document.querySelector("#productColor").textContent =
      product.Colors[0].ColorName;
    document.querySelector("#productDesc").innerHTML =
      product.DescriptionHtmlSimple;
    this.renderDiscount();
    document.querySelector("#addToCart").textContent = "Add to Cart";
    document.querySelector("#addToCart").dataset.id = product.Id;
  }

  renderDiscount() {
    const product = this.product;
    const original = product.SuggestedRetailPrice;
    const final = product.FinalPrice;
    const originalEl = document.querySelector("#productOriginalPrice");
    const discountEl = document.querySelector("#productDiscount");

    // only show the indicator when the product is actually discounted
    if (!original || original <= final) {
      originalEl.hidden = true;
      discountEl.hidden = true;
      return;
    }

    const amountOff = original - final;
    const percentOff = Math.round((amountOff / original) * 100);

    originalEl.textContent = `$${original.toFixed(2)}`;
    discountEl.textContent = `${percentOff}% OFF - Save $${amountOff.toFixed(2)}`;
    originalEl.hidden = false;
    discountEl.hidden = false;
  }
}