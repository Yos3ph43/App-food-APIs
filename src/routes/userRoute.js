const express = require("express");
const userRoute = express.Router();

//import controller
const { getUser } = require("../controllers/userController");

userRoute.get("/getUser", getUser);

module.exports = userRoute;
