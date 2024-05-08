const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");

const vRoutes = require("./routes/v1");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.options("*", cors());

app.use("/v1", vRoutes);

app.get("/", (req, res) => {
  res.send({ code: 200, message: "OK" });
});

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "API Not Found"));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
