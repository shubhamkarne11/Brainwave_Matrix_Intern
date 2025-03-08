// // scripts/main.js
// import headerFunc from "./header.js";
// import productFunc from "./product.js";
// import searchFunc from "./search.js";
// import { product1, product2 } from "./glide.js";

// (async () => {
//   try {
//     const response = await fetch("scripts/data.json");
//     const data = await response.json();

//     if (data) {
//       localStorage.setItem("products", JSON.stringify(data));
//       productFunc(data, "featured-items", "new-items"); // Pass both container IDs
//       searchFunc(data);
//     } else {
//       localStorage.setItem("products", JSON.stringify([]));
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     localStorage.setItem("products", JSON.stringify([]));
//   }

//   const cartItem = document.querySelector(".header-cart-count");
//   if (cartItem) {
//     cartItem.textContent = localStorage.getItem("cart")
//       ? JSON.parse(localStorage.getItem("cart")).length
//       : "0";
//   }

//   const modal = document.querySelector(".modal-dialog");
//   const modalContent = document.querySelector(".modal-dialog .modal-content");
//   const btnModalClose = document.querySelector(".modal-dialog .modal-close");

//   if (btnModalClose) {
//     btnModalClose.addEventListener("click", () => {
//       modal.classList.remove("show");
//     });
//   }

//   if (modal) {
//     document.addEventListener("click", (e) => {
//       if (!e.composedPath().includes(modalContent)) {
//         modal.classList.remove("show");
//       }
//     });

//     setTimeout(() => {
//       modal.classList.add("show");
//     }, 3000);
//   }

//   headerFunc();
//   product1();
//   product2();
// })();

// export default { headerFunc, productFunc, searchFunc, product1, product2 };



// scripts/main.js
import headerFunc from "./header.js";
import searchFunc from "./search.js";

(async () => {
  try {
    const response = await fetch("scripts/data.json");
    const data = await response.json();

    if (data) {
      localStorage.setItem("products", JSON.stringify(data));
      searchFunc(data);
    } else {
      localStorage.setItem("products", JSON.stringify([]));
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    localStorage.setItem("products", JSON.stringify([]));
  }

  const cartItem = document.querySelector(".cart-count");
  if (cartItem) {
    cartItem.textContent = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).length
      : "0";
  }

  headerFunc();
})();

export default { headerFunc, searchFunc };