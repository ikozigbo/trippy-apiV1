require("./config/dbConfig");
const express = require("express");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});
app.use("/trippy", userRouter);
app.use("/trippy", adminRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
