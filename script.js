const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => observer.observe(el));

const bars = document.querySelectorAll(".proc-bar-fill");
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
  { threshold: 0.5 },
);
bars.forEach((b) => barObserver.observe(b));
