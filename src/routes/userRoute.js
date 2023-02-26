const express = require("express");
const userRoute = express.Router();

//import controller
const { getUser, orderFood } = require("../controllers/userController");

userRoute.get("/getUser", getUser);
userRoute.post("/orderFood/:food_id/:user_id", orderFood);

module.exports = userRoute;
