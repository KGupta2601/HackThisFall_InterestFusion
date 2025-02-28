const mongoose = require("mongoose");

const userPublicDataSchema = new mongoose.Schema({
  privateUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  publicUserId: { type: String, required: true },
});

const UserPublicData = mongoose.model("UserPublicData", userPublicDataSchema);
module.exports = UserPublicData;
