const OrderModel = require("../models/Order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", ["username", "email"])
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const order = await OrderModel.findById(orderId);

    if (order) {
      order.status = status;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ msg: "Order not found" });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
};
