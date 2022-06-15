const express = require("express");
const Spend = require("../models/spend");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/spends", auth, async (req, res) => {
  const spend = new Spend({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await spend.save();
    res.status(201).send(spend);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/spends", auth, async (req, res) => {
  try {
    await req.user.populate("spends");
    res.send(req.user.spends);
  } catch (e) {
    res.status(500).send();
    console.log(e);
  }
});

router.get("/spends/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const spend = await Spend.findOne({ _id, owner: req.user._id });

    if (!spend) {
      return res.status(404).send();
    }

    res.send(spend);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/spends/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["amount", "date", "comment", "type"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const spend = await Spend.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!spend) {
      return res.status(404).send();
    }
    updates.forEach((update) => (spend[update] = req.body[update]));
    await spend.save();

    res.send(spend);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/spends/:id", auth, async (req, res) => {
  try {
    const spend = await Spend.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!spend) {
      res.status(404).send();
    }

    res.send(spend);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
