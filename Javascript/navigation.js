// Making header active

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;

  // Hämta länkar i headern
  const homeLink = document.getElementById("header-link");
  const menuLink = document.getElementById("menu-link");
  const aboutUsLink = document.getElementById("about-us-link");
  const contactUsLink = document.getElementById("contact-us-link");
  const checkoutLink = document.getElementById("checkout-link");

  // === Dynamisk länkhantering baserat på aktuell sida ===
  if (currentPage.includes("coffe-menu-page.html")) {
    homeLink.href = "coffe-home-page.html#home-container-section";
    aboutUsLink.href = "coffe-home-page.html#about-us-container-section";
    contactUsLink.href = "coffe-home-page.html#contact-us-container-section";
    menuLink.href = "#menu-page-container";
    menuLink.classList.add("active");

    // Smooth scroll till menu-sektionen på sidan
    menuLink.addEventListener("click", (event) => {
      event.preventDefault();
      const menuSection = document.querySelector(".menu-page-container");
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    checkoutLink.href = "coffe-checkout-page.html";
  } else if (currentPage.includes("coffe-checkout-page.html")) {
    homeLink.href = "coffe-home-page.html#home-container-section";
    aboutUsLink.href = "coffe-home-page.html#about-us-container-section";
    contactUsLink.href = "coffe-home-page.html#contact-us-container-section";
    menuLink.href = "coffe-menu-page.html"; // Menu länkar till menu-sidan
    checkoutLink.href = "#checkout-page-container";
    checkoutLink.classList.add("active");

    // Hindra navigation till checkout om vi redan är där
    checkoutLink.addEventListener("click", (event) => {
      event.preventDefault();
    });
  } else {
    // Detta är för `coffe-home-page.html`
    homeLink.href = "#home-container-section";
    menuLink.href = "#menu-container-section";
    aboutUsLink.href = "#about-us-container-section";
    contactUsLink.href = "#contact-us-container-section";

    // Smooth scroll för länkar inom samma sida
    document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          event.preventDefault();
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  // === IntersectionObserver för att markera aktiv länk ===
  const links = document.querySelectorAll(".list-container a");
  const sections = {};

  links.forEach((link) => {
    const targetId = link.getAttribute("href").slice(1);
    sections[targetId] = link;
  });

  function setActiveLink(targetId) {
    links.forEach((link) => {
      const linkId = link.getAttribute("href").slice(1);
      if (linkId === targetId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      threshold: [0.1, 0.9],
    }
  );

  // Lägg till observer för varje sektion
  Object.keys(sections).forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      observer.observe(section);
    }
  });

  // === Extra scroll-check för större sektioner ===
  if (
    !currentPage.includes("coffe-menu-page.html") &&
    !currentPage.includes("coffe-checkout-page.html")
  ) {
    window.addEventListener("scroll", () => {
      Object.keys(sections).forEach((id) => {
        const section = document.getElementById(id);
        const rect = section.getBoundingClientRect();

        if (
          rect.top <= window.innerHeight * 0.5 &&
          rect.bottom >= window.innerHeight * 0.5
        ) {
          setActiveLink(id);
        }
      });
    });
  }
});
