// scripts/single-product/values.js
export function valuesFunc() {
    const values = document.querySelectorAll(".values-list span");
  
    if (!values.length) {
      console.warn("No value elements found on the page.");
      return;
    }
  
    values.forEach((value) => {
      value.addEventListener("click", () => {
        values.forEach((item) => item.classList.remove("active"));
        value.classList.add("active");
      });
    });
  }
  
  export default valuesFunc;