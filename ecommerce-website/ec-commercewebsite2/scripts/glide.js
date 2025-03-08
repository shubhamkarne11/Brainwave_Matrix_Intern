// scripts/glide.js
import Glide from "@glidejs/glide";

export function product1() {
  const productsContainer = document.getElementById("product-list");
  if (!productsContainer) {
    console.warn("Product list container not found for product1.");
    return;
  }

  new Glide(".product-carousel", {
    perView: 4,
    gap: 20,
    autoplay: 3000,
    bound: true,
    breakpoints: {
      992: { perView: 3 },
      768: { perView: 2 },
      576: { perView: 1 }
    }
  }).mount();
}

export function product2() {
  const productsContainer2 = document.getElementById("product-list-2");
  if (!productsContainer2) {
    console.warn("Product list container 2 not found for product2.");
    return;
  }

  new Glide(".product-carousel2", {
    perView: 3,
    gap: 20,
    bound: true,
    autoplay: 3000,
    breakpoints: {
      992: { perView: 2 }
    }
  }).mount();
}

export function product3() {
  new Glide(".product-thumb", {
    perView: 5,
    gap: 10,
    bound: true,
    breakpoints: {
      992: { perView: 3 }
    }
  }).mount();
}

export function campaignsCarousel() {
  const campaignsContainer = document.querySelector(".campaigns-carousel");
  if (!campaignsContainer) {
    console.warn("Campaigns carousel container not found.");
    return;
  }

  new Glide(".campaigns-carousel", {
    perView: 3,
    gap: 20,
    autoplay: 4000,
    bound: true,
    breakpoints: {
      992: { perView: 2 },
      576: { perView: 1 }
    }
  }).mount();
}

export function brandsCarousel() {
  const brandsContainer = document.querySelector(".brands-carousel");
  if (!brandsContainer) {
    console.warn("Brands carousel container not found.");
    return;
  }

  new Glide(".brands-carousel", {
    perView: 5,
    gap: 30,
    autoplay: 3000,
    bound: true,
    breakpoints: {
      992: { perView: 4 },
      768: { perView: 3 },
      576: { perView: 2 }
    }
  }).mount();
}

export default { product1, product2, product3, campaignsCarousel, brandsCarousel };