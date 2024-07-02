const express = require("express");
const {
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/orders", authenticate, getAllOrders);
router.put("/order-status", authenticate, updateOrderStatus);

module.exports = router;
