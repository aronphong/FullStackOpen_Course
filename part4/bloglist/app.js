const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config.js");
const middleware = require("./utils/middleware");

const blogRouter = require("./controllers/BlogController");
const userRouter = require("./controllers/UserController");
const loginRouter = require("./controllers/Login");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(middleware);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

module.exports = app;
