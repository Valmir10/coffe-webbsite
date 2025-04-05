const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "coffee_shop",
});

connection.connect((err) => {
  if (err) {
    console.error(" Error connecting to MySQL:", err);
    process.exit(1);
  } else {
    console.log(" Connected to MySQL database!");
  }
});

module.exports = connection;
