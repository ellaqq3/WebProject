var express = require("express");
var app = express();

//The Path module provides a way of working with directories and file paths.
var path = require("path");

// Include external files
var indexRouter = require("./src/index");
var signRouter = require("./src/sign");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Define routes (edit as required)
app.use("/", indexRouter);
app.use("/sign", signRouter);

// Export app to use with www.js - default
module.exports = app;
