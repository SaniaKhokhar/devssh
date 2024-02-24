// make app routes

const express = require("express");
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");
const appRouter = express.Router();

//middleware for user routes
appRouter.use("/user", userRoutes); // req: /api/v1/users
appRouter.use("/chat", chatRoutes); // req: /api/v1/chat

module.exports = appRouter;
