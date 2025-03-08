$(document).ready(function () {
  // Load cart from localStorage or initialize empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartCounter = cart.length;

  // Hardcoded admin credentials
  const adminCredentials = {
      email: "admin@gmail.com",
      password: "admin@123"
  };

  // Update cart counter on page load
  updateCartCounter();

  // Smooth scrolling for anchor links
  $("a").on("click", function (event) {
      if (this.hash !== "" && !$(this).parent().hasClass('buy-now-btn') && !$(this).hasClass('modal-link')) {
          event.preventDefault();
          var hash = this.hash;
          $("html, body").animate(
              {
                  scrollTop: $(hash).offset().top,
              },
              800,
              function () {
                  window.location.hash = hash;
              }
          );
      }
  });

  // Close mobile menu when a link is clicked
  $(".menu-items a").click(function () {
      $("#checkbox").prop("checked", false);
  });

  // Handle "Buy Now" button clicks
  $(".buy-now-btn").click(function (event) {
      event.preventDefault();

      const product = $(this).closest(".best-p1");
      const productName = product.find(".name-of-p p").text();
      const productPrice = parseFloat(product.find(".price").text().replace("$", ""));
      const productImg = product.find("img").attr("src");

      const item = {
          name: productName,
          price: productPrice,
          image: productImg,
          quantity: 1
      };

      const existingItem = cart.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
          existingItem.quantity++;
      } else {
          cart.push(item);
          cartCounter++;
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCounter();
      
      alert(`Added to cart: ${productName} - $${productPrice}`);
  });

  // Update Cart Counter
  function updateCartCounter() {
      $(".cart-counter").text(cartCounter);
  }

  // Modal functionality
  const loginModal = $("#login-modal");
  const signupModal = $("#signup-modal");
  const loginLink = $("#login-link");
  const signupLink = $("#signup-link");
  const closeButtons = $(".close");
  const switchToSignup = $("#switch-to-signup");
  const switchToLogin = $("#switch-to-login");

  // Open Login Modal
  loginLink.click(function (event) {
      event.preventDefault();
      loginModal.show();
  });

  // Open Signup Modal
  signupLink.click(function (event) {
      event.preventDefault();
      signupModal.show();
  });

  // Close Modals
  closeButtons.click(function () {
      loginModal.hide();
      signupModal.hide();
  });

  // Switch between modals
  switchToSignup.click(function (event) {
      event.preventDefault();
      loginModal.hide();
      signupModal.show();
  });

  switchToLogin.click(function (event) {
      event.preventDefault();
      signupModal.hide();
      loginModal.show();
  });

  // Close modal when clicking outside
  $(window).click(function (event) {
      if (event.target == loginModal[0]) {
          loginModal.hide();
      }
      if (event.target == signupModal[0]) {
          signupModal.hide();
      }
  });

  // Handle Login Form Submission
  $("#login-form").submit(function (event) {
      event.preventDefault();
      const email = $("#login-email").val();
      const password = $("#login-password").val();

      if (email === adminCredentials.email && password === adminCredentials.password) {
          alert("Login successful! Welcome, Admin!");
          loginModal.hide();
          // You can add more logic here, like redirecting or showing admin features
      } else {
          alert("Invalid email or password. Please try again.");
      }
  });

  // Handle Signup Form Submission
  $("#signup-form").submit(function (event) {
      event.preventDefault();
      const email = $("#signup-email").val();
      const password = $("#signup-password").val();
      const confirmPassword = $("#signup-confirm-password").val();

      if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
      }

      const userData = {
          email: email,
          password: password
      };

      // Store in localStorage (for demo purposes)
      localStorage.setItem('user_' + email, JSON.stringify(userData));
      alert("Registration successful! You can now log in.");
      signupModal.hide();
      loginModal.show();
  });
});