// scripts/single-product/tabs.js
export function tabsFunc() {
    const btnTab = document.querySelectorAll(".tab-button");
    const content = document.querySelectorAll(".content");
    const tabButtons = document.querySelector(".tab-list");
  
    if (!btnTab.length || !content.length || !tabButtons) {
      console.warn("Tab elements not found on the page.");
      return;
    }
  
    tabButtons.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.dataset.id;
      if (id) {
        btnTab.forEach((button) => button.classList.remove("active"));
        e.target.classList.add("active");
        content.forEach((item) => item.classList.remove("active"));
        const element = document.getElementById(id);
        if (element) {
          element.classList.add("active");
        }
      }
    });
  
    const defaultTab = document.getElementById("desc");
    if (defaultTab) {
      defaultTab.classList.add("active");
      const defaultButton = document.querySelector(`.tab-button[data-id="desc"]`);
      if (defaultButton) defaultButton.classList.add("active");
    }
  }
  
  export default tabsFunc;