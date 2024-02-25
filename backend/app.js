const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// database connection
const dotenv = require("dotenv");
const appRouter = require("./routes/indexRoutes");
dotenv.config();
require("./db");

const app = express();

// Use cookie-parser middleware with a secret
app.use(cookieParser(process.env.COOKIE_SECRET));
// cookie

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // middleware to parse JSON data
app.use(morgan("dev")); // used only during development mode
app.use("/api/v1", appRouter); // req: /api/v1

module.exports = app;
