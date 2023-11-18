const express = require("express");
const app = express();
const path = require('path');

// envVariables to process.env:
require("dotenv").config();
require("colors");
// Configurations
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;
const NODE_ENV = process.env?.NODE_ENV || "production";

// asyncErrors to errorHandler:
require("express-async-errors");
// ----------------------------------------------------------
// Connect to DB
require("./config/db")();
// -----------------------------------------------------------
// Middlewares:
// Accept JSON:
app.use(express.json());
// Static Files
app.use(express.static(path.join(__dirname, 'public')))
// Cookie parser for JWT send as cookie
app.use(require('cookie-parser')());
// Security packages middleware 
app.use(require('./middlewares/security'))
// Run logger
app.use(require('./middlewares/logger'));
// -----------------------------------------------------------
// Routes
// HomePath:
app.all("/", require("./middlewares/homeRoute"));
// Routes:
app.use("/api", require("./routes"));
// -----------------------------------------------------------
// Error Handler
app.use(require("./middlewares/errorHandler"));
// ------------------------------------------------------------
// RUN SEREVR:
const server = app.listen(PORT, HOST, () =>
  console.log(`Server running on ${NODE_ENV} mode at http://${HOST}:${PORT}`.green),
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Error :${error.message}`.red);
  server.close(() => {
    console.log(`Server Stopped!`.red.underline);
    process.exit(1);
  });
});
