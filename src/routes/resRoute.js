const express = require("express");
const resRoute = express.Router();
const { rateRes } = require("../controllers/resController");

resRoute.post("/rateRes/:user_id", rateRes);

module.exports = resRoute;
