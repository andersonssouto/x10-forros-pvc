document.addEventListener("DOMContentLoaded", function () {
  // Animações dos elementos (fade-in)
  const observerAnimation = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document
    .querySelectorAll(".fade-in")
    .forEach((el) => observerAnimation.observe(el));

  // Lazy-loading avançado das imagens
  const lazyImages = document.querySelectorAll("img.lazy");

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px 200px 0px" }
  );

  lazyImages.forEach((img) => imageObserver.observe(img));

  // Clique nos cards
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      if (e.target.classList.contains("btn")) {
        const productName = this.querySelector("h4").textContent;
        console.log(`Viewing product: ${productName}`);
      }
    });
  });
});
