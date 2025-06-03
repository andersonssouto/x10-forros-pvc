function updateCurrentYear() {
  document.getElementById("currentYear").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".view-product-btn")) {
    setupProductButtons();
  } else if (document.getElementById("product-detail-container")) {
    loadProductDetail();
  }
  updateCurrentYear();
});
