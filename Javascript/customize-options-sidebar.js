//customize-options-sidebar.js

//customize-options-sidebar.js

//customize-options-sidebar.js
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

let productSelections = []; // Hanterar flera instanser av produkter

// Fetch products from the API
async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    if (response.ok) {
      const products = await response.json();
      renderMenu(products);
    } else {
      showError("Failed to load products. Please try again.");
    }
  } catch (error) {
    showError("Network error. Please check your connection.");
    console.error("Fetch error:", error);
  }
}

// Render products into the menu
function renderMenu(products) {
  const menuContent = document.querySelector(".menu-page-content");
  if (!menuContent) return;
  menuContent.innerHTML = "";
  products.forEach((product, index) => {
    const rowClass = getRowClass(index);
    const columnClass = getColumnClass(index);
    let row = menuContent.querySelector(`.${rowClass}`);
    if (!row) {
      row = document.createElement("div");
      row.className = rowClass;
      menuContent.appendChild(row);
    }
    const columnHTML = `
   <div class="${columnClass}" data-id="${product.id}" data-name="${
      product.name
    }" data-default-price="${product.price}">
     <div class="product-image-1-coffe">
       <img src="${product.image_url}" alt="${product.name}" />
     </div>
     <div class="product-name-1-coffe">
       <h2>${product.name}</h2>
     </div>
     <div class="product-price-1-coffe">
       <p>$${parseFloat(product.price).toFixed(2)}</p>
     </div>
     <div class="menu-order-button-container">
       <button class="order-button" data-id="${product.id}">Order</button>
     </div>
   </div>
 `;
    row.insertAdjacentHTML("beforeend", columnHTML);
  });
  setupProductClickEvents();
}

// Open the sidebar and fetch customizations for the selected product
async function openSidebar(productId, productName) {
  const sidebar = document.querySelector(".sidebar-customize-product");
  const overlay = document.querySelector(".sidebar-overlay");
  const productNameContainer = document.querySelector(
    ".product-name-customize-container h1"
  );
  if (!sidebar || !overlay || !productNameContainer) return;

  sidebar.style.opacity = "1";
  sidebar.style.pointerEvents = "auto";
  overlay.classList.add("active");
  productNameContainer.textContent = productName;

  initializeDefaultSelection(productId, productName);
  await fetchCustomizations(productId);
  restoreSelections(productId);
  setupOrderButton(productId);
  setupOverlayClose();
}

// Always set Medium as the default size for a new product
function initializeDefaultSelection(productId, productName) {
  const existingProduct = productSelections.find(
    (item) => item.id === productId
  );
  if (!existingProduct) {
    productSelections.push({
      id: productId,
      name: productName,
      size: "Medium", // Default size
      customizations: [],
    });
  }
}

// Add click handler for the order button
function setupOrderButton(productId) {
  const orderButton = document.querySelector(
    ".sidebar-customize-product .order-button"
  );
  if (!orderButton) return;

  orderButton.onclick = () => {
    const product = productSelections.find((item) => item.id === productId);
    if (!product) return;

    const productImage = document
      .querySelector(`[data-id="${productId}"] img`)
      .getAttribute("src");
    const defaultPrice = parseFloat(
      document.querySelector(`[data-id="${productId}"]`).dataset.defaultPrice
    );

    const cartEvent = new CustomEvent("cart:add", {
      detail: {
        id: productId,
        name: product.name,
        image_url: productImage,
        size: product.size,
        customizations: product.customizations,
        default_price: defaultPrice,
        quantity: 1,
      },
    });

    document.dispatchEvent(cartEvent);
    resetProductSelection(productId); // Reset selection to default after ordering
    closeSidebar();
  };
}

// Reset product selection to default
function resetProductSelection(productId) {
  const productIndex = productSelections.findIndex(
    (item) => item.id === productId
  );
  if (productIndex !== -1) {
    productSelections[productIndex] = {
      id: productId,
      name: productSelections[productIndex].name,
      size: "Medium", // Reset to default size
      customizations: [], // Clear customizations
    };
  }
}

// Fetch customizations from the API
async function fetchCustomizations(productId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/customizations/${productId}`
    );
    if (response.ok) {
      const customizations = await response.json();
      renderSidebarCustomizations(customizations, productId);
    } else {
      console.error("Failed to fetch customizations. Check API.");
    }
  } catch (error) {
    console.error("Error fetching customizations:", error);
  }
}

// Render customizations in the sidebar
function renderSidebarCustomizations(customizations, productId) {
  const customizeContainer = document.querySelector(
    ".customize-options-container"
  );
  if (!customizeContainer) return;
  customizeContainer.innerHTML = "";

  customizations.forEach((customization, index) => {
    const isChecked =
      customization.customization_name === "Medium" ? "checked" : "";
    const labelHTML = `
   <div class="customize-option-content-${index + 1}">
     <label class="customize-option-${index + 1}-container">
       <input type="checkbox" ${isChecked} data-name="${
      customization.customization_name
    }" data-price="${customization.customization_price}" />
       ${customization.customization_name} (+$${parseFloat(
      customization.customization_price
    ).toFixed(2)})
     </label>
   </div>
 `;
    customizeContainer.insertAdjacentHTML("beforeend", labelHTML);
  });
  setupSizeToggle(productId);
  setupCustomizationEvents(productId);
}

// Ensure Medium is default, and toggle Medium/Large
function setupSizeToggle(productId) {
  const checkboxes = document.querySelectorAll(
    ".customize-options-container input[type='checkbox']"
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selectedName = checkbox.getAttribute("data-name");
      const product = productSelections.find((item) => item.id === productId);
      if (!product) return;

      if (selectedName === "Medium" || selectedName === "Large") {
        // Hantera att endast en storlek är markerad
        checkboxes.forEach((cb) => {
          if (
            cb !== checkbox &&
            (cb.getAttribute("data-name") === "Medium" ||
              cb.getAttribute("data-name") === "Large")
          ) {
            cb.checked = false;
          }
        });
        checkbox.checked = true;
        product.size = selectedName; // Uppdatera vald storlek i produktval
      } else {
        // Hantera andra anpassningar
        const customizationName = checkbox.getAttribute("data-name");
        const customizationPrice = parseFloat(
          checkbox.getAttribute("data-price")
        );

        if (checkbox.checked) {
          // Kontrollera om anpassningen redan finns
          const exists = product.customizations.some(
            (c) => c.name === customizationName
          );
          if (!exists) {
            product.customizations.push({
              name: customizationName,
              price: customizationPrice,
            });
          }
        } else {
          product.customizations = product.customizations.filter(
            (c) => c.name !== customizationName
          );
        }
      }
    });
  });
}

// Save customizations and restore if needed
function setupCustomizationEvents(productId) {
  const checkboxes = document.querySelectorAll(
    ".customize-options-container input[type='checkbox']"
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const customizationName = checkbox.getAttribute("data-name");
      const customizationPrice = parseFloat(
        checkbox.getAttribute("data-price")
      );
      const product = productSelections.find((item) => item.id === productId);
      if (!product) return;

      if (checkbox.checked) {
        // Kontrollera om anpassningen redan finns
        const exists = product.customizations.some(
          (c) => c.name === customizationName
        );
        if (!exists) {
          product.customizations.push({
            name: customizationName,
            price: customizationPrice,
          });
        }
      } else {
        product.customizations = product.customizations.filter(
          (c) => c.name !== customizationName
        );
      }
    });
  });
}

// Close sidebar
function closeSidebar() {
  const sidebar = document.querySelector(".sidebar-customize-product");
  const overlay = document.querySelector(".sidebar-overlay");
  if (sidebar) {
    sidebar.style.opacity = "0";
    sidebar.style.pointerEvents = "none";
  }
  if (overlay) {
    overlay.classList.remove("active");
  }
}

// Add logic to close sidebar when clicking outside
function setupOverlayClose() {
  const overlay = document.querySelector(".sidebar-overlay");
  if (overlay) {
    overlay.addEventListener("click", closeSidebar);
  }
}

// Show error messages in the menu
function showError(message) {
  const menuContainer = document.querySelector(".menu-page-content");
  if (menuContainer) {
    menuContainer.innerHTML = `<p class="error-message">${message}</p>`;
  }
}

// Get the row class for the menu items
function getRowClass(index) {
  if (index < 3) return "coffe-menu-row-1";
  if (index < 6) return "coffe-menu-row-2";
  if (index < 9) return "dessert-menu-row-1";
  return "dessert-menu-row-2";
}

// Get the column class for the menu items
function getColumnClass(index) {
  const columnIndex = (index % 3) + 1;
  return `row-${Math.ceil((index + 1) / 3)}-item-${columnIndex}`;
}

// Set up click events for the menu items to open the sidebar
function setupProductClickEvents() {
  const productItems = document.querySelectorAll(
    ".menu-page-content [data-id]"
  );

  productItems.forEach((item) => {
    item.addEventListener("click", () => {
      const productId = item.getAttribute("data-id");
      const productName = item.getAttribute("data-name");
      openSidebar(productId, productName);
    });
  });
}

// Restore saved selections
function restoreSelections(productId) {
  const product = productSelections.find((item) => item.id === productId);
  if (!product) return;

  const checkboxes = document.querySelectorAll(
    ".customize-options-container input[type='checkbox']"
  );

  checkboxes.forEach((checkbox) => {
    const customizationName = checkbox.getAttribute("data-name");
    checkbox.checked =
      product.customizations.some((c) => c.name === customizationName) ||
      (product.size === customizationName &&
        (customizationName === "Medium" || customizationName === "Large"));
  });
}

/**
 

//customize-options-sidebar.js

//customize-options-sidebar.js

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

let productSelections = []; // Hanterar flera instanser av produkter

// Fetch products from the API
async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    if (response.ok) {
      const products = await response.json();
      renderMenu(products);
    } else {
      showError("Failed to load products. Please try again.");
    }
  } catch (error) {
    showError("Network error. Please check your connection.");
    console.error("Fetch error:", error);
  }
}

// Render products into the menu
function renderMenu(products) {
  const menuContent = document.querySelector(".menu-page-content");
  if (!menuContent) return;
  menuContent.innerHTML = "";
  products.forEach((product, index) => {
    const rowClass = getRowClass(index);
    const columnClass = getColumnClass(index);
    let row = menuContent.querySelector(`.${rowClass}`);
    if (!row) {
      row = document.createElement("div");
      row.className = rowClass;
      menuContent.appendChild(row);
    }
    const columnHTML = `
    <div class="${columnClass}" data-id="${product.id}" data-name="${
      product.name
    }" data-default-price="${product.price}">
      <div class="product-image-1-coffe">
        <img src="${product.image_url}" alt="${product.name}" />
      </div>
      <div class="product-name-1-coffe">
        <h2>${product.name}</h2>
      </div>
      <div class="product-price-1-coffe">
        <p>$${parseFloat(product.price).toFixed(2)}</p>
      </div>
      <div class="menu-order-button-container">
        <button class="order-button" data-id="${product.id}">Order</button>
      </div>
    </div>
  `;
    row.insertAdjacentHTML("beforeend", columnHTML);
  });
  setupProductClickEvents();
}

// Open the sidebar and fetch customizations for the selected product
async function openSidebar(productId, productName) {
  const sidebar = document.querySelector(".sidebar-customize-product");
  const overlay = document.querySelector(".sidebar-overlay");
  const productNameContainer = document.querySelector(
    ".product-name-customize-container h1"
  );
  if (!sidebar || !overlay || !productNameContainer) return;

  sidebar.style.opacity = "1";
  sidebar.style.pointerEvents = "auto";
  overlay.classList.add("active");
  productNameContainer.textContent = productName;

  initializeDefaultSelection(productId, productName);
  await fetchCustomizations(productId);
  restoreSelections(productId);
  setupOrderButton(productId);
  setupOverlayClose();
}

// Always set Medium as the default size for a new product
function initializeDefaultSelection(productId, productName) {
  const existingProduct = productSelections.find(
    (item) => item.id === productId
  );
  if (!existingProduct) {
    productSelections.push({
      id: productId,
      name: productName,
      size: "Medium", // Default size
      customizations: [],
    });
  }
}

// Add click handler for the order button
function setupOrderButton(productId) {
  const orderButton = document.querySelector(
    ".sidebar-customize-product .order-button"
  );
  if (!orderButton) return;

  orderButton.onclick = () => {
    const product = productSelections.find((item) => item.id === productId);
    if (!product) return;

    const productImage = document
      .querySelector(`[data-id="${productId}"] img`)
      .getAttribute("src");
    const defaultPrice = parseFloat(
      document.querySelector(`[data-id="${productId}"]`).dataset.defaultPrice
    );

    const cartEvent = new CustomEvent("cart:add", {
      detail: {
        id: productId,
        name: product.name,
        image_url: productImage,
        size: product.size,
        customizations: product.customizations,
        default_price: defaultPrice,
        quantity: 1,
      },
    });

    document.dispatchEvent(cartEvent);
    resetProductSelection(productId); // Reset selection to default after ordering
    closeSidebar();
  };
}

// Reset product selection to default
function resetProductSelection(productId) {
  const productIndex = productSelections.findIndex(
    (item) => item.id === productId
  );
  if (productIndex !== -1) {
    productSelections[productIndex] = {
      id: productId,
      name: productSelections[productIndex].name,
      size: "Medium", // Reset to default size
      customizations: [], // Clear customizations
    };
  }
}

// Fetch customizations from the API
async function fetchCustomizations(productId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/customizations/${productId}`
    );
    if (response.ok) {
      const customizations = await response.json();
      renderSidebarCustomizations(customizations, productId);
    } else {
      console.error("Failed to fetch customizations. Check API.");
    }
  } catch (error) {
    console.error("Error fetching customizations:", error);
  }
}

// Render customizations in the sidebar
function renderSidebarCustomizations(customizations, productId) {
  const customizeContainer = document.querySelector(
    ".customize-options-container"
  );
  if (!customizeContainer) return;
  customizeContainer.innerHTML = "";

  customizations.forEach((customization, index) => {
    const isChecked =
      customization.customization_name === "Medium" ? "checked" : "";
    const labelHTML = `
    <div class="customize-option-content-${index + 1}">
      <label class="customize-option-${index + 1}-container">
        <input type="checkbox" ${isChecked} data-name="${
      customization.customization_name
    }" data-price="${customization.customization_price}" />
        ${customization.customization_name} (+$${parseFloat(
      customization.customization_price
    ).toFixed(2)})
      </label>
    </div>
  `;
    customizeContainer.insertAdjacentHTML("beforeend", labelHTML);
  });
  setupSizeToggle(productId);
  setupCustomizationEvents(productId);
}

// Ensure Medium is default, and toggle Medium/Large
function setupSizeToggle(productId) {
  const checkboxes = document.querySelectorAll(
    ".customize-options-container input[type='checkbox']"
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selectedName = checkbox.getAttribute("data-name");
      const product = productSelections.find((item) => item.id === productId);
      if (!product) return;

      if (selectedName === "Medium" || selectedName === "Large") {
        // Hantera att endast en storlek är markerad
        checkboxes.forEach((cb) => {
          if (
            cb !== checkbox &&
            (cb.getAttribute("data-name") === "Medium" ||
              cb.getAttribute("data-name") === "Large")
          ) {
            cb.checked = false;
          }
        });
        checkbox.checked = true;
        product.size = selectedName; // Uppdatera vald storlek i produktval
      } else {
        // Hantera andra anpassningar
        const customizationName = checkbox.getAttribute("data-name");
        const customizationPrice = parseFloat(
          checkbox.getAttribute("data-price")
        );

        if (checkbox.checked) {
          // Kontrollera om anpassningen redan finns
          const exists = product.customizations.some(
            (c) => c.name === customizationName
          );
          if (!exists) {
            product.customizations.push({
              name: customizationName,
              price: customizationPrice,
            });
          }
        } else {
          product.customizations = product.customizations.filter(
            (c) => c.name !== customizationName
          );
        }
      }
    });
  });
}

// Save customizations and restore if needed
function setupCustomizationEvents(productId) {
  const checkboxes = document.querySelectorAll(
    ".customize-options-container input[type='checkbox']"
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const customizationName = checkbox.getAttribute("data-name");
      const customizationPrice = parseFloat(
        checkbox.getAttribute("data-price")
      );
      const product = productSelections.find((item) => item.id === productId);
      if (!product) return;

      if (checkbox.checked) {
        // Kontrollera om anpassningen redan finns
        const exists = product.customizations.some(
          (c) => c.name === customizationName
        );
        if (!exists) {
          product.customizations.push({
            name: customizationName,
            price: customizationPrice,
          });
        }
      } else {
        product.customizations = product.customizations.filter(
          (c) => c.name !== customizationName
        );
      }
    });
  });
}

// Close sidebar
function closeSidebar() {
  const sidebar = document.querySelector(".sidebar-customize-product");
  const overlay = document.querySelector(".sidebar-overlay");
  if (sidebar) {
    sidebar.style.opacity = "0";
    sidebar.style.pointerEvents = "none";
  }
  if (overlay) {
    overlay.classList.remove("active");
  }
}

// Add logic to close sidebar when clicking outside
function setupOverlayClose() {
  const overlay = document.querySelector(".sidebar-overlay");
  if (overlay) {
    overlay.addEventListener("click", closeSidebar);
  }
}

// Show error messages in the menu
function showError(message) {
  const menuContainer = document.querySelector(".menu-page-content");
  if (menuContainer) {
    menuContainer.innerHTML = `<p class="error-message">${message}</p>`;
  }
}

// Get the row class for the menu items
function getRowClass(index) {
  if (index < 3) return "coffe-menu-row-1";
  if (index < 6) return "coffe-menu-row-2";
  if (index < 9) return "dessert-menu-row-1";
  return "dessert-menu-row-2";
}

// Get the column class for the menu items
function getColumnClass(index) {
  const columnIndex = (index % 3) + 1;
  return `row-${Math.ceil((index + 1) / 3)}-item-${columnIndex}`;
}

// Set up click events for the menu items to open the sidebar
function setupProductClickEvents() {
  const productItems = document.querySelectorAll(
    ".menu-page-content [data-id]"
  );

  productItems.forEach((item) => {
    item.addEventListener("click", () => {
      const productId = item.getAttribute("data-id");
      const productName = item.getAttribute("data-name");
      openSidebar(productId, productName);
    });
  });
}

// Restore saved selections
function restoreSelections(productId) {
  const product = productSelections.find((item) => item.id === productId);
  if (!product) return;

  const checkboxes = document.querySelectorAll(
    ".customize-options-container input[type='checkbox']"
  );

  checkboxes.forEach((checkbox) => {
    const customizationName = checkbox.getAttribute("data-name");
    checkbox.checked =
      product.customizations.some((c) => c.name === customizationName) ||
      (product.size === customizationName &&
        (customizationName === "Medium" || customizationName === "Large"));
  });
}

 
 */
