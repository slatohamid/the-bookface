const express = require("express");
const cors = require("cors");
const app = express();
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config();

app.use(cors());

// Routes
readdirSync("./routes").map(route => app.use("/", require("./routes/" + route)));

// Database
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("database connected successfully"))
  .catch(error => console.log("error connecting to mongodb", error));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});