const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
  },
  comment: {
    type: String,
  },
  del_flg: {
    type: Number,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
  },
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
