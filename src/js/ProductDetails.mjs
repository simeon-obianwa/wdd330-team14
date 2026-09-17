import { setLocalStorage, getLocalStorage } from "./utils.mjs";

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
    document.querySelector("#addToCart").textContent = "Add to Cart";
    document.querySelector("#addToCart").dataset.id = product.Id;
  }
}