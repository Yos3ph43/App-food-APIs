const express = require("express");
const resRoute = express.Router();
const {
  rateRes,
  likeRes,
  unlikeRes,
  getLikeByRes,
  getLikeByUser,
  getRateByRes,
  getRateByUser,
  likeUnlikeRes,
} = require("../controllers/resController");

resRoute.post("/rateRes/:res_id/:user_id", rateRes);

resRoute.post("/likeRes/:res_id/:user_id", likeRes);
resRoute.delete("/unlikeRes/:res_id/:user_id", unlikeRes);
resRoute.post("/likeUnlikeRes/:res_id/:user_id", likeUnlikeRes);

resRoute.get("/getLikeByUser/:user_id", getLikeByUser);
resRoute.get("/getLikeByRes/:res_id", getLikeByRes);

resRoute.get("/getRateByUser/:user_id", getRateByUser);
resRoute.get("/getRateByRes/:res_id", getRateByRes);

module.exports = resRoute;
