// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// get a parameter value from the URL query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}
// render a list of items using a template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
// update the cart count badge in the header
export function renderCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const countElement = document.querySelector("#cart-count");
  if (!countElement) return;
  if (cartItems.length > 0) {
    countElement.textContent = cartItems.length;
  } else {
    countElement.textContent = "";
  }
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// fetch an HTML file and return its contents as a string
async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// load the header and footer partials into the page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement, null, renderCartCount);
  renderWithTemplate(footerTemplate, footerElement);
}
// display a custom alert message at the top of the main element
export function alertMessage(message, scroll = true, type = "error") {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add(`alert--${type}`);
  alert.innerHTML = `<p>${message}</p><span class="alert-close">X</span>`;

  const main = document.querySelector("main");

  alert.addEventListener("click", function (e) {
    if (e.target.classList.contains("alert-close")) {
      main.removeChild(this);
    }
  });

  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }

  // success messages auto-dismiss after a few seconds
  if (type === "success") {
    setTimeout(() => {
      if (alert.parentElement) {
        main.removeChild(alert);
      }
    }, 3000);
  }
}