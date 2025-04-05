

window.addEventListener("load", function() {
  window.scrollTo(0, 0);
});

//Making welcome-text-show-slowmotion

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".welcome-mocha-container").classList.add("show");
  document.querySelector(".mocha-text-below-container").classList.add("show");
  document.querySelector(".order-now-button-container").classList.add("show");
  document.querySelector(".grid-images-main-background").classList.add("show");
  document.querySelector(".about-us-container-yellow").classList.add("show");
});







//Making header show color when scrolling through the page


window.addEventListener("scroll", function() {
  // Hämta den aktuella positionen för scrollning
  let currentScroll = window.pageYOffset;

  // Hämta offset för varje sektion
  let homeOffset = document.getElementById("top").offsetTop;
  let menuOffset = document.getElementById("menu").offsetTop;
  let reviewsOffset = document.getElementById("reviews").offsetTop;
  let aboutUsOffset = document.getElementById("about-us").offsetTop;
  let contactUsOffset = document.getElementById("contact-us").offsetTop;

  // Justera menyelementens utseende baserat på när användaren närmar sig varje sektion
  if (currentScroll >= homeOffset && currentScroll < menuOffset) {
    highlightMenuItem("home-header");
  }
  if (currentScroll >= menuOffset - 300) {
    highlightMenuItem("menu-header");
  }
  if (currentScroll >= reviewsOffset - 300) {
    highlightMenuItem("reviews-header");
  }
  if (currentScroll >= aboutUsOffset - 300) {
    highlightMenuItem("about-us-header");
  }
  if (currentScroll >= contactUsOffset - 300) {
    highlightMenuItem("contact-us-header");
  }
});



// Markera aktuellt menyelement vid sidans laddning och när användaren är på toppen av sidan
window.addEventListener("load", function() {
  let currentScroll = window.scrollY;
  let homeOffset = document.getElementById("top").offsetTop;

  if (currentScroll < homeOffset) {
    highlightMenuItem("home-header");
  }
});

// Funktion för att markera aktuellt menyelement
function highlightMenuItem(itemId) {
  // Återställ färgen för alla menyelement
  let menuItems = document.querySelectorAll(".header-container a");
  menuItems.forEach(function(item) {
    item.style.color = "white";
    item.style.borderBottom = "2px solid transparent";
  });

  // Markera det aktuella menyelementet
  let currentItem = document.querySelector("." + itemId);
  currentItem.style.color = "orange";
  currentItem.style.borderBottom = "2px solid orange";
}



function highlightMenuItem(itemId) {
  // Återställ färgen för alla menyelement
  let menuItems = document.querySelectorAll(".header-container a");
  menuItems.forEach(function(item) {
    item.classList.remove("active");
  });

  // Markera det aktuella menyelementet
  let currentItem = document.querySelector("." + itemId);
  currentItem.classList.add("active");
}






//Making menu-show-slowmotion

window.addEventListener("scroll", function() {
  let menuText = document.querySelector('.menu-text-front-page-image-container');
  let menuImage = document.querySelector('.menu-image-container-front-page');
  let menuButton = document.querySelector('.menu-bottom-container');

  
  let menuTextPosition = menuText.getBoundingClientRect().top;

  
  if (menuTextPosition < window.innerHeight) {
    menuText.classList.add('show');
    menuImage.classList.add('show');
    menuButton.classList.add('show');
  }
});


//Making reviews-show-slowmotion

window.addEventListener("scroll", function() {
  let reviewsContainer = document.querySelector('.reviews-p-container');
  let reviewsPersons = document.querySelectorAll('.reviews-person');

  
  let reviewsContainerPosition = reviewsContainer.getBoundingClientRect().top;

  
  if (reviewsContainerPosition < window.innerHeight) {
    reviewsContainer.classList.add('show');
    reviewsPersons.forEach(review => {
      review.classList.add('show');
    });
  }
});






// Making left and right arrow active reviews




document.addEventListener("DOMContentLoaded", function() {
  const reviews = document.querySelectorAll('.reviews-person > div');
  let currentIndex = 0;

  function showReviews(startIndex) {
    
    reviews.forEach((review, index) => {
      if (index >= startIndex && index < startIndex + 3) {
        review.style.opacity = '0';
        review.style.transform = 'translateY(20px)'; 
        review.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'; 
        review.style.display = 'flex';
        setTimeout(() => {
          review.style.opacity = '1'; 
          review.style.transform = 'translateY(0)'; 
        }, 100 * (index - startIndex));
      } else {
        review.style.display = 'none'; 
      }
    });
  }

  
  showReviews(currentIndex);


  document.querySelector('.right-arrow').addEventListener('click', function() {
    currentIndex += 3;
    if (currentIndex >= reviews.length) {
      currentIndex = 0;
    }
    showReviews(currentIndex);
  });

 
  document.querySelector('.left-arrow').addEventListener('click', function() {
    currentIndex -= 3;
    if (currentIndex < 0) {
      currentIndex = reviews.length - 3;
    }
    showReviews(currentIndex);
  });
});




// Making arrow down active

document.addEventListener("DOMContentLoaded", function() {
  // Hämta alla pilbilder och beskrivningselement
  const arrowDownIcons = document.querySelectorAll('.arrow-down');
  const descriptionReviews = document.querySelectorAll('.description-reviews');
  const reviews = document.querySelectorAll('.review-1, .review-2, .review-3, .review-4, .review-5, .review-6');

  // Lägg till klickhändelse till varje pilbild
  arrowDownIcons.forEach((arrowIcon, index) => {
    arrowIcon.addEventListener('click', function() {
      // Om beskrivningselementet är synligt, dölj det och ändra border-radius för reviews
      if (descriptionReviews[index].style.display === 'block') {
        descriptionReviews[index].style.display = 'none';
        reviews[index].style.borderRadius = '20px';
      } else {
        descriptionReviews[index].style.display = 'block';
        reviews[index].style.borderRadius = '20px 20px 0 0'; // Uppdatera border-radius för att ta bort nedåtriktad radien
      }
    });
  });
});






//Making about us slowmotion avtive 



window.addEventListener("scroll", function(){
  // För text 1
  let aboutUsPart1 = document.querySelector('.about-us-part-1');
  let allText1Container = document.querySelector('.all-text-1-container');

  let part1Position = aboutUsPart1.getBoundingClientRect().top;
  let allText1Position = allText1Container.getBoundingClientRect().top;

  if (part1Position < window.innerHeight) {
    aboutUsPart1.classList.add('show');
  }

  if (allText1Position < window.innerHeight) {
    allText1Container.classList.add('show');
  }

  // För text 2
  let aboutUsPart2 = document.querySelector('.about-us-part-2');
  let allText2Container = document.querySelector('.all-text-2-container');

  let part2Position = aboutUsPart2.getBoundingClientRect().top;
  let allText2Position = allText2Container.getBoundingClientRect().top;

  if (part2Position < window.innerHeight) {
    aboutUsPart2.classList.add('show');
  }

  if (allText2Position < window.innerHeight) {
    allText2Container.classList.add('show');
  }

  // För text 3
  let aboutUsPart3 = document.querySelector('.about-us-part-3');
  let allText3Container = document.querySelector('.all-text-3-container');

  let part3Position = aboutUsPart3.getBoundingClientRect().top;
  let allText3Position = allText3Container.getBoundingClientRect().top;

  if (part3Position < window.innerHeight) {
    aboutUsPart3.classList.add('show');
  }

  if (allText3Position < window.innerHeight) {
    allText3Container.classList.add('show');
  }

  // För text 4
  let aboutUsPart4 = document.querySelector('.about-us-part-4');
  let allText4Container = document.querySelector('.all-text-4-container');

  let part4Position = aboutUsPart4.getBoundingClientRect().top;
  let allText4Position = allText4Container.getBoundingClientRect().top;

  if (part4Position < window.innerHeight) {
    aboutUsPart4.classList.add('show');
  }

  if (allText4Position < window.innerHeight) {
    allText4Container.classList.add('show');
  }
});











/*
window.addEventListener("scroll", function(){
  let aboutUsContainer = document.querySelector('.about-us-container');
  let aboutUsContents = document.querySelectorAll('.about-us-content');

  let aboutUsContainerPosition = aboutUsContainer.getBoundingClientRect().top;

  if(aboutUsContainerPosition < window.innerHeight){
    aboutUsContainer.classList.add('show');
    aboutUsContents.forEach(aboutUsContent => {
      aboutUsContent.classList.add('show');
    });
  }
});

*/

//Making contact-us-show-slowmotion

window.addEventListener("scroll", function(){
  let contactUsContainer = document.querySelector('.contact-us-container');
  let sendMessageContainers = document.querySelectorAll('.send-message-container');
  let contactUsImage = document.querySelector('.image-contact-us'); 

  let contactUsContainerPosition = contactUsContainer.getBoundingClientRect().top;

  if(contactUsContainerPosition < window.innerHeight){
    contactUsContainer.classList.add('show'); 
    sendMessageContainers.forEach(function(sendMessageContainer) {
      sendMessageContainer.classList.add('show');
    });
    contactUsImage.classList.add('show'); 
  }
});





//Making search-bar-show-when clicking on it 

document.addEventListener("DOMContentLoaded", function() {
  const searchIcon = document.querySelector('.search-icon-image');
  const searchInput = document.querySelector('.search-input');

  
  searchIcon.addEventListener('click', function() {
    
    searchInput.classList.toggle('show-search-input');
  });

  
  document.addEventListener('click', function(event) {
    if (!searchInput.contains(event.target) && !searchIcon.contains(event.target)) {
      
      searchInput.classList.remove('show-search-input');
    }
  });
});









