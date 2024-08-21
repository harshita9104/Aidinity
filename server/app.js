const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3005;
const dbConnection = require("./database/connect");

const app = express();

// Enable CORS for all routes
app.use("*", cors({ credentials: true, origin: true })); //Enables CORS for all routes, allowing credentials (like cookies) and requests from any origin.

// Set response headers for CORS
//Manually sets CORS headers to control which origins, methods, and headers are allowed.

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Middleware for parsing cookies and request bodies
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
dbConnection();

// Set up routes
app.use("/", require("./router/router"));

// Start the server
app.listen(PORT, () => {
  console.log(`App active on port ${PORT}!`);
});
