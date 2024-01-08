const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const userRouter = require("./routes/user");

app.use("/user", userRouter);

app.listen(8000, () => {
  console.log("server is lestining...");
});
