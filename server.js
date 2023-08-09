require("./config/dbConfig");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const hotelRouter = require("./routers/hotelRouter");
const flightRouter = require("./routers/flightRouter");
const carRouter = require("./routers/carRentalRouter");
const tourRouter = require("./routers/tourRouter");
const categoryRouter = require("./routers/categoryRouter");
const bookingRouter = require("./routers/bookingRouter");
const PORT = process.env.PORT || 5050;

const app = express();

// Enable CORS for all routes
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});
app.use("/trippy", userRouter);
app.use("/trippy", adminRouter);
app.use("/trippy", hotelRouter);
app.use("/trippy", tourRouter);
app.use("/trippy", flightRouter);
app.use("/trippy", carRouter);
app.use("/trippy", bookingRouter);
app.use("/trippy", categoryRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
