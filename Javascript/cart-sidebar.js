// cart-sidebar.js
document.addEventListener("DOMContentLoaded", () => {
  const cartSidebar = document.querySelector(".cart-sidebar-container");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartIcon = document.querySelector(".cart-img-container");
  const cartContentContainer = document.querySelector(
    ".cart-order-content-container"
  );
  const cartNumberElement = document.querySelector(".cart-number");
  const checkoutButton = document.querySelector(".cart-checkout-button button");
  const deleteIcon = document.querySelector(".delete-icon-container img");
  const CART_STORAGE_KEY = "cartItems"; // Nyckel för localStorage
  const CLEAR_CART_FLAG = "clearCartOnNextLoad";
  let cartItems = loadCartFromStorage();

  function saveCartToStorage() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }

  function loadCartFromStorage() {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : {};
  }

  if (localStorage.getItem(CLEAR_CART_FLAG) === "true") {
    localStorage.removeItem(CART_STORAGE_KEY); // Töm kundvagn
    cartItems = {}; // Återställ lokalt
    localStorage.removeItem(CLEAR_CART_FLAG); // Ta bort flaggan
  }

  function openCartSidebar() {
    if (cartSidebar) {
      cartSidebar.classList.add("open");
    }
    if (cartOverlay) {
      cartOverlay.classList.add("active");
    }
    document.body.classList.add("sidebar-open");
  }

  function closeCartSidebar() {
    if (cartSidebar) {
      cartSidebar.classList.remove("open");
    }
    if (cartOverlay) {
      cartOverlay.classList.remove("active");
    }
    document.body.classList.remove("sidebar-open");
  }

  function addToCart(product) {
    const newKey = `${product.id}-${product.size}-${product.customizations
      .map((c) => c.name)
      .sort()
      .join("-")}`;

    const existingKey = Object.keys(cartItems).find((key) => {
      const existingItem = cartItems[key];
      return (
        existingItem.id === product.id &&
        existingItem.size === product.size &&
        JSON.stringify(existingItem.customizations) ===
          JSON.stringify(product.customizations)
      );
    });

    if (existingKey) {
      cartItems[existingKey].quantity++;
    } else {
      cartItems[newKey] = { ...product, key: newKey, quantity: 1 };
    }

    saveCartToStorage(); // Spara tillståndet
    renderCartItems();
    updateCartNumber();
  }

  function updateCartNumber() {
    const totalQuantity = Object.values(cartItems).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    if (cartNumberElement) {
      cartNumberElement.textContent = totalQuantity;
    }
    // Spara antalet i localStorage
    localStorage.setItem("cartNumber", totalQuantity);
  }

  function renderCartItems() {
    if (!cartContentContainer) return;

    if (Object.keys(cartItems).length === 0) {
      cartContentContainer.classList.remove("visible");
      return;
    }

    cartContentContainer.classList.add("visible");
    cartContentContainer.innerHTML = ""; // Töm innehållet innan rendering
    Object.values(cartItems).forEach((item) => {
      const totalPrice = calculateTotalPrice(item) * item.quantity;
      const cartItemHTML = `
     <div class="cart-order-container" data-key="${item.key}">
       <div class="cart-product-img-container">
         <img src="${item.image_url}" alt="${item.name}" />
       </div>
       <div class="cart-product-price-container">
         <p>$${totalPrice.toFixed(2)}</p>
       </div>
       <div class="cart-product-quantity-container">
         <span class="minus" data-key="${item.key}">-</span>
         <span>${item.quantity}</span>
         <span class="plus" data-key="${item.key}">+</span>
       </div>
     </div>
   `;
      cartContentContainer.insertAdjacentHTML("beforeend", cartItemHTML);
    });

    setupQuantityEvents();
  }

  function calculateTotalPrice(product) {
    const basePrice = parseFloat(product.default_price || product.price);
    let sizeCost = product.size === "Large" ? 1.0 : 0.0;

    const customizationCost = product.customizations.reduce(
      (sum, c) => sum + parseFloat(c.price || 0),
      0
    );

    return basePrice + sizeCost + customizationCost;
  }

  function setupQuantityEvents() {
    const minusButtons = cartContentContainer.querySelectorAll(".minus");
    const plusButtons = cartContentContainer.querySelectorAll(".plus");

    minusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productKey = button.getAttribute("data-key");
        if (cartItems[productKey]?.quantity > 1) {
          cartItems[productKey].quantity--;
        } else {
          delete cartItems[productKey];
        }
        saveCartToStorage(); // Uppdatera lagringen
        renderCartItems();
        updateCartNumber();
      });
    });

    plusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productKey = button.getAttribute("data-key");
        if (cartItems[productKey]) {
          cartItems[productKey].quantity++;
          saveCartToStorage(); // Uppdatera lagringen
          renderCartItems();
          updateCartNumber();
        }
      });
    });
  }

  if (cartIcon) {
    cartIcon.addEventListener("click", openCartSidebar);
  }
  document.addEventListener("cart:add", (event) => {
    const product = event.detail;
    addToCart(product);
    openCartSidebar();
  });

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      const consolidatedCart = {}; // För att kombinera identiska produkter
      let uniqueIdCounter = 1; // Håller reda på nästa tillgängliga unika ID

      Object.values(cartItems).forEach((item) => {
        const customizationsKey = item.customizations
          .map((c) => `${c.name}-${c.price}`)
          .sort()
          .join("|");
        const uniqueKey = `${item.id}-${item.size}-${customizationsKey}`;

        if (consolidatedCart[uniqueKey]) {
          consolidatedCart[uniqueKey].quantity += item.quantity;
          consolidatedCart[uniqueKey].total_price +=
            calculateTotalPrice(item) * item.quantity;
        } else {
          consolidatedCart[uniqueKey] = {
            id: uniqueIdCounter++,
            image_url: item.image_url,
            name: item.name,
            customizations: item.customizations,
            size: item.size,
            quantity: item.quantity,
            total_price: calculateTotalPrice(item) * item.quantity,
          };
        }
      });

      const checkoutData = Object.values(cartItems).map((item) => {
        const uniqueCustomizations = item.customizations.reduce(
          (unique, curr) => {
            if (!unique.some((c) => c.name === curr.name)) {
              unique.push(curr);
            }
            return unique;
          },
          []
        );

        const basePrice = parseFloat(item.default_price || item.price || 0);
        const customizationCost = uniqueCustomizations.reduce(
          (sum, c) => sum + parseFloat(c.price || 0),
          0
        );
        const totalPrice = (basePrice + customizationCost) * item.quantity;

        return {
          id: item.id,
          name:
            uniqueCustomizations.length > 0 || item.size !== "Medium"
              ? `Customized ${item.name}`
              : item.name,
          image_url: item.image_url,
          customizations: [
            ...uniqueCustomizations,
            { name: item.size, price: item.size === "Large" ? 1.0 : 0.0 },
          ],
          size: item.size,
          quantity: item.quantity,
          default_price: basePrice,
          total_price: totalPrice.toFixed(2),
        };
      });

      fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Order sent successfully:", data);
        })
        .catch((error) => {
          console.error("Error sending order:", error);
          alert(
            "An error occurred while sending your order. Please try again."
          );
        });
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCartSidebar);
  }

  if (deleteIcon) {
    deleteIcon.addEventListener("click", closeCartSidebar);
  }

  renderCartItems(); // Återställ kundvagnen vid sidladdning
  updateCartNumber();

  const cartOrderContainer = document.querySelector(
    ".cart-order-content-container"
  );

  function adjustCartHeight() {
    const productCount = cartOrderContainer.children.length;
    const maxVisibleProducts = 7;

    if (productCount > maxVisibleProducts) {
      cartOrderContainer.style.overflowY = "auto";
    } else {
      cartOrderContainer.style.overflowY = "hidden";
    }
  }

  const observer = new MutationObserver(adjustCartHeight);
  observer.observe(cartOrderContainer, { childList: true });

  adjustCartHeight();
});

/**
 
// cart-sidebar.js

// cart-sidebar.js

document.addEventListener("DOMContentLoaded", () => {
  const cartSidebar = document.querySelector(".cart-sidebar-container");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartIcon = document.querySelector(".cart-img-container");
  const cartCloseButton = document.querySelector(".cart-close-btn");
  const cartContentContainer = document.querySelector(
    ".cart-order-content-container"
  );
  const cartNumberElement = document.querySelector(".cart-number");
  const checkoutButton = document.querySelector(".cart-checkout-button button");
  const CART_STORAGE_KEY = "cartItems"; // Nyckel för localStorage
  const CLEAR_CART_FLAG = "clearCartOnNextLoad";
  let cartItems = loadCartFromStorage();

  function saveCartToStorage() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }

  function loadCartFromStorage() {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : {};
  }

  if (localStorage.getItem(CLEAR_CART_FLAG) === "true") {
    localStorage.removeItem(CART_STORAGE_KEY); // Töm kundvagn
    cartItems = {}; // Återställ lokalt
    localStorage.removeItem(CLEAR_CART_FLAG); // Ta bort flaggan
  }

  function openCartSidebar() {
    if (cartSidebar) {
      cartSidebar.classList.add("open");
    }
    if (cartOverlay) {
      cartOverlay.classList.add("active");
    }
    document.body.classList.add("sidebar-open");
  }

  function closeCartSidebar() {
    if (cartSidebar) {
      cartSidebar.classList.remove("open");
    }
    if (cartOverlay) {
      cartOverlay.classList.remove("active");
    }
    document.body.classList.remove("sidebar-open");
  }

  function addToCart(product) {
    const newKey = `${product.id}-${product.size}-${product.customizations
      .map((c) => c.name)
      .sort()
      .join("-")}`;

    const existingKey = Object.keys(cartItems).find((key) => {
      const existingItem = cartItems[key];
      return (
        existingItem.id === product.id &&
        existingItem.size === product.size &&
        JSON.stringify(existingItem.customizations) ===
          JSON.stringify(product.customizations)
      );
    });

    if (existingKey) {
      cartItems[existingKey].quantity++;
    } else {
      cartItems[newKey] = { ...product, key: newKey, quantity: 1 };
    }

    saveCartToStorage(); // Spara tillståndet
    renderCartItems();
    updateCartNumber();
  }

  function updateCartNumber() {
    const totalQuantity = Object.values(cartItems).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    if (cartNumberElement) {
      cartNumberElement.textContent = totalQuantity;
    }
  }

  function renderCartItems() {
    if (!cartContentContainer) return;

    if (Object.keys(cartItems).length === 0) {
      cartContentContainer.classList.remove("visible");
      return;
    }

    cartContentContainer.classList.add("visible");
    cartContentContainer.innerHTML = ""; // Töm innehållet innan rendering
    Object.values(cartItems).forEach((item) => {
      const totalPrice = calculateTotalPrice(item) * item.quantity;
      const cartItemHTML = `
      <div class="cart-order-container" data-key="${item.key}">
        <div class="cart-product-img-container">
          <img src="${item.image_url}" alt="${item.name}" />
        </div>
        <div class="cart-product-price-container">
          <p>$${totalPrice.toFixed(2)}</p>
        </div>
        <div class="cart-product-quantity-container">
          <span class="minus" data-key="${item.key}">-</span>
          <span>${item.quantity}</span>
          <span class="plus" data-key="${item.key}">+</span>
        </div>
      </div>
    `;
      cartContentContainer.insertAdjacentHTML("beforeend", cartItemHTML);
    });

    setupQuantityEvents();
  }

  function calculateTotalPrice(product) {
    const basePrice = parseFloat(product.default_price || product.price);
    let sizeCost = product.size === "Large" ? 1.0 : 0.0;

    const customizationCost = product.customizations.reduce(
      (sum, c) => sum + parseFloat(c.price || 0),
      0
    );

    return basePrice + sizeCost + customizationCost;
  }

  function setupQuantityEvents() {
    const minusButtons = cartContentContainer.querySelectorAll(".minus");
    const plusButtons = cartContentContainer.querySelectorAll(".plus");

    minusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productKey = button.getAttribute("data-key");
        if (cartItems[productKey]?.quantity > 1) {
          cartItems[productKey].quantity--;
        } else {
          delete cartItems[productKey];
        }
        saveCartToStorage(); // Uppdatera lagringen
        renderCartItems();
        updateCartNumber();
      });
    });

    plusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productKey = button.getAttribute("data-key");
        if (cartItems[productKey]) {
          cartItems[productKey].quantity++;
          saveCartToStorage(); // Uppdatera lagringen
          renderCartItems();
          updateCartNumber();
        }
      });
    });
  }

  if (cartIcon) {
    cartIcon.addEventListener("click", openCartSidebar);
  }
  document.addEventListener("cart:add", (event) => {
    const product = event.detail;
    addToCart(product);
    openCartSidebar();
  });

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      const consolidatedCart = {}; // För att kombinera identiska produkter
      let uniqueIdCounter = 1; // Håller reda på nästa tillgängliga unika ID

      Object.values(cartItems).forEach((item) => {
        const customizationsKey = item.customizations
          .map((c) => `${c.name}-${c.price}`)
          .sort()
          .join("|");
        const uniqueKey = `${item.id}-${item.size}-${customizationsKey}`;

        if (consolidatedCart[uniqueKey]) {
          consolidatedCart[uniqueKey].quantity += item.quantity;
          consolidatedCart[uniqueKey].total_price +=
            calculateTotalPrice(item) * item.quantity;
        } else {
          consolidatedCart[uniqueKey] = {
            id: uniqueIdCounter++,
            image_url: item.image_url,
            name: item.name,
            customizations: item.customizations,
            size: item.size,
            quantity: item.quantity,
            total_price: calculateTotalPrice(item) * item.quantity,
          };
        }
      });

      const checkoutData = Object.values(cartItems).map((item) => {
        const uniqueCustomizations = item.customizations.reduce(
          (unique, curr) => {
            if (!unique.some((c) => c.name === curr.name)) {
              unique.push(curr);
            }
            return unique;
          },
          []
        );

        const basePrice = parseFloat(item.default_price || item.price || 0);
        const customizationCost = uniqueCustomizations.reduce(
          (sum, c) => sum + parseFloat(c.price || 0),
          0
        );
        const totalPrice = (basePrice + customizationCost) * item.quantity;

        return {
          id: item.id,
          name:
            uniqueCustomizations.length > 0 || item.size !== "Medium"
              ? `Customized ${item.name}`
              : item.name,
          image_url: item.image_url,
          customizations: [
            ...uniqueCustomizations,
            { name: item.size, price: item.size === "Large" ? 1.0 : 0.0 },
          ],
          size: item.size,
          quantity: item.quantity,
          default_price: basePrice,
          total_price: totalPrice.toFixed(2),
        };
      });

      fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Order sent successfully:", data);
        })
        .catch((error) => {
          console.error("Error sending order:", error);
          alert(
            "An error occurred while sending your order. Please try again."
          );
        });
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCartSidebar);
  }
  if (cartCloseButton) {
    cartCloseButton.addEventListener("click", closeCartSidebar);
  }

  renderCartItems(); // Återställ kundvagnen vid sidladdning
  updateCartNumber();

  const cartOrderContainer = document.querySelector(
    ".cart-order-content-container"
  );

  function adjustCartHeight() {
    const productCount = cartOrderContainer.children.length;
    const maxVisibleProducts = 7;

    if (productCount > maxVisibleProducts) {
      cartOrderContainer.style.overflowY = "auto";
    } else {
      cartOrderContainer.style.overflowY = "hidden";
    }
  }

  const observer = new MutationObserver(adjustCartHeight);
  observer.observe(cartOrderContainer, { childList: true });

  adjustCartHeight();
});




 */
