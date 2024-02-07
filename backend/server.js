require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const movieRouter = require("./routes/movies");
const tvRouter = require("./routes/tv");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/movies", movieRouter);
app.use("/api/tv", tvRouter);

//connect to db
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db and running at port:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
