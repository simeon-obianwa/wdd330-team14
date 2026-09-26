import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const searchQuery = getParam("search");

const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");

const rawQuery = category || searchQuery;
const query = rawQuery ? rawQuery.toLowerCase() : "";

const myList = new ProductList(query, dataSource, listElement);
myList.init();

const titleElement = document.querySelector(".title");
if (titleElement) {
  if (category) {
    const readable = category
      .replace("-", " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    titleElement.textContent = `Top Products: ${readable}`;
  } else if (searchQuery) {
    titleElement.textContent = `Search Results: "${searchQuery}"`;
  }
}

const sortSelect = document.getElementById("sort-select");
if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    myList.sortProducts(e.target.value);
  });
}