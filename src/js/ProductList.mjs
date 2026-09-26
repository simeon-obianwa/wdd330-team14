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
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);

      if (list && list.length > 0) {
        this.renderList(list);
      } else {
        this.listElement.innerHTML = `<p class="error-message" style="grid-column: 1/-1; text-align: center;">No products found for "${this.category}".</p>`;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      this.listElement.innerHTML = `<p class="error-message" style="grid-column: 1/-1; text-align: center;">No products found. Please check your spelling or try a category like "tents" or "backpacks".</p>`;
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}