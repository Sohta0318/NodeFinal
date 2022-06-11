const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const spendRouter = require("./routes/spend");
const typeRouter = require("./routes/type");
const incomeRouter = require("./routes/income");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRouter);
app.use(spendRouter);
app.use(typeRouter);
app.use(incomeRouter);

app.listen(port, () => {
  console.log("Server is up on" + port);
});
