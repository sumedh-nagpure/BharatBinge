const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./RouterAndControllers-Users/userRouter");
const actorsRouter = require("./RouterAndControllers-Actors/actorsRouter");
const adminRouter = require("./RouterAndControllers-Admin/adminRouter");
require('dotenv').config();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Replace <dbname> with the name of your database
const dbURI = "mongodb://localhost/movies-app";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

app.use("/users", userRouter);
app.use("/actors", actorsRouter);
app.use("/admin", adminRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
