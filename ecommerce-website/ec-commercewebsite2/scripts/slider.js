// scripts/slider.js
import Glide from '@glidejs/glide';

document.addEventListener("DOMContentLoaded", () => {
  // Initialize hero slider
  new Glide('.slider', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay: 3000,
    hoverpause: true,
  }).mount();

  // Initialize featured products carousel
  new Glide('.product-carousel', {
    type: 'carousel',
    startAt: 0,
    perView: 4,
    autoplay: 3000,
    hoverpause: true,
    breakpoints: {
      768: { perView: 2 },
      576: { perView: 1 },
    },
  }).mount();

  // Initialize campaigns carousel
  new Glide('.campaigns-carousel', {
    type: 'carousel',
    startAt: 0,
    perView: 3,
    autoplay: 3000,
    hoverpause: true,
    breakpoints: {
      768: { perView: 2 },
      576: { perView: 1 },
    },
  }).mount();

  // Initialize brands carousel
  new Glide('.brands-carousel', {
    type: 'carousel',
    startAt: 0,
    perView: 5,
    autoplay: 3000,
    hoverpause: true,
    breakpoints: {
      768: { perView: 3 },
      576: { perView: 2 },
    },
  }).mount();
});