const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));

const statNumbers = document.querySelectorAll(".stat-number");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const el = entry.target;
      const target = Number(el.getAttribute("data-target"));
      const duration = 1200;
      const start = performance.now();

      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target).toString();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = target.toString();
        }
      };

      requestAnimationFrame(animate);
      statsObserver.unobserve(el);
    });
  },
  { threshold: 0.4 }
);

statNumbers.forEach((stat) => statsObserver.observe(stat));

// Service accordion
document.querySelectorAll(".svc-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    const panel = btn.nextElementSibling;

    // Close all other panels
    document.querySelectorAll(".svc-btn").forEach((other) => {
      if (other !== btn) {
        other.setAttribute("aria-expanded", "false");
        other.nextElementSibling.classList.remove("is-open");
      }
    });

    // Toggle current
    btn.setAttribute("aria-expanded", String(!isOpen));
    panel.classList.toggle("is-open", !isOpen);
  });
});

const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      formMessage.textContent = "Veuillez remplir tous les champs avant l'envoi.";
      return;
    }

    formMessage.textContent = "Merci. Votre demande a bien ete envoyee.";
    form.reset();
  });
}

// Carousel functionality
const carouselItems = document.querySelectorAll(".carousel-item");
const indicators = document.querySelectorAll(".indicator");
const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");
let currentSlide = 0;
let autoplayInterval;

function showSlide(n) {
  carouselItems.forEach((item) => item.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  carouselItems[n].classList.add("active");
  indicators[n].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % carouselItems.length;
  showSlide(currentSlide);
  resetAutoplay();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
  showSlide(currentSlide);
  resetAutoplay();
}

function goToSlide(n) {
  currentSlide = n;
  showSlide(currentSlide);
  resetAutoplay();
}

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 3000);
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

if (prevBtn) prevBtn.addEventListener("click", prevSlide);
if (nextBtn) nextBtn.addEventListener("click", nextSlide);

indicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    const slideNum = parseInt(indicator.getAttribute("data-slide"));
    goToSlide(slideNum);
  });
});

startAutoplay();
