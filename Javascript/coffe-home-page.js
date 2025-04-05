document.addEventListener("DOMContentLoaded", () => {
  const searchIconImage = document.querySelector(".search-icon-image");
  const searchInputContainer = document.querySelector(
    ".search-input-container"
  );
  const searchInput = document.getElementById("search-input");

  // Klick på ikonen visar input utan att ändra färg
  searchIconImage.addEventListener("click", () => {
    searchInputContainer.classList.toggle("show-input");
    if (searchInputContainer.classList.contains("show-input")) {
      searchInput.blur(); // Förhindrar att input direkt får fokus (och ändrar färg)
    }
  });

  // Ändra färg först när användaren klickar direkt på input-fältet
  searchInput.addEventListener("focus", () => {
    searchInput.style.backgroundColor = "white";
    searchInput.style.color = "gray";
  });

  // När input tappar fokus, återställ färg och dölj det
  searchInput.addEventListener("blur", () => {
    searchInput.style.backgroundColor = "rgb(31, 30, 30)";
    searchInput.style.color = "white";

    // Ta bort klassen show-input för att dölja input-fältet när fokus förloras
    setTimeout(() => searchInputContainer.classList.remove("show-input"), 200);
  });
});

/*

Making slider active

 */

const backgroundColors = {
  "/img/toblerone-menu-image.png": "rgb(205, 165, 85)",
  "/img/hazelnut-coffee-image.png": "rgb(139, 91, 49)",
  "/img/vanila-coffee-image.png": "#eedba9",
  "/img/ice-coffee-image.png": "rgb(191,118,98)",
  "/img/brown-coffee-image.png": "rgb(71, 46, 23)",
  "/img/dark-coffee-image.png": "rgb(23, 23, 23)",
};

// get pictures and slider
const carousel = document.querySelector(".carousel");
const menuContainerSection = document.querySelector(".menu-container-section");
const slides = document.querySelectorAll(".inside-slider .slide");
const thumbnails = Array.from(
  document.querySelectorAll(".outside-slider .thumbnail")
);
let currentSlide = 0;

function startSlider() {
  setInterval(() => {
    showNextSlide();
  }, 5000); // new picture after 5 seconds
}

// function for ading effects on next slide
function showNextSlide() {
  //
  slides[currentSlide].classList.remove("active");

  //  add next class to active effect
  carousel.classList.remove("next", "prev");
  carousel.classList.add("next");

  // change to next picture
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");

  // change background color
  const currentImageSrc = slides[currentSlide]
    .querySelector("img")
    .getAttribute("src");
  menuContainerSection.style.backgroundColor =
    backgroundColors[currentImageSrc] || "rgb(193, 154, 107)";

  // update the order outside-slider
  updateThumbnailOrder();

  // remove after 5 seconds
  setTimeout(() => {
    carousel.classList.remove("next");
  }, 500);
}

// function to sort the slider in the correct order in outside container
function updateThumbnailOrder() {
  const outsideSlider = document.querySelector(".outside-slider");

  // Move the first thumbnail to the end to create a looping
  const firstThumbnail = thumbnails.shift();
  thumbnails.push(firstThumbnail);

  // sort the slider in the correct order in outside-container
  outsideSlider.innerHTML = "";
  thumbnails.forEach((thumbnail) => {
    outsideSlider.appendChild(thumbnail);
  });
}

// active slider and first picture
document.addEventListener("DOMContentLoaded", () => {
  slides[currentSlide].classList.add("active");
  startSlider();
});

/*

Making unputs in contact us active

*/

document.addEventListener("DOMContentLoaded", () => {
  // get all inputs
  const inputs = document.querySelectorAll(
    ".first-name-container input, .last-name-container input, .email-content-container input, .your-message-content-container textarea"
  );

  inputs.forEach((input) => {
    // change color to white when pressing on input
    input.addEventListener("focus", () => {
      input.style.backgroundColor = "white";
      input.style.color = "black";
    });

    // Restore color
    input.addEventListener("blur", () => {
      input.style.backgroundColor = "rgb(31, 30, 30)";
      input.style.color = "white";
    });
  });
});

/*

Slow motion effect

*/
document.addEventListener("DOMContentLoaded", () => {
  const slowMotionElements = document.querySelectorAll(
    '[class*="slow-motion-"]'
  );

  // Observ every element and ad visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  ); //acitvare when 10% of element is visible

  // add observ for every element
  slowMotionElements.forEach((element) => {
    observer.observe(element);
  });
});
