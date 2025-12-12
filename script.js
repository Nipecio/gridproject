document.addEventListener("DOMContentLoaded", () => {
  // Initialize Vanilla Tilt for 3D card effect
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 5, // max tilt value
    speed: 400, // speed of the transition
    glare: true, // enable glare effect
    "max-glare": 0.3, // max glare opacity
  });

  // 1. Smooth Scrolling with Fixed Nav Offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector("nav").offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // 2. Fade-in Animation on Scroll (Intersection Observer)
  const fadeElements = document.querySelectorAll(".fade-in-section");

  const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: "0px",
    threshold: 0.2, // 20% of the element must be visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach((element) => {
    observer.observe(element);
  });

  // 3. Subtle Parallax Effect (for Hero and Argument 2)
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;

    parallaxElements.forEach((element) => {
      // Adjust the transformation factor for a subtle effect
      const factor = element.id === "question" ? 0.3 : 0.15;
      const y = scrollPosition * factor;

      // Apply a slight upward shift to the background image
      element.style.backgroundPositionY = `calc(50% + ${y}px)`;
    });
  });
});
