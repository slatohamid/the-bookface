const express = require("express");
const cors = require("cors");
const app = express();
const { readdirSync } = require("fs");
const dotenv = require("dotenv");


dotenv.config();

app.use(cors());

readdirSync("./routes").map(route => app.use("/", require("./routes/" + route)));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});