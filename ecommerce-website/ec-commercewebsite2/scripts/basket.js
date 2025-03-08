// scripts/basket.js

document.addEventListener("DOMContentLoaded", () => {
    const basketItemsContainer = document.getElementById("basket-items");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const subtotalAmount = document.getElementById("subtotal-amount");
    const basketTotal = document.getElementById("basket-total");
    const remainingAmount = document.getElementById("remaining-amount");
    const progressFill = document.getElementById("progress-fill");
    const expressShipping = document.getElementById("express-shipping");
    const applyDiscountBtn = document.getElementById("apply-discount");
    const discountCodeInput = document.getElementById("discount-code");
    const refreshBasketBtn = document.getElementById("refresh-basket");
    const proceedToPaymentBtn = document.getElementById("proceed-to-payment");
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let discount = 0;
  
    // Free shipping threshold
    const FREE_SHIPPING_THRESHOLD = 75;
  
    // Function to render cart items
    const renderCart = () => {
      basketItemsContainer.innerHTML = "";
      if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
        basketItemsContainer.parentElement.style.display = "none";
        subtotalAmount.textContent = "$0.00";
        basketTotal.textContent = "$0.00";
        remainingAmount.textContent = `$${FREE_SHIPPING_THRESHOLD.toFixed(2)}`;
        progressFill.style.width = "0%";
        return;
      }
  
      emptyCartMessage.style.display = "none";
      basketItemsContainer.parentElement.style.display = "block";
  
      cart.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="item-preview">
            <i class="bi bi-x-circle remove-item" data-index="${index}"></i>
          </td>
          <td class="item-preview">
            <img src="img/products/product${item.id}.jpg" alt="${item.title}">
          </td>
          <td class="item-name">${item.title}</td>
          <td class="item-price">$${item.price.toFixed(2)}</td>
          <td class="item-quantity">
            <div class="quantity-control">
              <button class="decrease" data-index="${index}">-</button>
              <input type="number" value="${item.quantity}" min="1" data-index="${index}" readonly>
              <button class="increase" data-index="${index}">+</button>
            </div>
          </td>
          <td class="item-total">$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        basketItemsContainer.appendChild(row);
      });
  
      updateSummary();
    };
  
    // Function to update the summary (subtotal, shipping, total)
    const updateSummary = () => {
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shippingCost = expressShipping.checked ? 12 : 0;
      const total = subtotal - discount + shippingCost;
  
      // Update UI
      subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
      basketTotal.textContent = `$${total.toFixed(2)}`;
  
      // Update free shipping progress
      const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
      remainingAmount.textContent = `$${remaining.toFixed(2)}`;
      const progressPercentage = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
      progressFill.style.width = `${progressPercentage}%`;
  
      // Update cart count in header
      const cartCount = document.querySelector(".cart-count");
      if (cartCount) {
        cartCount.textContent = cart.length;
      }
    };
  
    // Event listener for removing items
    basketItemsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    });
  
    // Event listener for quantity changes
    basketItemsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("increase") || e.target.classList.contains("decrease")) {
        const index = e.target.dataset.index;
        const item = cart[index];
  
        if (e.target.classList.contains("increase")) {
          item.quantity += 1;
        } else if (e.target.classList.contains("decrease") && item.quantity > 1) {
          item.quantity -= 1;
        }
  
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    });
  
    // Event listener for express shipping checkbox
    expressShipping.addEventListener("change", updateSummary);
  
    // Event listener for applying discount
    applyDiscountBtn.addEventListener("click", () => {
      const code = discountCodeInput.value.trim().toUpperCase();
      if (code === "WINTER15") {
        discount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.15;
        alert("Discount applied! 15% off your subtotal.");
      } else {
        discount = 0;
        alert("Invalid discount code.");
      }
      updateSummary();
    });
  
    // Event listener for refreshing the basket
    refreshBasketBtn.addEventListener("click", () => {
      discount = 0;
      discountCodeInput.value = "";
      expressShipping.checked = false;
      renderCart();
    });
  
    // Event listener for proceeding to payment
    proceedToPaymentBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (cart.length === 0) {
        alert("Your cart is empty. Please add items to proceed.");
      } else {
        alert("Proceeding to payment... (This is a demo)");
        // In a real app, you'd redirect to a payment page or process the payment
      }
    });
  
    // Initial render
    renderCart();
  });