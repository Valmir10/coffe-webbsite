//checkout.js

// checkout.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Checkout page loaded.");

  // Hämta och visa cart-number
  const cartNumberElement = document.querySelector(".cart-number");
  const savedCartNumber = localStorage.getItem("cartNumber");

  if (cartNumberElement && savedCartNumber) {
    cartNumberElement.textContent = savedCartNumber;
  } else if (cartNumberElement) {
    cartNumberElement.textContent = "0"; // Standardvärde om inget finns lagrat
  }

  // Fortsätt med existerande kod
  fetch("http://localhost:3000/api/checkout")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch checkout data");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched checkout data:", data);
      renderCheckoutPage(data);
      adjustCheckoutPageHeight(data.length);
    })
    .catch((error) => {
      console.error("Error fetching checkout data:", error);
    });
});

function renderCheckoutPage(data) {
  console.log("Rendering checkout page with data:", data);

  const productSummaryContainer = document.querySelector(
    ".product-summary-container"
  );
  const productsPriceContainer = document.querySelector(
    ".products-price-container p"
  );
  const customizeOptionsContainer = document.querySelector(
    ".customize-options-summary-container p"
  );
  const totalPriceContainer = document.querySelector(
    ".total-price-container p"
  );

  // Töm container för produkter
  productSummaryContainer.innerHTML = "";

  // Initiera summeringsvariabler
  let productsPrice = 0;
  let customizationsPrice = 0;

  data.forEach((item) => {
    console.log("Processing item:", item);

    const basePrice = parseFloat(item.default_price || 0) * item.quantity;

    const uniqueCustomizations = item.customizations.reduce((unique, curr) => {
      if (!unique.some((c) => c.name === curr.name)) {
        unique.push(curr);
      }
      return unique;
    }, []);

    const customizationCost = uniqueCustomizations.reduce(
      (sum, c) => sum + parseFloat(c.price || 0),
      0
    );

    const productTotalPrice = basePrice + customizationCost;
    productsPrice += basePrice;
    customizationsPrice += customizationCost;

    const productHTML = `
      <div class="product-content-container">
        <div class="product-name-price-container">
          <p>${item.name}: $${productTotalPrice.toFixed(2)}</p>
        </div>
        <div class="product-quantity-container">
          <p>Quantity: ${item.quantity}</p>
        </div>
      </div>
    `;
    productSummaryContainer.insertAdjacentHTML("beforeend", productHTML);

    console.log(
      `Product: ${item.name}, Base Price: $${basePrice.toFixed(
        2
      )}, Customizations: $${customizationCost.toFixed(
        2
      )}, Total: $${productTotalPrice.toFixed(2)}`
    );
  });

  productsPriceContainer.textContent = `Products price: $${productsPrice.toFixed(
    2
  )}`;
  customizeOptionsContainer.textContent = `Customizations: $${customizationsPrice.toFixed(
    2
  )}`;
  totalPriceContainer.textContent = `Total Price: $${(
    productsPrice + customizationsPrice
  ).toFixed(2)}`;
}

function adjustCheckoutPageHeight(productCount) {
  const container = document.querySelector(".checkout-page-container");

  if (!container) {
    console.error("Container element not found in DOM!");
    return;
  }

  // Dynamisk höjdjustering
  if (productCount > 11) {
    const extraProducts = productCount - 11;
    const newHeight = 100 + extraProducts * 20; // Beräkna ny höjd
    container.style.height = `${newHeight}vh`;
  } else {
    container.style.height = "100vh"; // Standardhöjd
  }
}

// making loading screen active
document.addEventListener("DOMContentLoaded", function () {
  const payButton = document.querySelector("#pay-button-container button");
  const loadingScreen = document.getElementById("loading-screen");
  const circle = document.getElementById("circle");
  const checkmark = document.getElementById("checkmark");
  const productSummaryContainer = document.querySelector(
    ".product-summary-container"
  );

  // Flytta logik från order-button till pay-button
  payButton.addEventListener("click", function (event) {
    // Förhindra standardbeteendet för formuläret
    event.preventDefault();

    const form = document.querySelector(
      ".products-payment-information-container"
    );

    // Kontrollera om formuläret är giltigt och visa valideringsmeddelanden
    if (!form.checkValidity()) {
      form.reportValidity(); // Visa inbyggda valideringsfel för användaren
      return;
    }

    // Kontrollera om det finns produkter
    const productElements = productSummaryContainer.querySelectorAll(
      ".product-content-container p"
    );
    const hasProducts = Array.from(productElements).some(
      (element) => element.textContent.trim() !== ""
    );

    if (!hasProducts) {
      // Visa en alert om inga produkter har beställts
      alert("No products have been ordered. Please add products to proceed.");
      return;
    }

    // Sätt flaggan för att tömma kundvagnen
    localStorage.setItem("clearCartOnNextLoad", "true");

    // Visa laddningsskärmen
    loadingScreen.style.display = "block";

    // Stoppa snurrande animation och expandera cirkeln efter 4 sekunder
    setTimeout(() => {
      circle.style.animation = "none"; // Stoppa snurrande
      circle.classList.add("expand"); // Expandera cirkeln

      // Visa checkmark
      setTimeout(() => {
        checkmark.textContent = "✔";
        checkmark.classList.add("show");
      }, 500);
    }, 4000);

    // Navigera till coffee-home-page.html efter 5.5 sekunder
    setTimeout(() => {
      checkmark.classList.remove("show");
      circle.classList.remove("expand");
      circle.style.animation = "spin 2s linear infinite"; // Återställ animation
      loadingScreen.style.display = "none";

      // Nollställ formuläret först nu när allt går igenom
      form.reset();

      // Omdirigera till coffe-home-page.html
      window.location.href = "coffe-home-page.html";
    }, 5500);
  });
});

// CHECKOUT FORM

document.getElementById("card-number").addEventListener("input", function (e) {
  this.value = this.value.replace(/\D/g, "");
});

document.getElementById("cvc").addEventListener("input", function (e) {
  this.value = this.value.replace(/\D/g, "");
  if (this.value.length > 4) {
    this.value = this.value.slice(0, 4);
  }
});

document.getElementById("mm-yy").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9/]/g, "");

  if (this.value.length === 2 && !this.value.includes("/")) {
    this.value += "/";
  }

  if (this.value.length > 5) {
    this.value = this.value.slice(0, 5);
  }
});

// Välj alla input-fält
const inputs = document.querySelectorAll(
  ".first-name-label input, .last-name-label input, .mm-yy-label input, .cvc-label input, .email-label input, .card-number-label input"
);

// Lägg till event listeners för focus och blur
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.style.backgroundColor = "white";
    input.style.color = "gray";
  });

  input.addEventListener("blur", () => {
    input.style.backgroundColor = "rgb(37, 36, 36)";
    input.style.color = "white";
  });
});

/*
//checkout.js

// checkout.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Checkout page loaded.");

  // Hämta checkout-data från servern
  fetch("http://localhost:3000/api/checkout")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch checkout data");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched checkout data:", data);
      renderCheckoutPage(data);

      // Justera höjd baserat på antal produkter
      adjustCheckoutPageHeight(data.length);
    })
    .catch((error) => {
      console.error("Error fetching checkout data:", error);
    });
});

function renderCheckoutPage(data) {
  console.log("Rendering checkout page with data:", data);

  const productSummaryContainer = document.querySelector(
    ".product-summary-container"
  );
  const productsPriceContainer = document.querySelector(
    ".products-price-container p"
  );
  const customizeOptionsContainer = document.querySelector(
    ".customize-options-summary-container p"
  );
  const totalPriceContainer = document.querySelector(
    ".total-price-container p"
  );

  // Töm container för produkter
  productSummaryContainer.innerHTML = "";

  // Initiera summeringsvariabler
  let productsPrice = 0;
  let customizationsPrice = 0;

  data.forEach((item) => {
    console.log("Processing item:", item);

    const basePrice = parseFloat(item.default_price || 0) * item.quantity;

    const uniqueCustomizations = item.customizations.reduce((unique, curr) => {
      if (!unique.some((c) => c.name === curr.name)) {
        unique.push(curr);
      }
      return unique;
    }, []);

    const customizationCost = uniqueCustomizations.reduce(
      (sum, c) => sum + parseFloat(c.price || 0),
      0
    );

    const productTotalPrice = basePrice + customizationCost;
    productsPrice += basePrice;
    customizationsPrice += customizationCost;

    const productHTML = `
      <div class="product-content-container">
        <div class="product-name-price-container">
          <p>${item.name}: $${productTotalPrice.toFixed(2)}</p>
        </div>
        <div class="product-quantity-container">
          <p>Quantity: ${item.quantity}</p>
        </div>
      </div>
    `;
    productSummaryContainer.insertAdjacentHTML("beforeend", productHTML);

    console.log(
      `Product: ${item.name}, Base Price: $${basePrice.toFixed(
        2
      )}, Customizations: $${customizationCost.toFixed(
        2
      )}, Total: $${productTotalPrice.toFixed(2)}`
    );
  });

  productsPriceContainer.textContent = `Products price: $${productsPrice.toFixed(
    2
  )}`;
  customizeOptionsContainer.textContent = `Customizations: $${customizationsPrice.toFixed(
    2
  )}`;
  totalPriceContainer.textContent = `Total Price: $${(
    productsPrice + customizationsPrice
  ).toFixed(2)}`;
}

function adjustCheckoutPageHeight(productCount) {
  const container = document.querySelector(".checkout-page-container");

  if (!container) {
    console.error("Container element not found in DOM!");
    return;
  }

  // Dynamisk höjdjustering
  if (productCount > 10) {
    const extraProducts = productCount - 10;
    const newHeight = 100 + extraProducts * 20; // Beräkna ny höjd
    container.style.height = `${newHeight}vh`;
  } else {
    container.style.height = "100vh"; // Standardhöjd
  }
}

// making loading screen active
document.addEventListener("DOMContentLoaded", function () {
  const payButton = document.querySelector("#pay-button-container button");
  const loadingScreen = document.getElementById("loading-screen");
  const circle = document.getElementById("circle");
  const checkmark = document.getElementById("checkmark");
  const productSummaryContainer = document.querySelector(
    ".product-summary-container"
  );

  // Flytta logik från order-button till pay-button
  payButton.addEventListener("click", function (event) {
    // Förhindra standardbeteendet för formuläret
    event.preventDefault();

    const form = document.querySelector(
      ".products-payment-information-container"
    );

    // Kontrollera om formuläret är giltigt
    if (!form.checkValidity()) {
      // Stoppa vidare hantering om formuläret är ogiltigt
      return;
    }

    // Kontrollera om det finns produkter
    const productElements = productSummaryContainer.querySelectorAll(
      ".product-content-container p"
    );
    const hasProducts = Array.from(productElements).some(
      (element) => element.textContent.trim() !== ""
    );

    if (!hasProducts) {
      // Visa en alert om inga produkter har beställts
      alert("No products have been ordered. Please add products to proceed.");
      return;
    }

    // Sätt flaggan för att tömma kundvagnen
    localStorage.setItem("clearCartOnNextLoad", "true");

    // Visa laddningsskärmen
    loadingScreen.style.display = "block";

    // Stoppa snurrande animation och expandera cirkeln efter 4 sekunder
    setTimeout(() => {
      circle.style.animation = "none"; // Stoppa snurrande
      circle.classList.add("expand"); // Expandera cirkeln

      // Visa checkmark
      setTimeout(() => {
        checkmark.textContent = "✔";
        checkmark.classList.add("show");
      }, 500);
    }, 4000);

    // Navigera till coffee-home-page.html efter 5.5 sekunder
    setTimeout(() => {
      checkmark.classList.remove("show");
      circle.classList.remove("expand");
      circle.style.animation = "spin 2s linear infinite"; // Återställ animation
      loadingScreen.style.display = "none";

      // Nollställ formuläret först nu när allt går igenom
      form.reset();

      // Omdirigera till coffe-home-page.html
      window.location.href = "coffe-home-page.html";
    }, 5500);
  });
});

// CHECKOUT FORM

document.getElementById("card-number").addEventListener("input", function (e) {
  this.value = this.value.replace(/\D/g, "");
});

document.getElementById("cvc").addEventListener("input", function (e) {
  this.value = this.value.replace(/\D/g, "");
  if (this.value.length > 4) {
    this.value = this.value.slice(0, 4);
  }
});

document.getElementById("mm-yy").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9/]/g, "");

  if (this.value.length === 2 && !this.value.includes("/")) {
    this.value += "/";
  }

  if (this.value.length > 5) {
    this.value = this.value.slice(0, 5);
  }
});

// Välj alla input-fält
const inputs = document.querySelectorAll(
  ".first-name-label input, .last-name-label input, .mm-yy-label input, .cvc-label input, .email-label input, .card-number-label input"
);

// Lägg till event listeners för focus och blur
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.style.backgroundColor = "white";
    input.style.color = "gray";
  });

  input.addEventListener("blur", () => {
    input.style.backgroundColor = "rgb(37, 36, 36)";
    input.style.color = "white";
  });
});


*/
