$(document).ready(function () {
    // Load cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCounter = cart.length;

    // Update UI on page load
    updateCartUI();

    // Close mobile menu when a link is clicked
    $(".menu-items a").click(function () {
        $("#checkbox").prop("checked", false);
    });

    // Clear cart
    $(".clear-cart").click(function () {
        cart = [];
        cartCounter = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    });

    // Checkout button (placeholder)
    $(".checkout-btn").click(function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Proceeding to checkout... (This is a demo)");
            // Here you would typically redirect to a checkout page
        }
    });

    // Update Cart UI
    function updateCartUI() {
        $(".cart-counter").text(cartCounter);
        const cartItemsContainer = $(".cart-items");
        cartItemsContainer.empty();

        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.html("<p>Your cart is empty!</p>");
        } else {
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const cartItem = `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" style="width: 50px;">
                        <div class="cart-item-details">
                            <p>${item.name}</p>
                            <p>$${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                        </div>
                    </div>
                `;
                cartItemsContainer.append(cartItem);
            });
        }

        $("#cart-total-amount").text(total.toFixed(2));
    }
});