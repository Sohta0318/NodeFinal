const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URL ||
  "mongodb+srv://Sohta:Sohta0318@cluster0.q1hgu.mongodb.net/expense?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});
