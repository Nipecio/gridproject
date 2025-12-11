document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth Scrolling for Navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Get the height of the fixed navbar to offset the scroll position
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

  // 2. Fade-in Animation on Scroll (Subtle Transition)
  const fadeElements = document.querySelectorAll(".fade-in-section");

  const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: "0px",
    threshold: 0.1, // 10% of the element must be visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
});
