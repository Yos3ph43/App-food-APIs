const { PrismaClient } = require("@prisma/client");
const model = new PrismaClient();

const getUser = async (req, res) => {
  try {
    let data = await model.user.findMany();
    res.send(data);
  } catch (error) {
    res.send("Lỗi òi :((");
  }
};
const orderFood = async (req, res) => {
  try {
    const { food_id, user_id } = req.params;
    const { amount, code, arr_sub_id } = req.body;
    let data = {
      food_id: Number(food_id),
      user_id: Number(user_id),
      amount: Number(amount),
      code,
      arr_sub_id,
    };
    await model.order.create({ data });
    res.send("Ordered");
  } catch (error) {
    res.send("Lỗi òi :((");
    console.log(error.message);
  }
};

module.exports = {
  getUser,
  orderFood,
};
