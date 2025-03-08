// scripts/store.js
import Glide from '@glidejs/glide';
import { headerFunc } from './main.js';

document.addEventListener("DOMContentLoaded", () => {
  headerFunc(); // Initialize header functionality (navbar toggle, search)

  // Sample product data (replace with your own or fetch from an API)
  const featuredProducts = [
    { id: 1, name: "Winter Jacket", price: 99.99, image: "img/products/jacket.jpg" },
    { id: 2, name: "Smart Watch", price: 199.99, image: "img/products/watch.jpg" },
    { id: 3, name: "Cozy Blanket", price: 49.99, image: "img/products/blanket.jpg" },
    { id: 4, name: "Snow Boots", price: 79.99, image: "img/products/boots.jpg" },
  ];

  const newProducts = [
    { id: 5, name: "LED Lamp", price: 29.99, image: "img/products/lamp.jpg" },
    { id: 6, name: "Thermal Gloves", price: 19.99, image: "img/products/gloves.jpg" },
    { id: 7, name: "Portable Heater", price: 59.99, image: "img/products/heater.jpg" },
    { id: 8, name: "Winter Scarf", price: 14.99, image: "img/products/scarf.jpg" },
  ];

  // Function to populate products in a carousel
  const populateProducts = (products, containerSelector) => {
    const container = document.querySelector(`${containerSelector} .glide__slides`);
    products.forEach(product => {
      const productItem = document.createElement("li");
      productItem.classList.add("glide__slide", "product-item");
      productItem.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      `;
      container.appendChild(productItem);
    });
  };

  // Populate Featured Finds and New In Stock sections
  populateProducts(featuredProducts, ".featured-items");
  populateProducts(newProducts, ".new-items");

  // Initialize Glide.js carousels
  new Glide('.featured-items', {
    type: 'carousel',
    startAt: 0,
    perView: 4,
    autoplay: 3000,
    hoverpause: true,
    breakpoints: {
      768: { perView: 2 },
      576: { perView: 1 },
    },
  }).mount();

  new Glide('.new-items', {
    type: 'carousel',
    startAt: 0,
    perView: 4,
    autoplay: 3000,
    hoverpause: true,
    breakpoints: {
      768: { perView: 2 },
      576: { perView: 1 },
    },
  }).mount();

  // Combine all products for cart lookup
  const allProducts = [...featuredProducts, ...newProducts];

  // Add to Cart functionality
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      const product = allProducts.find(p => p.id === productId);

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find(item => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart count in navbar
      const cartCount = document.querySelector(".cart-count");
      if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
      }

      alert(`${product.name} added to cart!`);
    });
  });

  // Initialize cart count on page load
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
});

export default { headerFunc };