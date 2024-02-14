const mongoose = require("mongoose");
const db = process.env.DB;

mongoose
  .connect(
    db,{
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Database connected successfully..");
  })
  .catch((error) => {
    console.log("Connection with database failed:", error);
  });
