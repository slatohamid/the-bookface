const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {readdirSync} = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    // remove useNewUrlParser, useUnifiedTopology is the default
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}..`);
});
