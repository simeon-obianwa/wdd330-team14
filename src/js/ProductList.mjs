import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = []; 
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);

      if (list && list.length > 0) {
        this.products = list; 
        this.renderList(this.products);
      } else {
        this.listElement.innerHTML = `<p class="error-message" style="grid-column: 1/-1; text-align: center;">No products found for "${this.category}".</p>`;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      this.listElement.innerHTML = `<p class="error-message" style="grid-column: 1/-1; text-align: center;">No products found. Please check your spelling or try a category like "tents" or "backpacks".</p>`;
    }
  }

  renderList(list) {
    this.listElement.innerHTML = "";
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  sortProducts(criteria) {
    switch (criteria) {
      case "name-asc":
        this.products.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
        break;
      case "name-desc":
        this.products.sort((a, b) => b.NameWithoutBrand.localeCompare(a.NameWithoutBrand));
        break;
      case "price-asc":
        this.products.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case "price-desc":
        this.products.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
      default:
        break;
    }

    this.renderList(this.products);
  }
}