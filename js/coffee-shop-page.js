

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











// image slider coffe 


//Activate slider when clikcing arrow




let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');

let listItemDom = document.querySelector('.carousel .list');
let outsideMiddleContainerDom = document.querySelector('.carousel .outside-middle-container');

// Kartläggning av bakgrundsfärger för varje kaffe
const backgroundColors = {
  'toblerone-coffe-image': 'rgb(205, 165, 85)',
  'hazelnut-coffe-image': 'rgb(139, 91, 49)', // Ljusbrun
  'vanila-coffee-image': '#eedba9', // Vaniljfärg
  'ice-coffe-image': 'rgb(191,118,98)', // Ljusblå/brun
  'brown-coffe-image': 'rgb(71, 46, 23)', // Mörkare brun
  'dark-coffe-image': 'rgb(23, 23, 23)' // Svart
};


nextDom.onclick = function() {
  showSlider('next');
}

prevDom.onclick = function (){
  showSlider('prev');
}

function showSlider(type) {
  let itemSlider = document.querySelectorAll('.carousel .list .item');
  let itemThumbnail = document.querySelectorAll('.carousel .outside-middle-container .item');

  if (type === 'next') {
    listItemDom.appendChild(itemSlider[0]);
    outsideMiddleContainerDom.appendChild(itemThumbnail[0]);
    carouselDom.classList.add('next');
  } else {
    let positionLastItem = itemSlider.length - 1;
    listItemDom.prepend(itemSlider[positionLastItem]);
    outsideMiddleContainerDom.prepend(itemThumbnail[positionLastItem]);
    carouselDom.classList.add('prev');
  }

  // Ta bort klassen efter animationen är klar
  setTimeout(() => {
    carouselDom.classList.remove('next', 'prev');
    updateBackgroundColor();
    updateTextDisplay(); // Lägg till denna rad
  }, 500); // Matcha med varaktigheten på din CSS-animation
}

// Funktion för att uppdatera bakgrundsfärgen
function updateBackgroundColor() {
  let middleItem = document.querySelector('.carousel .list .item img');
  let imageClass = middleItem.classList[0];
  carouselDom.style.backgroundColor = backgroundColors[imageClass] || 'rgb(193, 154, 107)'; // Standardfärg om ingen matchning hittas
}



// making about-flavor active
function updateTextDisplay() {
  let middleItem = document.querySelector('.carousel .list .item img');
  let imageClass = middleItem.classList[0];
  let coffeeInfo = coffeeData[imageClass] || {};

  let flavorHeading = document.querySelector('.flavor-heading');
  let aboutHeading = document.querySelector('.about-flavor .about-heading');
  let aboutMainP = document.querySelector('.about-flavor .about-main-p');

  // Starta om animationen genom att tillfälligt ta bort och lägga till texten
  flavorHeading.style.display = 'none';
  aboutHeading.style.display = 'none';
  aboutMainP.style.display = 'none';

  setTimeout(() => {
    // Uppdatera texten
    flavorHeading.textContent = coffeeInfo.heading || 'Unknown Coffee';
    aboutHeading.textContent = 'About';
    aboutMainP.textContent = coffeeInfo.about || 'No description available.';

    // Återställ visningen och trigga animationen igen
    flavorHeading.style.display = '';
    aboutHeading.style.display = '';
    aboutMainP.style.display = '';

    // Trigger omritning för att säkerställa att CSS-animationen startar
    void flavorHeading.offsetWidth;

    // Lägg till 'show'-klassen igen
    flavorHeading.classList.add('show');
    aboutHeading.classList.add('show');
    aboutMainP.classList.add('show');
  },100); // Fördröjning för att säkerställa att CSS-animationen triggas korrekt
}

// Initial uppsättning av bakgrundsfärg och text
document.addEventListener('DOMContentLoaded', () => {
  updateBackgroundColor();
  updateTextDisplay();
});



















//making product-info-image-container active 



// Funktion för att uppdatera produktinformationen med animation
function updateProductInfoWithAnimation() {
  let middleItem = document.querySelector('.carousel .list .item img');
  let imageClass = middleItem.classList[0];
  let coffeeInfo = coffeeData[imageClass] || {};

  let productImage = document.querySelector('.product-info-image');
  let productFlavor = document.querySelector('.product-flavor');
  let productPrice = document.querySelector('.product-price');

  // Uppdatera produktbild, smak och pris
  productImage.src = coffeeInfo.image || '';
  productFlavor.textContent = coffeeInfo.heading || 'Unknown Coffee';
  productPrice.textContent = coffeeInfo.price || '$0';

  // Om produktinformation saknas, hantera det här
  if (!coffeeInfo.heading || !coffeeInfo.price || !coffeeInfo.image) {
    productFlavor.textContent = 'Unknown Coffee';
    productPrice.textContent = '$0';
    productImage.src = '';
  }

  // Förbered för animation genom att nollställa tidigare animation
  let productInfoContainer = document.querySelector('.product-info-image-container');
  productInfoContainer.style.animation = 'none';
  void productInfoContainer.offsetWidth; // Trigger reflow
  productInfoContainer.style.animation = `showContent 0.5s 0.2s linear 1 forwards`;
}

// Initial uppsättning av produktinformation
document.addEventListener('DOMContentLoaded', () => {
  updateProductInfoWithAnimation();
});

// Uppdatera produktinformation vid varje bildbyte i karusellen
function updateTextDisplay() {
  let middleItem = document.querySelector('.carousel .list .item img');
  let imageClass = middleItem.classList[0];
  let coffeeInfo = coffeeData[imageClass] || {};

  let flavorHeading = document.querySelector('.flavor-heading');
  let aboutHeading = document.querySelector('.about-flavor .about-heading');
  let aboutMainP = document.querySelector('.about-flavor .about-main-p');

  // Starta om animationen genom att tillfälligt ta bort och lägga till texten
  flavorHeading.style.display = 'none';
  aboutHeading.style.display = 'none';
  aboutMainP.style.display = 'none';

  setTimeout(() => {
    // Uppdatera texten
    flavorHeading.textContent = coffeeInfo.heading || 'Unknown Coffee';
    aboutHeading.textContent = 'About';
    aboutMainP.textContent = coffeeInfo.about || 'No description available.';

    // Återställ visningen och trigga animationen igen
    flavorHeading.style.display = '';
    aboutHeading.style.display = '';
    aboutMainP.style.display = '';

    // Trigger omritning för att säkerställa att CSS-animationen startar
    void flavorHeading.offsetWidth;

    // Lägg till 'show'-klassen igen
    flavorHeading.classList.add('show');
    aboutHeading.classList.add('show');
    aboutMainP.classList.add('show');

    // Uppdatera produktinformation med animation
    updateProductInfoWithAnimation();
  }, 100); // Fördröjning för att säkerställa att CSS-animationen triggas korrekt
}




































// dessert slider 

//pause slider hover 




document.addEventListener("DOMContentLoaded", function() {
  const slider = document.querySelector('.banner .slider');
  const items = document.querySelectorAll('.banner .slider .item');

  items.forEach(item => {
      item.addEventListener('mouseenter', () => {
          slider.classList.add('paused');
      });

      item.addEventListener('mouseleave', () => {
          slider.classList.remove('paused');
      });
  });
});







//making about-flavor-desserts active 

document.addEventListener("DOMContentLoaded", function() {
  const slider = document.querySelector('.banner .slider');
  const items = document.querySelectorAll('.banner .slider .item');
  const flavorHeading = document.querySelector('.flavor-heading-dessert');
  const aboutHeading = document.querySelector('.about-heading-dessert');
  const aboutMainP = document.querySelector('.about-main-p-dessert');
  
  // Initially hide the about section
  flavorHeading.textContent = '';
  aboutHeading.textContent = '';
  aboutMainP.textContent = '';

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      slider.classList.add('paused');
      updateDessertInfo(item.id);
    });

    item.addEventListener('mouseleave', () => {
      slider.classList.remove('paused');
    });
  });

  function updateDessertInfo(dessertId) {
    const dessertInfo = dessertsInfo[`${dessertId}-image`] || {};
    
    // Hide the elements initially
    flavorHeading.style.display = 'none';
    aboutHeading.style.display = 'none';
    aboutMainP.style.display = 'none';

    setTimeout(() => {
      // Update the content
      flavorHeading.textContent = dessertInfo.heading || '';
      aboutHeading.textContent = 'About';
      aboutMainP.textContent = dessertInfo.about || '';

      // Show the elements with animation
      flavorHeading.style.display = '';
      aboutHeading.style.display = '';
      aboutMainP.style.display = '';
      
      // Trigger reflow to restart the animation
      void flavorHeading.offsetWidth;
      void aboutHeading.offsetWidth;
      void aboutMainP.offsetWidth;
      
      // Add animation classes
      flavorHeading.classList.add('show');
      aboutHeading.classList.add('show');
      aboutMainP.classList.add('show');
    }, 100); // Small delay to ensure animation triggers
  }
});











//making product-info-desserts active


document.addEventListener("DOMContentLoaded", function() {
  const slider = document.querySelector('.banner .slider');
  const items = document.querySelectorAll('.banner .slider .item');
  const flavorHeading = document.querySelector('.flavor-heading-dessert');
  const aboutHeading = document.querySelector('.about-heading-dessert');
  const aboutMainP = document.querySelector('.about-main-p-dessert');
  const productInfoContainer = document.querySelector('.product-info-image-container-desserts');
  const productImage = document.querySelector('.product-info-image-desserts');
  const productFlavor = document.querySelector('.product-flavor-desserts');
  const productPrice = document.querySelector('.product-price-desserts');

  // Initially hide the about section and product info
  flavorHeading.textContent = '';
  aboutHeading.textContent = '';
  aboutMainP.textContent = '';
  productImage.src = '';
  productFlavor.textContent = '';
  productPrice.textContent = '';

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      slider.classList.add('paused');
      updateDessertInfo(item.id);
      updateProductInfo(item.id);
    });

    item.addEventListener('mouseleave', () => {
      slider.classList.remove('paused');
    });
  });

  function updateDessertInfo(dessertId) {
    const dessertInfo = dessertsInfo[`${dessertId}-image`] || {};

    // Hide the elements initially
    flavorHeading.style.display = 'none';
    aboutHeading.style.display = 'none';
    aboutMainP.style.display = 'none';

    setTimeout(() => {
      // Update the content
      flavorHeading.textContent = dessertInfo.heading || '';
      aboutHeading.textContent = 'About';
      aboutMainP.textContent = dessertInfo.about || '';

      // Show the elements with animation
      flavorHeading.style.display = '';
      aboutHeading.style.display = '';
      aboutMainP.style.display = '';

      // Trigger reflow to restart the animation
      void flavorHeading.offsetWidth;
      void aboutHeading.offsetWidth;
      void aboutMainP.offsetWidth;

      // Add animation classes
      flavorHeading.classList.add('show');
      aboutHeading.classList.add('show');
      aboutMainP.classList.add('show');
    }, 100); // Small delay to ensure animation triggers
  }

  function updateProductInfo(dessertId) {
    const dessertInfo = dessertsInfo[`${dessertId}-image`] || {};

    // Reset the animation
    productInfoContainer.style.animation = 'none';

    setTimeout(() => {
      // Update the content
      productImage.src = dessertInfo.image || '';
      productFlavor.textContent = dessertInfo.heading || '';
      productPrice.textContent = dessertInfo.price || '';

      // Show the image
      productImage.style.display = 'block';

      // Re-trigger the animation
      void productInfoContainer.offsetWidth; // Trigger reflow
      productInfoContainer.style.animation = 'showContent 0.5s 0.2s linear 1 forwards';
    }, 100); // Small delay to ensure animation triggers
  }
});














//ACTIVATE SIDEBAR 

//OPEN SIDEBAR 


document.addEventListener("DOMContentLoaded", function() {
  const cart = document.querySelector(".shopping-cart");
  const sidebar = document.querySelector(".sidebar-container");
  const closeButton = document.querySelector(".close-button");

  function toggleSidebar() {
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block";
      setTimeout(() => {
        sidebar.classList.add("open");
      }, 10); // Small delay to trigger CSS transition
    } else {
      sidebar.classList.remove("open");
      setTimeout(() => {
        sidebar.style.display = "none";
      }, 300); // Match the transition duration
    }
  }

  cart.addEventListener("click", toggleSidebar);
  closeButton.addEventListener("click", function() {
    sidebar.classList.remove("open");
    setTimeout(() => {
      sidebar.style.display = "none";
    }, 300); // Match the transition duration
  });
});


















// making products coffe active in sidebar 

// making products coffe active in sidebar
document.addEventListener("DOMContentLoaded", function () {
  // Hämta elementen
  const orderButton = document.querySelector('.order-button');
  const orderButtonMenu = document.querySelectorAll('.item-button');
  const sidebarContainer = document.querySelector('.sidebar-container');
  const quantityCart = document.querySelector('.quantity-cart');

  // Funktion för att tömma produktrelaterade element i sidebaren
  function clearProductElements() {
      const productElements = sidebarContainer.querySelectorAll('.sidebar-info-container-2');
      productElements.forEach(element => element.remove());
  }

  // Funktion för att uppdatera cart-siffran
  function updateCartQuantity() {
      const productElements = sidebarContainer.querySelectorAll('.sidebar-info-container');
      let totalQuantity = 0;
      productElements.forEach(element => {
          const quantitySpan = element.querySelector('.sidebar-quantity-container span:nth-child(2)');
          totalQuantity += parseInt(quantitySpan.textContent);
      });
      quantityCart.textContent = totalQuantity;
  }

  // Funktion för att hitta en produkt i sidebaren baserat på klassnamn
  function findProductInSidebar(imageClass) {
      return Array.from(sidebarContainer.querySelectorAll('.sidebar-info-container')).find(element => {
          const sidebarImage = element.querySelector('.sidebar-image');
          return sidebarImage.classList.contains(imageClass);
      });
  }

  // Funktion för att skapa och lägga till en ny produkt i sidebaren
  function addProductToSidebar(imageClass, productInfo, quantity = 1) {
      // Skapa nya element för sidebaren
      const newSidebarInfoContainer2 = document.createElement('div');
      newSidebarInfoContainer2.classList.add('sidebar-info-container-2');

      // Skapa och lägg till delete-icon container med tooltip
      const deleteIconContainer = document.createElement('div');
      deleteIconContainer.classList.add('delete-icon-container');
      const deleteIcon = document.createElement('img');
      deleteIcon.classList.add('delete-icon');
      deleteIcon.src = productInfo.deleteIcon;
      const tooltipDelete = document.createElement('div');
      tooltipDelete.classList.add('tooltip-delete');
      tooltipDelete.textContent = 'Delete';
      deleteIconContainer.appendChild(deleteIcon);
      deleteIconContainer.appendChild(tooltipDelete);

      // Skapa och lägg till sidebar-info-container
      const newSidebarInfoContainer = document.createElement('div');
      newSidebarInfoContainer.classList.add('sidebar-info-container');

      // Skapa och lägg till bild container
      const sidebarImageContainer = document.createElement('div');
      sidebarImageContainer.classList.add('sidebar-image-container');
      const sidebarImage = document.createElement('img');
      sidebarImage.classList.add('sidebar-image', imageClass);
      sidebarImage.src = productInfo.image || '';
      sidebarImageContainer.appendChild(sidebarImage);

      // Skapa och lägg till pris container
      const sidebarPriceContainer = document.createElement('div');
      sidebarPriceContainer.classList.add('sidebar-price-container');
      const sidebarPrice = document.createElement('p');
      sidebarPrice.classList.add('sidebar-price');
      sidebarPrice.textContent = productInfo.price || '$0';
      sidebarPriceContainer.appendChild(sidebarPrice);

      // Skapa och lägg till kvantitets container
      const sidebarQuantityContainer = document.createElement('div');
      sidebarQuantityContainer.classList.add('sidebar-quantity-container');
      const minusSpan = document.createElement('span');
      minusSpan.classList.add('minus');
      minusSpan.textContent = '-';
      const quantitySpan = document.createElement('span');
      quantitySpan.textContent = quantity; // Använd kvantitet från localStorage
      const plusSpan = document.createElement('span');
      plusSpan.classList.add('plus');
      plusSpan.textContent = '+';
      sidebarQuantityContainer.appendChild(minusSpan);
      sidebarQuantityContainer.appendChild(quantitySpan);
      sidebarQuantityContainer.appendChild(plusSpan);

      // Bygg upp den nya sidebar-info-container
      newSidebarInfoContainer.appendChild(sidebarImageContainer);
      newSidebarInfoContainer.appendChild(sidebarPriceContainer);
      newSidebarInfoContainer.appendChild(sidebarQuantityContainer);

      // Lägg till sidebar-info-container och delete-icon-container i sidebar-info-container-2
      newSidebarInfoContainer2.appendChild(deleteIconContainer);
      newSidebarInfoContainer2.appendChild(newSidebarInfoContainer);

      // Lägg till den nya sidebar-info-container-2 i sidebaren
      sidebarContainer.insertBefore(newSidebarInfoContainer2, sidebarContainer.querySelector('.close-button-container'));

      // Event listener för delete button
      deleteIcon.addEventListener('click', function () {
          sidebarContainer.removeChild(newSidebarInfoContainer2);
          updateCartQuantity();
          removeProductFromLocalStorage(imageClass);
      });

      // Event listener for + and - buttons
      minusSpan.addEventListener('click', function () {
          let quantity = parseInt(quantitySpan.textContent);
          if (quantity > 1) {
              quantity--;
              quantitySpan.textContent = quantity;
              updateCartQuantity();
              saveProductToLocalStorage(imageClass, productInfo, quantity);
          } else {
              // Delete product if quantity is 0
              sidebarContainer.removeChild(newSidebarInfoContainer2);
              updateCartQuantity();
              removeProductFromLocalStorage(imageClass);
          }
      });

      plusSpan.addEventListener('click', function () {
          let quantity = parseInt(quantitySpan.textContent);
          quantity++;
          quantitySpan.textContent = quantity;
          updateCartQuantity();
          saveProductToLocalStorage(imageClass, productInfo, quantity);
      });

      // Uppdatera cart-number
      updateCartQuantity();
  }

  // Funktion för att spara produkt i localStorage
  function saveProductToLocalStorage(imageClass, productInfo, quantity) {
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      if (!cart[imageClass]) {
          cart[imageClass] = { ...productInfo, quantity: 0 };
      }
      cart[imageClass].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Funktion för att ta bort produkt från localStorage
  function removeProductFromLocalStorage(imageClass) {
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      delete cart[imageClass];
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Funktion för att hantera både kaffe- och dessertprodukter
  function handleOrder(imageId, productInfo) {
      // Kontrollera om produkten redan finns i sidebaren
      const existingProduct = findProductInSidebar(imageId);
      if (existingProduct) {
          // Öka kvantiteten om produkten redan finns
          const quantitySpan = existingProduct.querySelector('.sidebar-quantity-container span:nth-child(2)');
          let quantity = parseInt(quantitySpan.textContent);
          quantity++;
          quantitySpan.textContent = quantity;
          updateCartQuantity();
          saveProductToLocalStorage(imageId, productInfo, quantity); // Spara uppdaterad produkt
      } else {
          // Lägg till ny produkt till sidebaren
          addProductToSidebar(imageId, productInfo);
          saveProductToLocalStorage(imageId, productInfo, 1); // Spara ny produkt
      }

      // Visa sidebaren om den är dold
      sidebarContainer.style.display = 'block';
      setTimeout(() => {
          sidebarContainer.classList.add('open');
      }, 10);
  }

  // Event listener för kaffeprodukter
  orderButton.addEventListener('click', function () {
      // Hitta den aktuella produkten i mitten
      const middleItem = document.querySelector('.carousel .list .item img');
      const imageClass = middleItem.classList[0];
      const coffeeInfo = coffeeData[imageClass] || {};
      handleOrder(imageClass, coffeeInfo);
  });

  // Event listener för dessertprodukter
  orderButtonMenu.forEach(button => {
      button.addEventListener('click', function (event) {
          // Hitta den aktuella produkten
          const item = event.target.closest('.item');
          const imageId = item.id + '-image';
          const productInfo = dessertsInfo[imageId] || {};
          handleOrder(imageId, productInfo);
      });
  });

  // Hantera stängning av sidebaren
  const closeButton = document.querySelector('.close-button');
  closeButton.addEventListener('click', function () {
      sidebarContainer.classList.remove('open');
      setTimeout(() => {
          sidebarContainer.style.display = 'none';
      }, 300); // Matcha transition duration
  });

  // Ladda produkter från localStorage vid sidladdning
  function loadCartFromLocalStorage() {
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      for (let key in cart) {
          if (cart.hasOwnProperty(key)) {
              addProductToSidebar(key, cart[key], cart[key].quantity);
          }
      }
      updateCartQuantity();
  }

  // Initial laddning av produkter från localStorage
  clearProductElements(); // Töm produktrelaterade element i sidebaren vid start
  loadCartFromLocalStorage();
});




















/*CHECKOUT    CHECKOUT           CHECKOUT           CHECKOUT          CHECKOUT*/ 




//Making checkout interactive with shop-page

//making cart active with shop-page
document.addEventListener("DOMContentLoaded", function () {
  // Funktion för att uppdatera cart-siffran i checkout
  function updateCheckoutCartQuantity() {
      const quantityCart = document.querySelector('.shopping-cart-container .quantity-cart');
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      let totalQuantity = 0;
      for (let key in cart) {
          if (cart.hasOwnProperty(key)) {
              totalQuantity += cart[key].quantity;
          }
      }
      quantityCart.textContent = totalQuantity;
  }

  // Initial uppdatering av cart-siffran i checkout
  updateCheckoutCartQuantity();
});




//Making products-order-summary-container interactive 


document.addEventListener("DOMContentLoaded", function () {
  // Funktion för att visa beställningar i checkout-sidan
  function displayOrderSummary() {
      const leftContainer = document.querySelector('.products-order-summary-left-container');
      const rightContainer = document.querySelector('.products-order-summary-right-container');

      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      let productEntries = Object.entries(cart);
      
      // Sortera produkter baserat på den ordning de beställdes
      productEntries.sort((a, b) => a[1].orderTime - b[1].orderTime);

      // Rensa tidigare innehåll
      leftContainer.innerHTML = '';
      rightContainer.innerHTML = '';

      productEntries.forEach((entry, index) => {
          let [key, product] = entry;
          let productElement = document.createElement('p');
          productElement.textContent = `${product.heading}: ${product.quantity}`;

          if (index < 7) {
              leftContainer.appendChild(productElement);
          } else {
              rightContainer.appendChild(productElement);
          }
      });
  }

  // Visa beställningar vid sidladdning
  displayOrderSummary();
});




//Making slider-container active 


document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');
  const sliderContainer = document.querySelector('.slider-container');
  const sliderItemsContainer = document.querySelector('.slider-container .item');
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  let productEntries = Object.entries(cart);
  
  // Sortera produkter baserat på den ordning de beställdes
  productEntries.sort((a, b) => a[1].orderTime - b[1].orderTime);
  
  let currentIndex = 0;

  // Funktion för att skapa ett nytt slider-item
  function createSliderItem(imageClass, productInfo) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    let imageContainerDiv = document.createElement('div');
    imageContainerDiv.classList.add(`${imageClass}-container`);
    let img = document.createElement('img');
    img.classList.add(imageClass);
    img.src = productInfo.image || '';
    imageContainerDiv.appendChild(img);
    itemDiv.appendChild(imageContainerDiv);
    return itemDiv;
  }

  // Funktion för att visa produkterna i slidern
  function displaySliderItems() {
    sliderItemsContainer.innerHTML = '';
    if (productEntries.length > 0) {
      let product = productEntries[currentIndex];
      let [imageClass, productInfo] = product;
      let sliderItem = createSliderItem(imageClass, productInfo);
      sliderItemsContainer.appendChild(sliderItem);
      sliderContainer.classList.add('show');
    }
  }

  // Funktion för att hantera nästa-knappen
  function showNextSliderItem() {
    if (productEntries.length > 1) {
      sliderContainer.classList.remove('show');
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % productEntries.length;
        displaySliderItems();
      }, 500);
    }
  }

  // Funktion för att hantera föregående-knappen
  function showPrevSliderItem() {
    if (productEntries.length > 1) {
      sliderContainer.classList.remove('show');
      setTimeout(() => {
        currentIndex = (currentIndex - 1 + productEntries.length) % productEntries.length;
        displaySliderItems();
      }, 500);
    }
  }

  // Lägg till event listeners för knapparna
  nextButton.addEventListener('click', function () {
    showNextSliderItem();
  });

  prevButton.addEventListener('click', function () {
    showPrevSliderItem();
  });

  // Initial visning av produkter i slidern
  displaySliderItems();
});









//Making customize-product-container active

//Making customize-product-container active
document.addEventListener("DOMContentLoaded", function () {
  const customizeProductContainer = document.querySelector('.customize-product-container');
  const customizeProductsTextContainer = document.querySelector('.customize-products-text-container p');
  const customizeOptionsContainer1 = document.querySelector('.customize-options-container-1');
  const customizeOption1Left = document.querySelector('.customize-option-1-left');
  const sizeOptions = document.querySelectorAll('.customize-options-container-2 input[type="checkbox"]');

  // Funktion för att hantera storleksalternativ (bara en i taget)
  function handleSizeOptions() {
      sizeOptions.forEach(checkbox => {
          checkbox.addEventListener('change', function () {
              if (this.checked) {
                  sizeOptions.forEach(cb => {
                      if (cb !== this) cb.checked = false;
                  });
              }
          });
      });
  }

  handleSizeOptions();

  // Funktion för att uppdatera customization-sektionen baserat på den aktuella produkten
  function updateCustomizeSection(imageClass) {
      let productInfo = coffeeData[imageClass] || dessertsInfo[imageClass] || {};

      // Uppdatera produktens namn i customization-sektionen
      customizeProductsTextContainer.textContent = productInfo.heading || '';

      // Uppdatera customization-alternativen
      const options = [
          productInfo.customize1,
          productInfo.customize2,
          productInfo.customize3,
          productInfo.customize4,
          productInfo.customize5
      ];

      const customizeOptionElements = customizeOptionsContainer1.querySelectorAll('.customize-option-1 p');
      const customizeCheckboxElements = customizeOptionsContainer1.querySelectorAll('.optiopns-box-container-1 input[type="checkbox"]');

      customizeOptionElements.forEach((optionElement, index) => {
          optionElement.textContent = options[index] || '';
          customizeCheckboxElements[index].style.display = options[index] ? 'block' : 'none';
      });

      // Återställ storleksalternativen och sätt Medium som standard
      sizeOptions.forEach(checkbox => {
          checkbox.checked = false;
      });
      sizeOptions[1].checked = true; // Medium är standard

      // Gör customize-sektionen synlig om den inte redan är det
      customizeProductContainer.style.display = 'block';

      // Återställ animationer
      resetAnimations();
  }

  // Funktion för att återställa animationer
  function resetAnimations() {
      const customizeProductsText = document.querySelector('.customize-products-text-container');
      const customizeOptions = document.querySelector('.customize-option-1-left');

      customizeProductsText.style.animation = 'none';
      customizeOptions.style.animation = 'none';

      void customizeProductsText.offsetWidth; // Trigger reflow
      void customizeOptions.offsetWidth; // Trigger reflow

      customizeProductsText.style.animation = 'showContent 0.5s 0.2s linear 1 forwards';
      customizeOptions.style.animation = 'showContent 0.5s 0.2s linear 1 forwards';
      customizeOptions.style.animationDelay = '0.7s'; // Lägg till fördröjningen
  }

  // Funktion för att uppdatera customization-sektionen baserat på slidern
  function updateCustomizeSectionBasedOnSlider() {
      let middleItem = document.querySelector('.slider-container .item img');
      let imageClass = middleItem.classList[0];
      updateCustomizeSection(imageClass);
  }

  // Lägg till event listeners för slider-knapparna för att uppdatera customization-sektionen vid byte av bild
  document.getElementById('next').addEventListener('click', function () {
      setTimeout(updateCustomizeSectionBasedOnSlider, 500); // Matcha tiden med övergångseffekten i slidern
  });

  document.getElementById('prev').addEventListener('click', function () {
      setTimeout(updateCustomizeSectionBasedOnSlider, 500); // Matcha tiden med övergångseffekten i slidern
  });

  // Initial uppdatering
  updateCustomizeSectionBasedOnSlider();
});








document.addEventListener("DOMContentLoaded", function () {
  const customizeProductContainer = document.querySelector('.customize-product-container');
  const customizeProductsTextContainer = document.querySelector('.customize-products-text-container p');
  const customizeOptionsContainer1 = document.querySelector('.customize-options-container-1');
  const customizeOptionsContainer2 = document.querySelector('.customize-options-container-2');

  // Funktion för att uppdatera customization-sektionen baserat på den aktuella produkten
  function updateCustomizeSection(imageClass) {
      let productInfo = coffeeData[imageClass] || dessertsInfo[imageClass] || {};

      // Uppdatera produktens namn i customization-sektionen
      customizeProductsTextContainer.style.animation = 'none';
      setTimeout(() => {
          customizeProductsTextContainer.textContent = productInfo.heading || '';
          customizeProductsTextContainer.style.animation = '';
      }, 10);

      // Uppdatera customization-alternativen
      const options = [
          productInfo.customize1,
          productInfo.customize2,
          productInfo.customize3,
          productInfo.customize4,
          productInfo.customize5
      ];

      const customizeOptionElements = customizeOptionsContainer1.querySelectorAll('.customize-option-1 p');
      const customizeCheckboxElements = customizeOptionsContainer1.querySelectorAll('.optiopns-box-container-1 input[type="checkbox"]');

      customizeOptionElements.forEach((optionElement, index) => {
          optionElement.textContent = options[index] || '';
          customizeCheckboxElements[index].style.display = options[index] ? 'block' : 'none';
      });

      // Uppdatera storleksalternativen
      customizeOptionsContainer2.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
          checkbox.checked = false;
      });

      // Gör customize-sektionen synlig om den inte redan är det
      customizeProductContainer.style.display = 'block';
  }

  // Funktion för att uppdatera customization-sektionen baserat på slidern
  function updateCustomizeSectionBasedOnSlider() {
      let middleItem = document.querySelector('.slider-container .item img');
      let imageClass = middleItem.classList[0];
      updateCustomizeSection(imageClass);
  }

  // Uppdatera customization-sektionen vid initial laddning
  updateCustomizeSectionBasedOnSlider();

  // Lägg till event listeners för slider-knapparna för att uppdatera customization-sektionen vid byte av bild
  document.getElementById('next').addEventListener('click', function () {
      setTimeout(updateCustomizeSectionBasedOnSlider, 500); // Matcha tiden med övergångseffekten i slidern
  });

  document.getElementById('prev').addEventListener('click', function () {
      setTimeout(updateCustomizeSectionBasedOnSlider, 500); // Matcha tiden med övergångseffekten i slidern
  });
});


















 //Making box-2-payment-information active
 
 document.addEventListener("DOMContentLoaded", function () {
  const customizeOptionsContainer1 = document.querySelector('.customize-options-container-1');
  const sizeOptions = document.querySelectorAll('.customize-options-container-2 input[type="checkbox"]');
  const productPriceElement = document.getElementById('product-price');
  const customizePriceElement = document.getElementById('customize-price');
  const totalProductPriceElement = document.getElementById('total-product-price');

  let currentProduct = null;
  let basePrice = 0;
  let customizationTotal = 0;
  let quantity = 1;
  let productCustomizations = {};

  // Hämta kvantiteten för den valda produkten
  function getQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    return cart[productId]?.quantity || 1;
  }

  // Uppdatera prisinformationen för den aktuella produkten
  function updatePriceInformation() {
    if (!currentProduct) return;

    // Beräkna kostnaden för anpassningar
    customizationTotal = 0;
    const customizeCheckboxes = customizeOptionsContainer1.querySelectorAll('input[type="checkbox"]:checked');
    customizeCheckboxes.forEach(() => {
      customizationTotal += 0.5; // Pris per anpassning
    });

    // Beräkna modifierare för storlek
    let sizeModifier = 0;
    sizeOptions.forEach(checkbox => {
      if (checkbox.checked) {
        if (checkbox.name === 'small') {
          sizeModifier = -1;
        } else if (checkbox.name === 'large') {
          sizeModifier = 1;
        }
      }
    });

    // Uppdatera priset för anpassningar
    const totalCustomizationCost = customizationTotal + sizeModifier;
    customizePriceElement.textContent = `Customization: $${totalCustomizationCost.toFixed(2)}`;

    // Uppdatera priset för produkten baserat på kvantitet och anpassningar
    const productTotalPrice = (basePrice + totalCustomizationCost) * quantity;
    productPriceElement.textContent = `${currentProduct.heading}: $${(basePrice * quantity).toFixed(2)}`;

    // Spara anpassningsvalen för den aktuella produkten
    productCustomizations[currentProduct.id] = {
      customizations: customizationTotal,
      sizeModifier: sizeModifier,
      quantity: quantity
    };

    // Uppdatera totalpriset för alla produkter
    updateTotalPrice();
  }

  // Uppdatera totalpriset för alla produkter
  function updateTotalPrice() {
    let totalPrice = 0;
    const orderedProducts = JSON.parse(localStorage.getItem('cart')) || {};

    Object.keys(orderedProducts).forEach(productId => {
      let product = orderedProducts[productId];
      let productPrice = parseFloat(product.price.slice(1));
      let quantity = product.quantity || 1;

      // Hämta eventuella anpassningar för denna produkt
      let customizationPrice = 0;
      if (productCustomizations[productId]) {
        customizationPrice = (productCustomizations[productId].customizations + productCustomizations[productId].sizeModifier);
      }

      // Lägg till produktens baspris och anpassningskostnader multiplicerat med kvantitet
      totalPrice += (productPrice + customizationPrice) * quantity;
    });

    totalProductPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  }

  // Uppdatera anpassningssektionen baserat på vald produkt
  function updateCustomizeSection(imageClass) {
    currentProduct = coffeeData[imageClass] || dessertsInfo[imageClass] || {};
    basePrice = parseFloat(currentProduct.price.slice(1));
    quantity = getQuantity(currentProduct.id);

    // Återställ anpassningsalternativen
    const options = [
      currentProduct.customize1,
      currentProduct.customize2,
      currentProduct.customize3,
      currentProduct.customize4,
      currentProduct.customize5
    ];

    const customizeOptionElements = customizeOptionsContainer1.querySelectorAll('.customize-option-1 p');
    const customizeCheckboxElements = customizeOptionsContainer1.querySelectorAll('.optiopns-box-container-1 input[type="checkbox"]');

    customizeOptionElements.forEach((optionElement, index) => {
      optionElement.textContent = options[index] || '';
      customizeCheckboxElements[index].checked = false;
      customizeCheckboxElements[index].style.display = options[index] ? 'block' : 'none';
    });

    // Återställ storleksalternativen
    sizeOptions.forEach(checkbox => {
      checkbox.checked = false;
    });

    if (productCustomizations[currentProduct.id]) {
      let savedCustomizations = productCustomizations[currentProduct.id];
      customizeCheckboxElements.forEach(checkbox => {
        checkbox.checked = savedCustomizations.checkedOptions.includes(checkbox.name);
      });
      sizeOptions.forEach(checkbox => {
        if (savedCustomizations.sizeOption.includes(checkbox.name)) {
          checkbox.checked = true;
        }
      });
    } else {
      sizeOptions[1].checked = true; // Medium som standard
    }

    updatePriceInformation();
  }

  // Lägga till event-lyssnare för anpassningsalternativen
  customizeOptionsContainer1.addEventListener('change', updatePriceInformation);
  sizeOptions.forEach(checkbox => {
    checkbox.addEventListener('change', updatePriceInformation);
  });

  // Uppdatera anpassningssektionen baserat på den valda produkten i slidern
  function updateCustomizeSectionBasedOnSlider() {
    let middleItem = document.querySelector('.slider-container .item img');
    let imageClass = middleItem.classList[0];
    updateCustomizeSection(imageClass);
  }

  // Event-lyssnare för att byta produkter i slidern
  document.getElementById('next').addEventListener('click', function () {
    setTimeout(updateCustomizeSectionBasedOnSlider, 500);
  });

  document.getElementById('prev').addEventListener('click', function () {
    setTimeout(updateCustomizeSectionBasedOnSlider, 500);
  });

  // Initial uppdatering
  updateCustomizeSectionBasedOnSlider();
});





 /*


 document.addEventListener("DOMContentLoaded", function () {
  const customizeOptionsContainer1 = document.querySelector('.customize-options-container-1');
  const sizeOptions = document.querySelectorAll('.customize-options-container-2 input[type="checkbox"]');
  const productPriceElement = document.getElementById('product-price');
  const customizePriceElement = document.getElementById('customize-price');
  const totalProductPriceElement = document.getElementById('total-product-price');
  
  let currentProduct = null;
  let basePrice = 0; // Baspris för produkten utan kvantitet
  let customizationTotal = 0;
  let quantity = 1; // Standardkvantitet om den inte ändras
  let productCustomizations = {}; // För att hålla reda på anpassningsval för varje produkt

  // Hämta kvantiteten för den valda produkten
  function getQuantity(productId) {
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      return cart[productId]?.quantity || 1;
  }

  // Uppdatera prisinformationen för den aktuella produkten
  function updatePriceInformation() {
      if (!currentProduct) return;

      // Beräkna kostnaden för anpassningar
      customizationTotal = 0;
      const customizeCheckboxes = customizeOptionsContainer1.querySelectorAll('input[type="checkbox"]:checked');
      customizeCheckboxes.forEach(() => {
          customizationTotal += 0.5;
      });

      // Beräkna modifierare för storlek
      let sizeModifier = 0;
      sizeOptions.forEach(checkbox => {
          if (checkbox.checked) {
              if (checkbox.name === 'small') {
                  sizeModifier = -1;
              } else if (checkbox.name === 'large') {
                  sizeModifier = 1;
              }
          }
      });

      // Uppdatera totalpris för anpassningar
      const totalCustomizationCost = (customizationTotal + sizeModifier) * quantity;
      customizePriceElement.textContent = `Customization: $${totalCustomizationCost.toFixed(2)}`;

      // Beräkna och uppdatera produktens pris
      const productTotalPrice = (basePrice + totalCustomizationCost) * quantity;
      productPriceElement.textContent = `${currentProduct.heading}: $${productTotalPrice.toFixed(2)}`;

      // Spara anpassningsvalen för den aktuella produkten
      productCustomizations[currentProduct.id] = {
          customizations: customizationTotal,
          sizeModifier: sizeModifier,
          quantity: quantity
      };

      // Uppdatera totalpriset för alla produkter
      updateTotalPrice();
  }

  // Uppdatera totalpriset för alla produkter
  function updateTotalPrice() {
      let totalPrice = 0;
      const orderedProducts = JSON.parse(localStorage.getItem('cart')) || {};

      Object.keys(orderedProducts).forEach(productId => {
          let product = orderedProducts[productId];
          let productPrice = parseFloat(product.price.slice(1)); // Ta bort '$' och konvertera till nummer
          let quantity = product.quantity || 1;

          // Hämta eventuella anpassningar för denna produkt
          let customizationPrice = 0;
          if (productCustomizations[productId]) {
              customizationPrice = (productCustomizations[productId].customizations + productCustomizations[productId].sizeModifier) * quantity;
          }

          // Lägg till produktens baspris och anpassningskostnader
          totalPrice += (productPrice * quantity) + customizationPrice;
      });

      totalProductPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  }

  // Uppdatera anpassningssektionen baserat på vald produkt
  function updateCustomizeSection(imageClass) {
      currentProduct = coffeeData[imageClass] || dessertsInfo[imageClass] || {};
      basePrice = parseFloat(currentProduct.price.slice(1)); // Ta bort '$' och konvertera till nummer
      quantity = getQuantity(currentProduct.id); // Hämta kvantiteten för den aktuella produkten

      // Återställ anpassningsalternativen
      const options = [
          currentProduct.customize1,
          currentProduct.customize2,
          currentProduct.customize3,
          currentProduct.customize4,
          currentProduct.customize5
      ];

      const customizeOptionElements = customizeOptionsContainer1.querySelectorAll('.customize-option-1 p');
      const customizeCheckboxElements = customizeOptionsContainer1.querySelectorAll('.optiopns-box-container-1 input[type="checkbox"]');

      customizeOptionElements.forEach((optionElement, index) => {
          optionElement.textContent = options[index] || '';
          customizeCheckboxElements[index].checked = false;
          customizeCheckboxElements[index].style.display = options[index] ? 'block' : 'none';
      });

      // Återställ storleksalternativen
      sizeOptions.forEach(checkbox => {
          checkbox.checked = false;
      });

      if (productCustomizations[currentProduct.id]) {
          let savedCustomizations = productCustomizations[currentProduct.id];
          customizeCheckboxElements.forEach(checkbox => {
              checkbox.checked = savedCustomizations.checkedOptions.includes(checkbox.name);
          });
          sizeOptions.forEach(checkbox => {
              if (savedCustomizations.sizeOption.includes(checkbox.name)) {
                  checkbox.checked = true;
              }
          });
      } else {
          sizeOptions[1].checked = true; // Medium som standard
      }

      updatePriceInformation();
  }

  // Lägga till event-lyssnare för anpassningsalternativen
  customizeOptionsContainer1.addEventListener('change', updatePriceInformation);
  sizeOptions.forEach(checkbox => {
      checkbox.addEventListener('change', updatePriceInformation);
  });

  // Uppdatera anpassningssektionen baserat på den valda produkten i slidern
  function updateCustomizeSectionBasedOnSlider() {
      let middleItem = document.querySelector('.slider-container .item img');
      let imageClass = middleItem.classList[0];
      updateCustomizeSection(imageClass);
  }

  // Event-lyssnare för att byta produkter i slidern
  document.getElementById('next').addEventListener('click', function () {
      setTimeout(updateCustomizeSectionBasedOnSlider, 500);
  });

  document.getElementById('prev').addEventListener('click', function () {
      setTimeout(updateCustomizeSectionBasedOnSlider, 500);
  });

  // Initial uppdatering
  updateCustomizeSectionBasedOnSlider();
});





*/



























//Making loading animation active with paypal and mastercard 
document.addEventListener("DOMContentLoaded", function () {
  const payButton = document.querySelector('.pay-button-container button');
  const paymentOptionsContainer = document.querySelector('.paypal-or-mastercard-container');
  const paypalButton = document.querySelector('.paypal-button');
  const mastercardButton = document.querySelector('.mastercard-button');
  const loadingContainer = document.querySelector('.loading-container');

  let count = 0;
  let loading = document.getElementById('loading');
  let valueShow = document.getElementById('value-show');

  // Funktion för att visa betalningsalternativ
  payButton.addEventListener('click', function () {
      paymentOptionsContainer.style.display = 'block';
  });

  // Funktion för att visa laddningsanimation och starta den
  function startLoadingAnimation() {
      paymentOptionsContainer.style.display = 'none';
      loadingContainer.style.display = 'block';
      count = 0;
      startLoading();
  }

  // Event listeners för PayPal- och Mastercard-knapparna
  paypalButton.addEventListener('click', startLoadingAnimation);
  mastercardButton.addEventListener('click', startLoadingAnimation);

  // Funktion för att starta laddningsanimationen
  function startLoading() {
      if (count === 100) {
          valueShow.innerHTML = "Order completed";
          setTimeout(hideLoadingAnimation, 2000); // Göm laddningsanimationen efter 5 sekunder
          return;
      } else {
          count += 1;
          valueShow.innerHTML = count + '%';
          loading.style.setProperty("--loading-value", count + '%');
          setTimeout(startLoading, 50);
      }
  }

  // Funktion för att gömma laddningsanimationen
  function hideLoadingAnimation() {
      loadingContainer.style.display = 'none';
  }
});































/*



document.addEventListener("DOMContentLoaded", function () {
  const payButton = document.querySelector('.pay-button-container button');
  const paymentOptionsContainer = document.querySelector('.paypal-or-mastercard-container');
  const paypalButton = document.querySelector('.paypal-button');
  const mastercardButton = document.querySelector('.mastercard-button');
  const loadingContainer = document.querySelector('.loading-container');

  let count = 0;
  let loading = document.getElementById('loading');
  let valueShow = document.getElementById('value-show');

  // Funktion för att visa betalningsalternativ
  payButton.addEventListener('click', function () {
      paymentOptionsContainer.style.display = 'block';
  });

  // Funktion för att visa laddningsanimation och starta den
  function startLoadingAnimation() {
      paymentOptionsContainer.style.display = 'none';
      loadingContainer.style.display = 'block';
      count = 0;
      startLoading();
  }

  // Event listeners för PayPal- och Mastercard-knapparna
  paypalButton.addEventListener('click', startLoadingAnimation);
  mastercardButton.addEventListener('click', startLoadingAnimation);

  // Funktion för att starta laddningsanimationen
  function startLoading() {
      if (count === 100) {
          valueShow.innerHTML = "Order completed";
          return;
      } else {
          count += 1;
          valueShow.innerHTML = count + '%';
          loading.style.setProperty("--loading-value", count + '%');
          setTimeout(startLoading, 50);
      }
  }
});



*/








/*

//Making loading animation active

let count = 0;
let loading = document.getElementById('loading');
let valueShow = document.getElementById('value-show');

loading.onclick = function(){
 if(count != 0){
  return;
 }

  count = 0;
  startLoading();
}


function startLoading(){
  if(count=== 100){
     valueShow.innerHTML = "Order completed";
     
     return;
  }else{
    count = count +1;
    valueShow.innerHTML = count + '%';
    loading.style.setProperty("--loading-value", count + '%');
    setTimeout(startLoading, 50);
  }
}

*/













 /*

 document.addEventListener("DOMContentLoaded", function () {
  const customizeOptionsContainer1 = document.querySelector('.customize-options-container-1');
  const sizeOptions = document.querySelectorAll('.customize-options-container-2 input[type="checkbox"]');
  const productPriceElement = document.getElementById('product-price');
  const customizePriceElement = document.getElementById('customize-price');
  const totalProductPriceElement = document.getElementById('total-product-price');

  let currentProduct = null;
  let currentProductPrice = 0;
  let customizationTotal = 0;

  // För att hålla reda på anpassningsval för varje produkt
  let productCustomizations = {};

  // Funktion för att uppdatera prisinformation för den aktuella produkten
  function updatePriceInformation() {
      // Beräkna total customization kostnad
      customizationTotal = 0;
      const customizeCheckboxes = customizeOptionsContainer1.querySelectorAll('input[type="checkbox"]:checked');
      customizeCheckboxes.forEach(() => {
          customizationTotal += 0.5;
      });

      // Beräkna storleksmodifierare
      let sizeModifier = 0;
      sizeOptions.forEach(checkbox => {
          if (checkbox.checked) {
              if (checkbox.name === 'small') {
                  sizeModifier = -1;
              } else if (checkbox.name === 'large') {
                  sizeModifier = 1;
              }
          }
      });

      // Uppdatera customization pris
      customizePriceElement.textContent = `Customization: $${customizationTotal.toFixed(2)}`;

      // Beräkna och uppdatera det nya priset för produkten
      const newProductPrice = (currentProductPrice + customizationTotal + sizeModifier) * getQuantity(currentProduct.id);
      productPriceElement.textContent = `${currentProduct.heading}: $${newProductPrice.toFixed(2)}`;

      // Spara anpassningsvalen för den aktuella produkten
      if (currentProduct) {
          productCustomizations[currentProduct.id] = {
              customizations: customizationTotal,
              sizeModifier: sizeModifier,
              checkedOptions: Array.from(customizeCheckboxes).map(cb => cb.name),
              sizeOption: Array.from(sizeOptions).filter(cb => cb.checked).map(cb => cb.name)
          };
      }

      // Uppdatera totalpriset för alla produkter
      updateTotalPrice();
  }

  // Funktion för att uppdatera totalpriset för alla produkter
  function updateTotalPrice() {
      let totalPrice = 0;

      const orderedProducts = JSON.parse(localStorage.getItem('cart')) || {};
      Object.keys(orderedProducts).forEach(productId => {
          let product = orderedProducts[productId];
          let productPrice = parseFloat(product.price.slice(1)); // Tar bort '$' och konverterar till nummer
          let customizationPrice = productCustomizations[productId]?.customizations || 0;
          let sizeModifier = productCustomizations[productId]?.sizeModifier || 0;
          let quantity = product.quantity || 1;

          totalPrice += (productPrice + customizationPrice + sizeModifier) * quantity;
      });

      totalProductPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  }

  // Funktion för att få kvantitet för en produkt
  function getQuantity(productId) {
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      return cart[productId]?.quantity || 1;
  }

  // Funktion för att uppdatera customization-sektionen baserat på den aktuella produkten
  function updateCustomizeSection(imageClass) {
      currentProduct = coffeeData[imageClass] || dessertsInfo[imageClass] || {};
      currentProductPrice = parseFloat(currentProduct.price.slice(1)); // Tar bort '$' och konverterar till nummer

      // Uppdatera produktens pris
      productPriceElement.textContent = `${currentProduct.heading}: $${(currentProductPrice * getQuantity(currentProduct.id)).toFixed(2)}`;

      // Återställ anpassningsalternativen
      const options = [
          currentProduct.customize1,
          currentProduct.customize2,
          currentProduct.customize3,
          currentProduct.customize4,
          currentProduct.customize5
      ];

      const customizeOptionElements = customizeOptionsContainer1.querySelectorAll('.customize-option-1 p');
      const customizeCheckboxElements = customizeOptionsContainer1.querySelectorAll('.optiopns-box-container-1 input[type="checkbox"]');

      customizeOptionElements.forEach((optionElement, index) => {
          optionElement.textContent = options[index] || '';
          customizeCheckboxElements[index].checked = false;
          customizeCheckboxElements[index].style.display = options[index] ? 'block' : 'none';
      });

      // Återställ storleksalternativen och sätt Medium som standard
      sizeOptions.forEach(checkbox => {
          checkbox.checked = false;
      });

      // Om det finns sparade anpassningsval för den aktuella produkten, återställ dem
      if (productCustomizations[currentProduct.id]) {
          let savedCustomizations = productCustomizations[currentProduct.id];
          customizeCheckboxElements.forEach(checkbox => {
              checkbox.checked = savedCustomizations.checkedOptions.includes(checkbox.name);
          });
          sizeOptions.forEach(checkbox => {
              if (savedCustomizations.sizeOption.includes(checkbox.name)) {
                  checkbox.checked = true;
              }
          });
      } else {
          // Sätt medium som standard endast om inga sparade anpassningar finns
          sizeOptions[1].checked = true;
      }

      // Uppdatera prisinformationen
      updatePriceInformation();
  }

  // Lägg till event listeners för checkboxarna för att uppdatera prisinformationen vid förändring
  customizeOptionsContainer1.addEventListener('change', updatePriceInformation);
  sizeOptions.forEach(checkbox => {
      checkbox.addEventListener('change', updatePriceInformation);
  });

  // Funktion för att uppdatera customization-sektionen baserat på slidern
  function updateCustomizeSectionBasedOnSlider() {
      let middleItem = document.querySelector('.slider-container .item img');
      let imageClass = middleItem.classList[0];
      updateCustomizeSection(imageClass);
  }

  // Lägg till event listeners för slider-knapparna för att uppdatera customization-sektionen vid byte av bild
  document.getElementById('next').addEventListener('click', function () {
      setTimeout(updateCustomizeSectionBasedOnSlider, 500); // Matcha tiden med övergångseffekten i slidern
  });

  document.getElementById('prev').addEventListener('click', function () {
      setTimeout(updateCustomizeSectionBasedOnSlider, 500); // Matcha tiden med övergångseffekten i slidern
  });

  // Funktion för att visa beställningar i checkout-sidan
  function displayOrderSummary() {
      const leftContainer = document.querySelector('.products-order-summary-left-container');
      const rightContainer = document.querySelector('.products-order-summary-right-container');

      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      let productEntries = Object.entries(cart);
      
      // Sortera produkter baserat på den ordning de beställdes
      productEntries.sort((a, b) => a[1].orderTime - b[1].orderTime);

      // Rensa tidigare innehåll
      leftContainer.innerHTML = '';
      rightContainer.innerHTML = '';

      productEntries.forEach((entry, index) => {
          let [key, product] = entry;
          let productElement = document.createElement('p');
          productElement.textContent = `${product.heading}: ${product.quantity}`;

          if (index < 7) {
              leftContainer.appendChild(productElement);
          } else {
              rightContainer.appendChild(productElement);
          }
      });
  }

  // Visa beställningar vid sidladdning
  displayOrderSummary();

  // Initial uppdatering
  updateCustomizeSectionBasedOnSlider();
});

*/








const coffeeData = {
  id: '1',
  'toblerone-coffe-image': {
    heading: 'Toblerone Coffee',
    about: 'Enjoy the luxurious taste of Toblerone-infused coffee, blending rich chocolate and honeyed almond flavors. We use premium Swiss Toblerone chocolate, prized for its creamy texture and signature nougat. This infusion elevates our coffee to new heights of indulgence, offering a smooth, velvety finish. Perfect for chocolate lovers seeking a delightful treat.',
    price: '$4',
    image: 'img/toblerone-menu-image.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add extra toblerone bites',
    customize2: 'Add marshmallow',
    customize3: 'Add extra milk',
    customize4: 'Add cream',
    customize5: 'Add ice',
    customizePrice: '$0.5',
    customizeLarge: '+$1',
    customizeSmall: '-$1',
    totalPrice: '$',
    quantity: 1,

    
  },
  'hazelnut-coffe-image': {
    id: '2',
    heading: 'Hazelnut Coffee',
    about: 'Experience the delightful harmony of nutty hazelnut and smooth coffee. Our Hazelnut Coffee features premium hazelnuts, known for their rich, buttery flavor. Roasted to perfection, they enhance the coffee\'s natural sweetness, creating a warm, inviting aroma. Blended expertly, it results in a smooth, velvety drink with a distinct nutty undertone. Perfect for those seeking a comforting and satisfying coffee experience.',
    price: '$3',
    image: 'img/hazelnut-coffee-image.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add extra hazelnut bites',
    customize2: 'Add marshmallow',
    customize3: 'Add extra milk',
    customize4: 'Add cream',
    customize5: 'Add  ice',
    customizePrice: '$0.5',
    customizeLarge: '+$1',
    customizeSmall: '-$1',
    totalPrice: '$',
    quantity: 1,
  },
  'vanila-coffee-image': {
    id: '3',
    heading: 'Vanilla Coffee',
    about: 'Enjoy the smooth and sweet flavor of our vanilla coffee. Made with high-quality vanilla beans, known for their rich aroma, this blend is perfectly balanced with our expertly roasted coffee. The result is a creamy, sweet cup that brings out the best in both the vanilla and the coffee. Experience a delicious coffee that\'s both comforting and satisfying.',
    price: '$2',
    image: 'img/vanila-coffee-image.png',
      deleteIcon: 'img/delete.png' ,
      customize1: 'Add extra vanilla',
      customize2: 'Add marshmallow',
      customize3: 'Add extra milk',
      customize4: 'Add cream',
      customize5: 'Add  ice',
      customizePrice: '$0.5',
      customizeLarge: '+$1',
      customizeSmall: '-$1',
      totalPrice: '$',
      quantity: 1,
  },
  'ice-coffe-image': {
    id: '4',
    heading: 'Ice Coffee',
    about: 'Refresh your senses with our invigorating iced coffee, a cool and refreshing escape that energizes your day with every sip. Expertly crafted with our smooth, medium-bodied coffee blend, chilled to perfection for a crisp, clean finish. Whether it\'s a hot summer day or you need a pick-me-up, our iced coffee delivers a revitalizing experience that keeps you refreshed and energized.',
    price: '$3',
    image: 'img/ice-coffee-image.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add extra ice',
      customize2: 'Add marshmallow',
      customize3: 'Add extra milk',
      customize4: 'Add cream',
      customizePrice: '$0.5',
      customizeLarge: '+$1',
      customizeSmall: '-$1',
      totalPrice: '$',
      quantity: 1,
     
  },
  'brown-coffe-image': {
    id: '5',
    heading: 'Brown Coffee',
    about: 'Delight in the warm and comforting embrace of our brown coffee, a timeless classic that brings comfort and joy to every moment. This rich and aromatic blend offers a smooth, satisfying cup that embodies the essence of traditional coffee flavors. Enjoy the comforting warmth and inviting aroma of our expertly crafted brown coffee, perfect for any occasion.',
    price: '$2',
    image: 'img/brown-coffee-image.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add chocolate bites',
    customize2: 'Add marshmallow',
    customize3: 'Add extra milk',
    customize4: 'Add cream',
    customize5: 'Add  ice',
    customizePrice: '$0.5',
    customizeLarge: '+$1',
    customizeSmall: '-$1',
    totalPrice: '$',
    quantity: 1,
  },
  'dark-coffe-image': {
    id: '6',
    heading: 'Dark Coffee',
    about: 'Indulge in the rich and robust flavor of dark coffee, transporting you to a world of sophistication and depth. Crafted from high-quality, organic Arabica beans sourced from Colombia\'s highlands, our expert roasting process enhances their natural complexity. The result is a perfectly balanced coffee with boldness and smoothness, truly standing out for its superior quality and intricate flavor profile.',
    price: '$2',
    image: 'img/dark-coffee-image.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add dark beans',
    customize2: 'Add marshmallow',
    customize3: 'Add extra milk',
    customize4: 'Add cream',
    customize5: 'Add  ice',
    customizePrice: '$0.5',
    customizeLarge: '+$1',
    customizeSmall: '-$1',
    totalPrice: '$',
    quantity: 1,
  },
};























/*


document.addEventListener('DOMContentLoaded', function () {
  const orderButtonMenu = document.querySelectorAll('.item-button');
  const sidebarContainer = document.querySelector('.sidebar-container');
  const quantityCart = document.querySelector('.quantity-cart');

  // Funktion för att uppdatera cart-siffran
  function updateCartQuantity() {
      const productElements = sidebarContainer.querySelectorAll('.sidebar-info-container');
      let totalQuantity = 0;
      productElements.forEach(element => {
          const quantitySpan = element.querySelector('.sidebar-quantity-container span:nth-child(2)');
          totalQuantity += parseInt(quantitySpan.textContent);
      });
      quantityCart.textContent = totalQuantity;
  }

  // Funktion för att hitta en produkt i sidebaren baserat på klassnamn
  function findProductInSidebar(imageClass) {
      return Array.from(sidebarContainer.querySelectorAll('.sidebar-info-container')).find(element => {
          const sidebarImage = element.querySelector('.sidebar-image');
          return sidebarImage.classList.contains(imageClass);
      });
  }

  // Funktion för att skapa och lägga till en ny produkt i sidebaren
  function addProductToSidebar(imageClass, productInfo) {
      // Skapa nya element för sidebaren
      const newSidebarInfoContainer2 = document.createElement('div');
      newSidebarInfoContainer2.classList.add('sidebar-info-container-2');

      // Skapa och lägg till delete-icon container med tooltip
      const deleteIconContainer = document.createElement('div');
      deleteIconContainer.classList.add('delete-icon-container');
      const deleteIcon = document.createElement('img');
      deleteIcon.classList.add('delete-icon');
      deleteIcon.src = productInfo.deleteIcon;
      const tooltipDelete = document.createElement('div');
      tooltipDelete.classList.add('tooltip-delete');
      tooltipDelete.textContent = 'Delete';
      deleteIconContainer.appendChild(deleteIcon);
      deleteIconContainer.appendChild(tooltipDelete);

      // Skapa och lägg till sidebar-info-container
      const newSidebarInfoContainer = document.createElement('div');
      newSidebarInfoContainer.classList.add('sidebar-info-container');

      // Skapa och lägg till bild container
      const sidebarImageContainer = document.createElement('div');
      sidebarImageContainer.classList.add('sidebar-image-container');
      const sidebarImage = document.createElement('img');
      sidebarImage.classList.add('sidebar-image', imageClass);
      sidebarImage.src = productInfo.image || '';
      sidebarImageContainer.appendChild(sidebarImage);

      // Skapa och lägg till pris container
      const sidebarPriceContainer = document.createElement('div');
      sidebarPriceContainer.classList.add('sidebar-price-container');
      const sidebarPrice = document.createElement('p');
      sidebarPrice.classList.add('sidebar-price');
      sidebarPrice.textContent = productInfo.price || '$0';
      sidebarPriceContainer.appendChild(sidebarPrice);

      // Skapa och lägg till kvantitets container
      const sidebarQuantityContainer = document.createElement('div');
      sidebarQuantityContainer.classList.add('sidebar-quantity-container');
      const minusSpan = document.createElement('span');
      minusSpan.classList.add('minus');
      minusSpan.textContent = '-';
      const quantitySpan = document.createElement('span');
      quantitySpan.textContent = '1';
      const plusSpan = document.createElement('span');
      plusSpan.classList.add('plus');
      plusSpan.textContent = '+';
      sidebarQuantityContainer.appendChild(minusSpan);
      sidebarQuantityContainer.appendChild(quantitySpan);
      sidebarQuantityContainer.appendChild(plusSpan);

      // Bygg upp den nya sidebar-info-container
      newSidebarInfoContainer.appendChild(sidebarImageContainer);
      newSidebarInfoContainer.appendChild(sidebarPriceContainer);
      newSidebarInfoContainer.appendChild(sidebarQuantityContainer);

      // Lägg till sidebar-info-container och delete-icon-container i sidebar-info-container-2
      newSidebarInfoContainer2.appendChild(deleteIconContainer);
      newSidebarInfoContainer2.appendChild(newSidebarInfoContainer);

      // Lägg till den nya sidebar-info-container-2 i sidebaren
      sidebarContainer.insertBefore(newSidebarInfoContainer2, sidebarContainer.querySelector('.close-button-container'));

      // event listener delete button
      deleteIcon.addEventListener('click', function () {
          sidebarContainer.removeChild(newSidebarInfoContainer2);
          updateCartQuantity();
      });

      // Event listener for + and - buttons
      minusSpan.addEventListener('click', function () {
          let quantity = parseInt(quantitySpan.textContent);
          if (quantity > 1) {
              quantity--;
              quantitySpan.textContent = quantity;
              updateCartQuantity();
          } else {
              // Delete product if quantity is 0
              sidebarContainer.removeChild(newSidebarInfoContainer2);
              updateCartQuantity();
          }
      });

      plusSpan.addEventListener('click', function () {
          let quantity = parseInt(quantitySpan.textContent);
          quantity++;
          quantitySpan.textContent = quantity;
          updateCartQuantity();
      });

      // Uppdatera cart-number
      updateCartQuantity();
  }

  // add event listener on order-buttons
  orderButtonMenu.forEach(button => {
      button.addEventListener('click', function (event) {
          // Hitta den aktuella produkten
          const item = event.target.closest('.item');
          const imageId = item.id + '-image';
          const productInfo = dessertsInfo[imageId] || {};

          // Kontrollera om produkten redan finns i sidebaren
          const existingProduct = findProductInSidebar(imageId);
          if (existingProduct) {
              // Öka kvantiteten om produkten redan finns
              const quantitySpan = existingProduct.querySelector('.sidebar-quantity-container span:nth-child(2)');
              let quantity = parseInt(quantitySpan.textContent);
              quantity++;
              quantitySpan.textContent = quantity;
              updateCartQuantity();
          } else {
              // Lägg till ny produkt till sidebaren
              addProductToSidebar(imageId, productInfo);
          }

          // Visa sidebaren om den är dold
          sidebarContainer.style.display = 'block';
          setTimeout(() => {
              sidebarContainer.classList.add('open');
          }, 10);
      });
  });

  // Hantera stängning av sidebaren
  const closeButton = document.querySelector('.close-button');
  closeButton.addEventListener('click', function () {
      sidebarContainer.classList.remove('open');
      setTimeout(() => {
          sidebarContainer.style.display = 'none';
      }, 300); // Matcha transition duration
  });

  // Töm produktrelaterade element i sidebaren vid start
  clearProductElements();
});









*/




























const dessertsInfo = {
  'pancakes-image': {
    id: '1',
    heading: 'Pancakes',
    about: 'Our pancakes are made with the finest ingredients, offering a fluffy and golden texture that melts in your mouth. Perfect with a cup of coffee to start your day right.',
    price: '$4',
    image: 'img/pancakes-main-background.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add extra chocolate',
    customize2: 'Add extra strawberrys',
    customize3: 'Add syrup',
    customize4: 'Add ice cream',
    customize5: 'Add blueberrys',
    customizePrice: '$0.5',
    customizeLarge: '+$1',
    customizeSmall: '-$1',
    totalPrice: '$',
    quantity: 1,
  },



  'muffin-image': {
    id: '2',
    heading: 'Muffin',
    about: 'Baked to perfection, our muffins are soft and moist on the inside with a lightly crispy exterior. Ideal for enjoying with a warm cup of coffee.',
    price: '$2',
    image: 'img/Muffin-image.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add extra chocolate',
    customize2: 'Add strawberrys',
    customize3: 'Add cream',
    customize4: 'Add ice cream',
    customize5: 'Add chocolate sauce',
    customizePrice: '$0.5',
    customizeLarge: '+$1',
    customizeSmall: '-$1',
    totalPrice: '$',
    quantity: 1,
    
  },



  

  'brownie-image': {
    id: '3',
    heading: 'Brownie',
    about: 'Our brownie is crafted with high-quality chocolate, providing a rich and fudgy center topped with a crispy layer. Its an ideal match for your favorite coffee.',
    price: '$2',
    image: 'img/brownie-image.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add chocolate sauce',
    customize2: 'Add strawberrys',
    customize3: 'Add cream',
    customize4: 'Add ice cream',
    customize5: 'Add blueberrys',
    customizePrice: '$0.5',
    customizeLarge: '+$1',
    customizeSmall: '-$1',
    totalPrice: '$',
    quantity: 1,
  },


  'cheesecake-image': {
    id: '4',
    heading: 'Cheesecake',
    about: 'Silky and full of flavor, our cheesecake features a creamy texture with a crispy base. Pair it with a coffee for a luxurious treat.',
    price: '$3',
    image: 'img/Cheesecake-image.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add raspberry',
    customize2: 'Add strawberrys',
    customize3: 'Add cream',
    customize4: 'Add ice cream',
    customize5: 'Add blueberrys',
    customizePrice: '$0.5',
    customizeLarge: '+$1',
    customizeSmall: '-$1',
    totalPrice: '$',
    quantity: 1,
  },



  'cookie-image': {
    id: '5',
    heading: 'Cookie',
    about: 'Filled with rich chocolate chips and baked to perfection, our cookies offer the perfect balance between soft and crispy. A delightful companion to your coffee.',
    price: '$2',
    image: 'img/Cookie-image.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add chocolate sauce',
    customize2: 'Add strawberrys',
    customize3: 'Add cream',
    customize4: 'Add ice cream',
    customize5: 'Add raspberry',
    customizePrice: '$0.5',
    customizeLarge: '+$1',
    customizeSmall: '-$1',
    totalPrice: '$',
    quantity: 1,
   
  },


  
  
  'toblerone-cake-image': {
    id: '6',
    heading: 'Toblerone Cake',
    about: 'Experience luxury with our Toblerone cake, packed with pieces of your favorite chocolate. Each bite blends chocolate and nougat perfectly, especially with a cup of coffee.',
    price: '$4',
    image: 'img/Toblerone-cake-image.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add chocolate sauce',
    customize2: 'Add strawberrys',
    customize3: 'Add cream',
    customize4: 'Add ice cream',
    customize5: 'Add raspberry',
    customizePrice: '$0.5',
    customizeLarge: '+$1',
    customizeSmall: '-$1',
    totalPrice: '$',
    quantity: 1,
  },



  
  'chocolate-cake-image': {
    id: '7',
    heading: 'Chocolate cake',
    about: 'Our chocolate cake is a pure delight for all chocolate lovers, boasting a rich and moist texture. Enjoy it with coffee for an unforgettable experience.',
    price: '$3',
    image: 'img/Chocolate-cake-image.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add chocolate sauce',
    customize2: 'Add strawberrys',
    customize3: 'Add cream',
    customize4: 'Add ice cream',
    customize5: 'Add raspberry',
    customizePrice: '$0.5',
    customizeLarge: '+$1',
    customizeSmall: '-$1',
    totalPrice: '$',
    quantity: 1,
  },


   
  'cinamon-roll-image': {
    id: '8',
    heading: 'Cinamon roll',
    about: 'Our cinnamon rolls are filled with rich cinnamon and topped with sweet icing. Perfectly paired with a warm cup of coffee, they offer a delightful and indulgent treat.',
    price: '$2',
    image: 'img/Cinamon-roll-image.png',
    deleteIcon: 'img/delete.png',
    customize1: 'Add vanilla sauce',
    customize2: 'Add strawberrys',
    customize3: 'Add cream',
    customize4: 'Add ice cream',
    customize5: 'Add extra cinamon',
    customizePrice: '$0.5',
    customizeLarge: '+$1',
    customizeSmall: '-$1',
    totalPrice: '$',
    quantity: 1,
   
  },



}



















