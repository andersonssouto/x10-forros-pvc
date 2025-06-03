const menuToggle = document.querySelector(".header__menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.querySelector(".back-to-top");
const currentYearEl = document.getElementById("currentYear");
const contactForm = document.getElementById("contactForm");
const testimonialTrack = document.querySelector(".testimonials__track");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialDots = document.querySelectorAll(".testimonials__dots span");
const prevButton = document.querySelector(".testimonials__prev");
const nextButton = document.querySelector(".testimonials__next");

function setupMobileMenu() {
  const mobileMenu = document.createElement("div");
  mobileMenu.classList.add("mobile-menu");

  const closeButton = document.createElement("button");
  closeButton.classList.add("mobile-menu__close");
  closeButton.innerHTML = '<i class="fas fa-times"></i>';
  mobileMenu.appendChild(closeButton);

  const navClone = document.querySelector(".header__nav ul").cloneNode(true);
  mobileMenu.appendChild(navClone);

  document.body.appendChild(mobileMenu);

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  closeButton.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .scale-in"
  );

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
    { threshold: 0.1 }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

function setupScrollSpy() {
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
}

function setupBackToTop() {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function setupTestimonialsSlider() {
  let currentSlide = 0;
  const slideWidth = testimonialCards[0].offsetWidth;

  testimonialTrack.style.transform = `translateX(0)`;
  function updateDots() {
    testimonialDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    goToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide =
      (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
    goToSlide(currentSlide);
  }

  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  let slideInterval = setInterval(nextSlide, 5000);

  testimonialTrack.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  testimonialTrack.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
}

function setupContactForm() {
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !phone || !message) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      submitButton.disabled = true;
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      setTimeout(() => {
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        contactForm.reset();
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }, 1500);
    });
  }
}

function setupPortfolioHover() {
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const overlay = item.querySelector(".portfolio-item__overlay");
      overlay.style.transform = "translateY(0)";
    });

    item.addEventListener("mouseleave", () => {
      const overlay = item.querySelector(".portfolio-item__overlay");
      overlay.style.transform = "translateY(100%)";
    });
  });
}

function setCurrentYear() {
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupScrollAnimations();
  setupScrollSpy();
  setupBackToTop();
  setupTestimonialsSlider();
  setupContactForm();
  setupPortfolioHover();
  setCurrentYear();

  setTimeout(() => {
    document
      .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")
      .forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          const delay = el.dataset.delay || 0;
          setTimeout(() => {
            el.classList.add("visible");
          }, delay);
        }
      });
  }, 100);
});
