//creating express application

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  var post_list = req.app.get("poststore");

  res.render("index", {
    title: "MiniBlogger",
    post_list: post_list
  });
});

router.post("/getin", function (req, res, next) {
  res.redirect("/sign");
});

module.exports = router;
