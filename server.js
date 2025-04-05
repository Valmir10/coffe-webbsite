const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const winston = require("winston");
const { validateCart, validateOrder } = require("./utils/validators");
const connection = require("./db/connection");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Temporär lagring av checkout-session
let checkoutSession = null; // Temporär lagring för checkout-data

// Logger med Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Middleware
app.use(helmet()); // Förbättrad säkerhet
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Kontrollera databasanslutning
connection.connect((err) => {
  if (err) {
    logger.error("Error connecting to database:", { message: err.message });
    process.exit(1);
  }
  logger.info("Connected to MySQL database");
});

// Centraliserad felhantering
app.use((err, req, res, next) => {
  logger.error("Server error", { message: err.message });
  res.status(err.status || 500).send({ error: err.message });
});

// Routes
app.get("/api/products", (req, res, next) => {
  connection.query("SELECT * FROM products", (err, results) => {
    if (err) {
      return next(new Error("Database error"));
    }
    res.json(results); // Returnera alla produkter
  });
});

app.get("/api/customizations/:productId", (req, res, next) => {
  const { productId } = req.params;

  connection.query(
    "SELECT * FROM customizations WHERE product_id = ?",
    [productId],
    (err, results) => {
      if (err) {
        return next(new Error("Database error"));
      }
      res.json(results);
    }
  );
});

app.post("/api/cart", (req, res, next) => {
  const { error } = validateCart(req.body); // Validera data
  if (error) {
    logger.warn("Invalid cart data", { details: error.details });
    return res.status(400).send({ error: error.details[0].message });
  }

  logger.info("Cart data received", { data: req.body });
  res
    .status(201)
    .send({ success: true, message: "Cart data saved successfully" });
});

app.post("/api/orders", (req, res, next) => {
  const { error } = validateOrder(req.body); // Validera data
  if (error) {
    logger.warn("Invalid order data", { details: error.details });
    return res.status(400).send({ error: error.details[0].message });
  }

  const { product_id, size, customizations } = req.body;

  // Hämta produktinfo från databasen
  connection.query(
    "SELECT name, image_url, default_price FROM products WHERE id = ?",
    [product_id],
    (err, results) => {
      if (err) {
        return next(new Error("Database error"));
      }

      if (results.length === 0) {
        logger.warn("Product not found", { product_id });
        return res.status(404).send({ error: "Product not found" });
      }

      const product = results[0];
      const originalPrice = parseFloat(product.default_price);
      const customizationCost = customizations.reduce(
        (sum, c) => sum + parseFloat(c.price || 0),
        0
      );
      const totalPrice = originalPrice + customizationCost;

      const orderData = {
        product_id,
        product_name: product.name,
        product_image_url: product.image_url,
        original_price: originalPrice,
        customizations: JSON.stringify({ size, customizations }),
        total_price: totalPrice,
      };

      connection.query(
        "INSERT INTO orders SET ?",
        orderData,
        (err, results) => {
          if (err) {
            return next(new Error("Failed to save order"));
          }
          logger.info("Order saved", { orderId: results.insertId });
          res.status(201).send({ orderId: results.insertId });
        }
      );
    }
  );
});

// Ny POST-endpoint för att spara checkout-data
app.post("/api/checkout", (req, res) => {
  checkoutSession = req.body.map((item) => {
    const correctedDefaultPrice = item.default_price || item.price || 0; // Säkerställ att rätt pris används
    return {
      ...item,
      default_price: correctedDefaultPrice,
    };
  });

  logger.info("Checkout data received", { data: checkoutSession });
  res.status(200).send({ success: true, message: "Checkout data saved" });
});

// Ny GET-endpoint för att hämta checkout-data
app.get("/api/checkout", (req, res) => {
  console.log("Sending checkout session:", checkoutSession);
  if (!checkoutSession) {
    return res.status(404).send({ error: "No checkout data found" });
  }
  res.status(200).json(checkoutSession);
});

// Starta servern
app.listen(PORT, () =>
  logger.info(`Server running on http://localhost:${PORT}`)
);

/*


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const winston = require("winston");
const { validateCart, validateOrder } = require("./utils/validators");
const connection = require("./db/connection");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Temporär lagring av checkout-session
let checkoutSession = null; // Temporär lagring för checkout-data

// Logger med Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Middleware
app.use(helmet()); // Förbättrad säkerhet
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Kontrollera databasanslutning
connection.connect((err) => {
  if (err) {
    logger.error("Error connecting to database:", { message: err.message });
    process.exit(1);
  }
  logger.info("Connected to MySQL database");
});

// Centraliserad felhantering
app.use((err, req, res, next) => {
  logger.error("Server error", { message: err.message });
  res.status(err.status || 500).send({ error: err.message });
});

// Routes
app.get("/api/products", (req, res, next) => {
  connection.query("SELECT * FROM products", (err, results) => {
    if (err) {
      return next(new Error("Database error"));
    }
    res.json(results); // Returnera alla produkter
  });
});

app.get("/api/customizations/:productId", (req, res, next) => {
  const { productId } = req.params;

  connection.query(
    "SELECT * FROM customizations WHERE product_id = ?",
    [productId],
    (err, results) => {
      if (err) {
        return next(new Error("Database error"));
      }
      res.json(results);
    }
  );
});

app.post("/api/cart", (req, res, next) => {
  const { error } = validateCart(req.body); // Validera data
  if (error) {
    logger.warn("Invalid cart data", { details: error.details });
    return res.status(400).send({ error: error.details[0].message });
  }

  logger.info("Cart data received", { data: req.body });
  res
    .status(201)
    .send({ success: true, message: "Cart data saved successfully" });
});

app.post("/api/orders", (req, res, next) => {
  const { error } = validateOrder(req.body); // Validera data
  if (error) {
    logger.warn("Invalid order data", { details: error.details });
    return res.status(400).send({ error: error.details[0].message });
  }

  const { product_id, size, customizations } = req.body;

  // Hämta produktinfo från databasen
  connection.query(
    "SELECT name, image_url, default_price FROM products WHERE id = ?",
    [product_id],
    (err, results) => {
      if (err) {
        return next(new Error("Database error"));
      }

      if (results.length === 0) {
        logger.warn("Product not found", { product_id });
        return res.status(404).send({ error: "Product not found" });
      }

      const product = results[0];
      const originalPrice = parseFloat(product.default_price);
      const customizationCost = customizations.reduce(
        (sum, c) => sum + parseFloat(c.price || 0),
        0
      );
      const totalPrice = originalPrice + customizationCost;

      const orderData = {
        product_id,
        product_name: product.name,
        product_image_url: product.image_url,
        original_price: originalPrice,
        customizations: JSON.stringify({ size, customizations }),
        total_price: totalPrice,
      };

      connection.query(
        "INSERT INTO orders SET ?",
        orderData,
        (err, results) => {
          if (err) {
            return next(new Error("Failed to save order"));
          }
          logger.info("Order saved", { orderId: results.insertId });
          res.status(201).send({ orderId: results.insertId });
        }
      );
    }
  );
});

// Ny POST-endpoint för att spara checkout-data
app.post("/api/checkout", (req, res) => {
  checkoutSession = req.body.map((item) => ({
    ...item,
    default_price: item.default_price || item.price || 0, // Säkerställ att default_price alltid finns
  }));
  logger.info("Checkout data received", { data: checkoutSession });
  res.status(200).send({ success: true, message: "Checkout data saved" });
});

// Ny GET-endpoint för att hämta checkout-data
app.get("/api/checkout", (req, res) => {
  console.log("Sending checkout session:", checkoutSession);
  if (!checkoutSession) {
    return res.status(404).send({ error: "No checkout data found" });
  }
  res.status(200).json(checkoutSession);
});

// Starta servern
app.listen(PORT, () =>
  logger.info(`Server running on http://localhost:${PORT}`)
);



*/
