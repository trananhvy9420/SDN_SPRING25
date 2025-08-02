var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("auth", { title: "Express" });
});
router.get("/login", function (req, res, next) {
  res.render("auth", { title: "Login" });
});
router.get("/helloworld", function (req, res, next) {
  res.render("helloworld", { title: "Hello World" });
});
router.get("/devices", function (req, res, next) {
  res.render("devices", { title: "Devices" });
});

router.get("/device/:id", function (req, res, next) {
  const deviceId = req.params.id;
  res.render("devicedetail", { title: "Device Detail", deviceId: deviceId });
});
router.get("/createdevice", function (req, res, next) {
  res.render("createdevice", { title: "Create Device" });
});
module.exports = router;
