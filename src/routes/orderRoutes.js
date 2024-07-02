const express = require("express");
const {
  createOrder,
  getOrdersByUser,
} = require("../controllers/orderController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/order/create", authenticate, createOrder);
router.get("/order/get", authenticate, getOrdersByUser);

module.exports = router;
