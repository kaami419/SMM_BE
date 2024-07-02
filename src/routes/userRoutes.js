const express = require("express");
const { updateProfile, viewProfile } = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.put("/profile", authenticate, updateProfile);
router.get("/profile", authenticate, viewProfile);

module.exports = router;
