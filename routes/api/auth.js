const express = require("express");
// require("dotenv").config();
// const { check } = require("express-validator");
const ctrl = require("../../controlers/auth");

const router = express.Router();

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

module.exports = router;
