const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required to blacklist"],
    },
  },
  {
    timestamps: true,
  },
);

const blackListModel = mongoose.model("blacklists", blackListSchema);

module.exports = blackListModel;
