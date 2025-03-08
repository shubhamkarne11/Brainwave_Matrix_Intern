// scripts/single-product/zoom.js
export function zoomFunc() {
    const singleImage = document.querySelector("#single-image");
    const singleImageWrapper = document.querySelector(".single-image-wrapper");
  
    if (!singleImage || !singleImageWrapper) {
      console.warn("Single image or wrapper not found on the page.");
      return;
    }
  
    singleImageWrapper.addEventListener("mousemove", (e) => {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
  
      singleImage.style.transformOrigin = `${x}px ${y}px`;
      singleImage.style.transform = "scale(3)";
    });
  
    singleImageWrapper.addEventListener("mouseleave", () => {
      singleImage.style.transformOrigin = "center";
      singleImage.style.transform = "scale(1)";
    });
  }
  
  export default zoomFunc;