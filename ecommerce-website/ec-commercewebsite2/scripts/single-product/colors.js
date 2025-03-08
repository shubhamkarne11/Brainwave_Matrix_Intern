// scripts/single-product/colors.js
export function colorsFunc() {
    const colors = document.querySelectorAll(".color-wrapper");
  
    if (!colors.length) {
      console.warn("No color wrappers found on the page.");
      return;
    }
  
    colors.forEach((color) => {
      color.addEventListener("click", () => {
        colors.forEach((item) => item.classList.remove("active"));
        color.classList.add("active");
      });
    });
  }
  
  export default colorsFunc;