document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // Adjust for sticky navbar
          behavior: "smooth",
        });
      }
    });
  });

  // Close mobile navbar on link click
  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggle = document.getElementById("navbarNav");
  const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
  navLinks.forEach((l) => {
    l.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        bsCollapse.toggle();
      }
    });
  });

  // Navbar background change on scroll & Scroll to Top Button Visibility
  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }

    // Scroll to top button visibility
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  // Scroll to Top Click
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Form submission (Using AJAX for Formspree)
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      const status = form.querySelector('button[type="submit"]');
      const originalText = status.innerText;

      status.innerText = "Sending...";
      status.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          alert("Thank you! Your message has been sent successfully.");
          form.reset();
        } else {
          const result = await response.json();
          alert(
            result.errors
              ? result.errors.map((error) => error.message).join(", ")
              : "Oops! There was a problem submitting your form",
          );
        }
      } catch (error) {
        alert("Oops! There was a problem submitting your form");
      } finally {
        status.innerText = originalText;
        status.disabled = false;
      }
    });
  }
});
