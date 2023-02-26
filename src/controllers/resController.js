const { PrismaClient } = require("@prisma/client");
const model = new PrismaClient();

const rateRes = async (req, res) => {
  try {
    const { res_id } = req.params;
    const { amount, user_id } = req.body;
    const date_rate = new Date();
    const data = {
      res_id: Number(res_id),
      amount: Number(amount),
      user_id: Number(user_id),
      date_rate,
    };
    await model.rate_res.create({ data });

    res.send("Rating posted");
  } catch (error) {
    res.send("Lỗi gì òi :((");
    console.log(error);
  }
};

const likeRes = async (req, res) => {
  try {
    const { res_id, user_id } = req.params;
    const date_like = new Date();
    const data = {
      res_id: Number(res_id),
      user_id: Number(user_id),
      date_like,
    };
    console.log({ data });
    await model.like_res.create({ data });
    res.send("Liked");
  } catch (error) {
    res.send("Lỗi gì òi :((");
    console.log(error);
  }
};
const unlikeRes = async (req, res) => {
  try {
    const { res_id, user_id } = req.params;

    await model.like_res.delete({
      where: {
        user_id_res_id: {
          res_id: Number(res_id),
          user_id: Number(user_id),
        },
      },
    });
    res.send("Unliked");
  } catch (error) {
    res.send("Lỗi gì òi :((");
    console.log(error);
  }
};

const getLikeByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    let data = await model.like_res.findMany({
      where: { user_id: Number(user_id) },
      include: { restaurant: true },
    });
    res.send(data);
  } catch (error) {
    res.send("Lỗi gì òi :((");
    console.log(error);
  }
};

const getLikeByRes = async (req, res) => {
  try {
    const { res_id } = req.params;
    let data = await model.like_res.findMany({
      where: { res_id: Number(res_id) },
      include: { user: true },
    });
    res.send(data);
  } catch (error) {
    res.send("Lỗi gì òi :((");
    console.log(error);
  }
};
const getRateByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    let data = await model.rate_res.findMany({
      where: { user_id: Number(user_id) },
      include: { restaurant: true },
    });
    res.send(data);
  } catch (error) {
    res.send("Lỗi gì òi :((");
    console.log(error);
  }
};

const getRateByRes = async (req, res) => {
  try {
    const { res_id } = req.params;
    let data = await model.rate_res.findMany({
      where: { res_id: Number(res_id) },
      include: { user: true },
    });
    res.send(data);
  } catch (error) {
    res.send("Lỗi gì òi :((");
    console.log(error);
  }
};

module.exports = {
  rateRes,
  likeRes,
  unlikeRes,
  getLikeByUser,
  getLikeByRes,
  getRateByUser,
  getRateByRes,
  unlikeRes,
};
