// scripts/cart.js
let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

function displayCartProduct() {
  const cartProduct = document.getElementById("cart-product");
  if (!cartProduct) {
    console.warn("Cart product container not found on the page.");
    return;
  }

  let results = "";
  cart.forEach((item) => {
    results += `
      <tr class="cart-item">
        <td></td>
        <td class="cart-image">
          <img src="${item.img.singleImage}" alt="${item.name}" data-id="${item.id}" class="cart-product-image">
          <i class="bi bi-x delete-cart" data-id="${item.id}"></i>
        </td>
        <td>${item.name}</td>
        <td>$${item.price.newPrice.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>$${(item.price.newPrice * item.quantity).toFixed(2)}</td>
      </tr>
    `;
  });
  cartProduct.innerHTML = results;
  removeCartItem();
  cartProductRoute();
}

function cartProductRoute() {
  const images = document.querySelectorAll(".cart-product-image");
  if (!images.length) {
    console.warn("No cart product images found on the page.");
    return;
  }

  images.forEach((image) => {
    image.addEventListener("click", (e) => {
      const imageId = e.target.dataset.id;
      localStorage.setItem("productId", Number(imageId));
      window.location.href = "product-details.html";
    });
  });
}

function removeCartItem() {
  const btnDeleteCart = document.querySelectorAll(".delete-cart");
  const cartItem = document.querySelector(".header-cart-count");
  if (!btnDeleteCart.length || !cartItem) {
    console.warn("Delete cart buttons or cart count element not found.");
    return;
  }

  btnDeleteCart.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      cart = cart.filter((item) => item.id !== Number(id));
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartProduct();
      cartItem.textContent = cart.length;
      saveCardValues();
    });
  });
}

function saveCardValues() {
  const cartTotal = document.getElementById("cart-total");
  const subTotal = document.getElementById("subtotal");
  const fastCargo = document.getElementById("fast-cargo");
  if (!cartTotal || !subTotal || !fastCargo) {
    console.warn("Cart total or subtotal elements not found.");
    return;
  }

  const fastCargoPrice = 15;
  let itemsTotal = 0;
  cart.forEach((item) => (itemsTotal += item.price.newPrice * item.quantity));
  subTotal.textContent = `$${itemsTotal.toFixed(2)}`;
  cartTotal.textContent = `$${itemsTotal.toFixed(2)}`;

  fastCargo.addEventListener("change", (e) => {
    if (e.target.checked) {
      cartTotal.textContent = `$${(itemsTotal + fastCargoPrice).toFixed(2)}`;
    } else {
      cartTotal.textContent = `$${itemsTotal.toFixed(2)}`;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayCartProduct();
  saveCardValues();
});

export { displayCartProduct, removeCartItem, saveCardValues, cartProductRoute };
export default { displayCartProduct, removeCartItem, saveCardValues, cartProductRoute };