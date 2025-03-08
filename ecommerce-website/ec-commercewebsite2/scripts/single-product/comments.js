// scripts/single-product/comments.js
function commentReviewFunc() {
    const commentStars = document.querySelectorAll(".comment-form-rating .star");
  
    if (!commentStars.length) {
      console.warn("No comment stars found on the page.");
      return;
    }
  
    commentStars.forEach((star) => {
      star.addEventListener("click", (e) => {
        e.preventDefault();
        commentStars.forEach((item) => item.classList.remove("active"));
        star.classList.add("active");
        const activeStar = document.querySelectorAll(".comment-form-rating .star.active i");
        localStorage.setItem("stars", JSON.stringify(activeStar.length));
      });
    });
  }
  
  function addNewCommentFunc() {
    const commentText = document.getElementById("form-review");
    const commentName = document.getElementById("name");
    const commentButton = document.querySelector(".form-submit input");
    const commentList = document.querySelector(".comment-list");
  
    if (!commentText || !commentName || !commentButton || !commentList) {
      console.warn("Comment form elements not found on the page.");
      return;
    }
  
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let text = "";
    let name = "";
  
    commentText.addEventListener("input", (e) => {
      text = e.target.value;
    });
  
    commentName.addEventListener("input", (e) => {
      name = e.target.value;
    });
  
    commentButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (!text || !name) {
        alert("Please enter both your name and comment.");
        return;
      }
  
      const dateObj = new Date();
      const month = dateObj.getUTCMonth() + 1;
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      const starsNumber = Number(localStorage.getItem("stars")) || 0;
      const stars = Array(starsNumber).fill('<li><i class="bi bi-star-fill"></i></li>').join("");
  
      comments.push({ text, name, date: `${day}/${month}/${year}`, stars: starsNumber });
      localStorage.setItem("comments", JSON.stringify(comments));
  
      const result = comments
        .map(
          (item, index) => `
            <li class="comment-item">
              <div class="comment-avatar">
                <img src="img/avatars/avatar${(index % 5) + 1}.jpg" alt="${item.name}">
              </div>
              <div class="comment-text">
                <ul class="comment-stars">
                  ${item.stars ? Array(item.stars).fill('<li><i class="bi bi-star-fill"></i></li>').join("") : ""}
                </ul>
                <div class="comment-meta">
                  <strong>${item.name}</strong>
                  <span>-</span>
                  <time>${item.date}</time>
                </div>
                <div class="comment-description">
                  <p>${item.text}</p>
                </div>
              </div>
            </li>
          `
        )
        .join("");
  
      commentList.innerHTML = result;
      commentText.value = "";
      commentName.value = "";
      localStorage.removeItem("stars"); // Reset stars after submission
    });
  
    // Load existing comments on page load
    if (comments.length) {
      const result = comments
        .map(
          (item, index) => `
            <li class="comment-item">
              <div class="comment-avatar">
                <img src="img/avatars/avatar${(index % 5) + 1}.jpg" alt="${item.name}">
              </div>
              <div class="comment-text">
                <ul class="comment-stars">
                  ${item.stars ? Array(item.stars).fill('<li><i class="bi bi-star-fill"></i></li>').join("") : ""}
                </ul>
                <div class="comment-meta">
                  <strong>${item.name}</strong>
                  <span>-</span>
                  <time>${item.date}</time>
                </div>
                <div class="comment-description">
                  <p>${item.text}</p>
                </div>
              </div>
            </li>
          `
        )
        .join("");
      commentList.innerHTML = result;
    }
  }
  
  export function commentsFunc() {
    commentReviewFunc();
    addNewCommentFunc();
  }
  
  export default commentsFunc;