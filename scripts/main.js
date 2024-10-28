document.getElementById("savePreferences").addEventListener("click", () => {
    // Save preferences in localStorage or send to backend (placeholder for API)
    alert("Preferences saved!");
  });
  
  document.getElementById("submitReview").addEventListener("click", () => {
    const reviewText = document.querySelector("#reviews textarea").value;
    if (reviewText) {
      const reviewList = document.getElementById("reviewList");
      const newReview = document.createElement("p");
      newReview.textContent = reviewText;
      reviewList.appendChild(newReview);
      document.querySelector("#reviews textarea").value = '';
    }
  });
  