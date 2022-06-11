const mongoose = require("mongoose");
const Comment = require("./income");

const spendSchema = new mongoose.Schema({
  amount: {
    type: String,
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

spendSchema.pre("remove", async function (next) {
  const spend = this;
  await Comment.deleteMany({ owner: spend._id });

  next();
});

const Spend = mongoose.model("Spend", spendSchema);

module.exports = Spend;
