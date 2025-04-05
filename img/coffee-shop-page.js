

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




// making menu i header active orange color

document.addEventListener('DOMContentLoaded', () => {
  const menuHeader = document.getElementById('menu-header');
  menuHeader.classList.add('active');
});



















document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.image-srcoller-container img');
  const rightArrow = document.querySelector('.right-arrow');
  const leftArrow = document.querySelector('.left-arrow');

  const order = [
    'toblerone-coffe-image',  // 0 Default in the middle
    'hazelnut-coffe-image',   // 1 Right after 1 click on right arrow
    'vanilla-coffe-image',    // 2 Right after 2 clicks on right arrow
    'ice-coffe-image',        // 3 Right after 3 clicks on right arrow
    'brown-coffe-image',      // 4 Right after 4 clicks on right arrow
    'dark-coffe-image'        // 5 Right after 5 clicks on right arrow
  ];

  let currentIndex = 0;

  const showImage = (newIndex, direction) => {
    const currentImage = images[currentIndex];
    const newImage = images[newIndex];

    // Startar utgående övergång för nuvarande bild
    if (direction === 'rightArrow') {
      currentImage.style.transform = 'translateX(-400px)';
    } else if (direction === 'leftArrow') {
      currentImage.style.transform = 'translateX(400px)';
    }
    currentImage.style.opacity = '0';
    currentImage.style.transition = 'transform 1.2s ease-in-out, opacity 1.2s ease-in-out';

    // Startar inkommande övergång för ny bild
    newImage.style.display = 'block';
    if (direction === 'rightArrow') {
      newImage.style.transform = 'translateX(700px)';
    } else if (direction === 'leftArrow') {
      newImage.style.transform = 'translateX(-700px)';
    }
    newImage.style.opacity = '0';
    newImage.style.transition = 'transform 2.3s ease-in-out, opacity 2.3s ease-in-out';

    // Startar inkommande bild något tidigare för att överlappa med utgående bild
    setTimeout(() => {
      newImage.style.transform = 'translateX(0)';
      newImage.style.opacity = '1';
    }, 100); // Fördröjning för att synkronisera övergången

    // Efter övergången är klar
    setTimeout(() => {
      currentImage.style.display = 'none';
    }, 1200); // Tid för att säkerställa att övergången är klar

    currentIndex = newIndex;
  };

  // Initial visning av standardbilden
  images[currentIndex].style.display = 'block';
  images[currentIndex].style.opacity = '1';
  images[currentIndex].style.transform = 'translateX(0)';

  // Händelsehanterare för högerpil
  rightArrow.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % order.length;
    if (currentIndex === order.length - 1 && newIndex === 0) {
      // Hantera övergången från den sista bilden till den första bilden
      images[currentIndex].style.transition = 'opacity 1.2s ease-in-out';
      images[currentIndex].style.opacity = '0';
      setTimeout(() => {
        images[currentIndex].style.transition = '';
        showImage(newIndex, 'rightArrow');
      }, 1200);
    } else {
      showImage(newIndex, 'rightArrow');
    }
  });

  // Händelsehanterare för vänsterpil
  leftArrow.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + order.length) % order.length;
    if (currentIndex === 0 && newIndex === order.length - 1) {
      // Hantera övergången från den första bilden till den sista bilden
      images[currentIndex].style.transition = 'opacity 1.2s ease-in-out';
      images[currentIndex].style.opacity = '0';
      setTimeout(() => {
        images[currentIndex].style.transition = '';
        showImage(newIndex, 'leftArrow');
      }, 1200);
    } else {
      showImage(newIndex, 'leftArrow');
    }
  });
});













































































//BÄSTA KODEN


/*


document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.image-srcoller-container img');
  const rightArrow = document.querySelector('.right-arrow');
  const leftArrow = document.querySelector('.left-arrow');

  const order = [
    'toblerone-coffe-image',  // 0 Default in the middle
    'hazelnut-coffe-image',   // 1 Right after 1 click on right arrow
    'vanilla-coffe-image',    // 2 Right after 2 clicks on right arrow
    'ice-coffe-image',        // 3 Right after 3 clicks on right arrow
    'brown-coffe-image',      // 4 Right after 4 clicks on right arrow
    'dark-coffe-image'        // 5 Right after 5 clicks on right arrow
  ];

  let currentIndex = 0;

  const showImage = (newIndex, direction) => {
    const currentImage = images[currentIndex];
    const newImage = images[newIndex];

    // Startar utgående övergång för nuvarande bild
    if (direction === 'rightArrow') {
      currentImage.style.transform = 'translateX(-400px)';
    } else if (direction === 'leftArrow') {
      currentImage.style.transform = 'translateX(400px)';
    }
    currentImage.style.opacity = '0';
    currentImage.style.transition = 'transform 1.2s ease-in-out, opacity 1.2s ease-in-out';

    // Startar inkommande övergång för ny bild
    newImage.style.display = 'block';
    if (direction === 'rightArrow') {
      newImage.style.transform = 'translateX(700px)';
    } else if (direction === 'leftArrow') {
      newImage.style.transform = 'translateX(-700px)';
    }
    newImage.style.opacity = '0';
    newImage.style.transition = 'transform 2.3s ease-in-out, opacity 2.3s ease-in-out';

    // Startar inkommande bild något tidigare för att överlappa med utgående bild
    setTimeout(() => {
      newImage.style.transform = 'translateX(0)';
      newImage.style.opacity = '1';
    }, 100); // Fördröjning för att synkronisera övergången

    // Efter övergången är klar
    setTimeout(() => {
      currentImage.style.display = 'none';
    }, 1200); // Tid för att säkerställa att övergången är klar

    currentIndex = newIndex;
  };

  // Initial visning av standardbilden
  images[currentIndex].style.display = 'block';
  images[currentIndex].style.opacity = '1';
  images[currentIndex].style.transform = 'translateX(0)';

  // Händelsehanterare för högerpil
  rightArrow.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % order.length;
    showImage(newIndex, 'rightArrow');
  });

  // Händelsehanterare för vänsterpil
  leftArrow.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + order.length) % order.length;
    showImage(newIndex, 'leftArrow');
  });
});




*/






































































/*




document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.image-srcoller-container img');
  const rightArrow = document.querySelector('.right-arrow');
  const leftArrow = document.querySelector('.left-arrow');

  const order = [
    'toblerone-coffe-image',  // 0 Default in the middle
    'hazelnut-coffe-image',   // 1 Right after 1 click on right arrow
    'vanilla-coffe-image',    // 2 Right after 2 clicks on right arrow
    'ice-coffe-image',        // 3 Right after 3 clicks on right arrow
    'brown-coffe-image',      // 4 Right after 4 clicks on right arrow
    'dark-coffe-image'        // 5 Right after 5 clicks on right arrow
  ];

  let currentIndex = 0;

  // Funktion för att visa bilden baserat på index med övergångseffekt
  const showImage = (index, direction) => {
    images.forEach((img, idx) => {
      if (idx === index) {
        img.style.opacity = '0';
        if (direction === 'rightArrow') {
          img.style.transform = 'translateX(-400px)'; // Flytta bilden åt höger för att simulera att den lämnar scenen
        } else if (direction === 'leftArrow') {
          img.style.transform = 'translateX(400px)'; // Flytta bilden åt vänster för att simulera att den lämnar scenen
        }
        img.style.transition = 'opacity 1.2s ease-in-out, transform 1.2s ease-in-out';
        setTimeout(() => {
          img.style.opacity = '1';
          img.style.transform = 'translateX(0)'; // Återgå till sin ursprungliga position
        }, 100 * Math.abs(idx - currentIndex)); // Använd Math.abs för att hantera båda riktningarna
        img.style.display = 'block';
      } else {
        img.style.display = 'none';
      }
    });
    currentIndex = index;
  };

  // Initial visning av standardbilden
  showImage(currentIndex, '');

  // Händelsehanterare för högerpil
  rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % order.length;
    showImage(currentIndex, 'rightArrow');
  });

  // Händelsehanterare för vänsterpil
  leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + order.length) % order.length;
    showImage(currentIndex, 'leftArrow');
  });
});








*/




















































