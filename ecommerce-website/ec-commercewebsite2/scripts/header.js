// scripts/header.js
export default function headerFunc() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navClose = document.getElementById("nav-close");
  const searchToggle = document.querySelector(".search-toggle");
  const searchOverlay = document.querySelector(".search-overlay");
  const searchClose = document.querySelector("#search-close");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  if (navClose && navMenu) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  }

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener("click", () => {
      searchOverlay.style.display = "flex";
    });
  }

  if (searchClose && searchOverlay) {
    searchClose.addEventListener("click", () => {
      searchOverlay.style.display = "none";
    });
  }

  // Close search overlay on outside click
  document.addEventListener("click", (e) => {
    if (searchOverlay && !searchOverlay.contains(e.target) && e.target !== searchToggle) {
      searchOverlay.style.display = "none";
    }
  });
}