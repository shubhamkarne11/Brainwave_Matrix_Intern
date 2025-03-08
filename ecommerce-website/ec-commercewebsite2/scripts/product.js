// scripts/product.js
import { product1, product2 } from "./glide.js";

export let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

function addToCart(products, containerId) {
  const cartItem = document.querySelector(".header-cart-count");
  const buttons = [...document.querySelectorAll(`#${containerId} .add-to-basket`)];
  if (!cartItem || !buttons.length) {
    console.warn(`Cart count or add-to-basket buttons not found for ${containerId}.`);
    return;
  }

  buttons.forEach((button) => {
    const inCart = cart.find((item) => item.id === Number(button.dataset.id));
    if (inCart) {
      button.setAttribute("disabled", "disabled");
    } else {
      button.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const findProduct = products.find((product) => product.id === Number(id));
        cart.push({ ...findProduct, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        button.setAttribute("disabled", "disabled");
        cartItem.textContent = cart.length;
      });
    }
  });
}

function productRoute(containerId) {
  const productLink = document.querySelectorAll(`#${containerId} .item-name`);
  if (!productLink.length) {
    console.warn(`Product links not found for ${containerId}.`);
    return;
  }

  productLink.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.dataset.id;
      localStorage.setItem("productId", JSON.stringify(id));
      window.location.href = "product-details.html";
    });
  });
}

function productImageRoute(containerId) {
  const productImageLink = document.querySelectorAll(`#${containerId} .item-image .img2`);
  if (!productImageLink.length) {
    console.warn(`Product image links not found for ${containerId}.`);
    return;
  }

  productImageLink.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const id = item.dataset.id;
      localStorage.setItem("productId", JSON.stringify(id));
      window.location.href = "product-details.html";
    });
  });
}

export default function productFunc(products, featuredId = "featured-items", newId = "new-items") {
  const featuredContainer = document.getElementById(featuredId);
  const newContainer = document.getElementById(newId);
  if (!featuredContainer && !newContainer) {
    console.warn("Product containers not found.");
    return;
  }

  const renderProducts = (container, data) => {
    let results = "";
    data.forEach((product) => {
      results += `
        <li class="item glide__slide">
          <div class="item-image">
            <a href="#">
              <img src="${product.img.singleImage}" alt="${product.name}" class="img1" />
              <img src="${product.img.thumbs[1]}" alt="${product.name} Hover" class="img2" data-id="${product.id}" />
            </a>
          </div>
          <div class="item-details">
            <a href="#" class="item-name" data-id="${product.id}">${product.name}</a>
            <ul class="item-rating">
              <li><i class="bi bi-star-fill"></i></li>
              <li><i class="bi bi-star-fill"></i></li>
              <li><i class="bi bi-star-fill"></i></li>
              <li><i class="bi bi-star-fill"></i></li>
              <li><i class="bi bi-star${product.rating < 4.5 ? '' : '-fill'}"></i></li>
            </ul>
            <div class="item-pricing">
              <strong class="current-price">$${product.price.newPrice.toFixed(2)}</strong>
              <span class="original-price">$${product.price.oldPrice.toFixed(2)}</span>
            </div>
            <span class="item-discount">-${product.discount}%</span>
            <div class="item-actions">
              <button class="add-to-basket" data-id="${product.id}">
                <i class="bi bi-bag-fill"></i>
              </button>
              <button><i class="bi bi-heart-fill"></i></button>
              <a href="#" data-id="${product.id}"><i class="bi bi-eye-fill"></i></a>
              <a href="#"><i class="bi bi-share-fill"></i></a>
            </div>
          </div>
        </li>
      `;
    });
    container.querySelector(".glide__slides").innerHTML = results;
    addToCart(products, featuredId);
    productRoute(featuredId);
    productImageRoute(featuredId);
  };

  if (featuredContainer) renderProducts(featuredContainer, products.slice(0, 4)); // First 4 items for featured
  if (newContainer) renderProducts(newContainer, products.slice(4, 8)); // Next 4 items for new
  product1();
  product2();
}