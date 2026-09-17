import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";
import { renderCartCount } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const alert = new Alert();

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const myList = new ProductList("tents", dataSource, listElement);
myList.init();

renderCartCount();