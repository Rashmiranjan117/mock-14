require("dotenv").config();
const { connection } = require("./config/db");
const { bugRouter } = require("./routes/bug.routes");
const { userRouter } = require("./routes/user.routes");
const express = require("express");
const app = express();

const cors = require("cors");
const { authenticate } = require("./middleware/authenticate");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/user", userRouter);
app.use(authenticate)
app.use("/bug", bugRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server is connected");
  } catch (err) {
    console.log("Something went wrong");
  }
  console.log("Server is connected at port", process.env.port);
});
