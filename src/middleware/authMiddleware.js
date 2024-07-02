const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: 401, error: "Unauthorized: Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findOne({
      where: { id: decoded.id },
      attributes: [
        "id",
        "email",
        "userName",
        "isAdmin",
        // "enable",
        // "deleted",
      ],
    });

    if (!user) {
      return res
        .status(401)
        .json({ status: 401, error: "Unauthorized: Invalid token" });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = { authenticate };
