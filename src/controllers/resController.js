const { PrismaClient } = require("@prisma/client");
const model = new PrismaClient();

const rateRes = async (req, res) => {
  try {
    const { res_id, amount } = req.body;
    const { user_id } = req.params;
    const d = new Date();
    const date_rate = d.toString();
    const data = {
      res_id: Number(res_id),
      amount: Number(amount),
      user_id: Number(user_id),
      date_rate: null,
    };
    await model.rate_res.create({ data });

    res.send("Rating posted");
  } catch (error) {
    res.send("Lỗi òi :((");
    console.log(error);
  }
};

module.exports = { rateRes };
