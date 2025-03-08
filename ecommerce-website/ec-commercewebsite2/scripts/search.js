// scripts/search.js
export default function searchFunc(data) {
    const searchWrapper = document.querySelector(".search-result .results");
    if (!searchWrapper) {
      console.warn("Search results wrapper not found.");
      return;
    }
  
    let result = "";
    data.forEach((item) => {
      result += `
        <a href="#" class="result-item" data-id="${item.id}">
          <img src="${item.img.singleImage}" class="search-thumb" alt="${item.name}">
          <div class="search-info">
            <h4>${item.name}</h4>
            <span class="search-sku">SKU : PD0016</span>
            <span class="search-price">$${item.price.newPrice.toFixed(2)}</span>
          </div>  
        </a>    
      `;
    });
    searchWrapper.innerHTML = result;
  
    function searchRouter() {
      const searchRoute = document.querySelectorAll(".results .result-item");
      if (!searchRoute.length) {
        console.warn("No search result items found.");
        return;
      }
  
      searchRoute.forEach((item) => {
        item.addEventListener("click", () => {
          const id = item.dataset.id;
          if (id) {
            localStorage.setItem("productId", Number(id));
            window.location.href = "product-details.html";
          }
        });
      });
    }
  
    const searchInput = document.querySelector(".modal-search .search input");
    if (!searchInput) {
      console.warn("Search input not found.");
      return;
    }
  
    let value = "";
    let filtered = [];
  
    searchInput.addEventListener("input", (e) => {
      value = e.target.value.trim().toLowerCase();
      filtered = data.filter((item) => item.name.trim().toLowerCase().includes(value));
      let result = "";
  
      if (filtered.length > 1) {
        filtered.forEach((item) => {
          result += `
            <a href="#" class="result-item" data-id="${item.id}">
              <img src="${item.img.singleImage}" class="search-thumb" alt="${item.name}">
              <div class="search-info">
                <h4>${item.name}</h4>
                <span class="search-sku">SKU : PD0016</span>
                <span class="search-price">$${item.price.newPrice.toFixed(2)}</span>
              </div>  
            </a>    
          `;
        });
        searchWrapper.innerHTML = result;
      } else if (filtered.length === 0) {
        searchWrapper.innerHTML = `
          <a href="/" class="result-item" style="justify-content: center">
            😔Aradığınız Ürün Bulunamadı😔
          </a>
        `;
      } else {
        filtered.forEach((item) => {
          result += `
            <a href="#" class="result-item" data-id="${item.id}">
              <img src="${item.img.singleImage}" class="search-thumb" alt="${item.name}">
              <div class="search-info">
                <h4>${item.name}</h4>
                <span class="search-sku">SKU : PD0016</span>
                <span class="search-price">$${item.price.newPrice.toFixed(2)}</span>
              </div>  
            </a>    
          `;
        });
        searchWrapper.innerHTML = result;
      }
  
      searchRouter();
    });
  
    searchRouter();
  }