document.addEventListener('DOMContentLoaded', () => {
    // Expanded Product Data
    const products = {
        men: [
            { id: 1, name: 'Denim Jacket', brand: 'Rugged', price: 89.99, image: 'img/img1.png', category: 'men' },
            { id: 2, name: 'Slim Fit Shirt', brand: 'Trendy', price: 39.99, image: 'img/img2.png', category: 'men' },
            { id: 3, name: 'Cargo Pants', brand: 'Urban', price: 59.99, image: 'img/img3.png', category: 'men' },
            { id: 4, name: 'Leather Boots', brand: 'Tough', price: 129.99, image: 'img/img4.png', category: 'men' },
            { id: 5, name: 'Hooded Sweatshirt', brand: 'Cozy', price: 49.99, image: 'img/img1.png', category: 'men' },
        ],
        women: [
            { id: 6, name: 'Floral Dress', brand: 'Chic', price: 69.99, image: 'img/img2.png', category: 'women' },
            { id: 7, name: 'High-Waist Jeans', brand: 'Vogue', price: 54.99, image: 'img/img3.png', category: 'women' },
            { id: 8, name: 'Silk Blouse', brand: 'Elegance', price: 79.99, image: 'img/img4.png', category: 'women' },
            { id: 9, name: 'Ankle Boots', brand: 'Stylish', price: 99.99, image: 'img/img1.png', category: 'women' },
            { id: 10, name: 'Cardigan', brand: 'Soft', price: 44.99, image: 'img/img2.png', category: 'women' },
        ],
        kids: [
            { id: 11, name: 'Dino T-Shirt', brand: 'Fun', price: 19.99, image: 'img/img3.png', category: 'kids' },
            { id: 12, name: 'Overalls', brand: 'Play', price: 29.99, image: 'img/img4.png', category: 'kids' },
            { id: 13, name: 'Sneakers', brand: 'Jump', price: 34.99, image: 'img/img1.png', category: 'kids' },
            { id: 14, name: 'Hoodie', brand: 'Warm', price: 24.99, image: 'img/img2.png', category: 'kids' },
            { id: 15, name: 'Raincoat', brand: 'Splash', price: 39.99, image: 'img/img3.png', category: 'kids' },
        ],
        accessories: [
            { id: 16, name: 'Leather Belt', brand: 'Luxury', price: 29.99, image: 'img/img4.png', category: 'accessories' },
            { id: 17, name: 'Sunglasses', brand: 'Shade', price: 49.99, image: 'img/img1.png', category: 'accessories' },
            { id: 18, name: 'Backpack', brand: 'Travel', price: 69.99, image: 'img/img2.png', category: 'accessories' },
            { id: 19, name: 'Watch', brand: 'TimeCo', price: 149.99, image: 'img/img3.png', category: 'accessories' },
            { id: 20, name: 'Scarf', brand: 'Warmth', price: 19.99, image: 'img/img4.png', category: 'accessories' },
        ],
        deals: [
            { id: 21, name: 'Shirt + Pants Combo', brand: 'Value', price: 79.99, image: 'img/img1.png', category: 'deals' },
            { id: 22, name: 'Dress + Bag Set', brand: 'Bargain', price: 89.99, image: 'img/img2.png', category: 'deals' },
            { id: 23, name: 'Kids Bundle', brand: 'Save', price: 49.99, image: 'img/img3.png', category: 'deals' },
            { id: 24, name: 'Accessories Pack', brand: 'Deal', price: 59.99, image: 'img/img4.png', category: 'deals' },
        ],
        trending: [
            { id: 25, name: 'Oversized Tee', brand: 'Hot', price: 34.99, image: 'img/img1.png', category: 'trending' },
            { id: 26, name: 'Chunky Sneakers', brand: 'Trend', price: 89.99, image: 'img/img2.png', category: 'trending' },
            { id: 27, name: 'Bucket Hat', brand: 'Cool', price: 24.99, image: 'img/img3.png', category: 'trending' },
            { id: 28, name: 'Statement Necklace', brand: 'Bold', price: 39.99, image: 'img/img4.png', category: 'trending' },
        ],
        clearance: [
            { id: 29, name: 'Old Stock Jacket', brand: 'Clear', price: 29.99, image: 'img/img1.png', category: 'clearance' },
            { id: 30, name: 'Summer Dress', brand: 'Out', price: 19.99, image: 'img/img2.png', category: 'clearance' },
            { id: 31, name: 'Old Sneakers', brand: 'Last', price: 24.99, image: 'img/img3.png', category: 'clearance' },
            { id: 32, name: 'Clearance Belt', brand: 'Gone', price: 9.99, image: 'img/img4.png', category: 'clearance' },
        ]
    };

    // Cart and Wishlist Management
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Slider Functionality
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    function updateSlider() {
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    setInterval(() => {
        currentSlide = (currentSlide + 1) % dots.length;
        updateSlider();
    }, 3000);

    // Render Products
    function renderProducts(category, containerId) {
        const container = document.getElementById(containerId);
        products[category].forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-brand">${product.brand}</p>
                    <p class="product-price">$${product.price}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="add-to-wishlist" data-id="${product.id}">Add to Wishlist</button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    renderProducts('men', 'menGrid');
    renderProducts('women', 'womenGrid');
    renderProducts('kids', 'kidsGrid');
    renderProducts('accessories', 'accessoriesGrid');
    renderProducts('deals', 'dealsGrid');
    renderProducts('trending', 'trendingGrid');
    renderProducts('clearance', 'clearanceGrid');

    // Cart Functionality
    const cartModal = document.getElementById('cartModal');
    const cartToggle = document.getElementById('cartToggle');
    const closeCartModal = document.getElementById('closeCartModal');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const product = Object.values(products).flat().find(p => p.id === item.id);
            total += product.price * item.quantity;
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h4>${product.name}</h4>
                    <p>$${product.price} x ${item.quantity}</p>
                    <button class="remove-item" data-id="${product.id}">Remove</button>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotal.textContent = total.toFixed(2);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Wishlist Functionality
    const wishlistModal = document.getElementById('wishlistModal');
    const wishlistToggle = document.getElementById('wishlistToggle');
    const closeWishlistModal = document.getElementById('closeWishlistModal');
    const wishlistItems = document.getElementById('wishlistItems');
    const wishlistCount = document.getElementById('wishlistCount');

    function updateWishlist() {
        wishlistItems.innerHTML = '';
        wishlist.forEach(item => {
            const product = Object.values(products).flat().find(p => p.id === item.id);
            const itemElement = document.createElement('div');
            itemElement.className = 'wishlist-item';
            itemElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h4>${product.name}</h4>
                    <p>$${product.price}</p>
                    <button class="remove-wishlist" data-id="${product.id}">Remove</button>
                    <button class="add-to-cart-from-wishlist" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            wishlistItems.appendChild(itemElement);
        });
        wishlistCount.textContent = wishlist.length;
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    // Event Listeners
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart') || e.target.classList.contains('add-to-cart-from-wishlist')) {
            const productId = parseInt(e.target.dataset.id);
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }
            updateCart();
        }

        if (e.target.classList.contains('add-to-wishlist')) {
            const productId = parseInt(e.target.dataset.id);
            if (!wishlist.some(item => item.id === productId)) {
                wishlist.push({ id: productId });
                updateWishlist();
            }
        }

        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.dataset.id);
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }

        if (e.target.classList.contains('remove-wishlist')) {
            const productId = parseInt(e.target.dataset.id);
            wishlist = wishlist.filter(item => item.id !== productId);
            updateWishlist();
        }
    });

    cartToggle.addEventListener('click', () => {
        cartModal.style.display = 'block';
        updateCart();
    });

    closeCartModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    wishlistToggle.addEventListener('click', () => {
        wishlistModal.style.display = 'block';
        updateWishlist();
    });

    closeWishlistModal.addEventListener('click', () => {
        wishlistModal.style.display = 'none';
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const allProducts = Object.values(products).flat();
        const filtered = allProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.brand.toLowerCase().includes(searchTerm)
        );

        ['menGrid', 'womenGrid', 'kidsGrid', 'accessoriesGrid', 'dealsGrid', 'trendingGrid', 'clearanceGrid'].forEach(id => {
            document.getElementById(id).innerHTML = '';
        });

        filtered.forEach(product => {
            const containerId = product.category + 'Grid';
            const container = document.getElementById(containerId);
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-brand">${product.brand}</p>
                    <p class="product-price">$${product.price}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="add-to-wishlist" data-id="${product.id}">Add to Wishlist</button>
                </div>
            `;
            container.appendChild(card);
        });
    });

    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Order placed successfully!');
            cart = [];
            updateCart();
            cartModal.style.display = 'none';
        } else {
            alert('Your cart is empty!');
        }
    });

    // Promo Button
    document.querySelector('.promo-btn').addEventListener('click', () => {
        document.getElementById('deals').scrollIntoView({ behavior: 'smooth' });
    });

    // Newsletter Subscription
    document.querySelector('.subscribe-btn').addEventListener('click', () => {
        const email = document.querySelector('.newsletter-input').value;
        if (email) {
            alert(`Subscribed successfully with ${email}!`);
            document.querySelector('.newsletter-input').value = '';
        } else {
            alert('Please enter a valid email address!');
        }
    });
});