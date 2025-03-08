// scripts/single-product/thumbsActive.js
export function thumbsActiveFunc() {
    const thumbs = document.querySelectorAll(".gallery-thumbs .img-fluid");
    const singleImage = document.querySelector("#single-image");
  
    if (!thumbs.length || !singleImage) {
      console.warn("Thumbnail or single image element not found on the page.");
      return;
    }
  
    thumbs.forEach((item) => {
      item.addEventListener("click", () => {
        thumbs.forEach((image) => image.classList.remove("active"));
        singleImage.src = item.src;
        item.classList.add("active");
      });
    });
  }
  
  export default thumbsActiveFunc;