document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element);
  });

  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      mainImage.style.opacity = "0";

      setTimeout(() => {
        mainImage.src = this.dataset.image;
        mainImage.style.opacity = "1";
      }, 300);

      thumbnails.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
