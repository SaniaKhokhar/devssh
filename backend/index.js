require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("./db");
const morgan = require("morgan");
const userdb = require("./model/userSchema");
const cookieParser = require("cookie-parser");
const appRouter = require("./routes/indexRoutes");

const port = process.env.PORT || 5000;


const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const clientid = process.env.clientid;
const clientsecret = process.env.clientsecret;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Use cookie-parser middleware with a secret
app.use(cookieParser(process.env.COOKIE_SECRET));
// cookie

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // middleware to parse JSON data
app.use(morgan("dev")); // used only during development mode
app.use("/api/v1", appRouter); // req: /api/v1


/**chat routing */

app.use('/api/chat', require('./routes/chat'))
// app.use('/api/chat',require('./routes/chat'))
app.use('/api/feedback',require('./routes/feedback'))
// app.use('/api/votes', require('./routes/feedback'))

app.use('/api/review', require('./routes/reiew'))
app.use("/profile", require("./routes/profile"));
app.listen(port, () => {
  console.log(`Backend is running on port ${port}..`);
});
