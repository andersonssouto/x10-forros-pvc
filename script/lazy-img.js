const lazyHero = document.querySelector(".hero.lazy-bg");

if ("IntersectionObserver" in window && lazyHero) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const isMobile = window.innerWidth <= 548;
        const bg = isMobile ? lazyHero.dataset.bgMobile : lazyHero.dataset.bg;

        lazyHero.style.backgroundImage = `url('${bg}')`;
        lazyHero.classList.add("bg-loaded");
        observer.unobserve(lazyHero);
      }
    });
  });

  observer.observe(lazyHero);
}
