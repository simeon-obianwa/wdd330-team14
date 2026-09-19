import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Newsletter from "./newsletter.js";
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

document.addEventListener("submit", (e) => {
    if (e.target && e.target.id === "search-form") {
        e.preventDefault();

        const searchInput = document.getElementById("search-input");
        const query = searchInput.value.trim();

        if (query) {
            const encodedQuery = encodeURIComponent(query);
            window.location.href = `/product_listing/?search=${encodedQuery}`;
        }
    }
});