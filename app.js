var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var createError = require("http-errors");

//The Path module provides a way of working with directories and file paths.
var path = require("path");

// Include external files
var indexRouter = require("./src/index");
var signRouter = require("./src/sign");
var postRouter = require("./src/posts");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Use logging and set settings - default
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Define routes (edit as required)
app.use("/", indexRouter);
app.use("/sign", signRouter);
app.use("/posts", postRouter);

// Setting up a global var for data storage - this is extremely poor and hacky way, but works
app.set("poststore", []);
app.set("userstore", []);

// Catch 404 and forward to error handler - default
app.use(function (req, res, next) {
  next(createError(404));
});

// Register error handler - default
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Export app to use with www.js - default
module.exports = app;
