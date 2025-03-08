// scripts/product-details.js
import { product3 } from "./glide.js";
import thumbsActiveFunc from "./single-product/thumbsActive.js";
import zoomFunc from "./single-product/zoom.js";
import colorsFunc from "./single-product/colors.js";
import valuesFunc from "./single-product/values.js";
import tabsFunc from "./single-product/tabs.js";
import commentsFunc from "./single-product/comments.js";

document.addEventListener("DOMContentLoaded", () => {
  const productId = localStorage.getItem("productId")
    ? JSON.parse(localStorage.getItem("productId"))
    : localStorage.setItem("productId", JSON.stringify(1));

  const products = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : localStorage.setItem("products", JSON.stringify([]));

  const findProduct = products.find((item) => item.id === Number(productId));
  if (!findProduct) {
    console.error("Product not found.");
    return;
  }

  /* Product title */
  const productTitle = document.querySelector(".product-title");
  if (productTitle) productTitle.textContent = findProduct.name;

  /* Product price */
  const productOldPrice = document.querySelector(".old-price");
  const productNewPrice = document.querySelector(".new-price");
  if (productOldPrice) productOldPrice.textContent = `$${findProduct.price.oldPrice.toFixed(2)}`;
  if (productNewPrice) productNewPrice.textContent = `$${findProduct.price.newPrice.toFixed(2)}`;

  /* Product gallery */
  const singleImage = document.getElementById("single-image");
  if (singleImage) singleImage.src = findProduct.img.singleImage;

  /* Gallery thumbs */
  const galleryThumbs = document.querySelector(".gallery-thumbs .glide__slides");
  if (galleryThumbs) {
    let result = "";
    findProduct.img.thumbs.forEach((item) => {
      result += `
        <li class="glide__slide">
          <img src="${item}" class="img-fluid" alt="${findProduct.name}">
        </li>
      `;
    });
    galleryThumbs.innerHTML = result;
    thumbsActiveFunc();
    product3();
  }

  /* Thumbs active */
  const productThumbs = document.querySelectorAll(".product-thumb .glide__slide img");
  if (productThumbs.length) productThumbs[0].classList.add("active");

  /* Add to cart */
  const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  const btnAddCart = document.getElementById("add-to-cart");
  const quantity = document.getElementById("quantity");
  const cartItem = document.querySelector(".header-cart-count");

  if (btnAddCart && quantity && cartItem) {
    const findCart = cart.find((item) => item.id === findProduct.id);
    if (findCart) {
      btnAddCart.setAttribute("disabled", "disabled");
      btnAddCart.style.opacity = "0.4";
      btnAddCart.style.cursor = "no-drop";
    } else {
      btnAddCart.addEventListener("click", () => {
        cart.push({ ...findProduct, quantity: Number(quantity.value) });
        localStorage.setItem("cart", JSON.stringify(cart));
        btnAddCart.setAttribute("disabled", "disabled");
        btnAddCart.style.opacity = "0.4";
        btnAddCart.style.cursor = "no-drop";
        cartItem.textContent = cart.length;
      });
    }
  }

  // Initialize additional features
  colorsFunc();
  valuesFunc();
  tabsFunc();
  commentsFunc();
  zoomFunc();
});