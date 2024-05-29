const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const server = require("http").createServer();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
// import routes
const AdminRoutes = require("./routes/Admin/AdminRoutes");
const UserRoutes = require("./routes/User/UserRoutes");
// import middlewares
const { notFound, errorHandler } = require("./middleware/ErrorMiddleware");
const { connectDB } = require("./config/db.js");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, parameterLimit: 50000 }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionSuccessStatus: 200,
    // for cookies::
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use("/admin", AdminRoutes);
  app.use("/user", UserRoutes);
  app.get("/", (req, res) => {
    res.send("server is ready");
  });
  app.use(notFound);
  app.use(errorHandler);
} else {
  app.use("/admin", AdminRoutes);
  app.use("/user", UserRoutes);
  app.get("/", (req, res) => {
    res.send("server is ready");
  });
  app.use(notFound);
  app.use(errorHandler);
}

connectDB();
mongoose.set("strictQuery", false);
app.listen(PORT, () => console.log(`started on ${PORT}`));
