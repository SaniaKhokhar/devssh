const express = require("express");
const morgan = require("morgan");

// database connection
const dotenv = require("dotenv");
const appRouter = require("./routes/indexRoutes");
dotenv.config();
require("./db");

const app = express();
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(express.json()); // middleware to parse JSON data
//  It ensures that incoming requests with JSON payloads are automatically parsed and available in the req.body object

app.use(morgan("dev")); // used only during development mode

app.use("/api/v1", appRouter); // req: /api/v1
// v1 = version 1 , here we make request using api and after than end of request handle by appRouter

module.exports = app;
