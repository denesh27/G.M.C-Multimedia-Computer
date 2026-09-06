// Optimized passive scroll listener for navbar
const navbar = document.getElementById("navbar");
let isScrolling = false;

window.addEventListener("scroll", () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
      }
      isScrolling = false;
    });
    isScrolling = true;
  }
}, { passive: true });

// Mobile Navigation Drawer Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navBackdrop = document.getElementById("nav-backdrop");

function toggleMenu(open) {
  const isOpen = open !== undefined ? open : !navMenu.classList.contains("open");
  navMenu.classList.toggle("open", isOpen);
  navBackdrop.classList.toggle("active", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen.toString());
  document.body.style.overflow = isOpen ? "hidden" : "";
}

if (navToggle && navMenu && navBackdrop) {
  navToggle.addEventListener("click", () => toggleMenu());
  navBackdrop.addEventListener("click", () => toggleMenu(false));

  // Close mobile drawer when clicking any nav link
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });
}

// FAQ Accordion Interaction
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
  const questionBtn = item.querySelector(".faq-question");
  if (questionBtn) {
    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      
      // Close other open FAQ items for a clean single-open accordion feel
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherBtn = otherItem.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("active", !isActive);
      questionBtn.setAttribute("aria-expanded", (!isActive).toString());
    });
  }
});

// Reveal on Scroll Animations (IntersectionObserver)
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add("visible"));
}

// Process Bar Animation on Scroll
const bars = document.querySelectorAll(".proc-bar-fill");
if ("IntersectionObserver" in window) {
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const w = e.target.style.width;
          e.target.style.width = "0";
          e.target.style.transition = "width 1.2s cubic-bezier(0.4,0,0.2,1)";
          setTimeout(() => {
            e.target.style.width = w;
          }, 100);
          barObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  bars.forEach((b) => barObserver.observe(b));
}

// Gallery Filter Functionality
const galleryFilterBtns = document.querySelectorAll(".gallery-filter-btn");
const galleryCards = document.querySelectorAll(".gallery-card");

galleryFilterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    galleryFilterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    galleryCards.forEach(card => {
      const cardCategory = card.getAttribute("data-category");
      if (filterValue === "all" || cardCategory === filterValue) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 200);
      }
    });
  });
});


