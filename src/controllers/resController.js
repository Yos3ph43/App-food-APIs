const { PrismaClient } = require("@prisma/client");
const model = new PrismaClient();

const rateRes = async (req, res) => {
  try {
    const { res_id, user_id } = req.params;
    const { amount } = req.body;

    const checkRate = await model.rate_res.findUnique({
      where: {
        user_id_res_id: {
          res_id: Number(res_id),
          user_id: Number(user_id),
        },
      },
    });
    const date_rate = new Date();

    const data = {
      res_id: Number(res_id),
      amount: Number(amount),
      user_id: Number(user_id),
      date_rate,
    };

    if (checkRate) {
      await model.rate_res.update({
        data,
        where: {
          user_id_res_id: {
            res_id: Number(res_id),
            user_id: Number(user_id),
          },
        },
      });
      res.send("Rating updated");
    } else {
      await model.rate_res.create({ data });
      res.send("Rating posted");
    }
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
const likeUnlikeRes = async (req, res) => {
  try {
    const { res_id, user_id } = req.params;

    const checkLike = await model.like_res.findUnique({
      where: {
        user_id_res_id: {
          res_id: Number(res_id),
          user_id: Number(user_id),
        },
      },
    });
    if (checkLike) {
      await model.like_res.delete({
        where: {
          user_id_res_id: {
            res_id: Number(res_id),
            user_id: Number(user_id),
          },
        },
      });
      res.send("Unliked");
    } else {
      const date_like = new Date();
      const data = {
        res_id: Number(res_id),
        user_id: Number(user_id),
        date_like,
      };
      await model.like_res.create({ data });
      res.send("Liked");
    }
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
  likeUnlikeRes,
  getLikeByUser,
  getLikeByRes,
  getRateByUser,
  getRateByRes,
};
