// Libraries
var express = require("express");
var router = express.Router();
var logged;

// Good validation documentation available at https://express-validator.github.io/docs/
const { sanitizeBody } = require("express-validator");

// Get posts list
router.get("/", function (req, res, next) {
  // Retreiving the posts from the global var
  var data = req.app.get("poststore");

  // Send the array of objects to the browser
  res.render("posts", {
    title: "Blogging site",
    post_list: data
  });
});

// Sanitation middleware
// See https://express-validator.github.io/docs/sanitization-chain-api.html
// And https://express-validator.github.io/docs/filter-api.html
router.post("/create", sanitizeBody("*").trim().escape(), function (
  req,
  res,
  next
) {
  var date = new Date();
  var hour = date.getHours() + 2;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var hours = String(hour);

  var content = req.body.content;

  if (hours === "24") {
    hour = "00";
  }
  if (hours === "25") {
    hour = "01";
  }
  var minuutti = String(minute);

  if (minuutti.length === 1) {
    minute = "0" + minuutti;
  }

  var seconds = String(second);

  if (seconds.length === 1) {
    second = "0" + seconds;
  }

  var time = hour + ":" + minute;
  var post_date = day + "." + month + "." + year;

  console.log("Content: " + content);
  console.log("Author: " + logged);
  console.log("Time: " + time, post_date);

  if (content.length <= 200) {
    if (content !== "") {
      req.app.get("poststore").unshift({
        author: logged,
        content: content,
        time: time,
        date: post_date
      });
      console.log("post added!");

      res.redirect("/posts");
    }
  } else {
    console.log("error");
  }
});

router.post("/logout", sanitizeBody("*").trim().escape(), function (
  req,
  res,
  next
) {
  res.redirect("/");
});

router.post("/login", sanitizeBody("*").trim().escape(), function (
  req,
  res,
  next
) {
  var users = req.app.get("userstore");
  var user = req.body.logname;
  var password = req.body.pw;
  var found = 0;

  for (var i = 0; i < users.length; i++) {
    console.log(users[i].user);
    if (users[i].user === user) {
      if (users[i].pass === password) {
        logged = users[i].user;
        found++;
      }
    }
  }

  if (found === 0) {
    console.log("Incorrect username or password");
    res.redirect("/");
  } else {
    res.redirect("/posts");
    console.log(user + " logged in");
    console.log("Ella on paras");
  }
});

router.post("/sign", sanitizeBody("*").trim().escape(), function (
  req,
  res,
  next
) {
  var user = req.body.signupuser;
  var password = req.body.signuppassword;

  if (user && password !== "") {
    console.log("New user: " + user + " signed up.");
    req.app.get("userstore").push({
      user: user,
      pass: password
    });
    res.redirect("/");
  } else {
    console.log("There were empty fields");
    res.redirect("/sign");
  }
});

module.exports = router;
