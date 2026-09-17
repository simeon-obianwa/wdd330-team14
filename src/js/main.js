import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Newsletter from "./Newsletter.mjs"; 
import { renderCartCount } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const newsletter = new Newsletter('#newsletter-form', '#newsletter-message');

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

if (listElement) {
    const myList = new ProductList("tents", dataSource, listElement);
    myList.init();
}

renderCartCount();