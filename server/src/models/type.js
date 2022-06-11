const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: Number,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;
