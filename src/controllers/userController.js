const { default: mongoose } = require("mongoose");
const UserModel = require("../models/User");

const updateProfile = async (req, res) => {
  const { username, email } = req.body;
  const userId = mongoose.Types.ObjectId(req.user.id);
  try {
    const user = await UserModel.findOne({ _id: userId });

    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;

      await user.save();
      res
        .status(200)
        .json({ message: "Profile Updated Successfully", data: user });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const viewProfile = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user.id);
    const user = await UserModel.findOne({ _id: userId });
    if (user) {
      res.status(200).json({ data: user });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  updateProfile,
  viewProfile,
};
